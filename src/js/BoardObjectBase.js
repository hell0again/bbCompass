
export default class BoardObjectBase {
    constructor(_bb) {
        //初期化は下位オブジェに任せる
        this.text("base");
        this.color("#000000");
        // this.radius(0);
        this._bb = _bb;
        this.id = UUID.v1();
        let pm = this.constructor.PositionModel;
        this.positionModel = new pm();

    }
    get bb() { return this._bb; }
    get color() { return this._color; }
    set color(v) {
        this._color = v;
        this.redraw();
    }
    get text() { return this._text; }
    set text(v) {
        this._text = v;
        this.redraw();
    }
    // get radius() { return this._radius; }
    // set radius(v) {
    //     this._radius = v;
    // }
    static get PositionModel() {
        return BoardPositionModel;
    }
    get position() { return this.positionModel.position; }
    toString() {
        return this.id;
    }

    static serialize(obj) {
    }
    static deserialize(buffer, length, name, bbobj) {
    }

    // TODO: bb側に移動
    register() {
        this.bb.member[this.id] = this;
    }
    // TODO: bb側に移動
    remove() {
        delete this.bb.member[this.id];
        // let objs = this._ourJc.layer(this.id).objs;
        this.removeView();
    }
    // TODO: bb側に移動
    up() {
        let prevLevel = this.level();
        let swapObj = this.bb.nextlevel(prevLevel);
        if (swapObj === undefined) {
            return false;
        }
        this.level(swapObj.level);
        swapObj.level(prevLevel);
        return true;
    }
    // TODO: bb側に移動
    down() {
        let prevLevel = this.level();
        let swapObj = this.bb.nextlevel(prevLevel);
        if (swapObj === undefined) {
            return false;
        }
        this.level(swapObj.level);
        swapObj.level(prevLevel);
        return true;
    }

    regist() {
        console.log("'regist' deprecated");
        this.register();
    }
    del() {
        console.log("'del' deprecated");
        this.remove();
    }
}

