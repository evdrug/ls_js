/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
             resolve();
        }, seconds*1000);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
    let sortOb = function(perem){
        return function (a, b) {
            if (a[perem] > b[perem]) {
                return 1;
            }
            if (a[perem] < b[perem]) {
                return -1;
            }
            return 0;
        }
    };

    return new Promise(function(resolve, reject) {
        let myRequest = new XMLHttpRequest();
        myRequest.open('get', url);
        myRequest.send();
        myRequest.addEventListener('progress', function () {
            if (myRequest.status === 200) {
                var res = JSON.parse(myRequest.response);
                resolve(res.sort(sortOb('name')));
            }else {
                reject();
            }
        })
    })
}

export {
    delayPromise,
    loadAndSortTowns
};
