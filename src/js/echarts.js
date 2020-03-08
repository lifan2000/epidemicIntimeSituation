var echarts = require('echarts');
import china from '../../node_modules/echarts/map/json/china.json';
echarts.registerMap('china', china);
var statisticsData = []; //这是我自己建的空数组，为了把异步拿到的数据push进去
$.ajax({
  type: 'get',
  async: true, //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
  url: 'https://lab.isaaclin.cn/nCoV/api/area', //请求发送到相应的Django
  dataType: 'json',
  success: function (data) {
    if (data) {
      var dataBox = data.results;
      var dataStage = $.grep(dataBox, function (obj) {
        return obj.countryName === '中国';
      });
      var confirmedNumber = 0;
      var currentConfirmedNumer = 0;
      var healthNumber = 0;
      var suspectNumber = 0;
      var deadNumber = 0;

      for (var i in dataStage) {
        var statisticsObj = {
          name: '',
          value: '',
        }; //因为ECharts里边需要的的数据格式是这样的

        statisticsObj.name = dataStage[i].provinceShortName;
        statisticsObj.value = dataStage[i].confirmedCount;
        confirmedNumber += dataStage[i].confirmedCount;
        currentConfirmedNumer += dataStage[i].currentConfirmedCount;
        healthNumber += dataStage[i].curedCount;
        suspectNumber += dataStage[i].suspectedCount;
        deadNumber += dataStage[i].deadCount;
        statisticsData.push(statisticsObj); //把拿到的异步数据push进我自己建的数组里
      }

      $('.confirm .number').text(confirmedNumber);
      $('.nowConfirm .number').text(currentConfirmedNumer);
      $('.heal .number').text(healthNumber);
      $('.dead .number').text(deadNumber);
      $('.suspect .number').text(suspectNumber);
      let optionMap = {
        backgroundColor: '#FFFFFF',
        tooltip: {
          trigger: 'item',
        },
        visualMap: {
          show: false,
          x: 'right',
          y: 'center',
          splitList: [{
              start: 10000,
            },
            {
              start: 1000,
              end: 9999,
            },
            {
              start: 500,
              end: 999,
            },
            {
              start: 100,
              end: 499,
            },
            {
              start: 10,
              end: 99,
            },
            {
              start: 1,
              end: 9,
            },
            {
              start: 0,
              end: 0,
            },
          ],
          color: [
            '#9c0a0e',
            '#c91014',
            '#e64a47',
            '#fe8663',
            '#ffd2a0',
            '#ffefd7',
            '#e3ebf4',
          ],
        },
        series: [{
          name: '确诊人数',
          type: 'map',
          mapType: 'china',
          zoom: 1.15,
          top: '70',
          // left:'30',
          roam: false,
          label: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 11,
              },
            },
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#b9b7b6', //区域边框颜色
              //areaColor:"#d5ecff",  区域颜色
            },
            emphasis: {
              show: true,
            },
          },
          data: statisticsData,
        }, ],
      };
      let chart = echarts.init(document.getElementById('chmap'));
      chart.setOption(optionMap);
    }
  },
});
console.log('hi');
