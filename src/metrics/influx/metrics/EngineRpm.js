const InfluxBaseMetric = require("../influxBaseMetric");
const { filterData, calculateDistance } = require("../kpi");
class EngineMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "engine_metric";
  }

  buildMetricParams() {
    return {
      _measurements: ["engine_rpm", "vehicle_speed", "cumulativetime"],
    };
  }

  buildMetricResponse(datapoints) {

    const timeSeconds = []
    const speed = []
    const engineRpm = []

    const filteredData = filterData(datapoints)

    filteredData.forEach(datapoint => {
      timeSeconds.push(datapoint['cumulativetime'] || 0)
      speed.push(datapoint['vehicle_speed'] || 0)
      engineRpm.push(datapoint['engine_rpm'] || 0)
    })

    const distance = calculateDistance(timeSeconds, speed);

    const engineRpmData = engineRpm.map((datapoint, index) => {
      return {
        x: distance[index],
        y: datapoint
      }
    })

    return super.buildMetricResponse(engineRpmData);
  }
}

module.exports = EngineMetric;