;(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (window) {
    function extend(target, options) {
        for (var key in options) {
            target[key] = options[key];
        }
        return target;
    }
    function offset(el){
        var h, t = 0;

        h = el.offsetHeight;
        while(el.offsetParent){
            t += el.offsetTop;
            el = el.offsetParent;
        }

        return {top: t, height: h};
    }

    // 要加载的图片是不是在指定窗口内
    function inViewport(el, h) {
        // 当前窗口的顶部
        var top = window.pageYOffset,
        // 当前窗口的底部
            btm = window.pageYOffset + window.innerHeight,

        // 元素所在整体页面内的y轴位置
            elTop = offset(el).top,
            elBottom = elTop + offset(el).height;

        // 判断元素，是否在当前窗口，或者当前窗口延伸400像素内
        return (elTop >= top && elTop - h <= btm) || (elBottom + h >= top && elBottom <= btm);
    }
    function loadImage(url, cb) {
        var img = new Image();

        img.src = url;

        // 如果图片已经存在于浏览器缓存，直接调用回调函数
        if(img.complete) {

            cb && cb();
            img = null;
            return;
        }

        img.onload = function(){
            cb && cb();
            img = null;
        };
    }

    function lazyLoad(settings) {
        this.options = {
            container: "body",
            selectorName: "img",
            animate: true,
            extend_height: 0,
            realSrcAtr: "data-src"
        };

        // 合并对象
        extend(this.options, settings);

        this.init();
    }

    lazyLoad.prototype.init = function(){
        var that = this;
        that.refresh();

        window.addEventListener('scroll', function(){that.refresh();}, false);
        window.addEventListener('resize', function(){that.refresh();}, false);
    };

    lazyLoad.prototype.refresh = function(){
        var container       =   this.options.container,
            selectorName    =   this.options.selectorName,
            realSrcAtr      =   this.options.realSrcAtr,
            animate         =   this.options.animate,
            extend_height   =   this.options.extend_height;

        // 滚动事件里判断，加载图片
        function check(){
            var selector = document.querySelectorAll(container + ' ' + selectorName);
            for(var i=0,len=selector.length; i < len;i++ ) {
                var el = selector[i];

                if (!el.getAttribute(realSrcAtr) || !inViewport(el, extend_height)) {
                    continue;
                }

                act(el);

            }
        }

        // 展示图片
        function act(el) {
            // 已经加载过了，则中断后续代码
            if (el.getAttribute('lazyImgLoaded')) return;

            var original = el.getAttribute(realSrcAtr);

            if( !animate ) {
                if( el.tagName.toLocaleLowerCase() == "img"){
                    el.setAttribute('src', original);
                }else{
                    el.style.backgroundImage = original;
                }
                el.setAttribute('lazyImgLoaded', true);
            }else{
                el.style.opacity = .2;
                el.style.webkitTransition = el.style.transform = 'opacity .28s';
                // 预加载
                loadImage(original, function(){
                    if( el.tagName.toLocaleLowerCase() == "img"){
                        el.setAttribute('src', original);
                    }else{
                        el.style.backgroundImage = original;
                    }
                    el.setAttribute('lazyImgLoaded', true);

                    el.style.opacity = 1;
                });
            }
        }

        check();
    };

    return window.lazyLoad = lazyLoad;
});




