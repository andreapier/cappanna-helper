import Chartist from "chartist";

const dailySalesChart = {
  data: {
    labels: ["19", "20", "21", "22", "23", "24", "01"],
    series: [
      [12, 17, 7, 17, 23, 18, 38],
      [6, 8, 3, 8, 11, 9, 19],
      [3, 4, 1, 4, 5, 4, 9],
      [1, 2, 0, 2, 2, 2, 4]
    ]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 50,
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 300,
            dur: 300,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      }
    }
  }
};

export default dailySalesChart;
