import BoardObjectBaseJC from './BoardObjectBase';
import BoardObjectRegistry from './BoardObjectRegistry';

let mixin = (mixins, base) => {
    let klass = base || class {};
    let tail;
    while (tail = mixins.pop()) {
        klass = tail(klass);
    }
    return klass();
}

export default class BoardObjectCircle extends BoardObjectBaseJC {
    constructor(bb, text, radius, color, callback) {
        super(bb);
        if (color === undefined) {
            color = 'rgb(0, 51, 255)';
        }
        this.type = "circle";
        this.text(text);
        this.radius(radius);
        this.color(color);

        let px_rad = this.bb.meter_to_pixel(this.radius);
        this._ptpos = {
            x: px_rad,
            y: 0
        };
        this.move(px_rad, px_rad);

        this.draw();
        this.register();
        if (typeof(callback) === "function") {
            callback.apply(this);
        }
    }
    get radius() {
        return this.radius;
    }
    set radius(v) {
        this.radius = v;
    }
    static serialize(that) {
        let buffer = new MyBuffer();

        buffer.writeColor(that.color);
        buffer.writeInt16(that.radius);
        buffer.writePoint(that.position);
        buffer.writePoint(that._ptpos);
        return buffer.readByteArray();
    }
    static deserialize(buffer, length, name, bb) {
        let color = buffer.readColor(),
            rad   = buffer.readUint16(),
            pos   = buffer.readPoint(),
            ptpos = buffer.readPoint();

        return new BoardObjectCircle(bb, name, rad, color, function() {
            this._ptpos = ptpos;
            this.moveTo(pos.x, pos.y)
                .redraw();
        });
    }

    draw() {
        let px_rad = this.bb.meter_to_pixel(this.radius),
            ptx = this._ptpos.x,
            pty = this._ptpos.y;

        let area = this.jc
            .circle(0, 0, px_rad, this.color, true)
            .opacity(0.3)
            .layer(this.id);
        let areacol = this.jc
            .circle(0, 0, px_rad, this.color, false)
            .opacity(1)
            .lineStyle({
                lineWidth: 3
            })
            .layer(this.id);
        let line = this.jc
            .opacity(1)
            .line({
                points: [
                    [0, 0],
                    [ptx, pty]
                ],
                color: this.color
            })
            .lineStyle({
                lineWidth: 3
            })
            .layer(this.id);
        this.jc
            .circle(0, 0, 7, this.color, true)
            .opacity(1)
            .layer(this.id);
        
        let center = this.jc
            .circle(0, 0, 5, "#FFFFFF", true)
            .layer(this.id);
        this.jc
            .text(this._text, 0, -10)
            .color('#FFFFFF')
            .font('15px sans-serif')
            .align('center')
            .layer(this.id);
        
        let ptcol = this.jc
            .circle(ptx, pty, this.bb.ptcolsize, this.color, true)
            .layer(this.id)
            .opacity(1);
        let pt = this.jc
            .circle(ptx, pty, this.bb.ptsize, "#FFFFFF", true)
            .layer(this.id);
        let pttra = this.jc
            .circle(ptx, pty, this.bb.pttrasize, "rgba(0,0,0,0)", true)
            .layer(this.id);
        let radius = this.jc
            .text(Math.floor(this.radius) + "m", ptx / 2, pty / 2)
            .baseline("top")
            .align('center')
            .color('#FFFFFF')
            .font('15px sans-serif')
            .layer(this.id);

        this.jc.layer(this.id).draggable();

        let txtheight = radius.getRect().height; //translateTo時に高さがずれるので補正項
        let callback = () => {
            let pos1 = center.position(),
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
    BoardObjectCircle.type,
    BoardObjectCircle
);

