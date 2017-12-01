function test(n) {
    for(let i = 0; i<n;i++){
        if(i==3){
            test()
        }
        console.log(i);
    }
}
test(5);
