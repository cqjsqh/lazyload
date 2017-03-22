# lazyload
懒加载（原生）

调用方法：

<!DOCTYPE html>
<html>
  <head>
      <meta charset="UTF-8">
      <title>lazyload Demo</title>
  </head>
  <body>
    <img  data-src="***.jpg" />

    <script>
      lazyLoad({
        container: "body",
        selectorName: "img"
      });
    </script>
  </body>
</html>

参数说明： 
  container     容器\n
  selectorName  标签，默认img\n
  animate       是否开启加载动画\n
  extend_height 提前加载的距离
  realSrcAtr    获取真实图片URL的属性，默认data-src
