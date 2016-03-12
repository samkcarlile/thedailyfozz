var FozzyData = {};
var FozzyPosition = 0;

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
    $('img')[0].src = FozzyData[FozzyPosition].url;
    $('i')[0].innerText = FozzyData[FozzyPosition].date;
}

function next() {
    if (FozzyPosition + 1 < FozzyData.length) {
        FozzyPosition++;
        refresh();
    }
}

function previous() {
    if (FozzyPosition - 1 > -1) {
        FozzyPosition--;
        refresh();
    }
}