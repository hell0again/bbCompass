// カレンダーから現在の戦場情報を抽出する
var _ = require('lodash');
var request = require('request-json');
var JsDiff = require('diff');

var hintsJson = require('../src/json/current-hint.json');
var mapJson = require('../src/json/map.json');

function onLoadCalendar(json) {
    var hints = hintsJson;
    var maps = mapJson;

    var calendar = json["calendar"];
    var typeToMaps = {};
    var warnMsg = null;
    _.each(calendar, function(el, it) {
        var type = el["type"];
        if (false == typeToMaps.hasOwnProperty(type)) {
            typeToMaps[type] = [];
        }
        var title = el["title"];
        var targetMap = _.find(maps, function(el2, it2) {
            var mapName = el2["text"];
            var re = new RegExp(mapName);
            return re.test(title);
        });
        if (targetMap != undefined) {
            typeToMaps[type].push(targetMap["value"]);
        } else {
            warnMsg = "[WARN] failed. no map matched to \"" + title + "\". finding from current-hints.json..";
        }
    });
    _.each(hints, function(el, it) {
        var type = el["type"];
        var hint = el["hint"];
        if (false == typeToMaps.hasOwnProperty(type)) {
            typeToMaps[type] = [];
        }
        var targetMap = _.find(maps, function(el2, it2) {
            var mapName = el2["text"];
            var re = new RegExp(mapName);
            return re.test(hint);
        });
        if (targetMap != undefined) {
            typeToMaps[type].push(targetMap["value"]);
        } else {
            warnMsg = "[WARN] failed. map not defined \"" + hint +"\"";
        }
    });
    var r = [];
    _.each(typeToMaps, function(el, it) {
        r.push({
            "type": it,
            "maps": _.uniq(el)
        });
    });
    if (null != warnMsg) {
        console.warn(warnMsg);
    }
    console.log(JSON.stringify(r, "", "    "));
}

var client = request.createClient('http://borderbreak.com');
client.get('json/calendar-2016.json', {}, function(err, res, body) {
    onLoadCalendar(body);
});

// (function() {
//     onLoadCalendar(require('../calendar-2016.json'));
// })();


