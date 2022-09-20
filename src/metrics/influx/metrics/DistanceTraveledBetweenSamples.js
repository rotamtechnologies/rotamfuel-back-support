const InfluxBaseMetric = require("../influxBaseMetric");
const { filterData, calculateDistanceWithTimeSpeed } = require("../kpi");

class DistanceTraveledBetweenSamplesMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "distance_traveled_between_samples_metric";
  }

  buildMetricParams() {
    return {
      _measurements: ["vehicle_speed", "cumulativetime"],
    };
  }

  buildMetricResponse(datapoints) {

    const time = []
    const speed = []

    const filteredData = filterData(datapoints)

    filteredData.forEach(datapoint => {
      time.push(datapoint['cumulativetime'] || 0)
      speed.push(datapoint['vehicle_speed'] || 0)
    })

    let datapointsWithTimeAndDistance = calculateDistanceWithTimeSpeed(time, speed);

    datapointsWithTimeAndDistance = datapointsWithTimeAndDistance.map(datapoint => ({
      x: datapoint.time,
      y: datapoint.distance
    }));
    return super.buildMetricResponse(datapointsWithTimeAndDistance);
  }
}

module.exports = DistanceTraveledBetweenSamplesMetric;
