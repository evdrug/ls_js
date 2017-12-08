/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return require('./index').loadAndSortTowns();
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) === -1) {
        return false;
    } else {
        return true;
    }
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise;

function createDiv(name,fBlock) {
    let myDiv = document.createElement('div');
    myDiv.textContent = name;
    fBlock.appendChild(myDiv);
}

filterInput.addEventListener('keyup', function(ev) {
    let value = ev.target.value.trim();
    if (value.length>0){
        loadTowns()
            .then(function (e) {
                filterResult.innerHTML ='';
                let flag =[]
                e.forEach( function (item, i, e) {
                    if(isMatching(item.name,value)){
                        createDiv(item.name,filterResult)
                        flag.push(item.name)
                    }
                })
                if(flag.length == 0){
                    createDiv('Нечего не найдено',filterResult);
                }
            })
            .catch(function () {
                filterResult.innerHTML ='';
                createDiv('Не удалось загрузить города',filterResult);
                let myButton = document.createElement('button');
                myButton.textContent = 'Повторить';
                filterResult.appendChild(myButton);
                myButton.addEventListener('click', function() {
                    var event = new Event("keyup");
                    filterInput.dispatchEvent(event);
                })
            })
        filterResult.innerHTML ='Загрузка...';
    }else {
        filterResult.innerHTML ='';
    }

});

export {
    loadTowns,
    isMatching
};
