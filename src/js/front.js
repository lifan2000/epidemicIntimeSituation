//scale while screen size change
$(function() {
  var num = 750;
  var oWidth = $(window).width();
  var lxl = oWidth / num;
  var scaleContainer = $('#scaleContainer');
  var height = $(window).height() / 1.5 / lxl;
  var scalePop = $('.pop_ds');
  if (lxl < 1) {
    scaleContainer.css('transform', 'scale(' + lxl + ')');
    scalePop.css({
      transform: 'scale(' + lxl + ') translate(-50%, -50%)',
      height: height,
    });
  } else {
    scalePop.css({
      height: '400px',
    });
  }
  window.onresize = function() {
    var num = 750;
    var oWidth = $(window).width();
    var lxl = oWidth / num;
    var height = $(window).height() / 1.5 / lxl;
    var scaleContainer = $('#scaleContainer');
    var scalePop = $('.pop_ds');
    if (lxl < 1) {
      scaleContainer.css('transform', 'scale(' + lxl + ')');
      scalePop.css({
        transform: 'scale(' + lxl + ') translate(-50%, -50%)',
        height: height,
      });
    } else {
      scalePop.css({
        height: '400px',
      });
    }
  };
});

//show detail data source
$(function() {
  $('.dataSource').click(function() {
    $('.pop_ds').css({
      display: 'block',
    });
    $('.ds_mask').css('display', 'block');
  });
});
$(function() {
  $('.icon_close').click(function() {
    $('.pop_ds').css('display', 'none');
    $('.ds_mask').css('display', 'none');
  });
});

$(function() {
  $('.chinamapbtns span').click(function() {
    $(this).css();
  });
});
