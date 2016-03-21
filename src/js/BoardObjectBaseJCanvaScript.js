import BoardObjectBase from './BoardObjectBase';
import BoardPositionModel from './BoardPositionModel';

class BoardPositionModelJCanvaScript extends BoardPositionModel {
    fromView(jc) {
        let jcLayer = jc.layer(this.id);
        this.setCurrent({
            x: jcLayer._transformdx,
            y: jcLayer._transformdy,
            level: jcLayer.level(),
            angle: jcLayer.getAngle() * 180 / Math.PI,
        });
        this.commit();
    }
}
export default class BoardObjectBaseJCanvaScript extends BoardObjectBase {
    constructor(_bb) {
        super(_bb);
        this._jc = _bb.ourJc;
        this.positionModel.fromView(this.jc);
        this.positionModel.onAngleDelta = (d) => {
            this.jcLayer.rotateTo(this.positionModel.getCurrent.angle);
        };
        this.positionModel.onLevelDelta = (d) => {
            this.jcLayer.level(this.positionModel.getCurrent.level);
        };
        this.positionModel.onPositionDelta = (d) => {
            let current = this.positionModel.getCurrent;
            this.jcLayer.translate(current.x, current.y);
        };
    }
    static get PositionModel() {
        return BoardPositionModelJCanvaScript;
    }
    get jc() { return this._ourJc; }
    get jcLayer () { return this.jc.layer(this.id); }

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

    draw() {
        // implement yourself
    }
    redraw() {
        this.jcLayer.objects().del();
        this.draw();
    }

    setAngle(angle) {
        let model = this.positionModel;
        model.angle(angle);
    }
    setLevel(level) {
        let model = this.positionModel;
        model.level(level);
    }

    translate(dx, dy) {
        let model = this.positionModel;
        model.translate(dx, dy);
    }
    move(dx, dy) {
        return this.translate(dx, dy);
    }
    translateTo(x, y) {
        let model = this.positionModel;
        model.translateTo(x, y);
    }
    moveTo(x, y) {
        return this.translateTo(x, y);
    }

    applyZoom(scale, _x, _y) {
        let d = this._model.applyZoom(scale, _x, _y);
        this.jcLayer.translate(d.x, d.y);
        this.redraw();
    }

    removeView() {
        this.jcLayer.del();
    }
}

