// 当浏览器屏幕宽度改变时触发的页面等比例伸缩
function scale() {
  var num = 750;
  var oWidth = $(window).width();
  var lxl = oWidth / num;
  var height = $(window).height() / 1.5 / lxl;
  var scaleContainer = $("#scaleContainer");
  var scalePop = $(".pop_ds");
  if (lxl < 1) {
    scaleContainer.css("transform", "scale(" + lxl + ")");
    scalePop.css({
      transform: "scale(" + lxl + ") translate(-50%, -50%)",
      height: height
    });
  } else {
    scalePop.css({
      height: "400px"
    });
  }
}
$(function() {
  scale();
  window.onresize = scale;
});

// 点击指定图标时出现数据来源
$(function() {
  $(".dataSource").click(function() {
    $(".pop_ds").css({
      display: "block"
    });
    $(".ds_mask").css("display", "block");
  });
});
$(function() {
  $(".icon_close").click(function() {
    $(".pop_ds").css("display", "none");
    $(".ds_mask").css("display", "none");
  });
});

// ”现有确诊“和”累计确诊“两种模式地图的切换
$(function() {
  $(".chinamapbtns span").click(function() {
    $(this).addClass("current");
    $(this)
      .siblings()
      .removeClass("current");
  });
});
