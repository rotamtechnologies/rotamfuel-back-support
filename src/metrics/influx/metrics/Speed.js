const InfluxBaseMetric = require("../influxBaseMetric");
const { filterData } = require("../kpi");
class SpeedMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "speed_metric";
  }

  buildMetricParams() {
    return {
      _measurements: ["vehicle_speed"],
    };
  }

  buildMetricResponse(datapoints) {

    const filteredData = filterData(datapoints)

    let speedData = [];
    filteredData.forEach(datapoint => {
      speedData.push({
        x: datapoint.ts,
        y: datapoint.vehicle_speed
      });
    });

    return super.buildMetricResponse(speedData);
  }
}

module.exports = SpeedMetric;