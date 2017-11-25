function slice2(array, from, to) {
    // let array2 = [];
    // var countFrom;
    // var countTo;
    // var callArr = array.length;
    //
    // if(from) {
    //     if (from < 0){
    //         countFrom =  callArr + from;
    //     }else{
    //         countFrom = from;
    //     }
    // }else {
    //     countFrom = 0;
    // }
    //
    // if(to) {
    //     if (to < 0){
    //         countTo =  callArr + to;
    //     }else{
    //         countTo = to-1;
    //     }
    // }else {
    //     countTo = callArr;
    // }
    //
    //
    // for (let i = countFrom; i < countTo; i++) {
    //     array2.push(array[i]);
    // }
    // return array2;

    let array2 = [];
    var callArr = array.length;
    var countFrom = from || 0;
    if(countFrom > 0) {
        countFrom
    }else {
        countFrom = (callArr + from)>0 ? countFrom : 0;
    }
    var countTo = (to || to === 0) ? to : callArr;
    if (countTo > callArr) {
        countTo = callArr;
    }
    console.log(to);
    console.log(countTo);
    if(countTo < 0) {
        countTo = callArr + to ;
    }


    for (let i = countFrom; i < countTo; i++) {
        array2.push(array[i]);
    }
    return array2;
}

var arr = [1, 2, 3, 4, 5, 6, 7];
console.log(slice2(arr,-9999,-4));
console.log(arr.slice(-9999,-4));