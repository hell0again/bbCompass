import jc from '../vendor/jcscript/jCanvaScript.1.5.18.min';
import UUID from 'uuid';

//
// 内部変数初期化
//
let salt = Math.round((new Date()).getTime() / 1000);

//
// 内部関数定義
//
let sanitize_filepath = function(path) {
    var control_codes = /[\u0000-\u001F\u007F-\u009F]/g;
    path.replace(control_codes, "\uFFFD");
    if (path.match(/^([.~]?\/)?([A-Za-z0-9_-][A-Za-z0-9_.-]+\/)*[A-Za-z0-9_-][A-Za-z0-9_.-]+$/)) {
        return path;
    } else {
        return null;
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

        dispatchMouseEvent = (type, touch) => {
            var event = document.createEvent("MouseEvent");
            event.initMouseEvent(
                type, true, true, window,
                ((type == 'dblclick') ? 2 : 1),
                touch.screenX, touch.screenY,
                (touch.clientX + window.pageXOffset + document.documentElement.getBoundingClientRect().left),
                (touch.clientY + window.pageYOffset + document.documentElement.getBoundingClientRect().top),
                false, false, false, false, 0, null);
            touch.target.dispatchEvent(event);
        }

        pointInObj = (touch) => {
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

        canvas.addEventListener('touchstart', (e) => {
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
        }, false);

        canvas.addEventListener('touchmove', (e) => {
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
        }, false);

        canvas.addEventListener('touchend', (e) => {
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
        }, false);

    }

    //
    //jCanvaScriptへの関数、オブジェクト追加
    //
    initExtendJCanvaScript(jc) {
        //回転処理用に関数一個追加
        jc.addFunction('rotateTo', function(angle, x1, y1, duration, easing, onstep, fn) {
            this.optns.rotateMatrix = [
                [1, 0, 0],
                [0, 1, 0]
            ];
            return this.rotate.apply(this, arguments);
        });

        //現在の角度を求める関数を追加
        jc.addFunction('getAngle', function() {
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
        }, function(ctx) {
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
        });

        //CanvaSciprtに偵察機用オブジェクト追加
        jc.addObject('scout', {
            x: 0,
            y: 0,
            radius: 0,
            length: 0,
            color: 'rgb(255, 0, 0)',
            fill: false
        }, function(ctx) {
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
        });

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

        var visible = false,
            px_rad = this.meter_to_pixel(radius),
            area = this.ourJc.sector(x, y, px_rad, angle, color, true)
            .rotateTo(rot - 90, x, y).opacity(0.3).visible(visible).level(1),
            line = this.ourJc.sector(x, y, px_rad, angle, this.color, false).level(1)
            .rotateTo(rot - 90, x, y).opacity(1).visible(visible),
            hooker = this.ourJc.circle(x, y, hookrad, 'rgba(0,0,0,0)', true)
            .rotateTo(rot - 90, x, y).level(3).name("turrets");

        if (test) {
            this.ourJc.line([
                    [x, y],
                    [x, y - 20]
                ], 'rgba(255,0,0,1)')
                .rotateTo(rot, x, y).lineStyle({
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

    getBoardObject(typeCode) {
        return BoardObjectRegistry.getInstance().getByTypeCode(typeCode);
    }
    addBoardObject(typeCode, ...args) {
        let BoardObj = BoardObjectRegistry.getInstance().getByTypeCode(typeCode);
        return new BoardObj(...args);
    }
    /*
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
    */

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

