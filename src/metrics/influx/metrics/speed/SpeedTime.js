const InfluxBaseMetric = require("../../influxBaseMetric");
const { filterData } = require("../../kpi");
class SpeedTimeMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "speed_time_metric";
  }

  buildMetricParams() {
    return {
      _measurements: ["vehicle_speed", "cumulativetime"],
    };
  }

  buildMetricResponse(datapoints) {

    const timeSeconds = []
    const speed = []

    const filteredData = filterData(datapoints)

    filteredData.forEach(datapoint => {
      timeSeconds.push(datapoint['cumulativetime'] || 0)
      speed.push(datapoint['vehicle_speed'] || 0)
    })

    const time = timeSeconds.map(time => time / 3600);

    const speedData = speed.map((datapoint, index) => {
      return {
        x: time[index],
        y: datapoint
      }
    })

    return super.buildMetricResponse(speedData);
  }
}

module.exports = SpeedTimeMetric;