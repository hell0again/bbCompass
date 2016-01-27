// カレンダーから現在の戦場情報を抽出する
var _ = require('lodash');
var request = require('request-json');
var C = require('../src/js/const');

var client = request.createClient(C["calendar"]["urlHst"]);
client.get(C["calendar"]["urlPath"], {}, function(err, res, body) {
    var calendar = body["calendar"];

    // 終了したマップを除外
    var calendar = _.filter(calendar, function(el, it) {
        // return el["is_new"];

        var t = new Date(el["end_time"]); // "2016-01-01" > 2016/01/01 09:00:00 GMT+0900
        var timezoneOffsetJst = C["calendar"]["timezoneOffset"]; // JST9時をJST0時に補正
        t.setMinutes(t.getMinutes() +timezoneOffsetJst +C["calendar"]["endtimeOffset"]);

        return (Date.now()/1000 < t.getTime()/1000);
    });

    // 終了時刻順にソート
    calendar = _.sortBy(calendar, function(el, it) {
        return parseInt(el["end_time"].replace(/-/g, ""));
    });

    console.log(JSON.stringify(calendar, "", "    "));
});

