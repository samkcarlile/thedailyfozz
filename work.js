var FozzyData = {};
var currentDate = moment();

$(document).ready(function () {
    getData(refresh);
});

function getData(callback) {
    console.log("Getting data...");
    $.ajax({
        method: 'GET',
        url: "images.json",
        dataType: "json",
        success: function (data) {
            console.log("Got latest data!");
            window.FozzyData = data;
            callback();
        },
        error: function () {
            console.log("Couldn't get data...Retrying in 1 second.");
            setTimeout(getData, 1000);
        }
    });
}

function refresh() {
    var key = currentDate.format("MM/DD/YY");
    $('img')[0].src = FozzyData[key];
    $('i')[0].innerText = key;
}

function next() {
    var newDate = window.currentDate.clone().add(1, 'day');
    if (newDate.format("MM/DD/YY") in window.FozzyData) {
        window.currentDate = newDate;
        refresh();
    }
}

function previous() {
    var newDate = window.currentDate.clone().subtract(1, 'day');
    if (newDate.format("MM/DD/YY") in window.FozzyData) {
        window.currentDate = newDate;
        refresh();
    }
}
