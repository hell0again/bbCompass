// カレンダーから現在の戦場情報を抽出する
var _ = require('lodash');
var request = require('request-json');

var client = request.createClient('http://borderbreak.com');
client.get('json/calendar-2016.json', {}, function(err, res, body) {
    var calendar = body["calendar"];

    // 終了したマップを除外
    var calendar = _.filter(calendar, function(el, it) {
        return el["is_new"];
        // var st = el["end_time"].split("-");
        // var t = new Date(st[0], st[1]-1, st[2]);
        // return (Date.now() < t.getTime());
    });

    // 終了時刻順にソート
    calendar = _.sortBy(calendar, function(el, it) {
        return parseInt(el["end_time"].replace(/-/g, ""));
    });

    console.log(JSON.stringify(calendar, "", "    "));
});

