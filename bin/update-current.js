// カレンダーから現在の戦場情報を抽出する
var _ = require('lodash');
var request = require('request-json');

var hintsJson = require('../src/json/current-hint.json');
var extrasJson = require('../src/json/current-extra.json');
var mapJson = require('../src/json/map.json');

function onLoadCalendar(json) {
    var hints = hintsJson;
    var extras = extrasJson;
    var maps = mapJson;

    var calendar = json;
    var typeToMaps = {};
    var warnMsgs = [];

    var findMapByTitle = function(title) {
        return _.find(maps, function(el, it) {
            var mapName = el["text"];
            var re = new RegExp(mapName);
            return re.test(title);
        });
    };
    _.each(calendar, function(el, it) {
        var type = el["type"];
        if (false == typeToMaps.hasOwnProperty(type)) {
            typeToMaps[type] = [];
        }
        var title = el["title"];
        var targetMap = findMapByTitle(title);
        if (targetMap == undefined) {
            // タイトル内にマップ名が含まれていなかったらヒントから探す
            var found = _.find(hints, function(el2, it2) {
                var filter = el2["filter"];
                return _.all(filter, function(el3, it3) {
                    return (el.hasOwnProperty(it3) && el[it3] == el3);
                });
            });
            if (found != undefined) {
                targetMap = findMapByTitle(found["hint"]);
            }
        }
        if (targetMap != undefined) {
            typeToMaps[type].push(targetMap["value"]);
        } else {
            warnMsgs.push("[WARN] failed. no map matched to \"" + title + "\"");
        }
    });
    // 定常マップを追加
    _.each(extras, function(el, it) {
        var type = el["type"];
        var title = el["title"];
        if (false == typeToMaps.hasOwnProperty(type)) {
            typeToMaps[type] = [];
        }
        var targetMap = findMapByTitle(title);
        if (targetMap != undefined) {
            typeToMaps[type].push(targetMap["value"]);
        } else {
            warnMsgs.push("[WARN] failed. map not defined \"" + title +"\"");
        }
    });

    var r = [];
    _.each(typeToMaps, function(el, it) {
        r.push({
            "type": it,
            "maps": _.uniq(el)
        });
    });
    if (0 < warnMsgs.length) {
        console.warn(warnMsgs.join("\n"));
    }
    console.log(JSON.stringify(r, "", "    "));
}


// var client = request.createClient('http://borderbreak.com');
// client.get('json/calendar-2016.json', {}, function(err, res, body) {
//     onLoadCalendar(body);
// });

(function() {
    onLoadCalendar(require('../calendar-2016.json'));
})();


