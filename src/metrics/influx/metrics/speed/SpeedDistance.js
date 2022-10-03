const InfluxBaseMetric = require("../../influxBaseMetric");
const { filterData, calculateDistance } = require("../../kpi");
class SpeedDistanceMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "speed_distance_metric";
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

    const distance = calculateDistance(timeSeconds, speed);

    const speedData = speed.map((datapoint, index) => {
      return {
        x: distance[index],
        y: datapoint
      }
    })

    return super.buildMetricResponse(speedData);
  }
}

module.exports = SpeedDistanceMetric;