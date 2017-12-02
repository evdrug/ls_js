/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
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
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    function myRandom(x) {
        return Math.floor(Math.random() * x);
    }

    let newDiv2 = document.createElement('div');
    newDiv2.classList.add('draggable-div');
    newDiv2.style.width = myRandom(100) + 'px';
    newDiv2.style.height = myRandom(100) + 'px';
    newDiv2.style.background =`rgb(${myRandom(256)},${myRandom(256)},${myRandom(256)})`;
    newDiv2.style.position = 'absolute';
    newDiv2.style.left = myRandom(window.innerWidth) + 'px';
    newDiv2.style.top = myRandom(window.innerHeight) + 'px';

    return newDiv2;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function addListeners(target) {
    let flag = false;
    let shiftX;
    let shiftY;
    target.addEventListener('mousedown', (e)=>{
        flag = true;
        let coords = getCoords(target);
        shiftX = e.pageX - coords.left;
        shiftY = e.pageY - coords.top;
        target.style.zIndex = 10;
    })
    target.addEventListener('mouseup', ()=>{
        flag = false;
        target.style.zIndex = 1;
    })
    document.addEventListener('mousemove', (e)=>{
        if (flag) {
            target.style.left = e.pageX - shiftX + 'px';
            target.style.top = e.pageY - shiftY + 'px';
        }
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
