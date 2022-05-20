const InfluxBaseMetric = require("../influxBaseMetric");
const { calculateDistance } = require("../kpi");

class DistanceTraveledBetweenSamplesMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "distance_traveled_between_samples_metric";
  }

  buildMetricParams() {
    return {
      _measurements: ["vehicle_speed", "deltatime"],
    };
  }

  buildMetricResponse(datapoints) {
    let datapointsWithTimeAndDistance = calculateDistance(datapoints);
    datapointsWithTimeAndDistance = datapointsWithTimeAndDistance.map(datapoint => ({
      x: datapoint.time,
      y: datapoint.distance
    }));
    return super.buildMetricResponse(datapointsWithTimeAndDistance);
  }
}

module.exports = DistanceTraveledBetweenSamplesMetric;
