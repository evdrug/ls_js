/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import {createCookie,deleteCookie} from "./index";

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

let myObj = {
    listCookies: document.cookie.split('; '),
    cookies: function(){
        return this.listCookies.reduce((prev,count)=>{
            let [name, value] = count.split('=');
            prev[name]=value;
            return prev;
        },{});
    },
    searchTable: function(arg){
        for(let i=0; i<listTable.children.length;i++){
            if(listTable.children[i].firstChild.innerText === arg) {
                return listTable.children[i];
            }
        }
        return false;
    },
    createElTr: function(elem,name,value) {
        let tr = document.createElement('tr');
        this.createElTd(tr,name);
        this.createElTd(tr,value);
        this.createElTd(tr,`<button class="delet deleteCookies" data="${name}">удалить</button>`);
        elem.appendChild(tr);
    },
    createElTd: function(elem,param) {
        let td = document.createElement('td')
        td.innerHTML=param;
        elem.appendChild(td);
    },
    check:function (full, chunk) {
        if (full.toLowerCase().indexOf(chunk.toLowerCase()) === -1) {
            return false;
        } else {
            return true;
        }
    },
    createTable: function(obj) {
        listTable.innerHTML='';
        for ( let item in obj){
            this.createElTr(listTable,item,obj[item]);
        }
    },
    sortObj: function(arg) {
        if(arg){
            let sort = {};
            for ( let item in this.cookies()){
                if(this.check(item,arg) || this.check(this.cookies()[item],arg)) {
                    sort[item] = this.cookies()[item];
                }
            }
            return sort;
        }else {
            return this.cookies();
        }
    },
}


filterNameInput.addEventListener('keyup', function(e) {
    let value = e.target.value.trim();
    myObj.createTable(myObj.sortObj(value));

});

addButton.addEventListener('click', () => {
    createCookie(addNameInput.value,addValueInput.value);
    let search = myObj.searchTable(addNameInput.value);
    if(search){
        search.children[1].innerText = addValueInput.value;
        myObj.listCookies = document.cookie.split('; ');
        myObj.createTable(myObj.sortObj(filterNameInput.value))
    }else {
        myObj.listCookies = document.cookie.split('; ');
        myObj.createTable(myObj.sortObj(filterNameInput.value))
    }
});
listTable.addEventListener('click',function (e) {
    if(e.target.tagName === 'BUTTON'){
        let trTable = e.target.parentNode.parentNode;
        deleteCookie(trTable.firstChild.innerText);
        trTable.remove();
    }

})
myObj.createTable(myObj.sortObj())
