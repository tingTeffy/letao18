$(function() {
  var lt = new letao();
  lt.initScroll();
  lt.getCategoryleft();
  lt.getCategoryRight();
});

var letao = function() {};

letao.prototype = {
  initScroll: function() {
    var options = {
      scrollY: true, //是否竖向滚动
      scrollX: false, //是否横向滚动
      startX: 0, //初始化时滚动至x
      startY: 0, //初始化时滚动至y
      indicators: true, //是否显示滚动条
      deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
      bounce: true //是否启用回弹
    };
    mui(".mui-scroll-wrapper").scroll({ options });
  },
  getCategoryleft: function() {
    $.ajax({
      url: "/category/queryTopCategory",
      success: function(data) {
        var html = template("cateogoryLeft", data);
        $(".category-left ul").html(html);
      }
    });
  },
  getCategoryRight: function() {
    getRightData(1);
    $(".category-left ul").on('click','a',function(e){
        //获取当前a元素给添加一个
        $(e.target.parentNode).addClass('avatar').siblings().removeClass("avatar");
        var id=e.target.dataset['id'];
        console.log(id);
        getRightData(id);
    })
    function getRightData(id) {
      $.ajax({
        url: "/category/querySecondCategory",
        data: { id: id },
        success: function(data) {
            console.log(data);
          var html = template("cateogoryRight", data);
          if(html){
            $(".category-right .mui-row").html(html);
          }else{
            $(".category-right .mui-row").html("<h5>没有数据</h5>");
          }
          
        }
      });
    }
  }
};
