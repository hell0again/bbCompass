import test from 'ava';
import 'babel-register';

import BBDB from '../src/js/BBDB';
class TestBbDb extends BBDB {
    getNow() {
        return new Date("2016/01/02");
    }
    loadStageObject() {
        var stages = {
            "stage": [
                {"value": "map",          "dataset": {"scale": "[160/100*0.7]"}, "text": "スカービ渓谷"},
                {"value": "blouer",       "dataset": {"scale": "[1.137*0.7]"},   "text": "旧ブロア市街地"}
            ]
        };
        this.load(stages);
    }
    loadMapObject() {
        var maps = {
            "map": [
                {"value":"map_a", "dataset": {"layer": "[]", "stage": "map"}, "text": "戦線突破"},
                {"value":"map_b", "dataset": {"layer": "[]", "stage": "map"}, "text": "砂上の激突"},
                {"value":"blouer_a", "dataset": {"layer": "[]", "stage": "blouer"}, "text": "熱戦の河畔"},
                {"value":"blouer_ea", "dataset": {"layer": "[]", "stage": "blouer"}, "text": "激闘の丘陵", "class": "event"}
           ]
        };
        this.load(maps);
    }
    loadObjectsObject() {
        var objects = {
            "object_scout": [
                {"value": "[80,200,5.5]", "label": "ラーク偵察機", "text": "ラーク"},
                {"value": "[50,500,8]", "label": "ファルコン偵察機", "text": "ファルコン"}
            ],
            "object_sensor": [
                {"value": "60", "label": "索敵センサー", "text": "初期センサー"},
                {"value": "45", "label": "小型索敵センサー", "text": "小型センサー"}
            ]
        };
        this.load(objects);
    }
    loadCurrentMap() {
        var current = [
            {
                "map": "map_a"
            },
            {
                "start_time": "2016-01-01",
                "end_time": "2016-01-03",
                "type": "event",
                "map": "blouer_ea"
            },
        ];
        this.completeCurrentMap(current);
    }
}
test('TestBbDb#load', (t) => {
    var bbdb = new TestBbDb();
    var conf = bbdb.conf;
    var exp = {
        "current_map": [
            {
                "disabled": true,
                "text": "▼ イベントバトル ▼"
            },
            {
                "value": "blouer_ea",
                "text": "激闘の丘陵 | 旧ブロア市街地",
                "disabled": false
            },
            {
                "disabled": true,
                "text": "▼ その他 ▼"
            },
            {
                "value": "map_a",
                "text": "戦線突破 | スカービ渓谷",
                "disabled": false
            }
        ],
        "stage": [
            {"value": "map",          "dataset": {"scale": "[160/100*0.7]"}, "text": "スカービ渓谷"},
            {"value": "blouer",       "dataset": {"scale": "[1.137*0.7]"},   "text": "旧ブロア市街地"}
        ],
        "map": [
            {"value":"map_a", "dataset": {"layer": "[]", "stage": "map"}, "text": "戦線突破"},
            {"value":"map_b", "dataset": {"layer": "[]", "stage": "map"}, "text": "砂上の激突"},
            {"value":"blouer_a", "dataset": {"layer": "[]", "stage": "blouer"}, "text": "熱戦の河畔"},
            {"value":"blouer_ea", "dataset": {"layer": "[]", "stage": "blouer"}, "text": "激闘の丘陵", "class": "event"}
        ],
        "object_scout": [
            {"value": "[80,200,5.5]", "label": "ラーク偵察機", "text": "ラーク"},
            {"value": "[50,500,8]", "label": "ファルコン偵察機", "text": "ファルコン"}
        ],
        "object_sensor": [
            {"value": "60", "label": "索敵センサー", "text": "初期センサー"},
            {"value": "45", "label": "小型索敵センサー", "text": "小型センサー"}
        ],
        "object_radar": [],
        "object_sonde": [],
        "object_ndsensor": [],
        "object_vsensor": [],
        "object_howitzer": [],
        "object_misc": [],
        "object_icon": [],
        "object_turret": [],
        "object_scoutplant": []
    };
    t.ok(JSON.stringify(conf.current_map, undefined, "  ") ==
         JSON.stringify(exp.current_map, undefined, "  ") );
    t.ok(JSON.stringify(conf.map, undefined, "  ") ==
         JSON.stringify(exp.map, undefined, "  ") );
    t.ok(JSON.stringify(conf.stage, undefined, "  ") ==
         JSON.stringify(exp.stage, undefined, "  ") );
    t.ok(JSON.stringify(conf.object_scout, undefined, "  ") ==
         JSON.stringify(exp.object_scout, undefined, "  "));
    t.ok(JSON.stringify(conf.object_sensor, undefined, "  ") ==
         JSON.stringify(exp.object_sensor, undefined, "  "));
    t.ok(JSON.stringify(conf.object_radar, undefined, "  ") ==
         JSON.stringify(exp.object_radar, undefined, "  "));
    t.ok(JSON.stringify(conf.object_sonde, undefined, "  ") ==
         JSON.stringify(exp.object_sonde, undefined, "  "));
    t.ok(JSON.stringify(conf.object_ndsensor, undefined, "  ") ==
         JSON.stringify(exp.object_ndsensor, undefined, "  "));
    t.ok(JSON.stringify(conf.object_vsensor, undefined, "  ") ==
         JSON.stringify(exp.object_vsensor, undefined, "  "));
    t.ok(JSON.stringify(conf.object_howitzer, undefined, "  ") ==
         JSON.stringify(exp.object_howitzer, undefined, "  "));
    t.ok(JSON.stringify(conf.object_misc, undefined, "  ") ==
         JSON.stringify(exp.object_misc, undefined, "  "));
    t.ok(JSON.stringify(conf.object_icon, undefined, "  ") ==
         JSON.stringify(exp.object_icon, undefined, "  "));
    t.ok(JSON.stringify(conf.object_turret, undefined, "  ") ==
         JSON.stringify(exp.object_turret, undefined, "  "));
    t.ok(JSON.stringify(conf.object_scoutplant, undefined, "  ") ==
         JSON.stringify(exp.object_scoutplant, undefined, "  "));
});
class TestBbDbBeforeMapStart extends TestBbDb {
    getNow() {
        // "2016-01-01T07:29:59+0900"
        var clientNow = new Date("2016-01-01"); // UTC0時
        var timezoneOffsetJst = -9 * 60 * 60; // UTC0時をJST0時に補正
        var time = 7*60*60 +30*60 + 0 -1;
        clientNow.setSeconds(clientNow.getSeconds() +timezoneOffsetJst +time);
        return clientNow;
    }
}
class TestBbDbMapStart extends TestBbDb {
    getNow() {
        // "2016-01-01T07:30:00+0900"
        var clientNow = new Date("2016-01-01"); // UTC0時
        var timezoneOffsetJst = -9 * 60 * 60; // UTC0時をJST0時に補正
        var time = 7*60*60 +30*60 + 0;
        clientNow.setSeconds(clientNow.getSeconds() +timezoneOffsetJst +time);
        return clientNow;
    }
}
class TestBbDbBeforeMapEnd extends TestBbDb {
    getNow() {
        // "2016-01-04T07:29:59+0900"
        var clientNow = new Date("2016-01-04"); // UTC0時
        var timezoneOffsetJst = -9 * 60 * 60; // UTC0時をJST0時に補正
        var time = 7*60*60 +30*60 + 0 -1;
        clientNow.setSeconds(clientNow.getSeconds() +timezoneOffsetJst +time);
        return clientNow;
    }
}
class TestBbDbMapEnd extends TestBbDb {
    getNow() {
        // "2016-01-04T07:30:00+0900"
        var clientNow = new Date("2016-01-04"); // UTC0時
        var timezoneOffsetJst = -9 * 60 * 60; // UTC0時をJST0時に補正
        var time = 7*60*60 +30*60 + 0;
        clientNow.setSeconds(clientNow.getSeconds() +timezoneOffsetJst +time);
        return clientNow;
    }
}
test('TestBbDbBeforeMapStart# before map start', (t) => {
    var bbdb = new TestBbDbBeforeMapStart();
    var conf = bbdb.conf;
    var expCurrentMapAt1 = {
        "value": "blouer_ea",
        "text": "[1/1〜]激闘の丘陵 | 旧ブロア市街地",
        "disabled": false
    };
    t.ok(JSON.stringify(conf.current_map[1], undefined, "  ") ==
         JSON.stringify(expCurrentMapAt1, undefined, "  ") );
    t.ok(conf.current_map.length == 4);
});
test('TestBbDbMapStart# map start', (t) => {
    var bbdb = new TestBbDbMapStart();
    var conf = bbdb.conf;
    var expCurrentMapAt1 = {
        "value": "blouer_ea",
        "text": "激闘の丘陵 | 旧ブロア市街地",
        "disabled": false
    };
    t.ok(JSON.stringify(conf.current_map[1], undefined, "  ") ==
         JSON.stringify(expCurrentMapAt1, undefined, "  ") );
    t.ok(conf.current_map.length == 4);
});
test('TestBbDbBeforeMapEnd# before map end', (t) => {
    var bbdb = new TestBbDbBeforeMapEnd();
    var conf = bbdb.conf;
    var expCurrentMapAt1 = {
        "value": "blouer_ea",
        "text": "激闘の丘陵 | 旧ブロア市街地",
        "disabled": false
    };
    t.ok(JSON.stringify(conf.current_map[1], undefined, "  ") ==
         JSON.stringify(expCurrentMapAt1, undefined, "  ") );
    t.ok(conf.current_map.length == 4);
});
test('TestBbDbMapEnd# map end', (t) => {
    var bbdb = new TestBbDbMapEnd();
    var conf = bbdb.conf;
    var expCurrentMap = [
        {
            "disabled": true,
            "text": "▼ その他 ▼"
        },
        {
            "value": "map_a",
            "text": "戦線突破 | スカービ渓谷",
            "disabled": false
        }
    ];
    t.ok(JSON.stringify(conf.current_map, undefined, "  ") ==
         JSON.stringify(expCurrentMap, undefined, "  ") );
    t.ok(conf.current_map.length == 2);
});

