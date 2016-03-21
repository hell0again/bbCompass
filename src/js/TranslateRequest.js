
export default class TranslateRequest {
    constructor() {
        this._baseProp = {}; // 確定済みの状態。キャンセルされた場合、状態はここに戻る
        this._currentProp = {}; // 未確定の現在の状態。キャンセルされる場合がある
 
        // this.onDelta = undefined; // (delta) -> ()
        // this.onCommit = undefined; // () -> ()
        // this.onAbort = undefined; // () -> ()
        // this.onReset = undefined; // () -> ()
    }
    getBase() {
        return this._baseProp;
    }
    setBase (base) {
        this._baseProp = base;
        return this;
    }
    getCurrent() {
        return this._currentProp;
    }
    setCurrent(current) {
        this._currentProp = current;
        return this;
    }
    assignCurrent(current) {
        this._currentProp = Object.assign(this._currentProp, current);
        return this;
    }
    delta(delta) {
        this.onDelta(delta);
        return this;
    }
    commit() {
        this.onCommit();
        return this;
    }
    abort() {
        this.onAbort();
        return this;
    }
    reset() {
        this.onReset();
        return this;
    }
}


