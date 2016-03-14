
let mixin = (mixins, base) => {
    var klass = base || class {};
    var tail;
    while (tail = mixins.pop()) {
        klass = tail(klass);
    }
    return klass();
}
/*
BoardComponent
    Drawable
        draw
    Serializer
        serialize
        deserialize
    BoardJCanvasViewAdapter
        BoardPositionViewModel
    BoardJCanvasEventAdapter

*/


class BoardComponentCircle extend mixin([
    BoardSerializerCircleMixin,
    BoardDrawableCircleMixin,
], BoardObjectBase) {
    static getLabel() { return "BoardObjectCircle"; }
}

let BoardSerializerCircleMixin = (Base) => class extends mixin([BoardSerializerMixin], Base) {
    static serialize(obj) {
        var buffer = new MyBuffer();

        buffer.writeColor(obj._color);
        buffer.writeInt16(obj._radius);
        buffer.writePoint(obj.position());
        buffer.writePoint(obj._ptpos);
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bbobj) {
        var color = buffer.readColor(),
            rad   = buffer.readUint16(),
            pos   = buffer.readPoint(),
            ptpos = buffer.readPoint();

        var obj = bbobj.add_circle(name, rad, color, function() {
            this._ptpos = ptpos;
            this.moveTo(pos.x, pos.y)
                .redraw();
        });
        return obj;
    }
}

// 円
// 原点は中心点
// ptposは外周の点を表す
//class BbCircle extends BbBase {

let BoardDrawableCircleMixin = (Base) => class extends mixin([BoardDrawableMixin], Base) {
    initDrawable(_bbObj, _text, _radius, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(0, 51, 255)';
        }
        this.id = UUID.v1();

        this.type = "circle";
        this.text(_text);
        this.radius(_radius);
        this.color(_color);

        var px_rad = this.bb.meter_to_pixel(this.radius);
        this._ptpos = {
            x: px_rad,
            y: 0
        };
        this.move(px_rad, px_rad);

        this.draw();
        this.register();
        if (typeof(_callback) === "function") {
            _callback.apply(this);
        }
    }
    draw() {
        var px_rad = this.bb.meter_to_pixel(this.radius),
            ptx = this._ptpos.x,
            pty = this._ptpos.y,

        var area = this.jc
            .circle(0, 0, px_rad, this.color, true)
            .opacity(0.3)
            .layer(this.id);
        var areacol = this.jc
            .circle(0, 0, px_rad, this.color, false)
            .opacity(1)
            .lineStyle({
                lineWidth: 3
            })
            .layer(this.id);
        var line = this.jc
            .opacity(1)
            .line({
                points: [
                    [0, 0],
                    [ptx, pty]
                ],
                color: this._color
            })
            .lineStyle({
                lineWidth: 3
            })
            .layer(this.id);
        this.jc
            .circle(0, 0, 7, this._color, true)
            .opacity(1)
            .layer(this.id);
        
        var center = this.jc
            .circle(0, 0, 5, "#FFFFFF", true)
            .layer(this.id);
        this.jc
            .text(this._text, 0, -10)
            .color('#FFFFFF')
            .font('15px sans-serif')
            .align('center')
            .layer(this.id);
        
        var ptcol = this.jc
            .circle(ptx, pty, this.bb.ptcolsize, this._color, true)
            .layer(this.id)
            .opacity(1);
        var pt = this.jc
            .circle(ptx, pty, this.bb.ptsize, "#FFFFFF", true)
            .layer(this.id);
        var pttra = this.jc
            .circle(ptx, pty, this.bb.pttrasize, "rgba(0,0,0,0)", true)
            .layer(this.id);
        var radius = this.jc
            .text(Math.floor(this.radius) + "m", ptx / 2, pty / 2)
            .baseline("top")
            .align('center')
            .color('#FFFFFF')
            .font('15px sans-serif')
            .layer(this.id);

        this.jc.layer(this.id).draggable();

        var txtheight = radius.getRect().height; //translateTo時に高さがずれるので補正項
        var callback = () => {
            var pos1 = center.position(),
                pos2 = pttra.position(),
                dx = pos2.x - pos1.x,
                dy = pos2.y - pos1.y,
                centerx = (pos1.x + pos2.x) / 2,
                centery = (pos1.y + pos2.y) / 2,
                newrad = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            pt.translateTo(pos2.x, pos2.y);
            ptcol.translateTo(pos2.x, pos2.y);
            line.points([
                [0, 0],
                [pt._x + pt._transformdx, pt._y + pt._transformdy]
            ]);
            area.attr('radius', newrad);
            areacol.attr('radius', newrad);
            radius.translateTo(centerx, centery - txtheight)
                .string(Math.floor(this.bb.pixel_to_meter(newrad)) + "m");
            this.radius(this.bb.pixel_to_meter(newrad));
            this._ptpos = {
                x: pt._x + pt._transformdx,
                y: pt._y + pt._transformdy
            };
        };

        pttra.draggable(callback);
        pttra.optns.drag.val = false;
        pttra.mouseover(() => {
            this.jc.layer(this.id).optns.drag.val = false;
            pttra.optns.drag.val = true;
        });
        pttra.mouseout(() => {
            this.jc.layer(this.id).optns.drag.val = true;
            pttra.optns.drag.val = false;
        });
        return this;
    }
    applyZoom(scale, _x, _y) {
        this._ptpos.x = this._ptpos.x * scale;
        this._ptpos.y = this._ptpos.y * scale;
        // this.bb.BbBase.prototype.applyZoom.apply(this, arguments);
        super.applyZoom(scale, _x, _y);
        return this;
    }
}

BoardObjectRegistry.getInstance().addByLabel(
    BoardComponentCircle.getLabel(),
    BoardComponentCircle
);

