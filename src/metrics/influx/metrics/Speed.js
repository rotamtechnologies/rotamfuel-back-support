const InfluxBaseMetric = require("../influxBaseMetric");

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
    let speedData = [];
    datapoints.forEach(datapoint => {
      speedData.push({
        x: datapoint._time,
        y: datapoint._value
      });
    });

    return super.buildMetricResponse(speedData);
  }
}

module.exports = SpeedMetric;