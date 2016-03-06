import $ from 'jquery';
import BB from './BB';
import BBCQuery from './BBCQuery';
import BBDB from './BBDB';
import './tap';

// import 'jquery-ui/jquery-ui.min.js';
// /*global require*/ // eslint
// require('jquery-ui/themes/base/core.css');
// require('jquery-ui/themes/base/menu.css');
// require('jquery-ui/themes/base/theme.css');
// require('jquery-ui/themes/smoothness/jquery-ui.min.css');

import '../vendor/jquery-simplecolorpicker/jquery.simplecolorpicker';


//初期化
var CanvasName = "BBCompass";
var CanvasDivName = "CanvasArea";
var scrollBarWidth = 0;
var scrollBarHeight = 0;
var freehandOnWrite = undefined;
var bbobj = "";
var forcePcMode = false;

var debugMode = false;

//ターレット関連データ
var turretSpec = {
    "R": [200, 180],
    "G": [250, 180],
    "M": [250, 180],
    "L": [200, 180]
};
var turretCircle = 6;

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

function getMapsFromStage(stage) {
    var maps = $.grep(appData["map"], (el, it) => {
        return (el.hasOwnProperty("dataset") && el.dataset.stage == stage);
    });
    return maps;
}
function getStageFromMap(map) {
    var stages = $.grep(appData["map"], (el, it) => {
        return (el.value == map);
    });
    return stages[0].dataset.stage;
}


// optionに対応するオブジェクトのリストから
// optionリストのdocumentFragmentを生成する
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
        if (el.hasOwnProperty("selected") == true) {
            elOpt["selected"] = el["selected"];
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

// マップ画像のパス
function getMapImgPath(stage, map) {
    return `./map/${stage}/${map}.jpg`;
}
// マップの階層画像のパス
function getMapLayerImgPath(stage, map, layerIdx) {
    return `./map/${stage}/${map}_${layerIdx + 1}.jpg`;
}
// マップデータ(ガンタレ、索敵施設)のパス
function getMapDataPath(map) {
    return `data/${map}.txt`;
}
//ファイル名・ディレクトリ名チェック
function sanitizeFilePath(path) {
    var controlCodes = /[\u0000-\u001F\u007F-\u009F]/g;
    path.replace(controlCodes, "\uFFFD");
    if (path.match(/^([.~]?\/)?([A-Za-z0-9_-][A-Za-z0-9_.-]+\/)*[A-Za-z0-9_-][A-Za-z0-9_.-]+$/)) {
        return path;
    } else {
        return null;
    }
}

// is.gd で短縮する
// callbackの引数は (error, shortenUrl)
// 対応していないURL(localhostとか)なら変換せずにそのまま
function shortenUrl(url, callback) {
    if (url.match(/^https?:\/\//) && !url.match(/^http:\/\/localhost/)) {
        $.ajax({
            type: 'GET',
            url: 'http://is.gd/create.php',
            dataType: 'jsonp',
            crossDomain: true,
            cache: false,
            jsonp: false,
            data: {
                url: url,
                format: "json",
                callback: "shortenurl",
            },
            jsonpCallback: 'shortenurl',
            success: function(data, status) {
                if (!data["errorcode"]) {
                    callback(null, data["shorturl"]);
                } else {
                    callback("URL短縮エラー(" & data["errorcode"] & ")", url);
                }
            },
            error: function() {
                callback("URL短縮に失敗しました", url);
            }
        });
    } else {
        callback(null, url);
    }
}

// //前景色を得る
// function getFgColor($bgcol) {
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



// メニュー関連 ///////////////////////////////////////

// メニュータブの選択状態を切り替え
// - $tab: タブ
// - $target: タブに対応するメニュー要素
// 選択した $tab, $target と .ribbonmenuに selectedクラスを追加する
function toggleMenutab ($tab, $target) {
    if ($tab == undefined || $tab.hasClass("selected")) {
        $(".menutab").removeClass("selected");
        $(".menucell").removeClass("selected");
        $(".ribbonmenu").removeClass("selected");
        $(".ribbonmenu-outer").fadeOut("fast");
    } else {
        $(".menutab").removeClass("selected");
        $(".menucell").removeClass("selected");
        $tab.addClass("selected");
        $target.addClass("selected");
        $(".ribbonmenu-outer").fadeIn("fast");
        setTimeout(function() {
            $(".ribbonmenu").addClass("selected");
        }, 200);
    }
}
// メニューを閉じる
function closeMenuTab() {
    toggleMenutab();
}


// ステージメニュー関連 //////////////////////////////////////////

function loadStageList() {
    loadSelectionOption($("#current"), appData["current_map"]);
    loadSelectionOption($("#stage"), appData["stage"]);
}
function loadStageMapList(stage = null) {
    if (stage != null) {
        var stageMaps = getMapsFromStage(stage);
        stageMaps.unshift({
            "value": undefined,
            "label": "(マップを選択してください)",
            "disabled": true,
            "selected": true,
        });
        loadSelectionOption($("#map"), stageMaps);
    } else {
        // いらない！！！
        var optionList = appData["map"];
        loadSelectionOption($("#map"), optionList);
    }
}

// ステージ選択を変更する。あわせてマップの選択肢を対応するマップのみに絞る
function changeStageSelection(stage) {
    var $stage = $("#stage");
    if (stage == null) {
        return;
    }
    $stage.val(stage);
    loadStageMapList(stage);
}
// マップ選択を変更する。あわせて階層情報を更新する
function changeMapSelection(map) {
    var $map = $("#map");
    if (map == null) {
        return;
    }
    $map.val(map);
    var stage= getStageFromMap(map);

    // イベントとかの場合は #map にクラスを追加
    var $selectedMap = $map.find("option:selected");
    $map.removeClass("union event scramble squad");
    var mapClass = $selectedMap.attr("class");
    if (mapClass !== undefined) {
        $map.addClass(mapClass);
    }

    // 階層選択を更新
    var layer = eval($selectedMap.data("layer"));
    var layerList = [];
    layerList = appDataStatic["defaultLayer"].concat();
    for (var i = 0; i < layer.length; i++) {
        layerList.push({
            "value": getMapLayerImgPath(stage, map, i),
            "text": layer[i],
        });
    }
    var $lstLayer = $("#lst_layer");
    loadSelectionOption($lstLayer, layerList);
    $lstLayer.val("");
}


// オブジェクトメニュー関連 /////////////////////////////////

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
    $(`#${openid} .formlst option:first`).attr('selected', true);
    $(`#${openid} .formlst`).change();

    $("div.setobj:visible").fadeOut(speed, function() {
        $(`#${openid}`).fadeIn(speed);
    });
};

// 表示メニュー関連 //////////////////////////////////////////

//lst_objectへの追加
function addObject(id, name) {
    var $lstObject = $("#lst_object");
    if ($lstObject.children("option").get().length) {
        $(`<option value="${id}"></option>`).text(name).insertBefore($("#lst_object :first-child"));
    } else {
        $lstObject.append($(`<option value="${id}"></option>`).text(name));
    }
    $lstObject.val(id);
}

//lst_objectを上に
function upObject() {
    $("#lst_object option:not(:selected)").each(function() {
        while ($(this).next().is(":selected")) {
            $(this).insertAfter($(this).next());
            bbobj.object($(this).val()).down();
        }
    });
}

//lst_objectを下に
function downObject() {
    $($("#lst_object option:not(:selected)").get().reverse()).each(function() {
        while ($(this).prev().is(":selected")) {
            $(this).insertBefore($(this).prev());
            bbobj.object($(this).val()).up();
        }
    });
}

//lst_objectから要素削除
function delObject() {
    $("#lst_object option:selected").each(function() {
        bbobj.object($(this).val()).del();
        $(this).remove()
    });
}

// lst_objectから全要素削除
function delallObject() {
    $("#lst_object option").each(function() {
        bbobj.object($(this).val()).del();
        $(this).remove()
    });
}

//ズーム
function zoomCnv(scale) {
    var newScale, chgScale;
    // var canvas = document.getElementById(CanvasName);

    newScale = scale;
    $("#lst_scale").val(newScale);

    chgScale = newScale / bbobj.zoomScale;
    if (bbobj.zoomScale != newScale) {
        //倍率が変化する場合は左上維持して拡大処理
        bbobj.zoom(chgScale);
        var $CanvasArea = $("#" + CanvasDivName);
        $CanvasArea
            .scrollLeft($CanvasArea.scrollLeft() * chgScale)
            .scrollTop($CanvasArea.scrollTop() * chgScale);
    }
}

// 保存メニュー関連 //////////////////////////////////////////

var execMakeImg = function() {
    var $imgView = $("#SaveImgView");
    var $SaveImgText = $("#SaveImgText");
    var $SaveImgShortUrl = $("#SaveImgShortUrl");
    var $map = $("#map");
    var objs = new Array();

    $imgView.attr("src", "");
    $SaveImgText.attr("value", "");

    $($("#lst_object option").get().reverse()).each(function() {
        objs.push($(this).val());
    });

    var queryobj = BBCQuery.createFromMapAndObjects($map.val, objs);
    var querystr = queryobj.toBase64();
    var url = `${location.protocol}//${location.host}${location.pathname}?${querystr}`;
    if ($SaveImgShortUrl.prop('checked')) {
        shortenUrl(url, function(err, shorten) {
            if (err) {
                window.alert(err);
            }
            $SaveImgText.attr("value", shorten);
        });
    } else {
        setTimeout(function() {
            $SaveImgText.attr("value", url);
        }, 200);
    }

    var imgSrc = $("#BBCompass")[0].toDataURL('image/png');
    setTimeout(function() {
        $imgView.attr("src", imgSrc);
    }, 200);
}

function getBbObj() {
    return bbobj;
}


// 読み込み時の処理
$(document).ready(function() {
    // デバイスごとの切り替え
    forcePcMode = (document.cookie.replace(new RegExp("(?:^|.*;\\s*)pcmode\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1") == "true");
    if (forcePcMode) {
        var viewport = (forcePcMode)?
            'width=850, user-scalable=yes':
            'width=device-width, user-scalable=no';
        $("meta[name='viewport']").attr('content', viewport);
    }
    //スマホ用メニュー制御
    // - PCだとウィンドウサイズに応じる。スタイルはmedia query任せ
    // - モバイルだとモバイル版をデフォルトで表示＋設定に任せる
    //   - モバイルでPC版表示にする場合はwidth=850＋ズームありで
    //
    //firefoxにはバグがある
    // - metaの属性書き換えではなく、タグごと消して作り直す
    // - 大人しくリロードする
    // の2択となる。大人しくリロードする
    var ua = navigator.userAgent;
    var $viewsw = $("#viewsw");
    if (window.TouchEvent &&
        (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0)) {
        if (forcePcMode) {
            $viewsw.text('スマホ版を表示する');
        } else {
            $viewsw.text('PC版を表示する');
        }
    } else {
        $viewsw.hide();
    }

    // canvas要素の存在チェックとCanvas未対応ブラウザの対処
    var canvas = document.getElementById(CanvasName);
    if (!canvas || !canvas.getContext) {
        alert("ブラウザがCanvas非対応なので、このブラウザでは動作しません");
        return false;
    }

    bindEventHandler();
    loadInitData();
});

// 各種ハンドラの設定
function bindEventHandler() {

    // 現在の戦場選択メニュー
    $("#current").change(function(e) {
        var map = $(this).val();
        var stage= getStageFromMap(map);
        changeStageSelection(stage);
        changeMapSelection(map);
        loadMap(map);
        closeMenuTab();
    });
    // ステージ選択メニュー
    $("#stage").change(function(e) {
        var stage = $(this).val();
        changeStageSelection(stage);
    });
    // マップ選択メニュー
    $("#map").change(function(e) {
        var map = $(this).val();
        changeMapSelection(map);
        loadMap(map);
        closeMenuTab();
    });
    // 階層選択
    $("#lst_layer").change(function() {
        getBbObj().setbgdiff($("#lst_layer").val())
        // closeMenuTab();
    });

    // オブジェクト選択メニューの設定
    $("#objselector .option").tap(function() {
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

    // カラーピッカーの設定
    loadSelectionOption($('.colorpick'), appDataStatic["picker"]);
    $('select.colorpick').simplecolorpicker({
        picker: true
    });

    //狭い時用メニューに関する初期化
    $("#menutab_map").tap(function(ev) {
        toggleMenutab($("#menutab_map"), $("#menu_map"));
    });
    $("#menutab_item").tap(function(ev) {
        toggleMenutab($("#menutab_item"), $("#menu_graph"));
    });
    $("#menutab_view").tap(function(ev) {
        toggleMenutab($("#menutab_view"), $("#menu_cont"));
    });
    $("#menutab_save").tap(function(ev) {
        toggleMenutab($("#menutab_save"), $("#menu_view"));
    });
    $(".ribbonmenu-outer").tap(function(ev) {
        toggleMenutab();        
    });

    //ズーム
    $("#lst_scale").change(function() {
        zoomCnv($(this).val());
    });

    // メニュー開閉
    //メニュー隠す
    $("#menusw_off").bind('tap', function(e) {
        $("div.ribbonmenu").slideUp(function() {
            $("#menusw_off").hide();
            $("#menusw_on").show();
        });
    });
    //メニュー出す
    $("#menusw_on").bind('tap', function(e) {
        $("div.ribbonmenu").slideDown(function() {
            $("#menusw_on").hide();
            $("#menusw_off").show();
        });
    });

    // 各種オブジェクト設置
    $("#submit_scout").bind('tap', function(e) {
        setScout();
    });
    $("#submit_sensor").bind('tap', function(e) {
        setSensor();
    });
    $("#submit_radar").bind('tap', function(e) {
        setRadar();
    });
    $("#submit_sonde").bind('tap', function(e) {
        setSonde();
    });
    $("#submit_ndsensor").bind('tap', function(e) {
        setNdSensor();
    });
    $("#submit_vsensor").bind('tap', function(e) {
        setVSensor();
    });
    $("#submit_howitzer").bind('tap', function(e) {
        setHowitzer();
    });
    $("#submit_waft").bind('tap', function(e) {
        setWaft('image/waft.png');
    });
    $("#submit_misc").bind('tap', function(e) {
        setMisc();
    });
    $("#submit_circle").bind('tap', function(e) {
        setCircle();
    });
    $("#submit_line").bind('tap', function(e) {
        setLine();
    });
    $("#submit_point").bind('tap', function(e) {
        setPoint();
    });
    $("#submit_icon").bind('tap', function(e) {
        setIcon();
    });
    $("#submit_freehand").bind('tap', function(e) {
        setFreehand();
    }); // TODO: あとで

    $("#csr_select").bind('tap', function(e) {
        startSelect();
    });
    $("#csr_move").bind('tap', function(e) {
        startMove();
    });

    $("#up_object").bind('tap', function(e) {
        upObject();
    });
    $("#down_object").bind('tap', function(e) {
        downObject();
    });
    $("#del_object").bind('tap', function(e) {
        delObject();
    });
    $("#delall_object").bind('tap', function(e) {
        delallObject();
    });

    $("#make_img").tap(function(e) {
        execMakeImg()
    });

    $("#CanvasArea").scroll(function() {
        getBbObj().chgScroll();
    });

    $("#viewsw").bind('tap', function(e) {
        document.cookie = (forcePcMode)?
            'pcmode=false;max-age=0':
            'pcmode=true;max-age=2592000';
        location.reload();
    });
}
//各種初期化処理
function loadInitData() {

    // canvas要素の初期化
    bbobj = new BB(CanvasName);
    var cnvArea = document.getElementById("CanvasArea");
    scrollBarWidth = cnvArea.offsetWidth - cnvArea.clientWidth;
    scrollBarHeight = cnvArea.offsetHeight - cnvArea.clientHeight + 6; // for win?
    $("#CanvasArea")
        // .width($("#" + CanvasName).outerWidth() + scrollBarWidth)
        .height($("#" + CanvasName).outerHeight() + scrollBarHeight);

    loadStageList();
    loadStageMapList();
    loadObjectLists();

    //メニューの初期状態を設定
    onObjectSelectorChanged($("#objselector .option:first"), 0); // オブジェクトをひとつ選んでおく

    if (window.location.search) {
        //query stringがあれば再現処理に入る
        setURL(window.location.search.substr(1));
    } else {
        // なければもっともらしいマップを選ぶ
        $("#current").change();
    }
    // changelogロード
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
}

// ロードしたマップデータ内のオブジェクト情報を反映させる
function onLoadMapData(data, bbobj) {
    var i;
    // TODO: マップ同士のオフセット座標対応
    resizeCanvasArea();
    if ("turret" in data) {
        var turretData = data["turret"];
        for (i = 0; i < turretData.length; i++) {
            //x位置、y位置、回転角度、扇形の角度、射程、中心円サイズ、色、テストフラグ
            bbobj.put_turret(turretData[i][0], turretData[i][1], turretData[i][2],
                turretSpec[turretData[i][3]][0],
                turretSpec[turretData[i][3]][1],
                turretCircle,
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
                undefined, debugMode);
        }
    }
}

//マップをロードする
function loadMap(map, callback) {
    var stage= getStageFromMap(map);
    map = sanitizeFilePath(map);
    stage = sanitizeFilePath(stage);
    var scale = eval($("#stage").find(`[value="${stage}"]`).data("scale"));

    if ((map == null) || (stage == null)) {
        if (callback !== undefined) {
            callback("マップファイル名エラー");
        }
        return;
    }

    $("#Loading").show();
    delallObject(); // 設置オブジェクトを全削除

    var bbobj = getBbObj();
    bbobj.setbg(getMapImgPath(stage, map), scale[0], scale[1], function() {
        $("#lst_scale").val(1);
        $("#Loading").hide();
        $.ajax({
            "url": getMapDataPath(map),
            dataType: "jsonp",
            crossDomain: true,
            cache: false,
            jsonp: false,
            jsonpCallback: "stageData",
            success: function(data, status) {
                onLoadMapData(data, bbobj);
                if (callback !== undefined) {
                    callback.call();
                }
            },
            error: function() {
                if (callback !== undefined) {
                    callback("マップデータの読み込みに失敗しました");
                }
            }
        });
    });
}

//偵察機
function setScout() {
    if (!$("#lst_scout").val()) {
        return;
    }
    if (!$("#col_scout").val()) {
        return;
    }

    var param = eval($("#lst_scout").val());
    var obj = bbobj.add_scout($("#name_scout").val(), param[0], param[1], param[2], $("#col_scout").val());

    if (obj) {
        addObject(obj.id, coalesceName(obj));
        obj.move($("#" + CanvasDivName).scrollLeft(), $("#" + CanvasDivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeMenuTab();
    }
}

//センサー
function setSensor() {
    if (!$("#lst_sensor").val()) {
        return;
    }
    if (!$("#col_sensor").val()) {
        return;
    }

    var obj = bbobj.add_sensor($("#name_sensor").val(), $("#lst_sensor").val(), $("#col_sensor").val());

    if (obj) {
        addObject(obj.id, coalesceName(obj));
        obj.move($("#" + CanvasDivName).scrollLeft(), $("#" + CanvasDivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeMenuTab();
    }
}

//レーダー
function setRadar() {
    if (!$("#lst_radar").val()) {
        return;
    }
    if (!$("#col_radar").val()) {
        return;
    }

    var param = eval($("#lst_radar").val());
    var obj = bbobj.add_radar($("#name_radar").val(), param[0], param[1], $("#col_radar").val());

    if (obj) {
        addObject(obj.id, coalesceName(obj));
        obj.move($("#" + CanvasDivName).scrollLeft(), $("#" + CanvasDivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeMenuTab();
    }
}

//滞空索敵弾
function setSonde() {
    if (!$("#lst_sonde").val()) {
        return;
    }
    if (!$("#col_sonde").val()) {
        return;
    }

    var param = eval($("#lst_sonde").val());
    var obj = bbobj.add_sonde($("#name_sonde").val(), param[0], param[1], $("#col_sonde").val());

    if (obj) {
        addObject(obj.id, coalesceName(obj));
        obj.move($("#" + CanvasDivName).scrollLeft(), $("#" + CanvasDivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeMenuTab();
    }
}

//ND索敵センサー
function setNdSensor() {
    if (!$("#lst_ndsensor").val()) {
        return;
    }
    if (!$("#col_ndsensor").val()) {
        return;
    }

    var obj = bbobj.add_ndsensor($("#name_ndsensor").val(), $("#lst_ndsensor").val(), $("#col_ndsensor").val());

    if (obj) {
        addObject(obj.id, coalesceName(obj));
        obj.move($("#" + CanvasDivName).scrollLeft(), $("#" + CanvasDivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeMenuTab();
    }
}

//Vセンサー
function setVSensor() {
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
        addObject(obj.id, coalesceName(obj));
        obj.move($("#" + CanvasDivName).scrollLeft(), $("#" + CanvasDivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeMenuTab();
    }
}

//砲撃
function setHowitzer() {
    if (!$("#lst_howitzer").val()) {
        return;
    }
    if (!$("#col_howitzer").val()) {
        return;
    }

    var param = eval($("#lst_howitzer").val());
    var obj = bbobj.add_howitzer($("#name_howitzer").val(), param[0], param[1], param[2], $("#col_howitzer").val());

    if (obj) {
        addObject(obj.id, coalesceName(obj));
        obj.move($("#" + CanvasDivName).scrollLeft(), $("#" + CanvasDivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeMenuTab();
    }
}


//その他攻撃関連
function setMisc() {
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
        addObject(obj.id, coalesceName(obj));
        obj.move($("#" + CanvasDivName).scrollLeft(), $("#" + CanvasDivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeMenuTab();
    }
}


//アイコン
function setIcon() {
    if (!$("#lst_icon").val()) {
        return;
    }
    if (!$("#col_icon").val()) {
        return;
    }

    var file = sanitizeFilePath($("#lst_icon").val());
    if (file == null) {
        alert("アイコンファイル名エラー");
        return;
    }

    var obj = bbobj.add_icon($("#name_icon").val(), file, $("#col_icon").val());

    if (obj) {
        addObject(obj.id, coalesceName(obj));
        obj.move($("#" + CanvasDivName).scrollLeft(), $("#" + CanvasDivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeMenuTab();
    }
}


//ワフトローダー
function setWaft(file) {
    if (!file) {
        return;
    }
    if (!$("#col_waft").val()) {
        return;
    }

    file = sanitizeFilePath(file);
    if (file == null) {
        alert("ワフト画像ファイル名エラー");
        return;
    }

    var obj = bbobj.add_waft($("#name_waft").val(), file, $("#col_waft").val());

    if (obj) {
        addObject(obj.id, coalesceName(obj));
        obj.move($("#" + CanvasDivName).scrollLeft(), $("#" + CanvasDivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeMenuTab();
    }
}


//円
function setCircle() {
    if (!$("#rad_circle").val()) {
        return;
    }
    if (!$("#col_circle").val()) {
        return;
    }

    var obj = bbobj.add_circle($("#name_circle").val(), $("#rad_circle").val(), $("#col_circle").val());

    if (obj) {
        addObject(obj.id, coalesceName(obj));
        obj.move($("#" + CanvasDivName).scrollLeft(), $("#" + CanvasDivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeMenuTab();
    }
}

//直線
function setLine() {
    if (!$("#len_line").val()) {
        return;
    }
    if (!$("#col_line").val()) {
        return;
    }

    var obj = bbobj.add_line($("#name_line").val(), $("#len_line").val(), $("#col_line").val());

    if (obj) {
        addObject(obj.id, coalesceName(obj));
        obj.move($("#" + CanvasDivName).scrollLeft(), $("#" + CanvasDivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeMenuTab();
    }
}

//点
function setPoint() {
    var obj = bbobj.add_point($("#name_point").val(), $("#size_point").val(), $("#col_point").val(), $("#align_point").val());

    if (obj) {
        addObject(obj.id, coalesceName(obj));
        obj.move($("#" + CanvasDivName).scrollLeft(), $("#" + CanvasDivName).scrollTop());
        obj.mousedown(function() {
            $("#lst_object").val(obj.id);
            return false;
        });
        closeMenuTab();
    }
}

//フリーハンド
function setFreehand() {
    var obj = bbobj.add_freehand($("#name_freehand").val(), $("#col_freehand").val());
    closeMenuTab();

    if (obj) {
        addObject(obj.id, coalesceName(obj));
        $("button").attr("disabled", true);
        obj.start();
        freehandOnWrite = obj;
        var colChg = function() {
            obj.color($(this).val());
        }
        $("#col_freehand").bind('blur', colChg);
        $("#undo_freehand").attr("disabled", false)
            .tap(function() {
                freehandOnWrite.undo();
            });
        $("#redo_freehand").attr("disabled", false)
            .tap(function() {
                freehandOnWrite.redo();
            });
        $("#stop_freehand").attr("disabled", false)
            .tap(function() {
                freehandOnWrite = undefined;
                obj.end();
                $("#col_freehand").unbind('blur', colChg);
                $("button:not(.disable)").attr("disabled", false);
                $("#stop_freehand").attr("disabled", true).unbind("tap");
                $("#undo_freehand").attr("disabled", true).unbind("tap");
                $("#redo_freehand").attr("disabled", true).unbind("tap");
            });
    }
}

//移動開始
function startMove() {
    $("button").attr("disabled", true);
    $("div#csr_select").removeClass("selected");
    $("div#csr_move").addClass("selected");
    $("#" + CanvasName).css("cursor", "move");

    if (freehandOnWrite !== undefined) {
        freehandOnWrite.end();
    }

    bbobj.ourJc.pause(CanvasName);
    var md, mm, mu,
        base_x, base_y;

    mm = function(e) {
        var dx = e.pageX - base_x,
            dy = e.pageY - base_y;
        $("#" + CanvasDivName).scrollLeft($("#" + CanvasDivName).scrollLeft() - dx);
        $("#" + CanvasDivName).scrollTop($("#" + CanvasDivName).scrollTop() - dy);
        base_x = e.pageX;
        base_y = e.pageY;
        return false;
    };

    mu = function(e) {
        $("#" + CanvasDivName).unbind('mousemove', mm);
        $("#" + CanvasDivName).unbind('mouseup', mu);
        return false;
    };
    md = function(e) {
        base_x = e.pageX;
        base_y = e.pageY;
        $("#" + CanvasDivName).bind('mousemove', mm);
        $("#" + CanvasDivName).bind('mouseup', mu);
        return false;
    };

    $("#" + CanvasDivName).mousedown(md);
    
    // var img = $("#SaveArea");
    // img.css("visibility", "hidden");

}

//移動終了
function startSelect() {
    $("button:not(.disable)").attr("disabled", false);
    $("div#csr_select").addClass("selected");
    $("div#csr_move").removeClass("selected");
    $("#" + CanvasName).css("cursor", "auto");

    bbobj.ourJc.start(CanvasName, true);
    $("#" + CanvasDivName).unbind('mousedown');

    // var img = $("#SaveArea");
    // img.css("visibility", "hidden");

    //力技なのが気になる
    if (freehandOnWrite !== undefined) {
        $("button").attr("disabled", true);
        freehandOnWrite.start();
        $("#stop_freehand").attr("disabled", false);
    }
}

//URLクエリストリングからの復元
function setURL(querystr) {
    var queryobj = BBCQuery.createFromBase64(querystr);
    var map = queryobj.map;
    if (map != "dummy") {
        var stage= getStageFromMap(map);
        changeStageSelection(stage);
        changeMapSelection(map);
        loadMap(map, function(err) {
            if (err) {
                window.alert(err);
                return;
            }
            var objs = queryobj.applyObjects(getBbObj());
            // オブジェクト一覧に追加
            for (var i = 0; i < objs.length; i++) {
                var obj = objs[i];
                addObject(obj.id, coalesceName(obj));
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
function coalesceName(obj) {
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

// キャンバスのサイズ変更に合わせてキャンバスエリアのサイズを追従させる
function resizeCanvasArea() {
    var ua = navigator.userAgent;
    var $BBCompass = $("#BBCompass");
    if (!forcePcMode &&
        window.TouchEvent &&
        (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0)) {
        $("#CanvasArea")
            .height($BBCompass.outerHeight() + scrollBarHeight);
    } else {
        $("#CanvasArea")
            .width($BBCompass.outerWidth() + scrollBarWidth)
            .height($BBCompass.outerHeight() + scrollBarHeight);
    }
    getBbObj().chgScroll();
}


