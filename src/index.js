import './css/myfile.css'

let content = {
    init: function () {
        let self = this;
        if(!localStorage.dataR || localStorage.dataR.length<12){
            localStorage.clear();
            this.vkAuth().then(()=>{
                return this.callAPI('friends.get',{fields:'photo_100'})
            })
                .then((response)=>{
                    let frends = []
                    for(let i in response){
                        let fio = `${response[i].first_name} ${response[i].last_name}`
                        let photo = `${response[i].photo_100}`
                        frends.push({userName:fio,'photo':photo})

                    }
                    userListLeft.list=frends;
                    content.update(userListLeft,sortR);
                });

        }
    },
    vkAuth:function() {
        return new Promise((resolve,reject) => {
            VK.init({
                apiId: 6302893
            });
            VK.Auth.login(data => {
                if(data.session){
                    resolve();
                }else {
                    reject(new Error('Не удалось авторизоваться.'));
                }
            },2)
        })
    },
    callAPI: function(method,params) {
        return new Promise((resolve,reject)=>{
            VK.api(method,params,(data)=>{
                params.v = '5.69';
                if(data.error) {
                    reject(data.error)
                }else {
                    resolve(data.response);
                }
            })
        })
    },
    userListRight : function () {
        return localStorage.dataR ? JSON.parse(localStorage.dataR) : undefined;
    },
    templateR: require('../blockR.hbs'),
    templateL: require('../blockL.hbs'),
    listRight: document.querySelector('.list-right-js'),
    listLeft: document.querySelector('.list-left-js'),
    inputL: document.querySelector('.input-left'),
    inputR: document.querySelector('.input-right'),
    block: document.querySelector('.block'),
    btnSave: document.querySelector('.btn-save'),
    removeUser: function(elem,list) {
        for (let i = 0; i < list.length;i++){
            if(list[i].userName === elem) {
                list.splice(i, 1);
            }
        }
    },
    addUser: function(elem,list) {
        list.push(elem)
    },
    dataF: function(elem) {
        let photo = elem.closest('li').children[0].children[0].children[0].getAttribute('src');
        let user = elem.closest('li').children[0].children[1].textContent;
        return {'userName':user,'photo':photo};
    },
    update:function (listL,listR) {
        this.listRight.innerHTML = this.templateR(listR);
        this.listLeft.innerHTML = this.templateL(listL);
    },
    check:function (full, chunk) {
        if (full.toLowerCase().indexOf(chunk.toLowerCase()) === -1) {
            return false;
        } else {
            return true;
        }
    }

}
var userListRight = {
    list:[]
}

var userListLeft = {
    list:[]
}
window.onload = content.init();

let sortL = {list:[]};
let sortR = {list:[]};
userListLeft = localStorage.dataL ? JSON.parse(localStorage.dataL) : userListLeft;
userListRight =localStorage.dataR ? JSON.parse(localStorage.dataR) : userListRight;

sortL.list = userListLeft.list
sortR.list = userListRight.list

content.update(sortL,sortR);

content.block.addEventListener('click',function (e) {
    let elemL = e.target.closest('.user__add');
    let elemR = e.target.closest('.user__remove');

    if(elemL){
        let data = content.dataF(elemL);
        content.removeUser(data.userName,userListLeft.list);
        content.addUser(data,userListRight.list)
    }
    else if(elemR){
        let data = content.dataF(elemR);
        content.removeUser(data.userName,userListRight.list);
        content.addUser(data,userListLeft.list)

    }else {
        return;
    }
    var eventL = new Event("keyup");
    var eventR = new Event("keyup");
    content.inputL.dispatchEvent(eventL);
    content.inputR.dispatchEvent(eventR);
    content.update(sortL,sortR);
})


content.inputL.addEventListener('keyup',function (e) {
    sortL.list = [];
    if(e.target.value.length){
        for (let i = 0; i < userListLeft.list.length; i++) {
            if(content.check(userListLeft.list[i].userName,e.target.value)){
                sortL.list.push(userListLeft.list[i]);
            }
        }
        content.update(sortL,sortR);
    }else {
        sortL.list = userListLeft.list
        content.update(sortL,sortR);
    }
})
content.inputR.addEventListener('keyup',function (e) {
    sortR.list = [];
    if(e.target.value.length){
        for (let i = 0; i < userListRight.list.length; i++) {
            if(content.check(userListRight.list[i].userName,e.target.value)){
                sortR.list.push(userListRight.list[i]);
            }
        }
        content.update(sortL,sortR);
    }else {
        sortR.list = userListRight.list
        content.update(sortL,sortR);
    }
})

content.btnSave.addEventListener('click',function () {
    localStorage.dataL = JSON.stringify(userListLeft);
    localStorage.dataR = JSON.stringify(userListRight);
})


function start(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html',JSON.stringify([e.target.closest('ul').classList[1],content.dataF(e.target)]))
}

function handleDragEnter(e) {
    e.preventDefault();
    return true;
}
function handleDragOver(e) {
    e.preventDefault();
    return true;
}

function handleDragDrop(e) {
    var data = JSON.parse(e.dataTransfer.getData('text/html'));
    let blockPos = e.target.closest('ul').classList[1];
    if(blockPos ==='list-left-js' && blockPos !==data[0]){
        content.removeUser(data[1].userName,userListRight.list);
        content.addUser(data[1],userListLeft.list)
    }
    if (blockPos ==='list-right-js' && blockPos !==data[0]) {
        content.removeUser(data[1].userName,userListLeft.list);
        content.addUser(data[1],userListRight.list)
    }
    var eventL = new Event("keyup");
    var eventR = new Event("keyup");
    content.inputL.dispatchEvent(eventL);
    content.inputR.dispatchEvent(eventR);
    content.update(sortL,sortR);
    return false;
}

content.listLeft.addEventListener('dragover',handleDragOver, false);
content.listLeft.addEventListener('drop',handleDragDrop, false);
content.listLeft.addEventListener('dragenter',handleDragEnter, false);


content.listRight.addEventListener('dragover',handleDragOver, false);
content.listRight.addEventListener('drop',handleDragDrop, false);
content.listRight.addEventListener('dragenter',handleDragEnter, false);



content.block.addEventListener('mousedown',function (e) {
    if(e.target.closest('li')){
        e.target.closest('li').addEventListener('dragstart', start, false);
    }
})
