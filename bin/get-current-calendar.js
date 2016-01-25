// カレンダーから現在の戦場情報を抽出する
var _ = require('lodash');
var request = require('request-json');

var client = request.createClient('http://borderbreak.com');
client.get('json/calendar-2016.json', {}, function(err, res, body) {
    var calendar = body["calendar"];

    // 終了したマップを除外
    var calendar = _.filter(calendar, function(el, it) {
        // return el["is_new"];

        var t = new Date(el["end_time"]); // "2016-01-01" > 2016/01/01 09:00:00 GMT+0900
        var timezoneOffsetJst = -9 * 60; // JST9時をJST0時に補正
        t.setMinutes(t.getMinutes() +timezoneOffsetJst +24*60 +7*60 +30); // 終了日の翌7:30まで

        return (Date.now()/1000 < t.getTime()/1000);
    });

    // 終了時刻順にソート
    calendar = _.sortBy(calendar, function(el, it) {
        return parseInt(el["end_time"].replace(/-/g, ""));
    });

    console.log(JSON.stringify(calendar, "", "    "));
});

