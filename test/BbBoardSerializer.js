import test from 'ava';
import 'babel-register';

import BbBoardSerializer from '../src/js/BbBoardSerializer';

test("deserialize map only", (t) => {
    let tinyB64 = "Y2XDiGVIZChgwohnSAQA";
    let serializer = BbBoardSerializer.createFromBase64(tinyB64);
    t.ok("map_a", serializer.readMap());
});

