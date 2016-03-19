import test from 'ava';
import 'babel-register';

import BoardObjectRegistry from '../src/js/BoardObjectRegistry';

test('#getTypeCodeFromLabel', (t) => {
    let registry = BoardObjectRegistry.getInstance();
    registry.init();

    t.ok(1 == registry.getTypeCodeFromLabel("BoardObjectCircle"));
});

