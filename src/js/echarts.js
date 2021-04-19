let echarts = require("echarts"); // 引入安装好的echarts依赖
import china from "../../node_modules/echarts/map/json/china.json"; // 从echarts依赖中导入中国的模板
echarts.registerMap("china", china);
function loadMap(currentMapType) {
  $.ajax({
    type: "get",
    async: true, // 需要使用异步请求
    url: "https://lab.isaaclin.cn/nCoV/api/area", //请求发送到相应的接口url
    dataType: "json",
    success: function(data) {
      if (data) {
        let statisticsData = []; //建空数组，把异步拿到的数据push进去
        let dataBox = data.results;
        let dataStage = $.grep(dataBox, function(obj) {
          // 筛选出国名为中国且城市不为空的子对象们放入dataStage中
          return obj.countryName === "中国" && obj.cities;
        });
        let confirmedNumber = 0; // 以下为页面中间数量统计部分
        let currentConfirmedNumer = 0;
        let healthNumber = 0;
        let suspectNumber = 0;
        let deadNumber = 0;
        let highDangerNumber = 0;
        //因为ECharts里边需要的的数据格式是这样的，所以需要简单的做一个处理
        for (let i in dataStage) {
          let statisticsObj = {
            name: "",
            value: ""
          };
          statisticsObj.name = dataStage[i].provinceShortName;
          if (currentMapType == 0) {
            statisticsObj.value = dataStage[i].currentConfirmedCount;
          } else if (currentMapType == 1) {
            statisticsObj.value = dataStage[i].confirmedCount;
          }
          statisticsData.push(statisticsObj);
          confirmedNumber += dataStage[i].confirmedCount;
          currentConfirmedNumer += dataStage[i].currentConfirmedCount;
          healthNumber += dataStage[i].curedCount;
          suspectNumber += dataStage[i].suspectedCount;
          deadNumber += dataStage[i].deadCount;
          for (highDangerCount in dataStage.cities) {
            highDangerNumber += highDangerCount;
          }
        }
        console.log(statisticsData, "statisticsData");
        let optionMap = {
          // 指定图表的配置项和数据
          backgroundColor: "#FFFFFF",
          tooltip: {
            trigger: "item"
          },
          visualMap: {
            show: false,
            x: "right",
            y: "center",
            splitList: [
              {
                start: 10000
              },
              {
                start: 1000,
                end: 9999
              },
              {
                start: 500,
                end: 999
              },
              {
                start: 100,
                end: 499
              },
              {
                start: 10,
                end: 99
              },
              {
                start: 1,
                end: 9
              },
              {
                start: 0,
                end: 0
              }
            ],
            color: [
              "#9c0a0e",
              "#c91014",
              "#e64a47",
              "#fe8663",
              "#ffd2a0",
              "#ffefd7",
              "#e3ebf4"
            ]
          },
          series: [
            {
              name: "确诊人数",
              type: "map",
              mapType: "china",
              zoom: 1.15,
              top: "70",
              // left:'30',
              roam: false,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 11
                  }
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: "#fff" //区域边框颜色
                },
                emphasis: {
                  show: true
                }
              },
              data: statisticsData
            }
          ]
        };
        let chart = echarts.init(document.getElementById("chmap")); //基于准备好的dom chmap，初始化echarts实例
        chart.setOption(optionMap); //使用刚指定的配置项和数据显示图表。
        $(".confirm .number").text(confirmedNumber);
        $(".nowConfirm .number").text(currentConfirmedNumer);
        $(".heal .number").text(healthNumber);
        $(".dead .number").text(deadNumber);
        $(".suspect .number").text(suspectNumber);
        $(".highDanger .number").text(highDangerNumber);
      }
    }
  });
}
loadMap(0);
$(".chinamapbtns").click(function() {
  $(".chinamapbtns span").each(function(i, o) {
    if ($(o).hasClass("current")) loadMap(i);
  });
});
