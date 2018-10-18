function coroutine(generator) {
    var it = generator();
    return function () {
        return it.next.apply(it, arguments);
    }
}

// var run = coroutine(function* () {
//     var x = 1 + (yield);
//     var y = 1 + (yield);
//     yield (x + y);
// });

// run();
// run(10);
// console.log("Meaning of life: " + run(30).value);

function getData(data) {
    setTimeout(function () {
        run(data);
    }, 1000);
}

var run = coroutine(function* () {
    var x = 1 + (yield getData(10));
    var y = 1 + (yield getData(30));
    var answer = (yield getData(
        "Meaning of life: " + (x + y)
    ));
    console.log(answer);
});

run();
