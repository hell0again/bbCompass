import test from 'ava';
import 'babel-register';

import BoardObjectRegistry from '../src/js/BoardObjectRegistry';

class TestBoardObjectRegistry extends BoardObjectRegistry {
    loadTypeCodeToLabelMapping() {
        this._labelToTypeCode = {
            "Test1": 1,
            "Test2": 2,
            "Test3": 3
        };
    }
}
test('#getTypeCodeFromLabel', (t) => {
    let registry = TestBoardObjectRegistry.getInstance();
    registry.init();

    t.ok(1 == registry.getTypeCodeFromLabel("Test1"));
    t.ok(2 == registry.getTypeCodeFromLabel("Test2"));
    t.ok(3 == registry.getTypeCodeFromLabel("Test3"));
});
test('#addByLabel, #getByTypeCode', (t) => {
    let registry = TestBoardObjectRegistry.getInstance();
    registry.init();

    registry.addByLabel("Test1", "test entry1");
    registry.addByLabel("Test2", "test entry2");
    registry.addByLabel("Test3", "test entry3");
    t.ok("test entry1" == registry.getByTypeCode(1));
    t.ok("test entry2" == registry.getByTypeCode(2));
    t.ok("test entry3" == registry.getByTypeCode(3));
});

