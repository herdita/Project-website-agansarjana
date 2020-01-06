! function() {
    "use-strict";

    function Widget(a) { this.config = a, this.isFinishLoading = !1, this.loadingTimeout = !1 }

    function VCPostMessageService(a) { this._messages = {}, this._origin = a, this._delimiter = ":", this.listen() }

    function innerVCInjector() {
        function a(a) {
            var c = b(),
                d = c.parentNode;
            if (a.toLowerCase().indexOf("<script") > -1) injector = new VCInjector, injector.insertScript(d, a);
            else { var e = document.createElement("div"); for (e.innerHTML = a; e.childNodes.length;) d.insertBefore(e.childNodes[0], c) }
        }

        function b() { return document.getElementById(VCInjector.prototype.writesQueue[0].scriptsMap[0].placeholder) }

        function c(a) {
            var b = document.getElementById(a);
            b && b.parentNode.removeChild(b)
        }

        function d() { c(VCInjector.prototype.writesQueue[0].scriptsMap[0].placeholder) }

        function e(a, b, c) {
            var d = [],
                e = document.createElement("div");
            e.innerHTML = b;
            for (var h = e.getElementsByTagName("script"), i = 0; i < h.length; i++) {
                var j = h[i];
                if (j.src) {
                    var k = document.createElement("span");
                    k.id = "vc-injector-placeholder-" + i, j.parentNode.insertBefore(k, j)
                }
                d.push(j)
            }
            for (; h.length;) h[0].parentNode.removeChild(h[0]);
            for (var l = e.childNodes; l.length;) a.appendChild(l[0]);
            for (var i = 0; i < d.length; i++) {
                var j = d[i];
                j.src ? f(j.src, "vc-injector-placeholder-" + i, c) : j.innerHTML && g(j.innerHTML)
            }
        }

        function f(a, b, c) {
            VCInjector.prototype.writesQueue[0].scriptsMap.push({ scriptSrc: a, placeholder: b });
            var d = document.createElement("script");
            d.src = a;
            var e = document.getElementsByTagName("script")[0];
            h(d, c), e.parentNode.insertBefore(d, e)
        }

        function g(a) { try { eval.call(window, a) } catch (a) {} }

        function h(a, b) {
            if (a.addEventListener) a.addEventListener("error", b, !0), a.addEventListener("load", b, !0);
            else {
                if (!a.attachEvent) throw Error("Failed to attach listeners to script.");
                a.attachEvent("onerror", b, !0), a.attachEvent("onload", b, !0), a.attachEvent("onreadystatechange", function() { "complete" != a.readyState && "loaded" != a.readyState || b() })
            }
        }
        this.doInject = function() {
            var b = document.write;
            document.write = a;
            var c = this;
            e(this.writesQueue[0].container, this.writesQueue[0].html, function(a) { c.onInjectComplete(b) })
        }, this.onInjectComplete = function(a) { d(), this.writesQueue[0].scriptsMap.shift(), 0 === this.writesQueue[0].scriptsMap.length && (this.writesQueue.shift(), this.writesQueue.length > 0 ? this.doInject() : document.write = a) }, this.insertScript = function(a, b) { this.writesQueue.push({ container: a, html: b, scriptsMap: [] }), 1 === this.writesQueue.length && this.doInject() }
    }

    function VCScroll(a) { this._element = a, this._inViewCallbacks = [], this._scrollToEndCallbacks = [], this._isInit = !1, this._enabled = !0, this._inViewSent = !1, this._currentScroll = 0, this._currentRange = 1, this._scrollOffset = 30, this._waiting = !1 }
    try {
        var VICOMI = {};
        VICOMI.WIDGET_TYPES = { REC_AND_COMMENTS: "0", COMMENTS_AND_REC: "1", COMMENTS: "2", REC: "3", FEELBACK: "4", TOP: "5", SUMMARY: "6", VOTES: "7", FEELBACK_MOBILE: "8", SUMMARY_SITE: "9", VIDEO: "10" }, VICOMI.messages = { no_container: "Vicomi Error: Can't find vicomi container.", incom_browser: "Vicomi Error: Incompatible browser.", invalid_access_token: "Vicomi Error: Invalid access token", resize_iframe_error: "Vicomi Error: Cannot resize iframe.", init: "Vicomi: Loading...", init_widget: "Vicomi: Init widget ", post_message_origin: "Vicomi: Post Message accept origin from: ", post_message_receive: "Vicomi: Post Message received message. ", post_message_send: "Vicomi: Post Message send message: ", ad_click: "Vicomi: Ad clicked", external_click: "Vicomi: external clicked", in_view: "Vicomi: widget in view: ", scroll_end: "Vicomi: widget scrolled to end: ", attention: "Vicomi: attention change: ", visibility_visible: "Vicomi: Page is visible", visibility_hidden: "Vicomi: Page is hidden" }, VICOMI.defaults = { feelbacksTriggerPosition: "20px", feelbacksContainerId: "vc-feelback-main", topContainerId: "vc-top-main", summaryContainerId: "vc-summary-main", votesContainerId: "vc-votes-main", displayType: "0", recType: "0", ieMinVersion: 8, loadingTimeout: 3e4, host: "http://azure-assets-prod.vicomi.com", https_host: "https://azure-assets-prod.vicomi.com", assetsDirectory: "latest/" }, VICOMI.widgetsConfig = [{ containerId: "vc-feelback-main", relativeUrl: "/feelback", widgetType: VICOMI.WIDGET_TYPES.FEELBACK, mobilePrefix: "m", postMessagePrefix: "vicomi:feelback:", isIframe: !0 }, { containerId: "vc-votes-main", relativeUrl: "/feelback", widgetType: VICOMI.WIDGET_TYPES.FEELBACK, mobilePrefix: "m", postMessagePrefix: "vicomi:feelback:", isIframe: !0 }, { containerId: "vc-top-main", relativeUrl: "/top", widgetType: VICOMI.WIDGET_TYPES.TOP, mobilePrefix: "", postMessagePrefix: "vicomi:top:", isIframe: !0 }, { containerId: "vc-summary-main", relativeUrl: "/summary", widgetType: VICOMI.WIDGET_TYPES.SUMMARY, mobilePrefix: "", postMessagePrefix: "vicomi:summary:", isIframe: !0 }, { containerId: "vc-summary-site-main", relativeUrl: "/summarysite", widgetType: VICOMI.WIDGET_TYPES.SUMMARY_SITE, mobilePrefix: "", postMessagePrefix: "vicomi:summary:", isIframe: !0 }, { containerId: "vc-video-main", relativeUrl: "/plugins/video.js", widgetType: VICOMI.WIDGET_TYPES.VIDEO, isIframe: !1 }], VICOMI.cAttr = { host: "data-vicomi-host", url: "data-url", displayType: "data-display-type", recType: "data-recommend-display-type", title: "data-title-headline", titleKicker: "data-title-kicker", image: "data-image-url", explicitMobileView: "data-mobile-view", accessToken: "data-access-token", authorId: "data-author-id", authorName: "data-author-name", articleId: "data-article-id", feelbacksPosition: "data-feelbacks-position", tags: "data-tags", section: "data-section", ignoreOGUrl: "data-ignore-ogurl", articleType: "data-article-type", dataTheme: "data-theme", alternativeHostname: "data-alternative-hostname", ignoreDiscussion: "data-ignore-discussion", publishedTime: "data-published-time", modifiedTime: "data-modified-time" }, VICOMI.mTags = { description: "description", ogDescription: "og:description", ogTitle: "og:title", ogImage: "og:image", ogUrl: "og:url", articleModifiedTime: "article:modified_time", articlePublishedTime: "article:published_time", section: "article:section", author: "article:author" }, VICOMI.logLevel = 0, VICOMI.init = function() {
            VICOMI.Util.log(VICOMI.messages.init, 1);
            var a = { isIE: VICOMI.Util.isIE() };
            if (a.isIE && a.isIE < 8) return void VICOMI.Util.log(VICOMI.messages.incom_browser);
            a.isMobileDevice = VICOMI.Util.isMobileDevice(), VICOMI.Widgets = [];
            for (var b = 0; b < VICOMI.widgetsConfig.length; b++) {
                var c = VICOMI.widgetsConfig[b],
                    d = document.getElementById(c.containerId);
                if (d)
                    if (c.isIframe) {
                        var e = d.getElementsByTagName("iframe");
                        if (0 == e.length) {
                            var f = { container: d, isIE: a.isIE, isMobileDevice: a.isMobileDevice, mobilePrefix: c.mobilePrefix, widgetType: c.widgetType, relativeUrl: c.relativeUrl, postMessagePrefix: c.postMessagePrefix };
                            VICOMI.Widgets.push(new Widget(f))
                        }
                    } else {
                        var g = document.createElement("script");
                        g.setAttribute("type", "text/javascript"), g.setAttribute("src", VICOMI.defaults.https_host + c.relativeUrl), g.setAttribute("container", c.containerId), document.getElementsByTagName("head")[0].appendChild(g)
                    }
            }
            VICOMI.Attention.init(), window.VCInjector = window.VCInjector || innerVCInjector;
            for (var b = 0; b < VICOMI.Widgets.length; b++) VICOMI.Widgets[b].init()
        }, Widget.prototype = {
            init: function() {
                function a() { k.subscribe(function() { k.startAd() }, "AdLoaded") }
                VICOMI.Util.log(VICOMI.messages.init_widget + this.config.widgetType, 1);
                var b = this,
                    c = this.config;
                if (c.accessToken = this.getAttr(VICOMI.cAttr.accessToken), !c.accessToken) return void VICOMI.Util.log(VICOMI.messages.invalid_access_token);
                if (c.vicomiHost = this.getVicomiHost(), c.displayType = this.getAttr(VICOMI.cAttr.displayType) || VICOMI.defaults.displayType, c.widgetType == VICOMI.WIDGET_TYPES.FEELBACK && c.isMobileDevice) {
                    var d = window.innerWidth > screen.width ? window.innerWidth / screen.width : 1,
                        e = this.getAttr(VICOMI.cAttr.explicitMobileView) || "2";
                    ("0" == e && 1 == d || "1" == e) && (c.widgetType = VICOMI.WIDGET_TYPES.FEELBACK_MOBILE, c.explicitMobileView = e, c.scale = d, c.isCustomFeelbacksPos = !!this.getAttr(VICOMI.cAttr.feelbacksPosition), c.feelbacksPos = this.getAttr(VICOMI.cAttr.feelbacksPosition) || VICOMI.defaults.feelbacksTriggerPosition)
                }
                c.widgetType == VICOMI.WIDGET_TYPES.FEELBACK && (c.recType = this.getAttr(VICOMI.cAttr.recType) || VICOMI.defaults.recType);
                var f = this.getInitURL();
                if (this.iframe = this.createIframe(f), this.listenIframe(), c.widgetType == VICOMI.WIDGET_TYPES.FEELBACK && (this.watchAdsClicks(), this.watchExternalClicks()), c.widgetType != VICOMI.WIDGET_TYPES.FEELBACK_MOBILE && this.listenPageScroll(), VICOMI.Attention.onChange(function(a) { b.notifyIframe("attention:" + a) }), b.loadingTimeout = setTimeout(function() { b.isFinishLoading }, VICOMI.defaults.loadingTimeout), c.widgetType == VICOMI.WIDGET_TYPES.SUMMARY_SITE) {
                    var g = 337,
                        h = 355320,
                        i = 640,
                        j = 480;
                    VICOMI.Util.isMobileDevice() && (g = 337, h = 438196, i = 300, j = 250);
                    var k, l = { pid: g, sid: h, playerContainerId: "", playerId: "", playerWidth: i, playerHeight: j, execution: "outstream", placement: "slider", playInitiation: "auto", volume: 100, trackImp: "", trackClick: "", custom1: "", custom2: "", custom3: "", pubMacros: "", dfp: !1, lkqdId: (new Date).getTime().toString() + Math.round(1e9 * Math.random()).toString() },
                        m = "",
                        n = { slot: document.getElementById(l.playerContainerId), videoSlot: document.getElementById(l.playerId), videoSlotCanAutoPlay: !0, lkqdSettings: l },
                        o = document.createElement("iframe");
                    o.id = l.lkqdId, o.name = l.lkqdId, o.style.display = "none";
                    var p = function() { vpaidLoader = o.contentWindow.document.createElement("script"), vpaidLoader.src = "https://ad.lkqd.net/vpaid/formats.js?pid=" + g + "&sid=" + h, vpaidLoader.onload = function() { k = o.contentWindow.getVPAIDAd(), a(), k.handshakeVersion("2.0"), k.initAd(l.playerWidth, l.playerHeight, "normal", 600, m, n) }, o.contentWindow.document.body.appendChild(vpaidLoader) };
                    o.onload = p, o.onerror = p, document.documentElement.appendChild(o)
                }
            },
            getInitParams: function() {
                var a = {};
                switch (this.config.widgetType) {
                    case VICOMI.WIDGET_TYPES.FEELBACK:
                    case VICOMI.WIDGET_TYPES.FEELBACK_MOBILE:
                        a = { title: VICOMI.Util._unescape(this.getAttr(VICOMI.cAttr.title)) || VICOMI.Util._unescape(VICOMI.Util.getPageMeta(VICOMI.mTags.ogTitle)) || VICOMI.Util._unescape(document.title), title_kicker: this.getAttr(VICOMI.cAttr.titleKicker), image: this.getAttr(VICOMI.cAttr.image) || VICOMI.Util.getPageMeta(VICOMI.mTags.ogImage), description: VICOMI.Util.getPageMeta(VICOMI.mTags.ogDescription) || VICOMI.Util.getPageMeta(VICOMI.mTags.description), externalid: this.getAttr(VICOMI.cAttr.articleId), authorid: this.getAttr(VICOMI.cAttr.authorId), authorname: this.getAttr(VICOMI.cAttr.authorName) || VICOMI.Util.getPageMeta(VICOMI.mTags.author) || this.getAuthor(), tags: this.getAttr(VICOMI.cAttr.tags), published_time: this.getPubDate(), article_type: this.getAttr(VICOMI.cAttr.articleType), section: this.getAttr(VICOMI.cAttr.section) || VICOMI.Util.getPageMeta(VICOMI.mTags.section), widget_recommendation_type: this.getAttr(VICOMI.cAttr.recType) || VICOMI.defaults.recType, data_theme: this.getAttr(VICOMI.cAttr.dataTheme), alternative_hostname: this.getAttr(VICOMI.cAttr.alternativeHostname), ignore_discussion: this.getAttr(VICOMI.cAttr.ignoreDiscussion) }, this.config.widgetType == VICOMI.WIDGET_TYPES.FEELBACK_MOBILE && (this.config.isCustomFeelbacksPos && (a.position = this.config.feelbacksPos), this.config.scale > 1 && (a.scale = this.config.scale)), a.title && encodeURIComponent(a.title).length > 1500 && (a.title = a.title.substr(0, 100), a.description = a.description.substr(0, 50)), a.description && encodeURIComponent(a.description).length > 1500 && (a.description = a.description.substr(0, 100));
                        break;
                    case VICOMI.WIDGET_TYPES.TOP:
                        break;
                    case VICOMI.WIDGET_TYPES.SUMMARY:
                    case VICOMI.WIDGET_TYPES.SUMMARY_SITE:
                        a.mobile_view = this.getAttr(VICOMI.cAttr.explicitMobileView)
                }
                return a.url = this.getAttr(VICOMI.cAttr.url) || VICOMI.Util.getPageMeta(VICOMI.mTags.ogUrl) || document.URL, a.access_token = this.config.accessToken, a.type = this.config.displayType, a.referrer = document.referrer || "", a
            },
            getInitURL: function() {
                var a = this.getInitParams(),
                    b = this.config.vicomiHost + this.config.relativeUrl;
                return this.config.widgetType == VICOMI.WIDGET_TYPES.FEELBACK_MOBILE && (b += this.config.mobilePrefix), b += "/" + VICOMI.defaults.assetsDirectory + "index.html", b += "#?" + VICOMI.Util.serializeUrlParams(a), b = b.replace("%0a", ""), b = b.replace("%0A", "")
            },
            getVicomiHost: function() { var a = { HTTP: "http:", HTTPS: "https:" }; return location.protocol === a.HTTPS ? this.getAttr(VICOMI.cAttr.host) || VICOMI.defaults.https_host : this.getAttr(VICOMI.cAttr.host) || VICOMI.defaults.host },
            createIframe: function(a) {
                var b = document.createElement("iframe");
                b.id = "iframe-widget", b.src = a, b.frameBorder = 0, b.scrolling = "no";
                var c = "width:100%;position:relative;display:block;";
                return VICOMI.Util.isMobileDevice() && (c = "width:100vw;position:relative;display:block;"), this.config.widgetType == VICOMI.WIDGET_TYPES.FEELBACK_MOBILE && (c = "width:80px;height:60px;position:fixed;left:0;outline:none;z-index:9999;bottom:" + this.config.feelbacksPos + ";", this.config.scale > 1 && (c = c + "zoom:" + this.config.scale + ";", this.config.container.style.cssText += "zoom:" + this.config.scale + ";")), b.style.cssText = c, this.config.container.appendChild(b), b
            },
            resizeIframe: function(a) { try { a = parseInt(a), VICOMI.Util.log("Vicomi - Changing iframe height to: " + a, 1), this.iframe.style.height = a + "px" } catch (b) { VICOMI.Util.log(VICOMI.messages.resize_iframe_error + "Size: " + a) } },
            notifyIframe: function(a) { this.iframe && void 0 != this.iframe && void 0 != a && "" != a && this.pmService.postMessage(this.config.postMessagePrefix + a, this.iframe.contentWindow) },
            listenIframe: function() {
                var a = this;
                this.pmService = new VCPostMessageService(this.config.vicomiHost), this.pmService.on(this.config.postMessagePrefix, "loaded", function(b) { a.isFinishLoading = !0, a.loadingTimeout && clearTimeout(a.loadingTimeout) }), this.config.widgetType != VICOMI.WIDGET_TYPES.FEELBACK_MOBILE ? (this.pmService.on(this.config.postMessagePrefix, "resize", function(b) { a.resizeIframe(b) }), this.pmService.on(this.config.postMessagePrefix, "ads", function(b) { a.displayAds(b) }), this.config.widgetType == VICOMI.WIDGET_TYPES.FEELBACK && this.pmService.on(this.config.postMessagePrefix, "backdrop", function() { a.toggleBackdrop() }), this.config.widgetType != VICOMI.WIDGET_TYPES.SUMMARY && this.config.widgetType != VICOMI.WIDGET_TYPES.SUMMARY_SITE || (this.pmService.on(this.config.postMessagePrefix, "scroll", function(a) { "disable" === a && this.pageScrollListener.disable(), "enable" === a && this.pageScrollListener.enable() }), this.pmService.on(this.config.postMessagePrefix, "scrollTo", function(a) { window.scrollTo(a, 0) }))) : this.pmService.on(this.config.postMessagePrefix, "toggle_iframe", function(b) { a.toggleIframe(b), a.notifyIframe("toggle_iframe:success") })
            },
            listenPageScroll: function() {
                var a = this;
                this.pageScrollListener = new VCScroll(this.iframe), this.config.widgetType != VICOMI.WIDGET_TYPES.FEELBACK_MOBILE && (this.pageScrollListener.onInView(function() { VICOMI.Util.log(VICOMI.messages.in_view + a.config.widgetType, 1), a.notifyIframe("in_view") }), this.config.widgetType != VICOMI.WIDGET_TYPES.SUMMARY && this.config.widgetType != VICOMI.WIDGET_TYPES.SUMMARY_SITE || this.pageScrollListener.onScrollEnd(function() { VICOMI.Util.log(VICOMI.messages.scroll_end + a.config.widgetType, 1), a.notifyIframe("scroll:end") }))
            },
            watchAdsClicks: function() {
                var a = [],
                    b = ["top-ads", "sas-backgroundDiv2_3829606", "block-hobbyadserver-2", "block-hobbyadserver-7", "block-hobbyadserver-9", "hbrightsidebar-right_top", "block-hobbyadserver-8", ".adsbygoogle"],
                    c = [".vc-ads-wrapper-div", "hagen3", "hagen4", "hagen5", "hagen6", "hagen8", ".bcode-zwischenblock", ".skypos", "sas_5720", "div-gpt-ad-1438254179778-1", "div-gpt-ad-1438254179778-5"],
                    d = ["twiago_bx", "jsm_1", "jsm_2", "jsm_3", "jsm_4", "jsm_5"],
                    e = [".vc-ads-wrapper-div", "CM8ShowAd_MEGA_PLASMA_970X330", "tc-side-ffbanner-2", "tc-side-ffbanner-3"],
                    f = [".vc-ads-wrapper-div", "CM8ShowAd_Plasma_935x180", "div-gpt-ad-1424091590751-0", "div-gpt-ad-1405584350441-0", "div-gpt-ad-1424091574650-0"],
                    g = [".vc-ads-wrapper-div", ".banner_970_250", ".banner_300-250", ".apd_static_banner", "banner_1075_90", ".banner_160x600_article", ".banner-240-400", ".FIOnDemandWrapper"],
                    h = ["rectangle_1", "skyscraper_1", "superbanner_1", "teaser_11", "halfpagead_1"],
                    i = ["rectangle_1", "rectangle_2", "skyscraper_1", "superbanner_1"],
                    j = [".vc-ads-wrapper-div", "leader_plus_top", "mpu_top", "mpu_bottom", "leader_bottom", "mpu_middle"],
                    k = ["sas_4459", "sas_5419", "sas_3650", "sas_4459", "sas_3648", ".ph-ad-content", ".grid-box-optional_ad"],
                    l = ["pub_dart_MBR_T_728x90", ".kadmer-ad", "pub_dart_MBR_M_728x90", "pub_dart_REC_B_300x250", "pub_dart_MBR_B_728x90"];
                "160ff8973c14521842a52e19abc55d6c" == this.config.accessToken ? a = b : "070ff8973c14521842a52e19abc27d6c" == this.config.accessToken ? a = c : "040ff8973c14521842a52e19abc27d6c" == this.config.accessToken ? a = d : "eaece33b2cfd6451223c0fc7e7f0220a" == this.config.accessToken ? a = e : "c4fa822bc1dc4b58c66d3e474851bb40" == this.config.accessToken ? a = f : "abeebdf8f0ff52b4debd26ccc80e1226" == this.config.accessToken ? a = g : "46ad6087944ddef20e3046dc5e97a1591" == this.config.accessToken ? a = j : "48332cc40d41d5a53ac20163945119a2" == this.config.accessToken ? a = h : "48332cc40d41d5a53ac20163945119a1" == this.config.accessToken ? a = i : "060ff8973c14521842a52e19abc27a7c" == this.config.accessToken ? a = k : "ec5e6c864b9e12a517caba1238e54b6d" == this.config.accessToken ? a = l : "882dcf4ca02b886ad01f4b1fd7ab5096" == this.config.accessToken && (a = l);
                var m = this;
                VICOMI.Util.addListener(window, "load", function() {
                    VICOMI.AdsClicks.init(a);
                    var b = VICOMI.AdsClicks.count_ads(a);
                    a.length > 0 && m.notifyIframe("ads_count:" + b.count + ":" + b.count_above)
                }), VICOMI.AdsClicks.onAdClick(function(a) {
                    var b = ".vc-ads-wrapper-div" == a.container_id;
                    VICOMI.Util.log(VICOMI.messages.ad_click, 1), m.notifyIframe("ad_click:" + b + ":" + a.is_on_fold)
                })
            },
            watchExternalClicks: function() {
                function a() { VICOMI.Util.log(VICOMI.messages.external_click, 1), b.notifyIframe("external_rec_click") }
                if ("160ff8973c14521842a52e19abc55d6c" == this.config.accessToken || "040ff8973c14521842a52e19abc27d6c" == this.config.accessToken || "eaece33b2cfd6451223c0fc7e7f0220a" == this.config.accessToken || "c4fa822bc1dc4b58c66d3e474851bb40" == this.config.accessToken) {
                    var b = this;
                    VICOMI.ExternalClicks.onClick(".OUTBRAIN", ".ob_container_recs", a), VICOMI.ExternalClicks.onClick(".OUTBRAIN", ".ob-widget-items-container", a)
                }
            },
            getAttr: function(a) { return this.config.container.getAttribute(a) },
            getPubDate: function() {
                var a = this.getAttr(VICOMI.cAttr.publishedTime) || VICOMI.Util.getPageMeta(VICOMI.mTags.articlePublishedTime);
                if ("" == a) {
                    var b = document.getElementsByTagName("article")[0];
                    if (b) {
                        var c = b.getElementsByTagName("time")[0];
                        c && (a = c.getAttribute("datetime"))
                    }
                }
                return a || (a = ""), a
            },
            getAuthor: function() { var a = document.querySelectorAll('[rel="author"]')[0]; return a ? a.innerText : "" },
            displayAds: function(ads_config) {
                var POS = { TOP: "top", BOTTOM: "bottom", BOTTOM_REC: "bottom_rec" },
                    adsPos = ads_config.substr(0, ads_config.indexOf(":"));
                ads_config = ads_config.substr(ads_config.indexOf(":") + 1);
                var injectionMethod = ads_config.substr(0, ads_config.indexOf(":")),
                    ads_script = ads_config.substr(ads_config.indexOf(":") + 1);
                ads_script = VICOMI.Util._unescape(ads_script);
                var script_wrapper = document.createElement("div");
                if (script_wrapper.className = "vc-ads-wrapper-div", script_wrapper.style.textAlign = "center", "default" === injectionMethod) {
                    script_wrapper.innerHTML = ads_script, adsPos === POS.TOP ? this.config.container.insertBefore(script_wrapper, this.iframe) : adsPos !== POS.BOTTOM && adsPos !== POS.BOTTOM_REC || this.config.container.appendChild(script_wrapper);
                    for (var scripts = script_wrapper.getElementsByTagName("script"), i = 0; i < scripts.length; i++)
                        if ("" != scripts[i].src) {
                            var tag = document.createElement("script");
                            tag.src = scripts[i].src, document.getElementsByTagName("head")[0].appendChild(tag)
                        } else eval(scripts[i].innerHTML)
                } else if ("injector" === injectionMethod) {
                    adsPos === POS.TOP ? this.config.container.insertBefore(script_wrapper, this.iframe) : adsPos !== POS.BOTTOM && adsPos !== POS.BOTTOM_REC || this.config.container.appendChild(script_wrapper);
                    var injector = new window.VCInjector;
                    injector.insertScript(script_wrapper, ads_script)
                }
                adsPos === POS.BOTTOM_REC && (script_wrapper.style.opacity = "0", script_wrapper.style.marginTop = "-15px", script_wrapper.style.transitionProperty = "opacity, margin-top", script_wrapper.style.transitionDuration = "0.4s", setTimeout(function() { script_wrapper.style.opacity = "1", script_wrapper.style.marginTop = "0", VICOMI.AdsClicks._containsContainerId(".vc-ads-wrapper-div") && VICOMI.AdsClicks._useContainer(script_wrapper, ".vc-ads-wrapper-div") }, 1e3))
            },
            toggleBackdrop: function() {
                if (this.config.container) {
                    var a = "1",
                        b = document.getElementById("vc-modal-backdrop");
                    if (b) b.parentNode.removeChild(b);
                    else {
                        var c = document.createElement("div");
                        c.id = "vc-modal-backdrop", c.style.cssText = "z-index: 1040;position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 1040;background-color: #000000;opacity:0.5;-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=50)';", this.config.container.appendChild(c), a = "1041"
                    }
                    this.config.container.style.zIndex = a, this.iframe.style.zIndex = a
                }
            },
            toggleIframe: function(a) { var b = this.iframe; "start" == a ? (b.style.height = "100%", b.style.width = "100%", b.style.left = "0", b.style.right = "0", b.style.top = "0", b.style.marginLeft = "0", b.style.bottom = "0") : (b.style.height = "60px", b.style.width = "80px", b.style.left = "0", b.style.right = "auto", b.style.top = "auto", b.style.bottom = this.config.feelbacksPos) },
            removeIframe: function() { this.iframe.parentNode.removeChild(this.iframe) }
        }, VICOMI.Util = {
            _cachedMetaTags: !1,
            serializeUrlParams: function(a) { var b = []; for (var c in a) a.hasOwnProperty(c) && null != a[c] && void 0 != a[c] && "" != a[c] && b.push(c + "=" + encodeURIComponent(a[c])); return b.join("&") },
            getHostname: function(a) { var b = document.createElement("a"); return b.href = a, b.protocol + "//" + b.host },
            matchPageProtocol: function(a) {
                var b = { HTTP: "http:", HTTPS: "https:" },
                    c = location.protocol;
                return c === b.HTTPS && 0 === a.indexOf(b.HTTP) ? a = a.replace(b.HTTP, b.HTTPS) : c === b.HTTP && 0 === a.indexOf(b.HTTPS) && (a = a.replace(b.HTTPS, b.HTTP)), a
            },
            isIE: function() { var a = navigator.userAgent.toLowerCase(); return -1 != a.indexOf("msie") && parseInt(a.split("msie")[1]) },
            getPageMeta: function(a) {
                if (!this._cachedMetaTags) {
                    this._cachedMetaTags = {};
                    for (var b = document.getElementsByTagName("meta"), c = 0; c < b.length; c++) {
                        var d = void 0 != b[c].getAttribute("property") ? b[c].getAttribute("property") : b[c].getAttribute("name"),
                            e = b[c].getAttribute("content");
                        void 0 != this._cachedMetaTags[d] && "" != this._cachedMetaTags[d] || (this._cachedMetaTags[d] = e)
                    }
                }
                return void 0 != this._cachedMetaTags[a] ? this._cachedMetaTags[a] : ""
            },
            isMobileDevice: function() {
                var a = !1;
                return function(b) {
                    (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) && (a = !0)
                }(navigator.userAgent || navigator.vendor || window.opera), a
            },
            _unescape: function(a) {
                var b = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#x27;": "'", "&#39;": "'", "&#x60;": "`", "&#8220;": "“", "&#8221;": "”" },
                    c = "(?:" + ["&amp;", "&lt;", "&gt;", "&quot;", "&#x27;", "&#39;", "&#x60;", "&#8220;", "&#8221;"].join("|") + ")",
                    d = RegExp(c),
                    e = RegExp(c, "g");
                return a = null == a ? "" : "" + a, d.test(a) ? a.replace(e, function(a) { return b[a] }) : a
            },
            addListener: function(a, b, c) { a.addEventListener ? a.addEventListener(b, c) : a.attachEvent && a.attachEvent("on" + b, c) },
            matchesSelector: function(a, b) { var c = a.matches || a.matchesSelector || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector; if (void 0 != c) return c.call(a, b); var d = a.document || a.ownerDocument; if (!d) return !1; for (var e = d.querySelectorAll(b), f = 0; e[f] && e[f] !== a;) f++; return !!e[f] },
            log: function(a, b) { b = b || 0, "undefined" != typeof console && b <= VICOMI.logLevel && console.log(a) }
        }, VCPostMessageService.prototype = {
            listen: function() {
                var a = this;
                VICOMI.Util.log(VICOMI.messages.post_message_origin + this._origin, 1), VICOMI.Util.addListener(window, "message", function(b) { a.onMessage(b) })
            },
            onMessage: function(a) {
                if (VICOMI.Util.log(VICOMI.messages.post_message_receive + "Origin: " + a.origin + ". Data: " + a.data, 1), a.origin === this._origin) {
                    var b = this.parseMessage(a.data);
                    if (b && "vote" != b.event)
                        for (var c = this._messages[b.prefix][b.event], d = 0; d < c.length; d++) c[d](b.data)
                }
            },
            postMessage: function(a, b) { null != this._origin && "" != this._origin && null != b && void 0 != b && (VICOMI.Util.log(VICOMI.messages.post_message_send + a, 1), b.postMessage(a, this._origin)) },
            on: function(a, b, c) { "function" == typeof c && (this._messages[a] || (this._messages[a] = []), this._messages[a][b] || (this._messages[a][b] = []), this._messages[a][b].push(c)) },
            parseMessage: function(a) {
                if ("string" == typeof a && "" !== a) {
                    var b = "";
                    for (var c in this._messages)
                        if (this._messages.hasOwnProperty(c) && a.indexOf(c) > -1) { b = c; break }
                    if ("" == b) return !1;
                    a = a.replace(b, "");
                    var d = a.indexOf(this._delimiter) >= 0 ? a.indexOf(this._delimiter) : a.length;
                    return { event: a.substring(0, d), data: a.substring(d + 1), prefix: b }
                }
            }
        }, VICOMI.Attention = {
            hasAttention: !0,
            _callbacks: [],
            _timeout: null,
            _startDate: null,
            _events: ["click", "scroll", "mousemove", "touchstart", "touchend", "touchcancel", "touchleave", "touchmove"],
            _attentionTimeout: 6e4,
            onChange: function(a) { "function" == typeof a && this._callbacks.push(a) },
            init: function() { this._startTimer(), VICOMI.Visibility.init(), VICOMI.Visibility.visibilitychange(this._onVisibilityChange); for (var a = 0; a < this._events.length; a++) this._addEventHandler(this._events[a]) },
            _onVisibilityChange: function() { VICOMI.Attention._attentionChange(!VICOMI.Visibility.hidden()) },
            _addEventHandler: function(a) { VICOMI.Util.addListener(document, a, this._onAttentionEvent) },
            _onAttentionEvent: function(a) { VICOMI.Attention._attentionChange(!0) },
            _attentionChange: function(a, b) {
                var c = this.hasAttention != a;
                if (this.hasAttention = a, this.hasAttention && this._startTimeout(), c && this.hasAttention && this._startTimer(), !this.hasAttention) {
                    var d = this._getAttentionTime();
                    b && (d -= this._attentionTimeout), this._trigger(d), this._stopTimer()
                }
            },
            _startTimeout: function() { this._stopTimeout(), this._timeout = setTimeout(this._onTimeout, this._attentionTimeout) },
            _stopTimeout: function() { this._timeout && clearTimeout(this._timeout) },
            _onTimeout: function() { VICOMI.Attention._attentionChange(!1, !0) },
            _startTimer: function() { this._startDate = (new Date).getTime() },
            _stopTimer: function() { this._startDate = null },
            _getAttentionTime: function() { if (this._startDate) { return (new Date).getTime() - this._startDate } return 0 },
            _trigger: function(a) { if (a > 0) { VICOMI.Util.log(VICOMI.messages.attention + a, 1); for (var b = 0; b < this._callbacks.length; b++) this._callbacks[b](a) } }
        }, VICOMI.Visibility = {
            q: document,
            p: void 0,
            prefixes: ["webkit", "ms", "o", "moz", "khtml"],
            props: ["VisibilityState", "visibilitychange", "Hidden"],
            m: ["focus", "blur"],
            visibleCallbacks: [],
            hiddenCallbacks: [],
            genericCallbacks: [],
            _callbacks: [],
            cachedPrefix: "",
            fn: null,
            onVisible: function(a) { "function" == typeof a && this.visibleCallbacks.push(a) },
            onHidden: function(a) { "function" == typeof a && this.hiddenCallbacks.push(a) },
            getPrefix: function() {
                if (!this.cachedPrefix)
                    for (var a = 0; b = this.prefixes[a++];)
                        if (b + this.props[2] in this.q) return this.cachedPrefix = b, this.cachedPrefix
            },
            visibilityState: function() { return this._getProp(0) },
            hidden: function() { return this._getProp(2) },
            visibilitychange: function(a) {
                "function" == typeof a && this.genericCallbacks.push(a);
                var b = this.genericCallbacks.length;
                if (b)
                    if (this.cachedPrefix)
                        for (; b--;) this.genericCallbacks[b].call(this, this.visibilityState());
                    else
                        for (; b--;) this.genericCallbacks[b].call(this, arguments[0])
            },
            isSupported: function(a) { return this._getPropName(2) in this.q },
            _getPropName: function(a) { return "" == this.cachedPrefix ? this.props[a].substring(0, 1).toLowerCase() + this.props[a].substring(1) : this.cachedPrefix + this.props[a] },
            _getProp: function(a) { return this.q[this._getPropName(a)] },
            _execute: function(a) { if (a) { this._callbacks = 1 == a ? this.visibleCallbacks : this.hiddenCallbacks; for (var b = this._callbacks.length; b--;) this._callbacks[b]() } },
            _visible: function() { VICOMI.Util.log(VICOMI.messages.visibility_visible, 1), VICOMI.Visibility._execute(1), VICOMI.Visibility.visibilitychange.call(VICOMI.Visibility, "visible") },
            _hidden: function() { VICOMI.Util.log(VICOMI.messages.visibility_hidden, 1), VICOMI.Visibility._execute(2), VICOMI.Visibility.visibilitychange.call(VICOMI.Visibility, "hidden") },
            _nativeSwitch: function() { this[this._getProp(2) ? "_hidden" : "_visible"]() },
            _listen: function() { try { this.isSupported() ? this.q.addEventListener(this._getPropName(1), function() { VICOMI.Visibility._nativeSwitch.apply(VICOMI.Visibility, arguments) }, 1) : this.q.addEventListener ? (window.addEventListener(this.m[0], this._visible, 1), window.addEventListener(this.m[1], this._hidden, 1)) : this.q.attachEvent && (this.q.attachEvent("onfocusin", this._visible), this.q.attachEvent("onfocusout", this._hidden)) } catch (a) {} },
            init: function() { this.getPrefix(), this._listen() }
        }, VICOMI.AdsClicks = {
            isOverAdContainer: !1,
            currentAdContainerActive: !1,
            _adsContainersIds: [],
            _callbacks: [],
            init: function(a) {
                this._adsContainersIds = a, VICOMI.Util.log("Vicomi: " + this._adsContainersIds.length + " containers to check.", 1);
                for (var b = 0; b < this._adsContainersIds.length; b++) {
                    var c = this._adsContainersIds[b],
                        d = this._getContainer(c);
                    if (d)
                        if (d.length)
                            for (var e = 0; e < d.length; e++) VICOMI.AdsClicks._useContainer(d[e], c);
                        else VICOMI.AdsClicks._useContainer(d, c);
                    else VICOMI.Util.log("Vicomi: Ad container can't be found - " + c, 1)
                }
                VICOMI.Util.addListener(window, "beforeunload", function(a) { VICOMI.Util.log("Vicomi: Before unload. Checking if need to trigger.", 1), VICOMI.AdsClicks.isOverAdContainer && VICOMI.AdsClicks._triggerAdClick() }), VICOMI.Visibility.onHidden(function() { VICOMI.Util.log("Vicomi: Hidden. Checking if need to trigger.", 1), VICOMI.AdsClicks.isOverAdContainer && VICOMI.AdsClicks._triggerAdClick() })
            },
            onAdClick: function(a) { "function" == typeof a && this._callbacks.push(a) },
            _getContainer: function(a) { var b; if (0 === a.indexOf(".")) try { b = document.querySelectorAll ? document.querySelectorAll(a) : document.querySelector(a) } catch (b) { VICOMI.Util.log("Vicomi Error: Unsupported query selector - " + a, 1) } else b = document.getElementById(a); return b },
            _containsContainerId: function(a) { return -1 != this._adsContainersIds.indexOf(a) },
            _useContainer: function(a, b) { VICOMI.Util.log("Vicomi: Ad container detected - " + b, 1), VICOMI.Util.addListener(a, "mouseover", function(a) { VICOMI.Util.log("Vicomi: Mouse is over ad container - ", 1), VICOMI.AdsClicks.isOverAdContainer = !0, VICOMI.AdsClicks.currentAdContainerActive = b }), VICOMI.Util.addListener(a, "mouseout", function(a) { VICOMI.Util.log("Vicomi: Mouse is exit ad container - ", 1), VICOMI.AdsClicks.isOverAdContainer = !1 }) },
            _triggerAdClick: function() {
                VICOMI.Util.log("Vicomi Debug: Trigger click. Callbacks: " + this._callbacks.length, 1);
                for (var a = 0; a < this._callbacks.length; a++) {
                    var b = document.body.scrollTop || 0,
                        c = void 0 !== window.innerHeight ? window.innerHeight : document.documentElement.clientHeight,
                        d = this._getContainer(VICOMI.AdsClicks.currentAdContainerActive).getBoundingClientRect().top + b < c,
                        e = { container_id: VICOMI.AdsClicks.currentAdContainerActive, is_on_fold: d };
                    this._callbacks[a](e)
                }
            },
            count_ads: function(a) {
                var b = {};
                b.count = 0, b.count_above = 0;
                for (var c = 0; c < a.length; c++) {
                    var d = this._getContainer(a[c]);
                    if (void 0 != d && d.offsetHeight > 0) {
                        b.count++;
                        var e = document.body.scrollTop || 0,
                            f = void 0 !== window.innerHeight ? window.innerHeight : document.documentElement.clientHeight;
                        d.getBoundingClientRect().top + e < f && b.count_above++
                    }
                }
                return b
            }
        }, VICOMI.ExternalClicks = {
            _containersSelectors: [],
            _checkSelector: function(a, b, c) {
                var d = a.target || a.srcElement;
                if (!VICOMI.Util.matchesSelector(d, c) && d !== a.currentTarget) {
                    for (; !VICOMI.Util.matchesSelector(d, c);)
                        if ((d = d.parentNode) === a.currentTarget) return;
                    for (var e = this._containersSelectors[b][c] || [], f = 0; f < e.length; f++) e[f]()
                }
            },
            _click: function(a, b) {
                var c = this._containersSelectors[b],
                    d = this;
                for (var e in c) c.hasOwnProperty(e) && d._checkSelector(a, b, e)
            },
            _bind: function(a) {
                var b = [];
                if (document.querySelectorAll) b = document.querySelectorAll(a);
                else {
                    var c = document.querySelector(a);
                    c && b.push(c)
                }
                if (0 !== b.length)
                    for (var d = this, e = 0; e < b.length; e++) {
                        var f = b[e];
                        VICOMI.Util.addListener(f, "click", function(b) { d._click(b, a) })
                    }
            },
            onClick: function(a, b, c) {
                var d = !1;
                this._containersSelectors[a] ? d = !0 : this._containersSelectors[a] = {}, this._containersSelectors[a][b] || (this._containersSelectors[a][b] = []), "function" == typeof c && this._containersSelectors[a][b].push(c), d || this._bind(a)
            }
        }, innerVCInjector.prototype.writesQueue = [], VCScroll.prototype = {
            onInView: function(a) { "function" == typeof a && this._inViewCallbacks.push(a), this._isInit || this.init() },
            onScrollEnd: function(a) { "function" == typeof a && this._scrollToEndCallbacks.push(a), this._isInit || this.init() },
            init: function() {
                if (this._isInit = !0, this._element) {
                    var a = this;
                    VICOMI.Util.addListener(window, "scroll", function(b) { a._onScroll() })
                }
            },
            _onScroll: function() {
                var a = this.getScroll();
                if (this._currentScroll < a) {
                    var b = this.getDistanceFromTop(this._element),
                        c = parseInt(this._element.style.height),
                        d = void 0 !== window.innerHeight ? window.innerHeight : document.getElementsByTagName("body")[0].clientHeight;
                    this._scrollToEndCallbacks.length > 0 && this.checkScrollEnd(a, b, c, d), this._inViewCallbacks.length > 0 && this.checkInView(a, b, c, d)
                }
                this._currentScroll = a
            },
            checkScrollEnd: function(a, b, c, d) {
                var e = b + c - (d + a);
                (e <= this._scrollOffset || e < 0) && this._currentRange >= 0 && this._trigger(this._scrollToEndCallbacks, !0), _currentRange = e
            },
            checkInView: function(a, b, c, d) { if (!this._inViewSent && this._inViewCallbacks.length > 0) { b - (d + a) <= this._scrollOffset && (this._inViewSent = !0, this._trigger(this._inViewCallbacks, !1)) } },
            _trigger: function(a, b) {
                if (a && a.length > 0)
                    if (b) {
                        if (!this._waiting && this._enabled) {
                            this._waiting = !0;
                            var c = this;
                            setTimeout(function() { c._waiting = !1 }, 300);
                            for (var d = 0; d < a.length; d++) a[d]()
                        }
                    } else
                        for (var d = 0; d < a.length; d++) a[d]()
            },
            getDistanceFromTop: function(a) {
                var b = a.getBoundingClientRect(),
                    c = document.body,
                    d = document.documentElement,
                    e = this.getScroll(),
                    f = d.clientTop || c.clientTop || 0,
                    g = b.top + e - f;
                return Math.round(g)
            },
            getScroll: function() {
                var a = document.body,
                    b = document.documentElement;
                return window.pageYOffset || b.scrollTop || a.scrollTop
            },
            enable: function() { this._enabled = !0 },
            disable: function() { this._enabled = !1 }
        }, VICOMI.init()
    } catch (a) { "undefined" != typeof console && console.log("Vicomi Error: " + a) }
}();