const InfluxBaseMetric = require("../influxBaseMetric");
const { filterData } = require("../kpi");
class EngineMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "engine_metric";
  }

  buildMetricParams() {
    return {
      _measurements: ["engine_rpm"],
    };
  }

  buildMetricResponse(datapoints) {

    const filteredData = filterData(datapoints)

    let engineData = [];
    filteredData.forEach(datapoint => {
      engineData.push({
        x: datapoint.ts,
        y: datapoint.engine_rpm
      });
    });

    return super.buildMetricResponse(engineData);
  }
}

module.exports = EngineMetric;