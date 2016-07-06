import _ from 'lodash';
/*global require*/ // eslint
//var Map = require('es6-map');
require('es6-collections');
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
    {"type": "undefined",            "label": "▼ その他 ▼"},
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
        {"value": "[65,500,8]", "label": "ファルコン偵察機", "text": "ファルコン"},
        {"value": "[120,200,11]", "label": "アウル偵察機", "text": "アウル"},
        {"value": "[250,20,0.6]", "label": "ロビン偵察機", "text": "ロビン"},
        {"value": "[100,50,20]", "label": "ストーク偵察機", "text": "ストーク"},
        {"value": "[100,200,11]", "label": "ギィ", "text": "ギィ"},
    ],
    // valueは 索敵半径を指定
    "object_sensor": [
        {"value": "60", "label": "索敵センサー", "text": "初期センサー"},
        {"value": "45", "label": "小型索敵センサー", "text": "小型センサー"},
        {"value": "95", "label": "広域索敵センサー", "text": "広域センサー"},
        {"value": "55", "label": "軽量索敵センサー", "text": "軽量センサー"},
    ],
    // valueは [索敵半径,角度]
    "object_radar": [
        {"value": "[210,60]", "label": "レーダー", "text": "レーダー"},
        {"value": "[170,120]", "label": "レーダーII", "text": "レーダーII"},
        {"value": "[140,360]", "label": "レーダーIII", "text": "レーダーIII"},
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
    // valueは 索敵半径
    "object_clearingsonar": [
        {"value": "80", "label": "ソナー", "text": "ソナー"},
        {"value": "60", "label": "ソナーM", "text": "ソナーM"},
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
        {"value": "image/scout.png", "label": "遊撃", "text": "遊撃"},
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
    var tempMap = new Map(); // 終わったらclearしないとリーク

    // tempMap準備、日付関連
    _.each(currentJson, function(el, it) {
        var now = new Date(); // タイムゾーン不明

        // new Date("2016/01/01") は 2016/01/01 00:00:00 GMT+0900 (JST)
        // new Date("2016-01-01") は 2016/01/01 09:00:00 GMT+0900 (JST) #i.e. UTC0時がJST9時

        // var timezoneOffset = now.getTimezoneOffset();
        var timezoneOffsetJst = -9 * 60; // JST9時をJST0時に補正
        var startDate = new Date(el["start_time"]); // 2016/01/01 なら 2016/01/01 07:30:00 (JST) から
        startDate.setMinutes(startDate.getMinutes() +timezoneOffsetJst +7*60 +30);
        var endDate = new Date(el["end_time"]); // 2016/01/01 なら 2016/01/02 07:29:59 (JST) まで
        endDate.setMinutes(endDate.getMinutes() +timezoneOffsetJst +24*60 +7*60 +30);

        if (endDate.getTime()/1000 < now.getTime()/1000) { return; } // 終了したマップは除外

        var mv = {};
        tempMap.set(el, mv);

        if (now.getTime()/1000 < startDate.getTime()/1000) {
            // get〜の日付関数は現地の日付を返すのでJST3時をUTC3時に読み替えて getUTC〜 を使う
            var dispStartDate = new Date(startDate.getTime());
            dispStartDate.setMinutes(dispStartDate.getMinutes() -timezoneOffsetJst); // JST3時 > JST12時＝UTC3時
            mv["datePrefix"] = dispStartDate.getUTCMonth() + 1 + "/" + dispStartDate.getUTCDate() + "〜";
        }
    });
    // mapとの紐付け。残念ながら O(map数 x tempMap数)
    _.each(BBDB["map"], function(el, it) {
        var map = el;
        tempMap.forEach(function(mv, mk) {
            if (mk["map"] != undefined && mk["map"] == map["value"]) {
                // mv["mapId"] = map["value"];
                mv["mapName"] = map["text"];
                mv["stageId"] = map["dataset"]["stage"];
            }
        });
    });
    // stageとの紐付け。残念ながら O(stage数 x tempMap数)
    _.each(BBDB["stage"], function(el, it) {
        var stage = el;
        tempMap.forEach(function(mv, mk) {
            if (mv["stageId"] != undefined && mv["stageId"] == stage["value"]) {
                mv["stageName"] = stage["text"];
            }
        });
    });
    // currentMapEx順で BBDB にpush
    _.each(currentMapEx, function(el, it) {
        var mks = [];
        tempMap.forEach(function(mv, mk) {
            var t = mk.type || "undefined";
            if (t == el["type"]) {
                mks.push(mk);
            }
        });
        if (mks.length == 0) { return; }

        // セパレータをpush
        BBDB["current_map"].push({
            "disabled": true,
            // "label": el["label"]
            "text": el["label"]
        });

        // mapsをpush
        _.each(mks, function(mk) {
            var mv = tempMap.get(mk);
            var value = mk["map"];
            var label = "";
            var disabled = false;

            if (mv["datePrefix"] != undefined) {
                label = "[" + mv["datePrefix"] + "]";
            }
            if (mk["map"] == undefined) {
                value = "";
                label += "[NO DATA]";
                disabled = true;
            }
            if (mv["mapName"] == undefined || mv["stageName"] == undefined) {
                // 存在しないマップなら カレンダーのtitleを拾う
                label += mk["title"];
                disabled = true;
            } else {
                label += mv["mapName"] + " | " + mv["stageName"];
            }

            BBDB["current_map"].push({
                "value": value,
                // "label": label,
                "text": label,
                "disabled": disabled
            });
        });
    });
    tempMap.clear();
})();

export default BBDB

