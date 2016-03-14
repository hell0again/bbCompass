Base
    - bb
    - jc
    - jcLayer
    - color
    - text
    - radius
    - ---
    - constructor
    - toString
    - register
    - remove
    - up
    - down
    - regist
    - del
view:
    - _model
        - position
        - angle
        - level
        - ---
        - fromView
        - translate
        - move
        - moveTo
        - applyZoom
    - position
    - angle
    - level
    - ---
    - initView
    - draw
    - redraw
    - translate
    - move
    - moveTo
    - applyZoom
    - removeView
events:
    - initEvent
    - click
    - mouseup
    - mousedown
    - dblclick
serializer:
    - serialize
    - deserialize

class BoardComponent extends mixin([
    BoardSerializerMixin,
    BoardDrawableMixin,
], BoardObjectBase) {
    constructor() {
        this.initDrawable();
    }
}
let BoardSerializerMixin = (Base) => class extends Base {
    static serialize() {}
    static deserialize() {}
}
let BoardDrawableMixin = (Base) => class extends Base {
    draw() {}
}

class BoardPositionViewModel {
    fromView(jc) {
        var jcLayer = jc.layer(this.id);
        this._x = jcLayer._transformdx;
        this._y = jcLayer._transformdy;
        this._level = jcLayer.level();
        this._angle = jcLayer.getAngle() * 180 / Math.PI;
    }
    get position() {
        return {
            x: this._x,
            y: this._y
        };
    }
    set position(pos) {
        this.translate(pos.x - this._x, pos.y - this._y);
    }
    get angle() { return this._angle; }
    set angle(v) {
        this._angle = v;
    }
    get level() { return this._level; }
    set level(v) {
        this._level = v;
    }
    
    translate(dx, dy) {
        this._x += dx;
        this._y += dy;
        return {
            x: dx,
            y: dy
        };
    }
    move(dx, dy) {
        return this.translate(dx, dy);
    }
    moveTo(x, y) {
        //translateToはどこが原点かわからないので、
        //現在までの変位をもとに相対的に移動させる
        //var jc = this.jc;
        //jc.layer(this.id).translateTo(x, y);
        var oldP = this.position;
        this.position({x: x, y:y});
        var newP = this.position;
        return {
            x: newP.x - oldP.x,
            y: newP.y - oldP.y
        };
    }
    applyZoom(scale, _x, _y) {
        var posx = this._transformdx;
            posy = this._transformdy;
        console.log("[FIXME] called broken args applyZoom. _x -> posx?"); 
        console.log("スケール変えてない");
        return this.translate(posx * scale - posx, posy * scale - posy);
    }
}

let BoardJCanvasViewMixin = (Base) => class extends Base {
    initView() {
        this._model = new BoardPositionViewModel(this.id);
    }
    get position() {
        return this._model.position;
    }
    get angle() { return this._model.angle; }
    set angle(v) {
        this._model.angle(v);
        this.jcLayer.rotateTo(this._model.angle);
    }
    get level() { return this._model.level; }
    set level(v) {
        this._model.level(v);
        this.jcLayer.level(this._model.level);
    }
    draw() {
        // implement yourself
    }
    redraw() {
        this.jcLayer.objects().del();
        this.draw();
    }
    _translate(d) {
        this.jcLayer.translate(d.x, d.y);
        return this;
    }
    translate(dx, dy) {
        var d = this._model.translate(dx, dy);
        return this._translate(d);
    }
    move(dx, dy) {
        return this.translate(dx, dy);
    }
    moveTo(x, y) {
        var d = this._model.moveTo(x, y);
        return this._translate(d);
    }
    applyZoom(scale, _x, _y) {
        var d = this._model.applyZoom(scale, _x, _y);
        this._translate(d);
        this.redraw();
    }

    removeView() {
        this.jcLayer.del();
    }
}

let BoardJCanvasEventMixin = (Base) => class extends Base {
    initEvent() {}
    click(fn) {
        this.jc.layer(this.id).click(fn);
        return this;
    }
    mouseup(fn) {
        this.jc.layer(this.id).mouseup(fn);
        return this;
    }
    mousedown(fn) {
        this.jc.layer(this.id).mousedown(fn);
        return this;
    }
    dblclick(fn) {
        this.jc.layer(this.id).dblclick(fn);
        return this;
    }
}


class BoardObjectBase extends mixin([
    BoardJCanvasEventMixin,
    BoardJCanvasViewMixin,
]) {
    constructor(_bbObj) {
        //初期化は下位オブジェに任せる
        this.text("base");
        this.color("#000000");
        this.radius(0);
        this._bbObj = _bbObj;
        this._ourJc = _bbObj.ourJc;
        this.id = UUID.v1();
        this.initEvent();
        this.initView();
    }
    get bb() { return this._bbObj; }
    get jc() { return this._ourJc; }
    get jcLayer () { return this.jc.layer(this.id); }
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
    get radius() { return this._radius; }
    set radius(v) {
        this._radius = v;
    }
    
    toString() {
        return this.id;
    }

    register() {
        this.bb.member[this.id] = this;
    }
    remove() {
        delete this.bb.member[this.id];
        // var objs = this._ourJc.layer(this.id).objs;
        this.removeView();
    }
    up() {
        var prevLevel = this.level();
        var swapObj = this.bb.nextlevel(prevLevel);
        if (swapObj === undefined) {
            return false;
        }
        this.level(swapObj.level);
        swapObj.level(prevLevel);
        return true;
    }
    down() {
        var prevLevel = this.level();
        var swapObj = this.bb.nextlevel(prevLevel);
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

