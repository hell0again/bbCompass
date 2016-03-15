/*global jc*/ // eslint
import 'jcscript';
import UUID from 'uuid';

//
// 内部変数初期化
//
var salt = Math.round((new Date()).getTime() / 1000);

//
// 内部関数定義
//
var sanitize_filepath = function(path) {
    var control_codes = /[\u0000-\u001F\u007F-\u009F]/g;
    path.replace(control_codes, "\uFFFD");
    if (path.match(/^([.~]?\/)?([A-Za-z0-9_-][A-Za-z0-9_.-]+\/)*[A-Za-z0-9_-][A-Za-z0-9_.-]+$/)) {
        return path;
    } else {
        return null;
    }
}


//
//BB_baseオブジェクト
//
class BB_base {
    constructor(_bbObj) {
        //初期化は下位オブジェに任せる
        this._text = "base";
        this._color = "#000000";
        this._bbObj = _bbObj;
        this._ourJc = _bbObj.ourJc;
    }
    draw() {
        //一応ダミーを定義
    }
    redraw() {
        this._ourJc.layer(this.id).objects().del();
        this.draw();
    }
    applyZoom(scale, _x, _y) {
        var posx = jc.layer(this.id)._transformdx,
            posy = jc.layer(this.id)._transformdy;
        jc.layer(this.id).translate(posx * scale - posx, posy * scale - posy);
        this.redraw();
    }
    toString() {
        return this.id;
    }
    position() {
        var posx = this._ourJc.layer(this.id)._transformdx;
        var posy = this._ourJc.layer(this.id)._transformdy;
        return {
            x: posx,
            y: posy
        };
    }
    rotAngle() {
        return (jc.layer(this.id).getAngle() * 180 / Math.PI);
    }
    click(fn) {
        this._ourJc.layer(this.id).click(fn);
        return this;
    }
    mouseup(fn) {
        this._ourJc.layer(this.id).mouseup(fn);
        return this;
    }
    mousedown(fn) {
        this._ourJc.layer(this.id).mousedown(fn);
        return this;
    }
    dblclick(fn) {
        this._ourJc.layer(this.id).dblclick(fn);
        return this;
    }
    move(_dx, _dy) {
        this._ourJc.layer(this.id).translate(_dx, _dy);
        return this;
    }
    rotateTo(_angle) {
        this._ourJc.layer(this.id).rotateTo(_angle);
        return this;
    }
    moveTo(_x, _y) {
        //translateToはどこが原点かわからないので、
        //現在までの変位をもとに相対的に移動させる
        var posx = this._ourJc.layer(this.id)._transformdx;
        var posy = this._ourJc.layer(this.id)._transformdy;
        this._ourJc.layer(this.id).translate(_x - posx, _y - posy);
        //this._ourJc.layer(this.id).translateTo(_x,_y);
        return this;
    }
    color(_color) {
        if (_color === undefined) {
            return this._color;
        }
        this._color = _color;
        this.redraw();
        return this;
    }
    text(_text) {
        if (_text === undefined) {
            return this._text;
        }
        this._text = _text;
        this.redraw();
        return this;
    }
    regist() {
        this._bbObj.member[this.id] = this;
    }
    up() {
        var level = this._ourJc.layer(this.id).level();
        var nextobj = this._bbObj.nextlevel(level);

        if (nextobj["id"] !== undefined) {
            this._ourJc.layer(nextobj["id"]).level(level);
            this._ourJc.layer(this.id).level(nextobj["level"]);
            return true;
        } else {
            return false;
        }
    }
    down() {
        var level = this._ourJc.layer(this.id).level();
        var prevobj = this._bbObj.prevlevel(level);

        if (prevobj["id"] !== undefined) {
            this._ourJc.layer(prevobj["id"]).level(level);
            this._ourJc.layer(this.id).level(prevobj["level"]);
            return true;
        } else {
            return false;
        }
    }
    del() {
        delete this._bbObj.member[this.id];
        // var objs = this._ourJc.layer(this.id).objs;
        this._ourJc.layer(this.id).del();
    }
}

//
//BB_circleオブジェクト
//
class BB_circle extends BB_base {
    constructor(_bbObj, _text, _radius, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(0, 51, 255)';
        }
        this.id = UUID.v1();

        this.type = "circle";
        this._text = _text;
        this._radius = _radius;
        this._color = _color;

        var px_rad = this._bbObj.meter_to_pixel(this._radius);
        this._ptpos = {
            x: px_rad,
            y: 0
        };
        this.move(px_rad, px_rad);

        this.draw();
        this.regist();
        if (typeof(_callback) === "function") {
            _callback.apply(this);
        }
    }
    draw() {
        var px_rad = this._bbObj.meter_to_pixel(this._radius),
            ptx = this._ptpos.x,
            pty = this._ptpos.y,
            obj = this;

        var area = this._ourJc
            .circle(0, 0, px_rad, this._color, true)
            .opacity(0.3)
            .layer(this.id);
        var areacol = this._ourJc
            .circle(0, 0, px_rad, this._color, false)
            .opacity(1)
            .lineStyle({
                lineWidth: 3
            })
            .layer(this.id);
        var line = this._ourJc
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
            .layer(this.id)
            .opacity(1);
        this._ourJc
            .circle(0, 0, 7, this._color, true)
            .opacity(1)
            .layer(this.id);

        var center = this._ourJc
            .circle(0, 0, 5, "#FFFFFF", true)
            .layer(this.id);
        this._ourJc
            .text(this._text, 0, -10)
            .layer(this.id)
            .color('#FFFFFF')
            .font('15px sans-serif')
            .align('center');

        var ptcol = this._ourJc
            .circle(ptx, pty, this._bbObj.ptcolsize, this._color, true)
            .layer(this.id)
            .opacity(1);
        var pt = this._ourJc
            .circle(ptx, pty, this._bbObj.ptsize, "#FFFFFF", true)
            .layer(this.id);
        var pttra = this._ourJc
            .circle(ptx, pty, this._bbObj.pttrasize, "rgba(0,0,0,0)", true)
            .layer(this.id);
        var radius = this._ourJc
            .text(Math.floor(this._radius) + "m", ptx / 2, pty / 2)
            .baseline("top")
            .align('center')
            .color('#FFFFFF')
            .font('15px sans-serif')
            .layer(this.id);
        var cp = center.position();
        var position = this._ourJc
            .text("("+ cp.x +","+ cp.y +")", ptx/2, pty/2 + 30)
            .baseline("top")
            .align('center')
            .color('#FFFFFF')
            .font('15px sans-serif')
            .layer(this.id);

        this._ourJc.layer(this.id).draggable();

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
                .string(Math.floor(this._bbObj.pixel_to_meter(newrad)) + "m");
            obj._radius = this._bbObj.pixel_to_meter(newrad);
            obj._ptpos = {
                x: pt._x + pt._transformdx,
                y: pt._y + pt._transformdy
            };
        };

        pttra.draggable(callback);
        pttra.optns.drag.val = false;
        pttra.mouseover(() => {
            this._ourJc.layer(obj.id).optns.drag.val = false;
            pttra.optns.drag.val = true;
        });
        pttra.mouseout(() => {
            this._ourJc.layer(obj.id).optns.drag.val = true;
            pttra.optns.drag.val = false;
        });
        return this;
    }
    applyZoom(scale, _x, _y) {
        this._ptpos.x = this._ptpos.x * scale;
        this._ptpos.y = this._ptpos.y * scale;
        this._bbObj.BB_base.prototype.applyZoom.apply(this, arguments);
        return this;
    }
}
//
//BB_lineオブジェクト
//
class BB_line extends BB_base {
    constructor(_bbObj, _text, _length, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(51, 153, 0)';
        }
        this.id = UUID.v1();

        this.type = "line";
        this._text = _text;
        this._length = _length;
        this._color = _color;

        var px_len = this._bbObj.meter_to_pixel(this._length)
        this._pt1pos = {
            x: (-1) * px_len / 2,
            y: 0
        };
        this._pt2pos = {
            x: px_len / 2,
            y: 0
        };

        this.draw();
        this.move(100 + px_len / 2, 100);
        this.regist();
        if (typeof(_callback) === "function") {
            _callback.apply(this);
        }
    }

    //座標の扱いが特殊なので座標関連の関数を一部オーバーライド
    position() {
        var _x = this._ourJc.layer(this.id)._transformdx + (this._pt1pos.x + this._pt2pos.x) / 2,
            _y = this._ourJc.layer(this.id)._transformdy + (this._pt1pos.y + this._pt2pos.y) / 2;
        return {
            x: _x,
            y: _y
        };
    }
    moveTo(_x, _y) {
        var layer = this._ourJc.layer(this.id);
        var _curx = layer._transformdx + (this._pt1pos.x + this._pt2pos.x) / 2,
            _cury = layer._transformdy + (this._pt1pos.y + this._pt2pos.y) / 2;
        layer.translate(_x - _curx, _y - _cury);
        return this;
    }
    draw() {
        var above = 15,
            below = 5,
            x1 = this._pt1pos.x,
            y1 = this._pt1pos.y,
            x2 = this._pt2pos.x,
            y2 = this._pt2pos.y,
            obj = this;
        var centerx = (x1 + x2) / 2,
            centery = (y1 + y2) / 2;

        var line = this._ourJc.line({
                points: [
                    [x1, y1],
                    [x2, y2]
                ],
                color: this._color
            })
            .opacity(1).lineStyle({
                lineWidth: 3
            }).layer(this.id),
            pt1col = this._ourJc.circle(x1, y1, this._bbObj.ptcolsize, this._color, true).layer(this.id),
            pt1 = this._ourJc.circle(x1, y1, this._bbObj.ptsize, "#FFFFFF", true).layer(this.id),
            pt1tra = this._ourJc.circle(x1, y1, this._bbObj.pttrasize, "rgba(0,0,0,0)", true).layer(this.id),
            pt2col = this._ourJc.circle(x2, y2, this._bbObj.ptcolsize, this._color, true).layer(this.id),
            pt2 = this._ourJc.circle(x2, y2, this._bbObj.ptsize, "#FFFFFF", true).layer(this.id),
            pt2tra = this._ourJc.circle(x2, y2, this._bbObj.pttrasize, "rgba(0,0,0,0)", true).layer(this.id),
            linename = this._ourJc.text(this._text, centerx, centery + above)
            .align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id),
            linelen = this._ourJc.text(Math.floor(this._length) + "m", centerx, centery - below)
            .align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id);
        this._ourJc.layer(this.id).draggable();

        var txtheight = linelen.getRect().height; //translateTo時に高さがずれるので補正項
        var callback = () => {
            var pos1 = pt1tra.position(),
                pos2 = pt2tra.position(),
                dx = pos2.x - pos1.x,
                dy = pos2.y - pos1.y,
                centerx = (pos1.x + pos2.x) / 2,
                centery = (pos1.y + pos2.y) / 2,
                newlen = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            pt1col.translateTo(pos1.x, pos1.y);
            pt2col.translateTo(pos2.x, pos2.y);
            pt1.translateTo(pos1.x, pos1.y);
            pt2.translateTo(pos2.x, pos2.y);
            line.points([
                [pt1._x + pt1._transformdx, pt1._y + pt1._transformdy],
                [pt2._x + pt2._transformdx, pt2._y + pt2._transformdy]
            ]);
            linename.translateTo(centerx, centery + above - txtheight);
            linelen.translateTo(centerx, centery - below - txtheight)
                .string(Math.floor(this._bbObj.pixel_to_meter(newlen)) + "m");
            obj._length = this._bbObj.pixel_to_meter(newlen);
            obj._pt1pos = {
                x: pt1._x + pt1._transformdx,
                y: pt1._y + pt1._transformdy
            };
            obj._pt2pos = {
                x: pt2._x + pt2._transformdx,
                y: pt2._y + pt2._transformdy
            };
        };
        pt1tra.draggable(callback);
        pt1tra.optns.drag.val = false;
        pt2tra.draggable(callback);
        pt2tra.optns.drag.val = false;
        pt1tra.mouseover(() => {
            this._ourJc.layer(obj.id).optns.drag.val = false;
            pt1tra.optns.drag.val = true;
        });
        pt1tra.mouseout(() => {
            this._ourJc.layer(obj.id).optns.drag.val = true;
            pt1tra.optns.drag.val = false;
        });
        pt2tra.mouseover(() => {
            this._ourJc.layer(obj.id).optns.drag.val = false;
            pt2tra.optns.drag.val = true;
        });
        pt2.mouseout(() => {
            this._ourJc.layer(obj.id).optns.drag.val = true;
            pt2.optns.drag.val = false;
        });
        return this;
    }

    applyZoom(scale, _x, _y) {
        this._pt1pos.x = this._pt1pos.x * scale;
        this._pt1pos.y = this._pt1pos.y * scale;
        this._pt2pos.x = this._pt2pos.x * scale;
        this._pt2pos.y = this._pt2pos.y * scale;
        this._bbObj.BB_base.prototype.applyZoom.apply(this, arguments);
        return this;
    }
}

//
//BB_pointオブジェクト
//
class BB_point extends BB_base {
    constructor(_bbObj, _text, _size, _color, _align, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(0, 0, 0)';
        }
        if (_align === undefined) {
            _align = 0;
        }
        this.id = UUID.v1();

        this.type = "point";
        this._text = _text;
        this._size = parseInt(_size);
        this._align = _align;
        this._color = _color;
        this.draw();
        this.move(100, 100);
        this.regist();
        if (typeof(_callback) === "function") {
            _callback.apply(this);
        }
    }

    draw() {
        var text;
        this._ourJc
            .circle(0, 0, this._size, this._color, true)
            .opacity(1)
            .layer(this.id);
        this._ourJc
            .circle(0, 0, this._bbObj.pttrasize, "rgba(0,0,0,0)", true)
            .layer(this.id);
        if (this._align == 1) {
            // 左側
            text = this._ourJc
                .text(this._text, (-1) * (this._size + 5), 0)
                .layer(this.id)
                .color('#FFFFFF')
                .font('15px sans-serif')
                .align('right')
                .baseline('middle');
        } else {
            // 右側
            text = this._ourJc
                .text(this._text, this._size + 5, 0)
                .layer(this.id)
                .color('#FFFFFF')
                .font('15px sans-serif')
                .align('left')
                .baseline('middle');
        }

        if (!window.debugMode) {
            this._ourJc.layer(this.id).draggable();
        } else {
            var pixelP = this.position();
            var meterP = {
                x: this._bbObj.pixel_to_meter(pixelP.x),
                y: this._bbObj.pixel_to_meter(pixelP.y),
            };
            var pixelPosStr = `(${Math.floor(pixelP.x)}px, ${Math.floor(pixelP.y)}px)`;
            var meterPosStr = `(${Math.floor(meterP.x)}m, ${Math.floor(meterP.y)}m)`;
            var debugPos = this._ourJc
                .text(pixelPosStr +"/"+ meterPosStr, 0, 20)
                .layer(this.id)
                .color(this._color)
                .font('15px sans-serif')
                .align('left')
                .baseline('middle');
            var callback = () => {
                var pixelP = this.position();
                var meterP = {
                    x: this._bbObj.pixel_to_meter(pixelP.x),
                    y: this._bbObj.pixel_to_meter(pixelP.y),
                };
                var pixelPosStr = `(${Math.floor(pixelP.x)}px, ${Math.floor(pixelP.y)}px)`;
                var meterPosStr = `(${Math.floor(meterP.x)}m, ${Math.floor(meterP.y)}m)`;
                debugPos.string(`${pixelPosStr} / ${meterPosStr}`);
            };
            this._ourJc.layer(this.id).draggable(callback);
        }
        return this;
    }
}

//
//BB_scoutオブジェクト
//
class BB_scout extends BB_base {
    constructor(_bbObj, _text, _radius, _length, _duration, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(255, 0, 0)';
        }
        this.id = UUID.v1();

        this.type = "scout";
        this._text = _text;
        this._radius = _radius;
        this._length = _length;
        this._duration = _duration;
        this._color = _color;
        //描画して登録。初期座標は偵察半径分ずらす
        this.draw();
        var px_rad = this._bbObj.meter_to_pixel(this._radius);
        this.move(px_rad, px_rad);
        this.regist();
        if (typeof(_callback) === "function") {
            _callback.apply(this);
        }
    }

    draw() {
        var px_rad = this._bbObj.meter_to_pixel(this._radius),
            px_len = this._bbObj.meter_to_pixel(this._length),
            obj = this;

        var frame = this._ourJc.circle(0, 0, px_rad, this._color, false).layer(this.id).opacity(1),
            scout = this._ourJc.circle(0, 0, px_rad, this._color, true).opacity(0.3).layer(this.id),
            area = this._ourJc.scout(0, 0, px_rad, px_len, this._color, true).opacity(0.2).layer(this.id),
            areaf = this._ourJc.scout(0, 0, px_rad, px_len, this._color, false).opacity(1).layer(this.id),
            mask = this._ourJc.scout_mask(0, 0, px_rad, px_len).layer(this.id);
        this._ourJc.circle(0, 0, this._bbObj.ptsize, '#FFFFFF', true).layer(this.id);
        this._ourJc.text(this._text, 0, -10)
            .align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id);
        this._ourJc.layer(this.id).draggable();


        //角度変更処理
        mask.mousedown((point) => {
            var canvas = jc.canvas(this._bbObj.id),
                tmpmask = this._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)')
                .layer("tmp_" + this.id),
                layer = this._ourJc.layer(this.id),
                tmpLayer = this._ourJc.layer("tmp_" + this.id);
            tmpLayer.level('top');
            var pos_sct = scout.position();
            var startrad = Math.atan2((point.y - pos_sct.y), (point.x - pos_sct.x)),
                baserad = layer.getAngle();
            tmpmask.mousemove((pos) => {
                var nowrad = Math.atan2((pos.y - pos_sct.y), (pos.x - pos_sct.x));
                var rad = baserad + (nowrad - startrad);
                layer.rotateTo((rad * 180 / Math.PI), 0, 0);
            });
            tmpmask.mouseup((point) => {
                this._ourJc.layer("tmp_" + this.id).del();
            });
        });

        mask.mouseover(() => {
            this._ourJc.layer(this.id).optns.drag.val = false;
        }); // ドラッグ無効
        mask.mouseout(() => {
            this._ourJc.layer(obj.id).optns.drag.val = true;
        }); // ドラッグ有効

        //偵察機のアニメーション
        mask.dblclick(() => {
            //durationの単位はミリ秒のはずだが誤差がある…？
            scout.translate(px_len, 0,
                obj._duration * 1000,
                undefined, {
                    fn: function() {
                        frame.animate({
                            x: scout._transformdx,
                            y: scout._transformdy
                        });
                    }
                },
                function() {
                    obj.redraw();
                });
            return false;
        });
        return this;
    }
}

//
//BB_sensorオブジェクト
//
class BB_sensor extends BB_base {
    constructor(_bbObj, _text, _radius, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(255, 0, 0)';
        }
        this.id = UUID.v1();

        this.type = "sensor";
        this._text = _text;
        this._radius = _radius;
        this._color = _color;
        //描画して登録。初期座標は偵察半径分ずらす
        this.draw();
        var px_rad = this._bbObj.meter_to_pixel(this._radius);
        this.move(px_rad, px_rad);
        this.regist();
        if (typeof(_callback) === "function") {
            _callback.apply(this);
        }
    }
    draw() {
        var px_rad = this._bbObj.meter_to_pixel(this._radius);
        this._ourJc.circle(0, 0, px_rad, this._color, false).opacity(1).layer(this.id);
        this._ourJc.circle(0, 0, px_rad, this._color, true).opacity(0.5).layer(this.id);
        this._ourJc.circle(0, 0, this._bbObj.ptsize, this._color, true).layer(this.id).color('#FFFFFF');
        this._ourJc.text(this._text, 0, -10)
            .align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');
        this._ourJc.layer(this.id).draggable();
        return this;
    }
}

//
//BB_radarオブジェクト
//
class BB_radar extends BB_base {
    constructor(_bbObj, _text, _radius, _angle, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(255, 0, 0)';
        }
        this.id = UUID.v1();

        this.type = "radar";
        this._text = _text;
        this._radius = _radius;
        this._angle = _angle;
        this._color = _color;
        //描画して登録。初期座標は偵察半径分ずらす
        //支援マークはファイル依存させないため手打ち。
        this._image = new Image;
        this._image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAABnRS' + 'TlMA/wD/AP83WBt9AAAAZUlEQVR42qWRSwrAMAhEK4j3v64LMZQGk5hJsdRVxjw/g+TuVzlopo' + 'loJxYgBERTQabTYinZ6WgM6cgvNHQ8f930o1VVROCcKBj0bveNHuPOEuwNaeCyNzi8f1zHzJi5' + 'evlKfKMbjWF644wwKScAAAAASUVORK5CYII=';
        var obj = this;
        this._image.onload = () => {
            obj.draw();
            var px_rad = this._bbObj.meter_to_pixel(obj._radius);
            obj.move(px_rad, px_rad);
            obj.regist();
            if (typeof(_callback) === "function") {
                _callback.apply(obj);
            }
            delete this._image;
        };
    }
    draw() {
        var px_rad = this._bbObj.meter_to_pixel(this._radius),
            obj = this,
            img_width = this._image.width,
            img_height = this._image.height,
            img_rad = Math.sqrt(Math.pow(this._image.width, 2) + Math.pow(this._image.height, 2)) * 0.5;

        this._ourJc.sector(0, 0, px_rad, this._angle, this._color, false).opacity(1).layer(this.id);
        var area = this._ourJc.sector(0, 0, px_rad, this._angle, this._color, true).opacity(0.5).layer(this.id);
        this._ourJc.circle(0, 0, img_rad, this._color, true).opacity(0.9).layer(this.id);
        this._ourJc.circle(0, 0, img_rad - 2, '#ffffff', true).layer(this.id);
        this._ourJc.circle(0, 0, this._bbObj.pttrasize, 'rgba(0,0,0,0)', true).layer(this.id);
        this._ourJc.image(this._image, img_width * (-0.5), img_height * (-0.5), img_width, img_height).layer(this.id)
            .rotate(90);
        var text = this._ourJc.text(this._text, 60, 0)
            .align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');
        this._ourJc.layer(this.id).draggable();

        //移動処理(draggableでは回転できないため、独自定義)
        var mdEvent = (point) => {
            var pos_base = area.position(),
                canvas = jc.canvas(this._bbObj.id),
                radius = Math.sqrt(Math.pow((point.x - pos_base.x), 2) + Math.pow((point.y - pos_base.y), 2)),
                startrad = Math.atan2((point.y - pos_base.y), (point.x - pos_base.x)),
                baserad = this._ourJc.layer(obj.id).getAngle(),
                tmpmask = this._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)')
                .layer("tmp_" + obj.id),
                layer = this._ourJc.layer(obj.id),
                tmpLayer = this._ourJc.layer("tmp_" + obj.id);
            tmpLayer.level('top');
            tmpmask.mousemove((pos) => {
                var nowrad = Math.atan2((pos.y - pos_base.y), (pos.x - pos_base.x)),
                    rad = baserad + (nowrad - startrad);
                layer.rotateTo((rad * 180 / Math.PI), 0, 0);
            });
            tmpmask.mouseup(() => {
                tmpLayer.del();
            });
        };

        //扇形部分は角度変更
        area.mousedown(mdEvent);
        area.mouseover(() => {
            this._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
        });
        area.mouseout(() => {
            this._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
        });
        //文字列部分も角度変更
        text.mousedown(mdEvent);
        text.mouseover(() => {
            this._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
        });
        text.mouseout(() => {
            this._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
        });

        return this;
    }
}

//
//BB_sondeオブジェクト
//
class BB_sonde extends BB_base {
    constructor(_bbObj, _text, _radius1, _radius2, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = '#00FF00';
        }
        this.id = UUID.v1();

        this.type = "sonde";
        this._text = _text;
        this._radius1 = _radius1; //射程範囲
        this._radius2 = _radius2; //偵察範囲
        this._color = _color;
        this._markerx = 0;
        this._markery = 0;
        //描画して登録。初期座標は有効射程分ずらす
        this.draw();
        var px_rad1 = this._bbObj.meter_to_pixel(this._radius1);
        this.move(px_rad1, px_rad1);
        this.regist();
        if (typeof(_callback) === "function") {
            _callback.apply(this);
        }
    }
    draw() {
        var px_rad1 = this._bbObj.meter_to_pixel(this._radius1),
            px_rad2 = this._bbObj.meter_to_pixel(this._radius2),
            obj = this;

        //射程範囲の表示
        this._ourJc.circle(0, 0, px_rad1, this._color, false).opacity(1).layer(this.id);
        var range = this._ourJc.circle(0, 0, px_rad1, this._color, true).opacity(0.2).layer(this.id);
        this._ourJc.circle(0, 0, this._bbObj.ptsize, '#FFFFFF', true).layer(this.id);
        this._ourJc.text(this._text, 0, -40)
            .align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id);

        //照準円の表示
        var tgtline = this._ourJc.circle(this._markerx, this._markery, px_rad2, this._color, false).opacity(1).layer(this.id),
            tgt = this._ourJc.circle(this._markerx, this._markery, px_rad2, this._color, true).opacity(0.5).layer(this.id),
            cross = this._ourJc.crosshair(this._markerx, this._markery).layer(this.id);
        this._ourJc.layer(this.id).draggable();

        var dragfunc = function(cursor) {
            var followflag = true,
                pos = this.position(),
                base = range.position(),
                layer = obj._ourJc.layer(obj.id),
                dx = cursor.x - base.x,
                dy = cursor.y - base.y;
            if (Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) > px_rad1) {
                //はみだし禁止！
                followflag = false;
            } else {
                followflag = true;
            }

            if (followflag) {
                tgt.translateTo(pos.x, pos.y);
                tgtline.translateTo(pos.x, pos.y);
                cross.translateTo(pos.x, pos.y);
            } else {
                var rad = Math.atan2((cursor.y - base.y), (cursor.x - base.x));
                var x = base.x + px_rad1 * Math.cos(rad);
                var y = base.y + px_rad1 * Math.sin(rad);
                tgt.translateTo(x, y);
                tgtline.translateTo(x, y);
                cross.translateTo(x, y);
            }
            obj._markerx = this._x + this._transformdx;
            obj._markery = this._y + this._transformdy;
        };

        var tgtdrag = function() {
            obj._ourJc.layer(obj.id).optns.drag.val = false;
            this.optns.drag.val = true;
        };

        var tgtundrag = function() {
            obj._ourJc.layer(obj.id).optns.drag.val = true;
            this.optns.drag.val = false;
        };

        var resetfunc = function() {
            // 最初の位置に戻す
            var base = range.position();
            tgt.translateTo(base.x, base.y);
            tgtline.translateTo(base.x, base.y);
            cross.translateTo(base.x, base.y);
            obj._markerx = this._x + this._transformdx;
            obj._markery = this._y + this._transformdy;
            return false;
        };


        //索敵地点の処理
        tgt.draggable(dragfunc);
        cross.draggable(dragfunc);

        //初期状態ではレイヤを優先するため、個別ドラッグを抑止。
        //ターゲット部分でボタンが押下された場合のみターゲットの個別ドラッグを有効化。
        tgt.optns.drag.val = false;
        tgt.mouseover(tgtdrag);
        tgt.mouseout(tgtundrag);
        tgt.dblclick(resetfunc);

        //中心点も同様に処理させる
        //ただし、dblclickはpropagationするのでtgtに任せる
        cross.optns.drag.val = false;
        cross.mouseover(tgtdrag);
        cross.mouseout(tgtundrag);

        return this;
    }

    applyZoom(scale, _x, _y) {
        this._markerx = this._markerx * scale;
        this._markery = this._markery * scale;
        this._bbObj.BB_base.prototype.applyZoom.apply(this, arguments);
        return this;
    }
}

//
//BB_ndsensor オブジェクト
//
class BB_ndsensor extends BB_base {
    constructor(_bbObj, _text, _radius, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(255, 0, 0)';
        }
        this.id = UUID.v1();

        this.type = "ndsensor";
        this._text = _text;
        this._radius = _radius;
        this._color = _color;

        //中央アイコンはファイル依存させないため手打ち。
        this._image = new Image;
        this._image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAABnRS' + 'TlMA/wAAAP+JwC+QAAAAeElEQVR42q2QbQrAIAiG9WBBO1l0sgUdzFWSE1urwfoh6fvw+oEEBN' + 'sPRxpbER8lKRV5Znkz1YYOwBRCEDnGaFIgT3gqP/K9X5pVvk8ybmmgxU126YLmnJ1zHK2qc3bV' + 'tOlg6XK4eq/2+L+mdfyJltFlnrctlxe8AGPpa/QtEubEAAAAAElFTkSuQmCC';

        //描画して登録。初期座標はx方向に偵察半径+100、y方向に100ずらす
        var obj = this;
        this._image.onload = () => {
            obj.draw();
            var px_rad = this._bbObj.meter_to_pixel(obj._radius);
            obj.move(100 + px_rad, 100);
            obj.regist();
            if (typeof(_callback) === "function") {
                _callback.apply(obj);
            }
            delete this._image;
        };
    }

    draw() {
        var px_rad = this._bbObj.meter_to_pixel(this._radius),
            obj = this,
            above = 10,
            below = 5,
            img_width = this._image.width,
            img_height = this._image.height,
            img_rad = Math.sqrt(Math.pow(this._image.width, 2) + Math.pow(this._image.height, 2)) * 0.5;

        var line = this._ourJc.line({
                points: [
                    [px_rad, 0],
                    [(-1) * px_rad, 0]
                ],
                color: this._color
            })
            .opacity(1).lineStyle({
                lineWidth: 3
            }).layer(this.id),
            pt1col = this._ourJc.circle(px_rad, 0, this._bbObj.ptcolsize, this._color, true).layer(this.id),
            pt1 = this._ourJc.circle(px_rad, 0, this._bbObj.ptsize, "#FFFFFF", true).layer(this.id),
            pt1tra = this._ourJc.circle(px_rad, 0, this._bbObj.pttrasize, "rgba(0,0,0,0)", true).layer(this.id),
            pt2col = this._ourJc.circle((-1) * px_rad, 0, this._bbObj.ptcolsize, this._color, true).layer(this.id),
            pt2 = this._ourJc.circle((-1) * px_rad, 0, this._bbObj.ptsize, "#FFFFFF", true).layer(this.id),
            pt2tra = this._ourJc.circle((-1) * px_rad, 0, this._bbObj.pttrasize, "rgba(0,0,0,0)", true).layer(this.id),
            center = this._ourJc.circle(0, 0, img_rad, this._color, true).layer(this.id),
            centertra = this._ourJc.circle(0, 0, this._bbObj.pttrasize, "rgba(0,0,0,0)", true).layer(this.id);

        this._ourJc.circle(0, 0, img_rad - 2, '#FFFFFF', true).layer(this.id);
        this._ourJc.image(this._image, img_width * (-0.5), img_height * (-0.5), img_width, img_height).layer(this.id);
        this._ourJc.text(this._text, 0, 0 + above + img_height)
            .align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id);
        this._ourJc.layer(this.id).draggable();

        //移動処理(draggableでは回転できないため、独自定義)
        var mdEvent = (point) => {
            var pos_base = center.position(),
                canvas = jc.canvas(this._bbObj.id),
                radius = Math.sqrt(Math.pow((point.x), 2) + Math.pow((point.y), 2)),
                startrad = Math.atan2((point.y - pos_base.y), (point.x - pos_base.x)),
                baserad = this._ourJc.layer(obj.id).getAngle(),
                tmpmask = this._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)')
                .layer("tmp_" + obj.id),
                layer = this._ourJc.layer(obj.id),
                tmpLayer = this._ourJc.layer("tmp_" + obj.id);
            tmpLayer.level('top');
            tmpmask.mousemove((pos) => {
                var nowrad = Math.atan2((pos.y - pos_base.y), (pos.x - pos_base.x)),
                    rad = baserad + (nowrad - startrad);
                layer.rotateTo((rad * 180 / Math.PI), 0, 0);
            });
            tmpmask.mouseup(() => {
                tmpLayer.del();
            });
        };

        //端点は角度変更
        pt1tra.mousedown(mdEvent);
        pt1tra.mouseover(() => {
            this._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
        });
        pt1tra.mouseout(() => {
            this._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
        });
        pt2tra.mousedown(mdEvent);
        pt2tra.mouseover(() => {
            this._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
        });
        pt2tra.mouseout(() => {
            this._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
        });
        return this;
    }
}

//
//BB_vsensorオブジェクト
//
class BB_vsensor extends BB_base {
    constructor(_bbObj, _text, _radiusa, _radiusb, _color, _mode, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(153, 0, 255)';
        }
        if (_mode === undefined) {
            _mode = 'A';
        }
        this.id = UUID.v1();

        this.type = "vsensor";
        this._text = _text;
        this._radiusa = _radiusa;
        this._radiusb = _radiusb;
        this._color = _color;
        this._mode = _mode;

        //描画して登録。初期座標は偵察半径分ずらす
        this.draw();
        var px_rad = _bbObj.meter_to_pixel(this._radiusa);
        this.move(px_rad, px_rad);
        this.regist();
        if (typeof(_callback) === "function") {
            _callback.apply(this);
        }
    }

    draw() {
        var px_rad, modecolor,
            obj = this;

        if (this._mode == 'A') {
            px_rad = this._bbObj.meter_to_pixel(this._radiusa);
            modecolor = '#66FF66';
        } else {
            px_rad = this._bbObj.meter_to_pixel(this._radiusb);
            modecolor = '#00FFFF';
        }

        var area = this._ourJc.circle(0, 0, px_rad, this._color, false).opacity(1).layer(this.id);
        this._ourJc.circle(0, 0, px_rad, this._color, true).opacity(0.5).layer(this.id);
        this._ourJc.circle(0, 0, this._bbObj.ptsize, this._color, true).layer(this.id).color('#FFFFFF');
        this._ourJc.text(this._text, 0, 20)
            .align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');

        var moderect = this._ourJc.rect(-7, -25, 14, 17, modecolor, true).layer(this.id);
        var modetext = this._ourJc.text(this._mode, 0, -12)
            .align('center').layer(this.id).color('#000000').font('15px sans-serif');

        var clickfunc = () => {
            obj.modechg.apply(obj);
            return false;
        };

        moderect.click(clickfunc);
        modetext.click(clickfunc);
        area.dblclick(clickfunc);

        this._ourJc.layer(this.id).draggable();
        return this;
    }

    modechg() {
        if (this._mode == 'A') {
            this._mode = 'B';
        } else {
            this._mode = 'A';
        }
        this.redraw();
        return false;
    }
}

//
//BB_howitzerオブジェクト
//
class BB_howitzer extends BB_base {
    constructor(_bbObj, _text, _radius1, _radius2, _radius3, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = '#FFA500';
        }
        this.id = UUID.v1();

        this.type = "howitzer";
        this._text = _text;
        this._radius1 = _radius1; //射程範囲
        this._radius2 = _radius2; //爆風範囲
        this._radius3 = _radius3; //誤差範囲
        this._color = _color;
        this._markerx = 0;
        this._markery = 0;
        //描画して登録。初期座標は有効射程分ずらす
        this.draw();
        var px_rad1 = this._bbObj.meter_to_pixel(this._radius1);
        this.move(px_rad1, px_rad1);
        this.regist();
        if (typeof(_callback) === "function") {
            _callback.apply(this);
        }
    }
    draw() {
        var px_rad1 = this._bbObj.meter_to_pixel(this._radius1),
            px_rad2 = this._bbObj.meter_to_pixel(this._radius2),
            px_rad3 = this._bbObj.meter_to_pixel(this._radius3) + px_rad2,
            obj = this;

        //射程範囲の表示
        this._ourJc.circle(0, 0, px_rad1, this._color, false).opacity(1).layer(this.id);
        var range = this._ourJc.circle(0, 0, px_rad1, this._color, true).opacity(0.2).layer(this.id);
        this._ourJc.circle(0, 0, this._bbObj.ptsize, '#FFFFFF', true).layer(this.id);
        this._ourJc.text(this._text, 0, -40)
            .align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id);

        //照準円の表示
        var area = this._ourJc.circle(this._markerx, this._markery, px_rad3, this._color, false).opacity(1).layer(this.id),
            tgtline = this._ourJc.circle(this._markerx, this._markery, px_rad2, this._color, false).opacity(1).layer(this.id),
            tgt = this._ourJc.circle(this._markerx, this._markery, px_rad2, this._color, true).opacity(0.3).layer(this.id),
            cross = this._ourJc.crosshair(this._markerx, this._markery).layer(this.id);
        this._ourJc.layer(this.id).draggable();

        var dragfunc = function(cursor) {
            var followflag = true,
                pos = this.position(),
                base = range.position(),
                layer = obj._ourJc.layer(obj.id),
                dx = cursor.x - base.x,
                dy = cursor.y - base.y;
            if (Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) > px_rad1) {
                //はみだし禁止！
                followflag = false;
            } else {
                followflag = true;
            }

            if (followflag) {
                tgt.translateTo(pos.x, pos.y);
                tgtline.translateTo(pos.x, pos.y);
                cross.translateTo(pos.x, pos.y);
                area.translateTo(pos.x, pos.y);
            } else {
                var rad = Math.atan2((cursor.y - base.y), (cursor.x - base.x));
                var x = base.x + px_rad1 * Math.cos(rad);
                var y = base.y + px_rad1 * Math.sin(rad);
                tgt.translateTo(x, y);
                tgtline.translateTo(x, y);
                cross.translateTo(x, y);
                area.translateTo(x, y);
            }
            obj._markerx = area._x + area._transformdx;
            obj._markery = area._y + area._transformdy;
        };

        var tgtdrag = function() {
            obj._ourJc.layer(obj.id).optns.drag.val = false;
            this.optns.drag.val = true;
        };

        var tgtundrag = function() {
            obj._ourJc.layer(obj.id).optns.drag.val = true;
            this.optns.drag.val = false;
        };

        var resetfunc = function() {
            // 最初の位置に戻す
            var base = range.position();
            tgt.translateTo(base.x, base.y);
            tgtline.translateTo(base.x, base.y);
            cross.translateTo(base.x, base.y);
            area.translateTo(base.x, base.y);
            obj._markerx = area._x + area._transformdx;
            obj._markery = area._y + area._transformdy;
            return false;
        };

        //砲撃地点の処理
        tgt.draggable(dragfunc);
        cross.draggable(dragfunc);

        //初期状態ではレイヤを優先するため、個別ドラッグを抑止。
        //ターゲット部分でボタンが押下された場合のみターゲットの個別ドラッグを有効化。
        tgt.optns.drag.val = false;
        tgt.mouseover(tgtdrag);
        tgt.mouseout(tgtundrag);
        tgt.dblclick(resetfunc);

        //マーカーも同様に処理させる
        //ただし、dblclickはpropagationするのでtgtに任せる
        cross.optns.drag.val = false;
        cross.mouseover(tgtdrag);
        cross.mouseout(tgtundrag);

        return this;
    }

    applyZoom(scale, _x, _y) {
        this._markerx = this._markerx * scale;
        this._markery = this._markery * scale;
        this._bbObj.BB_base.prototype.applyZoom.apply(this, arguments);
        return this;
    }
}

//
//BB_bunkerオブジェクト
//
class BB_bunker extends BB_base {
    constructor(_bbObj, _text, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(255, 0, 165)';
        }
        this.id = UUID.v1();

        this.type = "bunker";
        this._text = _text;
        this._rad1 = 28; //攻撃範囲28m
        this._rad2 = 40; //爆風範囲40m
        this._color = _color;
        //描画して登録。初期座標は半径分ずらす
        this.draw();
        var px_rad = this._bbObj.meter_to_pixel(this._rad2);
        this.move(px_rad, px_rad);
        this.regist();
        if (typeof(_callback) === "function") {
            _callback.apply(this);
        }
    }

    draw() {
        var px_rad1 = this._bbObj.meter_to_pixel(this._rad1);
        var px_rad2 = this._bbObj.meter_to_pixel(this._rad2);
        this._ourJc.circle(0, 0, px_rad1, this._color, true).opacity(0.3).layer(this.id);
        this._ourJc.circle(0, 0, px_rad1, this._color, false).opacity(1).layer(this.id);
        this._ourJc.circle(0, 0, px_rad2, this._color, true).opacity(0.2).layer(this.id);
        this._ourJc.circle(0, 0, px_rad2, this._color, false).opacity(1).layer(this.id);
        this._ourJc.circle(0, 0, this._bbObj.ptsize, this._color, true).layer(this.id).color('#FFFFFF');
        this._ourJc.text(this._text, 0, -10)
            .align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');
        this._ourJc.layer(this.id).draggable();
        return this;
    }
}

//
//BB_sentryオブジェクト
//
class BB_sentry extends BB_base {
    constructor(_bbObj, _text, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(255, 0, 0)';
        }
        this.id = UUID.v1();

        this.type = "sentry";
        this._text = _text;
        this._radius = 80; //固定値
        this._angle = 120; //固定値
        this._color = _color;
        //描画して登録。初期座標は偵察半径分ずらす
        //マークはファイル依存させないため手打ち。
        this._image = new Image;
        this._image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAABnR' + 'STlMA/wD/AP83WBt9AAAAYUlEQVR42pWRUQ7AIAhD13txN7gbB2PLWMxUROSrJq8NVJjZVR4M' + 'NAAXYUpHP2h7/nVHt7xk3PkFrAyq6oKIgk1cMLOIZHtv0biTM7ra4NaAOOM1ZPRc4ln2bFv+T' + 'vXKZG6yP1bjQ2hwBAAAAABJRU5ErkJggg==';
        var obj = this;
        this._image.onload = () => {
            obj.draw();
            var px_rad = this._bbObj.meter_to_pixel(obj._radius);
            obj.move(px_rad, px_rad);
            obj.regist();
            if (typeof(_callback) === "function") {
                _callback.apply(obj);
            }
            delete this._image;
        };
    }
    draw() {
        var px_rad = this._bbObj.meter_to_pixel(this._radius),
            obj = this,
            img_width = this._image.width,
            img_height = this._image.height,
            img_rad = Math.sqrt(Math.pow(this._image.width, 2) + Math.pow(this._image.height, 2)) * 0.5;

        this._ourJc.sector(0, 0, px_rad, this._angle, this._color, false).opacity(1).layer(this.id);
        var area = this._ourJc.sector(0, 0, px_rad, this._angle, this._color, true).opacity(0.5).layer(this.id);
        this._ourJc.circle(0, 0, img_rad, this._color, true).opacity(0.9).layer(this.id);
        this._ourJc.circle(0, 0, img_rad - 2, '#ffffff', true).layer(this.id);
        this._ourJc.circle(0, 0, this._bbObj.pttrasize, 'rgba(0,0,0,0)', true).layer(this.id);
        this._ourJc.image(this._image, img_width * (-0.5), img_height * (-0.5), img_width, img_height).layer(this.id);
        var text = this._ourJc.text(this._text, 50, 0)
            .align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');
        this._ourJc.layer(this.id).draggable();

        //移動処理(draggableでは回転できないため、独自定義)
        var mdEvent = (point) => {
            var pos_base = area.position(),
                canvas = jc.canvas(this._bbObj.id),
                radius = Math.sqrt(Math.pow((point.x - pos_base.x), 2) + Math.pow((point.y - pos_base.y), 2)),
                startrad = Math.atan2((point.y - pos_base.y), (point.x - pos_base.x)),
                baserad = this._ourJc.layer(obj.id).getAngle(),
                tmpmask = this._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)')
                .layer("tmp_" + obj.id),
                layer = this._ourJc.layer(obj.id),
                tmpLayer = this._ourJc.layer("tmp_" + obj.id);
            tmpLayer.level('top');
            tmpmask.mousemove((pos) => {
                var nowrad = Math.atan2((pos.y - pos_base.y), (pos.x - pos_base.x)),
                    rad = baserad + (nowrad - startrad);
                layer.rotateTo((rad * 180 / Math.PI), 0, 0);
            });
            tmpmask.mouseup(() => {
                tmpLayer.del();
            });
        };

        //扇形部分は角度変更
        area.mousedown(mdEvent);
        area.mouseover(() => {
            this._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
        });
        area.mouseout(() => {
            this._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
        });
        //文字列部分も角度変更
        text.mousedown(mdEvent);
        text.mouseover(() => {
            this._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
        });
        text.mouseout(() => {
            this._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
        });

        return this;
    }
}

//
//BB_aerosentryオブジェクト
//
class BB_aerosentry extends BB_base {
    constructor(_bbObj, _text, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(255, 0, 0)';
        }
        this.id = UUID.v1();

        this.type = "aerosentry";
        this._text = _text;
        this._radius = 40; //固定値
        this._color = _color;
        //描画して登録。初期座標は偵察半径分ずらす
        //マークはファイル依存させないため手打ち。
        this._image = new Image;
        this._image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAAXN' + 'SR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABsSURBVChT' + 'nYxBEoAwDAL7/09HWkgkNid3xnED6IqIdYAU98mEIjtVRnZ62FIKqbOkf9fPocJD3ijxkHzXI' + '1r4GqjsqDu0A2iSKE3+/lvlhBb3ugR4SFoN/JwrvGgUMPqeEk/B7XvkdqoZDSIeqpRXt5iMa4' + 'kAAAAASUVORK5CYII=';
        var obj = this;
        this._image.onload = () => {
            obj.draw();
            var px_rad = this._bbObj.meter_to_pixel(obj._radius);
            obj.move(px_rad, px_rad);
            obj.regist();
            if (typeof(_callback) === "function") {
                _callback.apply(obj);
            }
            delete this._image;
        };
    }

    draw() {
        var px_rad = this._bbObj.meter_to_pixel(this._radius),
            obj = this,
            img_width = this._image.width,
            img_height = this._image.height,
            img_rad = Math.sqrt(Math.pow(this._image.width, 2) + Math.pow(this._image.height, 2)) * 0.5;

        this._ourJc.circle(0, 0, px_rad, this._color, false).opacity(1).layer(this.id);
        var area = this._ourJc.circle(0, 0, px_rad, this._color, true).opacity(0.3).layer(this.id);
        this._ourJc.circle(0, 0, img_rad, this._color, true).opacity(0.9).layer(this.id);
        this._ourJc.circle(0, 0, img_rad - 2, '#ffffff', true).layer(this.id);
        this._ourJc.image(this._image, img_width * (-0.5), img_height * (-0.5), img_width, img_height).layer(this.id);

        this._ourJc.text(this._text, 0, -10)
            .align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');
        this._ourJc.layer(this.id).draggable();

        return this;
    }
}

//
//BB_bomberオブジェクト
//
class BB_bomber extends BB_base {
    constructor(_bbObj, _text, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(255, 0, 165)';
        }
        this.id = UUID.v1();

        this.type = "bomber";
        this._text = _text;
        this._rad1 = 25; //爆風範囲
        this._rad2 = 0; //着弾誤差範囲
        this._center = [50, 65, 80, 95, 110, 125, 140, 155, 170, 185, 200, 215]; //爆心
        this._color = _color;
        //描画して登録。初期座標は半径分ずらす
        this.draw();
        var px_rad = this._bbObj.meter_to_pixel(this._rad1);
        this.move(px_rad, px_rad);
        this.regist();
        if (typeof(_callback) === "function") {
            _callback.apply(this);
        }
    }
    draw() {
        var i,
            px_rad1 = this._bbObj.meter_to_pixel(this._rad1),
            px_rad2 = px_rad1 + this._bbObj.meter_to_pixel(this._rad2),
            px_len = this._bbObj.meter_to_pixel(this._center[this._center.length - 1]),
            crosshair = [],
            point_ch = [];

        //攻撃位置を変換しておく
        for (i = 0; i < this._center.length; ++i) {
            point_ch[i] = this._bbObj.meter_to_pixel(this._center[i]);
        }

        this._ourJc.scout(0, 0, px_rad1, px_len, this._color, true).opacity(0.2).layer(this.id);
        this._ourJc.scout(0, 0, px_rad1, px_len, this._color, false).opacity(1).layer(this.id);
        var self = this._ourJc.circle(0, 0, this._bbObj.ptsize, '#FFFFFF', true).layer(this.id);

        //攻撃範囲表示
        for (i = 0; i < this._center.length; ++i) {
            this._ourJc.circle(point_ch[i], 0, px_rad1, this._color, false).opacity(1).layer(this.id),
                this._ourJc.circle(point_ch[i], 0, px_rad2, this._color, true).opacity(0.3).layer(this.id);
        }

        //クロスヘア表示
        var angle = (this._ourJc.layer(this.id).getAngle()) * (-180) / Math.PI;
        for (i = 0; i < this._center.length; ++i) {
            crosshair.push(this._ourJc.crosshair(point_ch[i], 0).layer(this.id)
                .rotateTo(angle, point_ch[i], 0));
        }

        this._ourJc.text(this._text, 0, -10)
            .align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');
        this._ourJc.layer(this.id).draggable();

        //角度変更処理
        var mask = this._ourJc.scout_mask(0, 0, px_rad1, px_len).layer(this.id),
            obj = this;
        mask.mousedown((point) => {
            var canvas = jc.canvas(this._bbObj.id),
                tmpmask = this._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)')
                .layer("tmp_" + obj.id),
                layer = this._ourJc.layer(obj.id),
                tmpLayer = this._ourJc.layer("tmp_" + obj.id);
            tmpLayer.level('top');
            var pos_self = self.position();
            var startrad = Math.atan2((point.y - pos_self.y), (point.x - pos_self.x)),
                baserad = layer.getAngle();
            tmpmask.mousemove((pos) => {
                var nowrad = Math.atan2((pos.y - pos_self.y), (pos.x - pos_self.x));
                var rad = baserad + (nowrad - startrad);
                layer.rotateTo((rad * 180 / Math.PI), 0, 0);
                for (var i = 0; i < crosshair.length; ++i) {
                    crosshair[i].rotateTo((rad * (-180) / Math.PI), point_ch[i], 0);
                }
            });
            tmpmask.mouseup((point) => {
                this._ourJc.layer("tmp_" + obj.id).del();
            });
        });

        mask.mouseover(() => {
            this._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
        });
        mask.mouseout(() => {
            this._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
        });

        return this;
    }
}

//
//BB_bascoutオブジェクト
//
class BB_bascout extends BB_base {
    constructor(_bbObj, _text, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(255, 0, 165)';
        }
        this.id = UUID.v1();

        this.type = "bascout";
        this._text = _text;
        this._color = _color;
        this._visible = true;
        //描画して登録。初期座標はとりあえず100づつずらしておく
        this.draw();
        var px_rad = this._bbObj.meter_to_pixel(100);
        this.move(px_rad, px_rad);
        this.regist();
        if (typeof(_callback) === "function") {
            _callback.apply(this);
        }
    }
    draw() {
        var px_wid = this._bbObj.meter_to_pixel(500),
            px_len = this._bbObj.meter_to_pixel(1200),
            px_back = this._bbObj.meter_to_pixel(300),
            obj = this;

        var area = this._ourJc.rect((-1) * px_wid, (-1) * px_back,
                2 * px_wid, px_len, this._color, true)
            .opacity(0.2).layer(this.id).visible(this._visible),
            areaf = this._ourJc.rect((-1) * px_wid, (-1) * px_back,
                2 * px_wid, px_len, this._color, false)
            .opacity(1).layer(this.id).visible(this._visible),
            bar = this._ourJc.line([
                [0, 7],
                [0, 25]
            ], this._color)
            .lineStyle({
                lineWidth: 2
            }).layer(this.id),
            arrow = this._ourJc.line([
                [5, 15],
                [0, 25],
                [-5, 15]
            ], this._color, true).layer(this.id),
            // center  = this._ourJc.circle(0, 0, this._bbObj.ptcolsize, this._color, true).layer(this.id),
            centerf = this._ourJc.circle(0, 0, this._bbObj.ptsize, '#FFFFFF', true).layer(this.id);
        this._ourJc.circle(0, 0, this._bbObj.pttrasize, 'rgba(0,0,0,0)', true).layer(this.id);

        this._ourJc.text(this._text, 0, -10)
            .align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id);
        this._ourJc.layer(this.id).draggable();

        //角度変更処理
        var mdEvent = (point) => {
            //if (this._ourJc.layer(obj.id).optns.drag.val==true){return false;}
            var canvas = jc.canvas(this._bbObj.id),
                tmpmask = this._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)')
                .layer("tmp_" + obj.id),
                layer = this._ourJc.layer(obj.id),
                tmpLayer = this._ourJc.layer("tmp_" + obj.id);
            tmpLayer.level('top');
            var pos_self = centerf.position();
            var startrad = Math.atan2((point.y - pos_self.y), (point.x - pos_self.x)),
                baserad = layer.getAngle();
            tmpmask.mousemove((pos) => {
                var nowrad = Math.atan2((pos.y - pos_self.y), (pos.x - pos_self.x));
                var rad = baserad + (nowrad - startrad);
                layer.rotateTo((rad * 180 / Math.PI), 0, 0);
            });
            tmpmask.mouseup((point) => {
                tmpLayer.del();
            });
            return true;
        };
        areaf.mousedown(mdEvent);
        bar.mousedown(mdEvent);
        arrow.mousedown(mdEvent);

        //  ドラッグ無効
        var drugoff = () => {
            this._ourJc.layer(obj.id).optns.drag.val = false;
        };
        areaf.mouseover(drugoff);
        arrow.mouseover(drugoff);
        bar.mouseover(drugoff);

        //  ドラッグ有効
        var drugon = () => {
            this._ourJc.layer(obj.id).optns.drag.val = true;
        };
        areaf.mouseout(drugon);
        arrow.mouseout(drugon);
        bar.mouseout(drugon);

        centerf.dblclick(() => {
            obj._visible = !(obj._visible);
            area.visible(obj._visible);
            areaf.visible(obj._visible);
        });

        return this;
    }
}

class BB_icon extends BB_base {
    constructor(_bbObj, _text, _file, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(0, 255, 255)';
        }
        this.id = UUID.v1();

        if ((_file = sanitize_filepath(_file)) == null) {
            return null;
        }

        this.type = "icon";
        this._text = _text;
        this._file = _file;
        this._color = _color;

        //描画して登録。初期座標は半径分ずらす
        this._image = new Image;
        this._image.src = _file + '?' + salt;
        var obj = this;
        this._image.onload = () => {
            var px_dia = Math.sqrt(Math.pow(obj._image.width, 2) + Math.pow(obj._image.height, 2));
            obj.draw();
            obj.move(px_dia, px_dia);
            obj.regist();
            if (typeof(_callback) === "function") {
                _callback.apply(obj);
            }
            delete this._image;
        };
    }
    draw() {
        var img_width = this._image.width,
            img_height = this._image.height,
            px_rad = Math.sqrt(Math.pow(this._image.width, 2) + Math.pow(this._image.height, 2)) * 0.5;
        this._ourJc.circle(0, 0, px_rad, this._color, true).opacity(0.9).layer(this.id);
        this._ourJc.circle(0, 0, px_rad - 2, '#FFFFFF', true).layer(this.id);
        this._ourJc.circle(0, 0, this._bbObj.pttrasize, 'rgba(0,0,0,0)', true).layer(this.id);
        this._ourJc.image(this._image, img_width * (-0.5), img_height * (-0.5), img_width, img_height).layer(this.id);
        this._ourJc.text(this._text, img_width * 0.5 + 5, 0)
            .layer(this.id).color('#FFFFFF').font('15px sans-serif')
            .align('left').baseline('middle');
        this._ourJc.layer(this.id).draggable();

        return this;
    }
}

//
//BB_waftオブジェクト
//
class BB_waft extends BB_base {
    constructor(_bbObj, _text, _file, _color, _callback) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(0, 255, 255)';
        }
        this.id = UUID.v1();

        if ((_file = sanitize_filepath(_file)) == null) {
            return null;
        }

        this.type = "waft";
        this._text = _text;
        this._file = _file;
        this._rad = 20; //大ざっぱに全長40m程度?
        this._color = _color;

        //描画して登録。初期座標は半径分ずらす
        this._image = new Image;
        this._image.src = _file + '?' + salt;
        var obj = this,
            px_rad = this._bbObj.meter_to_pixel(this._rad);
        this._image.onload = () => {
            obj.draw();
            obj.move(px_rad, px_rad);
            obj.regist();
            if (typeof(_callback) === "function") {
                _callback.apply(obj);
            }
            delete this._image;
        };
    }
    draw() {
        var px_rad = this._bbObj.meter_to_pixel(this._rad),
            img_width = this._image.width,
            img_height = this._image.height,
            img_rate = px_rad * 2 / ((img_width >= img_height) ? img_width : img_height);

        img_width = img_width * img_rate;
        img_height = img_height * img_rate;

        var handle = this._ourJc.circle(0, 0, px_rad + (10 * this._bbObj.zoomScale), this._color, true).opacity(0.3).layer(this.id);
        this._ourJc.circle(0, 0, px_rad, this._color, true).opacity(1).layer(this.id);
        this._ourJc.image(this._image, img_width * (-0.5), img_height * (-0.5), img_width, img_height).layer(this.id);
        this._ourJc.text(this._text, 0, -25)
            .align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');

        this._ourJc.layer(this.id).draggable();

        //角度変更処理
        var obj = this,
            layer = jc.layer(this.id),
            canvas = jc.canvas(this._bbObj.id);

        handle.mousedown((point) => {
            var pos_hdl = handle.position();
            // マウスイベントフック用の四角形を最前面に展開
            var tmpmask = this._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)')
                .layer("tmp_" + obj.id);
            jc.layer("tmp_" + obj.id).level('top');

            var startrad = Math.atan2((point.y - pos_hdl.y), (point.x - pos_hdl.x)),
                baserad = layer.getAngle();
            tmpmask.mousemove((pos) => {
                var nowrad = Math.atan2((pos.y - pos_hdl.y), (pos.x - pos_hdl.x));
                var rad = baserad + (nowrad - startrad);
                layer.rotateTo((rad * 180 / Math.PI), 0, 0);
            });
            tmpmask.mouseup((point) => {
                this._ourJc.layer("tmp_" + obj.id).del();
            });
        });

        handle.mouseover(() => {
            layer.optns.drag.val = false; // ドラッグ無効
        });
        handle.mouseout(() => {
            layer.optns.drag.val = true; // ドラッグ有効
        });

        return this;
    }
}
//
//BB_freehandオブジェクト
//
class BB_freehand extends BB_base {
    constructor(_bbObj, _text, _color) {
        super(_bbObj);
        if (_color === undefined) {
            _color = 'rgb(255, 255, 255)';
        }
        this.id = UUID.v1();
        this.type = "freehand";
        this._text = _text;
        this._color = _color;
        this._step = 0;
        this._stepcol = new Array;
        this._undoCache = new Array;
        this._hooker = undefined;

        //layerを確保するためのダミー画像を設置するのみ
        this._ourJc.rect(0, 0, 1, 1, 'rgba(0, 0, 0, 0)').layer(this.id);
        this.regist();
    }
    color(_color) {
        if (_color === undefined) {
            return this._color;
        }
        this._color = _color;
        return this;
    }

    //BB_baseからプロトタイプをコピー
    //this.BB_freehand.prototype.toString = this.BB_base.prototype.toString;
    //this.BB_freehand.prototype.regist   = this.BB_base.prototype.regist;
    //this.BB_freehand.prototype.up       = this.BB_base.prototype.up;
    //this.BB_freehand.prototype.down     = this.BB_base.prototype.down;
    //this.BB_freehand.prototype.del      = this.BB_base.prototype.del;
    //this.BB_freehand.prototype.move     = this.BB_base.prototype.move;
    //this.BB_freehand.prototype.moveTo   = this.BB_base.prototype.moveTo;

    redraw() {
        for (var i = 1; i <= this._step; i++) {
            var points = jc("#" + i, {
                canvas: this._bbObj.id,
                layer: this.id
            }).points();
            jc("#" + i, {
                canvas: this._bbObj.id,
                layer: this.id
            }).del();
            this._ourJc.line(points, this._stepcol[i])
                .layer(this.id).id(i).lineStyle({
                    lineWidth: 3
                });
        }
    }

    applyZoom(scale, _x, _y) {
        var posx = jc.layer(this.id)._transformdx,
            posy = jc.layer(this.id)._transformdy;
        jc.layer(this.id).translate(posx * scale - posx - _x * scale, posy * scale - posy - _y * scale);

        for (var i = 1; i <= this._step; i++) {
            var points = jc("#" + i, {
                canvas: this._bbObj.id,
                layer: this.id
            }).points();
            for (var j = 0; j < points.length; j++) {
                points[j] = [(points[j])[0] * scale, (points[j])[1] * scale];
            }
            jc("#" + i, {
                canvas: this._bbObj.id,
                layer: this.id
            }).del();
            this._ourJc.line(points, this._stepcol[i])
                .layer(this.id).id(i).lineStyle({
                    lineWidth: 3
                });
        }
    }

    start() {
        var obj = this,
            // layer  = this._ourJc.layer(this.id),
            canvas = jc.canvas(this._bbObj.id);

        if (this._hooker !== undefined) return this;

        // 描画開始時にundoキャッシュをクリア
        this._undoCache.length = 0;

        // マウスイベントフック用の四角形を最前面に展開
        this._hooker = UUID.v1();
        var hooker = this._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)')
            .layer(this._hooker).level('top');

        hooker.click(() => {
            return false;
        });
        hooker.dblclick(() => {
            return false;
        });
        hooker.mousemove(() => {
            return false;
        });
        hooker.mousedown((ptstart) => {
            //追記したのでundoキャッシュをクリアする
            obj._undoCache.length = 0;

            obj._step++;
            obj._stepcol[obj._step] = obj._color;
            var line = this._ourJc.line([
                    [ptstart.x, ptstart.y],
                    [ptstart.x, ptstart.y]
                ], obj._color)
                .layer(obj.id).id(obj._step).lineStyle({
                    lineWidth: 3
                });
            hooker.mousemove((point) => {
                line.addPoint(point.x, point.y);
                return false;
            });
            return false;
        });

        hooker.mouseup(() => {
            hooker.mousemove(() => {});
            return false;
        });

        return this;
    }

    undo() {
        // 描画処理中でなければそのまま抜ける
        if (this._hooker === undefined) return this;

        if (this._step != 0) {
            this._undoCache.push({
                color: this._stepcol[this._step],
                points: jc("#" + this._step, {
                    canvas: this._bbObj.id,
                    layer: this.id
                }).points()
            });
            this._stepcol.splice(this._step, 1);
            jc("#" + this._step, {
                canvas: this._bbObj.id,
                layer: this.id
            }).del();
            this._step--;
        }
        return this;
    }

    redo() {
        // 描画処理中でなければそのまま抜ける
        if (this._hooker === undefined) return this;

        // undoキャッシュにデータがなければそのまま抜ける
        if (this._undoCache.length == 0) return this;

        var cache = this._undoCache.pop();
        this._step++;
        this._stepcol[this._step] = cache.color;
        this._ourJc.line(cache.points, cache.color)
            .layer(this.id).id(this._step).lineStyle({
                lineWidth: 3
            });

        return this;
    }

    end() {
        // イベントフック用の四角形を消す
        (jc.layer(this._hooker)).del();
        this._hooker = undefined;

        // undoキャッシュをクリア
        this._undoCache.length = 0;

        return this;
    }
}

//
// BBオブジェクト定義
//
export default class BB {
    constructor(canvasID) {
        this.member = {};
        this.id = canvasID;
        this.ourJc = jc.start(canvasID, true);
        this.scale = 1;
        this.zoomScale = 1;
        this.imgscale = 1;

        var canvas = document.getElementById(this.id); // !!!!! notice

        this.initTouchToMouse(canvas);
        this.initExtendJCanvaScript(jc);

        this.ptsize = 5, //オブジェクトの操作点を示す白点のサイズ
            this.ptcolsize = 7, //操作点を縁取りする色つき円のサイズ
            this.pttrasize = (window.TouchEvent) ? 15 : 7; //操作点そのもののサイズ
    }

    //
    // touchイベントからmouseイベントへのブリッジを設定
    //
    initTouchToMouse(canvas) {
        var clickthr = 5; // クリックとみなす範囲の閾値

        var mouseoverflag = false,
            touchflag = false,
            startX = 0,
            startY = 0,
            clkflag;
        var bbobj = this;

        function dispatchMouseEvent(type, touch) {
            var event = document.createEvent("MouseEvent");
            event.initMouseEvent(type, true, true, window, ((type == 'dblclick') ? 2 : 1),
                touch.screenX, touch.screenY, (touch.clientX + window.pageXOffset + document.documentElement.getBoundingClientRect().left), (touch.clientY + window.pageYOffset + document.documentElement.getBoundingClientRect().top),
                false, false, false, false, 0, null);
            touch.target.dispatchEvent(event);
        }

        function pointInObj(touch) {
            var cnvrect = document.getElementById(bbobj.id).getBoundingClientRect(),
                x = touch.clientX - cnvrect.left,
                y = touch.clientY - cnvrect.top,
                result = false;

            for (var objid in (bbobj.member)) {
                if ((bbobj.object(objid)).type != "freehand") {
                    result = jc.layer(objid).isPointIn(x, y);
                } else {
                    //freehandオブジェクトは書き込み中であればオブジェクトありとみなす
                    result = ((bbobj.object(objid))._hooker !== undefined);
                }
                if (result) {
                    break;
                }
            }

            ////ターレットと索敵施設は個別のオブジェクトとして扱われていないため
            //nameを利用したグループで別途チェックを行う
            if (!result) {
                var targets = Array.prototype.concat(
                    jc(".turrets").elements,
                    jc(".searchers").elements);

                for (var i = 0; i < targets.length; i++) {
                    result = targets[i].isPointIn(x, y);
                    if (result) {
                        break;
                    }
                }
            }

            return result;
        }

        canvas.addEventListener('touchstart',
            function(e) {
                //マルチタッチの場合は変換処理を止める
                if (e.touches.length >= 2) {
                    touchflag = false;
                    return;
                }

                var touch = e.touches[0];
                touchflag = pointInObj(touch);
                if (!touchflag) return;

                mouseoverflag = true;

                startX = touch.pageX;
                startY = touch.pageY;

                clkflag = setTimeout(() => {
                    clkflag = 0
                }, 300);
                dispatchMouseEvent('mousemove', touch);
                jc.canvas(BB.id).frame();
                dispatchMouseEvent('mousedown', touch);
                return false;
            }, false
        );

        canvas.addEventListener('touchmove',
            function(e) {
                if (!touchflag) return;

                var touch = e.changedTouches[0];
                e.preventDefault();

                var cnvrect = e.target.getBoundingClientRect();
                var cnvx = cnvrect.left,
                    cnvy = cnvrect.top,
                    width = e.target.offsetWidth || e.target.width,
                    height = e.target.offsetHeight || e.target.height;
                var clix = touch.clientX,
                    cliy = touch.clientY;

                //canvasの枠内ならmousemove、枠外ならmouseout
                if (clix > cnvx && cliy > cnvy && clix < cnvx + width && cliy < cnvy + height) {
                    if (!mouseoverflag) dispatchMouseEvent('mouseover', touch);
                    dispatchMouseEvent('mousemove', touch);
                    mouseoverflag = true;
                } else {
                    if (mouseoverflag) dispatchMouseEvent('mouseout', touch);
                    mouseoverflag = false;
                }
            }, false
        );

        canvas.addEventListener('touchend',
            function(e) {
                //touch処理中でなければpreventDefaultせずに抜ける
                if (!touchflag) return;

                e.preventDefault();

                //mouseout時はpreventDefaultしてから抜ける
                if (!mouseoverflag) return;

                var touch = e.changedTouches[0];
                dispatchMouseEvent('mouseup', touch);
                //タッチ開始からの距離が閾値以下ならクリックイベントも発火
                if (Math.abs(startX - touch.pageX) < clickthr && Math.abs(startY - touch.pageY) < clickthr && clkflag != 0) {

                    if (clkflag) clearTimeout(clkflag);
                    dispatchMouseEvent('click', touch)
                }
                mouseoverflag = false;
            }, false
        );

    }

    //
    //jCanvaScriptへの関数、オブジェクト追加
    //
    initExtendJCanvaScript(jc) {
        //回転処理用に関数一個追加
        jc.addFunction('rotateTo',
            function(angle, x1, y1, duration, easing, onstep, fn) {
                this.optns.rotateMatrix = [
                    [1, 0, 0],
                    [0, 1, 0]
                ];
                return this.rotate.apply(this, arguments);
            }
        );

        //現在の角度を求める関数を追加
        jc.addFunction('getAngle',
            function() {
                var matrix = this.optns.rotateMatrix;
                return (matrix[1][0] > 0) ? Math.acos(matrix[0][0]) : (-1) * Math.acos(matrix[0][0]);
            });

        //CanvaSciprtに背景合成用のオブジェクト追加
        jc.addObject('imgdiff', {
                image: new Image,
                x: 0,
                y: 0,
                width: false,
                height: false,
                sx: 0,
                sy: 0,
                swidth: false,
                sheight: false
            },
            function(ctx) {
                if (this._width === false) {
                    this._width = this._image.width;
                    this._height = this._image.height;
                }
                if (this._swidth === false) {
                    this._swidth = this._image.width;
                    this._sheight = this._image.height;
                }

                var opmode = ctx.globalCompositeOperation;
                ctx.globalCompositeOperation = "lighter";
                ctx.drawImage(this._image, this._sx, this._sy, this._swidth, this._sheight,
                    this._x, this._y, this._width, this._height);
                ctx.globalCompositeOperation = opmode;
                this.getRect = (type) => {
                    return {
                        x: this._x,
                        y: this._y,
                        width: this._width,
                        height: this._height
                    };
                }
            }
        );

        //CanvaSciprtに偵察機用オブジェクト追加
        jc.addObject('scout', {
                x: 0,
                y: 0,
                radius: 0,
                length: 0,
                color: 'rgb(255, 0, 0)',
                fill: false
            },
            function(ctx) {
                var x = this._x,
                    y = this._y,
                    radius = this._radius,
                    length = this._length;
                ctx.moveTo(x + length * 0.5, y + radius);
                ctx.arc(x, y, radius, Math.PI * 0.5, Math.PI * 1.5, false);
                ctx.lineTo(x + length * 0.5, y - radius);
                ctx.arc(x + length, y, radius, Math.PI * 1.5, Math.PI * 0.5, false);
                ctx.lineTo(x + length * 0.5, y + radius);
                ctx.closePath();
                this.getRect = () => {
                    return {
                        x: (this._x),
                        y: (this._y),
                        width: (this._length + this._radius * 2),
                        height: (this._radius * 2)
                    };
                };
            }
        );

        jc.addObject('scout_mask', {
                x: 0,
                y: 0,
                radius: 0,
                length: 0,
                color: 'rgba(0, 0, 0, 0)',
                fill: true
            },
            function(ctx) {
                var x = this._x,
                    y = this._y,
                    radius = this._radius,
                    length = this._length;
                ctx.moveTo(x + length * 0.5, y + radius);
                ctx.arc(x, y, radius, Math.PI * 0.5, Math.PI * 1.5, true);
                ctx.lineTo(x + length * 0.5, y - radius);
                ctx.arc(x + length, y, radius, Math.PI * 1.5, Math.PI * 0.5, false);
                ctx.lineTo(x + length * 0.5, y + radius);
                ctx.closePath();
                this.getRect = () => {
                    return {
                        x: (this._x),
                        y: (this._y),
                        width: (this._length + this._radius),
                        height: (this._radius * 2)
                    };
                };
            }
        );

        //CanvaSciprtに扇形オブジェクト追加
        jc.addObject('sector', {
                x: 0,
                y: 0,
                radius: 0,
                angle: 0,
                color: 'rgb(255, 0, 0)',
                fill: false
            },
            function(ctx) {
                var x = this._x,
                    y = this._y,
                    radius = this._radius,
                    angle = this._angle;
                var radian = angle * Math.PI / 180;

                ctx.moveTo(x, y);
                ctx.arc(x, y, radius, radian / 2, radian / (-2), true);
                ctx.closePath();
                this.getRect = () => {
                    return {
                        x: (this._x),
                        y: (this._y),
                        width: (this._radius),
                        height: (2 * Math.sin(this._angle * Math.PI / 360))
                    };
                };
            }
        );

        //CanvaSciprtに榴弾用クロスヘア追加
        jc.addObject('crosshair', {
                x: 0,
                y: 0,
                color: 'rgb(255, 255, 255)'
            },
            function(ctx) {
                var offset = 20;
                var dash = 6;
                ctx.moveTo(this._x - offset, this._y);
                ctx.lineTo(this._x - offset + dash, this._y);
                ctx.closePath();
                ctx.moveTo(this._x - offset + dash * 2, this._y);
                ctx.lineTo(this._x + offset - dash * 2, this._y);
                ctx.closePath();
                ctx.moveTo(this._x + offset - dash, this._y);
                ctx.lineTo(this._x + offset, this._y);
                ctx.closePath();
                ctx.moveTo(this._x, this._y - offset);
                ctx.lineTo(this._x, this._y - offset + dash);
                ctx.closePath();
                ctx.moveTo(this._x, this._y - offset + dash * 2);
                ctx.lineTo(this._x, this._y + offset - dash * 2);
                ctx.closePath();
                ctx.moveTo(this._x, this._y + offset - dash);
                ctx.lineTo(this._x, this._y + offset);
                ctx.closePath();
                ctx.lineWidth = 3;
                this.getRect = () => {
                    return {
                        x: (this._x - offset),
                        y: (this._y - offset),
                        width: offset * 2,
                        height: offset * 2
                    };
                };
            }
        );
    }

    //
    //縮尺計算
    //
    meter_to_pixel(meter) {
        return (meter * (this.scale * this.zoomScale));
    }
    pixel_to_meter(pixel) {
        return (pixel / (this.scale * this.zoomScale));
    }

    //
    //背景
    //(画像ファイル, Dot per Meter, 画像縮小比率)
    //
    setbg(file, dpm, imgscale, callback) {
        var image = new Image,
            ourJc = this.ourJc,
            id = this.id;
        if (imgscale === undefined) {
            imgscale = 1;
        }

        if ((file = sanitize_filepath(file)) == null) {
            return null;
        }

        image.src = file + '?' + salt;
        image.onload = () => {
            var canvas = document.getElementById(id);
            canvas.width = image.width * imgscale;
            canvas.height = image.height * imgscale;
            jc.clear(id);
            ourJc.image(image, 0, 0, image.width * imgscale, image.height * imgscale).level(-1).id("bg");
            if (callback !== undefined) callback();
            jc.start(id, true);
        };
        this.scale = dpm * imgscale;
        this.imgscale = imgscale;
        this.zoomScale = 1;
        this.member = {};
    }
    setbgdiff(file) {
        var image = new Image;
        var ourJc = this.ourJc;
        var id = this.id;
        var imgscale = this.imgscale;

        if (file) {
            //ファイル指定があれば差分を出力し、即時再描画
            image.src = file + '?' + salt;
            image.onload = () => {
                ourJc("#bgdiff").del();
                ourJc.imgdiff(image, 0, 0, image.width * imgscale, image.height * imgscale)
                    .level(0).id("bgdiff");
                jc.canvas(id).frame();
            };
        } else {
            //空だったら差分を消し、即時再描画
            ourJc("#bgdiff").del();
            jc.canvas(id).frame();
        }
    }

    //
    //オブジェクト管理メソッド
    //
    object(objid) {
        return this.member[objid];
    }
    nextlevel(level) {
        var nextlevel = undefined,
            nextid = undefined;
        for (var id in this.member) {
            if ((nextlevel === undefined) && (this.ourJc.layer(id).level() > level)) {
                nextlevel = this.ourJc.layer(id).level();
                nextid = id;
            } else if ((this.ourJc.layer(id).level() > level) && (this.ourJc.layer(id).level() < nextlevel)) {
                nextlevel = this.ourJc.layer(id).level();
                nextid = id;
            }
        }
        return {
            id: nextid,
            level: nextlevel
        };
    }
    prevlevel(level) {
        var prevlevel = undefined,
            previd = undefined;
        for (var id in this.member) {
            if ((prevlevel === undefined) && (this.ourJc.layer(id).level() < level)) {
                prevlevel = this.ourJc.layer(id).level();
                previd = id;
            } else if ((this.ourJc.layer(id).level() < level) && (this.ourJc.layer(id).level() > prevlevel)) {
                prevlevel = this.ourJc.layer(id).level();
                previd = id;
            }
        }
        return {
            id: previd,
            level: prevlevel
        };
    }

    //
    //画像保管用
    //
    save() {
        return (jc.canvas(this.id).toDataURL('image/png'));
    }

    //

    //ターレット配置
    //
    put_turret(x, y, rot, radius, angle, hookrad, color, test, type) {
        if (x === undefined) {
            return undefined;
        }
        if (y === undefined) {
            return undefined;
        }
        if (rot === undefined) {
            return undefined;
        }
        if (radius === undefined) {
            return undefined;
        }
        if (angle === undefined) {
            return undefined;
        }
        if (hookrad === undefined) {
            hookrad = 8;
        }
        if (color === undefined) {
            color = 'rgb(255, 153, 0)';
        }
        if (test === undefined) {
            test = false;
        }

        var visible = false;
        var px_rad = this.meter_to_pixel(radius);
        var area = this.ourJc
            .sector(x, y, px_rad, angle, color, true)
            .rotateTo(rot - 90, x, y)
            .opacity(0.3)
            .visible(visible)
            .level(1);
        var line = this.ourJc
            .sector(x, y, px_rad, angle, this.color, false)
            .level(1)
            .rotateTo(rot - 90, x, y)
            .opacity(1)
            .visible(visible);
        var hooker = this.ourJc
            .circle(x, y, hookrad, 'rgba(0,0,0,0)', true)
            .rotateTo(rot - 90, x, y)
            .level(3)
            .name("turrets");

        if (test) {
            this.ourJc
                .line([
                    [x, y],
                    [x, y - 20]
                ], 'rgba(255,0,0,1)')
                .rotateTo(rot, x, y)
                .lineStyle({
                    lineWidth: 2
                });
            var c = (type == "L")? 'rgba(255,0,0,1)':
                    (type == "G")? 'rgba(0,0,255,1)':
                    (type == "M")? 'rgba(0,255,255,1)':
                    (type == "R")? 'rgba(255,255,0,1)':
                    'rgba(255,0,0,1)'
            hooker.color(c).level('top');
        }

        hooker.mouseover(() => {
            area.visible(true);
            line.visible(true);
        });
        hooker.mouseout(() => {
            area.visible(visible);
            line.visible(visible);
        });
        hooker.click(() => {
            visible = !(visible);
            area.visible(visible);
            line.visible(visible);
        });
    }


    //
    //索敵装置配置
    //
    put_searcher(x, y, radius, hookrad, color, test) {
        if (x === undefined) {
            return undefined;
        }
        if (y === undefined) {
            return undefined;
        }
        if (radius === undefined) {
            return undefined;
        }
        if (hookrad === undefined) {
            hookrad = 8;
        }
        if (color === undefined) {
            color = 'rgb(153, 255, 255)';
        }
        if (test === undefined) {
            test = false;
        }

        var visible = false,
            px_rad = this.meter_to_pixel(radius),
            area = this.ourJc.circle(x, y, px_rad, color, true)
            .opacity(0.3).visible(visible).level(1),
            line = this.ourJc.circle(x, y, px_rad, color, false)
            .opacity(1).visible(visible).level(1),
            hooker = this.ourJc.circle(x, y, hookrad, 'rgba(0,0,0,0)', true)
            .level(3).name("searchers");

        if (test) {
            hooker.color('rgba(0,255,0,1)').level('top');
        }

        hooker.mouseover(() => {
            area.visible(true);
            line.visible(true);
        });
        hooker.mouseout(() => {
            area.visible(visible);
            line.visible(visible);
        });
        hooker.click(() => {
            visible = !(visible);
            area.visible(visible);
            line.visible(visible);
        });
    }

    //
    //オブジェクト描画
    //
    add_scout(string, radius, length, duration, color, _callback) {
        return new BB_scout(this, string, radius, length, duration, color, _callback);
    }

    add_sensor(string, radius, color, _callback) {
        return new BB_sensor(this, string, radius, color, _callback);
    }

    add_radar(string, radius, angle, color, _callback) {
        return new BB_radar(this, string, radius, angle, color, _callback);
    }

    add_sonde(string, radius1, radius2, color, _callback) {
        return new BB_sonde(this, string, radius1, radius2, color, _callback);
    }

    add_ndsensor(string, radius, color, _callback) {
        return new BB_ndsensor(this, string, radius, color, _callback);
    }

    add_vsensor(string, radiusa, radiusb, color, mode, _callback) {
        return new BB_vsensor(this, string, radiusa, radiusb, color, mode, _callback);
    }

    add_howitzer(string, radius1, radius2, radius3, color, _callback) {
        return new BB_howitzer(this, string, radius1, radius2, radius3, color, _callback);
    }

    add_bunker(string, color, _callback) {
        return new BB_bunker(this, string, color, _callback);
    }

    add_sentry(string, color, _callback) {
        return new BB_sentry(this, string, color, _callback);
    }

    add_aerosentry(string, color, _callback) {
        return new BB_aerosentry(this, string, color, _callback);
    }

    add_bomber(string, color, _callback) {
        return new BB_bomber(this, string, color, _callback);
    }

    add_bascout(string, color, _callback) {
        return new BB_bascout(this, string, color, _callback);
    }

    add_circle(string, radius, color, _callback) {
        return new BB_circle(this, string, radius, color, _callback);
    }

    add_line(string, length, color, _callback) {
        return new BB_line(this, string, length, color, _callback);
    }

    add_point(string, size, color, align, _callback) {
        return new BB_point(this, string, size, color, align, _callback);
    }

    add_icon(string, file, color, _callback) {
        return new BB_icon(this, string, file, color, _callback);
    }

    add_waft(string, file, color, _callback) {
        return new BB_waft(this, string, file, color, _callback);
    }

    add_freehand(text, color) {
        return new BB_freehand(this, text, color);
    }

    //
    //拡大縮小
    //
    zoom(scale) {
        if (scale === undefined) return (this.zoomScale);

        var canvas = jc.canvas(this.id).cnv,
            baseLayer = jc.canvas(this.id).layers[0];

        //倍率書き換えて、背景レイヤと各オブジェクトの拡大を実施
        this.zoomScale = this.zoomScale * scale;
        baseLayer.scale(scale);

        for (var objid in (this.member)) {
            this.object(objid).applyZoom(scale);
        }

        //キャンバスの大きさを合わせる
        canvas.width = jc("#bg").getRect().width;
        canvas.height = jc("#bg").getRect().height;
        this.chgScroll();

        jc.canvas(this.id).frame();
        return this;
    }

    chgScroll() {
        jc.canvas(this.id).recalculateOffset();
    }

}
