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
    cookies: document.cookie,
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
}


filterNameInput.addEventListener('keyup', function() {
});

addButton.addEventListener('click', () => {
    createCookie(addNameInput.value,addValueInput.value);
    if(myObj.searchTable(addNameInput.value)){
        myObj.searchTable(addNameInput.value).children[1].innerText = addValueInput.value;
    }else {
        myObj.createElTr(listTable,addNameInput.value,addValueInput.value);
    }
    // addNameInput.value = ''
    // addValueInput.value = ''
});

listTable.addEventListener('click',function (e) {
    if(e.target.tagName === 'BUTTON'){
        let trTable = e.target.parentNode.parentNode;
        deleteCookie(trTable.firstChild.innerText);
        trTable.remove();
    }

})
