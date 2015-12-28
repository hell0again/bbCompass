import _ from 'lodash';
/*global require*/ // eslint
var currentJson = require('../json/current.json');
var stageJson = require('../json/stage.json');
var mapJson = require('../json/map.json');

// NOTE: currentMapはこの順序で並べる
var currentMapEx = [
    {"type": "national_battle_high", "label": "▼ 全国対戦(上位) ▼"},
    {"type": "event",                "label": "▼ イベントバトル ▼"},
    {"type": "union_battle",         "label": "▼ ユニオンバトル ▼"},
    {"type": "scramble_battle",      "label": "▼ スクランブルバトル ▼"},
    {"type": "squad_battle",         "label": "▼ スカッドバトル ▼"},
    {"type": "national_battle_low",  "label": "▼ 全国対戦(下位) ▼"},
];
var BBDB = {
     // 現在の戦場
    "current_map": [
        // {"value": "24_sqa", "label": ".."}
    ],

    // 絞り込みに利用するので、valueと子供のdata-stageを一致させてください
    // また、data-scale属性として [1メートルあたりのピクセル数]を記載します。
    // (Javascriptで解釈するので、数式を書いてもOKです)
    // オマケ機能として[pixel/メートル, 倍率]と書いておくと、
    // 画像を指定倍率で縮小し、距離の縮尺も倍率にあわせて補正します
    "stage": [
        // {"value": "blouer",       "dataset": {"scale": "[1.137*0.7]"},   "text": "旧ブロア市街地"},
    ],

    // 絞り込み用にdata-stage属性を指定すること
    // class=eventは大攻防戦用、class=unionはユニオンバトル用
    "map": [
        // {"value":"darya_eb", "dataset": {"layer": "[]", "stage": "darya"}, "text": "炎雨降らす砲座", "class": "event"},
    ],

    // valueは[偵察範囲,進む距離,進む時間]
    "object_scout": [
        {"value": "[80,200,5.5]", "label": "ラーク偵察機", "text": "ラーク"},
        {"value": "[50,500,8]", "label": "ファルコン偵察機", "text": "ファルコン"},
        {"value": "[120,200,11]", "label": "アウル偵察機", "text": "アウル"},
        {"value": "[250,20,0.6]", "label": "ロビン偵察機", "text": "ロビン"},
        {"value": "[90,50,20]", "label": "ストーク偵察機", "text": "ストーク"},
        {"value": "[100,200,11]", "label": "ギィ", "text": "ギィ"},
    ],
    // valueは 索敵半径を指定
    "object_sensor": [
        {"value": "60", "label": "索敵センサー", "text": "初期センサー"},
        {"value": "45", "label": "小型索敵センサー", "text": "小型センサー"},
        {"value": "90", "label": "広域索敵センサー", "text": "広域センサー"},
        {"value": "55", "label": "軽量索敵センサー", "text": "軽量センサー"},
    ],
    // valueは [索敵半径,角度]
    "object_radar": [
        {"value": "[200,60]", "label": "レーダー", "text": "レーダー"},
        {"value": "[160,120]", "label": "レーダーII", "text": "レーダーII"},
        {"value": "[130,360]", "label": "レーダーIII", "text": "レーダーIII"},
    ],
    // valueは [射出半径,索敵半径]
    "object_sonde": [
        {"value": "[350,65]", "label": "滞空索敵弾", "text": "滞空索敵弾"},
        {"value": "[450,55]", "label": "小型索敵弾", "text": "小型索敵弾"},
        {"value": "[250,80]", "label": "広域索敵弾", "text": "広域索敵弾"},
    ],
    // valueは 索敵半径
    "object_ndsensor": [
        {"value": "150", "label": "ND索敵", "text": "ND索敵"},
        {"value": "100", "label": "小型ND", "text": "小型ND"},
        {"value": "220", "label": "広域ND", "text": "広域ND"},
      ],
    // valueは [索敵半径(Aモード),索敵半径(Bモード)]
    "object_vsensor": [
        {"value": "[55,160]", "label": "Vセンサー投射機", "text": "Vセンサー"},
        {"value": "[40,130]", "label": "小型Vセンサー投射機", "text": "小型Vセンサー"},
    ],
    // valueは [射程,爆発半径,着弾誤差半径]
    "object_howitzer": [
        {"value": "[300,25,15]", "label": "タイタン榴弾砲", "text": "タイタン"},
        {"value": "[250,24,25]", "label": "コロッサス榴弾砲", "text": "コロッサス"},
        {"value": "[500,25,20]", "label": "アトラント榴弾砲", "text": "アトラント"},
        {"value": "[350,40,0]", "label": "ギガノト榴弾砲", "text": "ギガノト"},
        {"value": "[260,35,15]", "label": "ネフィリム榴弾砲", "text": "ネフィリム"},
        {"value": "[350,28,15]", "label": "T10", "text": "T10"},
        {"value": "[260,45,0]", "label": "T25", "text": "T25"},
        {"value": "[300,30,30]", "label": "XHR", "text": "XHR"},
        {"value": "[400,35,10]", "label": "T30", "text": "T30"},
        {"value": "[250,18,0]", "label": "タウル重装砲", "text": "タウル"},
        {"value": "[250,16,0]", "label": "ヴァーゴ重装砲", "text": "ヴァーゴ"},
        {"value": "[250,24,0]", "label": "ドラード重装砲", "text": "ドラード"},
        {"value": "[250,15,0]", "label": "ハイドラ重装砲", "text": "ハイドラ"},
        {"value": "[250,28,0]", "label": "モノセロス重装砲", "text": "モノセロス"},
    ],
    // value経由で種類を指定する
    "object_misc": [
        {"value": "bunker", "label": "サテライトバンカー", "text": "バンカー"},
        {"value": "sentry", "label": "セントリーガン", "text": "セントリー"},
        {"value": "aerosent", "label": "エアロセントリー", "text": "エアロセントリー"},
        {"value": "bomber", "label": "爆撃通信機", "text": "爆撃通信機"},
        {"value": "bascout", "label": "偵察要請装置", "text": "偵察要請装置"},
    ],
    "object_icon": [
        {"value": "image/assault.png", "label": "強襲", "text": "強襲"},
        {"value": "image/heavy.png", "label": "重火力", "text": "重火力"},
        {"value": "image/snipe.png", "label": "狙撃", "text": "狙撃"},
        {"value": "image/support.png", "label": "支援", "text": "支援"},
        {"value": "image/absorb.png", "label": "吸収装置", "text": "吸収装置"},
        {"value": "image/mine.png", "label": "マイン", "text": "マイン"},
        {"value": "image/sentry.png", "label": "セントリー", "text": "セントリー"},
        {"value": "image/aero.png", "label": "エアロセントリー", "text": "エアロセントリー"},
        {"value": "image/remote.png", "label": "リモートシューター", "text": "リモートシューター"},
    ],

    // 仮。valueは [射程距離, 角度]
    "object_turret": [
        {"value": "[200,180]", "label": "ガンターレットR", "text": "Rタレ"},
        {"value": "[250,180]", "label": "ガンターレットG", "text": "Gタレ"},
        {"value": "[250,180]", "label": "ガンターレットM", "text": "Mタレ"},
        {"value": "[200,180]", "label": "ガンターレットL", "text": "Lタレ"},
    ],
    // 仮。valueは [索敵半径]
    "object_scoutplant": [
        {"value": "[75]", "label": "索敵施設", "text": "索敵施設"},
        {"value": "[85]", "label": "索敵施設", "text": "索敵施設"},
        {"value": "[100]", "label": "索敵施設", "text": "索敵施設"},
    ],
};

(function completeStage() {
    _.each(stageJson, function(el, it) {
        BBDB["stage"].push({
            "value": el["value"],
            "dataset": {
                "scale": el["dataset"]["scale"],
            },
            "text": el["text"],
        });
    });
})();
(function completeMap() {
    _.each(mapJson, function(el, it) {
        var map = {
            "value": el["value"],
            "dataset": {
                "layer": el["dataset"]["layer"],
                "stage": el["dataset"]["stage"],
            },
            "text": el["text"],
        };
        if (true == el.hasOwnProperty("class")) {
            map["class"] = el["class"];
        }
        BBDB["map"].push(map);
    });
})();
(function completeCurrentMap() {
    var i, il, key, type;
    var temps = {}; // {"belsk_f": {"mapName": "汀の", "stageId": "kinich", "stageName": "キニシュ"}, ...}

    // // 例外対応分をマージ
    // _.each(currentMapEx, function(el, it) {
    //     var type = el["type"];
    //     if (false == el.hasOwnProperty("default")) {return;}
    //     var r = _.find(currentJson, function(el2) {
    //         return type == el2["type"];
    //     });
    //     if (r == undefined) {
    //         currentJson.push({
    //             "type": type,
    //             "maps": el["default"]
    //         });
    //     } else {
    //         r["maps"] = _.union( r["maps"], el["default"]);
    //     }
    // });

    // tempsエントリ準備
    _.each(currentJson, function(el, it) {
        _.each(el["maps"], function(el2, it2) {
            temps[el2] = {};
        });
    });
    // mapとの紐付け
    _.each(BBDB["map"], function(el, it) {
        var map = el;
        _.each(temps, function(el2, it2) {
            var temp = el2;
            if (map["value"] == it2) {
                temp["mapName"] = map["text"];
                temp["stageId"] = map["dataset"]["stage"];
            }
        });
    });
    // stageとの紐付け
    _.each(BBDB["stage"], function(el, it) {
        var stage = el;
        _.each(temps, function(el2, it2) {
            var temp = el2;
            if (stage["value"] === temp["stageId"]) {
                temp["stageName"] = stage["text"];
            }
        });
    });
    // currentMapEx順で BBDB にpush
    _.each(currentMapEx, function(el, it) {
        var type = el["type"];
        var m = _.find(currentJson, function(el2) {
            return type == el2["type"];
        });
        if (m == undefined || m["maps"].length == 0) { return; }
        var maps = m["maps"];

        // セパレータをpush
        BBDB["current_map"].push({
            "disabled": true,
            "label": el["label"]
        });

        // mapsをpush
        _.each(maps, function(el2, it2) {
            var mapId = el2;
            var mapName = temps[mapId]["mapName"];
            // var stageId = temps[mapId]["stageId"];
            var stageName = temps[mapId]["stageName"];
            BBDB["current_map"].push({
                "value": mapId,
                "label": mapName + " | " + stageName
            });
        });
    });
})();

export default BBDB

