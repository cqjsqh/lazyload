# lazyload.js
一个轻量的图片懒加载插件
-----------------------------------

调用方法：
```
  <img class="lazy"  data-src="***.jpg" />
```
```
<script>
    lazyLoad({
      container: "body",
      selectorName: "img.lazy"
    });
</script>
```

参数说明： 
-   container       容器，默认"body"
-   selectorName    标签，默认"img"
-   animate         是否开启加载动画，默认true
-   extend_height   提前加载的距离，默认0
-   realSrcAtr      获取真实图片URL的属性，默认"data-src"
