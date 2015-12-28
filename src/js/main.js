import $ from 'jquery';
import BB from './BB';
import BBCQuery from './BBCQuery';
import BBDB from './BBDB';

// import 'jquery-ui/jquery-ui.min.js';
// /*global require*/ // eslint
// require('jquery-ui/themes/base/core.css');
// require('jquery-ui/themes/base/menu.css');
// require('jquery-ui/themes/base/theme.css');
// require('jquery-ui/themes/smoothness/jquery-ui.min.css');

import 'jquery-simplecolorpicker/jquery.simplecolorpicker.js';
require('jquery-simplecolorpicker/jquery.simplecolorpicker.css');

//初期化
var CanvasName = "BBCompass";
var DivName = "CanvasArea";
var scrollBarWidth = 0;
var scrollBarHeight = 0;
var freehandOnWrite = undefined;
var bbobj = "";
var wideview = true;

var debugMode = false;

//ターレット関連データ
var turretSpec = {
    "R": [200, 180],
    "G": [250, 180],
    "M": [250, 180],
    "L": [200, 180]
};
var turretCircle = 8;


function createOptionFragments(optionList) {
    var frag = document.createDocumentFragment();
    $.each(optionList, function(it, el) {
        var elOpt = document.createElement('option');
        elOpt["value"] = el["value"];
        if (el.hasOwnProperty("dataset") == true) {
            $.each(el["dataset"], function(key, val) {
                elOpt["dataset"][key] = val;
            });
        }
        if (el.hasOwnProperty("disabled") == true) {
            elOpt["disabled"] = el["disabled"];
        }
        if (el.hasOwnProperty("class") == true) {
            elOpt["class"] = el["class"];
        }
        if (el.hasOwnProperty("label") == true) {
            elOpt["label"] = el["label"];
        }
        elOpt.appendChild( document.createTextNode(el["text"]) );
        frag.appendChild(elOpt);
    });
    return frag;
}
// $select要素のoptionリストを動的生成する
// [ { "value": "map", "dataset": { "scale": "[160/100*0.7]" }, "text": "スカービ渓谷" }..., ]
function loadSelectionOption($select, optionList) {
    var frag = createOptionFragments(optionList);
    $select.empty().append(frag);
}


function loadStageList() {
    loadSelectionOption($("#current"), appData["current_map"]);
    loadSelectionOption($("#stage"), appData["stage"]);
}
function loadMapList(stage = null) {
    if (stage != null) {
        var stageMaps = getMapsFromStage(stage);
        loadSelectionOption($("#map"), stageMaps);
    } else {
        // いらない！！！
        var optionList = appData["map"];
        loadSelectionOption($("#map"), optionList);
    }
}
function getMapsFromStage(stage) {
    var maps = $.grep(appData["map"], function(el, it) {
        return (el.hasOwnProperty("dataset") && el.dataset.stage == stage);
    });
    return maps;
}
function getStageFromMap(map) {
    var stages = $.grep(appData["map"], function(el, it) {
        return (el.value == map);
    });
    return stages[0].dataset.stage;
}
function loadObjectLists() {
    var elMap = {
        "object_scout": "#lst_scout",
        "object_sensor": "#lst_sensor",
        "object_radar": "#lst_radar",
        "object_sonde": "#lst_sonde",
        "object_ndsensor": "#lst_ndsensor",
        "object_vsensor": "#lst_vsensor",
        "object_howitzer": "#lst_howitzer",
        "object_misc": "#lst_misc",
        "object_icon": "#lst_icon",
    };
    $.each(elMap, function(name, selector) {
        loadSelectionOption( $(selector), appData[name] );
    });
}

var appData = BBDB;
var appDataStatic = {
    "picker": [
        {"value": "#FF0000", "text": "red"},
        {"value": "#FF00FF", "text": "pink"},
        {"value": "#FFA500", "text": "orange"},
        {"value": "#FFFF00", "text": "yellow"},
        {"value": "#00FF00", "text": "green"},
        {"value": "#00FFFF", "text": "cyan"},
        {"value": "#0000FF", "text": "blue"},
        {"value": "#800080", "text": "purple"},
    ],
    "defaultLayer": [
        {"value": "", "text": "通常"},
    ],
};



//メニューのオブジェクト選択
var onObjectSelectorChanged = function($this, speed = "fast") {
    if ($this.hasClass("selected")) {
        return false;
    } else {
        $("#objselector .option.selected").removeClass("selected");
        $this.addClass("selected");
    }
    var openid = $this.data("target");

    //リストの先頭を選択済みにする
    $("#" + openid + " " + ".formlst option:first").attr('selected', true);
    $("#" + openid + " " + ".formlst").change();

    $("div.setobj:visible").fadeOut(speed, function() {
        $("#" + openid).fadeIn(speed);
    });
};


// 読み込み時の処理
$(document).ready(function() {

    // 現在の戦場選択メニューの設定
    $("#current").change(function(e) {
        var map = $(this).val();
        var stage = getStageFromMap(map);
        $("#stage").val(stage);
        $("#stage").change();
        $("#map").val(map);
    });

    // ステージ選択メニューの設定
    $("#stage").change(function(e) {
        var stage = $(this).val();
        // ステージ変更に連動してマップ一覧をフィルタしなおし
        loadMapList(stage);
        $("#map").change();
    });
    // マップ選択メニューの設定
    $("#map").change(function(e) {
        // var map = $(this).val();
        $("#map").removeClass("union event scramble");
        var mapClass = $("#map option:selected").attr("class");
        if (mapClass !== undefined) {
            $("#map").addClass(mapClass);
        }
    });
    $("#change_map").bind('click', function(e) {
        chg_map();
    });

    // オブジェクト選択メニューの設定
    $("#objselector .option").click(function() {
        onObjectSelectorChanged($(this));
    });

    // オブジェクトごとのリスト選択時の設定
    $("#lst_scout").change(function() {
        $("#name_scout").val($(this).find("option:selected").text());
    });
    $("#lst_sensor").change(function() {
        $("#name_sensor").val($(this).find("option:selected").text());
    });
    $("#lst_radar").change(function() {
        $("#name_radar").val($(this).find("option:selected").text());
    });
    $("#lst_sonde").change(function() {
        $("#name_sonde").val($(this).find("option:selected").text());
    });
    $("#lst_ndsensor").change(function() {
        $("#name_ndsensor").val($(this).find("option:selected").text());
    });
    $("#lst_vsensor").change(function() {
        $("#name_vsensor").val($(this).find("option:selected").text());
    });
    $("#lst_howitzer").change(function() {
        $("#name_howitzer").val($(this).find("option:selected").text());
    });
    $("#lst_misc").change(function() {
        $("#name_misc").val($(this).find("option:selected").text());
    });
    $("#lst_icon").change(function() {
        $("#name_icon").val($(this).find("option:selected").text());
    });

    // selectmenuだとタップしてメニュー展開という動作になってしまう。
    // 開きっぱなしにしてほしいのでmenuのほうが適切っぽいけどmenuだとul, li。。
    // $('#lst_scout').selectmenu({
    //     change: function(ev, ui) {
    //         $('#lst_scout option').attr('selected', false);
    //         $('#lst_scout option:eq('+ ui.item.index +')').attr('selected', true);
    //         $("#name_scout").val( ui.item.element.text() );
    //     }
    // });
    // $('#lst_scout').selectmenu("open");

    // カラーピッカーの設定
    loadSelectionOption($('.colorpick'), appDataStatic["picker"]);
    $('select.colorpick').simplecolorpicker({
        picker: true
    });

    //狭い時用メニューに関する初期化
    $("div.menutab#menutab_map").click(function(ev) {
        if ($("div.menucell#menu_map,div.menucell#menu_cont").is(":visible")) {
            $("div.ribbonmenu").fadeOut("fast");
            $("div.menutab").removeClass("selected");
        } else {
            $("div.menutab").removeClass("selected");
            $("div.ribbonmenu").fadeOut("fast", function() {
                $("div.ribbonmenu>*").hide();
                $("div.menucell#menu_map,div.menucell#menu_cont").show();
                $("div.ribbonmenu").fadeIn("fast");
                $("div.menutab#menutab_map").addClass("selected");
            });
        }
    });
    $("div.menutab#menutab_item").click(function(ev) {
        if ($("div.menusubcell#subcell_graph").is(":visible")) {
            $("div.ribbonmenu").fadeOut("fast");
            $("div.menutab").removeClass("selected");
        } else {
            $("div.menutab").removeClass("selected");
            $("div.ribbonmenu").fadeOut("fast", function() {
                $("div.ribbonmenu>*").hide();
                $("div.menusubcell#subcell_graph").show();
                $("div.ribbonmenu").fadeIn("fast");
                $("div.menutab#menutab_item").addClass("selected");
            });
        }
    });

    //メニュー部のタッチによるスクロール防止と、独自スクロール処理のbind
    $("header,div.ribbonmenu").bind('touchmove', function(ev) {
        if (wideview) return true;
        ev.preventDefault();
    });
    bindScroll($("div#objselector"));

    //コンテキストメニュー
    $("div.ContextMenu").bind('contextmenu', function(ev) {
        ev.preventDefault()
    });
    $("div.ContextMenu li.hasChild").bind('click', function(ev) {
        if (ev.target == ev.currentTarget) {
            ev.stopPropagation()
        }
    });
    $("div#CanvasArea").bind('contextmenu', function(ev) {
        if (!wideview) return true;
        ev.preventDefault();
        var offset = {
            "top": ev.pageY,
            "left": ev.pageX
        };

        //はみ出しそうなら収める
        if (ev.clientY + $("div.ContextMenu").height() > $(window).height() - 3) {
            offset.top = $(window).height() - $("div.ContextMenu").height() + $(window).scrollTop() - 3;
        }

        if (ev.clientX + $("div.ContextMenu").width() > $(window).width() - 3) {
            offset.left = $(window).width() - $("div.ContextMenu").width() + $(window).scrollLeft() - 3;
        }

        $("div.ContextMenu").show().offset(offset);

        //どこかクリックしたらメニューを消す
        $(document).one('click', function() {
            $("div.ContextMenu,div.ContextMenu div.ContextChild").hide();
        });

    });

    //子メニュー表示部
    $("div.ContextMenu li.hasChild").hover(
        function(ev) {
            var offset = {
                top: $(this).offset().top,
                left: $(this).offset().left + $(this).width() * 0.99
            };

            if ($(this).offset().top - $(window).scrollTop() + $(this).children(".ContextChild").height() > $(window).height()) {

                offset.top = $(window).scrollTop() + $(window).height() - $(this).children(".ContextChild").height() - 3;
            }

            if ($(this).offset().left - $(window).scrollLeft() + $(this).width() * 0.99 + $(this).children(".ContextChild").width() > $(window).width()) {
                offset.left = $(this).offset().left - $(this).children(".ContextChild").width() * 0.99;
            }

            $(this).children(".ContextChild").show()
                .offset(offset);
        },
        function(ev) {
            $(this).children(".ContextChild").hide();
        }
    );

    //ズーム
    $("#lst_scale").change(function() {
        zoom_cnv($(this).val());
    });

    //changelog
    $.ajax({
        url: "./Changelog.txt",
        dataType: 'text',
        cache: false,
        success: function(txt, status) {
            $("#changelog").val(txt);
        },
        error: function() {
            $("#changelog").val("更新履歴の取得に失敗しました");
        }
    });

    // メニュー開閉
    $("#menusw_off").bind('click', function(e) {
        hide_menu();
    });
    $("#menusw_on").bind('click', function(e) {
        show_menu();
    });

    // 各種オブジェクト設置
    $("#submit_scout").bind('click', function(e) {
        set_scout();
    });
    $("#submit_sensor").bind('click', function(e) {
        set_sensor();
    });
    $("#submit_radar").bind('click', function(e) {
        set_radar();
    });
    $("#submit_sonde").bind('click', function(e) {
        set_sonde();
    });
    $("#submit_ndsensor").bind('click', function(e) {
        set_ndsensor();
    });
    $("#submit_vsensor").bind('click', function(e) {
        set_vsensor();
    });
    $("#submit_howitzer").bind('click', function(e) {
        set_howitzer();
    });
    $("#submit_waft").bind('click', function(e) {
        set_waft('image/waft.png');
    });
    $("#submit_misc").bind('click', function(e) {
        set_misc();
    });
    $("#submit_circle").bind('click', function(e) {
        set_circle();
    });
    $("#submit_line").bind('click', function(e) {
        set_line();
    });
    $("#submit_point").bind('click', function(e) {
        set_point();
    });
    $("#submit_icon").bind('click', function(e) {
        set_icon();
    });
    $("#submit_freehand").bind('click', function(e) {
        set_freehand();
    }); // TODO: あとで

    $("#csr_select").bind('click', function(e) {
        stop_move();
    });
    $("#csr_move").bind('click', function(e) {
        start_move();
    });

    $("#up_object").bind('click', function(e) {
        up_object();
    });
    $("#down_object").bind('click', function(e) {
        down_object();
    });
    $("#del_object").bind('click', function(e) {
        del_object();
    });
    $("#save_img").bind('click', function(e) {
        saveImg();
    });
    $("#get_url").bind('click', function(e) {
        getURL();
    });
    $("#contextSelectMode").bind('click', function(e) {
        stop_move();
    });
    $("#contextMoveMode").bind('click', function(e) {
        start_move();
    });
    $("#contextZoom_1").bind('click', function(e) {
        zoom_cnv(1);
    });
    $("#contextZoom_1_5").bind('click', function(e) {
        zoom_cnv(1.5);
    });
    $("#contextZoom_2").bind('click', function(e) {
        zoom_cnv(2);
    });
    $("#contextZoom_4").bind('click', function(e) {
        zoom_cnv(4);
    });
    $("#save_img2").bind('click', function(e) {
        saveImg();
    });
    $("#get_url2").bind('click', function(e) {
        getURL();
    });

    //ウィンドウサイズの変更に対する対処
    wideview = $(".menutitle").is(":visible");
    $(window).resize(function() {
        //キャンバスエリアの幅を調整、jCanvaScriptの処理に反映させる
        chgCanvasAreaSize();

        //メニューの表示・非表示対処
        if ($(".menutitle").is(":visible")) {
            wideview = true;

            //各ブロックをcssのデフォルトに戻す
            $("body,header,div.ribbonmenu,div.ribbonmenu>div").removeAttr('style');

            //メニュー全体はスイッチを基に表示：非表示を決める
            if ($("span#menusw_on").is(":visible")) {
                $("div.ribbonmenu").hide();
            } else {
                $("div.ribbonmenu").show();
            }
        } else {
            wideview = false;

            if ($("div.menutab#menutab_map").hasClass("selected")) {
                $("div.menusubcell#subcell_graph").hide();
                $("div.menucell#menu_map,div.menucell#menu_cont").show();
                $("div.ribbonmenu").show();
            } else if ($("div.menutab#menutab_item").hasClass("selected")) {
                $("div.menucell#menu_map,div.menucell#menu_cont").hide();
                $("div.menusubcell#subcell_graph").show();
                $("div.ribbonmenu").show();
            } else {
                $("div.ribbonmenu").hide();
            }
        }
    });

    // canvas要素の存在チェックとCanvas未対応ブラウザの対処
    var canvas = document.getElementById(CanvasName);
    if (!canvas || !canvas.getContext) {
        alert("ブラウザがCanvas非対応なので、このブラウザでは動作しません");
        return false;
    }

    // canvas要素の初期化
    bbobj = new BB(CanvasName);
    var cnvArea = document.getElementById(DivName);
    scrollBarWidth = cnvArea.offsetWidth - cnvArea.clientWidth;
    scrollBarHeight = cnvArea.offsetHeight - cnvArea.clientHeight + 6;
    $("#" + DivName)
        .width($("#" + CanvasName).outerWidth() + scrollBarWidth)
        .height($("#" + CanvasName).outerHeight() + scrollBarHeight);

    $("#lst_layer").change(function() {
        closeNav();
        bbobj.setbgdiff($("#lst_layer").val())
    });
    $("#" + DivName).scroll(function() {
        bbobj.chgScroll();
    });

    //スマホ用メニュー制御
    var ua = navigator.userAgent;
    if (window.TouchEvent &&
        (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0)) {

        //各種制御用変数
        var pcmode = false,
            intervalID = null,
            timeoutID = null,
            correctFlag = false,
            headerHeight = $("header").outerHeight(),
            headelem = document.getElementsByTagName("header")[0],
            vp_width; //後でinitMenuScaleが初期化するため、ここでは触らない
        // cookies  = document.cookie;

        //向きが変わっていたら幅を取り直す
        var media = window.matchMedia("(orientation: portrait)");
        media.addListener(function(m) {
            window.setTimeout(initMenuScale, 50);
        });

        //古いandroidの標準ブラウザの挙動が特殊なので、
        //androidはY軸のスクロールに関する挙動からメニュー位置補正の方針を決める
        if (ua.indexOf('Android') > 0) {
            window.addEventListener('scroll', (function() {
                    return function f() {
                        correctFlag = (-headelem.getBoundingClientRect().top != window.pageYOffset);
                        window.removeEventListener('scroll', f, true);
                    }
                })(),
                true);
            window.scrollTo(0, 1);
        } else {
            //iOSなどは常に補正ありで問題なさそう
            correctFlag = true;
            //inputやselectからフォーカスアウトした際に位置合わせしなおす
            $("select, input, textarea").bind('blur', function() {
                if (!wideview) {
                    window.setTimeout(chgMenuScale, 200);
                    window.setTimeout(chgMenuScale, 700);
                }
            });
        }

        //スクロール時のメニュー追従処理に使う関数を定義
        function chgMenuScale() {
            //幅広表示の時は座標の再計算だけして抜ける(無効化漏れのフォロー)
            if (wideview) {
                bbobj.chgScroll();
                return false;
            }

            //headerとメニュー幅を固定・拡縮
            var scale = window.innerWidth / vp_width;
            $("header, div.ribbonmenu").css("transform", "scale(" + scale + ")")
                .css("-ms-transform", "scale(" + scale + ")")
                .css("-webkit-transform", "scale(" + scale + ")");

            var headrect = headelem.getBoundingClientRect(),
                docrect = document.documentElement.getBoundingClientRect();

            if (correctFlag) {
                var menuTop = Math.round(window.pageYOffset + docrect.top + headelem.offsetTop - headrect.top);
                $("header").css("top", menuTop);
                $("div.ribbonmenu").css("top", menuTop + headerHeight);

                var menuLeft = Math.round(window.pageXOffset + docrect.left + headelem.offsetLeft - headrect.left);
                $("header, div.ribbonmenu").css("left", menuLeft);
            }
            bbobj.chgScroll();
            return true;
        }

        //スクロール終了待ち処理 タイマーをリセットするのみ
        function doWhileScroll() {
            if (timeoutID) window.clearTimeout(timeoutID);
            timeoutID = window.setTimeout(doWhenScrollEnded, 60);
        }

        //スクロール停止後 改めて移動処理を行ってからbodyのマージンを変更
        function doWhenScrollEnded() {
            window.clearInterval(intervalID);
            intervalID = null;
            timeoutID = null;
            window.removeEventListener('scroll', doWhileScroll);
            if (chgMenuScale()) {
                $("body").css("margin-top", (headerHeight + 5) * window.innerWidth / vp_width);

                //処理遅れの救済処置
                setTimeout(chgMenuScale, 100);
                setTimeout(chgMenuScale, 300);
                setTimeout(chgMenuScale, 500);
            }
        }

        //PC版・スマホ版の切替機能を仕込む
        //firefoxのバグ対策のため、metaの属性書き換えではなく、タグごと消して作り直す
        var sw = $("span#viewsw");
        sw.show();
        sw.bind('click', function(ev) {
            if (timeoutID) {
                window.clearTimeout(timeoutID);
                timeoutID = null;
            }
            if (intervalID) {
                window.clearInterval(intervalID);
                intervalID = null;
            }
            window.removeEventListener('scroll', doWhileScroll);
            $("body, header, div.ribbonmenu, div.ribbonmenu>div").removeAttr('style');
            if (pcmode) {
                pcmode = false;
                sw.text('PC版');
                document.cookie = 'pcmode=false;max-age=0';
                $('meta[name=viewport]').remove();
                $('head').append('<meta name="viewport" content="width=device-width,initial-scale=1.0">');

                //処理が遅れる場合があるようなので、少し遅延させる
                setTimeout(initMenuScale, 100);
            } else {
                pcmode = true;
                sw.text('スマホ版');
                document.cookie = 'pcmode=true;max-age=2592000';
                $('meta[name=viewport]').remove();
                $('head').append('<meta name="viewport" content="width=980">');
                //古いWebKit対策。少し遅らせてstyleに空白を設定しなおす
                setTimeout(function() {
                    $("body, header, div.ribbonmenu, div.ribbonmenu>div").attr('style', '')
                }, 50);
            }
            $(window).resize();
        });

        // cookieに指定があればPCモードに切り替えておく
        if (document.cookie.replace(new RegExp("(?:^|.*;\\s*)pcmode\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1") == "true") {
            sw.click();
        }

        // スクロール関連のイベント定義
        window.addEventListener('touchstart',
            function(e) {
                //幅広表示の時は何もしない
                if (wideview) return;

                window.removeEventListener('scroll', doWhileScroll);
                if (!intervalID) {
                    intervalID = window.setInterval(function() {
                        chgMenuScale();
                    }, 1000 / 30);
                }
            });

        window.addEventListener('touchend',
            function(e) {
                //幅広表示の時は何もしない
                if (wideview) return;

                if (e.touches.length < 1) {
                    //スクロール終了待ちに移行
                    timeoutID = window.setTimeout(doWhenScrollEnded, 60);
                    window.addEventListener('scroll', doWhileScroll);
                }
            });

        function initMenuScale() {
            vp_width = window.outerWidth || document.documentElement.getBoundingClientRect().width;
            if (chgMenuScale()) {
                $("body").css("margin-top", headerHeight * window.innerWidth / vp_width + 5);
                $("header, div.ribbonmenu").css("width", vp_width);
            }
        }

        //リロード時のウィンドウサイズ変更に対応
        window.setTimeout(initMenuScale, 100);
    }

    loadInitData();
});
//各種初期化処理
function loadInitData() {
    loadStageList();
    loadMapList();
    loadObjectLists();

    //メニューの初期状態を設定
    onObjectSelectorChanged($("#objselector .option:first"), 0); // オブジェクトをひとつ選んでおく

    if (window.location.search) {
        //query stringがあれば再現処理に入る
        setURL(window.location.search.substr(1));
    } else {
        // なければもっともらしいマップを選ぶ
        chg_map($("#current").val());
    }
}

//マップ変更
function chg_map(map, callback) {
    if (map== null) {
        map= $("#map").val();
    }
    var stage= getStageFromMap(map);
    $("#stage").val(stage);
    $("#stage").change();
    $("#map").val(map);
    $("#map").change();
    
    var $map = $("#map option:selected");
    map = sanitize_filename(map);
    stage = sanitize_filename(stage);
    var layer = eval($map.data("layer"));
    var scale = eval($("#stage [value='" + stage + "']").data("scale"));

    if ((map == null) || (stage == null)) {
        alert("マップファイル名エラー");
        return;
    }

    $("#Loading").show();
    $("#lst_object").children().remove();

    bbobj.setbg("./map/" + stage + "/" + map + ".jpg", scale[0], scale[1], function() {
        $("#lst_scale").val(1);
        $("ul#contextZoom").children("li").removeClass("checked");
        $("li#contextZoom_1").addClass("checked");
        $("div#Loading").hide();
        $.ajax({
            "url": "data/" + map + ".txt",
            dataType: "jsonp",
            crossDomain: true,
            cache: false,
            jsonp: false,
            jsonpCallback: "stageData",
            success: function(data, status) {
                chgCanvasAreaSize();

                if ("turret" in data) {
                    var turretData = data["turret"];
                    for (i = 0; i < turretData.length; i++) {
                        //x位置、y位置、回転角度、扇形の角度、射程、中心円サイズ、色、テストフラグ
                        bbobj.put_turret(turretData[i][0], turretData[i][1], turretData[i][2],
                            turretSpec[turretData[i][3]][0],
                            turretSpec[turretData[i][3]][1],
                            turretCircle,
                            // undefined, turretData[i][4]);
                            undefined, debugMode);
                    }
                }
                if ("searcher" in data) {
                    var searcherData = data["searcher"];
                    for (i = 0; i < searcherData.length; i++) {
                        //x位置、y位置、範囲、中心円サイズ、色、テストフラグ
                        bbobj.put_searcher(searcherData[i][0], searcherData[i][1],
                            searcherData[i][2],
                            turretCircle,
                            // undefined, searcherData[i][3]);
                            undefined, debugMode);
                    }
                }
                if (callback !== undefined) {
                    callback.call();
                }
            },
            error: function() {}
        });
    });

    var layerList = [];
    layerList = appDataStatic["defaultLayer"].concat();
    for (var i = 0; i < layer.length; i++) {
        layerList.push({
            "value": './map/' + stage + '/' + map + '_' + (i + 1) + '.jpg',
            "text": layer[i],
        });
    }
    loadSelectionOption($("#lst_layer"), layerList);
    $("#lst_layer").val("");

    closeNav();
}

//偵察機
function set_scout() {
    if (!$("#lst_scout").val()) {
        return;
    }
    if (!$("#col_scout").val()) {
        return;
    }

    var param = eval($("#lst_scout").val());
    var obj = bbobj.add_scout($("#name_scout").val(), param[0], param[1], param[2], $("#col_scout").val());

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        obj.move($("#" + DivName).scrollLeft(), $("#" + DivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeNav();
    }
}

//センサー
function set_sensor() {
    if (!$("#lst_sensor").val()) {
        return;
    }
    if (!$("#col_sensor").val()) {
        return;
    }

    var obj = bbobj.add_sensor($("#name_sensor").val(), $("#lst_sensor").val(), $("#col_sensor").val());

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        obj.move($("#" + DivName).scrollLeft(), $("#" + DivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeNav();
    }
}

//レーダー
function set_radar() {
    if (!$("#lst_radar").val()) {
        return;
    }
    if (!$("#col_radar").val()) {
        return;
    }

    var param = eval($("#lst_radar").val());
    var obj = bbobj.add_radar($("#name_radar").val(), param[0], param[1], $("#col_radar").val());

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        obj.move($("#" + DivName).scrollLeft(), $("#" + DivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeNav();
    }
}

//滞空索敵弾
function set_sonde() {
    if (!$("#lst_sonde").val()) {
        return;
    }
    if (!$("#col_sonde").val()) {
        return;
    }

    var param = eval($("#lst_sonde").val());
    var obj = bbobj.add_sonde($("#name_sonde").val(), param[0], param[1], $("#col_sonde").val());

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        obj.move($("#" + DivName).scrollLeft(), $("#" + DivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeNav();
    }
}

//ND索敵センサー
function set_ndsensor() {
    if (!$("#lst_ndsensor").val()) {
        return;
    }
    if (!$("#col_ndsensor").val()) {
        return;
    }

    var obj = bbobj.add_ndsensor($("#name_ndsensor").val(), $("#lst_ndsensor").val(), $("#col_ndsensor").val());

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        obj.move($("#" + DivName).scrollLeft(), $("#" + DivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeNav();
    }
}

//Vセンサー
function set_vsensor() {
    if (!$("#lst_vsensor").val()) {
        return;
    }
    if (!$("#col_vsensor").val()) {
        return;
    }

    var param = eval($("#lst_vsensor").val());

    var obj = bbobj.add_vsensor($("#name_vsensor").val(),
        param[0], param[1],
        $("#col_vsensor").val(), 'A');

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        obj.move($("#" + DivName).scrollLeft(), $("#" + DivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeNav();
    }
}

//砲撃
function set_howitzer() {
    if (!$("#lst_howitzer").val()) {
        return;
    }
    if (!$("#col_howitzer").val()) {
        return;
    }

    var param = eval($("#lst_howitzer").val());
    var obj = bbobj.add_howitzer($("#name_howitzer").val(), param[0], param[1], param[2], $("#col_howitzer").val());

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        obj.move($("#" + DivName).scrollLeft(), $("#" + DivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeNav();
    }
}


//その他攻撃関連
function set_misc() {
    if (!$("#lst_misc").val()) {
        return;
    }
    if (!$("#col_misc").val()) {
        return;
    }

    var obj;
    switch ($("#lst_misc").val()) {
        case "bunker": //サテライトバンカー
            obj = bbobj.add_bunker($("#name_misc").val(), $("#col_misc").val());
            break;

        case "sentry": //先生
            obj = bbobj.add_sentry($("#name_misc").val(), $("#col_misc").val());
            break;

        case "aerosent": //先生
            obj = bbobj.add_aerosentry($("#name_misc").val(), $("#col_misc").val());
            break;

        case "bomber": //爆撃通信機
            obj = bbobj.add_bomber($("#name_misc").val(), $("#col_misc").val());
            break;

        case "bascout": //偵察要請装置
            obj = bbobj.add_bascout($("#name_misc").val(), $("#col_misc").val());
            break;

    }

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        obj.move($("#" + DivName).scrollLeft(), $("#" + DivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeNav();
    }
}


//アイコン
function set_icon() {
    if (!$("#lst_icon").val()) {
        return;
    }
    if (!$("#col_icon").val()) {
        return;
    }

    var file = sanitize_filename($("#lst_icon").val());
    if (file == null) {
        alert("アイコンファイル名エラー");
        return;
    }

    var obj = bbobj.add_icon($("#name_icon").val(), file, $("#col_icon").val());

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        obj.move($("#" + DivName).scrollLeft(), $("#" + DivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
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
    if (!$("#col_waft").val()) {
        return;
    }

    file = sanitize_filename(file);
    if (file == null) {
        alert("ワフト画像ファイル名エラー");
        return;
    }

    var obj = bbobj.add_waft($("#name_waft").val(), file, $("#col_waft").val());

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        obj.move($("#" + DivName).scrollLeft(), $("#" + DivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeNav();
    }
}


//円
function set_circle() {
    if (!$("#rad_circle").val()) {
        return;
    }
    if (!$("#col_circle").val()) {
        return;
    }

    var obj = bbobj.add_circle($("#name_circle").val(), $("#rad_circle").val(), $("#col_circle").val());

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        obj.move($("#" + DivName).scrollLeft(), $("#" + DivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeNav();
    }
}

//直線
function set_line() {
    if (!$("#len_line").val()) {
        return;
    }
    if (!$("#col_line").val()) {
        return;
    }

    var obj = bbobj.add_line($("#name_line").val(), $("#len_line").val(), $("#col_line").val());

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        obj.move($("#" + DivName).scrollLeft(), $("#" + DivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeNav();
    }
}

//点
function set_point() {
    var obj = bbobj.add_point($("#name_point").val(), $("#size_point").val(), $("#col_point").val(), $("#align_point").val());

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        obj.move($("#" + DivName).scrollLeft(), $("#" + DivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeNav();
    }
}

//フリーハンド
function set_freehand() {
    var obj = bbobj.add_freehand($("#name_freehand").val(), $("#col_freehand").val());
    closeNav();

    if (obj) {
        add_object(obj.id, coalesce_name(obj));
        $("button").attr("disabled", true);
        obj.start();
        freehandOnWrite = obj;
        var colChg = function() {
            obj.color($(this).val());
        }
        $("#col_freehand").bind('blur', colChg);
        $("#undo_freehand").attr("disabled", false)
            .click(function() {
                freehandOnWrite.undo();
            });
        $("#redo_freehand").attr("disabled", false)
            .click(function() {
                freehandOnWrite.redo();
            });
        $("#stop_freehand").attr("disabled", false)
            .click(function() {
                freehandOnWrite = undefined;
                obj.end();
                $("#col_freehand").unbind('blur', colChg);
                $("button:not(.disable)").attr("disabled", false);
                $("#stop_freehand").attr("disabled", true).unbind("click");
                $("#undo_freehand").attr("disabled", true).unbind("click");
                $("#redo_freehand").attr("disabled", true).unbind("click");
            });
    }
}

//ズーム
function zoom_cnv(scale) {
    var newScale, chgScale;
    // var canvas = document.getElementById(CanvasName);

    newScale = scale;
    $("#lst_scale").val(newScale);

    var liid = newScale.toString().replace(".", "_");
    $("ul#contextZoom").children("li").removeClass("checked");
    $("li#contextZoom_" + liid).addClass("checked");

    chgScale = newScale / bbobj.zoomScale;
    if (bbobj.zoomScale != newScale) {
        //倍率が変化する場合は左上維持して拡大処理
        bbobj.zoom(chgScale);
        $("#" + DivName).scrollLeft($("#" + DivName).scrollLeft() * chgScale)
            .scrollTop($("#" + DivName).scrollTop() * chgScale);
    }
}

//移動開始
function start_move() {
    $("button").attr("disabled", true);
    $("li#contextSelectMode").removeClass("checked");
    $("li#contextMoveMode").addClass("checked");
    $("div#csr_select").removeClass("selected");
    $("div#csr_move").addClass("selected");
    $("canvas#" + CanvasName).css("cursor", "move");

    if (freehandOnWrite !== undefined) {
        freehandOnWrite.end();
    }

    bbobj.ourJc.pause(CanvasName);
    var md, mm, mu,
        base_x, base_y;

    mm = function(e) {
        var dx = e.pageX - base_x,
            dy = e.pageY - base_y;
        $("#" + DivName).scrollLeft($("#" + DivName).scrollLeft() - dx);
        $("#" + DivName).scrollTop($("#" + DivName).scrollTop() - dy);
        base_x = e.pageX;
        base_y = e.pageY;
        return false;
    };

    mu = function(e) {
        $("#" + DivName).unbind('mousemove', mm);
        $("#" + DivName).unbind('mouseup', mu);
        return false;
    };
    md = function(e) {
        base_x = e.pageX;
        base_y = e.pageY;
        $("#" + DivName).bind('mousemove', mm);
        $("#" + DivName).bind('mouseup', mu);
        return false;
    };

    $("#" + DivName).mousedown(md);

}

//移動終了
function stop_move() {
    $("button:not(.disable)").attr("disabled", false);
    $("li#contextSelectMode").addClass("checked");
    $("li#contextMoveMode").removeClass("checked");
    $("div#csr_select").addClass("selected");
    $("div#csr_move").removeClass("selected");
    $("canvas#" + CanvasName).css("cursor", "auto");

    bbobj.ourJc.start(CanvasName, true);
    $("#" + DivName).unbind('mousedown');

    //力技なのが気になる
    if (freehandOnWrite !== undefined) {
        $("button").attr("disabled", true);
        freehandOnWrite.start();
        $("#stop_freehand").attr("disabled", false);
    }
}

//lst_objectへの追加
function add_object(id, name) {
    if ($("#lst_object").children("option").get().length) {
        $('<option value="' + id + '"></option>').text(name).insertBefore($("#lst_object :first-child"));
    } else {
        $("#lst_object").append($('<option value="' + id + '"></option>').text(name));
    }
    $("#lst_object").val(id);
}

//lst_objectを上に
function up_object() {
    $("#lst_object option:not(:selected)").each(function() {
        while ($(this).next().is(":selected")) {
            $(this).insertAfter($(this).next());
            bbobj.object($(this).val()).down();
        }
    });
}

//lst_objectを下に
function down_object() {
    $($("#lst_object option:not(:selected)").get().reverse()).each(function() {
        while ($(this).prev().is(":selected")) {
            $(this).insertBefore($(this).prev());
            bbobj.object($(this).val()).up();
        }
    });
}

//メニュー隠す
function hide_menu() {
    $("div.ribbonmenu").slideUp(
        function() {
            $("#menusw_off").hide();
            $("#menusw_on").show();
        });
}
//メニュー出す
function show_menu() {
    $("div.ribbonmenu").slideDown(
        function() {
            $("#menusw_on").hide();
            $("#menusw_off").show();
        });
}

//lst_objectから要素削除
function del_object() {
    $("#lst_object option:selected").each(function() {
        bbobj.object($(this).val()).del();
        $(this).remove()
    });
}

//画像保存
function saveImg() {
    $("#WorkArea").append($("<img id=DownloadImg src='" + bbobj.save() + "'>"));
    window.open("./image.html", "test");
}

//現在の状態をURL化
function getURL() {
    var objs = new Array();
    $($("#lst_object option").get().reverse()).each(function() {
        objs.push($(this).val());
    });

    var queryobj = new BBCQuery(bbobj, $("select#map").val());
    queryobj.fromObjects(objs);
    var querystr = queryobj.toBase64(),
        baseurl = location.protocol + '//' + location.host + location.pathname + '?' + querystr;

    if (baseurl.match(/^https?:\/\//)) {
        $.ajax({
            type: 'GET',
            url: 'http://is.gd/create.php',
            dataType: 'jsonp',
            crossDomain: true,
            cache: false,
            jsonp: false,
            data: {
                url: baseurl,
                format: "json",
                callback: "shortenurl",
            },
            jsonpCallback: 'shortenurl',
            success: function(data, status) {
                if (!data["errorcode"]) {
                    window.prompt("表示用URL", data["shorturl"]);
                } else {
                    alert("URL短縮エラー(" & data["errorcode"] & ")");
                }
            },
            error: function() {
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
    var queryobj = new BBCQuery(bbobj, 'dummy');
    if (queryobj.fromBase64(querystr)) {
        chg_map(queryobj.map, function() {
            var objs = queryobj.applyObjects();
            for (var i = 0; i < objs.length; i++) {
                add_object(objs[i].id, coalesce_name(objs[i]));
                var obj = objs[i];
                obj.mousedown(function() {
                    $("#lst_object").val(obj.id);
                    return false;
                });
            }
        });
    }
}

// オブジェクトの名前が空白だった場合のデフォルト名
var coalesceNames = {
    "scout": "(偵察機)",
    "sensor": "(センサー)",
    "radar": "(レーダー)",
    'sonde': "(索敵弾)",
    'ndsensor': "(ND)",
    'vsensor': "(Vセンサー)",
    'howitzer': "(榴弾)",
    'bunker': "(バンカー)",
    'sentry': "(セントリー)",
    'aerosentry': "(エアロセントリー)",
    'bomber': "(爆撃機)",
    'bascout': "(偵察要請)",
    'icon': "(アイコン)",
    'waft': "(ワフトローダー)",
    'circle': "(円)",
    'line': "(直線)",
    'point': "(点)",
    'freehand': "(フリーハンド)",
    'default': "(無名)",
 };
//オブジェクトの名前が空白だった場合の対策関数
function coalesce_name(obj) {
    var name;
    if (obj._text.length != 0) {
        //名前指定がある場合はそのまま利用
        name = obj._text;
    } else {
        if (coalesceNames.hasOwnProperty(obj.type) == true) {
            name = coalesceNames[obj.type];
        } else {
            name = coalesceNames["default"];
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
    path.replace(control_codes, "\uFFFD");
    if (path.match(/^([.~]?\/)?([A-Za-z0-9_-][A-Za-z0-9_.-]+\/)*[A-Za-z0-9_-][A-Za-z0-9_.-]+$/)) {
        return path;
    } else {
        return null;
    }
}

//キャンバスエリアの幅を変更する
function chgCanvasAreaSize() {
    $("div#" + DivName).width($("canvas#" + CanvasName).outerWidth() + scrollBarWidth)
        .height($("canvas#" + CanvasName).outerHeight() + scrollBarHeight);
    bbobj.chgScroll();
}

//ナビゲーションタブエリアを非表示にする
function closeNav() {
    if ($("nav").is(":visible")) {
        $("nav>div").removeClass("selected");
        $("div.ribbonmenu").fadeOut();
    }
}

//スクロール関連独自処理
function bindScroll(ojQuery) {
    ojQuery.each(function(i, elem) {
        elem.addEventListener('wheel',
            function(e) {
                //スクロールが上限に達している場合はデフォルト動作を阻害する
                if ((e.deltaX < 0) && (elem.scrollLeft <= 0) || (e.deltaX > 0) && (elem.scrollLeft >= elem.scrollWidth - elem.clientWidth) || (e.deltaY < 0) && (elem.scrollTop <= 0) || (e.deltaY > 0) && (elem.scrollTop >= elem.scrollHeight - elem.clientHeight)) {
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
            },
            false);

        if (window.TouchEvent) {
            var startX, startY, scrollStartX, scrollStartY,
                // scrollLimitX, scrollLimitY,
                flag, touchid;

            function getTouch(ev) {
                var touch;

                switch (ev.type) {
                    case "touchstart":
                        touch = ev.touches[0];
                        touchid = touch.identifier;
                        break

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
            }

            elem.addEventListener('touchstart',
                function(e) {
                    var touch = getTouch(e);

                    flag = true;
                    startX = touch.clientX;
                    startY = touch.clientY;
                    scrollStartX = elem.scrollLeft;
                    scrollStartY = elem.scrollTop;
                    // scrollLimitX=elem.scrollWidth - elem.clientWidth;
                    // scrollLimitY=elem.scrollHeight - elem.clientHeight;
                    return;
                },
                false);

            elem.addEventListener('touchmove',
                function(e) {
                    //touchstartで拾ったイベントがないなら何もしない
                    if (!flag) return;
                    var touch = getTouch(e);
                    if (touch === undefined) {
                        flag = false;
                        return;
                    }

                    e.preventDefault();
                    elem.scrollLeft = scrollStartX + (touch.clientX - startX) * (-1);
                    elem.scrollTop = scrollStartY + (touch.clientY - startY) * (-1);
                },
                false);

            elem.addEventListener('touchend',
                function(e) {
                    flag = false;
                });
        }
    });
}
