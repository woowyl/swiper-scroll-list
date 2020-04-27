(function() {
    /**
     * 一般UA
     * User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B350 Safari/8536.25 
     * 返利APP UA
     * 1. Fanli/4.0.0.112 (iPhone; iPhone OS 6.1.4; en_US; ID:1-6663128-7787518413510-17-3)
     * 2. Fanli/4.3.0.31 (iPhone; iPhone OS 8.1.2; zh_CN; ID:1--63371201214502-17-3) context:com|fs
     *
     * Done
     * 1. ios, HTML.fl-ios
     * 2. ios version > 8, HTML.fl-hairlines
     * 3. ua has 'context:com', fefine meta viewport width
     */
    var ua = navigator.userAgent.toLowerCase();
    var appv = navigator.appVersion;
    var html = document.documentElement;
    var isIos = /ip(hone|od|ad)/i.test(ua);
    var device = {
        iphone: "iphone",
        ipod: "ipod",
        ipad: "ipad",
        samsung: "samsung|sm-",
        huawei: "huawei",
        meizu: "mx[0-9]+"
    };
    var uaContextReg = /context:([^\s]+)/i;
    var tryToGetContext = uaContextReg.exec(ua);

    var w = window.screen.width;
    var h = window.screen.height;
    var ratio = window.devicePixelRatio ? window.devicePixelRatio : 0;

    var vArr, ver;
    var dev;

    if (isIos) {
        html.classList.add("fl-ios");
        vArr = appv.match(/OS (\d+)[_.](?:\d+)[_.]?(?:\d+)?/);
        ver = parseInt(vArr[1], 10);

        if (ver >= 8) {
            html.classList.add("fl-hairlines");
        }

        if(ratio == 3) {
            if( w == 375 && h == 812) { // iPhone X、iPhone XS
                html.classList.add("fl-ios-bangs", "fl-ios-x");
            } else if ( w == 414 && h == 896) { // iPhone XS Max
                html.classList.add("fl-ios-bangs", "fl-ios-xmax");
            }
        }

        if(ratio == 2 && w == 414 && h == 896) {
            html.classList.add("fl-ios-bangs", "fl-ios-xr");
        }

    } else {
        vArr = appv;
        ver = parseInt(ua.substr(ua.indexOf('android') + 8, 3));
        html.classList.add("fl-android");
        
        if (ver < 6) {
            html.classList.add("fl-android-" + ver);
        }
    }
    
    for (dev in device) {
        if (Object.prototype.hasOwnProperty.call(device, dev)) {
            if ((new RegExp("\\b" + device[dev] + "\\b")).test(ua)) {
                html.classList.add("fl-" + dev);
                break; 
            }
        }
    }

    if (tryToGetContext && tryToGetContext[1] == 'com') {
        document.querySelector('meta[name=viewport]')
            .setAttribute('content', 'initial-scale=1.0,user-scalable=no,minimum-scale=1.0,maximum-scale=1.0');
    }

}());

(function(win, doc) {
    var remwidth;
    var remSwitch;
    var remmaxwidth;
    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
    var timer = null;

    var ua = navigator.userAgent.toLowerCase();
    var isIos = /ip(hone|od|ad)/i.test(ua);
    var isFanli = ua.indexOf('fanli') > -1;
    var isIpad = /ipad/i.test(ua);


    remwidth = 750;
    remSwitch = 1;

    if (remSwitch == "[remswitch]") {
        return;
    }

    remwidth = (remwidth == "[remwidth]" ? 750 : Number(remwidth));

    function setFontSize() {
        var docEl = doc.documentElement;
        var winWidth = (isFanli && isIos && !isIpad) ? window.screen.width : docEl.getBoundingClientRect().width;

        var originFontSize;
        var definedFontSize = (winWidth / remwidth) * 100;

        if (remmaxwidth && remmaxwidth !== "[remmaxwidth]" && definedFontSize > Number(remmaxwidth)) {
            definedFontSize = Number(remmaxwidth);
        }

        docEl.setAttribute('data-screenwidth', winWidth);
        docEl.style.fontSize = definedFontSize + 'px';

        originFontSize = parseFloat(window.getComputedStyle(docEl, null).getPropertyValue("font-size"));

        if( !isIos && definedFontSize != originFontSize ){
            originFontSize = (originFontSize % 1 === 0) ? (originFontSize + 0.5) : originFontSize;
            docEl.style.fontSize = ( definedFontSize / originFontSize ) * definedFontSize + 'px';
        }
    }

    win.addEventListener(evt, function() {
        clearTimeout(timer);
        timer = setTimeout(setFontSize, 300);
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(setFontSize, 300);
        }
    }, false);

    setFontSize();

}(window, document));

