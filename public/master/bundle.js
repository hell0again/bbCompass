/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(5);
	module.exports = __webpack_require__(12);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*global jc*/ // eslint
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	__webpack_require__(2);

	var _uuid = __webpack_require__(3);

	var _uuid2 = _interopRequireDefault(_uuid);

	//
	// 内部変数初期化
	//
	var salt = Math.round(new Date().getTime() / 1000);

	//
	// 内部関数定義
	//
	var sanitize_filepath = function sanitize_filepath(path) {
	    var control_codes = /[\u0000-\u001F\u007F-\u009F]/g;
	    path.replace(control_codes, '�');
	    if (path.match(/^([.~]?\/)?([A-Za-z0-9_-][A-Za-z0-9_.-]+\/)*[A-Za-z0-9_-][A-Za-z0-9_.-]+$/)) {
	        return path;
	    } else {
	        return null;
	    }
	};

	//
	//BB_baseオブジェクト
	//

	var BB_base = (function () {
	    function BB_base(_bbObj) {
	        _classCallCheck(this, BB_base);

	        //初期化は下位オブジェに任せる
	        this._text = "base";
	        this._color = "#000000";
	        this._bbObj = _bbObj;
	        this._ourJc = _bbObj.ourJc;
	    }

	    //
	    //BB_circleオブジェクト
	    //

	    _createClass(BB_base, [{
	        key: 'draw',
	        value: function draw() {
	            //一応ダミーを定義
	        }
	    }, {
	        key: 'redraw',
	        value: function redraw() {
	            this._ourJc.layer(this.id).objects().del();
	            this.draw();
	        }
	    }, {
	        key: 'applyZoom',
	        value: function applyZoom(scale, _x, _y) {
	            var posx = jc.layer(this.id)._transformdx,
	                posy = jc.layer(this.id)._transformdy;
	            jc.layer(this.id).translate(posx * scale - posx, posy * scale - posy);
	            this.redraw();
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this.id;
	        }
	    }, {
	        key: 'position',
	        value: function position() {
	            var posx = this._ourJc.layer(this.id)._transformdx;
	            var posy = this._ourJc.layer(this.id)._transformdy;
	            return {
	                x: posx,
	                y: posy
	            };
	        }
	    }, {
	        key: 'rotAngle',
	        value: function rotAngle() {
	            return jc.layer(this.id).getAngle() * 180 / Math.PI;
	        }
	    }, {
	        key: 'click',
	        value: function click(fn) {
	            this._ourJc.layer(this.id).click(fn);
	            return this;
	        }
	    }, {
	        key: 'mouseup',
	        value: function mouseup(fn) {
	            this._ourJc.layer(this.id).mouseup(fn);
	            return this;
	        }
	    }, {
	        key: 'mousedown',
	        value: function mousedown(fn) {
	            this._ourJc.layer(this.id).mousedown(fn);
	            return this;
	        }
	    }, {
	        key: 'dblclick',
	        value: function dblclick(fn) {
	            this._ourJc.layer(this.id).dblclick(fn);
	            return this;
	        }
	    }, {
	        key: 'move',
	        value: function move(_dx, _dy) {
	            this._ourJc.layer(this.id).translate(_dx, _dy);
	            return this;
	        }
	    }, {
	        key: 'rotateTo',
	        value: function rotateTo(_angle) {
	            this._ourJc.layer(this.id).rotateTo(_angle);
	            return this;
	        }
	    }, {
	        key: 'moveTo',
	        value: function moveTo(_x, _y) {
	            //translateToはどこが原点かわからないので、
	            //現在までの変位をもとに相対的に移動させる
	            var posx = this._ourJc.layer(this.id)._transformdx;
	            var posy = this._ourJc.layer(this.id)._transformdy;
	            this._ourJc.layer(this.id).translate(_x - posx, _y - posy);
	            //this._ourJc.layer(this.id).translateTo(_x,_y);
	            return this;
	        }
	    }, {
	        key: 'color',
	        value: function color(_color) {
	            if (_color === undefined) {
	                return this._color;
	            }
	            this._color = _color;
	            this.redraw();
	            return this;
	        }
	    }, {
	        key: 'text',
	        value: function text(_text) {
	            if (_text === undefined) {
	                return this._text;
	            }
	            this._text = _text;
	            this.redraw();
	            return this;
	        }
	    }, {
	        key: 'regist',
	        value: function regist() {
	            this._bbObj.member[this.id] = this;
	        }
	    }, {
	        key: 'up',
	        value: function up() {
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
	    }, {
	        key: 'down',
	        value: function down() {
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
	    }, {
	        key: 'del',
	        value: function del() {
	            delete this._bbObj.member[this.id];
	            var objs = this._ourJc.layer(this.id).objs;
	            this._ourJc.layer(this.id).del();
	        }
	    }]);

	    return BB_base;
	})();

	var BB_circle = (function (_BB_base) {
	    _inherits(BB_circle, _BB_base);

	    function BB_circle(_bbObj, _text, _radius, _color, _callback) {
	        _classCallCheck(this, BB_circle);

	        _get(Object.getPrototypeOf(BB_circle.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(0, 51, 255)';
	        }
	        this.id = _uuid2['default'].v1();

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
	        if (typeof _callback === "function") {
	            _callback.apply(this);
	        }
	    }

	    //
	    //BB_lineオブジェクト
	    //

	    _createClass(BB_circle, [{
	        key: 'draw',
	        value: function draw() {
	            var _this = this;

	            var px_rad = this._bbObj.meter_to_pixel(this._radius),
	                ptx = this._ptpos.x,
	                pty = this._ptpos.y,
	                obj = this;

	            var area = this._ourJc.circle(0, 0, px_rad, this._color, true).opacity(0.3).layer(this.id),
	                areacol = this._ourJc.circle(0, 0, px_rad, this._color, false).opacity(1).lineStyle({
	                lineWidth: 3
	            }).layer(this.id),
	                line = this._ourJc.line({
	                points: [[0, 0], [ptx, pty]],
	                color: this._color
	            }).lineStyle({
	                lineWidth: 3
	            }).layer(this.id).opacity(1);
	            this._ourJc.circle(0, 0, 7, this._color, true).opacity(1).layer(this.id);

	            var center = this._ourJc.circle(0, 0, 5, "#FFFFFF", true).layer(this.id);
	            this._ourJc.text(this._text, 0, -10).layer(this.id).color('#FFFFFF').font('15px sans-serif').align('center');

	            var ptcol = this._ourJc.circle(ptx, pty, this._bbObj.ptcolsize, this._color, true).layer(this.id).opacity(1),
	                pt = this._ourJc.circle(ptx, pty, this._bbObj.ptsize, "#FFFFFF", true).layer(this.id),
	                pttra = this._ourJc.circle(ptx, pty, this._bbObj.pttrasize, "rgba(0,0,0,0)", true).layer(this.id),
	                radius = this._ourJc.text(Math.floor(this._radius) + "m", ptx / 2, pty / 2).baseline("top").align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id);

	            this._ourJc.layer(this.id).draggable();

	            var txtheight = radius.getRect().height; //translateTo時に高さがずれるので補正項
	            var callback = function callback() {
	                var pos1 = center.position(),
	                    pos2 = pttra.position(),
	                    dx = pos2.x - pos1.x,
	                    dy = pos2.y - pos1.y,
	                    centerx = (pos1.x + pos2.x) / 2,
	                    centery = (pos1.y + pos2.y) / 2,
	                    newrad = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	                pt.translateTo(pos2.x, pos2.y);
	                ptcol.translateTo(pos2.x, pos2.y);
	                line.points([[0, 0], [pt._x + pt._transformdx, pt._y + pt._transformdy]]);
	                area.attr('radius', newrad);
	                areacol.attr('radius', newrad);
	                radius.translateTo(centerx, centery - txtheight).string(Math.floor(_this._bbObj.pixel_to_meter(newrad)) + "m");
	                obj._radius = _this._bbObj.pixel_to_meter(newrad);
	                obj._ptpos = {
	                    x: pt._x + pt._transformdx,
	                    y: pt._y + pt._transformdy
	                };
	            };

	            pttra.draggable(callback);
	            pttra.optns.drag.val = false;
	            pttra.mouseover(function () {
	                _this._ourJc.layer(obj.id).optns.drag.val = false;
	                pttra.optns.drag.val = true;
	            });
	            pttra.mouseout(function () {
	                _this._ourJc.layer(obj.id).optns.drag.val = true;
	                pttra.optns.drag.val = false;
	            });
	            return this;
	        }
	    }, {
	        key: 'applyZoom',
	        value: function applyZoom(scale, _x, _y) {
	            this._ptpos.x = this._ptpos.x * scale;
	            this._ptpos.y = this._ptpos.y * scale;
	            this._bbObj.BB_base.prototype.applyZoom.apply(this, arguments);
	            return this;
	        }
	    }]);

	    return BB_circle;
	})(BB_base);

	var BB_line = (function (_BB_base2) {
	    _inherits(BB_line, _BB_base2);

	    function BB_line(_bbObj, _text, _length, _color, _callback) {
	        _classCallCheck(this, BB_line);

	        _get(Object.getPrototypeOf(BB_line.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(51, 153, 0)';
	        }
	        this.id = _uuid2['default'].v1();

	        this.type = "line";
	        this._text = _text;
	        this._length = _length;
	        this._color = _color;

	        var px_len = this._bbObj.meter_to_pixel(this._length);
	        this._pt1pos = {
	            x: -1 * px_len / 2,
	            y: 0
	        };
	        this._pt2pos = {
	            x: px_len / 2,
	            y: 0
	        };

	        this.draw();
	        this.move(100 + px_len / 2, 100);
	        this.regist();
	        if (typeof _callback === "function") {
	            _callback.apply(this);
	        }
	    }

	    //
	    //BB_pointオブジェクト
	    //

	    //座標の扱いが特殊なので座標関連の関数を一部オーバーライド

	    _createClass(BB_line, [{
	        key: 'position',
	        value: function position() {
	            var _x = this._ourJc.layer(this.id)._transformdx + (this._pt1pos.x + this._pt2pos.x) / 2,
	                _y = this._ourJc.layer(this.id)._transformdy + (this._pt1pos.y + this._pt2pos.y) / 2;
	            return {
	                x: _x,
	                y: _y
	            };
	        }
	    }, {
	        key: 'moveTo',
	        value: function moveTo(_x, _y) {
	            var layer = this._ourJc.layer(this.id);
	            var _curx = layer._transformdx + (this._pt1pos.x + this._pt2pos.x) / 2,
	                _cury = layer._transformdy + (this._pt1pos.y + this._pt2pos.y) / 2;
	            layer.translate(_x - _curx, _y - _cury);
	            return this;
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            var _this2 = this;

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
	                points: [[x1, y1], [x2, y2]],
	                color: this._color
	            }).opacity(1).lineStyle({
	                lineWidth: 3
	            }).layer(this.id),
	                pt1col = this._ourJc.circle(x1, y1, this._bbObj.ptcolsize, this._color, true).layer(this.id),
	                pt1 = this._ourJc.circle(x1, y1, this._bbObj.ptsize, "#FFFFFF", true).layer(this.id),
	                pt1tra = this._ourJc.circle(x1, y1, this._bbObj.pttrasize, "rgba(0,0,0,0)", true).layer(this.id),
	                pt2col = this._ourJc.circle(x2, y2, this._bbObj.ptcolsize, this._color, true).layer(this.id),
	                pt2 = this._ourJc.circle(x2, y2, this._bbObj.ptsize, "#FFFFFF", true).layer(this.id),
	                pt2tra = this._ourJc.circle(x2, y2, this._bbObj.pttrasize, "rgba(0,0,0,0)", true).layer(this.id),
	                linename = this._ourJc.text(this._text, centerx, centery + above).align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id),
	                linelen = this._ourJc.text(Math.floor(this._length) + "m", centerx, centery - below).align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id);
	            this._ourJc.layer(this.id).draggable();

	            var txtheight = linelen.getRect().height; //translateTo時に高さがずれるので補正項
	            var callback = function callback() {
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
	                line.points([[pt1._x + pt1._transformdx, pt1._y + pt1._transformdy], [pt2._x + pt2._transformdx, pt2._y + pt2._transformdy]]);
	                linename.translateTo(centerx, centery + above - txtheight);
	                linelen.translateTo(centerx, centery - below - txtheight).string(Math.floor(_this2._bbObj.pixel_to_meter(newlen)) + "m");
	                obj._length = _this2._bbObj.pixel_to_meter(newlen);
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
	            pt1tra.mouseover(function () {
	                _this2._ourJc.layer(obj.id).optns.drag.val = false;
	                pt1tra.optns.drag.val = true;
	            });
	            pt1tra.mouseout(function () {
	                _this2._ourJc.layer(obj.id).optns.drag.val = true;
	                pt1tra.optns.drag.val = false;
	            });
	            pt2tra.mouseover(function () {
	                _this2._ourJc.layer(obj.id).optns.drag.val = false;
	                pt2tra.optns.drag.val = true;
	            });
	            pt2.mouseout(function () {
	                _this2._ourJc.layer(obj.id).optns.drag.val = true;
	                pt2.optns.drag.val = false;
	            });
	            return this;
	        }
	    }, {
	        key: 'applyZoom',
	        value: function applyZoom(scale, _x, _y) {
	            this._pt1pos.x = this._pt1pos.x * scale;
	            this._pt1pos.y = this._pt1pos.y * scale;
	            this._pt2pos.x = this._pt2pos.x * scale;
	            this._pt2pos.y = this._pt2pos.y * scale;
	            this._bbObj.BB_base.prototype.applyZoom.apply(this, arguments);
	            return this;
	        }
	    }]);

	    return BB_line;
	})(BB_base);

	var BB_point = (function (_BB_base3) {
	    _inherits(BB_point, _BB_base3);

	    function BB_point(_bbObj, _text, _size, _color, _align, _callback) {
	        _classCallCheck(this, BB_point);

	        _get(Object.getPrototypeOf(BB_point.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(0, 0, 0)';
	        }
	        if (_align === undefined) {
	            _align = 0;
	        }
	        this.id = _uuid2['default'].v1();

	        this.type = "point";
	        this._text = _text;
	        this._size = parseInt(_size);
	        this._align = _align;
	        this._color = _color;
	        this.draw();
	        this.move(100, 100);
	        this.regist();
	        if (typeof _callback === "function") {
	            _callback.apply(this);
	        }
	    }

	    //
	    //BB_scoutオブジェクト
	    //

	    _createClass(BB_point, [{
	        key: 'draw',
	        value: function draw() {
	            var text;
	            this._ourJc.circle(0, 0, this._size, this._color, true).opacity(1).layer(this.id);
	            this._ourJc.circle(0, 0, this._bbObj.pttrasize, "rgba(0,0,0,0)", true).layer(this.id);
	            if (this._align == 1) {
	                // 左側
	                text = this._ourJc.text(this._text, -1 * (this._size + 5), 0).layer(this.id).color('#FFFFFF').font('15px sans-serif').align('right').baseline('middle');
	            } else {
	                // 右側
	                text = this._ourJc.text(this._text, this._size + 5, 0).layer(this.id).color('#FFFFFF').font('15px sans-serif').align('left').baseline('middle');
	            }
	            this._ourJc.layer(this.id).draggable();
	            return this;
	        }
	    }]);

	    return BB_point;
	})(BB_base);

	var BB_scout = (function (_BB_base4) {
	    _inherits(BB_scout, _BB_base4);

	    function BB_scout(_bbObj, _text, _radius, _length, _duration, _color, _callback) {
	        _classCallCheck(this, BB_scout);

	        _get(Object.getPrototypeOf(BB_scout.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(255, 0, 0)';
	        }
	        this.id = _uuid2['default'].v1();

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
	        if (typeof _callback === "function") {
	            _callback.apply(this);
	        }
	    }

	    //
	    //BB_sensorオブジェクト
	    //

	    _createClass(BB_scout, [{
	        key: 'draw',
	        value: function draw() {
	            var _this3 = this;

	            var px_rad = this._bbObj.meter_to_pixel(this._radius),
	                px_len = this._bbObj.meter_to_pixel(this._length),
	                obj = this;

	            var frame = this._ourJc.circle(0, 0, px_rad, this._color, false).layer(this.id).opacity(1),
	                scout = this._ourJc.circle(0, 0, px_rad, this._color, true).opacity(0.3).layer(this.id),
	                area = this._ourJc.scout(0, 0, px_rad, px_len, this._color, true).opacity(0.2).layer(this.id),
	                areaf = this._ourJc.scout(0, 0, px_rad, px_len, this._color, false).opacity(1).layer(this.id),
	                mask = this._ourJc.scout_mask(0, 0, px_rad, px_len).layer(this.id);
	            this._ourJc.circle(0, 0, this._bbObj.ptsize, '#FFFFFF', true).layer(this.id);
	            this._ourJc.text(this._text, 0, -10).align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id);
	            this._ourJc.layer(this.id).draggable();

	            //角度変更処理
	            mask.mousedown(function (point) {
	                var canvas = jc.canvas(_this3._bbObj.id),
	                    tmpmask = _this3._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)').layer("tmp_" + _this3.id),
	                    layer = _this3._ourJc.layer(_this3.id),
	                    tmpLayer = _this3._ourJc.layer("tmp_" + _this3.id);
	                tmpLayer.level('top');
	                var pos_sct = scout.position();
	                var startrad = Math.atan2(point.y - pos_sct.y, point.x - pos_sct.x),
	                    baserad = layer.getAngle();
	                tmpmask.mousemove(function (pos) {
	                    var nowrad = Math.atan2(pos.y - pos_sct.y, pos.x - pos_sct.x);
	                    var rad = baserad + (nowrad - startrad);
	                    layer.rotateTo(rad * 180 / Math.PI, 0, 0);
	                });
	                tmpmask.mouseup(function (point) {
	                    _this3._ourJc.layer("tmp_" + _this3.id).del();
	                });
	            });

	            mask.mouseover(function () {
	                _this3._ourJc.layer(_this3.id).optns.drag.val = false;
	            }); // ドラッグ無効
	            mask.mouseout(function () {
	                _this3._ourJc.layer(obj.id).optns.drag.val = true;
	            }); // ドラッグ有効

	            //偵察機のアニメーション
	            mask.dblclick(function () {
	                //durationの単位はミリ秒のはずだが誤差がある…？
	                scout.translate(px_len, 0, obj._duration * 1000, undefined, {
	                    fn: function fn() {
	                        frame.animate({
	                            x: scout._transformdx,
	                            y: scout._transformdy
	                        });
	                    }
	                }, function () {
	                    obj.redraw();
	                });
	                return false;
	            });
	            return this;
	        }
	    }]);

	    return BB_scout;
	})(BB_base);

	var BB_sensor = (function (_BB_base5) {
	    _inherits(BB_sensor, _BB_base5);

	    function BB_sensor(_bbObj, _text, _radius, _color, _callback) {
	        _classCallCheck(this, BB_sensor);

	        _get(Object.getPrototypeOf(BB_sensor.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(255, 0, 0)';
	        }
	        this.id = _uuid2['default'].v1();

	        this.type = "sensor";
	        this._text = _text;
	        this._radius = _radius;
	        this._color = _color;
	        //描画して登録。初期座標は偵察半径分ずらす
	        this.draw();
	        var px_rad = this._bbObj.meter_to_pixel(this._radius);
	        this.move(px_rad, px_rad);
	        this.regist();
	        if (typeof _callback === "function") {
	            _callback.apply(this);
	        }
	    }

	    //
	    //BB_radarオブジェクト
	    //

	    _createClass(BB_sensor, [{
	        key: 'draw',
	        value: function draw() {
	            var px_rad = this._bbObj.meter_to_pixel(this._radius);
	            this._ourJc.circle(0, 0, px_rad, this._color, false).opacity(1).layer(this.id);
	            this._ourJc.circle(0, 0, px_rad, this._color, true).opacity(0.5).layer(this.id);
	            this._ourJc.circle(0, 0, this._bbObj.ptsize, this._color, true).layer(this.id).color('#FFFFFF');
	            this._ourJc.text(this._text, 0, -10).align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');
	            this._ourJc.layer(this.id).draggable();
	            return this;
	        }
	    }]);

	    return BB_sensor;
	})(BB_base);

	var BB_radar = (function (_BB_base6) {
	    _inherits(BB_radar, _BB_base6);

	    function BB_radar(_bbObj, _text, _radius, _angle, _color, _callback) {
	        var _this4 = this;

	        _classCallCheck(this, BB_radar);

	        _get(Object.getPrototypeOf(BB_radar.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(255, 0, 0)';
	        }
	        this.id = _uuid2['default'].v1();

	        this.type = "radar";
	        this._text = _text;
	        this._radius = _radius;
	        this._angle = _angle;
	        this._color = _color;
	        //描画して登録。初期座標は偵察半径分ずらす
	        //支援マークはファイル依存させないため手打ち。
	        this._image = new Image();
	        this._image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAABnRS' + 'TlMA/wD/AP83WBt9AAAAZUlEQVR42qWRSwrAMAhEK4j3v64LMZQGk5hJsdRVxjw/g+TuVzlopo' + 'loJxYgBERTQabTYinZ6WgM6cgvNHQ8f930o1VVROCcKBj0bveNHuPOEuwNaeCyNzi8f1zHzJi5' + 'evlKfKMbjWF644wwKScAAAAASUVORK5CYII=';
	        var obj = this;
	        this._image.onload = function () {
	            obj.draw();
	            var px_rad = _this4._bbObj.meter_to_pixel(obj._radius);
	            obj.move(px_rad, px_rad);
	            obj.regist();
	            if (typeof _callback === "function") {
	                _callback.apply(obj);
	            }
	            delete _this4._image;
	        };
	    }

	    //
	    //BB_sondeオブジェクト
	    //

	    _createClass(BB_radar, [{
	        key: 'draw',
	        value: function draw() {
	            var _this5 = this;

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
	            this._ourJc.image(this._image, img_width * -0.5, img_height * -0.5, img_width, img_height).layer(this.id).rotate(90);
	            var text = this._ourJc.text(this._text, 60, 0).align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');
	            this._ourJc.layer(this.id).draggable();

	            //移動処理(draggableでは回転できないため、独自定義)
	            var mdEvent = function mdEvent(point) {
	                var pos_base = area.position(),
	                    canvas = jc.canvas(_this5._bbObj.id),
	                    radius = Math.sqrt(Math.pow(point.x - pos_base.x, 2) + Math.pow(point.y - pos_base.y, 2)),
	                    startrad = Math.atan2(point.y - pos_base.y, point.x - pos_base.x),
	                    baserad = _this5._ourJc.layer(obj.id).getAngle(),
	                    tmpmask = _this5._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)').layer("tmp_" + obj.id),
	                    layer = _this5._ourJc.layer(obj.id),
	                    tmpLayer = _this5._ourJc.layer("tmp_" + obj.id);
	                tmpLayer.level('top');
	                tmpmask.mousemove(function (pos) {
	                    var nowrad = Math.atan2(pos.y - pos_base.y, pos.x - pos_base.x),
	                        rad = baserad + (nowrad - startrad);
	                    layer.rotateTo(rad * 180 / Math.PI, 0, 0);
	                });
	                tmpmask.mouseup(function () {
	                    tmpLayer.del();
	                });
	            };

	            //扇形部分は角度変更
	            area.mousedown(mdEvent);
	            area.mouseover(function () {
	                _this5._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
	            });
	            area.mouseout(function () {
	                _this5._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
	            });
	            //文字列部分も角度変更
	            text.mousedown(mdEvent);
	            text.mouseover(function () {
	                _this5._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
	            });
	            text.mouseout(function () {
	                _this5._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
	            });

	            return this;
	        }
	    }]);

	    return BB_radar;
	})(BB_base);

	var BB_sonde = (function (_BB_base7) {
	    _inherits(BB_sonde, _BB_base7);

	    function BB_sonde(_bbObj, _text, _radius1, _radius2, _color, _callback) {
	        _classCallCheck(this, BB_sonde);

	        _get(Object.getPrototypeOf(BB_sonde.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = '#00FF00';
	        }
	        this.id = _uuid2['default'].v1();

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
	        if (typeof _callback === "function") {
	            _callback.apply(this);
	        }
	    }

	    //
	    //BB_ndsensor オブジェクト
	    //

	    _createClass(BB_sonde, [{
	        key: 'draw',
	        value: function draw() {
	            var px_rad1 = this._bbObj.meter_to_pixel(this._radius1),
	                px_rad2 = this._bbObj.meter_to_pixel(this._radius2),
	                obj = this;

	            //射程範囲の表示
	            this._ourJc.circle(0, 0, px_rad1, this._color, false).opacity(1).layer(this.id);
	            var range = this._ourJc.circle(0, 0, px_rad1, this._color, true).opacity(0.2).layer(this.id);
	            this._ourJc.circle(0, 0, this._bbObj.ptsize, '#FFFFFF', true).layer(this.id);
	            this._ourJc.text(this._text, 0, -40).align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id);

	            //照準円の表示
	            var tgtline = this._ourJc.circle(this._markerx, this._markery, px_rad2, this._color, false).opacity(1).layer(this.id),
	                tgt = this._ourJc.circle(this._markerx, this._markery, px_rad2, this._color, true).opacity(0.5).layer(this.id),
	                cross = this._ourJc.crosshair(this._markerx, this._markery).layer(this.id);
	            this._ourJc.layer(this.id).draggable();

	            var dragfunc = function dragfunc(cursor) {
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
	                    var rad = Math.atan2(cursor.y - base.y, cursor.x - base.x);
	                    var x = base.x + px_rad1 * Math.cos(rad);
	                    var y = base.y + px_rad1 * Math.sin(rad);
	                    tgt.translateTo(x, y);
	                    tgtline.translateTo(x, y);
	                    cross.translateTo(x, y);
	                }
	                obj._markerx = point._x + point._transformdx;
	                obj._markery = point._y + point._transformdy;
	            };

	            var tgtdrag = function tgtdrag() {
	                obj._ourJc.layer(obj.id).optns.drag.val = false;
	                this.optns.drag.val = true;
	            };

	            var tgtundrag = function tgtundrag() {
	                obj._ourJc.layer(obj.id).optns.drag.val = true;
	                this.optns.drag.val = false;
	            };

	            var resetfunc = function resetfunc() {
	                // 最初の位置に戻す
	                var base = range.position();
	                tgt.translateTo(base.x, base.y);
	                tgtline.translateTo(base.x, base.y);
	                cross.translateTo(base.x, base.y);
	                obj._markerx = point._x + point._transformdx;
	                obj._markery = point._y + point._transformdy;
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
	    }, {
	        key: 'applyZoom',
	        value: function applyZoom(scale, _x, _y) {
	            this._markerx = this._markerx * scale;
	            this._markery = this._markery * scale;
	            this._bbObj.BB_base.prototype.applyZoom.apply(this, arguments);
	            return this;
	        }
	    }]);

	    return BB_sonde;
	})(BB_base);

	var BB_ndsensor = (function (_BB_base8) {
	    _inherits(BB_ndsensor, _BB_base8);

	    function BB_ndsensor(_bbObj, _text, _radius, _color, _callback) {
	        var _this6 = this;

	        _classCallCheck(this, BB_ndsensor);

	        _get(Object.getPrototypeOf(BB_ndsensor.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(255, 0, 0)';
	        }
	        this.id = _uuid2['default'].v1();

	        this.type = "ndsensor";
	        this._text = _text;
	        this._radius = _radius;
	        this._color = _color;

	        //中央アイコンはファイル依存させないため手打ち。
	        this._image = new Image();
	        this._image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAABnRS' + 'TlMA/wAAAP+JwC+QAAAAeElEQVR42q2QbQrAIAiG9WBBO1l0sgUdzFWSE1urwfoh6fvw+oEEBN' + 'sPRxpbER8lKRV5Znkz1YYOwBRCEDnGaFIgT3gqP/K9X5pVvk8ybmmgxU126YLmnJ1zHK2qc3bV' + 'tOlg6XK4eq/2+L+mdfyJltFlnrctlxe8AGPpa/QtEubEAAAAAElFTkSuQmCC';

	        //描画して登録。初期座標はx方向に偵察半径+100、y方向に100ずらす
	        var obj = this;
	        this._image.onload = function () {
	            obj.draw();
	            var px_rad = _this6._bbObj.meter_to_pixel(obj._radius);
	            obj.move(100 + px_rad, 100);
	            obj.regist();
	            if (typeof _callback === "function") {
	                _callback.apply(obj);
	            }
	            delete _this6._image;
	        };
	    }

	    //
	    //BB_vsensorオブジェクト
	    //

	    _createClass(BB_ndsensor, [{
	        key: 'draw',
	        value: function draw() {
	            var _this7 = this;

	            var px_rad = this._bbObj.meter_to_pixel(this._radius),
	                obj = this,
	                above = 10,
	                below = 5,
	                img_width = this._image.width,
	                img_height = this._image.height,
	                img_rad = Math.sqrt(Math.pow(this._image.width, 2) + Math.pow(this._image.height, 2)) * 0.5;

	            var line = this._ourJc.line({
	                points: [[px_rad, 0], [-1 * px_rad, 0]],
	                color: this._color
	            }).opacity(1).lineStyle({
	                lineWidth: 3
	            }).layer(this.id),
	                pt1col = this._ourJc.circle(px_rad, 0, this._bbObj.ptcolsize, this._color, true).layer(this.id),
	                pt1 = this._ourJc.circle(px_rad, 0, this._bbObj.ptsize, "#FFFFFF", true).layer(this.id),
	                pt1tra = this._ourJc.circle(px_rad, 0, this._bbObj.pttrasize, "rgba(0,0,0,0)", true).layer(this.id),
	                pt2col = this._ourJc.circle(-1 * px_rad, 0, this._bbObj.ptcolsize, this._color, true).layer(this.id),
	                pt2 = this._ourJc.circle(-1 * px_rad, 0, this._bbObj.ptsize, "#FFFFFF", true).layer(this.id),
	                pt2tra = this._ourJc.circle(-1 * px_rad, 0, this._bbObj.pttrasize, "rgba(0,0,0,0)", true).layer(this.id),
	                center = this._ourJc.circle(0, 0, img_rad, this._color, true).layer(this.id),
	                centertra = this._ourJc.circle(0, 0, this._bbObj.pttrasize, "rgba(0,0,0,0)", true).layer(this.id);

	            this._ourJc.circle(0, 0, img_rad - 2, '#FFFFFF', true).layer(this.id);
	            this._ourJc.image(this._image, img_width * -0.5, img_height * -0.5, img_width, img_height).layer(this.id);
	            this._ourJc.text(this._text, 0, 0 + above + img_height).align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id);
	            this._ourJc.layer(this.id).draggable();

	            //移動処理(draggableでは回転できないため、独自定義)
	            var mdEvent = function mdEvent(point) {
	                var pos_base = center.position(),
	                    canvas = jc.canvas(_this7._bbObj.id),
	                    radius = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)),
	                    startrad = Math.atan2(point.y - pos_base.y, point.x - pos_base.x),
	                    baserad = _this7._ourJc.layer(obj.id).getAngle(),
	                    tmpmask = _this7._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)').layer("tmp_" + obj.id),
	                    layer = _this7._ourJc.layer(obj.id),
	                    tmpLayer = _this7._ourJc.layer("tmp_" + obj.id);
	                tmpLayer.level('top');
	                tmpmask.mousemove(function (pos) {
	                    var nowrad = Math.atan2(pos.y - pos_base.y, pos.x - pos_base.x),
	                        rad = baserad + (nowrad - startrad);
	                    layer.rotateTo(rad * 180 / Math.PI, 0, 0);
	                });
	                tmpmask.mouseup(function () {
	                    tmpLayer.del();
	                });
	            };

	            //端点は角度変更
	            pt1tra.mousedown(mdEvent);
	            pt1tra.mouseover(function () {
	                _this7._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
	            });
	            pt1tra.mouseout(function () {
	                _this7._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
	            });
	            pt2tra.mousedown(mdEvent);
	            pt2tra.mouseover(function () {
	                _this7._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
	            });
	            pt2tra.mouseout(function () {
	                _this7._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
	            });
	            return this;
	        }
	    }]);

	    return BB_ndsensor;
	})(BB_base);

	var BB_vsensor = (function (_BB_base9) {
	    _inherits(BB_vsensor, _BB_base9);

	    function BB_vsensor(_bbObj, _text, _radiusa, _radiusb, _color, _mode, _callback) {
	        _classCallCheck(this, BB_vsensor);

	        _get(Object.getPrototypeOf(BB_vsensor.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(153, 0, 255)';
	        }
	        if (_mode === undefined) {
	            _mode = 'A';
	        }
	        this.id = _uuid2['default'].v1();

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
	        if (typeof _callback === "function") {
	            _callback.apply(this);
	        };
	    }

	    //
	    //BB_howitzerオブジェクト
	    //

	    _createClass(BB_vsensor, [{
	        key: 'draw',
	        value: function draw() {
	            var px_rad,
	                modecolor,
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
	            this._ourJc.text(this._text, 0, 20).align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');

	            var moderect = this._ourJc.rect(-7, -25, 14, 17, modecolor, true).layer(this.id);
	            var modetext = this._ourJc.text(this._mode, 0, -12).align('center').layer(this.id).color('#000000').font('15px sans-serif');

	            var clickfunc = function clickfunc() {
	                obj.modechg.apply(obj);
	                return false;
	            };

	            moderect.click(clickfunc);
	            modetext.click(clickfunc);
	            area.dblclick(clickfunc);

	            this._ourJc.layer(this.id).draggable();
	            return this;
	        }
	    }, {
	        key: 'modechg',
	        value: function modechg() {
	            if (this._mode == 'A') {
	                this._mode = 'B';
	            } else {
	                this._mode = 'A';
	            }
	            this.redraw();
	            return false;
	        }
	    }]);

	    return BB_vsensor;
	})(BB_base);

	var BB_howitzer = (function (_BB_base10) {
	    _inherits(BB_howitzer, _BB_base10);

	    function BB_howitzer(_bbObj, _text, _radius1, _radius2, _radius3, _color, _callback) {
	        _classCallCheck(this, BB_howitzer);

	        _get(Object.getPrototypeOf(BB_howitzer.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = '#FFA500';
	        }
	        this.id = _uuid2['default'].v1();

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
	        if (typeof _callback === "function") {
	            _callback.apply(this);
	        }
	    }

	    //
	    //BB_bunkerオブジェクト
	    //

	    _createClass(BB_howitzer, [{
	        key: 'draw',
	        value: function draw() {
	            var px_rad1 = this._bbObj.meter_to_pixel(this._radius1),
	                px_rad2 = this._bbObj.meter_to_pixel(this._radius2),
	                px_rad3 = this._bbObj.meter_to_pixel(this._radius3) + px_rad2,
	                obj = this;

	            //射程範囲の表示
	            this._ourJc.circle(0, 0, px_rad1, this._color, false).opacity(1).layer(this.id);
	            var range = this._ourJc.circle(0, 0, px_rad1, this._color, true).opacity(0.2).layer(this.id);
	            this._ourJc.circle(0, 0, this._bbObj.ptsize, '#FFFFFF', true).layer(this.id);
	            this._ourJc.text(this._text, 0, -40).align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id);

	            //照準円の表示
	            var area = this._ourJc.circle(this._markerx, this._markery, px_rad3, this._color, false).opacity(1).layer(this.id),
	                tgtline = this._ourJc.circle(this._markerx, this._markery, px_rad2, this._color, false).opacity(1).layer(this.id),
	                tgt = this._ourJc.circle(this._markerx, this._markery, px_rad2, this._color, true).opacity(0.3).layer(this.id),
	                cross = this._ourJc.crosshair(this._markerx, this._markery).layer(this.id);
	            this._ourJc.layer(this.id).draggable();

	            var dragfunc = function dragfunc(cursor) {
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
	                    var rad = Math.atan2(cursor.y - base.y, cursor.x - base.x);
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

	            var tgtdrag = function tgtdrag() {
	                obj._ourJc.layer(obj.id).optns.drag.val = false;
	                this.optns.drag.val = true;
	            };

	            var tgtundrag = function tgtundrag() {
	                obj._ourJc.layer(obj.id).optns.drag.val = true;
	                this.optns.drag.val = false;
	            };

	            var resetfunc = function resetfunc() {
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
	    }, {
	        key: 'applyZoom',
	        value: function applyZoom(scale, _x, _y) {
	            this._markerx = this._markerx * scale;
	            this._markery = this._markery * scale;
	            this._bbObj.BB_base.prototype.applyZoom.apply(this, arguments);
	            return this;
	        }
	    }]);

	    return BB_howitzer;
	})(BB_base);

	var BB_bunker = (function (_BB_base11) {
	    _inherits(BB_bunker, _BB_base11);

	    function BB_bunker(_bbObj, _text, _color, _callback) {
	        _classCallCheck(this, BB_bunker);

	        _get(Object.getPrototypeOf(BB_bunker.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(255, 0, 165)';
	        }
	        this.id = _uuid2['default'].v1();

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
	        if (typeof _callback === "function") {
	            _callback.apply(this);
	        }
	    }

	    //
	    //BB_sentryオブジェクト
	    //

	    _createClass(BB_bunker, [{
	        key: 'draw',
	        value: function draw() {
	            var px_rad1 = this._bbObj.meter_to_pixel(this._rad1);
	            var px_rad2 = this._bbObj.meter_to_pixel(this._rad2);
	            this._ourJc.circle(0, 0, px_rad1, this._color, true).opacity(0.3).layer(this.id);
	            this._ourJc.circle(0, 0, px_rad1, this._color, false).opacity(1).layer(this.id);
	            this._ourJc.circle(0, 0, px_rad2, this._color, true).opacity(0.2).layer(this.id);
	            this._ourJc.circle(0, 0, px_rad2, this._color, false).opacity(1).layer(this.id);
	            this._ourJc.circle(0, 0, this._bbObj.ptsize, this._color, true).layer(this.id).color('#FFFFFF');
	            this._ourJc.text(this._text, 0, -10).align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');
	            this._ourJc.layer(this.id).draggable();
	            return this;
	        }
	    }]);

	    return BB_bunker;
	})(BB_base);

	var BB_sentry = (function (_BB_base12) {
	    _inherits(BB_sentry, _BB_base12);

	    function BB_sentry(_bbObj, _text, _color, _callback) {
	        var _this8 = this;

	        _classCallCheck(this, BB_sentry);

	        _get(Object.getPrototypeOf(BB_sentry.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(255, 0, 0)';
	        }
	        this.id = _uuid2['default'].v1();

	        this.type = "sentry";
	        this._text = _text;
	        this._radius = 80; //固定値
	        this._angle = 120; //固定値
	        this._color = _color;
	        //描画して登録。初期座標は偵察半径分ずらす
	        //マークはファイル依存させないため手打ち。
	        this._image = new Image();
	        this._image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAABnR' + 'STlMA/wD/AP83WBt9AAAAYUlEQVR42pWRUQ7AIAhD13txN7gbB2PLWMxUROSrJq8NVJjZVR4M' + 'NAAXYUpHP2h7/nVHt7xk3PkFrAyq6oKIgk1cMLOIZHtv0biTM7ra4NaAOOM1ZPRc4ln2bFv+T' + 'vXKZG6yP1bjQ2hwBAAAAABJRU5ErkJggg==';
	        var obj = this;
	        this._image.onload = function () {
	            obj.draw();
	            var px_rad = _this8._bbObj.meter_to_pixel(obj._radius);
	            obj.move(px_rad, px_rad);
	            obj.regist();
	            if (typeof _callback === "function") {
	                _callback.apply(obj);
	            }
	            delete _this8._image;
	        };
	    }

	    //
	    //BB_aerosentryオブジェクト
	    //

	    _createClass(BB_sentry, [{
	        key: 'draw',
	        value: function draw() {
	            var _this9 = this;

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
	            this._ourJc.image(this._image, img_width * -0.5, img_height * -0.5, img_width, img_height).layer(this.id);
	            var text = this._ourJc.text(this._text, 50, 0).align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');
	            this._ourJc.layer(this.id).draggable();

	            //移動処理(draggableでは回転できないため、独自定義)
	            var mdEvent = function mdEvent(point) {
	                var pos_base = area.position(),
	                    canvas = jc.canvas(_this9._bbObj.id),
	                    radius = Math.sqrt(Math.pow(point.x - pos_base.x, 2) + Math.pow(point.y - pos_base.y, 2)),
	                    startrad = Math.atan2(point.y - pos_base.y, point.x - pos_base.x),
	                    baserad = _this9._ourJc.layer(obj.id).getAngle(),
	                    tmpmask = _this9._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)').layer("tmp_" + obj.id),
	                    layer = _this9._ourJc.layer(obj.id),
	                    tmpLayer = _this9._ourJc.layer("tmp_" + obj.id);
	                tmpLayer.level('top');
	                tmpmask.mousemove(function (pos) {
	                    var nowrad = Math.atan2(pos.y - pos_base.y, pos.x - pos_base.x),
	                        rad = baserad + (nowrad - startrad);
	                    layer.rotateTo(rad * 180 / Math.PI, 0, 0);
	                });
	                tmpmask.mouseup(function () {
	                    tmpLayer.del();
	                });
	            };

	            //扇形部分は角度変更
	            area.mousedown(mdEvent);
	            area.mouseover(function () {
	                _this9._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
	            });
	            area.mouseout(function () {
	                _this9._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
	            });
	            //文字列部分も角度変更
	            text.mousedown(mdEvent);
	            text.mouseover(function () {
	                _this9._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
	            });
	            text.mouseout(function () {
	                _this9._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
	            });

	            return this;
	        }
	    }]);

	    return BB_sentry;
	})(BB_base);

	var BB_aerosentry = (function (_BB_base13) {
	    _inherits(BB_aerosentry, _BB_base13);

	    function BB_aerosentry(_bbObj, _text, _color, _callback) {
	        var _this10 = this;

	        _classCallCheck(this, BB_aerosentry);

	        _get(Object.getPrototypeOf(BB_aerosentry.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(255, 0, 0)';
	        }
	        this.id = _uuid2['default'].v1();

	        this.type = "aerosentry";
	        this._text = _text;
	        this._radius = 40; //固定値
	        this._color = _color;
	        //描画して登録。初期座標は偵察半径分ずらす
	        //マークはファイル依存させないため手打ち。
	        this._image = new Image();
	        this._image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAIAAAC0tAIdAAAAAXN' + 'SR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABsSURBVChT' + 'nYxBEoAwDAL7/09HWkgkNid3xnED6IqIdYAU98mEIjtVRnZ62FIKqbOkf9fPocJD3ijxkHzXI' + '1r4GqjsqDu0A2iSKE3+/lvlhBb3ugR4SFoN/JwrvGgUMPqeEk/B7XvkdqoZDSIeqpRXt5iMa4' + 'kAAAAASUVORK5CYII=';
	        var obj = this;
	        this._image.onload = function () {
	            obj.draw();
	            var px_rad = _this10._bbObj.meter_to_pixel(obj._radius);
	            obj.move(px_rad, px_rad);
	            obj.regist();
	            if (typeof _callback === "function") {
	                _callback.apply(obj);
	            }
	            delete _this10._image;
	        };
	    }

	    //
	    //BB_bomberオブジェクト
	    //

	    _createClass(BB_aerosentry, [{
	        key: 'draw',
	        value: function draw() {
	            var px_rad = this._bbObj.meter_to_pixel(this._radius),
	                obj = this,
	                img_width = this._image.width,
	                img_height = this._image.height,
	                img_rad = Math.sqrt(Math.pow(this._image.width, 2) + Math.pow(this._image.height, 2)) * 0.5;

	            this._ourJc.circle(0, 0, px_rad, this._color, false).opacity(1).layer(this.id);
	            var area = this._ourJc.circle(0, 0, px_rad, this._color, true).opacity(0.3).layer(this.id);
	            this._ourJc.circle(0, 0, img_rad, this._color, true).opacity(0.9).layer(this.id);
	            this._ourJc.circle(0, 0, img_rad - 2, '#ffffff', true).layer(this.id);
	            this._ourJc.image(this._image, img_width * -0.5, img_height * -0.5, img_width, img_height).layer(this.id);

	            this._ourJc.text(this._text, 0, -10).align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');
	            this._ourJc.layer(this.id).draggable();

	            return this;
	        }
	    }]);

	    return BB_aerosentry;
	})(BB_base);

	var BB_bomber = (function (_BB_base14) {
	    _inherits(BB_bomber, _BB_base14);

	    function BB_bomber(_bbObj, _text, _color, _callback) {
	        _classCallCheck(this, BB_bomber);

	        _get(Object.getPrototypeOf(BB_bomber.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(255, 0, 165)';
	        }
	        this.id = _uuid2['default'].v1();

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
	        if (typeof _callback === "function") {
	            _callback.apply(this);
	        }
	    }

	    //
	    //BB_bascoutオブジェクト
	    //

	    _createClass(BB_bomber, [{
	        key: 'draw',
	        value: function draw() {
	            var _this11 = this;

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
	                this._ourJc.circle(point_ch[i], 0, px_rad1, this._color, false).opacity(1).layer(this.id), this._ourJc.circle(point_ch[i], 0, px_rad2, this._color, true).opacity(0.3).layer(this.id);
	            }

	            //クロスヘア表示
	            var angle = this._ourJc.layer(this.id).getAngle() * -180 / Math.PI;
	            for (i = 0; i < this._center.length; ++i) {
	                crosshair.push(this._ourJc.crosshair(point_ch[i], 0).layer(this.id).rotateTo(angle, point_ch[i], 0));
	            }

	            this._ourJc.text(this._text, 0, -10).align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');
	            this._ourJc.layer(this.id).draggable();

	            //角度変更処理
	            var mask = this._ourJc.scout_mask(0, 0, px_rad1, px_len).layer(this.id),
	                obj = this;
	            mask.mousedown(function (point) {
	                var canvas = jc.canvas(_this11._bbObj.id),
	                    tmpmask = _this11._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)').layer("tmp_" + obj.id),
	                    layer = _this11._ourJc.layer(obj.id),
	                    tmpLayer = _this11._ourJc.layer("tmp_" + obj.id);
	                tmpLayer.level('top');
	                var pos_self = self.position();
	                var startrad = Math.atan2(point.y - pos_self.y, point.x - pos_self.x),
	                    baserad = layer.getAngle();
	                tmpmask.mousemove(function (pos) {
	                    var nowrad = Math.atan2(pos.y - pos_self.y, pos.x - pos_self.x);
	                    var rad = baserad + (nowrad - startrad);
	                    layer.rotateTo(rad * 180 / Math.PI, 0, 0);
	                    for (var i = 0; i < crosshair.length; ++i) {
	                        crosshair[i].rotateTo(rad * -180 / Math.PI, point_ch[i], 0);
	                    }
	                });
	                tmpmask.mouseup(function (point) {
	                    _this11._ourJc.layer("tmp_" + obj.id).del();
	                });
	            });

	            mask.mouseover(function () {
	                _this11._ourJc.layer(obj.id).optns.drag.val = false; // ドラッグ無効
	            });
	            mask.mouseout(function () {
	                _this11._ourJc.layer(obj.id).optns.drag.val = true; // ドラッグ有効
	            });

	            return this;
	        }
	    }]);

	    return BB_bomber;
	})(BB_base);

	var BB_bascout = (function (_BB_base15) {
	    _inherits(BB_bascout, _BB_base15);

	    function BB_bascout(_bbObj, _text, _color, _callback) {
	        _classCallCheck(this, BB_bascout);

	        _get(Object.getPrototypeOf(BB_bascout.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(255, 0, 165)';
	        }
	        this.id = _uuid2['default'].v1();

	        this.type = "bascout";
	        this._text = _text;
	        this._color = _color;
	        this._visible = true;
	        //描画して登録。初期座標はとりあえず100づつずらしておく
	        this.draw();
	        var px_rad = this._bbObj.meter_to_pixel(100);
	        this.move(px_rad, px_rad);
	        this.regist();
	        if (typeof _callback === "function") {
	            _callback.apply(this);
	        }
	    }

	    _createClass(BB_bascout, [{
	        key: 'draw',
	        value: function draw() {
	            var _this12 = this;

	            var px_wid = this._bbObj.meter_to_pixel(500),
	                px_len = this._bbObj.meter_to_pixel(1200),
	                px_back = this._bbObj.meter_to_pixel(300),
	                obj = this;

	            var area = this._ourJc.rect(-1 * px_wid, -1 * px_back, 2 * px_wid, px_len, this._color, true).opacity(0.2).layer(this.id).visible(this._visible),
	                areaf = this._ourJc.rect(-1 * px_wid, -1 * px_back, 2 * px_wid, px_len, this._color, false).opacity(1).layer(this.id).visible(this._visible),
	                bar = this._ourJc.line([[0, 7], [0, 25]], this._color).lineStyle({
	                lineWidth: 2
	            }).layer(this.id),
	                arrow = this._ourJc.line([[5, 15], [0, 25], [-5, 15]], this._color, true).layer(this.id),

	            // center  = this._ourJc.circle(0, 0, this._bbObj.ptcolsize, this._color, true).layer(this.id),
	            centerf = this._ourJc.circle(0, 0, this._bbObj.ptsize, '#FFFFFF', true).layer(this.id);
	            this._ourJc.circle(0, 0, this._bbObj.pttrasize, 'rgba(0,0,0,0)', true).layer(this.id);

	            this._ourJc.text(this._text, 0, -10).align('center').color('#FFFFFF').font('15px sans-serif').layer(this.id);
	            this._ourJc.layer(this.id).draggable();

	            //角度変更処理
	            var mdEvent = function mdEvent(point) {
	                //if (this._ourJc.layer(obj.id).optns.drag.val==true){return false;}
	                var canvas = jc.canvas(_this12._bbObj.id),
	                    tmpmask = _this12._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)').layer("tmp_" + obj.id),
	                    layer = _this12._ourJc.layer(obj.id),
	                    tmpLayer = _this12._ourJc.layer("tmp_" + obj.id);
	                tmpLayer.level('top');
	                var pos_self = centerf.position();
	                var startrad = Math.atan2(point.y - pos_self.y, point.x - pos_self.x),
	                    baserad = layer.getAngle();
	                tmpmask.mousemove(function (pos) {
	                    var nowrad = Math.atan2(pos.y - pos_self.y, pos.x - pos_self.x);
	                    var rad = baserad + (nowrad - startrad);
	                    layer.rotateTo(rad * 180 / Math.PI, 0, 0);
	                });
	                tmpmask.mouseup(function (point) {
	                    tmpLayer.del();
	                });
	                return true;
	            };
	            areaf.mousedown(mdEvent);
	            bar.mousedown(mdEvent);
	            arrow.mousedown(mdEvent);

	            //  ドラッグ無効
	            var drugoff = function drugoff() {
	                _this12._ourJc.layer(obj.id).optns.drag.val = false;
	            };
	            areaf.mouseover(drugoff);
	            arrow.mouseover(drugoff);
	            bar.mouseover(drugoff);

	            //  ドラッグ有効
	            var drugon = function drugon() {
	                _this12._ourJc.layer(obj.id).optns.drag.val = true;
	            };
	            areaf.mouseout(drugon);
	            arrow.mouseout(drugon);
	            bar.mouseout(drugon);

	            centerf.dblclick(function () {
	                obj._visible = !obj._visible;
	                area.visible(obj._visible);
	                areaf.visible(obj._visible);
	            });

	            return this;
	        }
	    }]);

	    return BB_bascout;
	})(BB_base);

	var BB_icon = (function (_BB_base16) {
	    _inherits(BB_icon, _BB_base16);

	    function BB_icon(_bbObj, _text, _file, _color, _callback) {
	        var _this13 = this;

	        _classCallCheck(this, BB_icon);

	        _get(Object.getPrototypeOf(BB_icon.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(0, 255, 255)';
	        }
	        this.id = _uuid2['default'].v1();

	        if ((_file = sanitize_filepath(_file)) == null) {
	            return null;
	        }

	        this.type = "icon";
	        this._text = _text;
	        this._file = _file;
	        this._color = _color;

	        //描画して登録。初期座標は半径分ずらす
	        this._image = new Image();
	        this._image.src = _file + '?' + salt;
	        var obj = this;
	        this._image.onload = function () {
	            var px_dia = Math.sqrt(Math.pow(obj._image.width, 2) + Math.pow(obj._image.height, 2));
	            obj.draw();
	            obj.move(px_dia, px_dia);
	            obj.regist();
	            if (typeof _callback === "function") {
	                _callback.apply(obj);
	            }
	            delete _this13._image;
	        };
	    }

	    //
	    //BB_waftオブジェクト
	    //

	    _createClass(BB_icon, [{
	        key: 'draw',
	        value: function draw() {
	            var img_width = this._image.width,
	                img_height = this._image.height,
	                px_rad = Math.sqrt(Math.pow(this._image.width, 2) + Math.pow(this._image.height, 2)) * 0.5;
	            this._ourJc.circle(0, 0, px_rad, this._color, true).opacity(0.9).layer(this.id);
	            this._ourJc.circle(0, 0, px_rad - 2, '#FFFFFF', true).layer(this.id);
	            this._ourJc.circle(0, 0, this._bbObj.pttrasize, 'rgba(0,0,0,0)', true).layer(this.id);
	            this._ourJc.image(this._image, img_width * -0.5, img_height * -0.5, img_width, img_height).layer(this.id);
	            this._ourJc.text(this._text, img_width * 0.5 + 5, 0).layer(this.id).color('#FFFFFF').font('15px sans-serif').align('left').baseline('middle');
	            this._ourJc.layer(this.id).draggable();

	            return this;
	        }
	    }]);

	    return BB_icon;
	})(BB_base);

	var BB_waft = (function (_BB_base17) {
	    _inherits(BB_waft, _BB_base17);

	    function BB_waft(_bbObj, _text, _file, _color, _callback) {
	        var _this14 = this;

	        _classCallCheck(this, BB_waft);

	        _get(Object.getPrototypeOf(BB_waft.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(0, 255, 255)';
	        }
	        this.id = _uuid2['default'].v1();

	        if ((_file = sanitize_filepath(_file)) == null) {
	            return null;
	        }

	        this.type = "waft";
	        this._text = _text;
	        this._file = _file;
	        this._rad = 20; //大ざっぱに全長40m程度?
	        this._color = _color;

	        //描画して登録。初期座標は半径分ずらす
	        this._image = new Image();
	        this._image.src = _file + '?' + salt;
	        var obj = this,
	            px_rad = this._bbObj.meter_to_pixel(this._rad);
	        this._image.onload = function () {
	            obj.draw();
	            obj.move(px_rad, px_rad);
	            obj.regist();
	            if (typeof _callback === "function") {
	                _callback.apply(obj);
	            }
	            delete _this14._image;
	        };
	    }

	    //
	    //BB_freehandオブジェクト
	    //

	    _createClass(BB_waft, [{
	        key: 'draw',
	        value: function draw() {
	            var _this15 = this;

	            var px_rad = this._bbObj.meter_to_pixel(this._rad),
	                img_width = this._image.width,
	                img_height = this._image.height,
	                img_rate = px_rad * 2 / (img_width >= img_height ? img_width : img_height);

	            img_width = img_width * img_rate;
	            img_height = img_height * img_rate;

	            var handle = this._ourJc.circle(0, 0, px_rad + 10 * this._bbObj.zoomScale, this._color, true).opacity(0.3).layer(this.id);
	            this._ourJc.circle(0, 0, px_rad, this._color, true).opacity(1).layer(this.id);
	            this._ourJc.image(this._image, img_width * -0.5, img_height * -0.5, img_width, img_height).layer(this.id);
	            this._ourJc.text(this._text, 0, -25).align('center').layer(this.id).color('#FFFFFF').font('15px sans-serif');

	            this._ourJc.layer(this.id).draggable();

	            //角度変更処理
	            var obj = this,
	                layer = jc.layer(this.id),
	                canvas = jc.canvas(this._bbObj.id);

	            handle.mousedown(function (point) {
	                var pos_hdl = handle.position();
	                // マウスイベントフック用の四角形を最前面に展開
	                var tmpmask = _this15._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)').layer("tmp_" + obj.id);
	                jc.layer("tmp_" + obj.id).level('top');

	                var startrad = Math.atan2(point.y - pos_hdl.y, point.x - pos_hdl.x),
	                    baserad = layer.getAngle();
	                tmpmask.mousemove(function (pos) {
	                    var nowrad = Math.atan2(pos.y - pos_hdl.y, pos.x - pos_hdl.x);
	                    var rad = baserad + (nowrad - startrad);
	                    layer.rotateTo(rad * 180 / Math.PI, 0, 0);
	                });
	                tmpmask.mouseup(function (point) {
	                    _this15._ourJc.layer("tmp_" + obj.id).del();
	                });
	            });

	            handle.mouseover(function () {
	                layer.optns.drag.val = false; // ドラッグ無効
	            });
	            handle.mouseout(function () {
	                layer.optns.drag.val = true; // ドラッグ有効
	            });

	            return this;
	        }
	    }]);

	    return BB_waft;
	})(BB_base);

	var BB_freehand = (function (_BB_base18) {
	    _inherits(BB_freehand, _BB_base18);

	    function BB_freehand(_bbObj, _text, _color) {
	        _classCallCheck(this, BB_freehand);

	        _get(Object.getPrototypeOf(BB_freehand.prototype), 'constructor', this).call(this, _bbObj);
	        if (_color === undefined) {
	            _color = 'rgb(255, 255, 255)';
	        }
	        this.id = _uuid2['default'].v1();
	        this.type = "freehand";
	        this._text = _text;
	        this._color = _color;
	        this._step = 0;
	        this._stepcol = new Array();
	        this._undoCache = new Array();
	        this._hooker = undefined;

	        //layerを確保するためのダミー画像を設置するのみ
	        this._ourJc.rect(0, 0, 1, 1, 'rgba(0, 0, 0, 0)').layer(this.id);
	        this.regist();
	    }

	    //
	    // BBオブジェクト定義
	    //

	    _createClass(BB_freehand, [{
	        key: 'color',
	        value: function color(_color) {
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

	    }, {
	        key: 'redraw',
	        value: function redraw() {
	            for (var i = 1; i <= this._step; i++) {
	                var points = jc("#" + i, {
	                    canvas: this._bbObj.id,
	                    layer: this.id
	                }).points();
	                jc("#" + i, {
	                    canvas: this._bbObj.id,
	                    layer: this.id
	                }).del();
	                this._ourJc.line(points, this._stepcol[i]).layer(this.id).id(i).lineStyle({
	                    lineWidth: 3
	                });
	            }
	        }
	    }, {
	        key: 'applyZoom',
	        value: function applyZoom(scale, _x, _y) {
	            var posx = jc.layer(this.id)._transformdx,
	                posy = jc.layer(this.id)._transformdy;
	            jc.layer(this.id).translate(posx * scale - posx - _x * scale, posy * scale - posy - _y * scale);

	            for (var i = 1; i <= this._step; i++) {
	                var points = jc("#" + i, {
	                    canvas: this._bbObj.id,
	                    layer: this.id
	                }).points();
	                for (var j = 0; j < points.length; j++) {
	                    points[j] = [points[j][0] * scale, points[j][1] * scale];
	                }
	                jc("#" + i, {
	                    canvas: this._bbObj.id,
	                    layer: this.id
	                }).del();
	                this._ourJc.line(points, this._stepcol[i]).layer(this.id).id(i).lineStyle({
	                    lineWidth: 3
	                });
	            }
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            var _this16 = this;

	            var obj = this,

	            // layer  = this._ourJc.layer(this.id),
	            canvas = jc.canvas(this._bbObj.id);

	            if (this._hooker !== undefined) return this;

	            // 描画開始時にundoキャッシュをクリア
	            this._undoCache.length = 0;

	            // マウスイベントフック用の四角形を最前面に展開
	            this._hooker = _uuid2['default'].v1();
	            var hooker = this._ourJc.rect(0, 0, canvas.width(), canvas.height(), 'rgba(0, 0, 0, 0)').layer(this._hooker).level('top');

	            hooker.click(function () {
	                return false;
	            });
	            hooker.dblclick(function () {
	                return false;
	            });
	            hooker.mousemove(function () {
	                return false;
	            });
	            hooker.mousedown(function (ptstart) {
	                //追記したのでundoキャッシュをクリアする
	                obj._undoCache.length = 0;

	                obj._step++;
	                obj._stepcol[obj._step] = obj._color;
	                var line = _this16._ourJc.line([[ptstart.x, ptstart.y], [ptstart.x, ptstart.y]], obj._color).layer(obj.id).id(obj._step).lineStyle({
	                    lineWidth: 3
	                });
	                hooker.mousemove(function (point) {
	                    line.addPoint(point.x, point.y);
	                    return false;
	                });
	                return false;
	            });

	            hooker.mouseup(function () {
	                hooker.mousemove(function () {});
	                return false;
	            });

	            return this;
	        }
	    }, {
	        key: 'undo',
	        value: function undo() {
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
	    }, {
	        key: 'redo',
	        value: function redo() {
	            // 描画処理中でなければそのまま抜ける
	            if (this._hooker === undefined) return this;

	            // undoキャッシュにデータがなければそのまま抜ける
	            if (this._undoCache.length == 0) return this;

	            var cache = this._undoCache.pop();
	            this._step++;
	            this._stepcol[this._step] = cache.color;
	            this._ourJc.line(cache.points, cache.color).layer(this.id).id(this._step).lineStyle({
	                lineWidth: 3
	            });

	            return this;
	        }
	    }, {
	        key: 'end',
	        value: function end() {
	            // イベントフック用の四角形を消す
	            jc.layer(this._hooker).del();
	            this._hooker = undefined;

	            // undoキャッシュをクリア
	            this._undoCache.length = 0;

	            return this;
	        }
	    }]);

	    return BB_freehand;
	})(BB_base);

	var BB = (function () {
	    function BB(canvasID) {
	        _classCallCheck(this, BB);

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
	        this.pttrasize = window.TouchEvent ? 15 : 7; //操作点そのもののサイズ
	    }

	    //
	    // touchイベントからmouseイベントへのブリッジを設定
	    //

	    _createClass(BB, [{
	        key: 'initTouchToMouse',
	        value: function initTouchToMouse(canvas) {
	            var clickthr = 5; // クリックとみなす範囲の閾値

	            var mouseoverflag = false,
	                touchflag = false,
	                startX = 0,
	                startY = 0,
	                clkflag;
	            var bbobj = this;

	            function dispatchMouseEvent(type, touch) {
	                var event = document.createEvent("MouseEvent");
	                event.initMouseEvent(type, true, true, window, type == 'dblclick' ? 2 : 1, touch.screenX, touch.screenY, touch.clientX + window.pageXOffset + document.documentElement.getBoundingClientRect().left, touch.clientY + window.pageYOffset + document.documentElement.getBoundingClientRect().top, false, false, false, false, 0, null);
	                touch.target.dispatchEvent(event);
	            }

	            function pointInObj(touch) {
	                var cnvrect = document.getElementById(bbobj.id).getBoundingClientRect(),
	                    x = touch.clientX - cnvrect.left,
	                    y = touch.clientY - cnvrect.top,
	                    result = false;

	                for (var objid in bbobj.member) {
	                    if (bbobj.object(objid).type != "freehand") {
	                        result = jc.layer(objid).isPointIn(x, y);
	                    } else {
	                        //freehandオブジェクトは書き込み中であればオブジェクトありとみなす
	                        result = bbobj.object(objid)._hooker !== undefined;
	                    }
	                    if (result) {
	                        break;
	                    }
	                }

	                ////ターレットと索敵施設は個別のオブジェクトとして扱われていないため
	                //nameを利用したグループで別途チェックを行う
	                if (!result) {
	                    var targets = Array.prototype.concat(jc(".turrets").elements, jc(".searchers").elements);

	                    for (var i = 0; i < targets.length; i++) {
	                        result = targets[i].isPointIn(x, y);
	                        if (result) {
	                            break;
	                        }
	                    }
	                }

	                return result;
	            }

	            canvas.addEventListener('touchstart', function (e) {
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

	                clkflag = setTimeout(function () {
	                    clkflag = 0;
	                }, 300);
	                dispatchMouseEvent('mousemove', touch);
	                jc.canvas(BB.id).frame();
	                dispatchMouseEvent('mousedown', touch);
	                return false;
	            }, false);

	            canvas.addEventListener('touchmove', function (e) {
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

	            canvas.addEventListener('touchend', function (e) {
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
	                    dispatchMouseEvent('click', touch);
	                }
	                mouseoverflag = false;
	            }, false);
	        }

	        //
	        //jCanvaScriptへの関数、オブジェクト追加
	        //
	    }, {
	        key: 'initExtendJCanvaScript',
	        value: function initExtendJCanvaScript(jc) {
	            //回転処理用に関数一個追加
	            jc.addFunction('rotateTo', function (angle, x1, y1, duration, easing, onstep, fn) {
	                this.optns.rotateMatrix = [[1, 0, 0], [0, 1, 0]];
	                return this.rotate.apply(this, arguments);
	            });

	            //現在の角度を求める関数を追加
	            jc.addFunction('getAngle', function () {
	                var matrix = this.optns.rotateMatrix;
	                return matrix[1][0] > 0 ? Math.acos(matrix[0][0]) : -1 * Math.acos(matrix[0][0]);
	            });

	            //CanvaSciprtに背景合成用のオブジェクト追加
	            jc.addObject('imgdiff', {
	                image: new Image(),
	                x: 0,
	                y: 0,
	                width: false,
	                height: false,
	                sx: 0,
	                sy: 0,
	                swidth: false,
	                sheight: false
	            }, function (ctx) {
	                var _this17 = this;

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
	                ctx.drawImage(this._image, this._sx, this._sy, this._swidth, this._sheight, this._x, this._y, this._width, this._height);
	                ctx.globalCompositeOperation = opmode;
	                this.getRect = function (type) {
	                    return {
	                        x: _this17._x,
	                        y: _this17._y,
	                        width: _this17._width,
	                        height: _this17._height
	                    };
	                };
	            });

	            //CanvaSciprtに偵察機用オブジェクト追加
	            jc.addObject('scout', {
	                x: 0,
	                y: 0,
	                radius: 0,
	                length: 0,
	                color: 'rgb(255, 0, 0)',
	                fill: false
	            }, function (ctx) {
	                var _this18 = this;

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
	                this.getRect = function () {
	                    return {
	                        x: _this18._x,
	                        y: _this18._y,
	                        width: _this18._length + _this18._radius * 2,
	                        height: _this18._radius * 2
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
	            }, function (ctx) {
	                var _this19 = this;

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
	                this.getRect = function () {
	                    return {
	                        x: _this19._x,
	                        y: _this19._y,
	                        width: _this19._length + _this19._radius,
	                        height: _this19._radius * 2
	                    };
	                };
	            });

	            //CanvaSciprtに扇形オブジェクト追加
	            jc.addObject('sector', {
	                x: 0,
	                y: 0,
	                radius: 0,
	                angle: 0,
	                color: 'rgb(255, 0, 0)',
	                fill: false
	            }, function (ctx) {
	                var _this20 = this;

	                var x = this._x,
	                    y = this._y,
	                    radius = this._radius,
	                    angle = this._angle;
	                var radian = angle * Math.PI / 180;

	                ctx.moveTo(x, y);
	                ctx.arc(x, y, radius, radian / 2, radian / -2, true);
	                ctx.closePath();
	                this.getRect = function () {
	                    return {
	                        x: _this20._x,
	                        y: _this20._y,
	                        width: _this20._radius,
	                        height: 2 * Math.sin(_this20._angle * Math.PI / 360)
	                    };
	                };
	            });

	            //CanvaSciprtに榴弾用クロスヘア追加
	            jc.addObject('crosshair', {
	                x: 0,
	                y: 0,
	                color: 'rgb(255, 255, 255)'
	            }, function (ctx) {
	                var _this21 = this;

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
	                this.getRect = function () {
	                    return {
	                        x: _this21._x - offset,
	                        y: _this21._y - offset,
	                        width: offset * 2,
	                        height: offset * 2
	                    };
	                };
	            });
	        }

	        //
	        //縮尺計算
	        //
	    }, {
	        key: 'meter_to_pixel',
	        value: function meter_to_pixel(meter) {
	            return meter * (this.scale * this.zoomScale);
	        }
	    }, {
	        key: 'pixel_to_meter',
	        value: function pixel_to_meter(pixel) {
	            return pixel / (this.scale * this.zoomScale);
	        }

	        //
	        //背景
	        //(画像ファイル, Dot per Meter, 画像縮小比率)
	        //
	    }, {
	        key: 'setbg',
	        value: function setbg(file, dpm, imgscale, callback) {
	            var image = new Image(),
	                ourJc = this.ourJc,
	                id = this.id;
	            if (imgscale === undefined) {
	                imgscale = 1;
	            }

	            if ((file = sanitize_filepath(file)) == null) {
	                return null;
	            }

	            image.src = file + '?' + salt;
	            image.onload = function () {
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
	    }, {
	        key: 'setbgdiff',
	        value: function setbgdiff(file) {
	            var image = new Image();
	            var ourJc = this.ourJc;
	            var id = this.id;
	            var imgscale = this.imgscale;

	            if (file) {
	                //ファイル指定があれば差分を出力し、即時再描画
	                image.src = file + '?' + salt;
	                image.onload = function () {
	                    ourJc("#bgdiff").del();
	                    ourJc.imgdiff(image, 0, 0, image.width * imgscale, image.height * imgscale).level(0).id("bgdiff");
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
	    }, {
	        key: 'object',
	        value: function object(objid) {
	            return this.member[objid];
	        }
	    }, {
	        key: 'nextlevel',
	        value: function nextlevel(level) {
	            var nextlevel = undefined,
	                nextid = undefined;
	            for (var id in this.member) {
	                if (nextlevel === undefined && this.ourJc.layer(id).level() > level) {
	                    nextlevel = this.ourJc.layer(id).level();
	                    nextid = id;
	                } else if (this.ourJc.layer(id).level() > level && this.ourJc.layer(id).level() < nextlevel) {
	                    nextlevel = this.ourJc.layer(id).level();
	                    nextid = id;
	                }
	            }
	            return {
	                id: nextid,
	                level: nextlevel
	            };
	        }
	    }, {
	        key: 'prevlevel',
	        value: function prevlevel(level) {
	            var prevlevel = undefined,
	                previd = undefined;
	            for (var id in this.member) {
	                if (prevlevel === undefined && this.ourJc.layer(id).level() < level) {
	                    prevlevel = this.ourJc.layer(id).level();
	                    previd = id;
	                } else if (this.ourJc.layer(id).level() < level && this.ourJc.layer(id).level() > prevlevel) {
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
	    }, {
	        key: 'save',
	        value: function save() {
	            return jc.canvas(this.id).toDataURL('image/png');
	        }

	        //

	        //ターレット配置
	        //
	    }, {
	        key: 'put_turret',
	        value: function put_turret(x, y, rot, radius, angle, hookrad, color, test) {
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
	                area = this.ourJc.sector(x, y, px_rad, angle, color, true).rotateTo(rot - 90, x, y).opacity(0.3).visible(visible).level(1),
	                line = this.ourJc.sector(x, y, px_rad, angle, this.color, false).level(1).rotateTo(rot - 90, x, y).opacity(1).visible(visible),
	                hooker = this.ourJc.circle(x, y, hookrad, 'rgba(0,0,0,0)', true).rotateTo(rot - 90, x, y).level(3).name("turrets");

	            if (test) {
	                this.ourJc.line([[x, y], [x, y - 20]], 'rgba(255,255,255,1)').rotateTo(rot, x, y).lineStyle({
	                    lineWidth: 2
	                });
	                hooker.color('rgba(255,255,255,1)').level('top');
	            }

	            hooker.mouseover(function () {
	                area.visible(true);
	                line.visible(true);
	            });
	            hooker.mouseout(function () {
	                area.visible(visible);
	                line.visible(visible);
	            });
	            hooker.click(function () {
	                visible = !visible;
	                area.visible(visible);
	                line.visible(visible);
	            });
	        }

	        //
	        //索敵装置配置
	        //
	    }, {
	        key: 'put_searcher',
	        value: function put_searcher(x, y, radius, hookrad, color, test) {
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
	                area = this.ourJc.circle(x, y, px_rad, color, true).opacity(0.3).visible(visible).level(1),
	                line = this.ourJc.circle(x, y, px_rad, color, false).opacity(1).visible(visible).level(1),
	                hooker = this.ourJc.circle(x, y, hookrad, 'rgba(0,0,0,0)', true).level(3).name("searchers");

	            if (test) {
	                hooker.color('rgba(255,255,255,1)').level('top');
	            }

	            hooker.mouseover(function () {
	                area.visible(true);
	                line.visible(true);
	            });
	            hooker.mouseout(function () {
	                area.visible(visible);
	                line.visible(visible);
	            });
	            hooker.click(function () {
	                visible = !visible;
	                area.visible(visible);
	                line.visible(visible);
	            });
	        }
	    }, {
	        key: 'add_scout',

	        //
	        //オブジェクト描画
	        //
	        value: function add_scout(string, radius, length, duration, color, _callback) {
	            return new BB_scout(this, string, radius, length, duration, color, _callback);
	        }
	    }, {
	        key: 'add_sensor',
	        value: function add_sensor(string, radius, color, _callback) {
	            return new BB_sensor(this, string, radius, color, _callback);
	        }
	    }, {
	        key: 'add_radar',
	        value: function add_radar(string, radius, angle, color, _callback) {
	            return new BB_radar(this, string, radius, angle, color, _callback);
	        }
	    }, {
	        key: 'add_sonde',
	        value: function add_sonde(string, radius1, radius2, color, _callback) {
	            return new BB_sonde(this, string, radius1, radius2, color, _callback);
	        }
	    }, {
	        key: 'add_ndsensor',
	        value: function add_ndsensor(string, radius, color, _callback) {
	            return new BB_ndsensor(this, string, radius, color, _callback);
	        }
	    }, {
	        key: 'add_vsensor',
	        value: function add_vsensor(string, radiusa, radiusb, color, mode, _callback) {
	            return new BB_vsensor(this, string, radiusa, radiusb, color, mode, _callback);
	        }
	    }, {
	        key: 'add_howitzer',
	        value: function add_howitzer(string, radius1, radius2, radius3, color, _callback) {
	            return new BB_howitzer(this, string, radius1, radius2, radius3, color, _callback);
	        }
	    }, {
	        key: 'add_bunker',
	        value: function add_bunker(string, color, _callback) {
	            return new BB_bunker(this, string, color, _callback);
	        }
	    }, {
	        key: 'add_sentry',
	        value: function add_sentry(string, color, _callback) {
	            return new BB_sentry(this, string, color, _callback);
	        }
	    }, {
	        key: 'add_aerosentry',
	        value: function add_aerosentry(string, color, _callback) {
	            return new BB_aerosentry(this, string, color, _callback);
	        }
	    }, {
	        key: 'add_bomber',
	        value: function add_bomber(string, color, _callback) {
	            return new BB_bomber(this, string, color, _callback);
	        }
	    }, {
	        key: 'add_bascout',
	        value: function add_bascout(string, color, _callback) {
	            return new BB_bascout(this, string, color, _callback);
	        }
	    }, {
	        key: 'add_circle',
	        value: function add_circle(string, radius, color, _callback) {
	            return new BB_circle(this, string, radius, color, _callback);
	        }
	    }, {
	        key: 'add_line',
	        value: function add_line(string, length, color, _callback) {
	            return new BB_line(this, string, length, color, _callback);
	        }
	    }, {
	        key: 'add_point',
	        value: function add_point(string, size, color, align, _callback) {
	            return new BB_point(this, string, size, color, align, _callback);
	        }
	    }, {
	        key: 'add_icon',
	        value: function add_icon(string, file, color, _callback) {
	            return new BB_icon(this, string, file, color, _callback);
	        }
	    }, {
	        key: 'add_waft',
	        value: function add_waft(string, file, color, _callback) {
	            return new BB_waft(this, string, file, color, _callback);
	        }
	    }, {
	        key: 'add_freehand',
	        value: function add_freehand(text, color) {
	            return new BB_freehand(this, text, color);
	        }

	        //
	        //拡大縮小
	        //
	    }, {
	        key: 'zoom',
	        value: function zoom(scale) {
	            if (scale === undefined) return this.zoomScale;

	            var canvas = jc.canvas(this.id).cnv,
	                baseLayer = jc.canvas(this.id).layers[0];

	            //倍率書き換えて、背景レイヤと各オブジェクトの拡大を実施
	            this.zoomScale = this.zoomScale * scale;
	            baseLayer.scale(scale);

	            for (var objid in this.member) {
	                this.object(objid).applyZoom(scale);
	            }

	            //キャンバスの大きさを合わせる
	            canvas.width = jc("#bg").getRect().width;
	            canvas.height = jc("#bg").getRect().height;
	            this.chgScroll();

	            jc.canvas(this.id).frame();
	            return this;
	        }
	    }, {
	        key: 'chgScroll',
	        value: function chgScroll() {
	            jc.canvas(this.id).recalculateOffset();
	        }
	    }]);

	    return BB;
	})();

	exports['default'] = BB;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * jCanvaScript JavaScript Library v 1.5.18
	 * http://jcscript.com/
	 *
	 * Copyright 2012, Alexander Savin
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 */
	"use strict";

	(function (ab, z) {
	  var ad = [],
	      ai = Math,
	      f = ai.PI,
	      v = f * 2,
	      X = 0,
	      S = 0,
	      N = false,
	      ae = false,
	      V = /[A-z]+?/,
	      Q = /\d.\w\w/,
	      a = ab.navigator.userAgent.match(/Firefox\/\w+\.\w+/i),
	      E = 180 / f,
	      U = ai.max,
	      i = ai.min,
	      y = ai.cos,
	      L = ai.sin,
	      O = ai.floor,
	      p = ai.round,
	      Z = ai.abs,
	      Y = ai.pow,
	      ap = ai.sqrt,
	      M = 1000 / 60,
	      c = (function () {
	    return ab.requestAnimationFrame || ab.webkitRequestAnimationFrame || ab.mozRequestAnimationFrame || ab.oRequestAnimationFrame || ab.msRequestAnimationFrame || function (ar, m) {
	      return setTimeout(ar, M);
	    };
	  })(),
	      I = (function () {
	    return ab.cancelAnimationFrame || ab.webkitCancelRequestAnimationFrame || ab.mozCancelRequestAnimationFrame || ab.oCancelRequestAnimationFrame || ab.msCancelRequestAnimationFrame || clearTimeout;
	  })();if (a != "" && a !== null) {
	    var A = parseInt(a[0].split(/[ \/\.]/i)[1]) < 7;
	  }function ah(au, ar, aw) {
	    var ax = ad[au].layers[ar].objs,
	        ay = ad[au].layers[ar].grdntsnptrns,
	        at = ax.length,
	        av = ay.length;aw = aw.slice(1);for (var m = 0; m < at; m++) {
	      if (ax[m].optns.id == aw) {
	        return ax[m];
	      }
	    }for (m = 0; m < av; m++) {
	      if (ay[m].optns.id == aw) {
	        return ay[m];
	      }
	    }return false;
	  }function al(at, ar, au, av) {
	    var ax = ad[at].layers[ar].objs,
	        ay = ad[at].layers[ar].grdntsnptrns,
	        m = av.slice(1).split(".");aw(au, m, ax);aw(au, m, ay);return au;function aw(aH, aC, aD) {
	      var aE = aD.length,
	          aF,
	          aA,
	          aB,
	          az;for (aB = 0; aB < aE; aB++) {
	        aF = aD[aB]._name.split(" ");if (aC.length > aF.length) {
	          continue;
	        }var aG = aC.concat();for (aA = 0; aA < aF.length; aA++) {
	          for (az = 0; az < aG.length; az++) {
	            if (aF[aA] === aG[az]) {
	              aG.splice(az, 1);az--;continue;
	            }
	          }if (!aG.length) {
	            aH.elements.push(aD[aB]);break;
	          }
	        }
	      }
	    }
	  }function B(au, ar, av) {
	    var ax = ad[au].layers[ar].objs,
	        ay = ad[au].layers[ar].grdntsnptrns,
	        at = ax.length,
	        aw = ay.length;for (var m = 0; m < at; m++) {
	      av.elements.push(ax[m]);
	    }for (m = 0; m < aw; m++) {
	      av.elements.push(ay[m]);
	    }return av;
	  }var P = function P(aD, m) {
	    if (aD === z) {
	      return this;
	    }if (typeof aD == "object") {
	      m = aD;aD = z;
	    }var aC = -1,
	        au = -1,
	        ar = ad.length,
	        aB = G(),
	        ay,
	        av,
	        at,
	        az,
	        ax,
	        aw,
	        aA;if (m === z) {
	      if (aD.charAt(0) === "#") {
	        for (ay = 0; ay < ar; ay++) {
	          aA = ad[ay].layers.length;for (av = 0; av < aA; av++) {
	            aw = ah(ay, av, aD);if (aw) {
	              return aw;
	            }
	          }
	        }
	      }if (aD.charAt(0) === ".") {
	        for (ay = 0; ay < ar; ay++) {
	          aA = ad[ay].layers.length;for (av = 0; av < aA; av++) {
	            aB = al(ay, av, aB, aD);
	          }
	        }
	      }
	    } else {
	      if (m.canvas !== z) {
	        for (ay = 0; ay < ar; ay++) {
	          if (ad[ay].optns.id == m.canvas) {
	            aC = ay;at = ad[ay];break;
	          }
	        }
	      }if (m.layer !== z) {
	        if (aC != -1) {
	          aA = at.layers.length;for (ay = 0; ay < aA; ay++) {
	            if (at.layers[ay].optns.id == m.layer) {
	              au = ay;az = at.layers[ay];break;
	            }
	          }
	        } else {
	          for (ay = 0; ay < ar; ay++) {
	            ax = ad[ay].layers;aA = ax.length;for (av = 0; av < aA; av++) {
	              if (ax[av].optns.id == m.layer) {
	                aC = ay;au = av;at = ad[ay];az = at.layers[av];break;
	              }
	            }if (az > -1) {
	              break;
	            }
	          }
	        }
	      }if (au < 0 && aC < 0) {
	        return G();
	      }if (au < 0) {
	        ax = at.layers;aA = ax.length;if (aD === z) {
	          for (av = 0; av < aA; av++) {
	            aB = B(aC, av, aB);
	          }
	        } else {
	          if (aD.charAt(0) === "#") {
	            for (av = 0; av < aA; av++) {
	              aw = ah(aC, av, aD);if (aw) {
	                return aw;
	              }
	            }
	          } else {
	            if (aD.charAt(0) === ".") {
	              for (av = 0; av < aA; av++) {
	                aB = al(aC, av, aB, aD);
	              }
	            }
	          }
	        }
	      } else {
	        if (aD === z) {
	          aB = B(aC, au, aB);
	        }if (aD.charAt(0) === "#") {
	          return ah(aC, au, aD);
	        }if (aD.charAt(0) === ".") {
	          aB = al(aC, au, aB, aD);
	        }
	      }
	    }if (m !== z) {
	      if (m.attrs !== z || m.fns !== z) {
	        return aB.find(m);
	      }
	    }if (aB.elements.length) {
	      return aB;
	    }return G();
	  };function k(ar) {
	    var m = ar.optns;ar.matrix(o(o(o(m.transformMatrix, m.translateMatrix), m.scaleMatrix), m.rotateMatrix));j(ar);
	  }function af(m, at) {
	    for (var ar in at) {
	      if (m[ar] === z) {
	        m[ar] = at[ar];
	      }
	    }return m;
	  }function j(m) {
	    D(m).optns.redraw = 1;
	  }function F(av) {
	    var ar = av.timeDiff,
	        m = 1;for (var at = 0; at < this.animateQueue.length; at++) {
	      var ay = this.animateQueue[at],
	          ax = ay.duration,
	          az = ay.easing,
	          aw = ay.step,
	          aA = ay.onstep,
	          au = az.type == "in" || az.type == "inOut" && m < 0.5,
	          aD = az.type == "out" || az.type == "inOut" && m > 0.5;ay.step += ar;m = aw / ax;for (var aF in ay) {
	        if (this[aF] !== z && ay[aF]) {
	          var aE = ay[aF],
	              aC = aE.to,
	              aB = aE.from;H(aF, this, ay);if (au) {
	            this[aF] = (aC - aB) * h[az.fn](m, az) + aB;
	          }if (aD) {
	            this[aF] = (aC - aB) * (1 - h[az.fn](1 - m, az)) + aB;
	          }if (aA) {
	            aA.fn.call(this, aA);
	          }if (aw >= ax) {
	            this[aF] = aC;H(aF, this, ay);ay[aF] = false;ay.animateKeyCount--;if (!ay.animateKeyCount) {
	              if (ay.animateFn) {
	                ay.animateFn.apply(this);
	              }this.animateQueue.splice(at, 1);at--;
	            }
	          }
	        }
	      }
	    }if (this.animateQueue.length) {
	      j(this);
	    } else {
	      this.optns.animated = false;
	    }return this;
	  }function H(at, ar, m) {
	    var av = ar[at];var au = m[at]["prev"];switch (at) {case "_rotateAngle":
	        ar.rotate(av - au, ar._rotateX, ar._rotateY);break;case "_translateX":
	        ar.translate(av - au, 0);break;case "_translateY":
	        ar.translate(0, av - au);break;case "_translateToX":
	        ar.translateTo(av, z);break;case "_translateToY":
	        ar.translateTo(z, av);break;case "_scaleX":
	        if (!au) {
	          au = 1;
	        }ar.scale(av / au, 1);break;case "_scaleY":
	        if (!au) {
	          au = 1;
	        }ar.scale(1, av / au);break;default:
	        return;}m[at]["prev"] = av;
	  }function ag(at, ar, m) {
	    at = at || ab.event;m[ar].event = at;m[ar].code = at.charCode || at.keyCode;m[ar].val = true;m.redraw = 1;
	  }function u(au, at, ar) {
	    if (!ar[at].val) {
	      return;
	    }au = au || ab.event;var m = { pageX: au.pageX || au.clientX, pageY: au.pageY || au.clientY };ar[at].event = au;ar[at].x = m.pageX - ar.x;ar[at].y = m.pageY - ar.y;ar.redraw = 1;
	  }function x(ar, m) {
	    if (ar === z) {
	      this["on" + m]();
	    } else {
	      this["on" + m] = ar;
	    }if (m == "mouseover" || m == "mouseout") {
	      m = "mousemove";
	    }D(this).optns[m].val = true;return this;
	  }function ao(ar, m) {
	    if (ar === z) {
	      this[m]();
	    } else {
	      this[m] = ar;
	    }return this;
	  }var h = { linear: function linear(m, ar) {
	      return m;
	    }, exp: function exp(m, ar) {
	      var at = ar.n || 2;return Y(m, at);
	    }, circ: function circ(m, ar) {
	      return 1 - ap(1 - m * m);
	    }, sine: function sine(m, ar) {
	      return 1 - L((1 - m) * f / 2);
	    }, back: function back(ar, at) {
	      var au = at.n || 2;var m = at.x || 1.5;return Y(ar, au) * ((m + 1) * ar - m);
	    }, elastic: function elastic(av, aw) {
	      var ax = aw.n || 2;var at = aw.m || 20;var au = aw.k || 3;var ar = aw.x || 1.5;return Y(ax, 10 * (av - 1)) * y(at * av * f * ar / au);
	    }, bounce: function bounce(at, aw) {
	      var ax = aw.n || 4;var ar = aw.b || 0.25;var av = [1];for (var au = 1; au < ax; au++) {
	        av[au] = av[au - 1] + Y(ar, au / 2);
	      }var m = 2 * av[ax - 1] - 1;for (au = 0; au < ax; au++) {
	        if (m * at >= (au > 0 ? 2 * av[au - 1] - 1 : 0) && m * at <= 2 * av[au] - 1) {
	          return Y(m * (at - (2 * av[au] - 1 - Y(ar, au / 2)) / m), 2) + 1 - Y(ar, au);
	        }
	      }return 1;
	    } },
	      g = { color: { fn: function fn(ax, m, at, aw) {
	        var ar, av, au;at = at[aw];for (av = 0; av < ax; av++) {
	          for (au = 0; au < m; au++) {
	            ar = this.getPixel(av, au);ar[at[0]] = ar[at[0]] * 2 - ar[at[1]] - ar[at[2]];ar[at[1]] = 0;ar[at[2]] = 0;ar[at[0]] = ar[at[0]] > 255 ? 255 : ar[at[0]];this.setPixel(av, au, ar);
	          }
	        }
	      }, matrix: { red: [0, 1, 2], green: [1, 0, 2], blue: [2, 0, 1] } }, linear: { fn: function fn(ar, aC, aA, az) {
	        var aB = [],
	            au,
	            ay,
	            ax,
	            aw,
	            av,
	            at;aA = aA[az];av = aA.length;at = aA[0].length;for (ay = 0; ay < ar; ay++) {
	          aB[ay] = [];for (ax = 0; ax < aC; ax++) {
	            aB[ay][ax] = [0, 0, 0, 1];for (av = 0; av < 3; av++) {
	              for (at = 0; at < 3; at++) {
	                au = this.getPixel(ay - parseInt(av / 2), ax - parseInt(at / 2));for (aw = 0; aw < 3; aw++) {
	                  aB[ay][ax][aw] += au[aw] * aA[av][at];
	                }
	              }
	            }
	          }
	        }for (ay = 0; ay < ar; ay++) {
	          for (ax = 0; ax < aC; ax++) {
	            this.setPixel(ay, ax, aB[ay][ax]);
	          }
	        }
	      }, matrix: { sharp: [[-0.375, -0.375, -0.375], [-0.375, 4, -0.375], [-0.375, -0.375, -0.375]], blur: [[0.111, 0.111, 0.111], [0.111, 0.111, 0.111], [0.111, 0.111, 0.111]] } } };function o(ar, m) {
	    return [[ar[0][0] * m[0][0] + ar[0][1] * m[1][0], ar[0][0] * m[0][1] + ar[0][1] * m[1][1], ar[0][0] * m[0][2] + ar[0][1] * m[1][2] + ar[0][2]], [ar[1][0] * m[0][0] + ar[1][1] * m[1][0], ar[1][0] * m[0][1] + ar[1][1] * m[1][1], ar[1][0] * m[0][2] + ar[1][1] * m[1][2] + ar[1][2]]];
	  }function t(at, au, ar) {
	    return { x: at * ar[0][0] + au * ar[0][1] + ar[0][2], y: at * ar[1][0] + au * ar[1][1] + ar[1][2] };
	  }function ac(at, au, ar) {
	    return { x: (at * ar[1][1] - au * ar[0][1] + ar[0][1] * ar[1][2] - ar[1][1] * ar[0][2]) / (ar[0][0] * ar[1][1] - ar[1][0] * ar[0][1]), y: (-at * ar[1][0] + au * ar[0][0] - ar[0][0] * ar[1][2] + ar[1][0] * ar[0][2]) / (ar[0][0] * ar[1][1] - ar[1][0] * ar[0][1]) };
	  }function b(aA, aF, aE) {
	    if (aE == "poor") {
	      return aF;
	    }var aB = { x: aF.x, y: aF.y },
	        aG = { x: aF.x + aF.width, y: aF.y + aF.height },
	        ax = o(aA.matrix(), aj(aA).matrix()),
	        aC = t(aB.x, aB.y, ax),
	        az = t(aG.x, aB.y, ax),
	        av = t(aB.x, aG.y, ax),
	        au = t(aG.x, aG.y, ax),
	        aH = [[aC.x, aC.y], [az.x, az.y], [av.x, av.y], [au.x, au.y]];if (aE == "coords") {
	      return aH;
	    }var ay,
	        aw,
	        at = ay = aC.x,
	        ar = aw = aC.y;for (var aD = 0; aD < 4; aD++) {
	      if (at < aH[aD][0]) {
	        at = aH[aD][0];
	      }if (ar < aH[aD][1]) {
	        ar = aH[aD][1];
	      }if (ay > aH[aD][0]) {
	        ay = aH[aD][0];
	      }if (aw > aH[aD][1]) {
	        aw = aH[aD][1];
	      }
	    }return { x: ay, y: aw, width: at - ay, height: ar - aw };
	  }function R(ar, m, at) {
	    if (at == "poor") {
	      return m;
	    }return t(m.x, m.y, o(ar.matrix(), aj(ar).matrix()));
	  }function s(au) {
	    var aw = { color: { val: au, notColor: z }, r: 0, g: 0, b: 0, a: 1 };if (au.id !== z) {
	      aw.color.notColor = { level: au._level, canvas: au.optns.canvas.number, layer: au.optns.layer.number };return aw;
	    }if (au.r !== z) {
	      aw = af(au, { r: 0, g: 0, b: 0, a: 1 });aw.color = { val: "rgba(" + aw.r + "," + aw.g + "," + aw.b + "," + aw.a + ")", notColor: z };return aw;
	    }if (au.charAt(0) == "#") {
	      if (au.length > 4) {
	        aw.r = parseInt(au.substr(1, 2), 16);aw.g = parseInt(au.substr(3, 2), 16);aw.b = parseInt(au.substr(5, 2), 16);
	      } else {
	        var m = au.charAt(1),
	            ay = au.charAt(2),
	            az = au.charAt(3);aw.r = parseInt(m + m, 16);aw.g = parseInt(ay + ay, 16);aw.b = parseInt(az + az, 16);
	      }
	    } else {
	      var ax = au.split(",");if (ax.length == 4) {
	        var av = ax[0].split("(");var at = ax[3].split(")");aw.r = parseInt(av[1]);aw.g = parseInt(ax[1]);aw.b = parseInt(ax[2]);aw.a = parseFloat(at[0]);
	      }if (ax.length == 3) {
	        av = ax[0].split("(");var ar = ax[2].split(")");aw.r = parseInt(av[1]);aw.g = parseInt(ax[1]);aw.b = parseInt(ar[0]);
	      }
	    }aw.color.notColor = z;return aw;
	  }function C(m) {
	    if (m.getBoundingClientRect) {
	      return r(m);
	    } else {
	      return aq(m);
	    }
	  }function aq(m) {
	    var at = 0,
	        ar = 0;while (m) {
	      at = at + parseInt(m.offsetTop);ar = ar + parseInt(m.offsetLeft);m = m.offsetParent;
	    }return { top: at, left: ar };
	  }function r(au) {
	    var ax = au.getBoundingClientRect();var ay = document.body || {};var ar = document.documentElement;var m = ab.pageYOffset || ar.scrollTop || ay.scrollTop;var av = ab.pageXOffset || ar.scrollLeft || ay.scrollLeft;var aw = ar.clientTop || ay.clientTop || 0;var az = ar.clientLeft || ay.clientLeft || 0;var aA = ax.top + m - aw;var at = ax.left + av - az;return { top: p(aA), left: p(at) };
	  }function ak(ar, m) {
	    q(ar, m);am(ar, m);
	  }function am(ar, m) {
	    if (!ar.optns.focused) {
	      return;
	    }if (m.keyDown.val != false) {
	      if (typeof ar.onkeydown == "function") {
	        ar.onkeydown(m.keyDown);
	      }
	    }if (m.keyUp.val != false) {
	      if (typeof ar.onkeyup == "function") {
	        ar.onkeyup(m.keyUp);
	      }
	    }if (m.keyPress.val != false) {
	      if (typeof ar.onkeypress == "function") {
	        ar.onkeypress(m.keyPress);
	      }
	    }
	  }function K(ar, ax, av) {
	    var ay = {};var m = D(ar);var az = m.optns.ctx;var au = m.layers[ar.optns.layer.number];ay.x = ax;ay.y = av;if (A) {
	      ay = ac(ax, av, au.matrix());ay = ac(ay.x, ay.y, ar.matrix());
	    }if (az.isPointInPath === z || ar._img !== z || ar._imgData !== z || ar._proto == "text") {
	      var aw = ar.getRect("poor");var at = ac(ax, av, o(ar.matrix(), au.matrix()));if (aw.x <= at.x && aw.y <= at.y && aw.x + aw.width >= at.x && aw.y + aw.height >= at.y) {
	        return ay;
	      }
	    } else {
	      if (az.isPointInPath(ay.x, ay.y)) {
	        return ay;
	      }
	    }return false;
	  }function q(at, m) {
	    var ay = false,
	        ar = m.mousemove,
	        aw = m.mousedown,
	        aA = m.mouseup,
	        au = m.click,
	        az = m.dblclick,
	        ax = ar.x || aw.x || aA.x || az.x || au.x,
	        av = ar.y || aw.y || aA.y || az.y || au.y;if (ax != false) {
	      ay = K(at, ax, av);
	    }if (ay) {
	      if (ar.x != false) {
	        ar.object = at;
	      }if (aw.x != false) {
	        aw.objects[aw.objects.length] = at;
	      }if (au.x != false) {
	        au.objects[au.objects.length] = at;
	      }if (az.x != false) {
	        az.objects[az.objects.length] = at;
	      }if (aA.x != false) {
	        aA.objects[aA.objects.length] = at;
	      }m.point = ay;
	    }
	  }function aj(m) {
	    return D(m).layers[m.optns.layer.number];
	  }function D(m) {
	    return ad[m.optns.canvas.number];
	  }function e(ay, m, au) {
	    j(m);var ar = m.optns.canvas;var at = m.optns.layer;if (ay === z) {
	      return at.id;
	    }if (at.id == ay) {
	      return m;
	    }var av = { i: ar.number, j: at.number };at.id = ay;var ax = P.layer(ay);var az = { i: ax.optns.canvas.number, j: ax.optns.number };var aw = ad[av.i].layers[av.j][au],
	        aA = ad[az.i].layers[az.j][au];aw.splice(m.optns.number, 1);m._level = m.optns.number = aA.length;aA[m._level] = m;at.number = az.j;ar.number = az.i;ar.id = ax.optns.canvas.id;j(m);return m;
	  }function J(au, at) {
	    for (var ar in at) {
	      switch (typeof at[ar]) {case "function":
	          if (ar.substr(0, 2) == "on") {
	            break;
	          }if (au[ar] === z) {
	            au[ar] = at[ar];
	          }break;case "object":
	          if (ar == "optns" || ar == "animateQueue") {
	            break;
	          }if (ar == "objs" || ar == "grdntsnptrns") {
	            for (var m in at[ar]) {
	              if (at[ar].hasOwnProperty(m)) {
	                at[ar][m].clone().layer(au.optns.id);
	              }
	            }break;
	          }if (!at[ar] || ar === "ctx") {
	            continue;
	          }au[ar] = typeof at[ar].pop === "function" ? [] : {};J(au[ar], at[ar]);break;default:
	          if (ar == "_level") {
	            break;
	          }au[ar] = at[ar];}
	    }
	  }function n(aw, m, av) {
	    j(m);var ar = m.optns.canvas;var au = m.optns.layer;if (aw === z) {
	      return ad[ar.number].optns.id;
	    }if (ad[ar.number].optns.id == aw) {
	      return m;
	    }var ax = { i: ar.number, j: au.number };P.canvas(aw);for (var at = 0; at < ad.length; at++) {
	      var aA = ad[at];if (aA.optns.id == aw) {
	        var ay = ad[ax.i].layers[ax.j][av],
	            az = aA.layers[0][av];ay.splice(m.optns.number, 1);d(ay);m._level = m.optns.number = az.length;az[m._level] = m;au.number = 0;ar.number = at;ar.id = aA.optns.id;au.id = aA.layers[0].optns.id;
	      }
	    }j(m);return m;
	  }function d(ar) {
	    for (var m = 0; m < ar.length; m++) {
	      ar[m].optns.number = m;
	    }
	  }function l(ay, az, aA, at, ax) {
	    var au = ay.length,
	        m,
	        ar,
	        aw;for (var av = 0; av < au; av++) {
	      m = ay[av].optns;ar = m.canvas;aw = m.layer;ar.id = at;ar.number = ax;aw.id = az;aw.number = aA;
	    }
	  }function T(m) {
	    m.sort(function (at, ar) {
	      if (at._level > ar._level) {
	        return 1;
	      }if (at._level < ar._level) {
	        return -1;
	      }return 0;
	    });d(m);return m.length;
	  }function W(at) {
	    var ar;do {
	      ar = false;for (var m = 0; m < at.length; m++) {
	        if (at[m].optns.deleted) {
	          at.splice(m, 1);ar = true;
	        }
	      }
	    } while (ar);d(at);return at.length;
	  }var w = {};w.object = function () {
	    this.getCenter = function (ar) {
	      var at = this.getRect("poor"),
	          m = { x: (at.x * 2 + at.width) / 2, y: (at.y * 2 + at.height) / 2 };return R(this, m, ar);
	    };this.position = function () {
	      return t(this._x, this._y, o(this.matrix(), aj(this).matrix()));
	    };this.buffer = function (aw) {
	      var at = this.optns.buffer;if (aw === z) {
	        if (at.val) {
	          return at.cnv;
	        } else {
	          return false;
	        }
	      }if (at.val === aw) {
	        return this;
	      }if (aw) {
	        var ar = at.cnv = document.createElement("canvas"),
	            m = at.ctx = ar.getContext("2d"),
	            av = at.rect = this.getRect(),
	            au = this.transform();ar.setAttribute("width", av.width);ar.setAttribute("height", av.height);at.x = this._x;at.y = this._y;at.dx = this._transformdx;at.dy = this._transformdy;this._x = this._y = 0;this.transform(1, 0, 0, 1, -av.x + at.dx, -av.y + at.dy, true);this.setOptns(m);J(at.optns = {}, D(this).optns);at.optns.ctx = m;this.draw(at.optns);this._x = at.x;this._y = at.y;this.transform(au[0][0], au[1][0], au[0][1], au[1][1], av.x, av.y, true);at.val = true;
	      } else {
	        this.translate(-at.rect.x + at.dx, -at.rect.y + at.dy);this.optns.buffer = { val: false };
	      }return this;
	    };this.clone = function (m) {
	      var ar = new w[this._proto]();w[this._proto].prototype.base.call(ar);J(ar, this);ar.layer(aj(this).optns.id);J(ar.optns.transformMatrix, this.optns.transformMatrix);J(ar.optns.translateMatrix, this.optns.translateMatrix);J(ar.optns.scaleMatrix, this.optns.scaleMatrix);J(ar.optns.rotateMatrix, this.optns.rotateMatrix);if (m === z) {
	        return ar;
	      }return ar.animate(m);
	    };this.shadow = function (ar) {
	      for (var at in ar) {
	        switch (at) {case "x":
	            this._shadowX = ar.x;break;case "y":
	            this._shadowY = ar.y;break;case "blur":
	            this._shadowBlur = ar.blur;break;case "color":
	            var m = s(ar.color);this._shadowColor = ar.color.val;this._shadowColorR = m.r;this._shadowColorG = m.g;this._shadowColorB = m.b;this._shadowColorA = m.a;break;}
	      }j(this);return this;
	    };this.setOptns = function (ar) {
	      ar.globalAlpha = this._opacity;ar.shadowOffsetX = this._shadowX;ar.shadowOffsetY = this._shadowY;ar.shadowBlur = this._shadowBlur;ar.globalCompositeOperation = this._composite;var av = parseInt(this._shadowColorR),
	          au = parseInt(this._shadowColorG),
	          m = parseInt(this._shadowColorB),
	          at = parseInt(this._shadowColorA * 100) / 100;if (this._shadowColorRPrev !== av || this._shadowColorGPrev !== au || this._shadowColorBPrev !== m || this._shadowColorAPrev !== at) {
	        ar.shadowColor = this._shadowColor = "rgba(" + av + ", " + au + ", " + m + ", " + at + ")";this._shadowColorRPrev = av;this._shadowColorGPrev = au;this._shadowColorBPrev = m;this._shadowColorAPrev = at;
	      } else {
	        ar.shadowColor = this._shadowColor;
	      }ar.transform(this._transform11, this._transform12, this._transform21, this._transform22, this._transformdx, this._transformdy);return this;
	    };this.up = function (ar) {
	      if (ar === z) {
	        ar = 1;
	      }if (ar == "top") {
	        this.level(ar);
	      } else {
	        var m = aj(this).objs[this.optns.number + ar];if (m !== z) {
	          ar = m._level + 1 - this._level;
	        }this.level(this._level + ar);
	      }return this;
	    };this.down = function (ar) {
	      if (ar == z) {
	        ar = 1;
	      }if (ar == "bottom") {
	        this.level(ar);
	      } else {
	        var m = aj(this).objs[this.optns.number - ar];if (m !== z) {
	          ar = this._level - (m._level - 1);
	        }this.level(this._level - ar);
	      }return this;
	    };this.level = function (ar) {
	      if (ar == z) {
	        return this._level;
	      }var m = aj(this);if (ar == "bottom") {
	        if (this.optns.number == 0) {
	          ar = this._level;
	        } else {
	          ar = m.objs[0]._level - 1;
	        }
	      }if (ar == "top") {
	        if (this.optns.number == m.objs.length) {
	          ar = this._level;
	        } else {
	          ar = m.objs[m.objs.length - 1]._level + 1;
	        }
	      }this._level = ar;m.optns.anyObjLevelChanged = true;j(this);return this;
	    };this.del = function () {
	      this.optns.deleted = true;aj(this).optns.anyObjDeleted = true;j(this);
	    };this.focus = function (m) {
	      if (m === z) {
	        this.optns.focused = true;if (typeof this.onfocus == "function") {
	          this.onfocus();
	        }
	      } else {
	        this.onfocus = m;
	      }return this;
	    };this.blur = function (m) {
	      if (m === z) {
	        this.optns.focused = false;if (typeof this.onblur == "function") {
	          this.onblur();
	        }
	      } else {
	        this.onblur = m;
	      }return this;
	    };this.click = function (m) {
	      return x.call(this, m, "click");
	    };this.dblclick = function (m) {
	      return x.call(this, m, "dblclick");
	    };this.keypress = function (m) {
	      return ao.call(this, m, "onkeypress");
	    };this.keydown = function (m) {
	      return ao.call(this, m, "onkeydown");
	    };this.keyup = function (m) {
	      return ao.call(this, m, "onkeyup");
	    };this.mousedown = function (m) {
	      return x.call(this, m, "mousedown");
	    };this.mouseup = function (m) {
	      return x.call(this, m, "mouseup");
	    };this.mousemove = function (m) {
	      return x.call(this, m, "mousemove");
	    };this.mouseover = function (m) {
	      return x.call(this, m, "mouseover");
	    };this.mouseout = function (m) {
	      return x.call(this, m, "mouseout");
	    };this.attr = function (at, ar) {
	      if (typeof at === "object") {
	        var m = at;
	      } else {
	        if (ar === z) {
	          return this["_" + at];
	        }m = {};m[at] = ar;
	      }return this.animate(m);
	    };this.queue = function () {
	      var at = this.animateQueue.length,
	          m,
	          aw,
	          av,
	          ay = 0,
	          ar = 0,
	          ax,
	          au = arguments;for (aw = 0; aw < au.length; aw++) {
	        if (typeof au[aw] == "function") {
	          au[aw].apply(this);au[aw] = false;aw++;if (this.animateQueue.length > at) {
	            for (av = at; av < this.animateQueue.length; av++) {
	              m = this.animateQueue[av];if (m.duration !== z) {
	                if (m.duration > ay) {
	                  ay = m.duration;ar = av;
	                }break;
	              }
	            }if (ay) {
	              m = this.animateQueue[ar];if (m.animateFn) {
	                ax = m.animateFn;m.animateFn = function () {
	                  ax.apply(this);this.queue.apply(this, au);
	                };
	              } else {
	                m.animateFn = function () {
	                  this.queue.apply(this, au);
	                };
	              }break;
	            }
	          }
	        }
	      }
	    };this.stop = function (au, av) {
	      this.optns.animated = false;if (av === z) {
	        av = false;
	      }if (au === z) {
	        au = false;
	      }for (var at = 0; at < this.animateQueue.length; at++) {
	        var m = this.animateQueue[at];if (av) {
	          m.animateFn.call(this);
	        }if (au) {
	          for (var ar in m) {
	            if (m[ar]["from"] !== z) {
	              this[ar] = m[ar]["to"];H(ar, this, m);
	            }
	          }
	        }
	      }this.animateQueue = [];return this;
	    };this.animate = function (aB, m, av, aw, ax) {
	      if (m === z) {
	        m = 1;
	      } else {
	        if (typeof m == "function") {
	          ax = m;m = 1;
	        }if (typeof m == "object") {
	          av = m;m = 1;
	        }
	      }if (av === z) {
	        av = { fn: "linear", type: "in" };
	      } else {
	        if (typeof av == "function") {
	          ax = av;av = { fn: "linear", type: "in" };
	        }if (av.type === z) {
	          av.type = "in";
	        }
	      }if (aw === z) {
	        aw = false;
	      } else {
	        if (typeof aw == "function") {
	          ax = aw;aw = false;
	        }
	      }if (aB.scale !== z) {
	        this._scaleX = this._scaleY = 1;if (typeof aB.scale != "object") {
	          aB.scaleX = aB.scaleY = aB.scale;
	        } else {
	          aB.scaleX = aB.scale.x || 1;aB.scaleY = aB.scale.y || 1;
	        }
	      }if (aB.translate !== z) {
	        this._translateX = this._translateY = 0;if (typeof aB.translate != "object") {
	          aB.translateX = aB.translateY = aB.translate;
	        } else {
	          aB.translateX = aB.translate.x || 0;aB.translateY = aB.translate.y || 0;
	        }aB.translate = z;
	      }if (aB.translateTo !== z) {
	        var az = this.position();this._translateToX = az.x;this._translateToY = az.y;if (typeof aB.translateTo != "object") {
	          aB.translateToX = aB.translateToY = aB.translateTo;
	        } else {
	          aB.translateToX = aB.translateTo.x || 0;aB.translateToY = aB.translateTo.y || 0;
	        }aB.translateTo = z;
	      }if (aB.rotate !== z) {
	        aB.rotateAngle = aB.rotate.angle;this._rotateAngle = 0;this._rotateX = aB.rotate.x || 0;this._rotateY = aB.rotate.y || 0;aB.rotate = z;
	      }if (aB.color !== z) {
	        var at = s(aB.color);if (at.color.notColor) {
	          this.optns.color.notColor = at.color.notColor;
	        } else {
	          aB.colorR = at.r;aB.colorG = at.g;aB.colorB = at.b;aB.alpha = at.a;
	        }aB.color = z;
	      }if (aB.shadowColor !== z) {
	        at = s(aB.shadowColor);aB.shadowColorR = at.r;aB.shadowColorG = at.g;aB.shadowColorB = at.b;aB.shadowColorA = at.a;aB.shadowColor = z;
	      }if (m > 1) {
	        var au = this.animateQueue[this.animateQueue.length] = { animateKeyCount: 0 };au.animateFn = ax || false;this.optns.animated = true;au.duration = m;au.step = 0;au.easing = av;au.onstep = aw;
	      }for (var aA in aB) {
	        if (this["_" + aA] !== z && aB[aA] !== z) {
	          var ar = aB[aA],
	              ay = "_" + aA;if (ar != this[ay]) {
	            if (ar.charAt) {
	              if (aA == "string") {
	                this._string = ar;
	              } else {
	                if (ar.charAt(1) == "=") {
	                  ar = this[ay] + parseInt(ar.charAt(0) + "1") * parseInt(ar.substr(2));
	                } else {
	                  if (!V.test(ar)) {
	                    ar = parseInt(ar);
	                  } else {
	                    this[ay] = ar;
	                  }
	                }
	              }
	            }if (m == 1) {
	              this[ay] = ar;
	            } else {
	              au[ay] = { from: this[ay], to: ar, prev: 0 };au.animateKeyCount++;
	            }
	          }
	        }
	      }if (m == 1) {
	        if (aB.rotateAngle) {
	          this.rotate(this._rotateAngle, this._rotateX, this._rotateY);
	        }if (aB.translateX || aB.translateY) {
	          this.translate(this._translateX, this._translateY);
	        }if (aB.translateToX || aB.translateToY) {
	          this.translate(this._translateToX, this._translateToY);
	        }if (aB.scaleX || aB.scaleY) {
	          this.scale(this._scaleX, this._scaleY);
	        }
	      }j(this);return this;
	    };this.matrix = function (ar) {
	      if (ar === z) {
	        return [[this._transform11, this._transform21, this._transformdx], [this._transform12, this._transform22, this._transformdy]];
	      }this._transform11 = ar[0][0];this._transform21 = ar[0][1];this._transform12 = ar[1][0];this._transform22 = ar[1][1];this._transformdx = ar[0][2];this._transformdy = ar[1][2];return this;
	    };this.translateTo = function (m, az, ar, at, au, aw) {
	      if (ar !== z) {
	        return this.animate({ translateTo: { x: m, y: az } }, ar, at, au, aw);
	      }var ay = this.position(),
	          ax = 0,
	          av = 0;if (m !== z) {
	        ax = m - ay.x;
	      }if (az !== z) {
	        av = az - ay.y;
	      }return this.translate(ax, av);
	    };this.translate = function (m, aw, au, av, at, ar) {
	      if (au !== z) {
	        return this.animate({ translate: { x: m, y: aw } }, au, av, at, ar);
	      }this.optns.translateMatrix = o(this.optns.translateMatrix, [[1, 0, m], [0, 1, aw]]);k(this);return this;
	    };this.scale = function (m, aw, au, av, at, ar) {
	      if (au !== z) {
	        return this.animate({ scale: { x: m, y: aw } }, au, av, at, ar);
	      }if (aw === z) {
	        aw = m;
	      }this.optns.scaleMatrix = o(this.optns.scaleMatrix, [[m, 0, this._x * (1 - m)], [0, aw, this._y * (1 - aw)]]);k(this);return this;
	    };this.rotate = function (aA, ar, az, au, av, ax, ay) {
	      if (au !== z) {
	        return this.animate({ rotate: { angle: aA, x: ar, y: az } }, au, av, ax, ay);
	      }aA = aA / E;var aC = y(aA),
	          aw = L(aA),
	          at = 0,
	          m = 0;if (ar !== z) {
	        if (ar == "center") {
	          var aB = this.getCenter("poor");if (az === z) {
	            ar = aB.x;az = aB.y;
	          } else {
	            ar = aB.x + az.x;az = aB.y + az.y;
	          }
	        }at = -ar * (aC - 1) + az * aw;m = -az * (aC - 1) - ar * aw;
	      }this.optns.rotateMatrix = o(this.optns.rotateMatrix, [[aC, -aw, at], [aw, aC, m]]);k(this);return this;
	    };this.transform = function (aw, av, ay, ax, ar, m, au) {
	      if (aw === z) {
	        return this.matrix();
	      }var at = this.optns;if (au !== z) {
	        at.transformMatrix = [[aw, ay, ar], [av, ax, m]];at.rotateMatrix = [[1, 0, 0], [0, 1, 0]];at.scaleMatrix = [[1, 0, 0], [0, 1, 0]];at.translateMatrix = [[1, 0, 0], [0, 1, 0]];
	      } else {
	        at.transformMatrix = o(at.transformMatrix, [[aw, ay, ar], [av, ax, m]]);
	      }k(this);return this;
	    };this.beforeDraw = function (ar) {
	      if (!this._visible) {
	        return false;
	      }var m = ar.ctx;m.save();if (this.optns.clipObject) {
	        var at = this.optns.clipObject;at._visible = true;if (at.optns.animated) {
	          F.call(at, ar);
	        }at.setOptns(m);m.beginPath();at.draw(m);m.clip();
	      }this.setOptns(m);if (this.optns.animated) {
	        F.call(this, ar);
	      }m.beginPath();return true;
	    };this.clip = function (m) {
	      if (m === z) {
	        return this.optns.clipObject;
	      }aj(this).objs.splice(m.optns.number, 1);this.optns.clipObject = m;return this;
	    };this.afterDraw = function (m) {
	      m.ctx.closePath();ak(this, m);m.ctx.restore();if (this.optns.clipObject) {
	        w.shape.prototype.afterDraw.call(this.optns.clipObject, m);
	      }
	    };this.isPointIn = function (az, ax, ar) {
	      var au = D(this).optns,
	          aB = au.ctx,
	          av = false,
	          m = this.optns,
	          at = false;if (ar !== z) {
	        az -= au.x;ax -= au.y;
	      }if (m.animated) {
	        av = true;
	      }m.animated = false;if (m.clipObject) {
	        var ay = m.clipObject,
	            aw = ay.optns;if (aw.animated) {
	          at = true;aw.animated = false;
	        }
	      }aj(this).setOptns(aB);this.beforeDraw(au);this.draw(aB);var aA = K(this, az, ax);aB.closePath();aB.restore();aB.setTransform(1, 0, 0, 1, 0, 0);m.animated = av;if (at) {
	        aw.animated = at;
	      }return aA;
	    };this.layer = function (m) {
	      return e(m, this, "objs");
	    };this.canvas = function (m) {
	      return n(m, this, "objs");
	    };this.draggable = function (av, au, ax) {
	      if (au === z && typeof av == "object" && av.optns === z) {
	        au = av.params;ax = av.drag;var ar = av.start,
	            ay = av.stop,
	            aw = av.disabled;av = av.object;
	      }var at = this;var az = this.optns.drag;if (typeof au === "function") {
	        ax = au;au = z;
	      }if (typeof av == "function") {
	        ax = av;av = z;
	      }az.shiftX = 0;az.shiftY = 0;if (au !== z) {
	        if (au.shiftX !== z) {
	          az.shiftX = au.shiftX;au.shiftX = z;
	        }if (au.shiftY !== z) {
	          az.shiftY = au.shiftY;au.shiftY = z;
	        }
	      }if (av !== z) {
	        if (av.id) {
	          at = au === z ? av.visible(false) : av.animate(au).visible(false);
	        }if (av == "clone") {
	          at = this.clone(au).visible(false);az.type = "clone";
	        }
	      }az.val = true;az.x = this._x;az.y = this._y;az.dx = this._transformdx;az.dy = this._transformdy;az.object = at;az.params = au;az.drag = ax || false;az.start = ar || false;az.stop = ay || false;az.disabled = aw || false;var m = D(this).optns;m.mousemove.val = true;m.mousedown.val = true;m.mouseup.val = true;return this;
	    };this.droppable = function (m) {
	      this.optns.drop.val = true;if (m !== z) {
	        this.optns.drop.fn = m;
	      }return this;
	    };this.name = function (m) {
	      return this.attr("name", m);
	    };this.hasName = function (m) {
	      var at = this.attr("name").split(" "),
	          ar = 0;while (ar < at.length) {
	        if (at[ar] === m) {
	          return true;
	        }ar++;
	      }return false;
	    };this.addName = function (m) {
	      var at = this.attr("name").split(" "),
	          ar = 0;while (ar < at.length) {
	        if (at[ar] === m) {
	          return this;
	        }ar++;
	      }at.push(m);return this.attr("name", at.join(" "));
	    };this.removeName = function (m) {
	      var at = this.attr("name").split(" "),
	          ar = 0;while (ar < at.length) {
	        if (at[ar] === m) {
	          at.splice(ar, 1);return this.attr("name", at.join(" "));
	        }ar++;
	      }return this;
	    };this.visible = function (m) {
	      return this.attr("visible", m);
	    };this.composite = function (m) {
	      return this.attr("composite", m);
	    };this.id = function (m) {
	      if (m === z) {
	        return this.optns.id;
	      }this.optns.id = m;return this;
	    };this.opacity = function (m) {
	      return this.attr("opacity", m);
	    };this.fadeIn = function (at, au, ar, m) {
	      return this.fadeTo(1, at, au, ar, m);
	    };this.fadeOut = function (at, au, ar, m) {
	      return this.fadeTo(0, at, au, ar, m);
	    };this.fadeTo = function (au, at, av, ar, m) {
	      if (at === z) {
	        at = 600;
	      }return this.animate({ opacity: au }, at, av, ar, m);
	    };this.fadeToggle = function (at, au, ar, m) {
	      if (this._opacity) {
	        this.fadeOut(at, au, ar, m);
	      } else {
	        this.fadeIn(at, au, ar, m);
	      }return this;
	    };this.instanceOf = function (m) {
	      if (m === z) {
	        return this._proto;
	      }return this instanceof w[m];
	    };this.base = function (ar, aw, m) {
	      if (typeof ar == "object") {
	        ar = af(ar, { x: 0, y: 0, service: false });m = ar.service;aw = ar.y;ar = ar.x;
	      } else {
	        if (m === z) {
	          m = false;
	        }
	      }var au = ad[X];this.optns = { animated: false, clipObject: false, drop: { val: false, fn: function fn() {} }, drag: { val: false }, layer: { id: au.optns.id + "Layer0", number: 0 }, canvas: { number: 0 }, focused: false, buffer: { val: false }, rotateMatrix: [[1, 0, 0], [0, 1, 0]], scaleMatrix: [[1, 0, 0], [0, 1, 0]], translateMatrix: [[1, 0, 0], [0, 1, 0]], transformMatrix: [[1, 0, 0], [0, 1, 0]] };this.animateQueue = [];this._x = ar;this._y = aw;if (m == false && au !== z && au.layers[0] !== z) {
	        this.optns.layer.number = 0;this.optns.canvas.number = X;var av = aj(this),
	            at = av.objs.length;this.optns.number = at;this._level = at ? av.objs[at - 1]._level + 1 : 0;av.objs[at] = this;this.optns.layer.id = av.optns.id;j(this);
	      }return this;
	    };this._visible = true;this._composite = "source-over";this._name = "";this._opacity = 1;this._shadowX = 0;this._shadowY = 0;this._shadowBlur = 0;this._shadowColor = "rgba(0,0,0,0)";this._shadowColorR = 0;this._shadowColorG = 0;this._shadowColorB = 0;this._shadowColorA = 0;this._shadowColorRPrev = 0;this._shadowColorGPrev = 0;this._shadowColorBPrev = 0;this._shadowColorAPrev = 0;this._translateX = 0;this._translateY = 0;this._scaleX = 1;this._scaleY = 1;this._rotateAngle = 0;this._rotateX = 0;this._rotateY = 0;this._transform11 = 1;this._transform12 = 0;this._transform21 = 0;this._transform22 = 1;this._transformdx = 0;this._transformdy = 0;this._matrixChanged = false;
	  };w.object.prototype = new w.object();w.shape = function () {
	    this.color = function (m) {
	      if (m === z) {
	        return [this._colorR, this._colorG, this._colorB, this._alpha];
	      }return this.attr("color", m);
	    };this.lineStyle = function (m) {
	      return this.attr(m);
	    };this.setOptns = function (at) {
	      w.shape.prototype.setOptns.call(this, at);at.lineWidth = this._lineWidth;at.lineCap = this._cap;at.lineJoin = this._join;at.miterLimit = this._miterLimit;var au = this.optns.color;if (au.notColor === z) {
	        var ay = parseInt(this._colorR),
	            ax = parseInt(this._colorG),
	            ar = parseInt(this._colorB),
	            av = parseInt(this._alpha * 100) / 100;if (this._colorRPrev !== ay || this._colorGPrev !== ax || this._colorBPrev !== ar || this._alphaPrev !== av) {
	          au.val = this._color = "rgba(" + ay + ", " + ax + ", " + ar + ", " + av + ")";this._colorRPrev = ay;this._colorGPrev = ax;this._colorBPrev = ar;this._alphaPrev = av;
	        } else {
	          au.val = this._color;
	        }
	      } else {
	        var m = au.notColor;var aw = ad[m.canvas].layers[m.layer];if (aw.grdntsnptrns[m.level] !== z) {
	          au.val = aw.grdntsnptrns[m.level].val;
	        }
	      }if (this._fill) {
	        at.fillStyle = au.val;
	      } else {
	        at.strokeStyle = au.val;
	      }
	    };this.afterDraw = function (m) {
	      if (this._fill) {
	        m.ctx.fill();
	      } else {
	        m.ctx.stroke();
	      }w.shape.prototype.afterDraw.call(this, m);
	    };this.base = function (m) {
	      if (m === z) {
	        m = {};
	      }if (m.color === z) {
	        m.color = "rgba(0,0,0,1)";
	      } else {
	        if (!m.color.charAt && m.color.id === z && m.color.r === z) {
	          m.fill = m.color;m.color = "rgba(0,0,0,1)";
	        }
	      }m = af(m, { color: "rgba(0,0,0,1)", fill: 0 });w.shape.prototype.base.call(this, m);this._fill = m.fill;this.optns.color = { val: m.color, notColor: z };return this.color(m.color);
	    };this._colorR = 0;this._colorG = 0;this._colorB = 0;this._alpha = 0;this._colorRPrev = 0;this._colorGPrev = 0;this._colorBPrev = 0;this._alphaPrev = 0;this._color = "rgba(0,0,0,0)";this._lineWidth = 1;this._cap = "butt";this._join = "miter";this._miterLimit = 1;
	  };w.shape.prototype = new w.object();w.lines = function () {
	    this.getCenter = function (at) {
	      var m = { x: this._x0, y: this._y0 };for (var ar = 1; ar < this.shapesCount; ar++) {
	        m.x += this["_x" + ar];m.y += this["_y" + ar];
	      }m.x = m.x / this.shapesCount;m.y = m.y / this.shapesCount;return R(this, m, at);
	    };this.position = function () {
	      return t(this._x0, this._y0, o(this.matrix(), aj(this).matrix()));
	    };this.getRect = function (au) {
	      var m,
	          ax,
	          aw = m = this._x0,
	          av = ax = this._y0;for (var ar = 1; ar < this.shapesCount; ar++) {
	        if (aw < this["_x" + ar]) {
	          aw = this["_x" + ar];
	        }if (av < this["_y" + ar]) {
	          av = this["_y" + ar];
	        }if (m > this["_x" + ar]) {
	          m = this["_x" + ar];
	        }if (ax > this["_y" + ar]) {
	          ax = this["_y" + ar];
	        }
	      }var at = { x: m, y: ax, width: aw - m, height: av - ax };return b(this, at, au);
	    };this.addPoint = function () {
	      j(this);var ar = this.pointNames;for (var m = 0; m < ar.length; m++) {
	        this[ar[m] + this.shapesCount] = arguments[m];
	      }this.shapesCount++;return this;
	    };this.delPoint = function (ar, av, m) {
	      j(this);if (av === z) {
	        var au = this.points();au.splice(ar, 1);this.points(au);
	      } else {
	        m = m || 0;for (var at = 0; at < this.shapesCount; at++) {
	          if (this["_x" + at] < ar + m && this["_x" + at] > ar - m && this["_y" + at] < av + m && this["_y" + at] < av + m) {
	            this.delPoint(at);at--;
	          }
	        }
	      }return this;
	    };this.points = function (au) {
	      var av = this.pointNames;if (au === z) {
	        au = [];for (var ar = 0; ar < this.shapesCount; ar++) {
	          au[ar] = [];for (var at = 0; at < av.length; at++) {
	            au[ar][at] = this[av[at] + ar];
	          }
	        }return au;
	      }j(this);var m = this.shapesCount;this.shapesCount = au.length;for (ar = 0; ar < this.shapesCount; ar++) {
	        for (at = 0; at < av.length; at++) {
	          this[av[at] + ar] = au[ar][at];
	        }
	      }for (ar = this.shapesCount; ar < m; ar++) {
	        for (at = 0; at < av.length; at++) {
	          this[av[at] + ar] = z;
	        }
	      }return this;
	    };this.base = function (ar, m, at) {
	      if (ar !== z) {
	        if (typeof ar.pop == "function") {
	          ar = { points: ar, color: m, fill: at };
	        }
	      }w.lines.prototype.base.call(this, ar);this.shapesCount = 0;if (ar !== z) {
	        if (ar.points !== z) {
	          this.points(ar.points);
	        }
	      }return this;
	    };
	  };w.lines.prototype = new w.shape();w.line = function () {
	    this.draw = function (m) {
	      if (this._x0 === z) {
	        return;
	      }m.moveTo(this._x0, this._y0);for (var ar = 1; ar < this.shapesCount; ar++) {
	        m.lineTo(this["_x" + ar], this["_y" + ar]);
	      }
	    };this.base = function (ar, m, at) {
	      w.line.prototype.base.call(this, ar, m, at);return this;
	    };this._proto = "line";this.pointNames = ["_x", "_y"];
	  };w.line.prototype = new w.lines();w.qCurve = function () {
	    this.draw = function (m) {
	      if (this._x0 === z) {
	        return;
	      }m.moveTo(this._x0, this._y0);for (var ar = 1; ar < this.shapesCount; ar++) {
	        m.quadraticCurveTo(this["_cp1x" + ar], this["_cp1y" + ar], this["_x" + ar], this["_y" + ar]);
	      }
	    };this.base = function (ar, m, at) {
	      w.qCurve.prototype.base.call(this, ar, m, at);return this;
	    };this._proto = "qCurve";this.pointNames = ["_x", "_y", "_cp1x", "_cp1y"];
	  };w.qCurve.prototype = new w.lines();w.bCurve = function () {
	    this.draw = function (m) {
	      if (this._x0 === z) {
	        return;
	      }m.moveTo(this._x0, this._y0);for (var ar = 1; ar < this.shapesCount; ar++) {
	        m.bezierCurveTo(this["_cp1x" + ar], this["_cp1y" + ar], this["_cp2x" + ar], this["_cp2y" + ar], this["_x" + ar], this["_y" + ar]);
	      }
	    };this.base = function (ar, m, at) {
	      w.bCurve.prototype.base.call(this, ar, m, at);return this;
	    };this._proto = "bCurve";this.pointNames = ["_x", "_y", "_cp1x", "_cp1y", "_cp2x", "_cp2y"];
	  };w.bCurve.prototype = new w.lines();w.circle = function () {
	    this.getCenter = function (m) {
	      return R(this, { x: this._x, y: this._y }, m);
	    };this.getRect = function (ar) {
	      var m = { x: Math.floor(this._x - this._radius), y: Math.floor(this._y - this._radius) };m.width = m.height = Math.ceil(this._radius) * 2;return b(this, m, ar);
	    };this.draw = function (m) {
	      m.arc(this._x, this._y, this._radius, 0, v, true);
	    };this.base = function (ar, av, m, at, au) {
	      if (typeof ar != "object") {
	        ar = { x: ar, y: av, radius: m, color: at, fill: au };
	      }ar = af(ar, { radius: 0 });w.circle.prototype.base.call(this, ar);this._radius = ar.radius;return this;
	    };this._proto = "circle";
	  };w.circle.prototype = new w.shape();w.rect = function () {
	    this.getRect = function (m) {
	      return b(this, { x: this._x, y: this._y, width: this._width, height: this._height }, m);
	    };this.draw = function (m) {
	      m.rect(this._x, this._y, this._width, this._height);
	    };this.base = function (ar, aw, au, m, at, av) {
	      if (typeof ar != "object") {
	        ar = { x: ar, y: aw, width: au, height: m, color: at, fill: av };
	      }ar = af(ar, { width: 0, height: 0 });w.rect.prototype.base.call(this, ar);this._width = ar.width;this._height = ar.height;return this;
	    };this._proto = "rect";
	  };w.rect.prototype = new w.shape();w.arc = function () {
	    this.getRect = function (ay) {
	      var az = { x: this._x, y: this._y },
	          ax = this._startAngle,
	          m = this._endAngle,
	          aw = this._radius,
	          au = O(L(ax / E) * aw),
	          av = O(y(ax / E) * aw),
	          aA = O(L(m / E) * aw),
	          aB = O(y(m / E) * aw),
	          at = av > 0 && aB > 0,
	          ar = av < 0 && aB < 0,
	          aD = au > 0 && aA > 0,
	          aC = au < 0 && aA < 0;az.width = az.height = aw;if (this._anticlockwise && ax < m || !this._anticlockwise && ax > m) {
	        if (ar || at && (aC || aD) || av == 0 && aB == 0) {
	          az.y -= aw;az.height += aw;
	        } else {
	          if (at && aA < 0 && au > 0) {
	            az.y += aA;az.height += aA;
	          } else {
	            if (aB > 0 && aA < 0 && av < 0) {
	              az.y += i(aA, au);az.height -= i(aA, au);
	            } else {
	              if (aC) {
	                az.y -= U(aA, au);
	              } else {
	                az.y -= aw;
	              }az.height += U(aA, au);
	            }
	          }
	        }if (aD || aC && (ar || at) || au == 0 && aA == 0) {
	          az.x -= aw;az.width += aw;
	        } else {
	          if (aA < 0 && au > 0) {
	            az.x += i(aB, av);az.width -= i(aB, av);
	          } else {
	            if (ar) {
	              az.x -= U(aB, av);
	            } else {
	              az.x -= aw;
	            }az.width += U(aB, av);
	          }
	        }
	      } else {
	        at = av >= 0 && aB >= 0;aD = au >= 0 && aA >= 0;ar = av <= 0 && aB <= 0;aC = au <= 0 && aA <= 0;if (aC && at) {
	          az.x += i(aB, av);az.width -= i(aB, av);az.y += i(aA, au);az.height += U(aA, au);
	        } else {
	          if (aC && ar) {
	            az.x += i(aB, av);az.width += U(aB, av);az.y += i(aA, au);az.height += U(aA, au);
	          } else {
	            if (aC) {
	              az.x += i(aB, av);az.width += U(aB, av);az.y -= aw;az.height += U(aA, au);
	            } else {
	              if (at && aD) {
	                az.x += i(aB, av);az.width = Z(aB - av);az.y += i(aA, au);az.height -= i(aA, au);
	              } else {
	                if (aD) {
	                  az.x += i(aB, av);az.width = Z(aB) + Z(av);az.y += i(aA, au);az.height -= i(aA, au);
	                } else {
	                  if (ar) {
	                    az.x -= aw;az.width += U(aB, av);az.y -= aw;az.height += U(aA, au);
	                  } else {
	                    if (at) {
	                      az.x -= aw;az.width += U(aB, av);az.y -= aw;az.height += aw;
	                    }
	                  }
	                }
	              }
	            }
	          }
	        }
	      }return b(this, az, ay);
	    };this.draw = function (m) {
	      m.arc(this._x, this._y, this._radius, this._startAngle / E, this._endAngle / E, this._anticlockwise);
	    };this.base = function (ar, ay, m, av, au, aw, at, ax) {
	      if (aw !== z) {
	        if (aw.charAt) {
	          at = aw;
	        }if (aw) {
	          aw = true;
	        } else {
	          aw = false;
	        }
	      }if (typeof ar != "object") {
	        ar = { x: ar, y: ay, radius: m, startAngle: av, endAngle: au, anticlockwise: aw, color: at, fill: ax };
	      }ar = af(ar, { radius: 0, startAngle: 0, endAngle: 0, anticlockwise: true });w.arc.prototype.base.call(this, ar);this._radius = ar.radius;this._startAngle = ar.startAngle;this._endAngle = ar.endAngle;this._anticlockwise = ar.anticlockwise;return this;
	    };this._proto = "arc";
	  };w.arc.prototype = new w.shape();w.text = function () {
	    this.font = function (m) {
	      return this.attr("font", m);
	    };this._font = "10px sans-serif";this.align = function (m) {
	      return this.attr("align", m);
	    };this._align = "start";this.baseline = function (m) {
	      return this.attr("baseline", m);
	    };this._baseline = "alphabetic";this.string = function (m) {
	      return this.attr("string", m);
	    };this.position = function () {
	      var ar = { x: this._x, y: this._y },
	          m = D(this).optns.ctx;ar.height = parseInt(this._font.match(Q)[0]);ar.y -= ar.height;m.save();m.textBaseline = this._baseline;m.font = this._font;m.textAlign = this._align;ar.width = m.measureText(this._string).width;m.restore();return b(this, ar);
	    };this.getRect = function (at) {
	      var ar = { x: this._x, y: this._y },
	          m = D(this).optns.ctx;ar.height = parseInt(this._font.match(Q)[0]);ar.y -= ar.height;m.save();m.textBaseline = this._baseline;m.font = this._font;m.textAlign = this._align;ar.width = m.measureText(this._string).width;if (this._align == "center") {
	        ar.x -= ar.width / 2;
	      }if (this._align == "right") {
	        ar.x -= ar.width;
	      }m.restore();return b(this, ar, at);
	    };this.setOptns = function (m) {
	      w.text.prototype.setOptns.call(this, m);m.textBaseline = this._baseline;m.font = this._font;m.textAlign = this._align;
	    };this.draw = function (m) {
	      if (this._maxWidth === false) {
	        if (this._fill) {
	          m.fillText(this._string, this._x, this._y);
	        } else {
	          m.strokeText(this._string, this._x, this._y);
	        }
	      } else {
	        if (this._fill) {
	          m.fillText(this._string, this._x, this._y, this._maxWidth);
	        } else {
	          m.strokeText(this._string, this._x, this._y, this._maxWidth);
	        }
	      }
	    };this.base = function (at, m, aw, au, ar, av) {
	      if (au !== z) {
	        if (au.charAt) {
	          if (ar !== z) {
	            av = ar;
	          }ar = au;au = false;
	        }
	      }if (typeof at != "object") {
	        at = { string: at, x: m, y: aw, maxWidth: au, color: ar, fill: av };
	      }at = af(at, { string: "", maxWidth: false, fill: 1 });w.text.prototype.base.call(this, at);this._string = at.string;this._maxWidth = at.maxWidth;return this;
	    };this._proto = "text";
	  };w.text.prototype = new w.shape();w.grdntsnptrn = function () {
	    this.layer = function (ar) {
	      return e(ar, this, "grdntsnptrns");
	    };this.canvas = function (ar) {
	      return n(ar, this, "grdntsnptrns");
	    };var m = new w.object();this.animate = m.animate;this.attr = m.attr;this.id = m.id;this.name = m.name;this.level = m.level;this.base = function () {
	      this.animateQueue = [];this.optns = { animated: false, name: "", layer: { id: ad[0].optns.id + "Layer_0", number: 0 }, canvas: { number: 0 }, visible: true };this.optns.layer.id = ad[X].optns.id + "Layer_0";this.optns.layer.number = 0;this.optns.canvas.number = X;var ar = ad[X].layers[0].grdntsnptrns;this._level = ar.length;ar[this._level] = this;j(this);
	    };return this;
	  };w.gradients = function () {
	    this.colorStopsCount = 0;this.paramNames = ["_pos", "_colorR", "_colorG", "_colorB", "_alpha"];this.addColorStop = function (au, ar) {
	      j(this);var m = s(ar);var at = this.colorStopsCount;this["_pos" + at] = au;this["_colorR" + at] = m.r;this["_colorG" + at] = m.g;this["_colorB" + at] = m.b;this["_alpha" + at] = m.a;this.colorStopsCount++;return this;
	    };this.animate = function (av, ax, ay, aw, au) {
	      for (var at in av) {
	        if (at.substr(0, 5) == "color") {
	          var ar = at.substring(5);var m = s(av[at]);av["colorR" + ar] = m.r;av["colorG" + ar] = m.g;av["colorB" + ar] = m.b;av["alpha" + ar] = m.a;
	        }
	      }w.gradients.prototype.animate.call(this, av, ax, ay, aw, au);
	    };this.delColorStop = function (ar) {
	      j(this);var m = this.colorStops();m.splice(ar, 1);if (m.length > 0) {
	        this.colorStops(m);
	      } else {
	        this.colorStopsCount = 0;
	      }return this;
	    };this.colorStops = function (aw) {
	      var av = this.paramNames;if (aw === z) {
	        aw = [];for (var at = 0; at < this.colorStopsCount; at++) {
	          aw[at] = [];for (var au = 0; au < av.length; au++) {
	            aw[at][au] = this[av[au] + at];
	          }
	        }return aw;
	      }j(this);var ar = this.colorStopsCount;var m = aw.length;if (aw[0].length == 2) {
	        for (at = 0; at < m; at++) {
	          this.addColorStop(aw[at][0], aw[at][1]);
	        }
	      } else {
	        for (at = 0; at < m; at++) {
	          for (au = 0; au < av.length; au++) {
	            this[av[au] + at] = aw[at][au];
	          }
	        }
	      }for (at = m; at < ar; at++) {
	        for (au = 0; au < av.length; au++) {
	          this[av[au] + at] = z;
	        }
	      }this.colorStopsCount = m;return this;
	    };this.base = function (m) {
	      w.gradients.prototype.base.call(this);if (m == z) {
	        return this;
	      } else {
	        return this.colorStops(m);
	      }
	    };
	  };w.gradients.prototype = new w.grdntsnptrn();w.pattern = function () {
	    this.create = function (m) {
	      if (this.optns.animated) {
	        F.call(this, m);
	      }this.val = m.ctx.createPattern(this._img, this._type);
	    };this.base = function (ar, m) {
	      if (ar.onload) {
	        ar = { image: ar, type: m };
	      }ar = af(ar, { type: "repeat" });w.pattern.prototype.base.call(this);this._img = ar.image;this._type = ar.type;return this;
	    };this._proto = "pattern";
	  };w.pattern.prototype = new w.grdntsnptrn();w.lGradient = function () {
	    this.create = function (ar) {
	      if (this.optns.animated) {
	        F.call(this, ar);
	      }this.val = ar.ctx.createLinearGradient(this._x1, this._y1, this._x2, this._y2);for (var m = 0; m < this.colorStopsCount; m++) {
	        this.val.addColorStop(this["_pos" + m], "rgba(" + parseInt(this["_colorR" + m]) + "," + parseInt(this["_colorG" + m]) + "," + parseInt(this["_colorB" + m]) + "," + this["_alpha" + m] + ")");
	      }
	    };this.base = function (at, av, ar, au, m) {
	      if (typeof at !== "object") {
	        at = { x1: at, y1: av, x2: ar, y2: au, colors: m };
	      }at = af(at, { x1: 0, y1: 0, x2: 0, y2: 0 });w.lGradient.prototype.base.call(this, at.colors);this._x1 = at.x1;this._y1 = at.y1;this._x2 = at.x2;this._y2 = at.y2;return this;
	    };this._proto = "lGradient";
	  };w.lGradient.prototype = new w.gradients();w.rGradient = function () {
	    this.create = function (ar) {
	      if (this.optns.animated) {
	        F.call(this);
	      }this.val = ar.ctx.createRadialGradient(this._x1, this._y1, this._r1, this._x2, this._y2, this._r2);for (var m = 0; m < this.colorStopsCount; m++) {
	        this.val.addColorStop(this["_pos" + m], "rgba(" + parseInt(this["_colorR" + m]) + "," + parseInt(this["_colorG" + m]) + "," + parseInt(this["_colorB" + m]) + "," + this["_alpha" + m] + ")");
	      }
	    };this.base = function (av, ax, au, at, aw, ar, m) {
	      if (typeof av !== "object") {
	        av = { x1: av, y1: ax, r1: au, x2: at, y2: aw, r2: ar, colors: m };
	      }av = af(av, { x1: 0, y1: 0, r1: 0, x2: 0, y2: 0, r2: 0 });w.rGradient.prototype.base.call(this, av.colors);this._x1 = av.x1;this._y1 = av.y1;this._r1 = av.r1;this._x2 = av.x2;this._y2 = av.y2;this._r2 = av.r2;return this;
	    };this._proto = "rGradient";
	  };w.rGradient.prototype = new w.gradients();w.layer = function () {
	    this.position = function () {
	      var av = this.objs,
	          au,
	          m,
	          at,
	          ar = av.length;for (at = 0; at < ar; at++) {
	        m = av[at].position();if (au === z) {
	          au = m;
	        }if (au.x > m.x) {
	          au.x = m.x;
	        }if (au.y > m.y) {
	          au.y = m.y;
	        }
	      }return au;
	    };this.getRect = function (au) {
	      var aw = this.objs,
	          at,
	          av,
	          ar,
	          m = aw.length;if (aw.length == 0) {
	        return false;
	      }if (au == "coords") {
	        for (ar = 0; ar < m; ar++) {
	          av = aw[ar].getRect(au);if (at === z) {
	            at = av;
	          }if (at[0][0] > av[0][0]) {
	            at[0][0] = av[0][0];
	          }if (at[0][1] > av[0][1]) {
	            at[0][1] = av[0][1];
	          }if (at[1][0] < av[1][0]) {
	            at[1][0] = av[1][0];
	          }if (at[1][1] > av[1][1]) {
	            at[1][1] = av[1][1];
	          }if (at[2][0] > av[2][0]) {
	            at[2][0] = av[2][0];
	          }if (at[2][1] < av[2][1]) {
	            at[2][1] = av[2][1];
	          }if (at[3][0] < av[3][0]) {
	            at[3][0] = av[3][0];
	          }if (at[3][1] < av[3][1]) {
	            at[3][1] = av[3][1];
	          }
	        }return at;
	      }for (ar = 0; ar < m; ar++) {
	        av = aw[ar].getRect(au);av.right = av.width + av.x;av.bottom = av.height + av.y;if (at === z) {
	          at = av;
	        }if (at.x > av.x) {
	          at.x = av.x;
	        }if (at.y > av.y) {
	          at.y = av.y;
	        }if (at.right < av.right) {
	          at.right = av.right;
	        }if (at.bottom < av.bottom) {
	          at.bottom = av.bottom;
	        }
	      }at.width = at.right - at.x;at.height = at.bottom - at.y;return at;
	    };this.canvas = function (ar) {
	      if (ar === z) {
	        return this.idCanvas;
	      }if (this.optns.canvas.id == ar) {
	        return this;
	      }var av = -1,
	          m = 0,
	          ax = ad.length;for (var au = 0; au < ax; au++) {
	        var aw = ad[au].optns.id;if (aw == ar) {
	          av = au;
	        }if (aw == this.optns.canvas.id) {
	          m = au;
	        }
	      }if (av < 0) {
	        av = ad.length;P.canvas(ar);
	      }this.optns.canvas.id = ar;this.optns.canvas.number = av;ad[m].layers.splice(this.optns.number, 1);var at = ad[av].layers;this._level = this.optns.number = at.length;at[this._level] = this;l(this.objs, this.optns.id, this._level, ar, av);l(this.grdntsnptrns, this.optns.id, this._level, ar, av);ad[av].optns.redraw = 1;return this;
	    };this.up = function (ar) {
	      if (ar === z) {
	        ar = 1;
	      }if (ar == "top") {
	        this.level(ar);
	      } else {
	        var m = D(this).layers[this.optns.number + ar];if (m !== z) {
	          ar = m._level + 1 - this._level;
	        }this.level(this._level + ar);
	      }return this;
	    };this.down = function (ar) {
	      if (ar == z) {
	        ar = 1;
	      }if (ar == "bottom") {
	        this.level(ar);
	      } else {
	        var m = D(this).layers[this.optns.number - ar];if (m !== z) {
	          ar = this._level - (m._level - 1);
	        }this.level(this._level - ar);
	      }return this;
	    };this.level = function (at) {
	      if (at == z) {
	        return this._level;
	      }var ar = D(this),
	          m = ar.optns;if (at == "bottom") {
	        if (this.optns.number == 0) {
	          at = this._level;
	        } else {
	          at = ar.layers[0]._level - 1;
	        }
	      }if (at == "top") {
	        if (this.optns.number == ar.layers.length - 1) {
	          at = this._level;
	        } else {
	          at = ar.layers[ar.layers.length - 1]._level + 1;
	        }
	      }this._level = at;m.anyLayerLevelChanged = true;m.redraw = 1;return this;
	    };this.del = function () {
	      var m = D(this).optns;m.anyLayerDeleted = true;this.optns.deleted = true;this.draw = false;m.redraw = 1;return;
	    };this.setOptns = function (m) {
	      m.setTransform(1, 0, 0, 1, 0, 0);w.layer.prototype.setOptns.call(this, m);return this;
	    };this.afterDraw = function (m) {
	      m.ctx.closePath();m.ctx.restore();if (this.optns.clipObject) {
	        w.layer.prototype.afterDraw.call(this.optns.clipObject, m);
	      }
	    };this.clone = function (at, m) {
	      var ar = P.layer(at);J(ar, this);J(ar.optns.transformMatrix, this.optns.transformMatrix);J(ar.optns.translateMatrix, this.optns.translateMatrix);J(ar.optns.scaleMatrix, this.optns.scaleMatrix);J(ar.optns.rotateMatrix, this.optns.rotateMatrix);ar.canvas(D(this).optns.id);if (m === z) {
	        return ar;
	      }return ar.animate(m);
	    };this.isPointIn = function (m, av, at) {
	      var au = this.objs,
	          ar;for (ar = 0; ar < au.length; ar++) {
	        if (au[ar].isPointIn(m, av, at)) {
	          return true;
	        }
	      }return false;
	    };this.opacity = function (at) {
	      var ar = this.objs;for (var m = 0; m < ar.length; m++) {
	        ar[m].attr("opacity", at);
	      }return this;
	    };this.fadeTo = function (aw, au, ax, at, ar) {
	      if (au === z) {
	        au = 600;
	      }var av = this.objs;for (var m = 0; m < av.length; m++) {
	        av[m].animate({ opacity: aw }, au, ax, at, ar);
	      }return this;
	    };this.draw = function (ax) {
	      var at = this.optns,
	          av = at.buffer,
	          m = ax.ctx;if (av.val) {
	        m.drawImage(av.cnv, av.x, av.y);return this;
	      }for (var au = 0; au < this.grdntsnptrns.length; au++) {
	        this.grdntsnptrns[au].create(ax);
	      }if (at.anyObjLevelChanged) {
	        T(this.objs);at.anyObjLevelChanged = false;
	      }if (at.anyObjDeleted) {
	        W(this.objs);at.anyObjDeleted = false;
	      }m.globalCompositeOperation = at.gCO;for (au = 0; au < this.objs.length; au++) {
	        var ar = this.objs[au];if (typeof ar.draw == "function") {
	          this.setOptns(m);if (ar.beforeDraw(ax)) {
	            if (typeof ar.draw == "function") {
	              var aw = ar.optns.buffer;if (aw.val) {
	                m.drawImage(aw.cnv, aw.x, aw.y);
	              } else {
	                ar.draw(m);
	              }if (av.optns) {
	                ar.afterDraw(av.optns);
	              } else {
	                ar.afterDraw(ax);
	              }
	            }
	          }
	        }
	      }return this;
	    };this.objects = function (at) {
	      var ar = G(),
	          m = 0;while (this.objs[m] !== z) {
	        ar.elements[m] = this.objs[m++];
	      }if (at !== z) {
	        return ar.find(at);
	      }return ar;
	    };this.base = function (aw) {
	      var ar = ad[X],
	          av = ar.layers,
	          at = ar.optns;w.layer.prototype.base.call(this, 0, 0, true);var m = av.length;av[m] = this;this.objs = [];this.grdntsnptrns = [];this._level = m ? av[m - 1]._level + 1 : 0;this.optns.number = m;this.optns.id = aw;var au = this.optns;au.anyObjDeleted = false;au.anyObjLevelChanged = false;au.gCO = at.gCO;au.canvas.id = at.id;au.canvas.number = X;return this;
	    };this._proto = "layer";
	  };w.layer.prototype = new w.object();function aa(ar) {
	    var m = new w.layer();return m.base(ar);
	  }w.imageData = function () {
	    this.filter = function (m, at) {
	      var ar = g[m];ar.fn.call(this, this._width, this._height, ar.matrix, at);return this;
	    };this.getRect = function (ar) {
	      var m = { x: this._x, y: this._y, width: this._width, height: this._height };return b(this, m, ar);
	    };this.setPixel = function (ar, av, at) {
	      var m,
	          au = (ar + av * this._width) * 4;if (at.r !== z) {
	        m = at;
	      } else {
	        if (at[0] !== z) {
	          if (!at.charAt) {
	            m = { r: at[0], g: at[1], b: at[2], a: at[3] };
	          } else {
	            m = s(at);
	          }
	        }
	      }this._data[au + 0] = m.r;this._data[au + 1] = m.g;this._data[au + 2] = m.b;this._data[au + 3] = m.a * 255;j(this);return this;
	    };this.getPixel = function (m, at) {
	      var ar = (m + at * this._width) * 4;return [this._data[ar + 0], this._data[ar + 1], this._data[ar + 2], this._data[ar + 3] / 255];
	    };this._getX = 0;this._getY = 0;this.getData = function (ar, aw, au, m) {
	      this._getX = ar;this._getY = aw;this._width = au;this._height = m;var at = D(this).optns.ctx;try {
	        this._imgData = at.getImageData(this._getX, this._getY, this._width, this._height);
	      } catch (av) {
	        netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");this._imgData = at.getImageData(this._getX, this._getY, this._width, this._height);
	      }this._data = this._imgData.data;j(this);return this;
	    };this.putData = function (m, ar) {
	      if (m !== z) {
	        this._x = m;
	      }if (ar !== z) {
	        this._y = ar;
	      }this._putData = true;j(this);return this;
	    };this.clone = function () {
	      var m = w.imageData.prototype.clone.call(this);m._imgData = z;return m;
	    };this.draw = function (m) {
	      if (this._imgData === z) {
	        this._imgData = m.createImageData(this._width, this._height);for (var ar = 0; ar < this._width * this._height * 4; ar++) {
	          this._imgData.data[ar] = this._data[ar];
	        }this._data = this._imgData.data;
	      }if (this._putData) {
	        m.putImageData(this._imgData, this._x, this._y);
	      }
	    };this.base = function (av, m) {
	      w.imageData.prototype.base.call(this);if (m === z) {
	        var aw = av;if (aw._width !== z) {
	          av = aw._width;m = aw._height;
	        } else {
	          av = af(av, { width: 0, height: 0 });m = av.height;av = av.width;
	        }
	      }this._width = av;this._height = m;this._data = [];for (var au = 0; au < this._width; au++) {
	        for (var at = 0; at < this._height; at++) {
	          var ar = (au + at * this._width) * 4;this._data[ar + 0] = 0;this._data[ar + 1] = 0;this._data[ar + 2] = 0;this._data[ar + 3] = 0;
	        }
	      }return this;
	    };this._putData = false;this._proto = "imageData";
	  };w.imageData.prototype = new w.object();w.image = function () {
	    this.getRect = function (ar) {
	      var m = { x: this._x, y: this._y, width: this._width, height: this._height };return b(this, m, ar);
	    };this.draw = function (m) {
	      m.drawImage(this._img, this._sx, this._sy, this._swidth, this._sheight, this._x, this._y, this._width, this._height);
	    };this.base = function (at, ay, av, m, az, ax, aw, au, ar) {
	      if (typeof at != "object" || at.src !== z || at.nodeName !== z) {
	        at = { image: at, x: ay, y: av, width: m, height: az, sx: ax, sy: aw, swidth: au, sheight: ar };
	      }at = af(at, { width: false, height: false, sx: 0, sy: 0, swidth: false, sheight: false });if (at.width === false) {
	        at.width = at.image.width;at.height = at.image.height;
	      }if (at.swidth === false) {
	        at.swidth = at.image.width;at.sheight = at.image.height;
	      }w.image.prototype.base.call(this, at);this._img = at.image;this._width = at.width;this._height = at.height;this._sx = at.sx;this._sy = at.sy;this._swidth = at.swidth;this._sheight = at.sheight;return this;
	    };this._proto = "image";
	  };w.image.prototype = new w.object();w.groups = function () {
	    for (var m in w) {
	      if (m == "group" || m == "groups") {
	        continue;
	      }var at = new w[m]();for (var ar in at) {
	        if (typeof at[ar] == "function" && this[ar] === z) {
	          (function (av, au) {
	            av[au] = function () {
	              var az = [];var aw = [];var ay = 0;while (arguments[ay] !== z) {
	                aw[ay] = arguments[ay++];
	              }for (ay = 0; ay < this.elements.length; ay++) {
	                var ax = this.elements[ay];J(az, aw);if (typeof ax[au] == "function") {
	                  ax[au].apply(ax, az);
	                }
	              }return this;
	            };
	          })(this, ar);
	        }
	      }
	    }this.reverse = function () {
	      var au = this.elements;this.elements = this.unmatchedElements;this.unmatchedElements = au;return this;
	    };this.end = function (au) {
	      if (this.previousGroup === z || au === 0) {
	        return this;
	      }if (au !== z) {
	        au--;
	      }return this.previousGroup.end(au);
	    };this.find = function (au) {
	      var aC = G(),
	          aB = au.attrs,
	          aD = au.fns || [],
	          aw,
	          av,
	          ax,
	          aE,
	          aA,
	          az,
	          ay;aC.previousGroup = this;for (aw = 0; aw < this.elements.length; aw++) {
	        aC.elements[aw] = this.elements[aw];
	      }if (aB !== z) {
	        for (av in aB) {
	          if (aB.hasOwnProperty(av)) {
	            if (typeof aB[av] != "object") {
	              aB[av] = { val: aB[av], rel: "==" };
	            }aD[aD.length] = { fn: "attr", args: [av], val: aB[av].val, rel: aB[av].rel };
	          }
	        }
	      }if (aD.length) {
	        for (aw = 0; aw < aC.elements.length; aw++) {
	          ax = aC.elements[aw];for (av = 0; av < aD.length; av++) {
	            aA = aD[av];ay = aA.val;aE = aA.rel;if (typeof ax[aA.fn] == "function") {
	              az = ax[aA.fn].apply(ax, aA.args);
	            } else {
	              aE = "del";
	            }switch (aE) {case "!=":
	                if (!(az != ay)) {
	                  aE = "del";
	                }break;case "!==":
	                if (!(az !== ay)) {
	                  aE = "del";
	                }break;case "==":
	                if (!(az == ay)) {
	                  aE = "del";
	                }break;case "===":
	                if (!(az === ay)) {
	                  aE = "del";
	                }break;case ">=":
	                if (!(az >= ay)) {
	                  aE = "del";
	                }break;case "<=":
	                if (!(az <= ay)) {
	                  aE = "del";
	                }break;case ">":
	                if (!(az > ay)) {
	                  aE = "del";
	                }break;case "<":
	                if (!(az < ay)) {
	                  aE = "del";
	                }break;case "typeof":
	                if (!(typeof az == ay)) {
	                  aE = "del";
	                }break;}if (aE == "del") {
	              aC.unmatchedElements[aC.unmatchedElements.length] = ax;aC.elements.splice(aw, 1);aw--;break;
	            }
	          }
	        }
	      }return aC;
	    };this.base = function () {
	      this.elements = [];this.unmatchedElements = [];return this;
	    };
	  };w.group = function () {
	    this._proto = "group";
	  };w.group.prototype = new w.groups();function G() {
	    var m = new w.group();return m.base();
	  }P.addFunction = function (ar, at, m) {
	    w[m || "object"].prototype[ar] = at;return P;
	  };P.addObject = function (at, av, m, au) {
	    w[at] = function (aw) {
	      this.draw = w[aw].draw;this.base = w[aw].base;this._proto = aw;
	    };var ar = w[at];if (au === z) {
	      au = "shape";
	    }ar.prototype = new w[au]();ar.draw = m;ar.base = function (ax, aA, aw) {
	      ar.prototype.base.call(this, aA);var az = 0;for (var ay in aA) {
	        var aB = aw[az] !== z ? aw[az] : aA[ay];this["_" + ay] = aB;if (ay == "color") {
	          this.color(aB);
	        }az++;
	      }return this;
	    };(function (aw, ax) {
	      P[aw] = function () {
	        var ay = new w[aw](aw);return ay.base(aw, ax, arguments);
	      };
	    })(at, av);return P;
	  };P.addAnimateFunction = function (m, ar) {
	    h[m] = ar;return P;
	  };P.addImageDataFilter = function (m, ar) {
	    if (g[m] === z) {
	      g[m] = {};
	    }if (ar.fn !== z) {
	      g[m].fn = ar.fn;
	    }if (ar.matrix !== z && ar.type === z) {
	      g[m].matrix = ar.matrix;
	    }if (ar.type !== z) {
	      g[m].matrix[type] = ar.matrix;
	    }return P;
	  };P.clear = function (m) {
	    if (ad[0] === z) {
	      return P;
	    }if (m === z) {
	      ad[0].clear();return P;
	    }P.canvas(m).clear();return P;
	  };P.pause = function (m) {
	    if (m === z) {
	      ad[0].pause();return P;
	    }P.canvas(m).pause();return P;
	  };P.start = function (m, ar) {
	    P.canvas(m).start(ar);return P;
	  };P.pattern = function (m, ar) {
	    var at = new w.pattern();return at.base(m, ar);
	  };P.lGradient = function (at, av, ar, au, m) {
	    var aw = new w.lGradient();return aw.base(at, av, ar, au, m);
	  };P.rGradient = function (av, ax, au, at, aw, ar, m) {
	    var ay = new w.rGradient();return ay.base(av, ax, au, at, aw, ar, m);
	  };P.line = function (at, ar, au) {
	    var m = new w.line();return m.base(at, ar, au);
	  };P.qCurve = function (at, m, au) {
	    var ar = new w.qCurve();return ar.base(at, m, au);
	  };P.bCurve = function (ar, m, au) {
	    var at = new w.bCurve();return at.base(ar, m, au);
	  };P.imageData = function (ar, m) {
	    var at = new w.imageData();return at.base(ar, m);
	  };P.image = function (av, az, aw, m, aA, ay, ax, au, ar) {
	    var at = new w.image();return at.base(av, az, aw, m, aA, ay, ax, au, ar);
	  };P.circle = function (ar, aw, m, at, av) {
	    var au = new w.circle();return au.base(ar, aw, m, at, av);
	  };P.rect = function (ar, ax, au, m, at, aw) {
	    var av = new w.rect();return av.base(ar, ax, au, m, at, aw);
	  };P.arc = function (ay, ax, av, aw, ar, at, au, az) {
	    var m = new w.arc();return m.base(ay, ax, av, aw, ar, at, au, az);
	  };P.text = function (at, m, ax, au, ar, av) {
	    var aw = new w.text();return aw.base(at, m, ax, au, ar, av);
	  };P.canvas = function (ar) {
	    if (ar === z) {
	      return ad[0];
	    }var m = ad.length;for (var au = 0; au < m; au++) {
	      if (ad[au].optns) {
	        if (ad[au].optns.id == ar) {
	          return ad[au];
	        }
	      }
	    }var at = { id: function id(av) {
	        if (av === z) {
	          return this.optns.id;
	        }this.optns.id = av;return this;
	      } };ad[m] = at;X = m;at.cnv = document.getElementById(ar);if (false) {
	      if (typeof G_vmlCanvasManager !== "undefined") {
	        G_vmlCanvasManager.initElement(at.cnv);
	      }if (typeof FlashCanvas !== "undefined") {
	        FlashCanvas.initElement(at.cnv);
	      }
	    }at.width = function (av) {
	      if (av === z) {
	        return this.cnv.width;
	      }this.optns.width = this.cnv.width = av;this.cnv.style.width = av + "px";this.optns.redraw = 1;return this;
	    };at.height = function (av) {
	      if (av === z) {
	        return this.cnv.height;
	      }this.optns.heigth = this.cnv.height = av;this.cnv.style.height = av + "px";this.optns.redraw = 1;return this;
	    };at.optns = { id: ar, number: X, ctx: at.cnv.getContext("2d"), width: at.cnv.offsetWidth || at.cnv.width, height: at.cnv.offsetHeight || at.cnv.height, anyLayerDeleted: false, anyLayerLevelChanged: false, keyDown: { val: false, code: false }, keyUp: { val: false, code: false }, keyPress: { val: false, code: false }, mousemove: { val: false, x: false, y: false, object: false }, click: { val: false, x: false, y: false, objects: [] }, dblclick: { val: false, x: false, y: false, objects: [] }, mouseup: { val: false, x: false, y: false, objects: [] }, mousedown: { val: false, x: false, y: false, objects: [] }, drag: { object: false, x: 0, y: 0 }, gCO: "source-over", redraw: 1 };at.toDataURL = function () {
	      return at.cnv.toDataURL.apply(at.cnv, arguments);
	    };at.layers = [];at.interval = 0;P.layer(ar + "Layer_0").canvas(ar);at.recalculateOffset = function () {
	      var av = C(this.cnv);this.optns.x = av.left + (parseInt(this.cnv.style.borderTopWidth) || 0);this.optns.y = av.top + (parseInt(this.cnv.style.borderLeftWidth) || 0);return this;
	    };at.start = function (ax) {
	      X = this.optns.number;if (ax) {
	        if (this.interval) {
	          return this;
	        }this.isAnimated = ax;this.recalculateOffset();var aw = ad[this.optns.number],
	            av = aw.optns;this.cnv.onclick = function (ay) {
	          u(ay, "click", av);
	        };this.cnv.ondblclick = function (az) {
	          u(az, "dblclick", av);var ay = av.mousemove.val;av.mousemove.val = true;setTimeout(function () {
	            av.mousemove.val = ay;
	          }, 3000);
	        };this.cnv.onmousedown = function (ay) {
	          u(ay, "mousedown", av);
	        };this.cnv.onmouseup = function (ay) {
	          u(ay, "mouseup", av);
	        };this.cnv.onkeyup = function (ay) {
	          ag(ay, "keyUp", av);
	        };this.cnv.onkeydown = function (ay) {
	          ag(ay, "keyDown", av);
	        };this.cnv.onkeypress = function (ay) {
	          ag(ay, "keyPress", av);
	        };this.cnv.onmouseout = this.cnv.onmousemove = function (ay) {
	          u(ay, "mousemove", av);
	        };av.timeLast = new Date();this.interval = c(function (ay) {
	          aw.interval = aw.interval || 1;aw.frame(ay);
	        }, this.cnv);
	      } else {
	        return this.frame();
	      }return this;
	    };at.pause = function () {
	      I(this.interval);this.interval = 0;return this;
	    };at.restart = function () {
	      return this.pause().start(true);
	    };at.del = function () {
	      I(this.interval);this.layers = [];ad.splice(this.optns.number, 1);for (var ay = 0; ay < ad.length; ay++) {
	        var aw = ad[ay],
	            az = aw.layers,
	            aA = az.length;aw.optns.number = ay;for (var av = 0; av < aA; av++) {
	          var ax = az[av];ax.optns.canvas.number = ay;l(ax.objs, ax.optns.id, ax.optns.number, aw.optns.id, aw.optns.number);l(ax.grdntsnptrns, ax.optns.id, ax.optns.number, aw.optns.id, aw.optns.number);
	        }
	      }if (this.cnv.parentNode) {
	        this.cnv.parentNode.removeChild(this.cnv);
	      }X = 0;return false;
	    };at.clear = function () {
	      I(this.interval);this.interval = 0;this.layers = [];P.layer(this.optns.id + "Layer_0").canvas(this.optns.id);this.optns.ctx.clearRect(0, 0, this.optns.width, this.optns.height);this.optns.redraw++;return this;
	    };at.frame = function (az) {
	      var aA = this.optns,
	          aw = this;az = az || new Date();aA.timeDiff = az - aA.timeLast;aA.timeLast = az;if (this.interval) {
	        this.interval = c(function (aW) {
	          aw.frame(aW);
	        }, aw.cnv);this.interval = this.interval || 1;
	      }if (!aA.redraw) {
	        return this;
	      }aA.redraw--;aA.ctx.clearRect(0, 0, aA.width, aA.height);if (this.layers.length == 0) {
	        return this;
	      }m = this.layers.length;if (aA.anyLayerLevelChanged) {
	        m = T(this.layers);
	      }if (aA.anyLayerDeleted) {
	        m = W(this.layers);
	      }if (aA.anyLayerLevelChanged || aA.anyLayerDeleted) {
	        aA.anyLayerLevelChanged = aA.anyLayerDeleted = false;for (var aJ = 0; aJ < m; aJ++) {
	          var aU = this.layers[aJ],
	              aB = aU.optns;l(aU.objs, aB.id, aB.number, this.optns.id, this.optns.number);l(aU.grdntsnptrns, aB.id, aB.number, ar, this.optns.number);
	        }
	      }for (aJ = 0; aJ < m; aJ++) {
	        var aV = this.layers[aJ];if (typeof aV.draw == "function") {
	          if (aV.beforeDraw(aA)) {
	            if (typeof aV.draw == "function") {
	              aV.draw(aA);aV.afterDraw(aA);
	            }
	          }
	        }
	      }var aM = aA.mousemove;var aS = aA.mousedown;var aP = aA.mouseup;var aD = this.optns.click;var aK = this.optns.dblclick;if (aM.x != false) {
	        if (aA.drag.object != false) {
	          var aL = aA.drag,
	              av = aL.object;av.translate(aM.x - aL.x, aM.y - aL.y);aL.x = aM.x;aL.y = aM.y;if (aL.drag) {
	            aL.drag.call(av, { x: aM.x, y: aM.y });
	          }
	        }var aF = this.optns.point || {};aF.event = aM.event;if (aM.object != false) {
	          var aN = aM.object,
	              aC = aj(aN);if (N === aN) {
	            if (typeof aN.onmousemove === "function") {
	              aN.onmousemove(aF);
	            }if (aC === ae) {
	              if (typeof aC.onmousemove === "function") {
	                aC.onmousemove(aF);
	              }
	            } else {
	              if (ae) {
	                if (typeof ae.onmouseout === "function") {
	                  ae.onmouseout(aF);
	                }
	              }if (typeof aC.onmouseover === "function") {
	                aC.onmouseover(aF);
	              }ae = aC;
	            }
	          } else {
	            if (N) {
	              if (typeof N.onmouseout === "function") {
	                N.onmouseout(aF);
	              }
	            }if (typeof aN.onmouseover === "function") {
	              aN.onmouseover(aF);
	            }N = aN;
	          }
	        } else {
	          if (N) {
	            if (typeof N.onmouseout == "function") {
	              N.onmouseout(aF);
	            }N = false;
	          }if (ae) {
	            if (typeof ae.onmouseout == "function") {
	              ae.onmouseout(aF);
	            }ae = false;
	          }
	        }aA.mousemove.object = false;
	      }if (aS.objects.length) {
	        var aQ = aS.objects.length - 1;mdCicle: for (aJ = aQ; aJ > -1; aJ--) {
	          var aT = [aS.objects[aJ], aj(aS.objects[aJ])],
	              aR;for (var aH = 0; aH < 2; aH++) {
	            aR = aT[aH];if (aR.optns.drag.val == true && aR.optns.drag.disabled == false && aJ == aQ) {
	              aL = aA.drag;av = aL.object = aR.optns.drag.object.visible(true);aL.drag = aR.optns.drag.drag;aL.init = aR;var aI = aL.init.optns;if (aI.drag.params !== z) {
	                av.animate(aI.drag.params);
	              }aL.x = aL.startX = aS.x;aL.y = aL.startY = aS.y;if (av != aL.init && aI.drag.type != "clone") {
	                aF = ac(aS.x, aS.y, av.matrix());av.translate(aF.x - av._x, aF.y - av._y);
	              }av.translate(aI.drag.shiftX, aI.drag.shiftY);if (typeof aI.drag.start == "function") {
	                aI.drag.start.call(av, { x: aS.x, y: aS.y });
	              }
	            }if (typeof aR.onmousedown == "function") {
	              if (aR.onmousedown({ x: aS.x, y: aS.y, event: aS.event }) === false) {
	                break mdCicle;
	              }
	            }
	          }
	        }aS.objects = [];
	      }if (aP.objects.length) {
	        muCicle: for (aJ = aP.objects.length - 1; aJ > -1; aJ--) {
	          var aE = [aP.objects[aJ], aj(aP.objects[aJ])],
	              ay;for (aH = 0; aH < 2; aH++) {
	            ay = aE[aH];if (an(ay, aP, aA)) {
	              aD.objects = [];
	            }if (typeof ay.onmouseup == "function") {
	              if (ay.onmouseup({ x: aP.x, y: aP.y, event: aP.event }) === false) {
	                break muCicle;
	              }
	            }
	          }
	        }this.optns.drag = { object: false, x: 0, y: 0 };aP.objects = [];
	      }if (aD.objects.length) {
	        cCicle: for (aJ = aD.objects.length - 1; aJ > -1; aJ--) {
	          var aG = [aD.objects[aJ], aj(aD.objects[aJ])],
	              ax;for (aH = 0; aH < 2; aH++) {
	            ax = aG[aH];an(ax, aD, aA);if (typeof ax.onclick == "function") {
	              if (ax.onclick({ x: aD.x, y: aD.y, event: aD.event }) === false) {
	                break cCicle;
	              }
	            }
	          }
	        }this.optns.drag = { object: false, x: 0, y: 0 };aD.objects = [];
	      }if (aK.objects.length) {
	        dcCicle: for (aJ = aK.objects.length - 1; aJ > -1; aJ--) {
	          var aO = [aK.objects[aJ], aj(aK.objects[aJ])];for (aH = 0; aH < 2; aH++) {
	            if (typeof aO[aH].ondblclick == "function") {
	              if (aO[aH].ondblclick({ x: aK.x, y: aK.y, event: aK.event }) === false) {
	                break dcCicle;
	              }
	            }
	          }
	        }aK.objects = [];
	      }aA.keyUp.val = aA.keyDown.val = aA.keyPress.val = aD.x = aK.x = aP.x = aS.x = aM.x = false;return this;
	    };return at;
	  };function an(ar, au, m) {
	    var at = m.drag;if (m.drag.init && m.drag.object) {
	      if (ar.optns.drop.val == true) {
	        if (at.init == at.object) {
	          at.init.visible(true);
	        }if (typeof ar.optns.drop.fn == "function") {
	          ar.optns.drop.fn.call(ar, at.init);
	        }
	      } else {
	        at.object.visible(false);at.init.visible(true);at.init.optns.translateMatrix[0][2] = at.object.optns.translateMatrix[0][2];at.init.optns.translateMatrix[1][2] = at.object.optns.translateMatrix[1][2];k(at.init);if (at.object != at.init) {
	          at.object.visible(false);
	        }if (typeof at.init.optns.drag.stop == "function") {
	          at.init.optns.drag.stop.call(at.init, { x: au.x, y: au.y });
	        }
	      }return at.x != at.startX || at.y !== at.startY;
	    }return false;
	  }P.layer = function (au) {
	    if (au === z) {
	      return ad[0].layers[0];
	    }for (var at = 0; at < ad.length; at++) {
	      var ar = ad[at].layers;for (var m = 0; m < ar.length; m++) {
	        if (ar[m].optns.id == au) {
	          return ar[m];
	        }
	      }
	    }return aa(au);
	  };ab.jCanvaScript = ab.jc = P;
	})(window, undefined);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//     uuid.js
	//
	//     Copyright (c) 2010-2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	// Unique ID creation requires a high quality random # generator.  We feature
	// detect to determine the best RNG source, normalizing to a function that
	// returns 128-bits of randomness, since that's what's usually required
	var _rng = __webpack_require__(4);

	// Maps for number <-> hex string conversion
	var _byteToHex = [];
	var _hexToByte = {};
	for (var i = 0; i < 256; i++) {
	  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
	  _hexToByte[_byteToHex[i]] = i;
	}

	// **`parse()` - Parse a UUID into it's component bytes**
	function parse(s, buf, offset) {
	  var i = (buf && offset) || 0, ii = 0;

	  buf = buf || [];
	  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
	    if (ii < 16) { // Don't overflow!
	      buf[i + ii++] = _hexToByte[oct];
	    }
	  });

	  // Zero out remaining bytes if string was short
	  while (ii < 16) {
	    buf[i + ii++] = 0;
	  }

	  return buf;
	}

	// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
	function unparse(buf, offset) {
	  var i = offset || 0, bth = _byteToHex;
	  return  bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] + '-' +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]] +
	          bth[buf[i++]] + bth[buf[i++]];
	}

	// **`v1()` - Generate time-based UUID**
	//
	// Inspired by https://github.com/LiosK/UUID.js
	// and http://docs.python.org/library/uuid.html

	// random #'s we need to init node and clockseq
	var _seedBytes = _rng();

	// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
	var _nodeId = [
	  _seedBytes[0] | 0x01,
	  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
	];

	// Per 4.2.2, randomize (14 bit) clockseq
	var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

	// Previous uuid creation time
	var _lastMSecs = 0, _lastNSecs = 0;

	// See https://github.com/broofa/node-uuid for API details
	function v1(options, buf, offset) {
	  var i = buf && offset || 0;
	  var b = buf || [];

	  options = options || {};

	  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

	  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
	  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
	  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
	  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
	  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

	  // Per 4.2.1.2, use count of uuid's generated during the current clock
	  // cycle to simulate higher resolution clock
	  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

	  // Time since last uuid creation (in msecs)
	  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

	  // Per 4.2.1.2, Bump clockseq on clock regression
	  if (dt < 0 && options.clockseq === undefined) {
	    clockseq = clockseq + 1 & 0x3fff;
	  }

	  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
	  // time interval
	  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
	    nsecs = 0;
	  }

	  // Per 4.2.1.2 Throw error if too many uuids are requested
	  if (nsecs >= 10000) {
	    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
	  }

	  _lastMSecs = msecs;
	  _lastNSecs = nsecs;
	  _clockseq = clockseq;

	  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
	  msecs += 12219292800000;

	  // `time_low`
	  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
	  b[i++] = tl >>> 24 & 0xff;
	  b[i++] = tl >>> 16 & 0xff;
	  b[i++] = tl >>> 8 & 0xff;
	  b[i++] = tl & 0xff;

	  // `time_mid`
	  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
	  b[i++] = tmh >>> 8 & 0xff;
	  b[i++] = tmh & 0xff;

	  // `time_high_and_version`
	  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
	  b[i++] = tmh >>> 16 & 0xff;

	  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
	  b[i++] = clockseq >>> 8 | 0x80;

	  // `clock_seq_low`
	  b[i++] = clockseq & 0xff;

	  // `node`
	  var node = options.node || _nodeId;
	  for (var n = 0; n < 6; n++) {
	    b[i + n] = node[n];
	  }

	  return buf ? buf : unparse(b);
	}

	// **`v4()` - Generate random UUID**

	// See https://github.com/broofa/node-uuid for API details
	function v4(options, buf, offset) {
	  // Deprecated - 'format' argument, as supported in v1.2
	  var i = buf && offset || 0;

	  if (typeof(options) == 'string') {
	    buf = options == 'binary' ? new Array(16) : null;
	    options = null;
	  }
	  options = options || {};

	  var rnds = options.random || (options.rng || _rng)();

	  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
	  rnds[6] = (rnds[6] & 0x0f) | 0x40;
	  rnds[8] = (rnds[8] & 0x3f) | 0x80;

	  // Copy bytes to buffer, if provided
	  if (buf) {
	    for (var ii = 0; ii < 16; ii++) {
	      buf[i + ii] = rnds[ii];
	    }
	  }

	  return buf || unparse(rnds);
	}

	// Export public API
	var uuid = v4;
	uuid.v1 = v1;
	uuid.v4 = v4;
	uuid.parse = parse;
	uuid.unparse = unparse;

	module.exports = uuid;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var rng;

	if (global.crypto && crypto.getRandomValues) {
	  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
	  // Moderately fast, high quality
	  var _rnds8 = new Uint8Array(16);
	  rng = function whatwgRNG() {
	    crypto.getRandomValues(_rnds8);
	    return _rnds8;
	  };
	}

	if (!rng) {
	  // Math.random()-based (RNG)
	  //
	  // If all else fails, use Math.random().  It's fast, but is of unspecified
	  // quality.
	  var  _rnds = new Array(16);
	  rng = function() {
	    for (var i = 0, r; i < 16; i++) {
	      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
	      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
	    }

	    return _rnds;
	  };
	}

	module.exports = rng;


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _jsBase64 = __webpack_require__(6);

	var _pako = __webpack_require__(11);

	var _pako2 = _interopRequireDefault(_pako);

	/*global jc*/ //eslint

	__webpack_require__(2);

	// this code is quoted from
	// http://qiita.com/k_ui/items/e6c1661158bd584a4209
	// canvasを利用して色情報をRGB値に変換する
	var canvas = document.createElement('canvas');
	canvas.width = 1;
	canvas.height = 1;
	var ctx = canvas.getContext('2d');

	// バッファ arrayへの読み書き

	var BufferView = (function () {
	    function BufferView() {
	        var bytes = arguments.length <= 0 || arguments[0] === undefined ? new Array() : arguments[0];

	        _classCallCheck(this, BufferView);

	        this._buf = bytes;
	        this._offset = 0;
	    }

	    _createClass(BufferView, [{
	        key: 'append',
	        value: function append(bytes) {
	            this._buf = this._buf.concat(bytes);
	        }

	        // textToByteArray
	    }, {
	        key: 'getUint8',
	        value: function getUint8() {
	            if (this._buf.length < this._offset) {
	                throw "Buffer size error (get Uint8)";
	            }
	            var b0 = this._buf[this._offset];

	            this._offset += 1;
	            return b0;
	        }
	    }, {
	        key: 'getUint16',
	        value: function getUint16() {
	            if (this._buf.length < this._offset + 1) {
	                throw "Buffer size error (get Uint16)";
	            }

	            var b1 = this._buf[this._offset];
	            var b0 = this._buf[this._offset + 1];

	            this._offset += 2;
	            return (b1 << 8) + b0;
	        }
	    }, {
	        key: 'getStr',
	        value: function getStr() {
	            if (this._buf.length < this._offset) {
	                throw "Buffer size error (get String length)";
	            }

	            var len = this.getUint8(),
	                value = '';

	            try {
	                for (var i = 0; i < len; i++) {
	                    var char1 = this.getUint16();

	                    if (0xD800 <= char1 && char1 <= 0xD8FF) {
	                        var char2 = this.getUint16();
	                        value += String.fromCharCode(char2 << 16 | char1);
	                    } else {
	                        value += String.fromCharCode(char1);
	                    }
	                }
	            } catch (e) {
	                console.error(e);
	                throw "Buffer size error (get String data)";
	            }

	            var control_codes = /[\u0000-\u001F\u007F-\u009F]/g;
	            value.replace(control_codes, '�');
	            return value;
	        }
	    }, {
	        key: 'getPos',
	        value: function getPos(buf, Offset) {
	            if (this._buf.length < this._offset + 3) {
	                throw "Buffer size error (get Position)";
	            }

	            var a = this.getUint8(),
	                b = this.getUint8(),
	                c = this.getUint8();

	            var xsign = a & 0x80 ? -1 : 1;
	            var ysign = b & 0x08 ? -1 : 1;

	            return {
	                x: xsign * ((a & 0x7F) << 4 | (b & 0xF0) >> 4),
	                y: ysign * ((b & 0x07) << 8 | c)
	            };
	        }
	    }, {
	        key: 'getFloat32',
	        value: function getFloat32() {
	            if (this._buf.length < this._offset + 4) {
	                throw "Buffer size error (get Float32)";
	            }

	            var b0 = this.getUint8(),
	                b1 = this.getUint8(),
	                b2 = this.getUint8(),
	                b3 = this.getUint8();

	            var sign = 1 - 2 * (b0 >> 7),
	                exponent = (b0 << 1 & 0xff | b1 >> 7) - 127,
	                mantissa = (b1 & 0x7f) << 16 | b2 << 8 | b3;

	            if (exponent === 128) {
	                if (mantissa !== 0) {
	                    return NaN;
	                } else {
	                    return sign * Infinity;
	                }
	            }

	            if (exponent === -127) {
	                // Denormalized
	                return sign * mantissa * Math.pow(2, -126 - 23);
	            }

	            return sign * (1 + mantissa * Math.pow(2, -23)) * Math.pow(2, exponent);
	        }
	    }, {
	        key: 'getCol',
	        value: function getCol(buf, Offset) {
	            if (this._buf.length < this._offset + 3) {
	                throw "Buffer size error (get Color)";
	            }

	            var a = this.getUint8().toString(16),
	                b = this.getUint8().toString(16),
	                c = this.getUint8().toString(16),
	                ret;

	            ret = "#" + (a.length == 1 ? "0" + a : a) + (b.length == 1 ? "0" + b : b) + (c.length == 1 ? "0" + c : c);
	            return ret;
	        }
	    }], [{
	        key: 'setStr',
	        value: function setStr(text) {
	            var ret = Array();
	            var code;

	            ret[0] = text.length;
	            for (var i = 0; i < text.length; i++) {
	                code = text.charCodeAt(i);
	                if (code & 0xffff0000) {
	                    ret.push((code & 0xff000000) >> 24, (code & 0x00ff0000) >> 16, (code & 0x0000ff00) >> 8, code & 0x000000ff);
	                } else {
	                    ret.push((code & 0x0000ff00) >> 8, code & 0x000000ff);
	                }
	            }
	            return ret;
	        }

	        // int8ToByteArray
	    }, {
	        key: 'setInt8',
	        value: function setInt8(value) {
	            var ret = Array();
	            ret[0] = value & 0x00ff;
	            return ret;
	        }

	        // int16ToByteArray
	    }, {
	        key: 'setInt16',
	        value: function setInt16(value) {
	            var ret = Array();
	            ret[1] = value & 0x00ff;
	            ret[0] = value >> 8 & 0x00ff;
	            return ret;
	        }

	        // floatToByteArray
	    }, {
	        key: 'floatToIntBits',
	        value: function floatToIntBits(f) {
	            // this function is quoted from
	            // http://stackoverflow.com/questions/3077718/converting-a-decimal-value-to-a-32bit-floating-point-hexadecimal

	            var ret = Array();
	            var NAN_BITS = 0 | 0x7FC00000;
	            var INF_BITS = 0 | 0x7F800000;
	            var ZERO_BITS = 0 | 0x00000000;
	            var SIGN_MASK = 0 | 0x80000000;
	            var EXP_MASK = 0 | 0x7F800000;
	            var MANT_MASK = 0 | 0x007FFFFF;
	            var MANT_MAX = Math.pow(2.0, 23) - 1.0;

	            if (f != f) return NAN_BITS;
	            var hasSign = f < 0.0 || f == 0.0 && 1.0 / f < 0;
	            var signBits = hasSign ? SIGN_MASK : 0;
	            var fabs = Math.abs(f);

	            if (fabs == Number.POSITIVE_INFINITY) return signBits | INF_BITS;

	            var exp = 0,
	                x = fabs;
	            while (x >= 2.0 && exp <= 127) {
	                exp++;
	                x /= 2.0;
	            }
	            while (x < 1.0 && exp >= -126) {
	                exp--;
	                x *= 2.0;
	            }
	            var biasedExp = exp + 127;

	            if (biasedExp == 255) return signBits | INF_BITS;
	            if (biasedExp == 0) {
	                var mantissa = x * Math.pow(2.0, 23) / 2.0;
	            } else {
	                var mantissa = x * Math.pow(2.0, 23) - Math.pow(2.0, 23);
	            }

	            var expBits = biasedExp << 23 & EXP_MASK;
	            var mantissaBits = mantissa & MANT_MASK;

	            return signBits | expBits | mantissaBits;
	        }
	    }, {
	        key: 'setFloat32',
	        value: function setFloat32(f) {
	            var ret = new Array();
	            var bits = BufferView.floatToIntBits(f);

	            ret[0] = bits >> 24 & 0x000000ff;
	            ret[1] = bits >> 16 & 0x000000ff;
	            ret[2] = bits >> 8 & 0x000000ff;
	            ret[3] = bits & 0x000000ff;

	            return ret;
	        }
	    }, {
	        key: 'setPos',
	        value: function setPos(pos) {
	            var ret = new Array(3);
	            var xsign = pos.x < 0 ? 0x80 : 0,
	                ysign = pos.y < 0 ? 0x08 : 0,
	                absx = Math.abs(pos.x),
	                absy = Math.abs(pos.y);

	            ret[0] = (absx & 0x07F0) >> 4 | xsign;
	            ret[1] = (absx & 0x000F) << 4 | ysign | (absy & 0x0700) >> 8;
	            ret[2] = absy & 0x00FF;
	            return ret;
	        }
	    }, {
	        key: 'setCol',
	        value: function setCol(str) {
	            ctx.fillStyle = str;
	            ctx.fillRect(0, 0, 1, 1);

	            var col = ctx.getImageData(0, 0, 1, 1).data;
	            return [col[0], col[1], col[2]];
	        }
	    }]);

	    return BufferView;
	})();

	var BBCQuery = (function () {
	    function BBCQuery(bbobj, map) {
	        _classCallCheck(this, BBCQuery);

	        this.bbobj = bbobj;
	        this.map = map;
	        this._bv = new BufferView(BufferView.setStr(map));
	    }

	    // BBCQuery

	    // setQueryString (str) {
	    _createClass(BBCQuery, [{
	        key: 'fromBase64',
	        value: function fromBase64(str) {
	            var data = _jsBase64.Base64.decode(str);
	            this._bv = new BufferView(_pako2['default'].inflateRaw(data));
	            try {
	                this.map = this._bv.getStr();
	            } catch (e) {
	                console.error(e);
	                alert("データ取り込み中にエラーが発生しました");
	                this._bv = new BufferView();

	                return false;
	            }
	            return true;
	        }

	        // getQueryString () {
	    }, {
	        key: 'toBase64',
	        value: function toBase64() {
	            var buf = this._bv._buf;
	            var data = _pako2['default'].deflateRaw(buf, {
	                to: "string"
	            });
	            return _jsBase64.Base64.encode(data);
	        }

	        // セットされているクエリパラメータからオブジェクトを復元する
	        // setObjects
	    }, {
	        key: 'applyObjects',
	        value: function applyObjects() {
	            var i,
	                j,
	                objs = new Array(),
	                buff = this._bv,
	                bbobj = this.bbobj;

	            try {
	                while (buff._offset < buff._buf.length) {
	                    var obj,
	                        objlen = buff.getUint16(),
	                        objname = buff.getStr(),
	                        objtype = buff.getUint8();

	                    switch (objtype) {
	                        case 0x01:
	                            (function () {
	                                //circle
	                                var color = buff.getCol(),
	                                    rad = buff.getUint16(),
	                                    pos = buff.getPos(),
	                                    ptpos = buff.getPos();

	                                obj = bbobj.add_circle(objname, rad, color, function () {
	                                    this._ptpos = ptpos;
	                                    this.moveTo(pos.x, pos.y).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x02:
	                            (function () {
	                                //line
	                                var color = buff.getCol(),
	                                    len = buff.getUint16(),
	                                    pos = buff.getPos(),
	                                    pt1pos = buff.getPos(),
	                                    pt2pos = buff.getPos();

	                                obj = bbobj.add_line(objname, len, color, function () {
	                                    this._pt1pos = pt1pos;
	                                    this._pt2pos = pt2pos;
	                                    this.moveTo(pos.x, pos.y).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x03:
	                            (function () {
	                                //freehand
	                                obj = bbobj.add_freehand(objname);
	                                obj._step = buff.getUint8();
	                                for (i = 1; i <= obj._step; i++) {
	                                    obj._stepcol[i] = buff.getCol();
	                                    var length = buff.getUint16(),
	                                        points = new Array();
	                                    for (j = 0; j < length; j++) {
	                                        var point = buff.getPos();
	                                        points.push([point.x, point.y]);
	                                    }
	                                    jc.line(points, obj._stepcol[i]).layer(obj.id).id(i).lineStyle({
	                                        lineWidth: 3
	                                    });
	                                }
	                            })();
	                            break;

	                        case 0x04:
	                            (function () {
	                                //point
	                                var color = buff.getCol(),
	                                    align = buff.getUint8(),
	                                    size = buff.getUint8(),
	                                    pos = buff.getPos();

	                                obj = bbobj.add_point(objname, size, color, align, function () {
	                                    this.moveTo(pos.x, pos.y).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x05:
	                            (function () {
	                                //icon
	                                var color = buff.getCol(),
	                                    file = buff.getStr(),
	                                    pos = buff.getPos();

	                                obj = bbobj.add_icon(objname, file, color, function () {
	                                    this.moveTo(pos.x, pos.y).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x11:
	                            (function () {
	                                //scout
	                                var color = buff.getCol(),
	                                    rad = buff.getUint16(),
	                                    len = buff.getUint16(),
	                                    duration = buff.getUint16(),
	                                    pos = buff.getPos(),
	                                    rotAngle = buff.getFloat32();

	                                obj = bbobj.add_scout(objname, rad, len, duration, color, function () {
	                                    this.moveTo(pos.x, pos.y).rotateTo(rotAngle).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x12:
	                            (function () {
	                                //sensor
	                                var color = buff.getCol(),
	                                    rad = buff.getUint16(),
	                                    pos = buff.getPos();

	                                obj = bbobj.add_sensor(objname, rad, color, function () {
	                                    this.moveTo(pos.x, pos.y).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x13:
	                            (function () {
	                                //radar
	                                var color = buff.getCol(),
	                                    rad = buff.getUint16(),
	                                    angle = buff.getUint16(),
	                                    pos = buff.getPos(),
	                                    rotAngle = buff.getFloat32();

	                                obj = bbobj.add_radar(objname, rad, angle, color, function () {
	                                    this.moveTo(pos.x, pos.y).rotateTo(rotAngle).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x14:
	                            (function () {
	                                //sonde
	                                var color = buff.getCol(),
	                                    rad1 = buff.getUint16(),
	                                    rad2 = buff.getUint16(),
	                                    pos = buff.getPos(),
	                                    markpos = buff.getPos();

	                                obj = bbobj.add_sonde(objname, rad1, rad2, color, function () {
	                                    this._markerx = markpos.x;
	                                    this._markery = markpos.y;
	                                    this.moveTo(pos.x, pos.y).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x15:
	                            (function () {
	                                //ndsensor
	                                var color = buff.getCol(),
	                                    rad = buff.getUint16(),
	                                    pos = buff.getPos(),
	                                    rotAngle = buff.getFloat32();

	                                obj = bbobj.add_ndsensor(objname, rad, color, function () {
	                                    this.moveTo(pos.x, pos.y).rotateTo(rotAngle).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x16:
	                            (function () {
	                                //bascout
	                                var color = buff.getCol(),
	                                    pos = buff.getPos(),
	                                    rotAngle = buff.getFloat32();

	                                obj = bbobj.add_bascout(objname, color, function () {
	                                    this.moveTo(pos.x, pos.y).rotateTo(rotAngle).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x17:
	                            (function () {
	                                //vsensor
	                                var color = buff.getCol(),
	                                    rada = buff.getUint16(),
	                                    radb = buff.getUint16(),
	                                    mode = buff.getUint8(),
	                                    pos = buff.getPos();

	                                if (mode == 0) {
	                                    mode = 'A';
	                                } else {
	                                    mode = 'B';
	                                }

	                                obj = bbobj.add_vsensor(objname, rada, radb, color, mode, function () {
	                                    this.moveTo(pos.x, pos.y).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x21:
	                            (function () {
	                                //howitzer
	                                var color = buff.getCol(),
	                                    rad1 = buff.getUint16(),
	                                    rad2 = buff.getUint16(),
	                                    rad3 = buff.getUint16(),
	                                    pos = buff.getPos(),
	                                    markpos = buff.getPos();

	                                obj = bbobj.add_howitzer(objname, rad1, rad2, rad3, color, function () {
	                                    this._markerx = markpos.x;
	                                    this._markery = markpos.y;
	                                    this.moveTo(pos.x, pos.y).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x22:
	                            (function () {
	                                //bunker
	                                var color = buff.getCol(),
	                                    pos = buff.getPos();

	                                obj = bbobj.add_bunker(objname, color, function () {
	                                    this.moveTo(pos.x, pos.y).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x23:
	                            (function () {
	                                //bomber
	                                var color = buff.getCol(),
	                                    pos = buff.getPos(),
	                                    rotAngle = buff.getFloat32();

	                                obj = bbobj.add_bomber(objname, color, function () {
	                                    this.moveTo(pos.x, pos.y).rotateTo(rotAngle).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x24:
	                            (function () {
	                                //sentry
	                                var color = buff.getCol(),
	                                    pos = buff.getPos(),
	                                    rotAngle = buff.getFloat32();

	                                obj = bbobj.add_sentry(objname, color, function () {
	                                    this.moveTo(pos.x, pos.y).rotateTo(rotAngle).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x25:
	                            (function () {
	                                //aerosentry
	                                var color = buff.getCol(),
	                                    pos = buff.getPos();

	                                obj = bbobj.add_aerosentry(objname, color, function () {
	                                    this.moveTo(pos.x, pos.y).redraw();
	                                });
	                            })();
	                            break;

	                        case 0x30:
	                            (function () {
	                                //waft
	                                var color = buff.getCol(),
	                                    file = buff.getStr(),
	                                    pos = buff.getPos(),
	                                    rotAngle = buff.getFloat32();

	                                obj = bbobj.add_waft(objname, file, color, function () {
	                                    this.moveTo(pos.x, pos.y).rotateTo(rotAngle).redraw();
	                                });
	                            })();
	                            break;

	                        default:
	                            obj = undefined;
	                            console.error("object type not supported (" + objtype + ")");
	                            view.seek(view.tell() + objlen - 1);
	                            break;
	                    }
	                    if (obj === undefined) break;
	                    objs.push(obj);
	                }
	            } catch (e) {
	                console.error(e);
	                alert("データ取り込み中にエラーが発生しました");
	            }

	            return objs;
	        }

	        // // オブジェクト配列をバイナリ化してバイナリArrayを返す
	        // getObjects (objs) {
	        // オブジェクト配列を格納する
	    }, {
	        key: 'fromObjects',
	        value: function fromObjects(objs) {
	            var i, j;
	            for (i = 0; i < objs.length; i++) {
	                var obj = this.bbobj.object(objs[i]);
	                var objdata = new Array();

	                switch (obj.type) {
	                    case 'circle':
	                        objdata.unshift(0x01);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setInt16(obj._radius));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        objdata = objdata.concat(BufferView.setPos(obj._ptpos));
	                        break;

	                    case 'line':
	                        objdata.unshift(0x02);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setInt16(obj._length));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        objdata = objdata.concat(BufferView.setPos(obj._pt1pos));
	                        objdata = objdata.concat(BufferView.setPos(obj._pt2pos));
	                        break;

	                    case 'freehand':
	                        objdata.unshift(0x03);
	                        objdata = objdata.concat(BufferView.setInt8(obj._step));
	                        for (i = 1; i <= obj._step; i++) {
	                            objdata = objdata.concat(BufferView.setCol(obj._stepcol[i]));
	                            var points = jc("#" + i, {
	                                canvas: this.bbobj.id,
	                                layer: obj.id
	                            }).points();
	                            objdata = objdata.concat(BufferView.setInt16(points.length));
	                            for (j = 0; j < points.length; j++) {
	                                objdata = objdata.concat(BufferView.setPos({
	                                    x: points[j][0],
	                                    y: points[j][1]
	                                }));
	                            }
	                        }
	                        break;

	                    case 'point':
	                        objdata.unshift(0x04);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setInt8(obj._align));
	                        objdata = objdata.concat(BufferView.setInt8(obj._size));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        break;

	                    case 'icon':
	                        objdata.unshift(0x05);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setStr(obj._file));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        break;

	                    case 'scout':
	                        objdata.unshift(0x11);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setInt16(obj._radius));
	                        objdata = objdata.concat(BufferView.setInt16(obj._length));
	                        objdata = objdata.concat(BufferView.setInt16(obj._duration));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
	                        break;

	                    case 'sensor':
	                        objdata.unshift(0x12);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setInt16(obj._radius));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        break;

	                    case 'radar':
	                        objdata.unshift(0x13);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setInt16(obj._radius));
	                        objdata = objdata.concat(BufferView.setInt16(obj._angle));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
	                        break;

	                    case 'sonde':
	                        objdata.unshift(0x14);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setInt16(obj._radius1));
	                        objdata = objdata.concat(BufferView.setInt16(obj._radius2));

	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        objdata = objdata.concat(BufferView.setPos({
	                            x: obj._markerx,
	                            y: obj._markery
	                        }));
	                        break;

	                    case 'ndsensor':
	                        objdata.unshift(0x15);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setInt16(obj._radius));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
	                        break;

	                    case 'vsensor':
	                        objdata.unshift(0x17);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setInt16(obj._radiusa));
	                        objdata = objdata.concat(BufferView.setInt16(obj._radiusb));
	                        if (obj._mode == 'A') {
	                            objdata = objdata.concat(BufferView.setInt8(0));
	                        } else {
	                            objdata = objdata.concat(BufferView.setInt8(1));
	                        }
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        break;

	                    case 'howitzer':
	                        objdata.unshift(0x21);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setInt16(obj._radius1));
	                        objdata = objdata.concat(BufferView.setInt16(obj._radius2));
	                        objdata = objdata.concat(BufferView.setInt16(obj._radius3));

	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        objdata = objdata.concat(BufferView.setPos({
	                            x: obj._markerx,
	                            y: obj._markery
	                        }));
	                        break;

	                    case 'bunker':
	                        objdata.unshift(0x22);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        break;

	                    case 'bomber':
	                        objdata.unshift(0x23);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
	                        break;

	                    case 'bascout':
	                        objdata.unshift(0x16);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
	                        break;

	                    case 'sentry':
	                        objdata.unshift(0x24);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
	                        break;

	                    case 'aerosentry':
	                        objdata.unshift(0x25);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        break;

	                    case 'waft':
	                        objdata.unshift(0x30);
	                        objdata = objdata.concat(BufferView.setCol(obj._color));
	                        objdata = objdata.concat(BufferView.setStr(obj._file));
	                        objdata = objdata.concat(BufferView.setPos(obj.position()));
	                        objdata = objdata.concat(BufferView.setFloat32(obj.rotAngle()));
	                        break;

	                    default:
	                        objdata = undefined;
	                        console.error("object " + obj.type + " not supported");
	                        break;
	                }
	                if (objdata !== undefined) {
	                    objdata.unshift.apply(objdata, BufferView.setStr(obj._text));
	                    objdata.unshift.apply(objdata, BufferView.setInt16(objdata.length));
	                    this._bv.append(objdata);
	                }
	            }
	        }
	    }]);

	    return BBCQuery;
	})();

	exports['default'] = BBCQuery;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * $Id: base64.js,v 2.15 2014/04/05 12:58:57 dankogai Exp dankogai $
	 *
	 *  Licensed under the MIT license.
	 *    http://opensource.org/licenses/mit-license
	 *
	 *  References:
	 *    http://en.wikipedia.org/wiki/Base64
	 */

	(function(global) {
	    'use strict';
	    // existing version for noConflict()
	    var _Base64 = global.Base64;
	    var version = "2.1.9";
	    // if node.js, we use Buffer
	    var buffer;
	    if (typeof module !== 'undefined' && module.exports) {
	        try {
	            buffer = __webpack_require__(7).Buffer;
	        } catch (err) {}
	    }
	    // constants
	    var b64chars
	        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	    var b64tab = function(bin) {
	        var t = {};
	        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
	        return t;
	    }(b64chars);
	    var fromCharCode = String.fromCharCode;
	    // encoder stuff
	    var cb_utob = function(c) {
	        if (c.length < 2) {
	            var cc = c.charCodeAt(0);
	            return cc < 0x80 ? c
	                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
	                                + fromCharCode(0x80 | (cc & 0x3f)))
	                : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
	                   + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
	                   + fromCharCode(0x80 | ( cc         & 0x3f)));
	        } else {
	            var cc = 0x10000
	                + (c.charCodeAt(0) - 0xD800) * 0x400
	                + (c.charCodeAt(1) - 0xDC00);
	            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
	                    + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
	                    + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
	                    + fromCharCode(0x80 | ( cc         & 0x3f)));
	        }
	    };
	    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
	    var utob = function(u) {
	        return u.replace(re_utob, cb_utob);
	    };
	    var cb_encode = function(ccc) {
	        var padlen = [0, 2, 1][ccc.length % 3],
	        ord = ccc.charCodeAt(0) << 16
	            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
	            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
	        chars = [
	            b64chars.charAt( ord >>> 18),
	            b64chars.charAt((ord >>> 12) & 63),
	            padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
	            padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
	        ];
	        return chars.join('');
	    };
	    var btoa = global.btoa ? function(b) {
	        return global.btoa(b);
	    } : function(b) {
	        return b.replace(/[\s\S]{1,3}/g, cb_encode);
	    };
	    var _encode = buffer ? function (u) {
	        return (u.constructor === buffer.constructor ? u : new buffer(u))
	        .toString('base64')
	    }
	    : function (u) { return btoa(utob(u)) }
	    ;
	    var encode = function(u, urisafe) {
	        return !urisafe
	            ? _encode(String(u))
	            : _encode(String(u)).replace(/[+\/]/g, function(m0) {
	                return m0 == '+' ? '-' : '_';
	            }).replace(/=/g, '');
	    };
	    var encodeURI = function(u) { return encode(u, true) };
	    // decoder stuff
	    var re_btou = new RegExp([
	        '[\xC0-\xDF][\x80-\xBF]',
	        '[\xE0-\xEF][\x80-\xBF]{2}',
	        '[\xF0-\xF7][\x80-\xBF]{3}'
	    ].join('|'), 'g');
	    var cb_btou = function(cccc) {
	        switch(cccc.length) {
	        case 4:
	            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
	                |    ((0x3f & cccc.charCodeAt(1)) << 12)
	                |    ((0x3f & cccc.charCodeAt(2)) <<  6)
	                |     (0x3f & cccc.charCodeAt(3)),
	            offset = cp - 0x10000;
	            return (fromCharCode((offset  >>> 10) + 0xD800)
	                    + fromCharCode((offset & 0x3FF) + 0xDC00));
	        case 3:
	            return fromCharCode(
	                ((0x0f & cccc.charCodeAt(0)) << 12)
	                    | ((0x3f & cccc.charCodeAt(1)) << 6)
	                    |  (0x3f & cccc.charCodeAt(2))
	            );
	        default:
	            return  fromCharCode(
	                ((0x1f & cccc.charCodeAt(0)) << 6)
	                    |  (0x3f & cccc.charCodeAt(1))
	            );
	        }
	    };
	    var btou = function(b) {
	        return b.replace(re_btou, cb_btou);
	    };
	    var cb_decode = function(cccc) {
	        var len = cccc.length,
	        padlen = len % 4,
	        n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
	            | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
	            | (len > 2 ? b64tab[cccc.charAt(2)] <<  6 : 0)
	            | (len > 3 ? b64tab[cccc.charAt(3)]       : 0),
	        chars = [
	            fromCharCode( n >>> 16),
	            fromCharCode((n >>>  8) & 0xff),
	            fromCharCode( n         & 0xff)
	        ];
	        chars.length -= [0, 0, 2, 1][padlen];
	        return chars.join('');
	    };
	    var atob = global.atob ? function(a) {
	        return global.atob(a);
	    } : function(a){
	        return a.replace(/[\s\S]{1,4}/g, cb_decode);
	    };
	    var _decode = buffer ? function(a) {
	        return (a.constructor === buffer.constructor
	                ? a : new buffer(a, 'base64')).toString();
	    }
	    : function(a) { return btou(atob(a)) };
	    var decode = function(a){
	        return _decode(
	            String(a).replace(/[-_]/g, function(m0) { return m0 == '-' ? '+' : '/' })
	                .replace(/[^A-Za-z0-9\+\/]/g, '')
	        );
	    };
	    var noConflict = function() {
	        var Base64 = global.Base64;
	        global.Base64 = _Base64;
	        return Base64;
	    };
	    // export Base64
	    global.Base64 = {
	        VERSION: version,
	        atob: atob,
	        btoa: btoa,
	        fromBase64: decode,
	        toBase64: encode,
	        utob: utob,
	        encode: encode,
	        encodeURI: encodeURI,
	        btou: btou,
	        decode: decode,
	        noConflict: noConflict
	    };
	    // if ES5 is available, make Base64.extendString() available
	    if (typeof Object.defineProperty === 'function') {
	        var noEnum = function(v){
	            return {value:v,enumerable:false,writable:true,configurable:true};
	        };
	        global.Base64.extendString = function () {
	            Object.defineProperty(
	                String.prototype, 'fromBase64', noEnum(function () {
	                    return decode(this)
	                }));
	            Object.defineProperty(
	                String.prototype, 'toBase64', noEnum(function (urisafe) {
	                    return encode(this, urisafe)
	                }));
	            Object.defineProperty(
	                String.prototype, 'toBase64URI', noEnum(function () {
	                    return encode(this, true)
	                }));
	        };
	    }
	    // that's it!
	    if (global['Meteor']) {
	       Base64 = global.Base64; // for normal export in Meteor.js
	    }
	})(this);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	var base64 = __webpack_require__(8)
	var ieee754 = __webpack_require__(9)
	var isArray = __webpack_require__(10)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7).Buffer, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 9 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* pako 0.2.8 nodeca/pako */(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pako = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	'use strict';


	var zlib_deflate = require('./zlib/deflate.js');
	var utils = require('./utils/common');
	var strings = require('./utils/strings');
	var msg = require('./zlib/messages');
	var zstream = require('./zlib/zstream');

	var toString = Object.prototype.toString;

	/* Public constants ==========================================================*/
	/* ===========================================================================*/

	var Z_NO_FLUSH      = 0;
	var Z_FINISH        = 4;

	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	var Z_SYNC_FLUSH    = 2;

	var Z_DEFAULT_COMPRESSION = -1;

	var Z_DEFAULT_STRATEGY    = 0;

	var Z_DEFLATED  = 8;

	/* ===========================================================================*/


	/**
	 * class Deflate
	 *
	 * Generic JS-style wrapper for zlib calls. If you don't need
	 * streaming behaviour - use more simple functions: [[deflate]],
	 * [[deflateRaw]] and [[gzip]].
	 **/

	/* internal
	 * Deflate.chunks -> Array
	 *
	 * Chunks of output data, if [[Deflate#onData]] not overriden.
	 **/

	/**
	 * Deflate.result -> Uint8Array|Array
	 *
	 * Compressed result, generated by default [[Deflate#onData]]
	 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
	 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
	 * push a chunk with explicit flush (call [[Deflate#push]] with
	 * `Z_SYNC_FLUSH` param).
	 **/

	/**
	 * Deflate.err -> Number
	 *
	 * Error code after deflate finished. 0 (Z_OK) on success.
	 * You will not need it in real life, because deflate errors
	 * are possible only on wrong options or bad `onData` / `onEnd`
	 * custom handlers.
	 **/

	/**
	 * Deflate.msg -> String
	 *
	 * Error message, if [[Deflate.err]] != 0
	 **/


	/**
	 * new Deflate(options)
	 * - options (Object): zlib deflate options.
	 *
	 * Creates new deflator instance with specified params. Throws exception
	 * on bad params. Supported options:
	 *
	 * - `level`
	 * - `windowBits`
	 * - `memLevel`
	 * - `strategy`
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Additional options, for internal needs:
	 *
	 * - `chunkSize` - size of generated data chunks (16K by default)
	 * - `raw` (Boolean) - do raw deflate
	 * - `gzip` (Boolean) - create gzip wrapper
	 * - `to` (String) - if equal to 'string', then result will be "binary string"
	 *    (each char code [0..255])
	 * - `header` (Object) - custom header for gzip
	 *   - `text` (Boolean) - true if compressed data believed to be text
	 *   - `time` (Number) - modification time, unix timestamp
	 *   - `os` (Number) - operation system code
	 *   - `extra` (Array) - array of bytes with extra data (max 65536)
	 *   - `name` (String) - file name (binary string)
	 *   - `comment` (String) - comment (binary string)
	 *   - `hcrc` (Boolean) - true if header crc should be added
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
	 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
	 *
	 * var deflate = new pako.Deflate({ level: 3});
	 *
	 * deflate.push(chunk1, false);
	 * deflate.push(chunk2, true);  // true -> last chunk
	 *
	 * if (deflate.err) { throw new Error(deflate.err); }
	 *
	 * console.log(deflate.result);
	 * ```
	 **/
	var Deflate = function(options) {

	  this.options = utils.assign({
	    level: Z_DEFAULT_COMPRESSION,
	    method: Z_DEFLATED,
	    chunkSize: 16384,
	    windowBits: 15,
	    memLevel: 8,
	    strategy: Z_DEFAULT_STRATEGY,
	    to: ''
	  }, options || {});

	  var opt = this.options;

	  if (opt.raw && (opt.windowBits > 0)) {
	    opt.windowBits = -opt.windowBits;
	  }

	  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
	    opt.windowBits += 16;
	  }

	  this.err    = 0;      // error code, if happens (0 = Z_OK)
	  this.msg    = '';     // error message
	  this.ended  = false;  // used to avoid multiple onEnd() calls
	  this.chunks = [];     // chunks of compressed data

	  this.strm = new zstream();
	  this.strm.avail_out = 0;

	  var status = zlib_deflate.deflateInit2(
	    this.strm,
	    opt.level,
	    opt.method,
	    opt.windowBits,
	    opt.memLevel,
	    opt.strategy
	  );

	  if (status !== Z_OK) {
	    throw new Error(msg[status]);
	  }

	  if (opt.header) {
	    zlib_deflate.deflateSetHeader(this.strm, opt.header);
	  }
	};

	/**
	 * Deflate#push(data[, mode]) -> Boolean
	 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
	 *   converted to utf8 byte sequence.
	 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
	 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
	 *
	 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
	 * new compressed chunks. Returns `true` on success. The last data block must have
	 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
	 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
	 * can use mode Z_SYNC_FLUSH, keeping the compression context.
	 *
	 * On fail call [[Deflate#onEnd]] with error code and return false.
	 *
	 * We strongly recommend to use `Uint8Array` on input for best speed (output
	 * array format is detected automatically). Also, don't skip last param and always
	 * use the same type in your code (boolean or number). That will improve JS speed.
	 *
	 * For regular `Array`-s make sure all elements are [0..255].
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * push(chunk, false); // push one of data chunks
	 * ...
	 * push(chunk, true);  // push last chunk
	 * ```
	 **/
	Deflate.prototype.push = function(data, mode) {
	  var strm = this.strm;
	  var chunkSize = this.options.chunkSize;
	  var status, _mode;

	  if (this.ended) { return false; }

	  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

	  // Convert data if needed
	  if (typeof data === 'string') {
	    // If we need to compress text, change encoding to utf8.
	    strm.input = strings.string2buf(data);
	  } else if (toString.call(data) === '[object ArrayBuffer]') {
	    strm.input = new Uint8Array(data);
	  } else {
	    strm.input = data;
	  }

	  strm.next_in = 0;
	  strm.avail_in = strm.input.length;

	  do {
	    if (strm.avail_out === 0) {
	      strm.output = new utils.Buf8(chunkSize);
	      strm.next_out = 0;
	      strm.avail_out = chunkSize;
	    }
	    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

	    if (status !== Z_STREAM_END && status !== Z_OK) {
	      this.onEnd(status);
	      this.ended = true;
	      return false;
	    }
	    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
	      if (this.options.to === 'string') {
	        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
	      } else {
	        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
	      }
	    }
	  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

	  // Finalize on the last chunk.
	  if (_mode === Z_FINISH) {
	    status = zlib_deflate.deflateEnd(this.strm);
	    this.onEnd(status);
	    this.ended = true;
	    return status === Z_OK;
	  }

	  // callback interim results if Z_SYNC_FLUSH.
	  if (_mode === Z_SYNC_FLUSH) {
	    this.onEnd(Z_OK);
	    strm.avail_out = 0;
	    return true;
	  }

	  return true;
	};


	/**
	 * Deflate#onData(chunk) -> Void
	 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
	 *   on js engine support. When string output requested, each chunk
	 *   will be string.
	 *
	 * By default, stores data blocks in `chunks[]` property and glue
	 * those in `onEnd`. Override this handler, if you need another behaviour.
	 **/
	Deflate.prototype.onData = function(chunk) {
	  this.chunks.push(chunk);
	};


	/**
	 * Deflate#onEnd(status) -> Void
	 * - status (Number): deflate status. 0 (Z_OK) on success,
	 *   other if not.
	 *
	 * Called once after you tell deflate that the input stream is
	 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
	 * or if an error happened. By default - join collected chunks,
	 * free memory and fill `results` / `err` properties.
	 **/
	Deflate.prototype.onEnd = function(status) {
	  // On success - join
	  if (status === Z_OK) {
	    if (this.options.to === 'string') {
	      this.result = this.chunks.join('');
	    } else {
	      this.result = utils.flattenChunks(this.chunks);
	    }
	  }
	  this.chunks = [];
	  this.err = status;
	  this.msg = this.strm.msg;
	};


	/**
	 * deflate(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * Compress `data` with deflate alrorythm and `options`.
	 *
	 * Supported options are:
	 *
	 * - level
	 * - windowBits
	 * - memLevel
	 * - strategy
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Sugar (options):
	 *
	 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
	 *   negative windowBits implicitly.
	 * - `to` (String) - if equal to 'string', then result will be "binary string"
	 *    (each char code [0..255])
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
	 *
	 * console.log(pako.deflate(data));
	 * ```
	 **/
	function deflate(input, options) {
	  var deflator = new Deflate(options);

	  deflator.push(input, true);

	  // That will never happens, if you don't cheat with options :)
	  if (deflator.err) { throw deflator.msg; }

	  return deflator.result;
	}


	/**
	 * deflateRaw(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * The same as [[deflate]], but creates raw data, without wrapper
	 * (header and adler32 crc).
	 **/
	function deflateRaw(input, options) {
	  options = options || {};
	  options.raw = true;
	  return deflate(input, options);
	}


	/**
	 * gzip(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to compress.
	 * - options (Object): zlib deflate options.
	 *
	 * The same as [[deflate]], but create gzip wrapper instead of
	 * deflate one.
	 **/
	function gzip(input, options) {
	  options = options || {};
	  options.gzip = true;
	  return deflate(input, options);
	}


	exports.Deflate = Deflate;
	exports.deflate = deflate;
	exports.deflateRaw = deflateRaw;
	exports.gzip = gzip;

	},{"./utils/common":3,"./utils/strings":4,"./zlib/deflate.js":8,"./zlib/messages":13,"./zlib/zstream":15}],2:[function(require,module,exports){
	'use strict';


	var zlib_inflate = require('./zlib/inflate.js');
	var utils = require('./utils/common');
	var strings = require('./utils/strings');
	var c = require('./zlib/constants');
	var msg = require('./zlib/messages');
	var zstream = require('./zlib/zstream');
	var gzheader = require('./zlib/gzheader');

	var toString = Object.prototype.toString;

	/**
	 * class Inflate
	 *
	 * Generic JS-style wrapper for zlib calls. If you don't need
	 * streaming behaviour - use more simple functions: [[inflate]]
	 * and [[inflateRaw]].
	 **/

	/* internal
	 * inflate.chunks -> Array
	 *
	 * Chunks of output data, if [[Inflate#onData]] not overriden.
	 **/

	/**
	 * Inflate.result -> Uint8Array|Array|String
	 *
	 * Uncompressed result, generated by default [[Inflate#onData]]
	 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
	 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
	 * push a chunk with explicit flush (call [[Inflate#push]] with
	 * `Z_SYNC_FLUSH` param).
	 **/

	/**
	 * Inflate.err -> Number
	 *
	 * Error code after inflate finished. 0 (Z_OK) on success.
	 * Should be checked if broken data possible.
	 **/

	/**
	 * Inflate.msg -> String
	 *
	 * Error message, if [[Inflate.err]] != 0
	 **/


	/**
	 * new Inflate(options)
	 * - options (Object): zlib inflate options.
	 *
	 * Creates new inflator instance with specified params. Throws exception
	 * on bad params. Supported options:
	 *
	 * - `windowBits`
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information on these.
	 *
	 * Additional options, for internal needs:
	 *
	 * - `chunkSize` - size of generated data chunks (16K by default)
	 * - `raw` (Boolean) - do raw inflate
	 * - `to` (String) - if equal to 'string', then result will be converted
	 *   from utf8 to utf16 (javascript) string. When string output requested,
	 *   chunk length can differ from `chunkSize`, depending on content.
	 *
	 * By default, when no options set, autodetect deflate/gzip data format via
	 * wrapper header.
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
	 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
	 *
	 * var inflate = new pako.Inflate({ level: 3});
	 *
	 * inflate.push(chunk1, false);
	 * inflate.push(chunk2, true);  // true -> last chunk
	 *
	 * if (inflate.err) { throw new Error(inflate.err); }
	 *
	 * console.log(inflate.result);
	 * ```
	 **/
	var Inflate = function(options) {

	  this.options = utils.assign({
	    chunkSize: 16384,
	    windowBits: 0,
	    to: ''
	  }, options || {});

	  var opt = this.options;

	  // Force window size for `raw` data, if not set directly,
	  // because we have no header for autodetect.
	  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
	    opt.windowBits = -opt.windowBits;
	    if (opt.windowBits === 0) { opt.windowBits = -15; }
	  }

	  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
	  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
	      !(options && options.windowBits)) {
	    opt.windowBits += 32;
	  }

	  // Gzip header has no info about windows size, we can do autodetect only
	  // for deflate. So, if window size not set, force it to max when gzip possible
	  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
	    // bit 3 (16) -> gzipped data
	    // bit 4 (32) -> autodetect gzip/deflate
	    if ((opt.windowBits & 15) === 0) {
	      opt.windowBits |= 15;
	    }
	  }

	  this.err    = 0;      // error code, if happens (0 = Z_OK)
	  this.msg    = '';     // error message
	  this.ended  = false;  // used to avoid multiple onEnd() calls
	  this.chunks = [];     // chunks of compressed data

	  this.strm   = new zstream();
	  this.strm.avail_out = 0;

	  var status  = zlib_inflate.inflateInit2(
	    this.strm,
	    opt.windowBits
	  );

	  if (status !== c.Z_OK) {
	    throw new Error(msg[status]);
	  }

	  this.header = new gzheader();

	  zlib_inflate.inflateGetHeader(this.strm, this.header);
	};

	/**
	 * Inflate#push(data[, mode]) -> Boolean
	 * - data (Uint8Array|Array|ArrayBuffer|String): input data
	 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
	 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
	 *
	 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
	 * new output chunks. Returns `true` on success. The last data block must have
	 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
	 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
	 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
	 *
	 * On fail call [[Inflate#onEnd]] with error code and return false.
	 *
	 * We strongly recommend to use `Uint8Array` on input for best speed (output
	 * format is detected automatically). Also, don't skip last param and always
	 * use the same type in your code (boolean or number). That will improve JS speed.
	 *
	 * For regular `Array`-s make sure all elements are [0..255].
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * push(chunk, false); // push one of data chunks
	 * ...
	 * push(chunk, true);  // push last chunk
	 * ```
	 **/
	Inflate.prototype.push = function(data, mode) {
	  var strm = this.strm;
	  var chunkSize = this.options.chunkSize;
	  var status, _mode;
	  var next_out_utf8, tail, utf8str;

	  // Flag to properly process Z_BUF_ERROR on testing inflate call
	  // when we check that all output data was flushed.
	  var allowBufError = false;

	  if (this.ended) { return false; }
	  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

	  // Convert data if needed
	  if (typeof data === 'string') {
	    // Only binary strings can be decompressed on practice
	    strm.input = strings.binstring2buf(data);
	  } else if (toString.call(data) === '[object ArrayBuffer]') {
	    strm.input = new Uint8Array(data);
	  } else {
	    strm.input = data;
	  }

	  strm.next_in = 0;
	  strm.avail_in = strm.input.length;

	  do {
	    if (strm.avail_out === 0) {
	      strm.output = new utils.Buf8(chunkSize);
	      strm.next_out = 0;
	      strm.avail_out = chunkSize;
	    }

	    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

	    if (status === c.Z_BUF_ERROR && allowBufError === true) {
	      status = c.Z_OK;
	      allowBufError = false;
	    }

	    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
	      this.onEnd(status);
	      this.ended = true;
	      return false;
	    }

	    if (strm.next_out) {
	      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

	        if (this.options.to === 'string') {

	          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

	          tail = strm.next_out - next_out_utf8;
	          utf8str = strings.buf2string(strm.output, next_out_utf8);

	          // move tail
	          strm.next_out = tail;
	          strm.avail_out = chunkSize - tail;
	          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

	          this.onData(utf8str);

	        } else {
	          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
	        }
	      }
	    }

	    // When no more input data, we should check that internal inflate buffers
	    // are flushed. The only way to do it when avail_out = 0 - run one more
	    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
	    // Here we set flag to process this error properly.
	    //
	    // NOTE. Deflate does not return error in this case and does not needs such
	    // logic.
	    if (strm.avail_in === 0 && strm.avail_out === 0) {
	      allowBufError = true;
	    }

	  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

	  if (status === c.Z_STREAM_END) {
	    _mode = c.Z_FINISH;
	  }

	  // Finalize on the last chunk.
	  if (_mode === c.Z_FINISH) {
	    status = zlib_inflate.inflateEnd(this.strm);
	    this.onEnd(status);
	    this.ended = true;
	    return status === c.Z_OK;
	  }

	  // callback interim results if Z_SYNC_FLUSH.
	  if (_mode === c.Z_SYNC_FLUSH) {
	    this.onEnd(c.Z_OK);
	    strm.avail_out = 0;
	    return true;
	  }

	  return true;
	};


	/**
	 * Inflate#onData(chunk) -> Void
	 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
	 *   on js engine support. When string output requested, each chunk
	 *   will be string.
	 *
	 * By default, stores data blocks in `chunks[]` property and glue
	 * those in `onEnd`. Override this handler, if you need another behaviour.
	 **/
	Inflate.prototype.onData = function(chunk) {
	  this.chunks.push(chunk);
	};


	/**
	 * Inflate#onEnd(status) -> Void
	 * - status (Number): inflate status. 0 (Z_OK) on success,
	 *   other if not.
	 *
	 * Called either after you tell inflate that the input stream is
	 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
	 * or if an error happened. By default - join collected chunks,
	 * free memory and fill `results` / `err` properties.
	 **/
	Inflate.prototype.onEnd = function(status) {
	  // On success - join
	  if (status === c.Z_OK) {
	    if (this.options.to === 'string') {
	      // Glue & convert here, until we teach pako to send
	      // utf8 alligned strings to onData
	      this.result = this.chunks.join('');
	    } else {
	      this.result = utils.flattenChunks(this.chunks);
	    }
	  }
	  this.chunks = [];
	  this.err = status;
	  this.msg = this.strm.msg;
	};


	/**
	 * inflate(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * Decompress `data` with inflate/ungzip and `options`. Autodetect
	 * format via wrapper header by default. That's why we don't provide
	 * separate `ungzip` method.
	 *
	 * Supported options are:
	 *
	 * - windowBits
	 *
	 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
	 * for more information.
	 *
	 * Sugar (options):
	 *
	 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
	 *   negative windowBits implicitly.
	 * - `to` (String) - if equal to 'string', then result will be converted
	 *   from utf8 to utf16 (javascript) string. When string output requested,
	 *   chunk length can differ from `chunkSize`, depending on content.
	 *
	 *
	 * ##### Example:
	 *
	 * ```javascript
	 * var pako = require('pako')
	 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
	 *   , output;
	 *
	 * try {
	 *   output = pako.inflate(input);
	 * } catch (err)
	 *   console.log(err);
	 * }
	 * ```
	 **/
	function inflate(input, options) {
	  var inflator = new Inflate(options);

	  inflator.push(input, true);

	  // That will never happens, if you don't cheat with options :)
	  if (inflator.err) { throw inflator.msg; }

	  return inflator.result;
	}


	/**
	 * inflateRaw(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * The same as [[inflate]], but creates raw data, without wrapper
	 * (header and adler32 crc).
	 **/
	function inflateRaw(input, options) {
	  options = options || {};
	  options.raw = true;
	  return inflate(input, options);
	}


	/**
	 * ungzip(data[, options]) -> Uint8Array|Array|String
	 * - data (Uint8Array|Array|String): input data to decompress.
	 * - options (Object): zlib inflate options.
	 *
	 * Just shortcut to [[inflate]], because it autodetects format
	 * by header.content. Done for convenience.
	 **/


	exports.Inflate = Inflate;
	exports.inflate = inflate;
	exports.inflateRaw = inflateRaw;
	exports.ungzip  = inflate;

	},{"./utils/common":3,"./utils/strings":4,"./zlib/constants":6,"./zlib/gzheader":9,"./zlib/inflate.js":11,"./zlib/messages":13,"./zlib/zstream":15}],3:[function(require,module,exports){
	'use strict';


	var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
	                (typeof Uint16Array !== 'undefined') &&
	                (typeof Int32Array !== 'undefined');


	exports.assign = function (obj /*from1, from2, from3, ...*/) {
	  var sources = Array.prototype.slice.call(arguments, 1);
	  while (sources.length) {
	    var source = sources.shift();
	    if (!source) { continue; }

	    if (typeof source !== 'object') {
	      throw new TypeError(source + 'must be non-object');
	    }

	    for (var p in source) {
	      if (source.hasOwnProperty(p)) {
	        obj[p] = source[p];
	      }
	    }
	  }

	  return obj;
	};


	// reduce buffer size, avoiding mem copy
	exports.shrinkBuf = function (buf, size) {
	  if (buf.length === size) { return buf; }
	  if (buf.subarray) { return buf.subarray(0, size); }
	  buf.length = size;
	  return buf;
	};


	var fnTyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    if (src.subarray && dest.subarray) {
	      dest.set(src.subarray(src_offs, src_offs+len), dest_offs);
	      return;
	    }
	    // Fallback to ordinary array
	    for (var i=0; i<len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function(chunks) {
	    var i, l, len, pos, chunk, result;

	    // calculate data length
	    len = 0;
	    for (i=0, l=chunks.length; i<l; i++) {
	      len += chunks[i].length;
	    }

	    // join chunks
	    result = new Uint8Array(len);
	    pos = 0;
	    for (i=0, l=chunks.length; i<l; i++) {
	      chunk = chunks[i];
	      result.set(chunk, pos);
	      pos += chunk.length;
	    }

	    return result;
	  }
	};

	var fnUntyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    for (var i=0; i<len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function(chunks) {
	    return [].concat.apply([], chunks);
	  }
	};


	// Enable/Disable typed arrays use, for testing
	//
	exports.setTyped = function (on) {
	  if (on) {
	    exports.Buf8  = Uint8Array;
	    exports.Buf16 = Uint16Array;
	    exports.Buf32 = Int32Array;
	    exports.assign(exports, fnTyped);
	  } else {
	    exports.Buf8  = Array;
	    exports.Buf16 = Array;
	    exports.Buf32 = Array;
	    exports.assign(exports, fnUntyped);
	  }
	};

	exports.setTyped(TYPED_OK);

	},{}],4:[function(require,module,exports){
	// String encode/decode helpers
	'use strict';


	var utils = require('./common');


	// Quick check if we can use fast array to bin string conversion
	//
	// - apply(Array) can fail on Android 2.2
	// - apply(Uint8Array) can fail on iOS 5.1 Safary
	//
	var STR_APPLY_OK = true;
	var STR_APPLY_UIA_OK = true;

	try { String.fromCharCode.apply(null, [0]); } catch(__) { STR_APPLY_OK = false; }
	try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch(__) { STR_APPLY_UIA_OK = false; }


	// Table with utf8 lengths (calculated by first byte of sequence)
	// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
	// because max possible codepoint is 0x10ffff
	var _utf8len = new utils.Buf8(256);
	for (var q=0; q<256; q++) {
	  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
	}
	_utf8len[254]=_utf8len[254]=1; // Invalid sequence start


	// convert string to array (typed, when possible)
	exports.string2buf = function (str) {
	  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

	  // count binary size
	  for (m_pos = 0; m_pos < str_len; m_pos++) {
	    c = str.charCodeAt(m_pos);
	    if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
	      c2 = str.charCodeAt(m_pos+1);
	      if ((c2 & 0xfc00) === 0xdc00) {
	        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
	        m_pos++;
	      }
	    }
	    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
	  }

	  // allocate buffer
	  buf = new utils.Buf8(buf_len);

	  // convert
	  for (i=0, m_pos = 0; i < buf_len; m_pos++) {
	    c = str.charCodeAt(m_pos);
	    if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
	      c2 = str.charCodeAt(m_pos+1);
	      if ((c2 & 0xfc00) === 0xdc00) {
	        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
	        m_pos++;
	      }
	    }
	    if (c < 0x80) {
	      /* one byte */
	      buf[i++] = c;
	    } else if (c < 0x800) {
	      /* two bytes */
	      buf[i++] = 0xC0 | (c >>> 6);
	      buf[i++] = 0x80 | (c & 0x3f);
	    } else if (c < 0x10000) {
	      /* three bytes */
	      buf[i++] = 0xE0 | (c >>> 12);
	      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
	      buf[i++] = 0x80 | (c & 0x3f);
	    } else {
	      /* four bytes */
	      buf[i++] = 0xf0 | (c >>> 18);
	      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
	      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
	      buf[i++] = 0x80 | (c & 0x3f);
	    }
	  }

	  return buf;
	};

	// Helper (used in 2 places)
	function buf2binstring(buf, len) {
	  // use fallback for big arrays to avoid stack overflow
	  if (len < 65537) {
	    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
	      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
	    }
	  }

	  var result = '';
	  for (var i=0; i < len; i++) {
	    result += String.fromCharCode(buf[i]);
	  }
	  return result;
	}


	// Convert byte array to binary string
	exports.buf2binstring = function(buf) {
	  return buf2binstring(buf, buf.length);
	};


	// Convert binary string (typed, when possible)
	exports.binstring2buf = function(str) {
	  var buf = new utils.Buf8(str.length);
	  for (var i=0, len=buf.length; i < len; i++) {
	    buf[i] = str.charCodeAt(i);
	  }
	  return buf;
	};


	// convert array to string
	exports.buf2string = function (buf, max) {
	  var i, out, c, c_len;
	  var len = max || buf.length;

	  // Reserve max possible length (2 words per char)
	  // NB: by unknown reasons, Array is significantly faster for
	  //     String.fromCharCode.apply than Uint16Array.
	  var utf16buf = new Array(len*2);

	  for (out=0, i=0; i<len;) {
	    c = buf[i++];
	    // quick process ascii
	    if (c < 0x80) { utf16buf[out++] = c; continue; }

	    c_len = _utf8len[c];
	    // skip 5 & 6 byte codes
	    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

	    // apply mask on first byte
	    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
	    // join the rest
	    while (c_len > 1 && i < len) {
	      c = (c << 6) | (buf[i++] & 0x3f);
	      c_len--;
	    }

	    // terminated by end of string?
	    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

	    if (c < 0x10000) {
	      utf16buf[out++] = c;
	    } else {
	      c -= 0x10000;
	      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
	      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
	    }
	  }

	  return buf2binstring(utf16buf, out);
	};


	// Calculate max possible position in utf8 buffer,
	// that will not break sequence. If that's not possible
	// - (very small limits) return max size as is.
	//
	// buf[] - utf8 bytes array
	// max   - length limit (mandatory);
	exports.utf8border = function(buf, max) {
	  var pos;

	  max = max || buf.length;
	  if (max > buf.length) { max = buf.length; }

	  // go back from last position, until start of sequence found
	  pos = max-1;
	  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

	  // Fuckup - very small and broken sequence,
	  // return max, because we should return something anyway.
	  if (pos < 0) { return max; }

	  // If we came to start of buffer - that means vuffer is too small,
	  // return max too.
	  if (pos === 0) { return max; }

	  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
	};

	},{"./common":3}],5:[function(require,module,exports){
	'use strict';

	// Note: adler32 takes 12% for level 0 and 2% for level 6.
	// It doesn't worth to make additional optimizationa as in original.
	// Small size is preferable.

	function adler32(adler, buf, len, pos) {
	  var s1 = (adler & 0xffff) |0,
	      s2 = ((adler >>> 16) & 0xffff) |0,
	      n = 0;

	  while (len !== 0) {
	    // Set limit ~ twice less than 5552, to keep
	    // s2 in 31-bits, because we force signed ints.
	    // in other case %= will fail.
	    n = len > 2000 ? 2000 : len;
	    len -= n;

	    do {
	      s1 = (s1 + buf[pos++]) |0;
	      s2 = (s2 + s1) |0;
	    } while (--n);

	    s1 %= 65521;
	    s2 %= 65521;
	  }

	  return (s1 | (s2 << 16)) |0;
	}


	module.exports = adler32;

	},{}],6:[function(require,module,exports){
	module.exports = {

	  /* Allowed flush values; see deflate() and inflate() below for details */
	  Z_NO_FLUSH:         0,
	  Z_PARTIAL_FLUSH:    1,
	  Z_SYNC_FLUSH:       2,
	  Z_FULL_FLUSH:       3,
	  Z_FINISH:           4,
	  Z_BLOCK:            5,
	  Z_TREES:            6,

	  /* Return codes for the compression/decompression functions. Negative values
	  * are errors, positive values are used for special but normal events.
	  */
	  Z_OK:               0,
	  Z_STREAM_END:       1,
	  Z_NEED_DICT:        2,
	  Z_ERRNO:           -1,
	  Z_STREAM_ERROR:    -2,
	  Z_DATA_ERROR:      -3,
	  //Z_MEM_ERROR:     -4,
	  Z_BUF_ERROR:       -5,
	  //Z_VERSION_ERROR: -6,

	  /* compression levels */
	  Z_NO_COMPRESSION:         0,
	  Z_BEST_SPEED:             1,
	  Z_BEST_COMPRESSION:       9,
	  Z_DEFAULT_COMPRESSION:   -1,


	  Z_FILTERED:               1,
	  Z_HUFFMAN_ONLY:           2,
	  Z_RLE:                    3,
	  Z_FIXED:                  4,
	  Z_DEFAULT_STRATEGY:       0,

	  /* Possible values of the data_type field (though see inflate()) */
	  Z_BINARY:                 0,
	  Z_TEXT:                   1,
	  //Z_ASCII:                1, // = Z_TEXT (deprecated)
	  Z_UNKNOWN:                2,

	  /* The deflate compression method */
	  Z_DEFLATED:               8
	  //Z_NULL:                 null // Use -1 or null inline, depending on var type
	};

	},{}],7:[function(require,module,exports){
	'use strict';

	// Note: we can't get significant speed boost here.
	// So write code to minimize size - no pregenerated tables
	// and array tools dependencies.


	// Use ordinary array, since untyped makes no boost here
	function makeTable() {
	  var c, table = [];

	  for (var n =0; n < 256; n++) {
	    c = n;
	    for (var k =0; k < 8; k++) {
	      c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
	    }
	    table[n] = c;
	  }

	  return table;
	}

	// Create table on load. Just 255 signed longs. Not a problem.
	var crcTable = makeTable();


	function crc32(crc, buf, len, pos) {
	  var t = crcTable,
	      end = pos + len;

	  crc = crc ^ (-1);

	  for (var i = pos; i < end; i++) {
	    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
	  }

	  return (crc ^ (-1)); // >>> 0;
	}


	module.exports = crc32;

	},{}],8:[function(require,module,exports){
	'use strict';

	var utils   = require('../utils/common');
	var trees   = require('./trees');
	var adler32 = require('./adler32');
	var crc32   = require('./crc32');
	var msg   = require('./messages');

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	/* Allowed flush values; see deflate() and inflate() below for details */
	var Z_NO_FLUSH      = 0;
	var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	var Z_FULL_FLUSH    = 3;
	var Z_FINISH        = 4;
	var Z_BLOCK         = 5;
	//var Z_TREES         = 6;


	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	//var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR  = -2;
	var Z_DATA_ERROR    = -3;
	//var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR     = -5;
	//var Z_VERSION_ERROR = -6;


	/* compression levels */
	//var Z_NO_COMPRESSION      = 0;
	//var Z_BEST_SPEED          = 1;
	//var Z_BEST_COMPRESSION    = 9;
	var Z_DEFAULT_COMPRESSION = -1;


	var Z_FILTERED            = 1;
	var Z_HUFFMAN_ONLY        = 2;
	var Z_RLE                 = 3;
	var Z_FIXED               = 4;
	var Z_DEFAULT_STRATEGY    = 0;

	/* Possible values of the data_type field (though see inflate()) */
	//var Z_BINARY              = 0;
	//var Z_TEXT                = 1;
	//var Z_ASCII               = 1; // = Z_TEXT
	var Z_UNKNOWN             = 2;


	/* The deflate compression method */
	var Z_DEFLATED  = 8;

	/*============================================================================*/


	var MAX_MEM_LEVEL = 9;
	/* Maximum value for memLevel in deflateInit2 */
	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_MEM_LEVEL = 8;


	var LENGTH_CODES  = 29;
	/* number of length codes, not counting the special END_BLOCK code */
	var LITERALS      = 256;
	/* number of literal bytes 0..255 */
	var L_CODES       = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */
	var D_CODES       = 30;
	/* number of distance codes */
	var BL_CODES      = 19;
	/* number of codes used to transfer the bit lengths */
	var HEAP_SIZE     = 2*L_CODES + 1;
	/* maximum heap size */
	var MAX_BITS  = 15;
	/* All codes must not exceed MAX_BITS bits */

	var MIN_MATCH = 3;
	var MAX_MATCH = 258;
	var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

	var PRESET_DICT = 0x20;

	var INIT_STATE = 42;
	var EXTRA_STATE = 69;
	var NAME_STATE = 73;
	var COMMENT_STATE = 91;
	var HCRC_STATE = 103;
	var BUSY_STATE = 113;
	var FINISH_STATE = 666;

	var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
	var BS_BLOCK_DONE     = 2; /* block flush performed */
	var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
	var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

	var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

	function err(strm, errorCode) {
	  strm.msg = msg[errorCode];
	  return errorCode;
	}

	function rank(f) {
	  return ((f) << 1) - ((f) > 4 ? 9 : 0);
	}

	function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


	/* =========================================================================
	 * Flush as much pending output as possible. All deflate() output goes
	 * through this function so some applications may wish to modify it
	 * to avoid allocating a large strm->output buffer and copying into it.
	 * (See also read_buf()).
	 */
	function flush_pending(strm) {
	  var s = strm.state;

	  //_tr_flush_bits(s);
	  var len = s.pending;
	  if (len > strm.avail_out) {
	    len = strm.avail_out;
	  }
	  if (len === 0) { return; }

	  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
	  strm.next_out += len;
	  s.pending_out += len;
	  strm.total_out += len;
	  strm.avail_out -= len;
	  s.pending -= len;
	  if (s.pending === 0) {
	    s.pending_out = 0;
	  }
	}


	function flush_block_only (s, last) {
	  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
	  s.block_start = s.strstart;
	  flush_pending(s.strm);
	}


	function put_byte(s, b) {
	  s.pending_buf[s.pending++] = b;
	}


	/* =========================================================================
	 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
	 * IN assertion: the stream state is correct and there is enough room in
	 * pending_buf.
	 */
	function putShortMSB(s, b) {
	//  put_byte(s, (Byte)(b >> 8));
	//  put_byte(s, (Byte)(b & 0xff));
	  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
	  s.pending_buf[s.pending++] = b & 0xff;
	}


	/* ===========================================================================
	 * Read a new buffer from the current input stream, update the adler32
	 * and total number of bytes read.  All deflate() input goes through
	 * this function so some applications may wish to modify it to avoid
	 * allocating a large strm->input buffer and copying from it.
	 * (See also flush_pending()).
	 */
	function read_buf(strm, buf, start, size) {
	  var len = strm.avail_in;

	  if (len > size) { len = size; }
	  if (len === 0) { return 0; }

	  strm.avail_in -= len;

	  utils.arraySet(buf, strm.input, strm.next_in, len, start);
	  if (strm.state.wrap === 1) {
	    strm.adler = adler32(strm.adler, buf, len, start);
	  }

	  else if (strm.state.wrap === 2) {
	    strm.adler = crc32(strm.adler, buf, len, start);
	  }

	  strm.next_in += len;
	  strm.total_in += len;

	  return len;
	}


	/* ===========================================================================
	 * Set match_start to the longest match starting at the given string and
	 * return its length. Matches shorter or equal to prev_length are discarded,
	 * in which case the result is equal to prev_length and match_start is
	 * garbage.
	 * IN assertions: cur_match is the head of the hash chain for the current
	 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
	 * OUT assertion: the match length is not greater than s->lookahead.
	 */
	function longest_match(s, cur_match) {
	  var chain_length = s.max_chain_length;      /* max hash chain length */
	  var scan = s.strstart; /* current string */
	  var match;                       /* matched string */
	  var len;                           /* length of current match */
	  var best_len = s.prev_length;              /* best match length so far */
	  var nice_match = s.nice_match;             /* stop if match long enough */
	  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
	      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

	  var _win = s.window; // shortcut

	  var wmask = s.w_mask;
	  var prev  = s.prev;

	  /* Stop when cur_match becomes <= limit. To simplify the code,
	   * we prevent matches with the string of window index 0.
	   */

	  var strend = s.strstart + MAX_MATCH;
	  var scan_end1  = _win[scan + best_len - 1];
	  var scan_end   = _win[scan + best_len];

	  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
	   * It is easy to get rid of this optimization if necessary.
	   */
	  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

	  /* Do not waste too much time if we already have a good match: */
	  if (s.prev_length >= s.good_match) {
	    chain_length >>= 2;
	  }
	  /* Do not look for matches beyond the end of the input. This is necessary
	   * to make deflate deterministic.
	   */
	  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

	  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

	  do {
	    // Assert(cur_match < s->strstart, "no future");
	    match = cur_match;

	    /* Skip to next match if the match length cannot increase
	     * or if the match length is less than 2.  Note that the checks below
	     * for insufficient lookahead only occur occasionally for performance
	     * reasons.  Therefore uninitialized memory will be accessed, and
	     * conditional jumps will be made that depend on those values.
	     * However the length of the match is limited to the lookahead, so
	     * the output of deflate is not affected by the uninitialized values.
	     */

	    if (_win[match + best_len]     !== scan_end  ||
	        _win[match + best_len - 1] !== scan_end1 ||
	        _win[match]                !== _win[scan] ||
	        _win[++match]              !== _win[scan + 1]) {
	      continue;
	    }

	    /* The check at best_len-1 can be removed because it will be made
	     * again later. (This heuristic is not always a win.)
	     * It is not necessary to compare scan[2] and match[2] since they
	     * are always equal when the other bytes match, given that
	     * the hash keys are equal and that HASH_BITS >= 8.
	     */
	    scan += 2;
	    match++;
	    // Assert(*scan == *match, "match[2]?");

	    /* We check for insufficient lookahead only every 8th comparison;
	     * the 256th check will be made at strstart+258.
	     */
	    do {
	      /*jshint noempty:false*/
	    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             scan < strend);

	    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

	    len = MAX_MATCH - (strend - scan);
	    scan = strend - MAX_MATCH;

	    if (len > best_len) {
	      s.match_start = cur_match;
	      best_len = len;
	      if (len >= nice_match) {
	        break;
	      }
	      scan_end1  = _win[scan + best_len - 1];
	      scan_end   = _win[scan + best_len];
	    }
	  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

	  if (best_len <= s.lookahead) {
	    return best_len;
	  }
	  return s.lookahead;
	}


	/* ===========================================================================
	 * Fill the window when the lookahead becomes insufficient.
	 * Updates strstart and lookahead.
	 *
	 * IN assertion: lookahead < MIN_LOOKAHEAD
	 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
	 *    At least one byte has been read, or avail_in == 0; reads are
	 *    performed for at least two bytes (required for the zip translate_eol
	 *    option -- not supported here).
	 */
	function fill_window(s) {
	  var _w_size = s.w_size;
	  var p, n, m, more, str;

	  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

	  do {
	    more = s.window_size - s.lookahead - s.strstart;

	    // JS ints have 32 bit, block below not needed
	    /* Deal with !@#$% 64K limit: */
	    //if (sizeof(int) <= 2) {
	    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
	    //        more = wsize;
	    //
	    //  } else if (more == (unsigned)(-1)) {
	    //        /* Very unlikely, but possible on 16 bit machine if
	    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
	    //         */
	    //        more--;
	    //    }
	    //}


	    /* If the window is almost full and there is insufficient lookahead,
	     * move the upper half to the lower one to make room in the upper half.
	     */
	    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

	      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
	      s.match_start -= _w_size;
	      s.strstart -= _w_size;
	      /* we now have strstart >= MAX_DIST */
	      s.block_start -= _w_size;

	      /* Slide the hash table (could be avoided with 32 bit values
	       at the expense of memory usage). We slide even when level == 0
	       to keep the hash table consistent if we switch back to level > 0
	       later. (Using level 0 permanently is not an optimal usage of
	       zlib, so we don't care about this pathological case.)
	       */

	      n = s.hash_size;
	      p = n;
	      do {
	        m = s.head[--p];
	        s.head[p] = (m >= _w_size ? m - _w_size : 0);
	      } while (--n);

	      n = _w_size;
	      p = n;
	      do {
	        m = s.prev[--p];
	        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
	        /* If n is not on any hash chain, prev[n] is garbage but
	         * its value will never be used.
	         */
	      } while (--n);

	      more += _w_size;
	    }
	    if (s.strm.avail_in === 0) {
	      break;
	    }

	    /* If there was no sliding:
	     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
	     *    more == window_size - lookahead - strstart
	     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
	     * => more >= window_size - 2*WSIZE + 2
	     * In the BIG_MEM or MMAP case (not yet supported),
	     *   window_size == input_size + MIN_LOOKAHEAD  &&
	     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
	     * Otherwise, window_size == 2*WSIZE so more >= 2.
	     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
	     */
	    //Assert(more >= 2, "more < 2");
	    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
	    s.lookahead += n;

	    /* Initialize the hash value now that we have some input: */
	    if (s.lookahead + s.insert >= MIN_MATCH) {
	      str = s.strstart - s.insert;
	      s.ins_h = s.window[str];

	      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
	//#if MIN_MATCH != 3
	//        Call update_hash() MIN_MATCH-3 more times
	//#endif
	      while (s.insert) {
	        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
	        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH-1]) & s.hash_mask;

	        s.prev[str & s.w_mask] = s.head[s.ins_h];
	        s.head[s.ins_h] = str;
	        str++;
	        s.insert--;
	        if (s.lookahead + s.insert < MIN_MATCH) {
	          break;
	        }
	      }
	    }
	    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
	     * but this is not important since only literal bytes will be emitted.
	     */

	  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

	  /* If the WIN_INIT bytes after the end of the current data have never been
	   * written, then zero those bytes in order to avoid memory check reports of
	   * the use of uninitialized (or uninitialised as Julian writes) bytes by
	   * the longest match routines.  Update the high water mark for the next
	   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
	   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
	   */
	//  if (s.high_water < s.window_size) {
	//    var curr = s.strstart + s.lookahead;
	//    var init = 0;
	//
	//    if (s.high_water < curr) {
	//      /* Previous high water mark below current data -- zero WIN_INIT
	//       * bytes or up to end of window, whichever is less.
	//       */
	//      init = s.window_size - curr;
	//      if (init > WIN_INIT)
	//        init = WIN_INIT;
	//      zmemzero(s->window + curr, (unsigned)init);
	//      s->high_water = curr + init;
	//    }
	//    else if (s->high_water < (ulg)curr + WIN_INIT) {
	//      /* High water mark at or above current data, but below current data
	//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
	//       * to end of window, whichever is less.
	//       */
	//      init = (ulg)curr + WIN_INIT - s->high_water;
	//      if (init > s->window_size - s->high_water)
	//        init = s->window_size - s->high_water;
	//      zmemzero(s->window + s->high_water, (unsigned)init);
	//      s->high_water += init;
	//    }
	//  }
	//
	//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
	//    "not enough room for search");
	}

	/* ===========================================================================
	 * Copy without compression as much as possible from the input stream, return
	 * the current block state.
	 * This function does not insert new strings in the dictionary since
	 * uncompressible data is probably not useful. This function is used
	 * only for the level=0 compression option.
	 * NOTE: this function should be optimized to avoid extra copying from
	 * window to pending_buf.
	 */
	function deflate_stored(s, flush) {
	  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
	   * to pending_buf_size, and each stored block has a 5 byte header:
	   */
	  var max_block_size = 0xffff;

	  if (max_block_size > s.pending_buf_size - 5) {
	    max_block_size = s.pending_buf_size - 5;
	  }

	  /* Copy as much as possible from input to output: */
	  for (;;) {
	    /* Fill the window as much as possible: */
	    if (s.lookahead <= 1) {

	      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
	      //  s->block_start >= (long)s->w_size, "slide too late");
	//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
	//        s.block_start >= s.w_size)) {
	//        throw  new Error("slide too late");
	//      }

	      fill_window(s);
	      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }

	      if (s.lookahead === 0) {
	        break;
	      }
	      /* flush the current block */
	    }
	    //Assert(s->block_start >= 0L, "block gone");
	//    if (s.block_start < 0) throw new Error("block gone");

	    s.strstart += s.lookahead;
	    s.lookahead = 0;

	    /* Emit a stored block if pending_buf will be full: */
	    var max_start = s.block_start + max_block_size;

	    if (s.strstart === 0 || s.strstart >= max_start) {
	      /* strstart == 0 is possible when wraparound on 16-bit machine */
	      s.lookahead = s.strstart - max_start;
	      s.strstart = max_start;
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/


	    }
	    /* Flush if we may have to slide, otherwise block_start may become
	     * negative and the data will be gone:
	     */
	    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }

	  s.insert = 0;

	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }

	  if (s.strstart > s.block_start) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_NEED_MORE;
	}

	/* ===========================================================================
	 * Compress as much as possible from the input stream, return the current
	 * block state.
	 * This function does not perform lazy evaluation of matches and inserts
	 * new strings in the dictionary only for unmatched strings or for short
	 * matches. It is used only for the fast compression options.
	 */
	function deflate_fast(s, flush) {
	  var hash_head;        /* head of the hash chain */
	  var bflush;           /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) {
	        break; /* flush the current block */
	      }
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0/*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     * At this point we have always match_length < MIN_MATCH
	     */
	    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */
	    }
	    if (s.match_length >= MIN_MATCH) {
	      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

	      /*** _tr_tally_dist(s, s.strstart - s.match_start,
	                     s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;

	      /* Insert new strings in the hash table only if the match length
	       * is not too large. This saves time but degrades compression.
	       */
	      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
	        s.match_length--; /* string at strstart already in table */
	        do {
	          s.strstart++;
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
	           * always MIN_MATCH bytes ahead.
	           */
	        } while (--s.match_length !== 0);
	        s.strstart++;
	      } else
	      {
	        s.strstart += s.match_length;
	        s.match_length = 0;
	        s.ins_h = s.window[s.strstart];
	        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
	        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

	//#if MIN_MATCH != 3
	//                Call UPDATE_HASH() MIN_MATCH-3 more times
	//#endif
	        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
	         * matter since it will be recomputed at next deflate call.
	         */
	      }
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s.window[s.strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = ((s.strstart < (MIN_MATCH-1)) ? s.strstart : MIN_MATCH-1);
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * Same as above, but achieves better compression. We use a lazy
	 * evaluation for matches: a match is finally adopted only if there is
	 * no better match at the next window position.
	 */
	function deflate_slow(s, flush) {
	  var hash_head;          /* head of hash chain */
	  var bflush;              /* set if current block must be flushed */

	  var max_insert;

	  /* Process the input block. */
	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) { break; } /* flush the current block */
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0/*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     */
	    s.prev_length = s.match_length;
	    s.prev_match = s.match_start;
	    s.match_length = MIN_MATCH-1;

	    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
	        s.strstart - hash_head <= (s.w_size-MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */

	      if (s.match_length <= 5 &&
	         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

	        /* If prev_match is also MIN_MATCH, match_start is garbage
	         * but we will ignore the current match anyway.
	         */
	        s.match_length = MIN_MATCH-1;
	      }
	    }
	    /* If there was a match at the previous step and the current
	     * match is not better, output the previous match:
	     */
	    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
	      max_insert = s.strstart + s.lookahead - MIN_MATCH;
	      /* Do not insert strings in hash table beyond this. */

	      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

	      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
	                     s.prev_length - MIN_MATCH, bflush);***/
	      bflush = trees._tr_tally(s, s.strstart - 1- s.prev_match, s.prev_length - MIN_MATCH);
	      /* Insert in hash table all strings up to the end of the match.
	       * strstart-1 and strstart are already inserted. If there is not
	       * enough lookahead, the last two strings are not inserted in
	       * the hash table.
	       */
	      s.lookahead -= s.prev_length-1;
	      s.prev_length -= 2;
	      do {
	        if (++s.strstart <= max_insert) {
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	        }
	      } while (--s.prev_length !== 0);
	      s.match_available = 0;
	      s.match_length = MIN_MATCH-1;
	      s.strstart++;

	      if (bflush) {
	        /*** FLUSH_BLOCK(s, 0); ***/
	        flush_block_only(s, false);
	        if (s.strm.avail_out === 0) {
	          return BS_NEED_MORE;
	        }
	        /***/
	      }

	    } else if (s.match_available) {
	      /* If there was no match at the previous position, output a
	       * single literal. If there was a match but the current match
	       * is longer, truncate the previous match to a single literal.
	       */
	      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart-1]);

	      if (bflush) {
	        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
	        flush_block_only(s, false);
	        /***/
	      }
	      s.strstart++;
	      s.lookahead--;
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	    } else {
	      /* There is no previous match to compare with, wait for
	       * the next step to decide.
	       */
	      s.match_available = 1;
	      s.strstart++;
	      s.lookahead--;
	    }
	  }
	  //Assert (flush != Z_NO_FLUSH, "no flush?");
	  if (s.match_available) {
	    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart-1]);

	    s.match_available = 0;
	  }
	  s.insert = s.strstart < MIN_MATCH-1 ? s.strstart : MIN_MATCH-1;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_BLOCK_DONE;
	}


	/* ===========================================================================
	 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
	 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
	 * deflate switches away from Z_RLE.)
	 */
	function deflate_rle(s, flush) {
	  var bflush;            /* set if current block must be flushed */
	  var prev;              /* byte at distance one to match */
	  var scan, strend;      /* scan goes up to strend for length of run */

	  var _win = s.window;

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the longest run, plus one for the unrolled loop.
	     */
	    if (s.lookahead <= MAX_MATCH) {
	      fill_window(s);
	      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) { break; } /* flush the current block */
	    }

	    /* See how many times the previous byte repeats */
	    s.match_length = 0;
	    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
	      scan = s.strstart - 1;
	      prev = _win[scan];
	      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
	        strend = s.strstart + MAX_MATCH;
	        do {
	          /*jshint noempty:false*/
	        } while (prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 scan < strend);
	        s.match_length = MAX_MATCH - (strend - scan);
	        if (s.match_length > s.lookahead) {
	          s.match_length = s.lookahead;
	        }
	      }
	      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
	    }

	    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
	    if (s.match_length >= MIN_MATCH) {
	      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

	      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;
	      s.strstart += s.match_length;
	      s.match_length = 0;
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s->window[s->strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
	 * (It will be regenerated if this run of deflate switches away from Huffman.)
	 */
	function deflate_huff(s, flush) {
	  var bflush;             /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we have a literal to write. */
	    if (s.lookahead === 0) {
	      fill_window(s);
	      if (s.lookahead === 0) {
	        if (flush === Z_NO_FLUSH) {
	          return BS_NEED_MORE;
	        }
	        break;      /* flush the current block */
	      }
	    }

	    /* Output a literal byte */
	    s.match_length = 0;
	    //Tracevv((stderr,"%c", s->window[s->strstart]));
	    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
	    s.lookahead--;
	    s.strstart++;
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* Values for max_lazy_match, good_match and max_chain_length, depending on
	 * the desired pack level (0..9). The values given below have been tuned to
	 * exclude worst case performance for pathological files. Better values may be
	 * found for specific files.
	 */
	var Config = function (good_length, max_lazy, nice_length, max_chain, func) {
	  this.good_length = good_length;
	  this.max_lazy = max_lazy;
	  this.nice_length = nice_length;
	  this.max_chain = max_chain;
	  this.func = func;
	};

	var configuration_table;

	configuration_table = [
	  /*      good lazy nice chain */
	  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
	  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
	  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
	  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

	  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
	  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
	  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
	  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
	  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
	  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
	];


	/* ===========================================================================
	 * Initialize the "longest match" routines for a new zlib stream
	 */
	function lm_init(s) {
	  s.window_size = 2 * s.w_size;

	  /*** CLEAR_HASH(s); ***/
	  zero(s.head); // Fill with NIL (= 0);

	  /* Set the default configuration parameters:
	   */
	  s.max_lazy_match = configuration_table[s.level].max_lazy;
	  s.good_match = configuration_table[s.level].good_length;
	  s.nice_match = configuration_table[s.level].nice_length;
	  s.max_chain_length = configuration_table[s.level].max_chain;

	  s.strstart = 0;
	  s.block_start = 0;
	  s.lookahead = 0;
	  s.insert = 0;
	  s.match_length = s.prev_length = MIN_MATCH - 1;
	  s.match_available = 0;
	  s.ins_h = 0;
	}


	function DeflateState() {
	  this.strm = null;            /* pointer back to this zlib stream */
	  this.status = 0;            /* as the name implies */
	  this.pending_buf = null;      /* output still pending */
	  this.pending_buf_size = 0;  /* size of pending_buf */
	  this.pending_out = 0;       /* next pending byte to output to the stream */
	  this.pending = 0;           /* nb of bytes in the pending buffer */
	  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
	  this.gzhead = null;         /* gzip header information to write */
	  this.gzindex = 0;           /* where in extra, name, or comment */
	  this.method = Z_DEFLATED; /* can only be DEFLATED */
	  this.last_flush = -1;   /* value of flush param for previous deflate call */

	  this.w_size = 0;  /* LZ77 window size (32K by default) */
	  this.w_bits = 0;  /* log2(w_size)  (8..16) */
	  this.w_mask = 0;  /* w_size - 1 */

	  this.window = null;
	  /* Sliding window. Input bytes are read into the second half of the window,
	   * and move to the first half later to keep a dictionary of at least wSize
	   * bytes. With this organization, matches are limited to a distance of
	   * wSize-MAX_MATCH bytes, but this ensures that IO is always
	   * performed with a length multiple of the block size.
	   */

	  this.window_size = 0;
	  /* Actual size of window: 2*wSize, except when the user input buffer
	   * is directly used as sliding window.
	   */

	  this.prev = null;
	  /* Link to older string with same hash index. To limit the size of this
	   * array to 64K, this link is maintained only for the last 32K strings.
	   * An index in this array is thus a window index modulo 32K.
	   */

	  this.head = null;   /* Heads of the hash chains or NIL. */

	  this.ins_h = 0;       /* hash index of string to be inserted */
	  this.hash_size = 0;   /* number of elements in hash table */
	  this.hash_bits = 0;   /* log2(hash_size) */
	  this.hash_mask = 0;   /* hash_size-1 */

	  this.hash_shift = 0;
	  /* Number of bits by which ins_h must be shifted at each input
	   * step. It must be such that after MIN_MATCH steps, the oldest
	   * byte no longer takes part in the hash key, that is:
	   *   hash_shift * MIN_MATCH >= hash_bits
	   */

	  this.block_start = 0;
	  /* Window position at the beginning of the current output block. Gets
	   * negative when the window is moved backwards.
	   */

	  this.match_length = 0;      /* length of best match */
	  this.prev_match = 0;        /* previous match */
	  this.match_available = 0;   /* set if previous match exists */
	  this.strstart = 0;          /* start of string to insert */
	  this.match_start = 0;       /* start of matching string */
	  this.lookahead = 0;         /* number of valid bytes ahead in window */

	  this.prev_length = 0;
	  /* Length of the best match at previous step. Matches not greater than this
	   * are discarded. This is used in the lazy match evaluation.
	   */

	  this.max_chain_length = 0;
	  /* To speed up deflation, hash chains are never searched beyond this
	   * length.  A higher limit improves compression ratio but degrades the
	   * speed.
	   */

	  this.max_lazy_match = 0;
	  /* Attempt to find a better match only when the current match is strictly
	   * smaller than this value. This mechanism is used only for compression
	   * levels >= 4.
	   */
	  // That's alias to max_lazy_match, don't use directly
	  //this.max_insert_length = 0;
	  /* Insert new strings in the hash table only if the match length is not
	   * greater than this length. This saves time but degrades compression.
	   * max_insert_length is used only for compression levels <= 3.
	   */

	  this.level = 0;     /* compression level (1..9) */
	  this.strategy = 0;  /* favor or force Huffman coding*/

	  this.good_match = 0;
	  /* Use a faster search when the previous match is longer than this */

	  this.nice_match = 0; /* Stop searching when current match exceeds this */

	              /* used by trees.c: */

	  /* Didn't use ct_data typedef below to suppress compiler warning */

	  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
	  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
	  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

	  // Use flat array of DOUBLE size, with interleaved fata,
	  // because JS does not support effective
	  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
	  this.dyn_dtree  = new utils.Buf16((2*D_CODES+1) * 2);
	  this.bl_tree    = new utils.Buf16((2*BL_CODES+1) * 2);
	  zero(this.dyn_ltree);
	  zero(this.dyn_dtree);
	  zero(this.bl_tree);

	  this.l_desc   = null;         /* desc. for literal tree */
	  this.d_desc   = null;         /* desc. for distance tree */
	  this.bl_desc  = null;         /* desc. for bit length tree */

	  //ush bl_count[MAX_BITS+1];
	  this.bl_count = new utils.Buf16(MAX_BITS+1);
	  /* number of codes at each bit length for an optimal tree */

	  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
	  this.heap = new utils.Buf16(2*L_CODES+1);  /* heap used to build the Huffman trees */
	  zero(this.heap);

	  this.heap_len = 0;               /* number of elements in the heap */
	  this.heap_max = 0;               /* element of largest frequency */
	  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
	   * The same heap array is used to build all trees.
	   */

	  this.depth = new utils.Buf16(2*L_CODES+1); //uch depth[2*L_CODES+1];
	  zero(this.depth);
	  /* Depth of each subtree used as tie breaker for trees of equal frequency
	   */

	  this.l_buf = 0;          /* buffer index for literals or lengths */

	  this.lit_bufsize = 0;
	  /* Size of match buffer for literals/lengths.  There are 4 reasons for
	   * limiting lit_bufsize to 64K:
	   *   - frequencies can be kept in 16 bit counters
	   *   - if compression is not successful for the first block, all input
	   *     data is still in the window so we can still emit a stored block even
	   *     when input comes from standard input.  (This can also be done for
	   *     all blocks if lit_bufsize is not greater than 32K.)
	   *   - if compression is not successful for a file smaller than 64K, we can
	   *     even emit a stored file instead of a stored block (saving 5 bytes).
	   *     This is applicable only for zip (not gzip or zlib).
	   *   - creating new Huffman trees less frequently may not provide fast
	   *     adaptation to changes in the input data statistics. (Take for
	   *     example a binary file with poorly compressible code followed by
	   *     a highly compressible string table.) Smaller buffer sizes give
	   *     fast adaptation but have of course the overhead of transmitting
	   *     trees more frequently.
	   *   - I can't count above 4
	   */

	  this.last_lit = 0;      /* running index in l_buf */

	  this.d_buf = 0;
	  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
	   * the same number of elements. To use different lengths, an extra flag
	   * array would be necessary.
	   */

	  this.opt_len = 0;       /* bit length of current block with optimal trees */
	  this.static_len = 0;    /* bit length of current block with static trees */
	  this.matches = 0;       /* number of string matches in current block */
	  this.insert = 0;        /* bytes at end of window left to insert */


	  this.bi_buf = 0;
	  /* Output buffer. bits are inserted starting at the bottom (least
	   * significant bits).
	   */
	  this.bi_valid = 0;
	  /* Number of valid bits in bi_buf.  All bits above the last valid bit
	   * are always zero.
	   */

	  // Used for window memory init. We safely ignore it for JS. That makes
	  // sense only for pointers and memory check tools.
	  //this.high_water = 0;
	  /* High water mark offset in window for initialized bytes -- bytes above
	   * this are set to zero in order to avoid memory check warnings when
	   * longest match routines access bytes past the input.  This is then
	   * updated to the new high water mark.
	   */
	}


	function deflateResetKeep(strm) {
	  var s;

	  if (!strm || !strm.state) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.total_in = strm.total_out = 0;
	  strm.data_type = Z_UNKNOWN;

	  s = strm.state;
	  s.pending = 0;
	  s.pending_out = 0;

	  if (s.wrap < 0) {
	    s.wrap = -s.wrap;
	    /* was made negative by deflate(..., Z_FINISH); */
	  }
	  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
	  strm.adler = (s.wrap === 2) ?
	    0  // crc32(0, Z_NULL, 0)
	  :
	    1; // adler32(0, Z_NULL, 0)
	  s.last_flush = Z_NO_FLUSH;
	  trees._tr_init(s);
	  return Z_OK;
	}


	function deflateReset(strm) {
	  var ret = deflateResetKeep(strm);
	  if (ret === Z_OK) {
	    lm_init(strm.state);
	  }
	  return ret;
	}


	function deflateSetHeader(strm, head) {
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
	  strm.state.gzhead = head;
	  return Z_OK;
	}


	function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
	  if (!strm) { // === Z_NULL
	    return Z_STREAM_ERROR;
	  }
	  var wrap = 1;

	  if (level === Z_DEFAULT_COMPRESSION) {
	    level = 6;
	  }

	  if (windowBits < 0) { /* suppress zlib wrapper */
	    wrap = 0;
	    windowBits = -windowBits;
	  }

	  else if (windowBits > 15) {
	    wrap = 2;           /* write gzip wrapper instead */
	    windowBits -= 16;
	  }


	  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
	    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
	    strategy < 0 || strategy > Z_FIXED) {
	    return err(strm, Z_STREAM_ERROR);
	  }


	  if (windowBits === 8) {
	    windowBits = 9;
	  }
	  /* until 256-byte window bug fixed */

	  var s = new DeflateState();

	  strm.state = s;
	  s.strm = strm;

	  s.wrap = wrap;
	  s.gzhead = null;
	  s.w_bits = windowBits;
	  s.w_size = 1 << s.w_bits;
	  s.w_mask = s.w_size - 1;

	  s.hash_bits = memLevel + 7;
	  s.hash_size = 1 << s.hash_bits;
	  s.hash_mask = s.hash_size - 1;
	  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

	  s.window = new utils.Buf8(s.w_size * 2);
	  s.head = new utils.Buf16(s.hash_size);
	  s.prev = new utils.Buf16(s.w_size);

	  // Don't need mem init magic for JS.
	  //s.high_water = 0;  /* nothing written to s->window yet */

	  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

	  s.pending_buf_size = s.lit_bufsize * 4;
	  s.pending_buf = new utils.Buf8(s.pending_buf_size);

	  s.d_buf = s.lit_bufsize >> 1;
	  s.l_buf = (1 + 2) * s.lit_bufsize;

	  s.level = level;
	  s.strategy = strategy;
	  s.method = method;

	  return deflateReset(strm);
	}

	function deflateInit(strm, level) {
	  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
	}


	function deflate(strm, flush) {
	  var old_flush, s;
	  var beg, val; // for gzip header write only

	  if (!strm || !strm.state ||
	    flush > Z_BLOCK || flush < 0) {
	    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
	  }

	  s = strm.state;

	  if (!strm.output ||
	      (!strm.input && strm.avail_in !== 0) ||
	      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
	    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
	  }

	  s.strm = strm; /* just in case */
	  old_flush = s.last_flush;
	  s.last_flush = flush;

	  /* Write the header */
	  if (s.status === INIT_STATE) {

	    if (s.wrap === 2) { // GZIP header
	      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
	      put_byte(s, 31);
	      put_byte(s, 139);
	      put_byte(s, 8);
	      if (!s.gzhead) { // s->gzhead == Z_NULL
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, s.level === 9 ? 2 :
	                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
	                     4 : 0));
	        put_byte(s, OS_CODE);
	        s.status = BUSY_STATE;
	      }
	      else {
	        put_byte(s, (s.gzhead.text ? 1 : 0) +
	                    (s.gzhead.hcrc ? 2 : 0) +
	                    (!s.gzhead.extra ? 0 : 4) +
	                    (!s.gzhead.name ? 0 : 8) +
	                    (!s.gzhead.comment ? 0 : 16)
	                );
	        put_byte(s, s.gzhead.time & 0xff);
	        put_byte(s, (s.gzhead.time >> 8) & 0xff);
	        put_byte(s, (s.gzhead.time >> 16) & 0xff);
	        put_byte(s, (s.gzhead.time >> 24) & 0xff);
	        put_byte(s, s.level === 9 ? 2 :
	                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
	                     4 : 0));
	        put_byte(s, s.gzhead.os & 0xff);
	        if (s.gzhead.extra && s.gzhead.extra.length) {
	          put_byte(s, s.gzhead.extra.length & 0xff);
	          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
	        }
	        if (s.gzhead.hcrc) {
	          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
	        }
	        s.gzindex = 0;
	        s.status = EXTRA_STATE;
	      }
	    }
	    else // DEFLATE header
	    {
	      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
	      var level_flags = -1;

	      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
	        level_flags = 0;
	      } else if (s.level < 6) {
	        level_flags = 1;
	      } else if (s.level === 6) {
	        level_flags = 2;
	      } else {
	        level_flags = 3;
	      }
	      header |= (level_flags << 6);
	      if (s.strstart !== 0) { header |= PRESET_DICT; }
	      header += 31 - (header % 31);

	      s.status = BUSY_STATE;
	      putShortMSB(s, header);

	      /* Save the adler32 of the preset dictionary: */
	      if (s.strstart !== 0) {
	        putShortMSB(s, strm.adler >>> 16);
	        putShortMSB(s, strm.adler & 0xffff);
	      }
	      strm.adler = 1; // adler32(0L, Z_NULL, 0);
	    }
	  }

	//#ifdef GZIP
	  if (s.status === EXTRA_STATE) {
	    if (s.gzhead.extra/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */

	      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            break;
	          }
	        }
	        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
	        s.gzindex++;
	      }
	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (s.gzindex === s.gzhead.extra.length) {
	        s.gzindex = 0;
	        s.status = NAME_STATE;
	      }
	    }
	    else {
	      s.status = NAME_STATE;
	    }
	  }
	  if (s.status === NAME_STATE) {
	    if (s.gzhead.name/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */
	      //int val;

	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.name.length) {
	          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);

	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.gzindex = 0;
	        s.status = COMMENT_STATE;
	      }
	    }
	    else {
	      s.status = COMMENT_STATE;
	    }
	  }
	  if (s.status === COMMENT_STATE) {
	    if (s.gzhead.comment/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */
	      //int val;

	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.comment.length) {
	          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);

	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.status = HCRC_STATE;
	      }
	    }
	    else {
	      s.status = HCRC_STATE;
	    }
	  }
	  if (s.status === HCRC_STATE) {
	    if (s.gzhead.hcrc) {
	      if (s.pending + 2 > s.pending_buf_size) {
	        flush_pending(strm);
	      }
	      if (s.pending + 2 <= s.pending_buf_size) {
	        put_byte(s, strm.adler & 0xff);
	        put_byte(s, (strm.adler >> 8) & 0xff);
	        strm.adler = 0; //crc32(0L, Z_NULL, 0);
	        s.status = BUSY_STATE;
	      }
	    }
	    else {
	      s.status = BUSY_STATE;
	    }
	  }
	//#endif

	  /* Flush as much pending output as possible */
	  if (s.pending !== 0) {
	    flush_pending(strm);
	    if (strm.avail_out === 0) {
	      /* Since avail_out is 0, deflate will be called again with
	       * more output space, but possibly with both pending and
	       * avail_in equal to zero. There won't be anything to do,
	       * but this is not an error situation so make sure we
	       * return OK instead of BUF_ERROR at next call of deflate:
	       */
	      s.last_flush = -1;
	      return Z_OK;
	    }

	    /* Make sure there is something to do and avoid duplicate consecutive
	     * flushes. For repeated and useless calls with Z_FINISH, we keep
	     * returning Z_STREAM_END instead of Z_BUF_ERROR.
	     */
	  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
	    flush !== Z_FINISH) {
	    return err(strm, Z_BUF_ERROR);
	  }

	  /* User must not provide more input after the first FINISH: */
	  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
	    return err(strm, Z_BUF_ERROR);
	  }

	  /* Start a new block or continue the current one.
	   */
	  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
	    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
	    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
	      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
	        configuration_table[s.level].func(s, flush));

	    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
	      s.status = FINISH_STATE;
	    }
	    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
	      if (strm.avail_out === 0) {
	        s.last_flush = -1;
	        /* avoid BUF_ERROR next call, see above */
	      }
	      return Z_OK;
	      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
	       * of deflate should use the same flush parameter to make sure
	       * that the flush is complete. So we don't have to output an
	       * empty block here, this will be done at next call. This also
	       * ensures that for a very small output buffer, we emit at most
	       * one empty block.
	       */
	    }
	    if (bstate === BS_BLOCK_DONE) {
	      if (flush === Z_PARTIAL_FLUSH) {
	        trees._tr_align(s);
	      }
	      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

	        trees._tr_stored_block(s, 0, 0, false);
	        /* For a full flush, this empty block will be recognized
	         * as a special marker by inflate_sync().
	         */
	        if (flush === Z_FULL_FLUSH) {
	          /*** CLEAR_HASH(s); ***/             /* forget history */
	          zero(s.head); // Fill with NIL (= 0);

	          if (s.lookahead === 0) {
	            s.strstart = 0;
	            s.block_start = 0;
	            s.insert = 0;
	          }
	        }
	      }
	      flush_pending(strm);
	      if (strm.avail_out === 0) {
	        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
	        return Z_OK;
	      }
	    }
	  }
	  //Assert(strm->avail_out > 0, "bug2");
	  //if (strm.avail_out <= 0) { throw new Error("bug2");}

	  if (flush !== Z_FINISH) { return Z_OK; }
	  if (s.wrap <= 0) { return Z_STREAM_END; }

	  /* Write the trailer */
	  if (s.wrap === 2) {
	    put_byte(s, strm.adler & 0xff);
	    put_byte(s, (strm.adler >> 8) & 0xff);
	    put_byte(s, (strm.adler >> 16) & 0xff);
	    put_byte(s, (strm.adler >> 24) & 0xff);
	    put_byte(s, strm.total_in & 0xff);
	    put_byte(s, (strm.total_in >> 8) & 0xff);
	    put_byte(s, (strm.total_in >> 16) & 0xff);
	    put_byte(s, (strm.total_in >> 24) & 0xff);
	  }
	  else
	  {
	    putShortMSB(s, strm.adler >>> 16);
	    putShortMSB(s, strm.adler & 0xffff);
	  }

	  flush_pending(strm);
	  /* If avail_out is zero, the application will call deflate again
	   * to flush the rest.
	   */
	  if (s.wrap > 0) { s.wrap = -s.wrap; }
	  /* write the trailer only once! */
	  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
	}

	function deflateEnd(strm) {
	  var status;

	  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
	    return Z_STREAM_ERROR;
	  }

	  status = strm.state.status;
	  if (status !== INIT_STATE &&
	    status !== EXTRA_STATE &&
	    status !== NAME_STATE &&
	    status !== COMMENT_STATE &&
	    status !== HCRC_STATE &&
	    status !== BUSY_STATE &&
	    status !== FINISH_STATE
	  ) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.state = null;

	  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
	}

	/* =========================================================================
	 * Copy the source state to the destination state
	 */
	//function deflateCopy(dest, source) {
	//
	//}

	exports.deflateInit = deflateInit;
	exports.deflateInit2 = deflateInit2;
	exports.deflateReset = deflateReset;
	exports.deflateResetKeep = deflateResetKeep;
	exports.deflateSetHeader = deflateSetHeader;
	exports.deflate = deflate;
	exports.deflateEnd = deflateEnd;
	exports.deflateInfo = 'pako deflate (from Nodeca project)';

	/* Not implemented
	exports.deflateBound = deflateBound;
	exports.deflateCopy = deflateCopy;
	exports.deflateSetDictionary = deflateSetDictionary;
	exports.deflateParams = deflateParams;
	exports.deflatePending = deflatePending;
	exports.deflatePrime = deflatePrime;
	exports.deflateTune = deflateTune;
	*/

	},{"../utils/common":3,"./adler32":5,"./crc32":7,"./messages":13,"./trees":14}],9:[function(require,module,exports){
	'use strict';


	function GZheader() {
	  /* true if compressed data believed to be text */
	  this.text       = 0;
	  /* modification time */
	  this.time       = 0;
	  /* extra flags (not used when writing a gzip file) */
	  this.xflags     = 0;
	  /* operating system */
	  this.os         = 0;
	  /* pointer to extra field or Z_NULL if none */
	  this.extra      = null;
	  /* extra field length (valid if extra != Z_NULL) */
	  this.extra_len  = 0; // Actually, we don't need it in JS,
	                       // but leave for few code modifications

	  //
	  // Setup limits is not necessary because in js we should not preallocate memory
	  // for inflate use constant limit in 65536 bytes
	  //

	  /* space at extra (only when reading header) */
	  // this.extra_max  = 0;
	  /* pointer to zero-terminated file name or Z_NULL */
	  this.name       = '';
	  /* space at name (only when reading header) */
	  // this.name_max   = 0;
	  /* pointer to zero-terminated comment or Z_NULL */
	  this.comment    = '';
	  /* space at comment (only when reading header) */
	  // this.comm_max   = 0;
	  /* true if there was or will be a header crc */
	  this.hcrc       = 0;
	  /* true when done reading gzip header (not used when writing a gzip file) */
	  this.done       = false;
	}

	module.exports = GZheader;

	},{}],10:[function(require,module,exports){
	'use strict';

	// See state defs from inflate.js
	var BAD = 30;       /* got a data error -- remain here until reset */
	var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

	/*
	   Decode literal, length, and distance codes and write out the resulting
	   literal and match bytes until either not enough input or output is
	   available, an end-of-block is encountered, or a data error is encountered.
	   When large enough input and output buffers are supplied to inflate(), for
	   example, a 16K input buffer and a 64K output buffer, more than 95% of the
	   inflate execution time is spent in this routine.

	   Entry assumptions:

	        state.mode === LEN
	        strm.avail_in >= 6
	        strm.avail_out >= 258
	        start >= strm.avail_out
	        state.bits < 8

	   On return, state.mode is one of:

	        LEN -- ran out of enough output space or enough available input
	        TYPE -- reached end of block code, inflate() to interpret next block
	        BAD -- error in block data

	   Notes:

	    - The maximum input bits used by a length/distance pair is 15 bits for the
	      length code, 5 bits for the length extra, 15 bits for the distance code,
	      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
	      Therefore if strm.avail_in >= 6, then there is enough input to avoid
	      checking for available input while decoding.

	    - The maximum bytes that a single length/distance pair can output is 258
	      bytes, which is the maximum length that can be coded.  inflate_fast()
	      requires strm.avail_out >= 258 for each loop to avoid checking for
	      output space.
	 */
	module.exports = function inflate_fast(strm, start) {
	  var state;
	  var _in;                    /* local strm.input */
	  var last;                   /* have enough input while in < last */
	  var _out;                   /* local strm.output */
	  var beg;                    /* inflate()'s initial strm.output */
	  var end;                    /* while out < end, enough space available */
	//#ifdef INFLATE_STRICT
	  var dmax;                   /* maximum distance from zlib header */
	//#endif
	  var wsize;                  /* window size or zero if not using window */
	  var whave;                  /* valid bytes in the window */
	  var wnext;                  /* window write index */
	  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
	  var s_window;               /* allocated sliding window, if wsize != 0 */
	  var hold;                   /* local strm.hold */
	  var bits;                   /* local strm.bits */
	  var lcode;                  /* local strm.lencode */
	  var dcode;                  /* local strm.distcode */
	  var lmask;                  /* mask for first level of length codes */
	  var dmask;                  /* mask for first level of distance codes */
	  var here;                   /* retrieved table entry */
	  var op;                     /* code bits, operation, extra bits, or */
	                              /*  window position, window bytes to copy */
	  var len;                    /* match length, unused bytes */
	  var dist;                   /* match distance */
	  var from;                   /* where to copy match from */
	  var from_source;


	  var input, output; // JS specific, because we have no pointers

	  /* copy state to local variables */
	  state = strm.state;
	  //here = state.here;
	  _in = strm.next_in;
	  input = strm.input;
	  last = _in + (strm.avail_in - 5);
	  _out = strm.next_out;
	  output = strm.output;
	  beg = _out - (start - strm.avail_out);
	  end = _out + (strm.avail_out - 257);
	//#ifdef INFLATE_STRICT
	  dmax = state.dmax;
	//#endif
	  wsize = state.wsize;
	  whave = state.whave;
	  wnext = state.wnext;
	  s_window = state.window;
	  hold = state.hold;
	  bits = state.bits;
	  lcode = state.lencode;
	  dcode = state.distcode;
	  lmask = (1 << state.lenbits) - 1;
	  dmask = (1 << state.distbits) - 1;


	  /* decode literals and length/distances until end-of-block or not enough
	     input data or output space */

	  top:
	  do {
	    if (bits < 15) {
	      hold += input[_in++] << bits;
	      bits += 8;
	      hold += input[_in++] << bits;
	      bits += 8;
	    }

	    here = lcode[hold & lmask];

	    dolen:
	    for (;;) { // Goto emulation
	      op = here >>> 24/*here.bits*/;
	      hold >>>= op;
	      bits -= op;
	      op = (here >>> 16) & 0xff/*here.op*/;
	      if (op === 0) {                          /* literal */
	        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	        //        "inflate:         literal '%c'\n" :
	        //        "inflate:         literal 0x%02x\n", here.val));
	        output[_out++] = here & 0xffff/*here.val*/;
	      }
	      else if (op & 16) {                     /* length base */
	        len = here & 0xffff/*here.val*/;
	        op &= 15;                           /* number of extra bits */
	        if (op) {
	          if (bits < op) {
	            hold += input[_in++] << bits;
	            bits += 8;
	          }
	          len += hold & ((1 << op) - 1);
	          hold >>>= op;
	          bits -= op;
	        }
	        //Tracevv((stderr, "inflate:         length %u\n", len));
	        if (bits < 15) {
	          hold += input[_in++] << bits;
	          bits += 8;
	          hold += input[_in++] << bits;
	          bits += 8;
	        }
	        here = dcode[hold & dmask];

	        dodist:
	        for (;;) { // goto emulation
	          op = here >>> 24/*here.bits*/;
	          hold >>>= op;
	          bits -= op;
	          op = (here >>> 16) & 0xff/*here.op*/;

	          if (op & 16) {                      /* distance base */
	            dist = here & 0xffff/*here.val*/;
	            op &= 15;                       /* number of extra bits */
	            if (bits < op) {
	              hold += input[_in++] << bits;
	              bits += 8;
	              if (bits < op) {
	                hold += input[_in++] << bits;
	                bits += 8;
	              }
	            }
	            dist += hold & ((1 << op) - 1);
	//#ifdef INFLATE_STRICT
	            if (dist > dmax) {
	              strm.msg = 'invalid distance too far back';
	              state.mode = BAD;
	              break top;
	            }
	//#endif
	            hold >>>= op;
	            bits -= op;
	            //Tracevv((stderr, "inflate:         distance %u\n", dist));
	            op = _out - beg;                /* max distance in output */
	            if (dist > op) {                /* see if copy from window */
	              op = dist - op;               /* distance back in window */
	              if (op > whave) {
	                if (state.sane) {
	                  strm.msg = 'invalid distance too far back';
	                  state.mode = BAD;
	                  break top;
	                }

	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility
	//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	//                if (len <= op - whave) {
	//                  do {
	//                    output[_out++] = 0;
	//                  } while (--len);
	//                  continue top;
	//                }
	//                len -= op - whave;
	//                do {
	//                  output[_out++] = 0;
	//                } while (--op > whave);
	//                if (op === 0) {
	//                  from = _out - dist;
	//                  do {
	//                    output[_out++] = output[from++];
	//                  } while (--len);
	//                  continue top;
	//                }
	//#endif
	              }
	              from = 0; // window index
	              from_source = s_window;
	              if (wnext === 0) {           /* very common case */
	                from += wsize - op;
	                if (op < len) {         /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = _out - dist;  /* rest from output */
	                  from_source = output;
	                }
	              }
	              else if (wnext < op) {      /* wrap around window */
	                from += wsize + wnext - op;
	                op -= wnext;
	                if (op < len) {         /* some from end of window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = 0;
	                  if (wnext < len) {  /* some from start of window */
	                    op = wnext;
	                    len -= op;
	                    do {
	                      output[_out++] = s_window[from++];
	                    } while (--op);
	                    from = _out - dist;      /* rest from output */
	                    from_source = output;
	                  }
	                }
	              }
	              else {                      /* contiguous in window */
	                from += wnext - op;
	                if (op < len) {         /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = _out - dist;  /* rest from output */
	                  from_source = output;
	                }
	              }
	              while (len > 2) {
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                len -= 3;
	              }
	              if (len) {
	                output[_out++] = from_source[from++];
	                if (len > 1) {
	                  output[_out++] = from_source[from++];
	                }
	              }
	            }
	            else {
	              from = _out - dist;          /* copy direct from output */
	              do {                        /* minimum length is three */
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                len -= 3;
	              } while (len > 2);
	              if (len) {
	                output[_out++] = output[from++];
	                if (len > 1) {
	                  output[_out++] = output[from++];
	                }
	              }
	            }
	          }
	          else if ((op & 64) === 0) {          /* 2nd level distance code */
	            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
	            continue dodist;
	          }
	          else {
	            strm.msg = 'invalid distance code';
	            state.mode = BAD;
	            break top;
	          }

	          break; // need to emulate goto via "continue"
	        }
	      }
	      else if ((op & 64) === 0) {              /* 2nd level length code */
	        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
	        continue dolen;
	      }
	      else if (op & 32) {                     /* end-of-block */
	        //Tracevv((stderr, "inflate:         end of block\n"));
	        state.mode = TYPE;
	        break top;
	      }
	      else {
	        strm.msg = 'invalid literal/length code';
	        state.mode = BAD;
	        break top;
	      }

	      break; // need to emulate goto via "continue"
	    }
	  } while (_in < last && _out < end);

	  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
	  len = bits >> 3;
	  _in -= len;
	  bits -= len << 3;
	  hold &= (1 << bits) - 1;

	  /* update state and return */
	  strm.next_in = _in;
	  strm.next_out = _out;
	  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
	  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
	  state.hold = hold;
	  state.bits = bits;
	  return;
	};

	},{}],11:[function(require,module,exports){
	'use strict';


	var utils = require('../utils/common');
	var adler32 = require('./adler32');
	var crc32   = require('./crc32');
	var inflate_fast = require('./inffast');
	var inflate_table = require('./inftrees');

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	/* Allowed flush values; see deflate() and inflate() below for details */
	//var Z_NO_FLUSH      = 0;
	//var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	//var Z_FULL_FLUSH    = 3;
	var Z_FINISH        = 4;
	var Z_BLOCK         = 5;
	var Z_TREES         = 6;


	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR  = -2;
	var Z_DATA_ERROR    = -3;
	var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR     = -5;
	//var Z_VERSION_ERROR = -6;

	/* The deflate compression method */
	var Z_DEFLATED  = 8;


	/* STATES ====================================================================*/
	/* ===========================================================================*/


	var    HEAD = 1;       /* i: waiting for magic header */
	var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
	var    TIME = 3;       /* i: waiting for modification time (gzip) */
	var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
	var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
	var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
	var    NAME = 7;       /* i: waiting for end of file name (gzip) */
	var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
	var    HCRC = 9;       /* i: waiting for header crc (gzip) */
	var    DICTID = 10;    /* i: waiting for dictionary check value */
	var    DICT = 11;      /* waiting for inflateSetDictionary() call */
	var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
	var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
	var        STORED = 14;    /* i: waiting for stored size (length and complement) */
	var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
	var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
	var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
	var        LENLENS = 18;   /* i: waiting for code length code lengths */
	var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
	var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
	var            LEN = 21;       /* i: waiting for length/lit/eob code */
	var            LENEXT = 22;    /* i: waiting for length extra bits */
	var            DIST = 23;      /* i: waiting for distance code */
	var            DISTEXT = 24;   /* i: waiting for distance extra bits */
	var            MATCH = 25;     /* o: waiting for output space to copy string */
	var            LIT = 26;       /* o: waiting for output space to write literal */
	var    CHECK = 27;     /* i: waiting for 32-bit check value */
	var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
	var    DONE = 29;      /* finished check, done -- remain here until reset */
	var    BAD = 30;       /* got a data error -- remain here until reset */
	var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
	var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

	/* ===========================================================================*/



	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_WBITS = MAX_WBITS;


	function ZSWAP32(q) {
	  return  (((q >>> 24) & 0xff) +
	          ((q >>> 8) & 0xff00) +
	          ((q & 0xff00) << 8) +
	          ((q & 0xff) << 24));
	}


	function InflateState() {
	  this.mode = 0;             /* current inflate mode */
	  this.last = false;          /* true if processing last block */
	  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
	  this.havedict = false;      /* true if dictionary provided */
	  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
	  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
	  this.check = 0;             /* protected copy of check value */
	  this.total = 0;             /* protected copy of output count */
	  // TODO: may be {}
	  this.head = null;           /* where to save gzip header information */

	  /* sliding window */
	  this.wbits = 0;             /* log base 2 of requested window size */
	  this.wsize = 0;             /* window size or zero if not using window */
	  this.whave = 0;             /* valid bytes in the window */
	  this.wnext = 0;             /* window write index */
	  this.window = null;         /* allocated sliding window, if needed */

	  /* bit accumulator */
	  this.hold = 0;              /* input bit accumulator */
	  this.bits = 0;              /* number of bits in "in" */

	  /* for string and stored block copying */
	  this.length = 0;            /* literal or length of data to copy */
	  this.offset = 0;            /* distance back to copy string from */

	  /* for table and code decoding */
	  this.extra = 0;             /* extra bits needed */

	  /* fixed and dynamic code tables */
	  this.lencode = null;          /* starting table for length/literal codes */
	  this.distcode = null;         /* starting table for distance codes */
	  this.lenbits = 0;           /* index bits for lencode */
	  this.distbits = 0;          /* index bits for distcode */

	  /* dynamic table building */
	  this.ncode = 0;             /* number of code length code lengths */
	  this.nlen = 0;              /* number of length code lengths */
	  this.ndist = 0;             /* number of distance code lengths */
	  this.have = 0;              /* number of code lengths in lens[] */
	  this.next = null;              /* next available space in codes[] */

	  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
	  this.work = new utils.Buf16(288); /* work area for code table building */

	  /*
	   because we don't have pointers in js, we use lencode and distcode directly
	   as buffers so we don't need codes
	  */
	  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
	  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
	  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
	  this.sane = 0;                   /* if false, allow invalid distance too far */
	  this.back = 0;                   /* bits back of last unprocessed length/lit */
	  this.was = 0;                    /* initial length of match */
	}

	function inflateResetKeep(strm) {
	  var state;

	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  strm.total_in = strm.total_out = state.total = 0;
	  strm.msg = ''; /*Z_NULL*/
	  if (state.wrap) {       /* to support ill-conceived Java test suite */
	    strm.adler = state.wrap & 1;
	  }
	  state.mode = HEAD;
	  state.last = 0;
	  state.havedict = 0;
	  state.dmax = 32768;
	  state.head = null/*Z_NULL*/;
	  state.hold = 0;
	  state.bits = 0;
	  //state.lencode = state.distcode = state.next = state.codes;
	  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
	  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

	  state.sane = 1;
	  state.back = -1;
	  //Tracev((stderr, "inflate: reset\n"));
	  return Z_OK;
	}

	function inflateReset(strm) {
	  var state;

	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  state.wsize = 0;
	  state.whave = 0;
	  state.wnext = 0;
	  return inflateResetKeep(strm);

	}

	function inflateReset2(strm, windowBits) {
	  var wrap;
	  var state;

	  /* get the state */
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;

	  /* extract wrap request from windowBits parameter */
	  if (windowBits < 0) {
	    wrap = 0;
	    windowBits = -windowBits;
	  }
	  else {
	    wrap = (windowBits >> 4) + 1;
	    if (windowBits < 48) {
	      windowBits &= 15;
	    }
	  }

	  /* set number of window bits, free window if different */
	  if (windowBits && (windowBits < 8 || windowBits > 15)) {
	    return Z_STREAM_ERROR;
	  }
	  if (state.window !== null && state.wbits !== windowBits) {
	    state.window = null;
	  }

	  /* update state and reset the rest of it */
	  state.wrap = wrap;
	  state.wbits = windowBits;
	  return inflateReset(strm);
	}

	function inflateInit2(strm, windowBits) {
	  var ret;
	  var state;

	  if (!strm) { return Z_STREAM_ERROR; }
	  //strm.msg = Z_NULL;                 /* in case we return an error */

	  state = new InflateState();

	  //if (state === Z_NULL) return Z_MEM_ERROR;
	  //Tracev((stderr, "inflate: allocated\n"));
	  strm.state = state;
	  state.window = null/*Z_NULL*/;
	  ret = inflateReset2(strm, windowBits);
	  if (ret !== Z_OK) {
	    strm.state = null/*Z_NULL*/;
	  }
	  return ret;
	}

	function inflateInit(strm) {
	  return inflateInit2(strm, DEF_WBITS);
	}


	/*
	 Return state with length and distance decoding tables and index sizes set to
	 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
	 If BUILDFIXED is defined, then instead this routine builds the tables the
	 first time it's called, and returns those tables the first time and
	 thereafter.  This reduces the size of the code by about 2K bytes, in
	 exchange for a little execution time.  However, BUILDFIXED should not be
	 used for threaded applications, since the rewriting of the tables and virgin
	 may not be thread-safe.
	 */
	var virgin = true;

	var lenfix, distfix; // We have no pointers in JS, so keep tables separate

	function fixedtables(state) {
	  /* build fixed huffman tables if first call (may not be thread safe) */
	  if (virgin) {
	    var sym;

	    lenfix = new utils.Buf32(512);
	    distfix = new utils.Buf32(32);

	    /* literal/length table */
	    sym = 0;
	    while (sym < 144) { state.lens[sym++] = 8; }
	    while (sym < 256) { state.lens[sym++] = 9; }
	    while (sym < 280) { state.lens[sym++] = 7; }
	    while (sym < 288) { state.lens[sym++] = 8; }

	    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, {bits: 9});

	    /* distance table */
	    sym = 0;
	    while (sym < 32) { state.lens[sym++] = 5; }

	    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, {bits: 5});

	    /* do this just once */
	    virgin = false;
	  }

	  state.lencode = lenfix;
	  state.lenbits = 9;
	  state.distcode = distfix;
	  state.distbits = 5;
	}


	/*
	 Update the window with the last wsize (normally 32K) bytes written before
	 returning.  If window does not exist yet, create it.  This is only called
	 when a window is already in use, or when output has been written during this
	 inflate call, but the end of the deflate stream has not been reached yet.
	 It is also called to create a window for dictionary data when a dictionary
	 is loaded.

	 Providing output buffers larger than 32K to inflate() should provide a speed
	 advantage, since only the last 32K of output is copied to the sliding window
	 upon return from inflate(), and since all distances after the first 32K of
	 output will fall in the output data, making match copies simpler and faster.
	 The advantage may be dependent on the size of the processor's data caches.
	 */
	function updatewindow(strm, src, end, copy) {
	  var dist;
	  var state = strm.state;

	  /* if it hasn't been done already, allocate space for the window */
	  if (state.window === null) {
	    state.wsize = 1 << state.wbits;
	    state.wnext = 0;
	    state.whave = 0;

	    state.window = new utils.Buf8(state.wsize);
	  }

	  /* copy state->wsize or less output bytes into the circular window */
	  if (copy >= state.wsize) {
	    utils.arraySet(state.window,src, end - state.wsize, state.wsize, 0);
	    state.wnext = 0;
	    state.whave = state.wsize;
	  }
	  else {
	    dist = state.wsize - state.wnext;
	    if (dist > copy) {
	      dist = copy;
	    }
	    //zmemcpy(state->window + state->wnext, end - copy, dist);
	    utils.arraySet(state.window,src, end - copy, dist, state.wnext);
	    copy -= dist;
	    if (copy) {
	      //zmemcpy(state->window, end - copy, copy);
	      utils.arraySet(state.window,src, end - copy, copy, 0);
	      state.wnext = copy;
	      state.whave = state.wsize;
	    }
	    else {
	      state.wnext += dist;
	      if (state.wnext === state.wsize) { state.wnext = 0; }
	      if (state.whave < state.wsize) { state.whave += dist; }
	    }
	  }
	  return 0;
	}

	function inflate(strm, flush) {
	  var state;
	  var input, output;          // input/output buffers
	  var next;                   /* next input INDEX */
	  var put;                    /* next output INDEX */
	  var have, left;             /* available input and output */
	  var hold;                   /* bit buffer */
	  var bits;                   /* bits in bit buffer */
	  var _in, _out;              /* save starting available input and output */
	  var copy;                   /* number of stored or match bytes to copy */
	  var from;                   /* where to copy match bytes from */
	  var from_source;
	  var here = 0;               /* current decoding table entry */
	  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
	  //var last;                   /* parent table entry */
	  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
	  var len;                    /* length to copy for repeats, bits to drop */
	  var ret;                    /* return code */
	  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
	  var opts;

	  var n; // temporary var for NEED_BITS

	  var order = /* permutation of code lengths */
	    [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];


	  if (!strm || !strm.state || !strm.output ||
	      (!strm.input && strm.avail_in !== 0)) {
	    return Z_STREAM_ERROR;
	  }

	  state = strm.state;
	  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


	  //--- LOAD() ---
	  put = strm.next_out;
	  output = strm.output;
	  left = strm.avail_out;
	  next = strm.next_in;
	  input = strm.input;
	  have = strm.avail_in;
	  hold = state.hold;
	  bits = state.bits;
	  //---

	  _in = have;
	  _out = left;
	  ret = Z_OK;

	  inf_leave: // goto emulation
	  for (;;) {
	    switch (state.mode) {
	    case HEAD:
	      if (state.wrap === 0) {
	        state.mode = TYPEDO;
	        break;
	      }
	      //=== NEEDBITS(16);
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
	        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//

	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = FLAGS;
	        break;
	      }
	      state.flags = 0;           /* expect zlib header */
	      if (state.head) {
	        state.head.done = false;
	      }
	      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
	        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
	        strm.msg = 'incorrect header check';
	        state.mode = BAD;
	        break;
	      }
	      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
	        strm.msg = 'unknown compression method';
	        state.mode = BAD;
	        break;
	      }
	      //--- DROPBITS(4) ---//
	      hold >>>= 4;
	      bits -= 4;
	      //---//
	      len = (hold & 0x0f)/*BITS(4)*/ + 8;
	      if (state.wbits === 0) {
	        state.wbits = len;
	      }
	      else if (len > state.wbits) {
	        strm.msg = 'invalid window size';
	        state.mode = BAD;
	        break;
	      }
	      state.dmax = 1 << len;
	      //Tracev((stderr, "inflate:   zlib header ok\n"));
	      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
	      state.mode = hold & 0x200 ? DICTID : TYPE;
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      break;
	    case FLAGS:
	      //=== NEEDBITS(16); */
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.flags = hold;
	      if ((state.flags & 0xff) !== Z_DEFLATED) {
	        strm.msg = 'unknown compression method';
	        state.mode = BAD;
	        break;
	      }
	      if (state.flags & 0xe000) {
	        strm.msg = 'unknown header flags set';
	        state.mode = BAD;
	        break;
	      }
	      if (state.head) {
	        state.head.text = ((hold >> 8) & 1);
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = TIME;
	      /* falls through */
	    case TIME:
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if (state.head) {
	        state.head.time = hold;
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC4(state.check, hold)
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        hbuf[2] = (hold >>> 16) & 0xff;
	        hbuf[3] = (hold >>> 24) & 0xff;
	        state.check = crc32(state.check, hbuf, 4, 0);
	        //===
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = OS;
	      /* falls through */
	    case OS:
	      //=== NEEDBITS(16); */
	      while (bits < 16) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if (state.head) {
	        state.head.xflags = (hold & 0xff);
	        state.head.os = (hold >> 8);
	      }
	      if (state.flags & 0x0200) {
	        //=== CRC2(state.check, hold);
	        hbuf[0] = hold & 0xff;
	        hbuf[1] = (hold >>> 8) & 0xff;
	        state.check = crc32(state.check, hbuf, 2, 0);
	        //===//
	      }
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = EXLEN;
	      /* falls through */
	    case EXLEN:
	      if (state.flags & 0x0400) {
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.length = hold;
	        if (state.head) {
	          state.head.extra_len = hold;
	        }
	        if (state.flags & 0x0200) {
	          //=== CRC2(state.check, hold);
	          hbuf[0] = hold & 0xff;
	          hbuf[1] = (hold >>> 8) & 0xff;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	      }
	      else if (state.head) {
	        state.head.extra = null/*Z_NULL*/;
	      }
	      state.mode = EXTRA;
	      /* falls through */
	    case EXTRA:
	      if (state.flags & 0x0400) {
	        copy = state.length;
	        if (copy > have) { copy = have; }
	        if (copy) {
	          if (state.head) {
	            len = state.head.extra_len - state.length;
	            if (!state.head.extra) {
	              // Use untyped array for more conveniend processing later
	              state.head.extra = new Array(state.head.extra_len);
	            }
	            utils.arraySet(
	              state.head.extra,
	              input,
	              next,
	              // extra field is limited to 65536 bytes
	              // - no need for additional size check
	              copy,
	              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
	              len
	            );
	            //zmemcpy(state.head.extra + len, next,
	            //        len + copy > state.head.extra_max ?
	            //        state.head.extra_max - len : copy);
	          }
	          if (state.flags & 0x0200) {
	            state.check = crc32(state.check, input, copy, next);
	          }
	          have -= copy;
	          next += copy;
	          state.length -= copy;
	        }
	        if (state.length) { break inf_leave; }
	      }
	      state.length = 0;
	      state.mode = NAME;
	      /* falls through */
	    case NAME:
	      if (state.flags & 0x0800) {
	        if (have === 0) { break inf_leave; }
	        copy = 0;
	        do {
	          // TODO: 2 or 1 bytes?
	          len = input[next + copy++];
	          /* use constant limit because in js we should not preallocate memory */
	          if (state.head && len &&
	              (state.length < 65536 /*state.head.name_max*/)) {
	            state.head.name += String.fromCharCode(len);
	          }
	        } while (len && copy < have);

	        if (state.flags & 0x0200) {
	          state.check = crc32(state.check, input, copy, next);
	        }
	        have -= copy;
	        next += copy;
	        if (len) { break inf_leave; }
	      }
	      else if (state.head) {
	        state.head.name = null;
	      }
	      state.length = 0;
	      state.mode = COMMENT;
	      /* falls through */
	    case COMMENT:
	      if (state.flags & 0x1000) {
	        if (have === 0) { break inf_leave; }
	        copy = 0;
	        do {
	          len = input[next + copy++];
	          /* use constant limit because in js we should not preallocate memory */
	          if (state.head && len &&
	              (state.length < 65536 /*state.head.comm_max*/)) {
	            state.head.comment += String.fromCharCode(len);
	          }
	        } while (len && copy < have);
	        if (state.flags & 0x0200) {
	          state.check = crc32(state.check, input, copy, next);
	        }
	        have -= copy;
	        next += copy;
	        if (len) { break inf_leave; }
	      }
	      else if (state.head) {
	        state.head.comment = null;
	      }
	      state.mode = HCRC;
	      /* falls through */
	    case HCRC:
	      if (state.flags & 0x0200) {
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (hold !== (state.check & 0xffff)) {
	          strm.msg = 'header crc mismatch';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	      }
	      if (state.head) {
	        state.head.hcrc = ((state.flags >> 9) & 1);
	        state.head.done = true;
	      }
	      strm.adler = state.check = 0 /*crc32(0L, Z_NULL, 0)*/;
	      state.mode = TYPE;
	      break;
	    case DICTID:
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      strm.adler = state.check = ZSWAP32(hold);
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = DICT;
	      /* falls through */
	    case DICT:
	      if (state.havedict === 0) {
	        //--- RESTORE() ---
	        strm.next_out = put;
	        strm.avail_out = left;
	        strm.next_in = next;
	        strm.avail_in = have;
	        state.hold = hold;
	        state.bits = bits;
	        //---
	        return Z_NEED_DICT;
	      }
	      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
	      state.mode = TYPE;
	      /* falls through */
	    case TYPE:
	      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case TYPEDO:
	      if (state.last) {
	        //--- BYTEBITS() ---//
	        hold >>>= bits & 7;
	        bits -= bits & 7;
	        //---//
	        state.mode = CHECK;
	        break;
	      }
	      //=== NEEDBITS(3); */
	      while (bits < 3) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.last = (hold & 0x01)/*BITS(1)*/;
	      //--- DROPBITS(1) ---//
	      hold >>>= 1;
	      bits -= 1;
	      //---//

	      switch ((hold & 0x03)/*BITS(2)*/) {
	      case 0:                             /* stored block */
	        //Tracev((stderr, "inflate:     stored block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = STORED;
	        break;
	      case 1:                             /* fixed block */
	        fixedtables(state);
	        //Tracev((stderr, "inflate:     fixed codes block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = LEN_;             /* decode codes */
	        if (flush === Z_TREES) {
	          //--- DROPBITS(2) ---//
	          hold >>>= 2;
	          bits -= 2;
	          //---//
	          break inf_leave;
	        }
	        break;
	      case 2:                             /* dynamic block */
	        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
	        //        state.last ? " (last)" : ""));
	        state.mode = TABLE;
	        break;
	      case 3:
	        strm.msg = 'invalid block type';
	        state.mode = BAD;
	      }
	      //--- DROPBITS(2) ---//
	      hold >>>= 2;
	      bits -= 2;
	      //---//
	      break;
	    case STORED:
	      //--- BYTEBITS() ---// /* go to byte boundary */
	      hold >>>= bits & 7;
	      bits -= bits & 7;
	      //---//
	      //=== NEEDBITS(32); */
	      while (bits < 32) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
	        strm.msg = 'invalid stored block lengths';
	        state.mode = BAD;
	        break;
	      }
	      state.length = hold & 0xffff;
	      //Tracev((stderr, "inflate:       stored length %u\n",
	      //        state.length));
	      //=== INITBITS();
	      hold = 0;
	      bits = 0;
	      //===//
	      state.mode = COPY_;
	      if (flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case COPY_:
	      state.mode = COPY;
	      /* falls through */
	    case COPY:
	      copy = state.length;
	      if (copy) {
	        if (copy > have) { copy = have; }
	        if (copy > left) { copy = left; }
	        if (copy === 0) { break inf_leave; }
	        //--- zmemcpy(put, next, copy); ---
	        utils.arraySet(output, input, next, copy, put);
	        //---//
	        have -= copy;
	        next += copy;
	        left -= copy;
	        put += copy;
	        state.length -= copy;
	        break;
	      }
	      //Tracev((stderr, "inflate:       stored end\n"));
	      state.mode = TYPE;
	      break;
	    case TABLE:
	      //=== NEEDBITS(14); */
	      while (bits < 14) {
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	      }
	      //===//
	      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
	      //--- DROPBITS(5) ---//
	      hold >>>= 5;
	      bits -= 5;
	      //---//
	      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
	      //--- DROPBITS(5) ---//
	      hold >>>= 5;
	      bits -= 5;
	      //---//
	      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
	      //--- DROPBITS(4) ---//
	      hold >>>= 4;
	      bits -= 4;
	      //---//
	//#ifndef PKZIP_BUG_WORKAROUND
	      if (state.nlen > 286 || state.ndist > 30) {
	        strm.msg = 'too many length or distance symbols';
	        state.mode = BAD;
	        break;
	      }
	//#endif
	      //Tracev((stderr, "inflate:       table sizes ok\n"));
	      state.have = 0;
	      state.mode = LENLENS;
	      /* falls through */
	    case LENLENS:
	      while (state.have < state.ncode) {
	        //=== NEEDBITS(3);
	        while (bits < 3) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
	        //--- DROPBITS(3) ---//
	        hold >>>= 3;
	        bits -= 3;
	        //---//
	      }
	      while (state.have < 19) {
	        state.lens[order[state.have++]] = 0;
	      }
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      //state.next = state.codes;
	      //state.lencode = state.next;
	      // Switch to use dynamic table
	      state.lencode = state.lendyn;
	      state.lenbits = 7;

	      opts = {bits: state.lenbits};
	      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
	      state.lenbits = opts.bits;

	      if (ret) {
	        strm.msg = 'invalid code lengths set';
	        state.mode = BAD;
	        break;
	      }
	      //Tracev((stderr, "inflate:       code lengths ok\n"));
	      state.have = 0;
	      state.mode = CODELENS;
	      /* falls through */
	    case CODELENS:
	      while (state.have < state.nlen + state.ndist) {
	        for (;;) {
	          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        if (here_val < 16) {
	          //--- DROPBITS(here.bits) ---//
	          hold >>>= here_bits;
	          bits -= here_bits;
	          //---//
	          state.lens[state.have++] = here_val;
	        }
	        else {
	          if (here_val === 16) {
	            //=== NEEDBITS(here.bits + 2);
	            n = here_bits + 2;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            if (state.have === 0) {
	              strm.msg = 'invalid bit length repeat';
	              state.mode = BAD;
	              break;
	            }
	            len = state.lens[state.have - 1];
	            copy = 3 + (hold & 0x03);//BITS(2);
	            //--- DROPBITS(2) ---//
	            hold >>>= 2;
	            bits -= 2;
	            //---//
	          }
	          else if (here_val === 17) {
	            //=== NEEDBITS(here.bits + 3);
	            n = here_bits + 3;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            len = 0;
	            copy = 3 + (hold & 0x07);//BITS(3);
	            //--- DROPBITS(3) ---//
	            hold >>>= 3;
	            bits -= 3;
	            //---//
	          }
	          else {
	            //=== NEEDBITS(here.bits + 7);
	            n = here_bits + 7;
	            while (bits < n) {
	              if (have === 0) { break inf_leave; }
	              have--;
	              hold += input[next++] << bits;
	              bits += 8;
	            }
	            //===//
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            len = 0;
	            copy = 11 + (hold & 0x7f);//BITS(7);
	            //--- DROPBITS(7) ---//
	            hold >>>= 7;
	            bits -= 7;
	            //---//
	          }
	          if (state.have + copy > state.nlen + state.ndist) {
	            strm.msg = 'invalid bit length repeat';
	            state.mode = BAD;
	            break;
	          }
	          while (copy--) {
	            state.lens[state.have++] = len;
	          }
	        }
	      }

	      /* handle error breaks in while */
	      if (state.mode === BAD) { break; }

	      /* check for end-of-block code (better have one) */
	      if (state.lens[256] === 0) {
	        strm.msg = 'invalid code -- missing end-of-block';
	        state.mode = BAD;
	        break;
	      }

	      /* build code tables -- note: do not change the lenbits or distbits
	         values here (9 and 6) without reading the comments in inftrees.h
	         concerning the ENOUGH constants, which depend on those values */
	      state.lenbits = 9;

	      opts = {bits: state.lenbits};
	      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      // state.next_index = opts.table_index;
	      state.lenbits = opts.bits;
	      // state.lencode = state.next;

	      if (ret) {
	        strm.msg = 'invalid literal/lengths set';
	        state.mode = BAD;
	        break;
	      }

	      state.distbits = 6;
	      //state.distcode.copy(state.codes);
	      // Switch to use dynamic table
	      state.distcode = state.distdyn;
	      opts = {bits: state.distbits};
	      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
	      // We have separate tables & no pointers. 2 commented lines below not needed.
	      // state.next_index = opts.table_index;
	      state.distbits = opts.bits;
	      // state.distcode = state.next;

	      if (ret) {
	        strm.msg = 'invalid distances set';
	        state.mode = BAD;
	        break;
	      }
	      //Tracev((stderr, 'inflate:       codes ok\n'));
	      state.mode = LEN_;
	      if (flush === Z_TREES) { break inf_leave; }
	      /* falls through */
	    case LEN_:
	      state.mode = LEN;
	      /* falls through */
	    case LEN:
	      if (have >= 6 && left >= 258) {
	        //--- RESTORE() ---
	        strm.next_out = put;
	        strm.avail_out = left;
	        strm.next_in = next;
	        strm.avail_in = have;
	        state.hold = hold;
	        state.bits = bits;
	        //---
	        inflate_fast(strm, _out);
	        //--- LOAD() ---
	        put = strm.next_out;
	        output = strm.output;
	        left = strm.avail_out;
	        next = strm.next_in;
	        input = strm.input;
	        have = strm.avail_in;
	        hold = state.hold;
	        bits = state.bits;
	        //---

	        if (state.mode === TYPE) {
	          state.back = -1;
	        }
	        break;
	      }
	      state.back = 0;
	      for (;;) {
	        here = state.lencode[hold & ((1 << state.lenbits) -1)];  /*BITS(state.lenbits)*/
	        here_bits = here >>> 24;
	        here_op = (here >>> 16) & 0xff;
	        here_val = here & 0xffff;

	        if (here_bits <= bits) { break; }
	        //--- PULLBYTE() ---//
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	        //---//
	      }
	      if (here_op && (here_op & 0xf0) === 0) {
	        last_bits = here_bits;
	        last_op = here_op;
	        last_val = here_val;
	        for (;;) {
	          here = state.lencode[last_val +
	                  ((hold & ((1 << (last_bits + last_op)) -1))/*BITS(last.bits + last.op)*/ >> last_bits)];
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((last_bits + here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        //--- DROPBITS(last.bits) ---//
	        hold >>>= last_bits;
	        bits -= last_bits;
	        //---//
	        state.back += last_bits;
	      }
	      //--- DROPBITS(here.bits) ---//
	      hold >>>= here_bits;
	      bits -= here_bits;
	      //---//
	      state.back += here_bits;
	      state.length = here_val;
	      if (here_op === 0) {
	        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	        //        "inflate:         literal '%c'\n" :
	        //        "inflate:         literal 0x%02x\n", here.val));
	        state.mode = LIT;
	        break;
	      }
	      if (here_op & 32) {
	        //Tracevv((stderr, "inflate:         end of block\n"));
	        state.back = -1;
	        state.mode = TYPE;
	        break;
	      }
	      if (here_op & 64) {
	        strm.msg = 'invalid literal/length code';
	        state.mode = BAD;
	        break;
	      }
	      state.extra = here_op & 15;
	      state.mode = LENEXT;
	      /* falls through */
	    case LENEXT:
	      if (state.extra) {
	        //=== NEEDBITS(state.extra);
	        n = state.extra;
	        while (bits < n) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.length += hold & ((1 << state.extra) -1)/*BITS(state.extra)*/;
	        //--- DROPBITS(state.extra) ---//
	        hold >>>= state.extra;
	        bits -= state.extra;
	        //---//
	        state.back += state.extra;
	      }
	      //Tracevv((stderr, "inflate:         length %u\n", state.length));
	      state.was = state.length;
	      state.mode = DIST;
	      /* falls through */
	    case DIST:
	      for (;;) {
	        here = state.distcode[hold & ((1 << state.distbits) -1)];/*BITS(state.distbits)*/
	        here_bits = here >>> 24;
	        here_op = (here >>> 16) & 0xff;
	        here_val = here & 0xffff;

	        if ((here_bits) <= bits) { break; }
	        //--- PULLBYTE() ---//
	        if (have === 0) { break inf_leave; }
	        have--;
	        hold += input[next++] << bits;
	        bits += 8;
	        //---//
	      }
	      if ((here_op & 0xf0) === 0) {
	        last_bits = here_bits;
	        last_op = here_op;
	        last_val = here_val;
	        for (;;) {
	          here = state.distcode[last_val +
	                  ((hold & ((1 << (last_bits + last_op)) -1))/*BITS(last.bits + last.op)*/ >> last_bits)];
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((last_bits + here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        //--- DROPBITS(last.bits) ---//
	        hold >>>= last_bits;
	        bits -= last_bits;
	        //---//
	        state.back += last_bits;
	      }
	      //--- DROPBITS(here.bits) ---//
	      hold >>>= here_bits;
	      bits -= here_bits;
	      //---//
	      state.back += here_bits;
	      if (here_op & 64) {
	        strm.msg = 'invalid distance code';
	        state.mode = BAD;
	        break;
	      }
	      state.offset = here_val;
	      state.extra = (here_op) & 15;
	      state.mode = DISTEXT;
	      /* falls through */
	    case DISTEXT:
	      if (state.extra) {
	        //=== NEEDBITS(state.extra);
	        n = state.extra;
	        while (bits < n) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.offset += hold & ((1 << state.extra) -1)/*BITS(state.extra)*/;
	        //--- DROPBITS(state.extra) ---//
	        hold >>>= state.extra;
	        bits -= state.extra;
	        //---//
	        state.back += state.extra;
	      }
	//#ifdef INFLATE_STRICT
	      if (state.offset > state.dmax) {
	        strm.msg = 'invalid distance too far back';
	        state.mode = BAD;
	        break;
	      }
	//#endif
	      //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
	      state.mode = MATCH;
	      /* falls through */
	    case MATCH:
	      if (left === 0) { break inf_leave; }
	      copy = _out - left;
	      if (state.offset > copy) {         /* copy from window */
	        copy = state.offset - copy;
	        if (copy > state.whave) {
	          if (state.sane) {
	            strm.msg = 'invalid distance too far back';
	            state.mode = BAD;
	            break;
	          }
	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility
	//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	//          Trace((stderr, "inflate.c too far\n"));
	//          copy -= state.whave;
	//          if (copy > state.length) { copy = state.length; }
	//          if (copy > left) { copy = left; }
	//          left -= copy;
	//          state.length -= copy;
	//          do {
	//            output[put++] = 0;
	//          } while (--copy);
	//          if (state.length === 0) { state.mode = LEN; }
	//          break;
	//#endif
	        }
	        if (copy > state.wnext) {
	          copy -= state.wnext;
	          from = state.wsize - copy;
	        }
	        else {
	          from = state.wnext - copy;
	        }
	        if (copy > state.length) { copy = state.length; }
	        from_source = state.window;
	      }
	      else {                              /* copy from output */
	        from_source = output;
	        from = put - state.offset;
	        copy = state.length;
	      }
	      if (copy > left) { copy = left; }
	      left -= copy;
	      state.length -= copy;
	      do {
	        output[put++] = from_source[from++];
	      } while (--copy);
	      if (state.length === 0) { state.mode = LEN; }
	      break;
	    case LIT:
	      if (left === 0) { break inf_leave; }
	      output[put++] = state.length;
	      left--;
	      state.mode = LEN;
	      break;
	    case CHECK:
	      if (state.wrap) {
	        //=== NEEDBITS(32);
	        while (bits < 32) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          // Use '|' insdead of '+' to make sure that result is signed
	          hold |= input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        _out -= left;
	        strm.total_out += _out;
	        state.total += _out;
	        if (_out) {
	          strm.adler = state.check =
	              /*UPDATE(state.check, put - _out, _out);*/
	              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

	        }
	        _out = left;
	        // NB: crc32 stored as signed 32-bit int, ZSWAP32 returns signed too
	        if ((state.flags ? hold : ZSWAP32(hold)) !== state.check) {
	          strm.msg = 'incorrect data check';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        //Tracev((stderr, "inflate:   check matches trailer\n"));
	      }
	      state.mode = LENGTH;
	      /* falls through */
	    case LENGTH:
	      if (state.wrap && state.flags) {
	        //=== NEEDBITS(32);
	        while (bits < 32) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (hold !== (state.total & 0xffffffff)) {
	          strm.msg = 'incorrect length check';
	          state.mode = BAD;
	          break;
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        //Tracev((stderr, "inflate:   length matches trailer\n"));
	      }
	      state.mode = DONE;
	      /* falls through */
	    case DONE:
	      ret = Z_STREAM_END;
	      break inf_leave;
	    case BAD:
	      ret = Z_DATA_ERROR;
	      break inf_leave;
	    case MEM:
	      return Z_MEM_ERROR;
	    case SYNC:
	      /* falls through */
	    default:
	      return Z_STREAM_ERROR;
	    }
	  }

	  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

	  /*
	     Return from inflate(), updating the total counts and the check value.
	     If there was no progress during the inflate() call, return a buffer
	     error.  Call updatewindow() to create and/or update the window state.
	     Note: a memory error from inflate() is non-recoverable.
	   */

	  //--- RESTORE() ---
	  strm.next_out = put;
	  strm.avail_out = left;
	  strm.next_in = next;
	  strm.avail_in = have;
	  state.hold = hold;
	  state.bits = bits;
	  //---

	  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
	                      (state.mode < CHECK || flush !== Z_FINISH))) {
	    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
	      state.mode = MEM;
	      return Z_MEM_ERROR;
	    }
	  }
	  _in -= strm.avail_in;
	  _out -= strm.avail_out;
	  strm.total_in += _in;
	  strm.total_out += _out;
	  state.total += _out;
	  if (state.wrap && _out) {
	    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
	      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
	  }
	  strm.data_type = state.bits + (state.last ? 64 : 0) +
	                    (state.mode === TYPE ? 128 : 0) +
	                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
	  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
	    ret = Z_BUF_ERROR;
	  }
	  return ret;
	}

	function inflateEnd(strm) {

	  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
	    return Z_STREAM_ERROR;
	  }

	  var state = strm.state;
	  if (state.window) {
	    state.window = null;
	  }
	  strm.state = null;
	  return Z_OK;
	}

	function inflateGetHeader(strm, head) {
	  var state;

	  /* check state */
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

	  /* save header structure */
	  state.head = head;
	  head.done = false;
	  return Z_OK;
	}


	exports.inflateReset = inflateReset;
	exports.inflateReset2 = inflateReset2;
	exports.inflateResetKeep = inflateResetKeep;
	exports.inflateInit = inflateInit;
	exports.inflateInit2 = inflateInit2;
	exports.inflate = inflate;
	exports.inflateEnd = inflateEnd;
	exports.inflateGetHeader = inflateGetHeader;
	exports.inflateInfo = 'pako inflate (from Nodeca project)';

	/* Not implemented
	exports.inflateCopy = inflateCopy;
	exports.inflateGetDictionary = inflateGetDictionary;
	exports.inflateMark = inflateMark;
	exports.inflatePrime = inflatePrime;
	exports.inflateSetDictionary = inflateSetDictionary;
	exports.inflateSync = inflateSync;
	exports.inflateSyncPoint = inflateSyncPoint;
	exports.inflateUndermine = inflateUndermine;
	*/

	},{"../utils/common":3,"./adler32":5,"./crc32":7,"./inffast":10,"./inftrees":12}],12:[function(require,module,exports){
	'use strict';


	var utils = require('../utils/common');

	var MAXBITS = 15;
	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	var lbase = [ /* Length codes 257..285 base */
	  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
	  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
	];

	var lext = [ /* Length codes 257..285 extra */
	  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
	  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
	];

	var dbase = [ /* Distance codes 0..29 base */
	  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
	  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
	  8193, 12289, 16385, 24577, 0, 0
	];

	var dext = [ /* Distance codes 0..29 extra */
	  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
	  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
	  28, 28, 29, 29, 64, 64
	];

	module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
	{
	  var bits = opts.bits;
	      //here = opts.here; /* table entry for duplication */

	  var len = 0;               /* a code's length in bits */
	  var sym = 0;               /* index of code symbols */
	  var min = 0, max = 0;          /* minimum and maximum code lengths */
	  var root = 0;              /* number of index bits for root table */
	  var curr = 0;              /* number of index bits for current table */
	  var drop = 0;              /* code bits to drop for sub-table */
	  var left = 0;                   /* number of prefix codes available */
	  var used = 0;              /* code entries in table used */
	  var huff = 0;              /* Huffman code */
	  var incr;              /* for incrementing code, index */
	  var fill;              /* index for replicating entries */
	  var low;               /* low bits for current root entry */
	  var mask;              /* mask for low root bits */
	  var next;             /* next available space in table */
	  var base = null;     /* base value table to use */
	  var base_index = 0;
	//  var shoextra;    /* extra bits table to use */
	  var end;                    /* use base and extra for symbol > end */
	  var count = new utils.Buf16(MAXBITS+1); //[MAXBITS+1];    /* number of codes of each length */
	  var offs = new utils.Buf16(MAXBITS+1); //[MAXBITS+1];     /* offsets in table for each length */
	  var extra = null;
	  var extra_index = 0;

	  var here_bits, here_op, here_val;

	  /*
	   Process a set of code lengths to create a canonical Huffman code.  The
	   code lengths are lens[0..codes-1].  Each length corresponds to the
	   symbols 0..codes-1.  The Huffman code is generated by first sorting the
	   symbols by length from short to long, and retaining the symbol order
	   for codes with equal lengths.  Then the code starts with all zero bits
	   for the first code of the shortest length, and the codes are integer
	   increments for the same length, and zeros are appended as the length
	   increases.  For the deflate format, these bits are stored backwards
	   from their more natural integer increment ordering, and so when the
	   decoding tables are built in the large loop below, the integer codes
	   are incremented backwards.

	   This routine assumes, but does not check, that all of the entries in
	   lens[] are in the range 0..MAXBITS.  The caller must assure this.
	   1..MAXBITS is interpreted as that code length.  zero means that that
	   symbol does not occur in this code.

	   The codes are sorted by computing a count of codes for each length,
	   creating from that a table of starting indices for each length in the
	   sorted table, and then entering the symbols in order in the sorted
	   table.  The sorted table is work[], with that space being provided by
	   the caller.

	   The length counts are used for other purposes as well, i.e. finding
	   the minimum and maximum length codes, determining if there are any
	   codes at all, checking for a valid set of lengths, and looking ahead
	   at length counts to determine sub-table sizes when building the
	   decoding tables.
	   */

	  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
	  for (len = 0; len <= MAXBITS; len++) {
	    count[len] = 0;
	  }
	  for (sym = 0; sym < codes; sym++) {
	    count[lens[lens_index + sym]]++;
	  }

	  /* bound code lengths, force root to be within code lengths */
	  root = bits;
	  for (max = MAXBITS; max >= 1; max--) {
	    if (count[max] !== 0) { break; }
	  }
	  if (root > max) {
	    root = max;
	  }
	  if (max === 0) {                     /* no symbols to code at all */
	    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
	    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
	    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
	    table[table_index++] = (1 << 24) | (64 << 16) | 0;


	    //table.op[opts.table_index] = 64;
	    //table.bits[opts.table_index] = 1;
	    //table.val[opts.table_index++] = 0;
	    table[table_index++] = (1 << 24) | (64 << 16) | 0;

	    opts.bits = 1;
	    return 0;     /* no symbols, but wait for decoding to report error */
	  }
	  for (min = 1; min < max; min++) {
	    if (count[min] !== 0) { break; }
	  }
	  if (root < min) {
	    root = min;
	  }

	  /* check for an over-subscribed or incomplete set of lengths */
	  left = 1;
	  for (len = 1; len <= MAXBITS; len++) {
	    left <<= 1;
	    left -= count[len];
	    if (left < 0) {
	      return -1;
	    }        /* over-subscribed */
	  }
	  if (left > 0 && (type === CODES || max !== 1)) {
	    return -1;                      /* incomplete set */
	  }

	  /* generate offsets into symbol table for each length for sorting */
	  offs[1] = 0;
	  for (len = 1; len < MAXBITS; len++) {
	    offs[len + 1] = offs[len] + count[len];
	  }

	  /* sort symbols by length, by symbol order within each length */
	  for (sym = 0; sym < codes; sym++) {
	    if (lens[lens_index + sym] !== 0) {
	      work[offs[lens[lens_index + sym]]++] = sym;
	    }
	  }

	  /*
	   Create and fill in decoding tables.  In this loop, the table being
	   filled is at next and has curr index bits.  The code being used is huff
	   with length len.  That code is converted to an index by dropping drop
	   bits off of the bottom.  For codes where len is less than drop + curr,
	   those top drop + curr - len bits are incremented through all values to
	   fill the table with replicated entries.

	   root is the number of index bits for the root table.  When len exceeds
	   root, sub-tables are created pointed to by the root entry with an index
	   of the low root bits of huff.  This is saved in low to check for when a
	   new sub-table should be started.  drop is zero when the root table is
	   being filled, and drop is root when sub-tables are being filled.

	   When a new sub-table is needed, it is necessary to look ahead in the
	   code lengths to determine what size sub-table is needed.  The length
	   counts are used for this, and so count[] is decremented as codes are
	   entered in the tables.

	   used keeps track of how many table entries have been allocated from the
	   provided *table space.  It is checked for LENS and DIST tables against
	   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
	   the initial root table size constants.  See the comments in inftrees.h
	   for more information.

	   sym increments through all symbols, and the loop terminates when
	   all codes of length max, i.e. all codes, have been processed.  This
	   routine permits incomplete codes, so another loop after this one fills
	   in the rest of the decoding tables with invalid code markers.
	   */

	  /* set up for code type */
	  // poor man optimization - use if-else instead of switch,
	  // to avoid deopts in old v8
	  if (type === CODES) {
	    base = extra = work;    /* dummy value--not used */
	    end = 19;

	  } else if (type === LENS) {
	    base = lbase;
	    base_index -= 257;
	    extra = lext;
	    extra_index -= 257;
	    end = 256;

	  } else {                    /* DISTS */
	    base = dbase;
	    extra = dext;
	    end = -1;
	  }

	  /* initialize opts for loop */
	  huff = 0;                   /* starting code */
	  sym = 0;                    /* starting code symbol */
	  len = min;                  /* starting code length */
	  next = table_index;              /* current table to fill in */
	  curr = root;                /* current table index bits */
	  drop = 0;                   /* current bits to drop from code for index */
	  low = -1;                   /* trigger new sub-table when len > root */
	  used = 1 << root;          /* use root table entries */
	  mask = used - 1;            /* mask for comparing low */

	  /* check available table space */
	  if ((type === LENS && used > ENOUGH_LENS) ||
	    (type === DISTS && used > ENOUGH_DISTS)) {
	    return 1;
	  }

	  var i=0;
	  /* process all codes and make table entries */
	  for (;;) {
	    i++;
	    /* create table entry */
	    here_bits = len - drop;
	    if (work[sym] < end) {
	      here_op = 0;
	      here_val = work[sym];
	    }
	    else if (work[sym] > end) {
	      here_op = extra[extra_index + work[sym]];
	      here_val = base[base_index + work[sym]];
	    }
	    else {
	      here_op = 32 + 64;         /* end of block */
	      here_val = 0;
	    }

	    /* replicate for those indices with low len bits equal to huff */
	    incr = 1 << (len - drop);
	    fill = 1 << curr;
	    min = fill;                 /* save offset to next table */
	    do {
	      fill -= incr;
	      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
	    } while (fill !== 0);

	    /* backwards increment the len-bit code huff */
	    incr = 1 << (len - 1);
	    while (huff & incr) {
	      incr >>= 1;
	    }
	    if (incr !== 0) {
	      huff &= incr - 1;
	      huff += incr;
	    } else {
	      huff = 0;
	    }

	    /* go to next symbol, update count, len */
	    sym++;
	    if (--count[len] === 0) {
	      if (len === max) { break; }
	      len = lens[lens_index + work[sym]];
	    }

	    /* create new sub-table if needed */
	    if (len > root && (huff & mask) !== low) {
	      /* if first time, transition to sub-tables */
	      if (drop === 0) {
	        drop = root;
	      }

	      /* increment past last table */
	      next += min;            /* here min is 1 << curr */

	      /* determine length of next table */
	      curr = len - drop;
	      left = 1 << curr;
	      while (curr + drop < max) {
	        left -= count[curr + drop];
	        if (left <= 0) { break; }
	        curr++;
	        left <<= 1;
	      }

	      /* check for enough space */
	      used += 1 << curr;
	      if ((type === LENS && used > ENOUGH_LENS) ||
	        (type === DISTS && used > ENOUGH_DISTS)) {
	        return 1;
	      }

	      /* point entry in root table to sub-table */
	      low = huff & mask;
	      /*table.op[low] = curr;
	      table.bits[low] = root;
	      table.val[low] = next - opts.table_index;*/
	      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
	    }
	  }

	  /* fill in remaining table entry if code is incomplete (guaranteed to have
	   at most one remaining entry, since if the code is incomplete, the
	   maximum code length that was allowed to get this far is one bit) */
	  if (huff !== 0) {
	    //table.op[next + huff] = 64;            /* invalid code marker */
	    //table.bits[next + huff] = len - drop;
	    //table.val[next + huff] = 0;
	    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
	  }

	  /* set return parameters */
	  //opts.table_index += used;
	  opts.bits = root;
	  return 0;
	};

	},{"../utils/common":3}],13:[function(require,module,exports){
	'use strict';

	module.exports = {
	  '2':    'need dictionary',     /* Z_NEED_DICT       2  */
	  '1':    'stream end',          /* Z_STREAM_END      1  */
	  '0':    '',                    /* Z_OK              0  */
	  '-1':   'file error',          /* Z_ERRNO         (-1) */
	  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
	  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
	  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
	  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
	  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
	};

	},{}],14:[function(require,module,exports){
	'use strict';


	var utils = require('../utils/common');

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	//var Z_FILTERED          = 1;
	//var Z_HUFFMAN_ONLY      = 2;
	//var Z_RLE               = 3;
	var Z_FIXED               = 4;
	//var Z_DEFAULT_STRATEGY  = 0;

	/* Possible values of the data_type field (though see inflate()) */
	var Z_BINARY              = 0;
	var Z_TEXT                = 1;
	//var Z_ASCII             = 1; // = Z_TEXT
	var Z_UNKNOWN             = 2;

	/*============================================================================*/


	function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

	// From zutil.h

	var STORED_BLOCK = 0;
	var STATIC_TREES = 1;
	var DYN_TREES    = 2;
	/* The three kinds of block type */

	var MIN_MATCH    = 3;
	var MAX_MATCH    = 258;
	/* The minimum and maximum match lengths */

	// From deflate.h
	/* ===========================================================================
	 * Internal compression state.
	 */

	var LENGTH_CODES  = 29;
	/* number of length codes, not counting the special END_BLOCK code */

	var LITERALS      = 256;
	/* number of literal bytes 0..255 */

	var L_CODES       = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */

	var D_CODES       = 30;
	/* number of distance codes */

	var BL_CODES      = 19;
	/* number of codes used to transfer the bit lengths */

	var HEAP_SIZE     = 2*L_CODES + 1;
	/* maximum heap size */

	var MAX_BITS      = 15;
	/* All codes must not exceed MAX_BITS bits */

	var Buf_size      = 16;
	/* size of bit buffer in bi_buf */


	/* ===========================================================================
	 * Constants
	 */

	var MAX_BL_BITS = 7;
	/* Bit length codes must not exceed MAX_BL_BITS bits */

	var END_BLOCK   = 256;
	/* end of block literal code */

	var REP_3_6     = 16;
	/* repeat previous bit length 3-6 times (2 bits of repeat count) */

	var REPZ_3_10   = 17;
	/* repeat a zero length 3-10 times  (3 bits of repeat count) */

	var REPZ_11_138 = 18;
	/* repeat a zero length 11-138 times  (7 bits of repeat count) */

	var extra_lbits =   /* extra bits for each length code */
	  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

	var extra_dbits =   /* extra bits for each distance code */
	  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

	var extra_blbits =  /* extra bits for each bit length code */
	  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

	var bl_order =
	  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
	/* The lengths of the bit length codes are sent in order of decreasing
	 * probability, to avoid transmitting the lengths for unused bit length codes.
	 */

	/* ===========================================================================
	 * Local data. These are initialized only once.
	 */

	// We pre-fill arrays with 0 to avoid uninitialized gaps

	var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

	// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
	var static_ltree  = new Array((L_CODES+2) * 2);
	zero(static_ltree);
	/* The static literal tree. Since the bit lengths are imposed, there is no
	 * need for the L_CODES extra codes used during heap construction. However
	 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
	 * below).
	 */

	var static_dtree  = new Array(D_CODES * 2);
	zero(static_dtree);
	/* The static distance tree. (Actually a trivial tree since all codes use
	 * 5 bits.)
	 */

	var _dist_code    = new Array(DIST_CODE_LEN);
	zero(_dist_code);
	/* Distance codes. The first 256 values correspond to the distances
	 * 3 .. 258, the last 256 values correspond to the top 8 bits of
	 * the 15 bit distances.
	 */

	var _length_code  = new Array(MAX_MATCH-MIN_MATCH+1);
	zero(_length_code);
	/* length code for each normalized match length (0 == MIN_MATCH) */

	var base_length   = new Array(LENGTH_CODES);
	zero(base_length);
	/* First normalized length for each code (0 = MIN_MATCH) */

	var base_dist     = new Array(D_CODES);
	zero(base_dist);
	/* First normalized distance for each code (0 = distance of 1) */


	var StaticTreeDesc = function (static_tree, extra_bits, extra_base, elems, max_length) {

	  this.static_tree  = static_tree;  /* static tree or NULL */
	  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
	  this.extra_base   = extra_base;   /* base index for extra_bits */
	  this.elems        = elems;        /* max number of elements in the tree */
	  this.max_length   = max_length;   /* max bit length for the codes */

	  // show if `static_tree` has data or dummy - needed for monomorphic objects
	  this.has_stree    = static_tree && static_tree.length;
	};


	var static_l_desc;
	var static_d_desc;
	var static_bl_desc;


	var TreeDesc = function(dyn_tree, stat_desc) {
	  this.dyn_tree = dyn_tree;     /* the dynamic tree */
	  this.max_code = 0;            /* largest code with non zero frequency */
	  this.stat_desc = stat_desc;   /* the corresponding static tree */
	};



	function d_code(dist) {
	  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
	}


	/* ===========================================================================
	 * Output a short LSB first on the stream.
	 * IN assertion: there is enough room in pendingBuf.
	 */
	function put_short (s, w) {
	//    put_byte(s, (uch)((w) & 0xff));
	//    put_byte(s, (uch)((ush)(w) >> 8));
	  s.pending_buf[s.pending++] = (w) & 0xff;
	  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
	}


	/* ===========================================================================
	 * Send a value on a given number of bits.
	 * IN assertion: length <= 16 and value fits in length bits.
	 */
	function send_bits(s, value, length) {
	  if (s.bi_valid > (Buf_size - length)) {
	    s.bi_buf |= (value << s.bi_valid) & 0xffff;
	    put_short(s, s.bi_buf);
	    s.bi_buf = value >> (Buf_size - s.bi_valid);
	    s.bi_valid += length - Buf_size;
	  } else {
	    s.bi_buf |= (value << s.bi_valid) & 0xffff;
	    s.bi_valid += length;
	  }
	}


	function send_code(s, c, tree) {
	  send_bits(s, tree[c*2]/*.Code*/, tree[c*2 + 1]/*.Len*/);
	}


	/* ===========================================================================
	 * Reverse the first len bits of a code, using straightforward code (a faster
	 * method would use a table)
	 * IN assertion: 1 <= len <= 15
	 */
	function bi_reverse(code, len) {
	  var res = 0;
	  do {
	    res |= code & 1;
	    code >>>= 1;
	    res <<= 1;
	  } while (--len > 0);
	  return res >>> 1;
	}


	/* ===========================================================================
	 * Flush the bit buffer, keeping at most 7 bits in it.
	 */
	function bi_flush(s) {
	  if (s.bi_valid === 16) {
	    put_short(s, s.bi_buf);
	    s.bi_buf = 0;
	    s.bi_valid = 0;

	  } else if (s.bi_valid >= 8) {
	    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
	    s.bi_buf >>= 8;
	    s.bi_valid -= 8;
	  }
	}


	/* ===========================================================================
	 * Compute the optimal bit lengths for a tree and update the total bit length
	 * for the current block.
	 * IN assertion: the fields freq and dad are set, heap[heap_max] and
	 *    above are the tree nodes sorted by increasing frequency.
	 * OUT assertions: the field len is set to the optimal bit length, the
	 *     array bl_count contains the frequencies for each bit length.
	 *     The length opt_len is updated; static_len is also updated if stree is
	 *     not null.
	 */
	function gen_bitlen(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc;    /* the tree descriptor */
	{
	  var tree            = desc.dyn_tree;
	  var max_code        = desc.max_code;
	  var stree           = desc.stat_desc.static_tree;
	  var has_stree       = desc.stat_desc.has_stree;
	  var extra           = desc.stat_desc.extra_bits;
	  var base            = desc.stat_desc.extra_base;
	  var max_length      = desc.stat_desc.max_length;
	  var h;              /* heap index */
	  var n, m;           /* iterate over the tree elements */
	  var bits;           /* bit length */
	  var xbits;          /* extra bits */
	  var f;              /* frequency */
	  var overflow = 0;   /* number of elements with bit length too large */

	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    s.bl_count[bits] = 0;
	  }

	  /* In a first pass, compute the optimal bit lengths (which may
	   * overflow in the case of the bit length tree).
	   */
	  tree[s.heap[s.heap_max]*2 + 1]/*.Len*/ = 0; /* root of the heap */

	  for (h = s.heap_max+1; h < HEAP_SIZE; h++) {
	    n = s.heap[h];
	    bits = tree[tree[n*2 +1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
	    if (bits > max_length) {
	      bits = max_length;
	      overflow++;
	    }
	    tree[n*2 + 1]/*.Len*/ = bits;
	    /* We overwrite tree[n].Dad which is no longer needed */

	    if (n > max_code) { continue; } /* not a leaf node */

	    s.bl_count[bits]++;
	    xbits = 0;
	    if (n >= base) {
	      xbits = extra[n-base];
	    }
	    f = tree[n * 2]/*.Freq*/;
	    s.opt_len += f * (bits + xbits);
	    if (has_stree) {
	      s.static_len += f * (stree[n*2 + 1]/*.Len*/ + xbits);
	    }
	  }
	  if (overflow === 0) { return; }

	  // Trace((stderr,"\nbit length overflow\n"));
	  /* This happens for example on obj2 and pic of the Calgary corpus */

	  /* Find the first bit length which could increase: */
	  do {
	    bits = max_length-1;
	    while (s.bl_count[bits] === 0) { bits--; }
	    s.bl_count[bits]--;      /* move one leaf down the tree */
	    s.bl_count[bits+1] += 2; /* move one overflow item as its brother */
	    s.bl_count[max_length]--;
	    /* The brother of the overflow item also moves one step up,
	     * but this does not affect bl_count[max_length]
	     */
	    overflow -= 2;
	  } while (overflow > 0);

	  /* Now recompute all bit lengths, scanning in increasing frequency.
	   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
	   * lengths instead of fixing only the wrong ones. This idea is taken
	   * from 'ar' written by Haruhiko Okumura.)
	   */
	  for (bits = max_length; bits !== 0; bits--) {
	    n = s.bl_count[bits];
	    while (n !== 0) {
	      m = s.heap[--h];
	      if (m > max_code) { continue; }
	      if (tree[m*2 + 1]/*.Len*/ !== bits) {
	        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
	        s.opt_len += (bits - tree[m*2 + 1]/*.Len*/)*tree[m*2]/*.Freq*/;
	        tree[m*2 + 1]/*.Len*/ = bits;
	      }
	      n--;
	    }
	  }
	}


	/* ===========================================================================
	 * Generate the codes for a given tree and bit counts (which need not be
	 * optimal).
	 * IN assertion: the array bl_count contains the bit length statistics for
	 * the given tree and the field len is set for all tree elements.
	 * OUT assertion: the field code is set for all tree elements of non
	 *     zero code length.
	 */
	function gen_codes(tree, max_code, bl_count)
	//    ct_data *tree;             /* the tree to decorate */
	//    int max_code;              /* largest code with non zero frequency */
	//    ushf *bl_count;            /* number of codes at each bit length */
	{
	  var next_code = new Array(MAX_BITS+1); /* next code value for each bit length */
	  var code = 0;              /* running code value */
	  var bits;                  /* bit index */
	  var n;                     /* code index */

	  /* The distribution counts are first used to generate the code values
	   * without bit reversal.
	   */
	  for (bits = 1; bits <= MAX_BITS; bits++) {
	    next_code[bits] = code = (code + bl_count[bits-1]) << 1;
	  }
	  /* Check that the bit counts in bl_count are consistent. The last code
	   * must be all ones.
	   */
	  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
	  //        "inconsistent bit counts");
	  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

	  for (n = 0;  n <= max_code; n++) {
	    var len = tree[n*2 + 1]/*.Len*/;
	    if (len === 0) { continue; }
	    /* Now reverse the bits */
	    tree[n*2]/*.Code*/ = bi_reverse(next_code[len]++, len);

	    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
	    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
	  }
	}


	/* ===========================================================================
	 * Initialize the various 'constant' tables.
	 */
	function tr_static_init() {
	  var n;        /* iterates over tree elements */
	  var bits;     /* bit counter */
	  var length;   /* length value */
	  var code;     /* code value */
	  var dist;     /* distance index */
	  var bl_count = new Array(MAX_BITS+1);
	  /* number of codes at each bit length for an optimal tree */

	  // do check in _tr_init()
	  //if (static_init_done) return;

	  /* For some embedded targets, global variables are not initialized: */
	/*#ifdef NO_INIT_GLOBAL_POINTERS
	  static_l_desc.static_tree = static_ltree;
	  static_l_desc.extra_bits = extra_lbits;
	  static_d_desc.static_tree = static_dtree;
	  static_d_desc.extra_bits = extra_dbits;
	  static_bl_desc.extra_bits = extra_blbits;
	#endif*/

	  /* Initialize the mapping length (0..255) -> length code (0..28) */
	  length = 0;
	  for (code = 0; code < LENGTH_CODES-1; code++) {
	    base_length[code] = length;
	    for (n = 0; n < (1<<extra_lbits[code]); n++) {
	      _length_code[length++] = code;
	    }
	  }
	  //Assert (length == 256, "tr_static_init: length != 256");
	  /* Note that the length 255 (match length 258) can be represented
	   * in two different ways: code 284 + 5 bits or code 285, so we
	   * overwrite length_code[255] to use the best encoding:
	   */
	  _length_code[length-1] = code;

	  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
	  dist = 0;
	  for (code = 0 ; code < 16; code++) {
	    base_dist[code] = dist;
	    for (n = 0; n < (1<<extra_dbits[code]); n++) {
	      _dist_code[dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: dist != 256");
	  dist >>= 7; /* from now on, all distances are divided by 128 */
	  for (; code < D_CODES; code++) {
	    base_dist[code] = dist << 7;
	    for (n = 0; n < (1<<(extra_dbits[code]-7)); n++) {
	      _dist_code[256 + dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

	  /* Construct the codes of the static literal tree */
	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    bl_count[bits] = 0;
	  }

	  n = 0;
	  while (n <= 143) {
	    static_ltree[n*2 + 1]/*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  while (n <= 255) {
	    static_ltree[n*2 + 1]/*.Len*/ = 9;
	    n++;
	    bl_count[9]++;
	  }
	  while (n <= 279) {
	    static_ltree[n*2 + 1]/*.Len*/ = 7;
	    n++;
	    bl_count[7]++;
	  }
	  while (n <= 287) {
	    static_ltree[n*2 + 1]/*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  /* Codes 286 and 287 do not exist, but we must include them in the
	   * tree construction to get a canonical Huffman tree (longest code
	   * all ones)
	   */
	  gen_codes(static_ltree, L_CODES+1, bl_count);

	  /* The static distance tree is trivial: */
	  for (n = 0; n < D_CODES; n++) {
	    static_dtree[n*2 + 1]/*.Len*/ = 5;
	    static_dtree[n*2]/*.Code*/ = bi_reverse(n, 5);
	  }

	  // Now data ready and we can init static trees
	  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS+1, L_CODES, MAX_BITS);
	  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
	  static_bl_desc =new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

	  //static_init_done = true;
	}


	/* ===========================================================================
	 * Initialize a new block.
	 */
	function init_block(s) {
	  var n; /* iterates over tree elements */

	  /* Initialize the trees. */
	  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n*2]/*.Freq*/ = 0; }
	  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n*2]/*.Freq*/ = 0; }
	  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n*2]/*.Freq*/ = 0; }

	  s.dyn_ltree[END_BLOCK*2]/*.Freq*/ = 1;
	  s.opt_len = s.static_len = 0;
	  s.last_lit = s.matches = 0;
	}


	/* ===========================================================================
	 * Flush the bit buffer and align the output on a byte boundary
	 */
	function bi_windup(s)
	{
	  if (s.bi_valid > 8) {
	    put_short(s, s.bi_buf);
	  } else if (s.bi_valid > 0) {
	    //put_byte(s, (Byte)s->bi_buf);
	    s.pending_buf[s.pending++] = s.bi_buf;
	  }
	  s.bi_buf = 0;
	  s.bi_valid = 0;
	}

	/* ===========================================================================
	 * Copy a stored block, storing first the length and its
	 * one's complement if requested.
	 */
	function copy_block(s, buf, len, header)
	//DeflateState *s;
	//charf    *buf;    /* the input data */
	//unsigned len;     /* its length */
	//int      header;  /* true if block header must be written */
	{
	  bi_windup(s);        /* align on byte boundary */

	  if (header) {
	    put_short(s, len);
	    put_short(s, ~len);
	  }
	//  while (len--) {
	//    put_byte(s, *buf++);
	//  }
	  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
	  s.pending += len;
	}

	/* ===========================================================================
	 * Compares to subtrees, using the tree depth as tie breaker when
	 * the subtrees have equal frequency. This minimizes the worst case length.
	 */
	function smaller(tree, n, m, depth) {
	  var _n2 = n*2;
	  var _m2 = m*2;
	  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
	         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
	}

	/* ===========================================================================
	 * Restore the heap property by moving down the tree starting at node k,
	 * exchanging a node with the smallest of its two sons if necessary, stopping
	 * when the heap property is re-established (each father smaller than its
	 * two sons).
	 */
	function pqdownheap(s, tree, k)
	//    deflate_state *s;
	//    ct_data *tree;  /* the tree to restore */
	//    int k;               /* node to move down */
	{
	  var v = s.heap[k];
	  var j = k << 1;  /* left son of k */
	  while (j <= s.heap_len) {
	    /* Set j to the smallest of the two sons: */
	    if (j < s.heap_len &&
	      smaller(tree, s.heap[j+1], s.heap[j], s.depth)) {
	      j++;
	    }
	    /* Exit if v is smaller than both sons */
	    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

	    /* Exchange v with the smallest son */
	    s.heap[k] = s.heap[j];
	    k = j;

	    /* And continue down the tree, setting j to the left son of k */
	    j <<= 1;
	  }
	  s.heap[k] = v;
	}


	// inlined manually
	// var SMALLEST = 1;

	/* ===========================================================================
	 * Send the block data compressed using the given Huffman trees
	 */
	function compress_block(s, ltree, dtree)
	//    deflate_state *s;
	//    const ct_data *ltree; /* literal tree */
	//    const ct_data *dtree; /* distance tree */
	{
	  var dist;           /* distance of matched string */
	  var lc;             /* match length or unmatched char (if dist == 0) */
	  var lx = 0;         /* running index in l_buf */
	  var code;           /* the code to send */
	  var extra;          /* number of extra bits to send */

	  if (s.last_lit !== 0) {
	    do {
	      dist = (s.pending_buf[s.d_buf + lx*2] << 8) | (s.pending_buf[s.d_buf + lx*2 + 1]);
	      lc = s.pending_buf[s.l_buf + lx];
	      lx++;

	      if (dist === 0) {
	        send_code(s, lc, ltree); /* send a literal byte */
	        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
	      } else {
	        /* Here, lc is the match length - MIN_MATCH */
	        code = _length_code[lc];
	        send_code(s, code+LITERALS+1, ltree); /* send the length code */
	        extra = extra_lbits[code];
	        if (extra !== 0) {
	          lc -= base_length[code];
	          send_bits(s, lc, extra);       /* send the extra length bits */
	        }
	        dist--; /* dist is now the match distance - 1 */
	        code = d_code(dist);
	        //Assert (code < D_CODES, "bad d_code");

	        send_code(s, code, dtree);       /* send the distance code */
	        extra = extra_dbits[code];
	        if (extra !== 0) {
	          dist -= base_dist[code];
	          send_bits(s, dist, extra);   /* send the extra distance bits */
	        }
	      } /* literal or match pair ? */

	      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
	      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
	      //       "pendingBuf overflow");

	    } while (lx < s.last_lit);
	  }

	  send_code(s, END_BLOCK, ltree);
	}


	/* ===========================================================================
	 * Construct one Huffman tree and assigns the code bit strings and lengths.
	 * Update the total bit length for the current block.
	 * IN assertion: the field freq is set for all tree elements.
	 * OUT assertions: the fields len and code are set to the optimal bit length
	 *     and corresponding code. The length opt_len is updated; static_len is
	 *     also updated if stree is not null. The field max_code is set.
	 */
	function build_tree(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc; /* the tree descriptor */
	{
	  var tree     = desc.dyn_tree;
	  var stree    = desc.stat_desc.static_tree;
	  var has_stree = desc.stat_desc.has_stree;
	  var elems    = desc.stat_desc.elems;
	  var n, m;          /* iterate over heap elements */
	  var max_code = -1; /* largest code with non zero frequency */
	  var node;          /* new node being created */

	  /* Construct the initial heap, with least frequent element in
	   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
	   * heap[0] is not used.
	   */
	  s.heap_len = 0;
	  s.heap_max = HEAP_SIZE;

	  for (n = 0; n < elems; n++) {
	    if (tree[n * 2]/*.Freq*/ !== 0) {
	      s.heap[++s.heap_len] = max_code = n;
	      s.depth[n] = 0;

	    } else {
	      tree[n*2 + 1]/*.Len*/ = 0;
	    }
	  }

	  /* The pkzip format requires that at least one distance code exists,
	   * and that at least one bit should be sent even if there is only one
	   * possible code. So to avoid special checks later on we force at least
	   * two codes of non zero frequency.
	   */
	  while (s.heap_len < 2) {
	    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
	    tree[node * 2]/*.Freq*/ = 1;
	    s.depth[node] = 0;
	    s.opt_len--;

	    if (has_stree) {
	      s.static_len -= stree[node*2 + 1]/*.Len*/;
	    }
	    /* node is 0 or 1 so it does not have extra bits */
	  }
	  desc.max_code = max_code;

	  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
	   * establish sub-heaps of increasing lengths:
	   */
	  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

	  /* Construct the Huffman tree by repeatedly combining the least two
	   * frequent nodes.
	   */
	  node = elems;              /* next internal node of the tree */
	  do {
	    //pqremove(s, tree, n);  /* n = node of least frequency */
	    /*** pqremove ***/
	    n = s.heap[1/*SMALLEST*/];
	    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
	    pqdownheap(s, tree, 1/*SMALLEST*/);
	    /***/

	    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

	    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
	    s.heap[--s.heap_max] = m;

	    /* Create a new node father of n and m */
	    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
	    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
	    tree[n*2 + 1]/*.Dad*/ = tree[m*2 + 1]/*.Dad*/ = node;

	    /* and insert the new node in the heap */
	    s.heap[1/*SMALLEST*/] = node++;
	    pqdownheap(s, tree, 1/*SMALLEST*/);

	  } while (s.heap_len >= 2);

	  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

	  /* At this point, the fields freq and dad are set. We can now
	   * generate the bit lengths.
	   */
	  gen_bitlen(s, desc);

	  /* The field len is now set, we can generate the bit codes */
	  gen_codes(tree, max_code, s.bl_count);
	}


	/* ===========================================================================
	 * Scan a literal or distance tree to determine the frequencies of the codes
	 * in the bit length tree.
	 */
	function scan_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree;   /* the tree to be scanned */
	//    int max_code;    /* and its largest code of non zero frequency */
	{
	  var n;                     /* iterates over all tree elements */
	  var prevlen = -1;          /* last emitted length */
	  var curlen;                /* length of current code */

	  var nextlen = tree[0*2 + 1]/*.Len*/; /* length of next code */

	  var count = 0;             /* repeat count of the current code */
	  var max_count = 7;         /* max repeat count */
	  var min_count = 4;         /* min repeat count */

	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }
	  tree[(max_code+1)*2 + 1]/*.Len*/ = 0xffff; /* guard */

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n+1)*2 + 1]/*.Len*/;

	    if (++count < max_count && curlen === nextlen) {
	      continue;

	    } else if (count < min_count) {
	      s.bl_tree[curlen * 2]/*.Freq*/ += count;

	    } else if (curlen !== 0) {

	      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
	      s.bl_tree[REP_3_6*2]/*.Freq*/++;

	    } else if (count <= 10) {
	      s.bl_tree[REPZ_3_10*2]/*.Freq*/++;

	    } else {
	      s.bl_tree[REPZ_11_138*2]/*.Freq*/++;
	    }

	    count = 0;
	    prevlen = curlen;

	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;

	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;

	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}


	/* ===========================================================================
	 * Send a literal or distance tree in compressed form, using the codes in
	 * bl_tree.
	 */
	function send_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree; /* the tree to be scanned */
	//    int max_code;       /* and its largest code of non zero frequency */
	{
	  var n;                     /* iterates over all tree elements */
	  var prevlen = -1;          /* last emitted length */
	  var curlen;                /* length of current code */

	  var nextlen = tree[0*2 + 1]/*.Len*/; /* length of next code */

	  var count = 0;             /* repeat count of the current code */
	  var max_count = 7;         /* max repeat count */
	  var min_count = 4;         /* min repeat count */

	  /* tree[max_code+1].Len = -1; */  /* guard already set */
	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n+1)*2 + 1]/*.Len*/;

	    if (++count < max_count && curlen === nextlen) {
	      continue;

	    } else if (count < min_count) {
	      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

	    } else if (curlen !== 0) {
	      if (curlen !== prevlen) {
	        send_code(s, curlen, s.bl_tree);
	        count--;
	      }
	      //Assert(count >= 3 && count <= 6, " 3_6?");
	      send_code(s, REP_3_6, s.bl_tree);
	      send_bits(s, count-3, 2);

	    } else if (count <= 10) {
	      send_code(s, REPZ_3_10, s.bl_tree);
	      send_bits(s, count-3, 3);

	    } else {
	      send_code(s, REPZ_11_138, s.bl_tree);
	      send_bits(s, count-11, 7);
	    }

	    count = 0;
	    prevlen = curlen;
	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;

	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;

	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}


	/* ===========================================================================
	 * Construct the Huffman tree for the bit lengths and return the index in
	 * bl_order of the last bit length code to send.
	 */
	function build_bl_tree(s) {
	  var max_blindex;  /* index of last bit length code of non zero freq */

	  /* Determine the bit length frequencies for literal and distance trees */
	  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
	  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

	  /* Build the bit length tree: */
	  build_tree(s, s.bl_desc);
	  /* opt_len now includes the length of the tree representations, except
	   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
	   */

	  /* Determine the number of bit length codes to send. The pkzip format
	   * requires that at least 4 bit length codes be sent. (appnote.txt says
	   * 3 but the actual value used is 4.)
	   */
	  for (max_blindex = BL_CODES-1; max_blindex >= 3; max_blindex--) {
	    if (s.bl_tree[bl_order[max_blindex]*2 + 1]/*.Len*/ !== 0) {
	      break;
	    }
	  }
	  /* Update opt_len to include the bit length tree and counts */
	  s.opt_len += 3*(max_blindex+1) + 5+5+4;
	  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
	  //        s->opt_len, s->static_len));

	  return max_blindex;
	}


	/* ===========================================================================
	 * Send the header for a block using dynamic Huffman trees: the counts, the
	 * lengths of the bit length codes, the literal tree and the distance tree.
	 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
	 */
	function send_all_trees(s, lcodes, dcodes, blcodes)
	//    deflate_state *s;
	//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
	{
	  var rank;                    /* index in bl_order */

	  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
	  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
	  //        "too many codes");
	  //Tracev((stderr, "\nbl counts: "));
	  send_bits(s, lcodes-257, 5); /* not +255 as stated in appnote.txt */
	  send_bits(s, dcodes-1,   5);
	  send_bits(s, blcodes-4,  4); /* not -3 as stated in appnote.txt */
	  for (rank = 0; rank < blcodes; rank++) {
	    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
	    send_bits(s, s.bl_tree[bl_order[rank]*2 + 1]/*.Len*/, 3);
	  }
	  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_ltree, lcodes-1); /* literal tree */
	  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_dtree, dcodes-1); /* distance tree */
	  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
	}


	/* ===========================================================================
	 * Check if the data type is TEXT or BINARY, using the following algorithm:
	 * - TEXT if the two conditions below are satisfied:
	 *    a) There are no non-portable control characters belonging to the
	 *       "black list" (0..6, 14..25, 28..31).
	 *    b) There is at least one printable character belonging to the
	 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
	 * - BINARY otherwise.
	 * - The following partially-portable control characters form a
	 *   "gray list" that is ignored in this detection algorithm:
	 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
	 * IN assertion: the fields Freq of dyn_ltree are set.
	 */
	function detect_data_type(s) {
	  /* black_mask is the bit mask of black-listed bytes
	   * set bits 0..6, 14..25, and 28..31
	   * 0xf3ffc07f = binary 11110011111111111100000001111111
	   */
	  var black_mask = 0xf3ffc07f;
	  var n;

	  /* Check for non-textual ("black-listed") bytes. */
	  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
	    if ((black_mask & 1) && (s.dyn_ltree[n*2]/*.Freq*/ !== 0)) {
	      return Z_BINARY;
	    }
	  }

	  /* Check for textual ("white-listed") bytes. */
	  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
	      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
	    return Z_TEXT;
	  }
	  for (n = 32; n < LITERALS; n++) {
	    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
	      return Z_TEXT;
	    }
	  }

	  /* There are no "black-listed" or "white-listed" bytes:
	   * this stream either is empty or has tolerated ("gray-listed") bytes only.
	   */
	  return Z_BINARY;
	}


	var static_init_done = false;

	/* ===========================================================================
	 * Initialize the tree data structures for a new zlib stream.
	 */
	function _tr_init(s)
	{

	  if (!static_init_done) {
	    tr_static_init();
	    static_init_done = true;
	  }

	  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
	  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
	  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

	  s.bi_buf = 0;
	  s.bi_valid = 0;

	  /* Initialize the first block of the first file: */
	  init_block(s);
	}


	/* ===========================================================================
	 * Send a stored block
	 */
	function _tr_stored_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  send_bits(s, (STORED_BLOCK<<1)+(last ? 1 : 0), 3);    /* send block type */
	  copy_block(s, buf, stored_len, true); /* with header */
	}


	/* ===========================================================================
	 * Send one empty static block to give enough lookahead for inflate.
	 * This takes 10 bits, of which 7 may remain in the bit buffer.
	 */
	function _tr_align(s) {
	  send_bits(s, STATIC_TREES<<1, 3);
	  send_code(s, END_BLOCK, static_ltree);
	  bi_flush(s);
	}


	/* ===========================================================================
	 * Determine the best encoding for the current block: dynamic trees, static
	 * trees or store, and output the encoded block to the zip file.
	 */
	function _tr_flush_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block, or NULL if too old */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
	  var max_blindex = 0;        /* index of last bit length code of non zero freq */

	  /* Build the Huffman trees unless a stored block is forced */
	  if (s.level > 0) {

	    /* Check if the file is binary or text */
	    if (s.strm.data_type === Z_UNKNOWN) {
	      s.strm.data_type = detect_data_type(s);
	    }

	    /* Construct the literal and distance trees */
	    build_tree(s, s.l_desc);
	    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));

	    build_tree(s, s.d_desc);
	    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));
	    /* At this point, opt_len and static_len are the total bit lengths of
	     * the compressed block data, excluding the tree representations.
	     */

	    /* Build the bit length tree for the above two trees, and get the index
	     * in bl_order of the last bit length code to send.
	     */
	    max_blindex = build_bl_tree(s);

	    /* Determine the best encoding. Compute the block lengths in bytes. */
	    opt_lenb = (s.opt_len+3+7) >>> 3;
	    static_lenb = (s.static_len+3+7) >>> 3;

	    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
	    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
	    //        s->last_lit));

	    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

	  } else {
	    // Assert(buf != (char*)0, "lost buf");
	    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
	  }

	  if ((stored_len+4 <= opt_lenb) && (buf !== -1)) {
	    /* 4: two words for the lengths */

	    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
	     * Otherwise we can't have processed more than WSIZE input bytes since
	     * the last block flush, because compression would have been
	     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
	     * transform a block into a stored block.
	     */
	    _tr_stored_block(s, buf, stored_len, last);

	  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

	    send_bits(s, (STATIC_TREES<<1) + (last ? 1 : 0), 3);
	    compress_block(s, static_ltree, static_dtree);

	  } else {
	    send_bits(s, (DYN_TREES<<1) + (last ? 1 : 0), 3);
	    send_all_trees(s, s.l_desc.max_code+1, s.d_desc.max_code+1, max_blindex+1);
	    compress_block(s, s.dyn_ltree, s.dyn_dtree);
	  }
	  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
	  /* The above check is made mod 2^32, for files larger than 512 MB
	   * and uLong implemented on 32 bits.
	   */
	  init_block(s);

	  if (last) {
	    bi_windup(s);
	  }
	  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
	  //       s->compressed_len-7*last));
	}

	/* ===========================================================================
	 * Save the match info and tally the frequency counts. Return true if
	 * the current block must be flushed.
	 */
	function _tr_tally(s, dist, lc)
	//    deflate_state *s;
	//    unsigned dist;  /* distance of matched string */
	//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
	{
	  //var out_length, in_length, dcode;

	  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
	  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

	  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
	  s.last_lit++;

	  if (dist === 0) {
	    /* lc is the unmatched char */
	    s.dyn_ltree[lc*2]/*.Freq*/++;
	  } else {
	    s.matches++;
	    /* Here, lc is the match length - MIN_MATCH */
	    dist--;             /* dist = match distance - 1 */
	    //Assert((ush)dist < (ush)MAX_DIST(s) &&
	    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
	    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

	    s.dyn_ltree[(_length_code[lc]+LITERALS+1) * 2]/*.Freq*/++;
	    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
	  }

	// (!) This block is disabled in zlib defailts,
	// don't enable it for binary compatibility

	//#ifdef TRUNCATE_BLOCK
	//  /* Try to guess if it is profitable to stop the current block here */
	//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
	//    /* Compute an upper bound for the compressed length */
	//    out_length = s.last_lit*8;
	//    in_length = s.strstart - s.block_start;
	//
	//    for (dcode = 0; dcode < D_CODES; dcode++) {
	//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
	//    }
	//    out_length >>>= 3;
	//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
	//    //       s->last_lit, in_length, out_length,
	//    //       100L - out_length*100L/in_length));
	//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
	//      return true;
	//    }
	//  }
	//#endif

	  return (s.last_lit === s.lit_bufsize-1);
	  /* We avoid equality with lit_bufsize because of wraparound at 64K
	   * on 16 bit machines and because stored blocks are restricted to
	   * 64K-1 bytes.
	   */
	}

	exports._tr_init  = _tr_init;
	exports._tr_stored_block = _tr_stored_block;
	exports._tr_flush_block  = _tr_flush_block;
	exports._tr_tally = _tr_tally;
	exports._tr_align = _tr_align;

	},{"../utils/common":3}],15:[function(require,module,exports){
	'use strict';


	function ZStream() {
	  /* next input byte */
	  this.input = null; // JS specific, because we have no pointers
	  this.next_in = 0;
	  /* number of bytes available at input */
	  this.avail_in = 0;
	  /* total number of input bytes read so far */
	  this.total_in = 0;
	  /* next output byte should be put there */
	  this.output = null; // JS specific, because we have no pointers
	  this.next_out = 0;
	  /* remaining free space at output */
	  this.avail_out = 0;
	  /* total number of bytes output so far */
	  this.total_out = 0;
	  /* last error message, NULL if no error */
	  this.msg = ''/*Z_NULL*/;
	  /* not visible by applications */
	  this.state = null;
	  /* best guess about the data type: binary or text */
	  this.data_type = 2/*Z_UNKNOWN*/;
	  /* adler32 value of the uncompressed data */
	  this.adler = 0;
	}

	module.exports = ZStream;

	},{}],"/":[function(require,module,exports){
	// Top level file is just a mixin of submodules & constants
	'use strict';

	var assign    = require('./lib/utils/common').assign;

	var deflate   = require('./lib/deflate');
	var inflate   = require('./lib/inflate');
	var constants = require('./lib/zlib/constants');

	var pako = {};

	assign(pako, deflate, inflate, constants);

	module.exports = pako;

	},{"./lib/deflate":1,"./lib/inflate":2,"./lib/utils/common":3,"./lib/zlib/constants":6}]},{},[])("/")
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(13);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _BB = __webpack_require__(1);

	var _BB2 = _interopRequireDefault(_BB);

	var _BBCQuery = __webpack_require__(5);

	var _BBCQuery2 = _interopRequireDefault(_BBCQuery);

	__webpack_require__(14);

	/*global require*/ // eslint
	__webpack_require__(15);

	//初期化
	var CanvasName = "BBCompass";
	var DivName = "CanvasArea";
	var scrollBarWidth = 0;
	var scrollBarHeight = 0;
	var freehandOnWrite = undefined;
	var bbobj = "";
	var wideview = true;

	//ターレット関連データ
	var turretSpec = {
	    "R": [200, 180],
	    "G": [250, 180],
	    "M": [250, 180],
	    "L": [200, 180]
	};
	var turretCircle = 8;

	//メニューのオブジェクト選択
	var onObjectSelectorChanged = function onObjectSelectorChanged($this) {
	    var speed = arguments.length <= 1 || arguments[1] === undefined ? "fast" : arguments[1];

	    if ($this.hasClass("selected")) {
	        return false;
	    } else {
	        (0, _jquery2['default'])("div#objselector div.option.selected").removeClass("selected");
	        $this.addClass("selected");
	    }
	    var openid = $this.attr("data-target");

	    //リストの先頭を選択済みにする
	    (0, _jquery2['default'])("#" + openid + " " + ".formlst option:first").attr('selected', true);
	    (0, _jquery2['default'])("#" + openid + " " + ".formlst").change();

	    (0, _jquery2['default'])("div.setobj:visible").fadeOut(speed, function () {
	        (0, _jquery2['default'])("#" + openid).fadeIn(speed);
	    });
	};

	// 読み込み時の処理
	(0, _jquery2['default'])(document).ready(function () {
	    (0, _jquery2['default'])("#lst_scout").change(function () {
	        (0, _jquery2['default'])("#name_scout").val((0, _jquery2['default'])("#lst_scout option:selected").text());
	    });
	    (0, _jquery2['default'])("#lst_sensor").change(function () {
	        (0, _jquery2['default'])("#name_sensor").val((0, _jquery2['default'])("#lst_sensor option:selected").text());
	    });
	    (0, _jquery2['default'])("#lst_radar").change(function () {
	        (0, _jquery2['default'])("#name_radar").val((0, _jquery2['default'])("#lst_radar option:selected").text());
	    });
	    (0, _jquery2['default'])("#lst_sonde").change(function () {
	        (0, _jquery2['default'])("#name_sonde").val((0, _jquery2['default'])("#lst_sonde option:selected").text());
	    });
	    (0, _jquery2['default'])("#lst_ndsensor").change(function () {
	        (0, _jquery2['default'])("#name_ndsensor").val((0, _jquery2['default'])("#lst_ndsensor option:selected").text());
	    });
	    (0, _jquery2['default'])("#lst_vsensor").change(function () {
	        (0, _jquery2['default'])("#name_vsensor").val((0, _jquery2['default'])("#lst_vsensor option:selected").text());
	    });
	    (0, _jquery2['default'])("#lst_howitzer").change(function () {
	        (0, _jquery2['default'])("#name_howitzer").val((0, _jquery2['default'])("#lst_howitzer option:selected").text());
	    });
	    (0, _jquery2['default'])("#lst_misc").change(function () {
	        (0, _jquery2['default'])("#name_misc").val((0, _jquery2['default'])("#lst_misc option:selected").text());
	    });
	    (0, _jquery2['default'])("#lst_icon").change(function () {
	        (0, _jquery2['default'])("#name_icon").val((0, _jquery2['default'])("#lst_icon option:selected").text());
	    });

	    (0, _jquery2['default'])('select.colorpick').simplecolorpicker({
	        picker: true
	    });

	    var mapobj = (0, _jquery2['default'])("select#map").children().get();
	    _jquery2['default'].extend({
	        restoreMaps: function restoreMaps() {
	            (0, _jquery2['default'])("select#map").children().remove();
	            (0, _jquery2['default'])("select#map").append(mapobj);
	        }
	    });

	    (0, _jquery2['default'])("select#stage").change(function (e) {
	        var stage = (0, _jquery2['default'])("select#stage option:selected").val();
	        _jquery2['default'].restoreMaps();
	        (0, _jquery2['default'])("select#map").children("[data-stage!='" + stage + "']").remove();
	        (0, _jquery2['default'])("#map").change();
	    });
	    (0, _jquery2['default'])("select#map").change(function () {
	        (0, _jquery2['default'])("select#map").removeClass("union event scramble");
	        if ((0, _jquery2['default'])("select#map option:selected").attr("class") !== undefined) {
	            (0, _jquery2['default'])("select#map").addClass((0, _jquery2['default'])("select#map option:selected").attr("class"));
	        }
	    });

	    // 初回のリセット
	    (0, _jquery2['default'])("#stage").change();

	    (0, _jquery2['default'])("div#objselector div.option").click(function () {
	        onObjectSelectorChanged((0, _jquery2['default'])(this));
	    });

	    //狭い時用メニューに関する初期化
	    (0, _jquery2['default'])("div.menutab#menutab_map").click(function (ev) {
	        if ((0, _jquery2['default'])("div.menucell#menu_map,div.menucell#menu_cont").is(":visible")) {
	            (0, _jquery2['default'])("div.ribbonmenu").fadeOut("fast");
	            (0, _jquery2['default'])("div.menutab").removeClass("selected");
	        } else {
	            (0, _jquery2['default'])("div.menutab").removeClass("selected");
	            (0, _jquery2['default'])("div.ribbonmenu").fadeOut("fast", function () {
	                (0, _jquery2['default'])("div.ribbonmenu>*").hide();
	                (0, _jquery2['default'])("div.menucell#menu_map,div.menucell#menu_cont").show();
	                (0, _jquery2['default'])("div.ribbonmenu").fadeIn("fast");
	                (0, _jquery2['default'])("div.menutab#menutab_map").addClass("selected");
	            });
	        }
	    });

	    (0, _jquery2['default'])("div.menutab#menutab_item").click(function (ev) {
	        if ((0, _jquery2['default'])("div.menusubcell#subcell_graph").is(":visible")) {
	            (0, _jquery2['default'])("div.ribbonmenu").fadeOut("fast");
	            (0, _jquery2['default'])("div.menutab").removeClass("selected");
	        } else {
	            (0, _jquery2['default'])("div.menutab").removeClass("selected");
	            (0, _jquery2['default'])("div.ribbonmenu").fadeOut("fast", function () {
	                (0, _jquery2['default'])("div.ribbonmenu>*").hide();
	                (0, _jquery2['default'])("div.menusubcell#subcell_graph").show();
	                (0, _jquery2['default'])("div.ribbonmenu").fadeIn("fast");
	                (0, _jquery2['default'])("div.menutab#menutab_item").addClass("selected");
	            });
	        }
	    });

	    //メニュー部のタッチによるスクロール防止と、独自スクロール処理のbind
	    (0, _jquery2['default'])("header,div.ribbonmenu").bind('touchmove', function (ev) {
	        if (wideview) return true;
	        ev.preventDefault();
	    });
	    bindScroll((0, _jquery2['default'])("div#objselector"));

	    //コンテキストメニュー
	    (0, _jquery2['default'])("div.ContextMenu").bind('contextmenu', function (ev) {
	        ev.preventDefault();
	    });
	    (0, _jquery2['default'])("div.ContextMenu li.hasChild").bind('click', function (ev) {
	        if (ev.target == ev.currentTarget) {
	            ev.stopPropagation();
	        }
	    });
	    (0, _jquery2['default'])("div#CanvasArea").bind('contextmenu', function (ev) {
	        if (!wideview) return true;
	        ev.preventDefault();
	        var offset = {
	            "top": ev.pageY,
	            "left": ev.pageX
	        };

	        //はみ出しそうなら収める
	        if (ev.clientY + (0, _jquery2['default'])("div.ContextMenu").height() > (0, _jquery2['default'])(window).height() - 3) {
	            offset.top = (0, _jquery2['default'])(window).height() - (0, _jquery2['default'])("div.ContextMenu").height() + (0, _jquery2['default'])(window).scrollTop() - 3;
	        }

	        if (ev.clientX + (0, _jquery2['default'])("div.ContextMenu").width() > (0, _jquery2['default'])(window).width() - 3) {
	            offset.left = (0, _jquery2['default'])(window).width() - (0, _jquery2['default'])("div.ContextMenu").width() + (0, _jquery2['default'])(window).scrollLeft() - 3;
	        }

	        (0, _jquery2['default'])("div.ContextMenu").show().offset(offset);

	        //どこかクリックしたらメニューを消す
	        (0, _jquery2['default'])(document).one('click', function () {
	            (0, _jquery2['default'])("div.ContextMenu,div.ContextMenu div.ContextChild").hide();
	        });
	    });

	    //子メニュー表示部
	    (0, _jquery2['default'])("div.ContextMenu li.hasChild").hover(function (ev) {
	        var offset = {
	            top: (0, _jquery2['default'])(this).offset().top,
	            left: (0, _jquery2['default'])(this).offset().left + (0, _jquery2['default'])(this).width() * 0.99
	        };

	        if ((0, _jquery2['default'])(this).offset().top - (0, _jquery2['default'])(window).scrollTop() + (0, _jquery2['default'])(this).children(".ContextChild").height() > (0, _jquery2['default'])(window).height()) {

	            offset.top = (0, _jquery2['default'])(window).scrollTop() + (0, _jquery2['default'])(window).height() - (0, _jquery2['default'])(this).children(".ContextChild").height() - 3;
	        }

	        if ((0, _jquery2['default'])(this).offset().left - (0, _jquery2['default'])(window).scrollLeft() + (0, _jquery2['default'])(this).width() * 0.99 + (0, _jquery2['default'])(this).children(".ContextChild").width() > (0, _jquery2['default'])(window).width()) {
	            offset.left = (0, _jquery2['default'])(this).offset().left - (0, _jquery2['default'])(this).children(".ContextChild").width() * 0.99;
	        }

	        (0, _jquery2['default'])(this).children(".ContextChild").show().offset(offset);
	    }, function (ev) {
	        (0, _jquery2['default'])(this).children(".ContextChild").hide();
	    });

	    //ズーム
	    (0, _jquery2['default'])("#lst_scale").change(function () {
	        zoom_cnv((0, _jquery2['default'])(this).val());
	    });

	    //changelog
	    _jquery2['default'].ajax({
	        url: "./Changelog.txt",
	        dataType: 'text',
	        cache: false,
	        success: function success(txt, status) {
	            (0, _jquery2['default'])("#changelog").val(txt);
	        },
	        error: function error() {
	            (0, _jquery2['default'])("#changelog").val("更新履歴の取得に失敗しました");
	        }
	    });

	    (0, _jquery2['default'])("#menusw_off").bind('click', function (e) {
	        hide_menu();
	    });
	    (0, _jquery2['default'])("#menusw_on").bind('click', function (e) {
	        show_menu();
	    });
	    (0, _jquery2['default'])("#change_map").bind('click', function (e) {
	        chg_map();
	    });
	    (0, _jquery2['default'])("#submit_scout").bind('click', function (e) {
	        set_scout();
	    });
	    (0, _jquery2['default'])("#submit_sensor").bind('click', function (e) {
	        set_sensor();
	    });
	    (0, _jquery2['default'])("#submit_radar").bind('click', function (e) {
	        set_radar();
	    });
	    (0, _jquery2['default'])("#submit_sonde").bind('click', function (e) {
	        set_sonde();
	    });
	    (0, _jquery2['default'])("#submit_ndsensor").bind('click', function (e) {
	        set_ndsensor();
	    });
	    (0, _jquery2['default'])("#submit_vsensor").bind('click', function (e) {
	        set_vsensor();
	    });
	    (0, _jquery2['default'])("#submit_howitzer").bind('click', function (e) {
	        set_howitzer();
	    });
	    (0, _jquery2['default'])("#submit_waft").bind('click', function (e) {
	        set_waft('image/waft.png');
	    });
	    (0, _jquery2['default'])("#submit_misc").bind('click', function (e) {
	        set_misc();
	    });
	    (0, _jquery2['default'])("#submit_circle").bind('click', function (e) {
	        set_circle();
	    });
	    (0, _jquery2['default'])("#submit_line").bind('click', function (e) {
	        set_line();
	    });
	    (0, _jquery2['default'])("#submit_point").bind('click', function (e) {
	        set_point();
	    });
	    (0, _jquery2['default'])("#submit_icon").bind('click', function (e) {
	        set_icon();
	    });
	    (0, _jquery2['default'])("#submit_freehand").bind('click', function (e) {
	        set_freehand();
	    }); // TODO: あとで

	    (0, _jquery2['default'])("#csr_select").bind('click', function (e) {
	        stop_move();
	    });
	    (0, _jquery2['default'])("#csr_move").bind('click', function (e) {
	        start_move();
	    });

	    (0, _jquery2['default'])("#up_object").bind('click', function (e) {
	        up_object();
	    });
	    (0, _jquery2['default'])("#down_object").bind('click', function (e) {
	        down_object();
	    });
	    (0, _jquery2['default'])("#del_object").bind('click', function (e) {
	        del_object();
	    });
	    (0, _jquery2['default'])("#save_img").bind('click', function (e) {
	        saveImg();
	    });
	    (0, _jquery2['default'])("#get_url").bind('click', function (e) {
	        getURL();
	    });
	    (0, _jquery2['default'])("#contextSelectMode").bind('click', function (e) {
	        stop_move();
	    });
	    (0, _jquery2['default'])("#contextMoveMode").bind('click', function (e) {
	        start_move();
	    });
	    (0, _jquery2['default'])("#contextZoom_1").bind('click', function (e) {
	        zoom_cnv(1);
	    });
	    (0, _jquery2['default'])("#contextZoom_1_5").bind('click', function (e) {
	        zoom_cnv(1.5);
	    });
	    (0, _jquery2['default'])("#contextZoom_2").bind('click', function (e) {
	        zoom_cnv(2);
	    });
	    (0, _jquery2['default'])("#contextZoom_4").bind('click', function (e) {
	        zoom_cnv(4);
	    });
	    (0, _jquery2['default'])("#save_img2").bind('click', function (e) {
	        saveImg();
	    });
	    (0, _jquery2['default'])("#get_url2").bind('click', function (e) {
	        getURL();
	    });

	    initialize();
	});
	//各種初期化処理
	function initialize() {
	    /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
	    var canvas = document.getElementById(CanvasName);
	    if (!canvas || !canvas.getContext) {
	        alert("ブラウザがCanvas非対応なので、このブラウザでは動作しません");
	        return false;
	    }
	    bbobj = new _BB2['default'](CanvasName);

	    var cnvArea = document.getElementById(DivName);
	    scrollBarWidth = cnvArea.offsetWidth - cnvArea.clientWidth;
	    scrollBarHeight = cnvArea.offsetHeight - cnvArea.clientHeight + 6;
	    (0, _jquery2['default'])("#" + DivName).width((0, _jquery2['default'])("#" + CanvasName).outerWidth() + scrollBarWidth).height((0, _jquery2['default'])("#" + CanvasName).outerHeight() + scrollBarHeight);

	    (0, _jquery2['default'])("#lst_layer").change(function () {
	        closeNav();
	        bbobj.setbgdiff((0, _jquery2['default'])("#lst_layer").val());
	    });
	    (0, _jquery2['default'])("#" + DivName).scroll(function () {
	        bbobj.chgScroll();
	    });

	    //ウィンドウサイズの変更に対する対処
	    wideview = (0, _jquery2['default'])("div.menutitle").is(":visible");
	    (0, _jquery2['default'])(window).resize(function () {
	        //キャンバスエリアの幅を調整、jCanvaScriptの処理に反映させる
	        chgCanvasAreaSize();

	        //メニューの表示・非表示対処
	        if ((0, _jquery2['default'])("div.menutitle").is(":visible")) {
	            wideview = true;

	            //各ブロックをcssのデフォルトに戻す
	            (0, _jquery2['default'])("body,header,div.ribbonmenu,div.ribbonmenu>div").removeAttr('style');

	            //メニュー全体はスイッチを基に表示：非表示を決める
	            if ((0, _jquery2['default'])("span#menusw_on").is(":visible")) {
	                (0, _jquery2['default'])("div.ribbonmenu").hide();
	            } else {
	                (0, _jquery2['default'])("div.ribbonmenu").show();
	            }
	        } else {
	            wideview = false;

	            if ((0, _jquery2['default'])("div.menutab#menutab_map").hasClass("selected")) {
	                (0, _jquery2['default'])("div.menusubcell#subcell_graph").hide();
	                (0, _jquery2['default'])("div.menucell#menu_map,div.menucell#menu_cont").show();
	                (0, _jquery2['default'])("div.ribbonmenu").show();
	            } else if ((0, _jquery2['default'])("div.menutab#menutab_item").hasClass("selected")) {
	                (0, _jquery2['default'])("div.menucell#menu_map,div.menucell#menu_cont").hide();
	                (0, _jquery2['default'])("div.menusubcell#subcell_graph").show();
	                (0, _jquery2['default'])("div.ribbonmenu").show();
	            } else {
	                (0, _jquery2['default'])("div.ribbonmenu").hide();
	            }
	        }
	    });

	    //スマホ用メニュー制御
	    var ua = navigator.userAgent;
	    if (window.TouchEvent && (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0)) {
	        var pcmode, intervalID, timeoutID, correctFlag, headerHeight, headelem, vp_width;
	        var media;
	        var sw;

	        (function () {

	            //スクロール時のメニュー追従処理に使う関数を定義

	            var chgMenuScale = function chgMenuScale() {
	                //幅広表示の時は座標の再計算だけして抜ける(無効化漏れのフォロー)
	                if (wideview) {
	                    bbobj.chgScroll();
	                    return false;
	                }

	                //headerとメニュー幅を固定・拡縮
	                var scale = window.innerWidth / vp_width;
	                (0, _jquery2['default'])("header, div.ribbonmenu").css("transform", "scale(" + scale + ")").css("-ms-transform", "scale(" + scale + ")").css("-webkit-transform", "scale(" + scale + ")");

	                var headrect = headelem.getBoundingClientRect(),
	                    docrect = document.documentElement.getBoundingClientRect();

	                if (correctFlag) {
	                    var menuTop = Math.round(window.pageYOffset + docrect.top + headelem.offsetTop - headrect.top);
	                    (0, _jquery2['default'])("header").css("top", menuTop);
	                    (0, _jquery2['default'])("div.ribbonmenu").css("top", menuTop + headerHeight);

	                    var menuLeft = Math.round(window.pageXOffset + docrect.left + headelem.offsetLeft - headrect.left);
	                    (0, _jquery2['default'])("header, div.ribbonmenu").css("left", menuLeft);
	                }
	                bbobj.chgScroll();
	                return true;
	            }

	            //スクロール終了待ち処理 タイマーをリセットするのみ
	            ;

	            var doWhileScroll = function doWhileScroll() {
	                if (timeoutID) window.clearTimeout(timeoutID);
	                timeoutID = window.setTimeout(doWhenScrollEnded, 60);
	            }

	            //スクロール停止後 改めて移動処理を行ってからbodyのマージンを変更
	            ;

	            var doWhenScrollEnded = function doWhenScrollEnded() {
	                window.clearInterval(intervalID);
	                intervalID = null;
	                timeoutID = null;
	                window.removeEventListener('scroll', doWhileScroll);
	                if (chgMenuScale()) {
	                    (0, _jquery2['default'])("body").css("margin-top", (headerHeight + 5) * window.innerWidth / vp_width);

	                    //処理遅れの救済処置
	                    setTimeout(chgMenuScale, 100);
	                    setTimeout(chgMenuScale, 300);
	                    setTimeout(chgMenuScale, 500);
	                }
	            }

	            //PC版・スマホ版の切替機能を仕込む
	            //firefoxのバグ対策のため、metaの属性書き換えではなく、タグごと消して作り直す
	            ;

	            var initMenuScale = function initMenuScale() {
	                vp_width = window.outerWidth || document.documentElement.getBoundingClientRect().width;
	                if (chgMenuScale()) {
	                    (0, _jquery2['default'])("body").css("margin-top", headerHeight * window.innerWidth / vp_width + 5);
	                    (0, _jquery2['default'])("header, div.ribbonmenu").css("width", vp_width);
	                }
	            }

	            //リロード時のウィンドウサイズ変更に対応
	            ;

	            //各種制御用変数
	            pcmode = false;
	            intervalID = null;
	            timeoutID = null;
	            correctFlag = false;
	            headerHeight = (0, _jquery2['default'])("header").outerHeight();
	            headelem = document.getElementsByTagName("header")[0];
	            //後でinitMenuScaleが初期化するため、ここでは触らない
	            // cookies  = document.cookie;

	            //向きが変わっていたら幅を取り直す
	            media = window.matchMedia("(orientation: portrait)");

	            media.addListener(function (m) {
	                window.setTimeout(initMenuScale, 50);
	            });

	            //古いandroidの標準ブラウザの挙動が特殊なので、
	            //androidはY軸のスクロールに関する挙動からメニュー位置補正の方針を決める
	            if (ua.indexOf('Android') > 0) {
	                window.addEventListener('scroll', (function () {
	                    return function f() {
	                        correctFlag = -headelem.getBoundingClientRect().top != window.pageYOffset;
	                        window.removeEventListener('scroll', f, true);
	                    };
	                })(), true);
	                window.scrollTo(0, 1);
	            } else {
	                //iOSなどは常に補正ありで問題なさそう
	                correctFlag = true;
	                //inputやselectからフォーカスアウトした際に位置合わせしなおす
	                (0, _jquery2['default'])("select, input, textarea").bind('blur', function () {
	                    if (!wideview) {
	                        window.setTimeout(chgMenuScale, 200);
	                        window.setTimeout(chgMenuScale, 700);
	                    }
	                });
	            }sw = (0, _jquery2['default'])("span#viewsw");

	            sw.show();
	            sw.bind('click', function (ev) {
	                if (timeoutID) {
	                    window.clearTimeout(timeoutID);
	                    timeoutID = null;
	                }
	                if (intervalID) {
	                    window.clearInterval(intervalID);
	                    intervalID = null;
	                }
	                window.removeEventListener('scroll', doWhileScroll);
	                (0, _jquery2['default'])("body, header, div.ribbonmenu, div.ribbonmenu>div").removeAttr('style');
	                if (pcmode) {
	                    pcmode = false;
	                    sw.text('PC版');
	                    document.cookie = 'pcmode=false;max-age=0';
	                    (0, _jquery2['default'])('meta[name=viewport]').remove();
	                    (0, _jquery2['default'])('head').append('<meta name="viewport" content="width=device-width,initial-scale=1.0">');

	                    //処理が遅れる場合があるようなので、少し遅延させる
	                    setTimeout(initMenuScale, 100);
	                } else {
	                    pcmode = true;
	                    sw.text('スマホ版');
	                    document.cookie = 'pcmode=true;max-age=2592000';
	                    (0, _jquery2['default'])('meta[name=viewport]').remove();
	                    (0, _jquery2['default'])('head').append('<meta name="viewport" content="width=980">');
	                    //古いWebKit対策。少し遅らせてstyleに空白を設定しなおす
	                    setTimeout(function () {
	                        (0, _jquery2['default'])("body, header, div.ribbonmenu, div.ribbonmenu>div").attr('style', '');
	                    }, 50);
	                }
	                (0, _jquery2['default'])(window).resize();
	            });

	            // cookieに指定があればPCモードに切り替えておく
	            if (document.cookie.replace(new RegExp("(?:^|.*;\\s*)pcmode\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1") == "true") {
	                sw.click();
	            }

	            // スクロール関連のイベント定義
	            window.addEventListener('touchstart', function (e) {
	                //幅広表示の時は何もしない
	                if (wideview) return;

	                window.removeEventListener('scroll', doWhileScroll);
	                if (!intervalID) {
	                    intervalID = window.setInterval(function () {
	                        chgMenuScale();
	                    }, 1000 / 30);
	                }
	            });

	            window.addEventListener('touchend', function (e) {
	                //幅広表示の時は何もしない
	                if (wideview) return;

	                if (e.touches.length < 1) {
	                    //スクロール終了待ちに移行
	                    timeoutID = window.setTimeout(doWhenScrollEnded, 60);
	                    window.addEventListener('scroll', doWhileScroll);
	                }
	            });

	            window.setTimeout(initMenuScale, 100);
	        })();
	    }

	    //メニューの初期状態を設定
	    onObjectSelectorChanged((0, _jquery2['default'])("#objselector div.option:first"), 0); // オブジェクトをひとつ選んでおく

	    //query stringがあれば再現処理に入る
	    if (window.location.search) {
	        setURL(window.location.search.substr(1));
	    }
	}

	//マップ変更
	function chg_map(callback) {
	    var file = sanitize_filename((0, _jquery2['default'])("#map option:selected").val());
	    var stage = sanitize_filename((0, _jquery2['default'])("#map option:selected").attr("data-stage"));
	    var layer = eval((0, _jquery2['default'])("#map option:selected").attr("data-layer"));
	    var scale = eval((0, _jquery2['default'])("#stage").children("[value='" + stage + "']").attr("data-scale"));

	    if (file == null || stage == null) {
	        alert("マップファイル名エラー");
	        return;
	    }

	    (0, _jquery2['default'])("div#Loading").show();
	    (0, _jquery2['default'])("#lst_object").children().remove();

	    bbobj.setbg("./map/" + stage + "/" + file + ".jpg", scale[0], scale[1], function () {
	        (0, _jquery2['default'])("#lst_scale").val(1);
	        (0, _jquery2['default'])("ul#contextZoom").children("li").removeClass("checked");
	        (0, _jquery2['default'])("li#contextZoom_1").addClass("checked");
	        (0, _jquery2['default'])("div#Loading").hide();
	        _jquery2['default'].ajax({
	            "url": "data/" + file + ".txt",
	            dataType: "jsonp",
	            crossDomain: true,
	            cache: false,
	            jsonp: false,
	            jsonpCallback: "stageData",
	            success: function success(data, status) {
	                chgCanvasAreaSize();

	                if ("turret" in data) {
	                    var turretData = data["turret"];
	                    for (i = 0; i < turretData.length; i++) {
	                        //x位置、y位置、回転角度、扇形の角度、射程、中心円サイズ、色、テストフラグ
	                        bbobj.put_turret(turretData[i][0], turretData[i][1], turretData[i][2], turretSpec[turretData[i][3]][0], turretSpec[turretData[i][3]][1], turretCircle, undefined, turretData[i][4]);
	                    }
	                }
	                if ("searcher" in data) {
	                    var searcherData = data["searcher"];
	                    for (i = 0; i < searcherData.length; i++) {
	                        //x位置、y位置、範囲、中心円サイズ、色、テストフラグ
	                        bbobj.put_searcher(searcherData[i][0], searcherData[i][1], searcherData[i][2], turretCircle, undefined, searcherData[i][3]);
	                    }
	                }
	                if (callback !== undefined) {
	                    callback.call();
	                }
	            },
	            error: function error() {}
	        });
	    });

	    (0, _jquery2['default'])("#lst_layer").children().remove();
	    (0, _jquery2['default'])("#lst_layer").append((0, _jquery2['default'])('<option value=""></option>').text("通常"));
	    for (var i = 0; i < layer.length; i++) {
	        (0, _jquery2['default'])("#lst_layer").append((0, _jquery2['default'])('<option value="./map/' + stage + "/" + file + '_' + (i + 1) + '.jpg' + '"></option>').text(layer[i]));
	    }
	    (0, _jquery2['default'])("#lst_layer").val("");

	    closeNav();
	}

	//偵察機
	function set_scout() {
	    if (!(0, _jquery2['default'])("#lst_scout").val()) {
	        return;
	    }
	    if (!(0, _jquery2['default'])("#col_scout").val()) {
	        return;
	    }

	    var param = eval((0, _jquery2['default'])("#lst_scout").val());
	    var obj = bbobj.add_scout((0, _jquery2['default'])("#name_scout").val(), param[0], param[1], param[2], (0, _jquery2['default'])("#col_scout").val());

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        obj.move((0, _jquery2['default'])("#" + DivName).scrollLeft(), (0, _jquery2['default'])("#" + DivName).scrollTop());
	        obj.mousedown(function () {
	            (0, _jquery2['default'])("#lst_object").val(obj.id);
	            return false;
	        });
	        closeNav();
	    }
	}

	//センサー
	function set_sensor() {
	    if (!(0, _jquery2['default'])("#lst_sensor").val()) {
	        return;
	    }
	    if (!(0, _jquery2['default'])("#col_sensor").val()) {
	        return;
	    }

	    var obj = bbobj.add_sensor((0, _jquery2['default'])("#name_sensor").val(), (0, _jquery2['default'])("#lst_sensor").val(), (0, _jquery2['default'])("#col_sensor").val());

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        obj.move((0, _jquery2['default'])("#" + DivName).scrollLeft(), (0, _jquery2['default'])("#" + DivName).scrollTop());
	        obj.mousedown(function () {
	            (0, _jquery2['default'])("#lst_object").val(obj.id);
	            return false;
	        });
	        closeNav();
	    }
	}

	//レーダー
	function set_radar() {
	    if (!(0, _jquery2['default'])("#lst_radar").val()) {
	        return;
	    }
	    if (!(0, _jquery2['default'])("#col_radar").val()) {
	        return;
	    }

	    var param = eval((0, _jquery2['default'])("#lst_radar").val());
	    var obj = bbobj.add_radar((0, _jquery2['default'])("#name_radar").val(), param[0], param[1], (0, _jquery2['default'])("#col_radar").val());

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        obj.move((0, _jquery2['default'])("#" + DivName).scrollLeft(), (0, _jquery2['default'])("#" + DivName).scrollTop());
	        obj.mousedown(function () {
	            (0, _jquery2['default'])("#lst_object").val(obj.id);
	            return false;
	        });
	        closeNav();
	    }
	}

	//滞空索敵弾
	function set_sonde() {
	    if (!(0, _jquery2['default'])("#lst_sonde").val()) {
	        return;
	    }
	    if (!(0, _jquery2['default'])("#col_sonde").val()) {
	        return;
	    }

	    var param = eval((0, _jquery2['default'])("#lst_sonde").val());
	    var obj = bbobj.add_sonde((0, _jquery2['default'])("#name_sonde").val(), param[0], param[1], (0, _jquery2['default'])("#col_sonde").val());

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        obj.move((0, _jquery2['default'])("#" + DivName).scrollLeft(), (0, _jquery2['default'])("#" + DivName).scrollTop());
	        obj.mousedown(function () {
	            (0, _jquery2['default'])("#lst_object").val(obj.id);
	            return false;
	        });
	        closeNav();
	    }
	}

	//ND索敵センサー
	function set_ndsensor() {
	    if (!(0, _jquery2['default'])("#lst_ndsensor").val()) {
	        return;
	    }
	    if (!(0, _jquery2['default'])("#col_ndsensor").val()) {
	        return;
	    }

	    var obj = bbobj.add_ndsensor((0, _jquery2['default'])("#name_ndsensor").val(), (0, _jquery2['default'])("#lst_ndsensor").val(), (0, _jquery2['default'])("#col_ndsensor").val());

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        obj.move((0, _jquery2['default'])("#" + DivName).scrollLeft(), (0, _jquery2['default'])("#" + DivName).scrollTop());
	        obj.mousedown(function () {
	            (0, _jquery2['default'])("#lst_object").val(obj.id);
	            return false;
	        });
	        closeNav();
	    }
	}

	//Vセンサー
	function set_vsensor() {
	    if (!(0, _jquery2['default'])("#lst_vsensor").val()) {
	        return;
	    }
	    if (!(0, _jquery2['default'])("#col_vsensor").val()) {
	        return;
	    }

	    var param = eval((0, _jquery2['default'])("#lst_vsensor").val());

	    var obj = bbobj.add_vsensor((0, _jquery2['default'])("#name_vsensor").val(), param[0], param[1], (0, _jquery2['default'])("#col_vsensor").val(), 'A');

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        obj.move((0, _jquery2['default'])("#" + DivName).scrollLeft(), (0, _jquery2['default'])("#" + DivName).scrollTop());
	        obj.mousedown(function () {
	            (0, _jquery2['default'])("#lst_object").val(obj.id);
	            return false;
	        });
	        closeNav();
	    }
	}

	//砲撃
	function set_howitzer() {
	    if (!(0, _jquery2['default'])("#lst_howitzer").val()) {
	        return;
	    }
	    if (!(0, _jquery2['default'])("#col_howitzer").val()) {
	        return;
	    }

	    var param = eval((0, _jquery2['default'])("#lst_howitzer").val());
	    var obj = bbobj.add_howitzer((0, _jquery2['default'])("#name_howitzer").val(), param[0], param[1], param[2], (0, _jquery2['default'])("#col_howitzer").val());

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        obj.move((0, _jquery2['default'])("#" + DivName).scrollLeft(), (0, _jquery2['default'])("#" + DivName).scrollTop());
	        obj.mousedown(function () {
	            (0, _jquery2['default'])("#lst_object").val(obj.id);
	            return false;
	        });
	        closeNav();
	    }
	}

	//その他攻撃関連
	function set_misc() {
	    if (!(0, _jquery2['default'])("#lst_misc").val()) {
	        return;
	    }
	    if (!(0, _jquery2['default'])("#col_misc").val()) {
	        return;
	    }

	    var obj;
	    switch ((0, _jquery2['default'])("#lst_misc").val()) {
	        case "bunker":
	            //サテライトバンカー
	            obj = bbobj.add_bunker((0, _jquery2['default'])("#name_misc").val(), (0, _jquery2['default'])("#col_misc").val());
	            break;

	        case "sentry":
	            //先生
	            obj = bbobj.add_sentry((0, _jquery2['default'])("#name_misc").val(), (0, _jquery2['default'])("#col_misc").val());
	            break;

	        case "aerosent":
	            //先生
	            obj = bbobj.add_aerosentry((0, _jquery2['default'])("#name_misc").val(), (0, _jquery2['default'])("#col_misc").val());
	            break;

	        case "bomber":
	            //爆撃通信機
	            obj = bbobj.add_bomber((0, _jquery2['default'])("#name_misc").val(), (0, _jquery2['default'])("#col_misc").val());
	            break;

	        case "bascout":
	            //偵察要請装置
	            obj = bbobj.add_bascout((0, _jquery2['default'])("#name_misc").val(), (0, _jquery2['default'])("#col_misc").val());
	            break;

	    }

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        obj.move((0, _jquery2['default'])("#" + DivName).scrollLeft(), (0, _jquery2['default'])("#" + DivName).scrollTop());
	        obj.mousedown(function () {
	            (0, _jquery2['default'])("#lst_object").val(obj.id);
	            return false;
	        });
	        closeNav();
	    }
	}

	//アイコン
	function set_icon() {
	    if (!(0, _jquery2['default'])("#lst_icon").val()) {
	        return;
	    }
	    if (!(0, _jquery2['default'])("#col_icon").val()) {
	        return;
	    }

	    var file = sanitize_filename((0, _jquery2['default'])("#lst_icon").val());
	    if (file == null) {
	        alert("アイコンファイル名エラー");
	        return;
	    }

	    var obj = bbobj.add_icon((0, _jquery2['default'])("#name_icon").val(), file, (0, _jquery2['default'])("#col_icon").val());

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        obj.move((0, _jquery2['default'])("#" + DivName).scrollLeft(), (0, _jquery2['default'])("#" + DivName).scrollTop());
	        obj.mousedown(function () {
	            (0, _jquery2['default'])("#lst_object").val(obj.id);
	            return false;
	        });
	        closeNav();
	    }
	}

	//ワフトローダー
	function set_waft(file) {
	    if (!file) {
	        return;
	    }
	    if (!(0, _jquery2['default'])("#col_waft").val()) {
	        return;
	    }

	    file = sanitize_filename(file);
	    if (file == null) {
	        alert("ワフト画像ファイル名エラー");
	        return;
	    }

	    var obj = bbobj.add_waft((0, _jquery2['default'])("#name_waft").val(), file, (0, _jquery2['default'])("#col_waft").val());

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        obj.move((0, _jquery2['default'])("#" + DivName).scrollLeft(), (0, _jquery2['default'])("#" + DivName).scrollTop());
	        obj.mousedown(function () {
	            (0, _jquery2['default'])("#lst_object").val(obj.id);
	            return false;
	        });
	        closeNav();
	    }
	}

	//円
	function set_circle() {
	    if (!(0, _jquery2['default'])("#rad_circle").val()) {
	        return;
	    }
	    if (!(0, _jquery2['default'])("#col_circle").val()) {
	        return;
	    }

	    var obj = bbobj.add_circle((0, _jquery2['default'])("#name_circle").val(), (0, _jquery2['default'])("#rad_circle").val(), (0, _jquery2['default'])("#col_circle").val());

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        obj.move((0, _jquery2['default'])("#" + DivName).scrollLeft(), (0, _jquery2['default'])("#" + DivName).scrollTop());
	        obj.mousedown(function () {
	            (0, _jquery2['default'])("#lst_object").val(obj.id);
	            return false;
	        });
	        closeNav();
	    }
	}

	//直線
	function set_line() {
	    if (!(0, _jquery2['default'])("#len_line").val()) {
	        return;
	    }
	    if (!(0, _jquery2['default'])("#col_line").val()) {
	        return;
	    }

	    var obj = bbobj.add_line((0, _jquery2['default'])("#name_line").val(), (0, _jquery2['default'])("#len_line").val(), (0, _jquery2['default'])("#col_line").val());

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        obj.move((0, _jquery2['default'])("#" + DivName).scrollLeft(), (0, _jquery2['default'])("#" + DivName).scrollTop());
	        obj.mousedown(function () {
	            (0, _jquery2['default'])("#lst_object").val(obj.id);
	            return false;
	        });
	        closeNav();
	    }
	}

	//点
	function set_point() {
	    var obj = bbobj.add_point((0, _jquery2['default'])("#name_point").val(), (0, _jquery2['default'])("#size_point").val(), (0, _jquery2['default'])("#col_point").val(), (0, _jquery2['default'])("#align_point").val());

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        obj.move((0, _jquery2['default'])("#" + DivName).scrollLeft(), (0, _jquery2['default'])("#" + DivName).scrollTop());
	        obj.mousedown(function () {
	            (0, _jquery2['default'])("#lst_object").val(obj.id);
	            return false;
	        });
	        closeNav();
	    }
	}

	//フリーハンド
	function set_freehand() {
	    var obj = bbobj.add_freehand((0, _jquery2['default'])("#name_freehand").val(), (0, _jquery2['default'])("#col_freehand").val());
	    closeNav();

	    if (obj) {
	        add_object(obj.id, coalesce_name(obj));
	        (0, _jquery2['default'])("button").attr("disabled", true);
	        obj.start();
	        freehandOnWrite = obj;
	        var colChg = function colChg() {
	            obj.color((0, _jquery2['default'])(this).val());
	        };
	        (0, _jquery2['default'])("#col_freehand").bind('blur', colChg);
	        (0, _jquery2['default'])("#undo_freehand").attr("disabled", false).click(function () {
	            freehandOnWrite.undo();
	        });
	        (0, _jquery2['default'])("#redo_freehand").attr("disabled", false).click(function () {
	            freehandOnWrite.redo();
	        });
	        (0, _jquery2['default'])("#stop_freehand").attr("disabled", false).click(function () {
	            freehandOnWrite = undefined;
	            obj.end();
	            (0, _jquery2['default'])("#col_freehand").unbind('blur', colChg);
	            (0, _jquery2['default'])("button:not(.disable)").attr("disabled", false);
	            (0, _jquery2['default'])("#stop_freehand").attr("disabled", true).unbind("click");
	            (0, _jquery2['default'])("#undo_freehand").attr("disabled", true).unbind("click");
	            (0, _jquery2['default'])("#redo_freehand").attr("disabled", true).unbind("click");
	        });
	    }
	}

	//ズーム
	function zoom_cnv(scale) {
	    var newScale, chgScale;
	    // var canvas = document.getElementById(CanvasName);

	    newScale = scale;
	    (0, _jquery2['default'])("#lst_scale").val(newScale);

	    var liid = newScale.toString().replace(".", "_");
	    (0, _jquery2['default'])("ul#contextZoom").children("li").removeClass("checked");
	    (0, _jquery2['default'])("li#contextZoom_" + liid).addClass("checked");

	    chgScale = newScale / bbobj.zoomScale;
	    if (bbobj.zoomScale != newScale) {
	        //倍率が変化する場合は左上維持して拡大処理
	        bbobj.zoom(chgScale);
	        (0, _jquery2['default'])("#" + DivName).scrollLeft((0, _jquery2['default'])("#" + DivName).scrollLeft() * chgScale).scrollTop((0, _jquery2['default'])("#" + DivName).scrollTop() * chgScale);
	    }
	}

	//移動開始
	function start_move() {
	    (0, _jquery2['default'])("button").attr("disabled", true);
	    (0, _jquery2['default'])("li#contextSelectMode").removeClass("checked");
	    (0, _jquery2['default'])("li#contextMoveMode").addClass("checked");
	    (0, _jquery2['default'])("div#csr_select").removeClass("selected");
	    (0, _jquery2['default'])("div#csr_move").addClass("selected");
	    (0, _jquery2['default'])("canvas#" + CanvasName).css("cursor", "move");

	    if (freehandOnWrite !== undefined) {
	        freehandOnWrite.end();
	    }

	    bbobj.ourJc.pause(CanvasName);
	    var md, mm, mu, base_x, base_y;

	    mm = function (e) {
	        var dx = e.pageX - base_x,
	            dy = e.pageY - base_y;
	        (0, _jquery2['default'])("#" + DivName).scrollLeft((0, _jquery2['default'])("#" + DivName).scrollLeft() - dx);
	        (0, _jquery2['default'])("#" + DivName).scrollTop((0, _jquery2['default'])("#" + DivName).scrollTop() - dy);
	        base_x = e.pageX;
	        base_y = e.pageY;
	        return false;
	    };

	    mu = function (e) {
	        (0, _jquery2['default'])("#" + DivName).unbind('mousemove', mm);
	        (0, _jquery2['default'])("#" + DivName).unbind('mouseup', mu);
	        return false;
	    };
	    md = function (e) {
	        base_x = e.pageX;
	        base_y = e.pageY;
	        (0, _jquery2['default'])("#" + DivName).bind('mousemove', mm);
	        (0, _jquery2['default'])("#" + DivName).bind('mouseup', mu);
	        return false;
	    };

	    (0, _jquery2['default'])("#" + DivName).mousedown(md);
	}

	//移動終了
	function stop_move() {
	    (0, _jquery2['default'])("button:not(.disable)").attr("disabled", false);
	    (0, _jquery2['default'])("li#contextSelectMode").addClass("checked");
	    (0, _jquery2['default'])("li#contextMoveMode").removeClass("checked");
	    (0, _jquery2['default'])("div#csr_select").addClass("selected");
	    (0, _jquery2['default'])("div#csr_move").removeClass("selected");
	    (0, _jquery2['default'])("canvas#" + CanvasName).css("cursor", "auto");

	    bbobj.ourJc.start(CanvasName, true);
	    (0, _jquery2['default'])("#" + DivName).unbind('mousedown');

	    //力技なのが気になる
	    if (freehandOnWrite !== undefined) {
	        (0, _jquery2['default'])("button").attr("disabled", true);
	        freehandOnWrite.start();
	        (0, _jquery2['default'])("#stop_freehand").attr("disabled", false);
	    }
	}

	//lst_objectへの追加
	function add_object(id, name) {
	    if ((0, _jquery2['default'])("#lst_object").children("option").get().length) {
	        (0, _jquery2['default'])('<option value="' + id + '"></option>').text(name).insertBefore((0, _jquery2['default'])("#lst_object :first-child"));
	    } else {
	        (0, _jquery2['default'])("#lst_object").append((0, _jquery2['default'])('<option value="' + id + '"></option>').text(name));
	    }
	    (0, _jquery2['default'])("#lst_object").val(id);
	}

	//lst_objectを上に
	function up_object() {
	    (0, _jquery2['default'])("#lst_object option:not(:selected)").each(function () {
	        while ((0, _jquery2['default'])(this).next().is(":selected")) {
	            (0, _jquery2['default'])(this).insertAfter((0, _jquery2['default'])(this).next());
	            bbobj.object((0, _jquery2['default'])(this).val()).down();
	        }
	    });
	}

	//lst_objectを下に
	function down_object() {
	    (0, _jquery2['default'])((0, _jquery2['default'])("#lst_object option:not(:selected)").get().reverse()).each(function () {
	        while ((0, _jquery2['default'])(this).prev().is(":selected")) {
	            (0, _jquery2['default'])(this).insertBefore((0, _jquery2['default'])(this).prev());
	            bbobj.object((0, _jquery2['default'])(this).val()).up();
	        }
	    });
	}

	//メニュー隠す
	function hide_menu() {
	    (0, _jquery2['default'])("div.ribbonmenu").slideUp(function () {
	        (0, _jquery2['default'])("#menusw_off").hide();
	        (0, _jquery2['default'])("#menusw_on").show();
	    });
	}

	//メニュー出す
	function show_menu() {
	    (0, _jquery2['default'])("div.ribbonmenu").slideDown(function () {
	        (0, _jquery2['default'])("#menusw_on").hide();
	        (0, _jquery2['default'])("#menusw_off").show();
	    });
	}

	//lst_objectから要素削除
	function del_object() {
	    (0, _jquery2['default'])("#lst_object option:selected").each(function () {
	        bbobj.object((0, _jquery2['default'])(this).val()).del();
	        (0, _jquery2['default'])(this).remove();
	    });
	}

	//画像保存
	function saveImg() {
	    (0, _jquery2['default'])("#WorkArea").append((0, _jquery2['default'])("<img id=DownloadImg src='" + bbobj.save() + "'>"));
	    window.open("./image.html", "test");
	}

	//現在の状態をURL化
	function getURL() {
	    var objs = new Array();
	    (0, _jquery2['default'])((0, _jquery2['default'])("#lst_object option").get().reverse()).each(function () {
	        objs.push((0, _jquery2['default'])(this).val());
	    });

	    var queryobj = new _BBCQuery2['default'](bbobj, (0, _jquery2['default'])("select#map").val());
	    queryobj.fromObjects(objs);
	    var querystr = queryobj.toBase64(),
	        baseurl = location.protocol + '//' + location.host + location.pathname + '?' + querystr;

	    if (baseurl.match(/^https?:\/\//)) {
	        _jquery2['default'].ajax({
	            type: 'GET',
	            url: 'http://is.gd/create.php',
	            dataType: 'jsonp',
	            crossDomain: true,
	            cache: false,
	            jsonp: false,
	            data: {
	                url: baseurl,
	                format: "json",
	                callback: "shortenurl"
	            },
	            jsonpCallback: 'shortenurl',
	            success: function success(data, status) {
	                if (!data["errorcode"]) {
	                    window.prompt("表示用URL", data["shorturl"]);
	                } else {
	                    alert("URL短縮エラー(" & data["errorcode"] & ")");
	                }
	            },
	            error: function error() {
	                alert("URL短縮に失敗しました");
	            }
	        });
	    } else {
	        window.prompt("表示用URL", baseurl);
	    }

	    //delete queryobj;
	}

	//URLクエリストリングからの復元
	function setURL(querystr) {
	    var queryobj = new _BBCQuery2['default'](bbobj, 'dummy');

	    // if (queryobj.setQueryString(querystr)) {
	    if (queryobj.fromBase64(querystr)) {
	        _jquery2['default'].restoreMaps();
	        (0, _jquery2['default'])("select#stage").val((0, _jquery2['default'])("select#map").children("[value='" + queryobj.map + "']").attr("data-stage"));
	        (0, _jquery2['default'])("select#stage").change();

	        (0, _jquery2['default'])("select#map").val(queryobj.map);
	        (0, _jquery2['default'])("select#map").change();

	        chg_map(function () {
	            var objs;
	            objs = queryobj.applyObjects();
	            // objs=queryobj.setObjects.apply(queryobj);
	            for (var i = 0; i < objs.length; i++) {
	                add_object(objs[i].id, coalesce_name(objs[i]));
	                var obj = objs[i];
	                obj.mousedown(function () {
	                    (0, _jquery2['default'])("#lst_object").val(obj.id);
	                    return false;
	                });
	            }
	        });
	    }

	    //delete queryobj;
	}

	//オブジェクトの名前が空白だった場合の対策関数
	function coalesce_name(obj) {
	    var name;

	    if (obj._text.length != 0) {
	        //名前指定がある場合はそのまま利用
	        name = obj._text;
	    } else {
	        //名前指定がないので、種別に応じた仮の名前を利用
	        switch (obj.type) {
	            case 'scout':
	                name = "(偵察機)";
	                break;

	            case 'sensor':
	                name = "(センサー)";
	                break;

	            case 'radar':
	                name = "(レーダー)";
	                break;

	            case 'sonde':
	                name = "(索敵弾)";
	                break;

	            case 'ndsensor':
	                name = "(ND)";
	                break;

	            case 'vsensor':
	                name = "(Vセンサー)";
	                break;

	            case 'howitzer':
	                name = "(榴弾)";
	                break;

	            case 'bunker':
	                name = "(バンカー)";
	                break;

	            case 'sentry':
	                name = "(セントリー)";
	                break;

	            case 'aerosentry':
	                name = "(エアロセントリー)";
	                break;

	            case 'bomber':
	                name = "(爆撃機)";
	                break;

	            case 'bascout':
	                name = "(偵察要請)";
	                break;

	            case 'icon':
	                name = "(アイコン)";
	                break;

	            case 'waft':
	                name = "(ワフトローダー)";
	                break;

	            case 'circle':
	                name = "(円)";
	                break;

	            case 'line':
	                name = "(直線)";
	                break;

	            case 'point':
	                name = "(点)";
	                break;

	            case 'freehand':
	                name = "(フリーハンド)";
	                break;

	            default:
	                name = "(無名)";
	                break;
	        }
	    }

	    return name;
	}

	// //前景色を得る
	// function get_fgColor($bgcol) {
	//    if ($bgcol.search(/#[0-9a-fA-F]{6}/) == -1) return ("#000000") ;
	//
	//     var $r = parseInt($bgcol.substr(1, 2),16);
	//     var $g = parseInt($bgcol.substr(3, 2),16);
	//     var $b = parseInt($bgcol.substr(5, 2),16);
	//
	//     var $bright = (($r*299)+($g*587)+($b*114))/1000;
	//     if( $bright < 127.5 ) {
	//         return ("#FFFFFF");
	//     }
	//     return ("#000000");
	// }

	//ファイル名・ディレクトリ名チェック
	function sanitize_filename(path) {
	    var control_codes = /[\u0000-\u001F\u007F-\u009F]/g;
	    path.replace(control_codes, '�');
	    if (path.match(/^([.~]?\/)?([A-Za-z0-9_-][A-Za-z0-9_.-]+\/)*[A-Za-z0-9_-][A-Za-z0-9_.-]+$/)) {
	        return path;
	    } else {
	        return null;
	    }
	}

	//キャンバスエリアの幅を変更する
	function chgCanvasAreaSize() {
	    (0, _jquery2['default'])("div#" + DivName).width((0, _jquery2['default'])("canvas#" + CanvasName).outerWidth() + scrollBarWidth).height((0, _jquery2['default'])("canvas#" + CanvasName).outerHeight() + scrollBarHeight);
	    bbobj.chgScroll();
	}

	//ナビゲーションタブエリアを非表示にする
	function closeNav() {
	    if ((0, _jquery2['default'])("nav").is(":visible")) {
	        (0, _jquery2['default'])("nav>div").removeClass("selected");
	        (0, _jquery2['default'])("div.ribbonmenu").fadeOut();
	    }
	}

	//スクロール関連独自処理
	function bindScroll(ojQuery) {
	    ojQuery.each(function (i, elem) {
	        elem.addEventListener('wheel', function (e) {
	            //スクロールが上限に達している場合はデフォルト動作を阻害する
	            if (e.deltaX < 0 && elem.scrollLeft <= 0 || e.deltaX > 0 && elem.scrollLeft >= elem.scrollWidth - elem.clientWidth || e.deltaY < 0 && elem.scrollTop <= 0 || e.deltaY > 0 && elem.scrollTop >= elem.scrollHeight - elem.clientHeight) {
	                e.preventDefault();
	                return;
	            }

	            if (e.deltaMode == 0) {
	                elem.scrollLeft = elem.scrollLeft + e.deltaX;
	                elem.scrollTop = elem.scrollTop + e.deltaY;
	            } else if (e.deltaMode == 1) {
	                //elem.scrollLeft = elem.scrollLeft + e.deltaX * element.style.lineHeight;
	                //elem.scrollTop  = elem.scrollTop + e.deltaY * element.style.lineHeight;
	                elem.scrollLeft = elem.scrollLeft + e.deltaX * elem.style.lineHeight;
	                elem.scrollTop = elem.scrollTop + e.deltaY * elem.style.lineHeight;
	            } else if (e.deltaMode == 2) {
	                elem.scrollLeft = elem.scrollLeft + e.deltaX * document.documentElement.clientWidth;
	                elem.scrollTop = elem.scrollTop + e.deltaY * document.documentElement.clientHeight;
	            } else {
	                return;
	            }
	            e.preventDefault();
	            return;
	        }, false);

	        if (window.TouchEvent) {
	            var startX, startY, scrollStartX, scrollStartY, flag, touchid;

	            (function () {
	                var getTouch = function getTouch(ev) {
	                    var touch;

	                    switch (ev.type) {
	                        case "touchstart":
	                            touch = ev.touches[0];
	                            touchid = touch.identifier;
	                            break;

	                        case "touchmove":
	                            for (i = 0; i < ev.changedTouches.length; i++) {
	                                if (ev.changedTouches[i].identifier == touchid) {
	                                    touch = ev.changedTouches[i];
	                                    break;
	                                }
	                            }
	                            break;
	                    }

	                    if (touch === undefined) {
	                        return undefined;
	                    }
	                    return touch;
	                };

	                elem.addEventListener('touchstart', function (e) {
	                    var touch = getTouch(e);

	                    flag = true;
	                    startX = touch.clientX;
	                    startY = touch.clientY;
	                    scrollStartX = elem.scrollLeft;
	                    scrollStartY = elem.scrollTop;
	                    // scrollLimitX=elem.scrollWidth - elem.clientWidth;
	                    // scrollLimitY=elem.scrollHeight - elem.clientHeight;
	                    return;
	                }, false);

	                elem.addEventListener('touchmove', function (e) {
	                    //touchstartで拾ったイベントがないなら何もしない
	                    if (!flag) return;
	                    var touch = getTouch(e);
	                    if (touch === undefined) {
	                        flag = false;
	                        return;
	                    }

	                    e.preventDefault();
	                    elem.scrollLeft = scrollStartX + (touch.clientX - startX) * -1;
	                    elem.scrollTop = scrollStartY + (touch.clientY - startY) * -1;
	                }, false);

	                elem.addEventListener('touchend', function (e) {
	                    flag = false;
	                });
	            })();
	        }
	    });
	}

	// scrollLimitX, scrollLimitY,

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.1.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-04-28T16:01Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//

	var arr = [];

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		version = "2.1.4",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor(null);
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
		},

		isPlainObject: function( obj ) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call(obj) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf("use strict") === 1 ) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval
					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		// args is for internal usage only
		each: function( obj, callback, args ) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike( obj );

			if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				}

			// A special, fast, case for the most common use of each
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArraylike( Object(arr) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});

	function isArraylike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.nodeType === 1 && length ) {
			return true;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.0-pre
	 * http://sizzlejs.com/
	 *
	 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-12-16
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
		// http://www.w3.org/TR/css3-syntax/#characters
		characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Loosely modeled on CSS identifier characters
		// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
		// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = characterEncoding.replace( "w", "w#" ),

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + characterEncoding + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + characterEncoding + ")" ),
			"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
			"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var match, elem, m, nodeType,
			// QSA vars
			i, groups, old, nid, newContext, newSelector;

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}

		context = context || document;
		results = results || [];
		nodeType = context.nodeType;

		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		if ( !seed && documentIsHTML ) {

			// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
				// Speed-up: Sizzle("#ID")
				if ( (m = match[1]) ) {
					if ( nodeType === 9 ) {
						elem = context.getElementById( m );
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document (jQuery #6963)
						if ( elem && elem.parentNode ) {
							// Handle the case where IE, Opera, and Webkit return items
							// by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						// Context is not a document
						if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
							contains( context, elem ) && elem.id === m ) {
							results.push( elem );
							return results;
						}
					}

				// Speed-up: Sizzle("TAG")
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Speed-up: Sizzle(".CLASS")
				} else if ( (m = match[3]) && support.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// QSA path
			if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				nid = old = expando;
				newContext = context;
				newSelector = nodeType !== 1 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + toSelector( groups[i] );
					}
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = attrs.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// If no document and documentElement is available, return
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Set our document
		document = doc;
		docElem = doc.documentElement;
		parent = doc.defaultView;

		// Support: IE>8
		// If iframe document is assigned to "document" variable and if iframe has been reloaded,
		// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
		// IE6-8 do not support the defaultView property so parent will be undefined
		if ( parent && parent !== parent.top ) {
			// IE11 does not have attachEvent, so all must suffer
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Support tests
		---------------------------------------------------------------------- */
		documentIsHTML = !isXML( doc );

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( doc.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\f]' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = doc.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully does not implement inclusive descendent
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === doc ? -1 :
					b === doc ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return doc;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, outerCache, node, diff, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
								// Seek `elem` from a previously-cached index
								outerCache = parent[ expando ] || (parent[ expando ] = {});
								cache = outerCache[ type ] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										outerCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							// Use previously-cached element index if available
							} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
								diff = cache[1];

							// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
							} else {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
										// Cache the index of each encountered element
										if ( useCache ) {
											(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
							if ( (oldCache = outerCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								outerCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context !== document && context;
				}

				// Add elements passing elementMatchers directly to results
				// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context, xml ) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// Apply set filters to unmatched elements
				matchedCount += i;
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is no seed and only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			});

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			});

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
		});
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	};

	jQuery.fn.extend({
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter(function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow(this, selector || [], false) );
		},
		not: function( selector ) {
			return this.pushStack( winnow(this, selector || [], true) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	});


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && (match[1] || !context) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[2] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return typeof rootjQuery.ready !== "undefined" ?
					rootjQuery.ready( selector ) :
					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.extend({
		dir: function( elem, dir, until ) {
			var matched = [],
				truncate = until !== undefined;

			while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
				if ( elem.nodeType === 1 ) {
					if ( truncate && jQuery( elem ).is( until ) ) {
						break;
					}
					matched.push( elem );
				}
			}
			return matched;
		},

		sibling: function( n, elem ) {
			var matched = [];

			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					matched.push( n );
				}
			}

			return matched;
		}
	});

	jQuery.fn.extend({
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter(function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
					// Always skip document fragments
					if ( cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector(cur, selectors)) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.unique(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});

	function sibling( cur, dir ) {
		while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.unique( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	});
	var rnotwhite = (/\S+/g);



	// String to Object options format cache
	var optionsCache = {};

	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			( optionsCache[ options ] || createOptions( options ) ) :
			jQuery.extend( {}, options );

		var // Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to know if list is currently firing
			firing,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = !options.once && [],
			// Fire callbacks
			fire = function( data ) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( stack ) {
						if ( stack.length ) {
							fire( stack.shift() );
						}
					} else if ( memory ) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						// First, we save the current length
						var start = list.length;
						(function add( args ) {
							jQuery.each( args, function( _, arg ) {
								var type = jQuery.type( arg );
								if ( type === "function" ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && type !== "string" ) {
									// Inspect recursively
									add( arg );
								}
							});
						})( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
						// With memory, if we're not firing then
						// we should call right away
						} else if ( memory ) {
							firingStart = start;
							fire( memory );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );
								// Handle firing indexes
								if ( firing ) {
									if ( index <= firingLength ) {
										firingLength--;
									}
									if ( index <= firingIndex ) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( list && ( !fired || stack ) ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						if ( firing ) {
							stack.push( args );
						} else {
							fire( args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend({

		Deferred: function( func ) {
			var tuples = [
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[1] ](function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[1] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(function() {
						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[0] ] = function() {
					deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[0] + "With" ] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject )
							.progress( updateFunc( i, progressContexts, progressValues ) );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	});


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend({
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	});

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called after the browser event has already occurred.
			// We once tried to use readyState "interactive" here, but it caused issues like the one
			// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
			if ( document.readyState === "complete" ) {
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed, false );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed, false );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[0], key ) : emptyGet;
	};


	/**
	 * Determines whether an object can have data
	 */
	jQuery.acceptData = function( owner ) {
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};


	function Data() {
		// Support: Android<4,
		// Old WebKit does not have Object.preventExtensions/freeze method,
		// return new empty object instead with no [[set]] accessor
		Object.defineProperty( this.cache = {}, 0, {
			get: function() {
				return {};
			}
		});

		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;
	Data.accepts = jQuery.acceptData;

	Data.prototype = {
		key: function( owner ) {
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return the key for a frozen object.
			if ( !Data.accepts( owner ) ) {
				return 0;
			}

			var descriptor = {},
				// Check if the owner object already has a cache key
				unlock = owner[ this.expando ];

			// If not, create one
			if ( !unlock ) {
				unlock = Data.uid++;

				// Secure it in a non-enumerable, non-writable property
				try {
					descriptor[ this.expando ] = { value: unlock };
					Object.defineProperties( owner, descriptor );

				// Support: Android<4
				// Fallback to a less secure definition
				} catch ( e ) {
					descriptor[ this.expando ] = unlock;
					jQuery.extend( owner, descriptor );
				}
			}

			// Ensure the cache object
			if ( !this.cache[ unlock ] ) {
				this.cache[ unlock ] = {};
			}

			return unlock;
		},
		set: function( owner, data, value ) {
			var prop,
				// There may be an unlock assigned to this node,
				// if there is no entry for this "owner", create one inline
				// and set the unlock as though an owner entry had always existed
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {
				// Fresh assignments by object are shallow copied
				if ( jQuery.isEmptyObject( cache ) ) {
					jQuery.extend( this.cache[ unlock ], data );
				// Otherwise, copy the properties one-by-one to the cache object
				} else {
					for ( prop in data ) {
						cache[ prop ] = data[ prop ];
					}
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			// Either a valid cache is found, or will be created.
			// New caches will be created and the unlock returned,
			// allowing direct access to the newly created
			// empty data object. A valid owner object must be provided.
			var cache = this.cache[ this.key( owner ) ];

			return key === undefined ?
				cache : cache[ key ];
		},
		access: function( owner, key, value ) {
			var stored;
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					((key && typeof key === "string") && value === undefined) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase(key) );
			}

			// [*]When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			if ( key === undefined ) {
				this.cache[ unlock ] = {};

			} else {
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
		},
		hasData: function( owner ) {
			return !jQuery.isEmptyObject(
				this.cache[ owner[ this.expando ] ] || {}
			);
		},
		discard: function( owner ) {
			if ( owner[ this.expando ] ) {
				delete this.cache[ owner[ this.expando ] ];
			}
		}
	};
	var data_priv = new Data();

	var data_user = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch( e ) {}

				// Make sure we set the data so it isn't changed later
				data_user.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function( elem ) {
			return data_user.hasData( elem ) || data_priv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return data_user.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			data_user.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to data_priv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return data_priv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			data_priv.remove( elem, name );
		}
	});

	jQuery.fn.extend({
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = data_user.get( elem );

					if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice(5) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						data_priv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each(function() {
					data_user.set( this, key );
				});
			}

			return access( this, function( value ) {
				var data,
					camelKey = jQuery.camelCase( key );

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
					// Attempt to get data from the cache
					// with the key as-is
					data = data_user.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to get data from the cache
					// with the key camelized
					data = data_user.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function() {
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = data_user.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					data_user.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf("-") !== -1 && data !== undefined ) {
						data_user.set( this, key, value );
					}
				});
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each(function() {
				data_user.remove( this, key );
			});
		}
	});


	jQuery.extend({
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = data_priv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = data_priv.access( elem, type, jQuery.makeArray(data) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return data_priv.get( elem, key ) || data_priv.access( elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					data_priv.remove( elem, [ type + "queue", key ] );
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[0], type );
			}

			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[0] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				});
		},
		dequeue: function( type ) {
			return this.each(function() {
				jQuery.dequeue( this, type );
			});
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = data_priv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
		};

	var rcheckableType = (/^(?:checkbox|radio)$/i);



	(function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	})();
	var strundefined = typeof undefined;



	support.focusinBubbles = "onfocusin" in window;


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !(events = elemData.events) ) {
				events = elemData.events = {};
			}
			if ( !(eventHandle = elemData.handle) ) {
				eventHandle = elemData.handle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !(handlers = events[ type ]) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.hasData( elem ) && data_priv.get( elem );

			if ( !elemData || !(events = elemData.events) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				delete elemData.handle;
				data_priv.remove( elem, "events" );
			}
		},

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf(".") >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === (elem.ownerDocument || document) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
					jQuery.acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
								.apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( (event.result = ret) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.disabled !== true || event.type !== "click" ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) >= 0 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},

		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	};

	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && e.preventDefault ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && e.stopPropagation ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && e.stopImmediatePropagation ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// Support: Chrome 15+
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});

	// Support: Firefox, Chrome, Safari
	// Create "bubbling" focus and blur events
	if ( !support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
				};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						data_priv.remove( doc, fix );

					} else {
						data_priv.access( doc, fix, attaches );
					}
				}
			};
		});
	}

	jQuery.fn.extend({

		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var origFn, type;

			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}

			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}

			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},

		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			var elem = this[0];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	});


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

		// We have to close these tags to support XHTML (#13200)
		wrapMap = {

			// Support: IE9
			option: [ 1, "<select multiple='multiple'>", "</select>" ],

			thead: [ 1, "<table>", "</table>" ],
			col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

			_default: [ 0, "", "" ]
		};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	// Support: 1.x compatibility
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			data_priv.set(
				elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
			);
		}
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( data_priv.hasData( src ) ) {
			pdataOld = data_priv.access( src );
			pdataCur = data_priv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( data_user.hasData( src ) ) {
			udataOld = data_user.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			data_user.set( dest, udataCur );
		}
	}

	function getAll( context, tag ) {
		var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
				context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		buildFragment: function( elems, context, scripts, selection ) {
			var elem, tmp, tag, wrap, contains, j,
				fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;

			for ( ; i < l; i++ ) {
				elem = elems[ i ];

				if ( elem || elem === 0 ) {

					// Add nodes directly
					if ( jQuery.type( elem ) === "object" ) {
						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

					// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );

					// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild( context.createElement("div") );

						// Deserialize a standard representation
						tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;
						tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

						// Descend through wrappers to the right content
						j = wrap[ 0 ];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}

						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, tmp.childNodes );

						// Remember the top-level container
						tmp = fragment.firstChild;

						// Ensure the created nodes are orphaned (#12392)
						tmp.textContent = "";
					}
				}
			}

			// Remove wrapper from fragment
			fragment.textContent = "";

			i = 0;
			while ( (elem = nodes[ i++ ]) ) {

				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
					continue;
				}

				contains = jQuery.contains( elem.ownerDocument, elem );

				// Append to fragment
				tmp = getAll( fragment.appendChild( elem ), "script" );

				// Preserve script evaluation history
				if ( contains ) {
					setGlobalEval( tmp );
				}

				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( (elem = tmp[ j++ ]) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}

			return fragment;
		},

		cleanData: function( elems ) {
			var data, elem, type, key,
				special = jQuery.event.special,
				i = 0;

			for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
				if ( jQuery.acceptData( elem ) ) {
					key = elem[ data_priv.expando ];

					if ( key && (data = data_priv.cache[ key ]) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
						if ( data_priv.cache[ key ] ) {
							// Discard any remaining `private` data
							delete data_priv.cache[ key ];
						}
					}
				}
				// Discard any remaining `user` data
				delete data_user.cache[ elem[ data_user.expando ] ];
			}
		}
	});

	jQuery.fn.extend({
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each(function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length );
		},

		append: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			});
		},

		prepend: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			});
		},

		before: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			});
		},

		after: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			});
		},

		remove: function( selector, keepData /* Internal Use Only */ ) {
			var elem,
				elems = selector ? jQuery.filter( selector, this ) : this,
				i = 0;

			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}

			return this;
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; (elem = this[i]) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = value.replace( rxhtmlTag, "<$1></$2>" );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var arg = arguments[ 0 ];

			// Make the changes, replacing each context element with the new content
			this.domManip( arguments, function( elem ) {
				arg = this.parentNode;

				jQuery.cleanData( getAll( this ) );

				if ( arg ) {
					arg.replaceChild( elem, this );
				}
			});

			// Force removal if there was no new content (e.g., from empty arguments)
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},

		detach: function( selector ) {
			return this.remove( selector, true );
		},

		domManip: function( args, callback ) {

			// Flatten any nested arrays
			args = concat.apply( [], args );

			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[ 0 ],
				isFunction = jQuery.isFunction( value );

			// We can't cloneNode fragments that contain checked, in WebKit
			if ( isFunction ||
					( l > 1 && typeof value === "string" &&
						!support.checkClone && rchecked.test( value ) ) ) {
				return this.each(function( index ) {
					var self = set.eq( index );
					if ( isFunction ) {
						args[ 0 ] = value.call( this, index, self.html() );
					}
					self.domManip( args, callback );
				});
			}

			if ( l ) {
				fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
				first = fragment.firstChild;

				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}

				if ( first ) {
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;

					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;

						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );

							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {
								// Support: QtWebKit
								// jQuery.merge because push.apply(_, arraylike) throws
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}

						callback.call( this[ i ], node, i );
					}

					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;

						// Reenable scripts
						jQuery.map( scripts, restoreScript );

						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

								if ( node.src ) {
									// Optional AJAX dependency, but won't run scripts if not present
									if ( jQuery._evalUrl ) {
										jQuery._evalUrl( node.src );
									}
								} else {
									jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
								}
							}
						}
					}
				}
			}

			return this;
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	});


	var iframe,
		elemdisplay = {};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var style,
			elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			// getDefaultComputedStyle might be reliably used only on attached element
			display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

				// Use of this method is a temporary fix (more like optimization) until something better comes along,
				// since it was removed from specification and supported only in FF
				style.display : jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = (/^margin/);

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {
			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			if ( elem.ownerDocument.defaultView.opener ) {
				return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
			}

			return window.getComputedStyle( elem, null );
		};



	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
		}

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// Support: iOS < 6
			// A tribute to the "awesome hack by Dean Edwards"
			// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?
			// Support: IE
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply( this, arguments );
			}
		};
	}


	(function() {
		var pixelPositionVal, boxSizingReliableVal,
			docElem = document.documentElement,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
			"position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computePixelPositionAndBoxSizingReliable() {
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
				"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
				"border:1px;padding:1px;width:4px;position:absolute";
			div.innerHTML = "";
			docElem.appendChild( container );

			var divStyle = window.getComputedStyle( div, null );
			pixelPositionVal = divStyle.top !== "1%";
			boxSizingReliableVal = divStyle.width === "4px";

			docElem.removeChild( container );
		}

		// Support: node.js jsdom
		// Don't assume that getComputedStyle is a property of the global object
		if ( window.getComputedStyle ) {
			jQuery.extend( support, {
				pixelPosition: function() {

					// This test is executed only once but we still do memoizing
					// since we can use the boxSizingReliable pre-computing.
					// No need to check if the test was already performed, though.
					computePixelPositionAndBoxSizingReliable();
					return pixelPositionVal;
				},
				boxSizingReliable: function() {
					if ( boxSizingReliableVal == null ) {
						computePixelPositionAndBoxSizingReliable();
					}
					return boxSizingReliableVal;
				},
				reliableMarginRight: function() {

					// Support: Android 2.3
					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// This support function is only executed once so no memoizing is needed.
					var ret,
						marginDiv = div.appendChild( document.createElement( "div" ) );

					// Reset CSS: box-sizing; display; margin; border; padding
					marginDiv.style.cssText = div.style.cssText =
						// Support: Firefox<29, Android 2.3
						// Vendor-prefix box-sizing
						"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
						"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					docElem.appendChild( container );

					ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

					docElem.removeChild( container );
					div.removeChild( marginDiv );

					return ret;
				}
			});
		}
	})();


	// A method for quickly swapping in/out CSS properties to get correct calculations.
	jQuery.swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var
		// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
		rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in style ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in style ) {
				return name;
			}
		}

		return origName;
	}

	function setPositiveNumber( elem, value, subtract ) {
		var matches = rnumsplit.exec( value );
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
			// If we already have the right measurement, avoid augmentation
			4 :
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test(val) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = data_priv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && (ret = rrelNum.exec( value )) ) {
					value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number, add 'px' to the (except for certain CSS properties)
				if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
					value += "px";
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
					style[ name ] = value;
				}

			} else {
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each([ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
						jQuery.swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						}) :
						getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var styles = extra && getStyles( elem );
				return setPositiveNumber( elem, value, extra ?
					augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					) : 0
				);
			}
		};
	});

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return jQuery.swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each(function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			});
		}
	});


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				if ( tween.elem[ tween.prop ] != null &&
					(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		}
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
		rrun = /queueHooks$/,
		animationPrefilters = [ defaultPrefilter ],
		tweeners = {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value ),
					target = tween.cur(),
					parts = rfxnum.exec( value ),
					unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

					// Starting value computation is required for potential unit mismatches
					start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
						rfxnum.exec( jQuery.css( tween.elem, prop ) ),
					scale = 1,
					maxIterations = 20;

				if ( start && start[ 3 ] !== unit ) {
					// Trust units reported by jQuery.css
					unit = unit || start[ 3 ];

					// Make sure we update the tween properties later on
					parts = parts || [];

					// Iteratively approximate from a nonzero starting point
					start = +target || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*.
						// Use string for doubling so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur(),
					// break the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				// Update tween properties
				if ( parts ) {
					start = tween.start = +start || +target || 0;
					tween.unit = unit;
					// If a +=/-= token was provided, we're doing a relative animation
					tween.end = parts[ 1 ] ?
						start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
						+parts[ 2 ];
				}

				return tween;
			} ]
		};

	// Animations created synchronously will run synchronously
	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined;
		});
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( (tween = collection[ index ].call( animation, prop, value )) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = data_priv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function() {
				// Ensure the complete handler is called before this completes
				anim.always(function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = data_priv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done(function() {
					jQuery( elem ).hide();
				});
			}
			anim.done(function() {
				var prop;

				data_priv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			});
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always( function() {
				// Don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ]);

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, { specialEasing: {} }, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			}),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.split(" ");
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				tweeners[ prop ] = tweeners[ prop ] || [];
				tweeners[ prop ].unshift( callback );
			}
		},

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				animationPrefilters.unshift( callback );
			} else {
				animationPrefilters.push( callback );
			}
		}
	});

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || data_priv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = data_priv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			});
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each(function() {
				var index,
					data = data_priv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;

	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		clearInterval( timerId );
		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	};


	(function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();


	var nodeHook, boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		}
	});

	jQuery.extend({
		attr: function( elem, name, value ) {
			var hooks, ret,
				nType = elem.nodeType;

			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === strundefined ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
			}

			if ( value !== undefined ) {

				if ( value === null ) {
					jQuery.removeAttr( elem, name );

				} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;

				} else {
					elem.setAttribute( name, value + "" );
					return value;
				}

			} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				ret = jQuery.find.attr( elem, name );

				// Non-existent attributes return null, we normalize to undefined
				return ret == null ?
					undefined :
					ret;
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( (name = attrNames[i++]) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	});




	var rfocusable = /^(?:input|select|textarea|button)$/i;

	jQuery.fn.extend({
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each(function() {
				delete this[ jQuery.propFix[ name ] || name ];
			});
		}
	});

	jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},

		prop: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

			if ( notxml ) {
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
					ret :
					( elem[ name ] = value );

			} else {
				return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
					ret :
					elem[ name ];
			}
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {
					return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
						elem.tabIndex :
						-1;
				}
			}
		}
	});

	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}

	jQuery.each([
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	});




	var rclass = /[\t\r\n\f]/g;

	jQuery.fn.extend({
		addClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call( this, j, this.className ) );
				});
			}

			if ( proceed ) {
				// The disjunction here is for better compressibility (see removeClass)
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						" "
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = arguments.length === 0 || typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call( this, j, this.className ) );
				});
			}
			if ( proceed ) {
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						""
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = value ? jQuery.trim( cur ) : "";
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}

			return this.each(function() {
				if ( type === "string" ) {
					// Toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						classNames = value.match( rnotwhite ) || [];

					while ( (className = classNames[ i++ ]) ) {
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( type === strundefined || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						data_priv.set( this, "__className__", this.className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
				}
			});
		},

		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}

			return false;
		}
	});




	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[0];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?
						// Handle most common string cases
						ret.replace(rreturn, "") :
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each(function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function( elem ) {
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						jQuery.trim( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE6-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});




	// Return jQuery for attributes-only inclusion


	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	});

	jQuery.fn.extend({
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		},

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
		}
	});


	var nonce = jQuery.now();

	var rquery = (/\?/);



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Document location
		ajaxLocation = window.location.href,

		// Segment location into parts
		ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {
				// For each dataType in the dataTypeExpression
				while ( (dataType = dataTypes[i++]) ) {
					// Prepend if requested
					if ( dataType[0] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

					// Otherwise append
					} else {
						(structure[ dataType ] = structure[ dataType ] || []).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			});
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s[ "throws" ] ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,
				// URL without anti-cache param
				cacheURL,
				// Response headers
				responseHeadersString,
				responseHeaders,
				// timeout handle
				timeoutTimer,
				// Cross-domain detection vars
				parts,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// The jqXHR state
				state = 0,
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( (match = rheaders.exec( responseHeadersString )) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
				.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
						( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
							( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
				);
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
					s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	});

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};


	jQuery.fn.extend({
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapAll( html.call(this, i) );
				});
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map(function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapInner( html.call(this, i) );
				});
			}

			return this.each(function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			});
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each(function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
			});
		},

		unwrap: function() {
			return this.parent().each(function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			}).end();
		}
	});


	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};
	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );

				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
				}
			});

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map(function() {
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			})
			.filter(function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			})
			.map(function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						}) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}).get();
		}
	});


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest();
		} catch( e ) {}
	};

	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			// file protocol always yields status code 0, assume 200
			0: 200,
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	// Support: IE9
	// Open requests must be manually aborted on unload (#5280)
	// See https://support.microsoft.com/kb/2856746 for more info
	if ( window.attachEvent ) {
		window.attachEvent( "onunload", function() {
			for ( var key in xhrCallbacks ) {
				xhrCallbacks[ key ]();
			}
		});
	}

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function( options ) {
		var callback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								delete xhrCallbacks[ id ];
								callback = xhr.onload = xhr.onerror = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
									complete(
										// file: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
										// Support: IE9
										// Accessing binary-data responseText throws an exception
										// (#11426)
										typeof xhr.responseText === "string" ? {
											text: xhr.responseText
										} : undefined,
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					xhr.onerror = callback("error");

					// Create the abort callback
					callback = xhrCallbacks[ id ] = callback("abort");

					try {
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery("<script>").prop({
						async: true,
						charset: s.scriptCharset,
						src: s.url
					}).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function() {
				// Restore preexisting value
				window[ callbackName ] = overwritten;

				// Save back as free
				if ( s[ callbackName ] ) {
					// make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});




	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf(" ");

		if ( off >= 0 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax({
				url: url,

				// if "type" variable is undefined, then "GET" method will be used
				type: type,
				dataType: "html",
				data: params
			}).done(function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			}).complete( callback && function( jqXHR, status ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			});
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	});




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};




	var docElem = window.document.documentElement;

	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {
				options = options.call( elem, i, curOffset );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend({
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each(function( i ) {
						jQuery.offset.setOffset( this, options, i );
					});
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			// Support: BlackBerry 5, iOS 3 (original iPhone)
			// If we don't have gBCR, just use 0,0 rather than error
			if ( typeof elem.getBoundingClientRect !== strundefined ) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {
				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;

				while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || docElem;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : window.pageXOffset,
						top ? val : window.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length, null );
		};
	});

	// Support: Safari<7+, Chrome<37+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	});


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		});
	});


	// The number of elements contained in the matched element set
	jQuery.fn.size = function() {
		return this.length;
	};

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}




	var
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( typeof noGlobal === strundefined ) {
		window.jQuery = window.$ = jQuery;
	}




	return jQuery;

	}));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*
	 * Very simple jQuery Color Picker
	 * https://github.com/tkrotoff/jquery-simplecolorpicker
	 *
	 * Copyright (C) 2012-2013 Tanguy Krotoff <tkrotoff@gmail.com>
	 *
	 * Licensed under the MIT license
	 */

	(function($) {
	  'use strict';

	  /**
	   * Constructor.
	   */
	  var SimpleColorPicker = function(select, options) {
	    this.init('simplecolorpicker', select, options);
	  };

	  /**
	   * SimpleColorPicker class.
	   */
	  SimpleColorPicker.prototype = {
	    constructor: SimpleColorPicker,

	    init: function(type, select, options) {
	      var self = this;

	      self.type = type;

	      self.$select = $(select);
	      self.$select.hide();

	      self.options = $.extend({}, $.fn.simplecolorpicker.defaults, options);

	      self.$colorList = null;

	      if (self.options.picker === true) {
	        var selectText = self.$select.find('> option:selected').text();
	        self.$icon = $('<span class="simplecolorpicker icon"'
	                     + ' title="' + selectText + '"'
	                     + ' style="background-color: ' + self.$select.val() + ';"'
	                     + ' role="button" tabindex="0">'
	                     + '</span>').insertAfter(self.$select);
	        self.$icon.on('click.' + self.type, $.proxy(self.showPicker, self));

	        self.$picker = $('<span class="simplecolorpicker picker ' + self.options.theme + '"></span>').appendTo(document.body);
	        self.$colorList = self.$picker;

	        // Hide picker when clicking outside
	        $(document).on('mousedown.' + self.type, $.proxy(self.hidePicker, self));
	        self.$picker.on('mousedown.' + self.type, $.proxy(self.mousedown, self));
	      } else {
	        self.$inline = $('<span class="simplecolorpicker inline ' + self.options.theme + '"></span>').insertAfter(self.$select);
	        self.$colorList = self.$inline;
	      }

	      // Build the list of colors
	      // <span class="color selected" title="Green" style="background-color: #7bd148;" role="button"></span>
	      self.$select.find('> option').each(function() {
	        var $option = $(this);
	        var color = $option.val();

	        var isSelected = $option.is(':selected');
	        var isDisabled = $option.is(':disabled');

	        var selected = '';
	        if (isSelected === true) {
	          selected = ' data-selected';
	        }

	        var disabled = '';
	        if (isDisabled === true) {
	          disabled = ' data-disabled';
	        }

	        var title = '';
	        if (isDisabled === false) {
	          title = ' title="' + $option.text() + '"';
	        }

	        var role = '';
	        if (isDisabled === false) {
	          role = ' role="button" tabindex="0"';
	        }

	        var $colorSpan = $('<span class="color"'
	                         + title
	                         + ' style="background-color: ' + color + ';"'
	                         + ' data-color="' + color + '"'
	                         + selected
	                         + disabled
	                         + role + '>'
	                         + '</span>');

	        self.$colorList.append($colorSpan);
	        $colorSpan.on('click.' + self.type, $.proxy(self.colorSpanClicked, self));

	        var $next = $option.next();
	        if ($next.is('optgroup') === true) {
	          // Vertical break, like hr
	          self.$colorList.append('<span class="vr"></span>');
	        }
	      });
	    },

	    /**
	     * Changes the selected color.
	     *
	     * @param color the hexadecimal color to select, ex: '#fbd75b'
	     */
	    selectColor: function(color) {
	      var self = this;

	      var $colorSpan = self.$colorList.find('> span.color').filter(function() {
	        return $(this).data('color').toLowerCase() === color.toLowerCase();
	      });

	      if ($colorSpan.length > 0) {
	        self.selectColorSpan($colorSpan);
	      } else {
	        console.error("The given color '" + color + "' could not be found");
	      }
	    },

	    showPicker: function() {
	      var pos = this.$icon.offset();
	      this.$picker.css({
	        // Remove some pixels to align the picker icon with the icons inside the dropdown
	        left: pos.left - 6,
	        top: pos.top + this.$icon.outerHeight()
	      });

	      this.$picker.show(this.options.pickerDelay);
	    },

	    hidePicker: function() {
	      this.$picker.hide(this.options.pickerDelay);
	    },

	    /**
	     * Selects the given span inside $colorList.
	     *
	     * The given span becomes the selected one.
	     * It also changes the HTML select value, this will emit the 'change' event.
	     */
	    selectColorSpan: function($colorSpan) {
	      var color = $colorSpan.data('color');
	      var title = $colorSpan.prop('title');

	      // Mark this span as the selected one
	      $colorSpan.siblings().removeAttr('data-selected');
	      $colorSpan.attr('data-selected', '');

	      if (this.options.picker === true) {
	        this.$icon.css('background-color', color);
	        this.$icon.prop('title', title);
	        this.hidePicker();
	      }

	      // Change HTML select value
	      this.$select.val(color);
	    },

	    /**
	     * The user clicked on a color inside $colorList.
	     */
	    colorSpanClicked: function(e) {
	      // When a color is clicked, make it the new selected one (unless disabled)
	      if ($(e.target).is('[data-disabled]') === false) {
	        this.selectColorSpan($(e.target));
	        this.$select.trigger('change');
	      }
	    },

	    /**
	     * Prevents the mousedown event from "eating" the click event.
	     */
	    mousedown: function(e) {
	      e.stopPropagation();
	      e.preventDefault();
	    },

	    destroy: function() {
	      if (this.options.picker === true) {
	        this.$icon.off('.' + this.type);
	        this.$icon.remove();
	        $(document).off('.' + this.type);
	      }

	      this.$colorList.off('.' + this.type);
	      this.$colorList.remove();

	      this.$select.removeData(this.type);
	      this.$select.show();
	    }
	  };

	  /**
	   * Plugin definition.
	   * How to use: $('#id').simplecolorpicker()
	   */
	  $.fn.simplecolorpicker = function(option) {
	    var args = $.makeArray(arguments);
	    args.shift();

	    // For HTML element passed to the plugin
	    return this.each(function() {
	      var $this = $(this),
	        data = $this.data('simplecolorpicker'),
	        options = typeof option === 'object' && option;
	      if (data === undefined) {
	        $this.data('simplecolorpicker', (data = new SimpleColorPicker(this, options)));
	      }
	      if (typeof option === 'string') {
	        data[option].apply(data, args);
	      }
	    });
	  };

	  /**
	   * Default options.
	   */
	  $.fn.simplecolorpicker.defaults = {
	    // No theme by default
	    theme: '',

	    // Show the picker or make it inline
	    picker: false,

	    // Animation delay in milliseconds
	    pickerDelay: 0
	  };

	})(jQuery);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./jquery.simplecolorpicker.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./jquery.simplecolorpicker.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(17)();
	// imports


	// module
	exports.push([module.id, "/*\n * Very simple jQuery Color Picker\n * https://github.com/tkrotoff/jquery-simplecolorpicker\n *\n * Copyright (C) 2012-2013 Tanguy Krotoff <tkrotoff@gmail.com>\n *\n * Licensed under the MIT license\n */\n\n/**\n * Inspired by Bootstrap Twitter.\n * See https://github.com/twbs/bootstrap/blob/master/less/navbar.less\n * See https://github.com/twbs/bootstrap/blob/master/less/dropdowns.less\n */\n\n.simplecolorpicker.picker {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1051; /* Above Bootstrap modal (@zindex-modal = 1050) */\n  display: none;\n  float: left;\n\n  min-width: 160px;\n  max-width: 283px; /* @popover-max-width = 276px + 7 */\n\n  padding: 5px 0 0 5px;\n  margin: 2px 0 0;\n  list-style: none;\n  background-color: #fff; /* @dropdown-bg */\n\n  border: 1px solid #ccc; /* @dropdown-fallback-border */\n  border: 1px solid rgba(0, 0, 0, .15); /* @dropdown-border */\n\n  -webkit-border-radius: 4px; /* @border-radius-base */\n     -moz-border-radius: 4px;\n          border-radius: 4px;\n\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);\n     -moz-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);\n          box-shadow: 0 6px 12px rgba(0, 0, 0, .175);\n\n  -webkit-background-clip: padding-box;\n     -moz-background-clip: padding;\n          background-clip: padding-box;\n}\n\n.simplecolorpicker.inline {\n  display: inline-block;\n  padding: 6px 0;\n}\n\n.simplecolorpicker span {\n  margin: 0 5px 5px 0;\n}\n\n.simplecolorpicker.icon,\n.simplecolorpicker span.color {\n  display: inline-block;\n\n  cursor: pointer;\n  border: 1px solid transparent;\n}\n\n.simplecolorpicker.icon:after,\n.simplecolorpicker span.color:after {\n  content: '\\A0\\A0\\A0\\A0'; /* Spaces */\n}\n\n.simplecolorpicker span.color[data-disabled]:hover {\n  cursor: not-allowed;\n  border: 1px solid transparent;\n}\n\n.simplecolorpicker span.color:hover,\n.simplecolorpicker span.color[data-selected],\n.simplecolorpicker span.color[data-selected]:hover {\n  border: 1px solid #222; /* @gray-dark */\n}\n.simplecolorpicker span.color[data-selected]:after {\n  color: #fff;\n}\n\n/* Vertical separator, replaces optgroup. */\n.simplecolorpicker span.vr {\n  border-left: 1px solid #222; /* @gray-dark */\n}\n", ""]);

	// exports


/***/ },
/* 17 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);