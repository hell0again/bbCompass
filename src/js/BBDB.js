import 'babel-polyfill';
import _ from 'lodash';
const stageObject = require('../json/stage.json');
const mapObject = require('../json/map.json');
const objectsObject = require('../json/objects.json');
const currentObject = require('../json/current.json');

// NOTE: currentMapはこの順序で並べる
const currentMapLabels = [
    {"type": "national_battle_high", "label": "▼ 全国対戦(上位) ▼"},
    {"type": "event",                "label": "▼ イベントバトル ▼"},
    {"type": "union_battle",         "label": "▼ ユニオンバトル ▼"},
    {"type": "scramble_battle",      "label": "▼ スクランブルバトル ▼"},
    {"type": "squad_battle",         "label": "▼ スカッドバトル ▼"},
    {"type": "national_battle_low",  "label": "▼ 全国対戦(下位) ▼"},
    {"type": "undefined",            "label": "▼ その他 ▼"},
];
const confSchema = {
    // 現在の戦場
    "current_map": [], // {"value": "24_sqa", "label": ".."}

    // 絞り込みに利用するので、valueと子供のdata-stageを一致させてください
    // また、data-scale属性として [1メートルあたりのピクセル数]を記載します。
    // (Javascriptで解釈するので、数式を書いてもOKです)
    // オマケ機能として[pixel/メートル, 倍率]と書いておくと、
    // 画像を指定倍率で縮小し、距離の縮尺も倍率にあわせて補正します
    "stage": [], // {"value": "blouer",       "dataset": {"scale": "[1.137*0.7]"},   "text": "旧ブロア市街地"},

    // 絞り込み用にdata-stage属性を指定すること
    // class=eventは大攻防戦用、class=unionはユニオンバトル用
    "map": [], // {"value":"darya_eb", "dataset": {"layer": "[]", "stage": "darya"}, "text": "炎雨降らす砲座", "class": "event"},

    "object_scout": [], // valueは[偵察範囲,進む距離,進む時間]
    "object_sensor": [], // valueは 索敵半径を指定
    "object_radar": [], // valueは [索敵半径,角度]
    "object_sonde": [], // valueは [射出半径,索敵半径]
    "object_ndsensor": [], // valueは 索敵半径
    "object_vsensor": [], // valueは [索敵半径(Aモード),索敵半径(Bモード)]
    "object_howitzer": [], // valueは [射程,爆発半径,着弾誤差半径]
    "object_misc": [], // value経由で種類を指定する
    "object_icon": [],
    "object_turret": [], // 仮。valueは [射程距離, 角度]
    "object_scoutplant": [], // 仮。valueは [索敵半径]
};
class Conf {
    constructor() {}
    get conf() { return this._conf; }
    // { key: [object], key: [object] } をロード
    load(obj) {
        _.each(obj, (el, it) => {
            this.beforeEachLoad(it);
            this.conf[it] = el;
            this.afterEachLoad(it);
        });
    }
    // objectを conf.key にロードする直前に呼ばれる
    beforeEachLoad(key) {
        if (! this.conf.hasOwnProperty(key)) {
            throw new Error(`loading unexpected conf:(${key})!!`);
        }
    }
    // objectを conf.key にロードした直後に呼ばれる
    afterEachLoad(key) {}
}
export default class BbConf extends Conf {
    constructor() {
        super();
        this._loadSchema();
        this.loadStageObject();
        this.loadMapObject();
        this.loadObjectsObject();
        this.loadCurrentMap();
    }
    _loadSchema() {
        // this._conf = Object.assign({}, confSchema); // shallow
        this._conf = JSON.parse(JSON.stringify(confSchema)); // deep
    }
    getNow() {
        return new Date();
    }
    loadStageObject() {
        this.load(stageObject);
    }
    loadMapObject() {
        this.load(mapObject);
    }
    loadObjectsObject() {
        this.load(objectsObject);
    }
    loadCurrentMap() {
        this.completeCurrentMap(currentObject);
    }
    // current_mapを埋める。mapとstageがロードしてからcurrent_mapを埋める
    completeCurrentMap (currentObject) {
        let tempMap = new Map(); // ES6 map!! 使い終わったらclearしないとリーク

        // tempMap準備、日付関連
        _.each(currentObject, (el, it) => {
            // new Date("2016/01/01") は 2016/01/01 00:00:00 GMT+0900 (JST)
            // new Date("2016-01-01") は 2016/01/01 09:00:00 GMT+0900 (JST) ## i.e. "/"区切りはJST時間、"-"はUTC時間ということ。UTC0時がJST9時

            // let timezoneOffset = now.getTimezoneOffset();
            let timezoneOffsetJst = -9 * 60; // JST9時をJST0時に補正
            let startDate = new Date(el["start_time"]); // 2016/01/01 なら 2016/01/01 07:30:00 (JST) から
            startDate.setMinutes(startDate.getMinutes() +timezoneOffsetJst +7*60 +30);
            let endDate = new Date(el["end_time"]); // 2016/01/01 なら 2016/01/02 07:29:59 (JST) まで
            endDate.setMinutes(endDate.getMinutes() +timezoneOffsetJst +24*60 +7*60 +30);

            if (endDate.getTime()/1000 <= this.getNow().getTime()/1000) { return; } // 終了したマップは除外

            let mv = {};
            tempMap.set(el, mv);

            if (this.getNow().getTime()/1000 < startDate.getTime()/1000) {
                // get〜の日付関数は現地の日付を返すのでJST3時をUTC3時に読み替えて getUTC〜 を使う
                let dispStartDate = new Date(startDate.getTime());
                dispStartDate.setMinutes(dispStartDate.getMinutes() -timezoneOffsetJst); // JST3時 > JST12時＝UTC3時
                mv["datePrefix"] = `${dispStartDate.getUTCMonth() + 1}/${dispStartDate.getUTCDate()}〜`;
            }
        });
        // mapとの紐付け。残念ながら O(map数 x tempMap数)
        _.each(this.conf["map"], (el, it) => {
            let map = el;
            tempMap.forEach((mv, mk) => {
                if (mk["map"] != undefined && mk["map"] == map["value"]) {
                    // mv["mapId"] = map["value"];
                    mv["mapName"] = map["text"];
                    mv["stageId"] = map["dataset"]["stage"];
                }
            });
        });
        // stageとの紐付け。残念ながら O(stage数 x tempMap数)
        _.each(this.conf["stage"], (el, it) => {
            let stage = el;
            tempMap.forEach( (mv, mk) => {
                if (mv["stageId"] != undefined && mv["stageId"] == stage["value"]) {
                    mv["stageName"] = stage["text"];
                }
            });
        });
        // currentMapLabels順でpush
        _.each(currentMapLabels, (el, it) => {
            let mks = [];
            tempMap.forEach( (mv, mk) => {
                let t = mk.type || "undefined";
                if (t == el["type"]) {
                    mks.push(mk);
                }
            });
            if (mks.length == 0) { return; }

            // セパレータをpush
            this.conf["current_map"].push({
                "disabled": true,
                // "label": el["label"]
                "text": el["label"]
            });

            // mapsをpush
            _.each(mks, (mk) => {
                let mv = tempMap.get(mk);
                let value = mk["map"];
                let label = "";
                let disabled = false;

                if (mv["datePrefix"] != undefined) {
                    label = `[${mv["datePrefix"]}]`;
                }
                if (mk["map"] == undefined) {
                    value = "";
                    label += `[NO DATA]`;
                    disabled = true;
                }
                if (mv["mapName"] == undefined || mv["stageName"] == undefined) {
                    // 存在しないマップなら カレンダーのtitleを拾う
                    label += mk["title"];
                    disabled = true;
                } else {
                    label += `${mv["mapName"]} | ${mv["stageName"]}`;
                }

                this.conf["current_map"].push({
                    "value": value,
                    // "label": label,
                    "text": label,
                    "disabled": disabled
                });
            });
        });
        tempMap.clear();
    }
}

