import test from 'ava';
import 'babel-register';

import BoardPositionModel from '../src/js/BoardPositionModel';

test("#", (t) => {
    let model = new BoardPositionModel();
    model.position = {x: 10, y: 20};
    model.angle = 45;
    model.level = 3;
    model.translate(3,1);
    model.translate(3,1);
    model.move(3,1);
    t.ok(19, model.position.x);
    t.ok(23, model.position.y);
    model.translateTo(4,5);
    t.ok(4, model.position.x);
    t.ok(5, model.position.y);
});

