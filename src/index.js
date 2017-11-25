/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++){
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    let arr = [];
    for (let i = 0; i < array.length; i++){
        arr.push(fn(array[i], i, array));
    }
    return arr;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    let data;
    let count = 0;
    if(initial){
        data = initial;
    }else {
        data = array[0];
        count = 1
    }

    for (let i = count; i < array.length; i++){
        data = fn(data, array[i], i, array);
    }
    return data;
 }

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return prop in obj;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    let arrObj = [];
    for (let prop in obj){
        arrObj.push(prop.toUpperCase());
    }
    return arrObj;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    let array2 = [];
    var callArr = array.length;

    var countFrom = from || 0;
    if(countFrom > 0) {
        countFrom
    }else {
        countFrom = (callArr + from) > 0 ? countFrom : 0;
    }

    var countTo = (to || to === 0) ? to : callArr;

    if (countTo > callArr) {
        countTo = callArr;
    }
    if(countTo < 0) {
        countTo = callArr + to ;
    }

    for (let i = countFrom; i < countTo; i++) {
        array2.push(array[i]);
    }
    return array2;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    obj = {};
    return new Proxy(obj, {
        get(prop,value){
            return prop[value]*prop[value];
        }
    });
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};