function loadTowns() {
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
        myRequest.addEventListener('load', function () {
            var res = JSON.parse(myRequest.response);
            resolve(res.sort(sortOb('name')));
        });
        myRequest.addEventListener('error', function () {
            reject(error);
        })
    })
}

function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) === -1) {
        return false;
    } else {
        return true;
    }
}

loadTowns()
    .then(function (e) {
        console.log(e)
    })

