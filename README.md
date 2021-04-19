# 项目介绍
项目技术栈为jquery+HTML5+sass，使用的数据可视化库是echarts，打包工具为webpack。页面中列出了中国疫情现状数据和中国各省疫情可视化地图，地图可实现”现有疫情“和”累计确诊“两种模式的切换，鼠标移动到各省市即可显示具体数据。npm start正常启动后更新代码，页面可以实现同步更新。

可实现疫情地图实现代码位于/src/js/echarts.js；实现随浏览器宽度等比例缩放页面以及切换地图时按钮样式等其他前端交互效果的代码位于/src/js/front.js，均做了较为详细的中文注释可供参考，webpack详细配置位于/webpack.config.js。

注意：启动后由于接口响应时间较长，所以需要等待20s-30s左右拿到数据

项目参考架构为：https://github.com/xxhomey19/bootstrap-webpack-jquery-boilerplate.git

使用的接口地址为：https://lab.isaaclin.cn/nCoV/api/area

对接口感兴趣的同学可以前往：https://lab.isaaclin.cn/nCoV/zh
了解接口项目和原作者

#### 开箱方法
在新建的文件夹下使用：

`git clone https://github.com/lifan2000/epidemicIntimeSituation/security/dependabot

cd epidemicIntimeSituation

yarn install（或npm install）

npm start`

三条命令完成后即自行在浏览器启动本地8080端口。

# 项目相关知识延伸
## 数据可视化
数据可视化可分为两大类，一类是面向开发者的可视化库，如D3和Echarts等；因一类是面向分析师和一般使用者的可视化Grafana、Superset 等。
这篇文章有详细介绍各大面向开发者的可视化库的优缺点和来源，涨知识了，分享给大家：[如何挑选数据可视化框架及平台——前端篇](https://zhuanlan.zhihu.com/p/149398216)
## Echarts
本次项目使用的echarts由百度商业前端团队研发，在 2018 年进入 Apache 孵化器。官方文档比较详尽且实例也很好上手，推荐：
[五分钟上手echarts快速入门](https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)。

## HTML canvas元素和 WebGL 绘制 3D 图形
echarts实现了根据设定的参数在指定id的canvas元素作画的功能。创建原生的canvas需要设置其 width 和 height 属性，这样才能告诉浏览器在多大面积上绘图。出现在开始和结束标签之间的内容是后备数据，会在浏览器不支持canvas元素时显示。比如：

`<canvas id="drawing" width="200" height="200">A drawing of something.</canvas>`

与其他元素一样，width 和 height 属性也可以在 DOM 节点上设置，因此可以随时修改。整个元素还可以通过 CSS 添加样式，并且元素在添加样式或实际绘制内容前是不可见的。
要在画布上绘制图形，首先要取得绘图上下文。使用 getContext()方法可以获取对绘图上下文的引用。对于平面图形，需要给这个方法传入参数"2d"，表示要获取 2D 上下文对象：
```
let drawing = document.getElementById("drawing");
// 确保浏览器支持<canvas> 
if (drawing.getContext) {
let context = drawing.getContext("2d");
// 其他代码
}
```
使用canvas元素时，最好先测试一下 getContext()方法是否存在。有些浏览器对 HTML 规范中没有的元素会创建默认 HTML 元素对象。这就意味着即使 drawing 包含一个有效的元素引用， getContext()方法也未必存在。
可以使用 toDataURL()方法导出canvas元素上的图像。这个方法接收一个参数：要生成图像的 MIME 类型（与用来创建图形的上下文无关）。例如，要从画布上导出一张 PNG 格式的图片，可以这样做：
```
let drawing = document.getElementById("drawing");
// 确保浏览器支持canvas
if (drawing.getContext) {
    // 取得图像的数据 URI
    let imgURI = drawing.toDataURL("image/png");
    // 显示图片
    let image = document.createElement("img"); image.src = imgURI; document.body.appendChild(image);
}
```
浏览器默认将图像编码为 PNG 格式，除非另行指定。Firefox 和 Opera 还支持传入"image/jpeg" 进行 JPEG 编码。因为这个方法是后来才增加到规范中的，所以支持的浏览器也是在后面的版本实现的， 包括 IE9、Firefox 3.5 和 Opera 10……
canvas元素常用于生成海报、绘制图像等功能，其余详细介绍可见[菜鸟教程](https://www.runoob.com/w3cnote/html5-canvas-intro.html)或《js高级程序设计》第十八章。

觉得与canvas有关的比较有意思的项目推荐：
[HTML5canvas实现绘图板](https://www.html5tricks.com/html5-canvas-draw.html)、[小程序如何生成海报分享朋友圈](https://blog.csdn.net/sinat_17775997/article/details/95077527?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_baidulandingword-3&spm=1001.2101.3001.4242)
