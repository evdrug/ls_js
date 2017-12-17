let content = {
    templateR: require('../blockR.hbs'),
    templateL: require('../blockL.hbs'),
    listRight: document.querySelector('.list-right-js'),
    listLeft: document.querySelector('.list-left-js'),
    compR: function () {
        let self = this;
        return Handlebars.compile(self.templateR);
    },
    compL: function () {
        let self = this;
        return Handlebars.compile(self.templateL);
    }

}
var userListRight = {
    list:[{
        userName: "Yehuda Katz",
        photo: 'https://pp.userapi.com/c638324/v638324863/bbd5/JvAtEfnhYTI.jpg'
    },
        {
            userName: "Yehuda1 Katz",
            photo: 'https://pp.userapi.com/c638324/v638324863/bbd5/JvAtEfnhYTI.jpg'
        },
        {
            userName: "Yehuda1 Katz",
            photo: 'https://pp.userapi.com/c638324/v638324863/bbd5/JvAtEfnhYTI.jpg'
        },
    ]
}

var userListLeft = {
    list:[{
        userName: "Друзьякин Евгений",
        photo: 'https://pp.userapi.com/c622918/v622918902/1315a/O-iwiREkdo0.jpg'
    },
        {
            userName: "Друзьякин Евгений",
            photo: 'https://pp.userapi.com/c622918/v622918902/1315a/O-iwiREkdo0.jpg'
        },
        {
            userName: "Друзьякин Евгений",
            photo: 'https://pp.userapi.com/c622918/v622918902/1315a/O-iwiREkdo0.jpg'
        },
        {
            userName: "Друзьякин Евгений",
            photo: 'https://pp.userapi.com/c622918/v622918902/1315a/O-iwiREkdo0.jpg'
        },
        {
            userName: "Друзьякин Евгений",
            photo: 'https://pp.userapi.com/c622918/v622918902/1315a/O-iwiREkdo0.jpg'
        },
        {
            userName: "Друзьякин Евгений",
            photo: 'https://pp.userapi.com/c622918/v622918902/1315a/O-iwiREkdo0.jpg'
        },
    ]
}

content.listRight.innerHTML = content.compR()(userListRight);
content.listLeft.innerHTML = content.compL()(userListLeft);
