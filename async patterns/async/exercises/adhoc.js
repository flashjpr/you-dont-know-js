// Meaning of life

// Using callbacks
function getData(data, callback) {
    setTimeout(function () {
        callback(data);
    }, 1000);
}

getData(10, function (num1) {
    var x = 1 + num1;
    getData(30, function (num2) {
        var y = 1 + num2;
        getData(
            "Meaning of life: " + (x + y),
            function (answer) {
                console.log(answer);
            }
        )
    })
});

// Using promises
function getDataP(data) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(data);
        }, 1000);
    });
}

var x;

getDataP(10).then(function (num1) {
    x = 1 + num1;
    return getDataP(30);
}). then(function (num2) {
    var y = 1 + num2;
    return getDataP("Meaning of life: " + (x + y));
}).then(function (answer) {
    console.log(answer);
});