import test from 'ava';
import 'babel-register';

import BBDB from '../src/js/BBDB';

test('BbDb# valid', (t) => {
    var bbdb = new BBDB();
    var conf = bbdb.conf;
    t.ok(0 < conf.stage.length);
    t.ok(0 < conf.map.length);
    t.ok(0 < conf.current_map.length);
});

