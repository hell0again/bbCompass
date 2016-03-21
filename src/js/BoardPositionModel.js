import TranslateRequest from './TranslateRequest';

export default class BoardPositionModel extends TranslateRequest {
    constructor() {
        super();
        this.setBase({
            x: 0,
            y: 0,
            angle: 0,
            level: 0
        });
        this.onAngleDelta = (d) => {}
        this.onLevelDelta = (d) => {}
        this.onPositionDelta = (d) => {}
    }
    get position() {
        let current = this.getCurrent;
        return {
            x: current.x,
            y: current.y
        };
    }
    set position(pos) {
        let base = this.getBase;
        this.translate({
            x: pos.x - base.x,
            y: pos.y - base.y,
        });
    }
    get angle() {
        let current = this.getCurrent;
        return current.angle;
    }
    set angle(v) {
        let base = this.getBase;
        this.delta({
            angle: v - base.angle
        });
    }
    get level() {
        let current = this.getCurrent;
        return current.level;
    }
    set level(v) {
        let base = this.getBase;
        this.delta({
            level: v - base.level
        });
    }

    translate(dx, dy) {
        this.delta({
            x: dx,
            y: dy
        });
    }
    move(dx, dy) {
        return this.translate(dx, dy);
    }
    translateTo(x, y) {
        //translateToはどこが原点かわからないので、
        //現在までの変位をもとに相対的に移動させる
        let oldP = this.getCurrent;
        this.position = {x:x, y:y};
        let newP = this.getCurrent;
        return {
            x: newP.x - oldP.x,
            y: newP.y - oldP.y
        };
    }
    onDelta(delta) {
        let base = this.getBase();
        let newCurrent = {};
        if (delta.x != null) {
            newCurrent.x = base.x + delta.x;
        }
        if (delta.y != null) {
            newCurrent.y = base.y + delta.y;
        }
        if (delta.angle != null) {
            newCurrent.angle = base.angle + delta.angle;
        }
        if (delta.level != null) {
            newCurrent.level = base.level + delta.level;
        }
        this.assignCurrent(newCurrent);
        if (delta.x != null || delta.y != null) {
            this.onPositionDelta(delta);
        }
        if (delta.angle != null) {
            this.onAngleDelta(delta);
        }
        if (delta.level != null) {
            this.onLevelDelta(delta);
        }
    }
    onCommit() {
        this.setBase(Object.assign({}, this.getCurrent()));
    }
    onAbort() {
        this.setCurrent(Object.assign({}, this.getBase()));
    }
    onReset() {
        var init = {
            x: 0,
            y: 0,
            angle: 1,
            level: 0,
        };
        this.setBase(Object.assign({}, init));
        this.setCurrent(Object.assign({}, init));
    }
    applyZoom(scale, _x, _y) {
        var posx = this._transformdx;
            posy = this._transformdy;
        console.log("[FIXME] called broken args applyZoom. _x -> posx?"); 
        console.log("スケール変えてない");
        return this.translate(posx * scale - posx, posy * scale - posy);
    }
}

