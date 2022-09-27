const InfluxBaseMetric = require("../../influxBaseMetric");
const { 
  filterData, 
  calculateAccumulatedFuelMass
} = require("../../kpi");

class FlowFuelTimeMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "flow_fuel_time_metric";
  }

  buildMetricParams() {
    return {
      _measurements: ["maf_air_flows_rate", "cumulativetime"],
    };
  }

  buildMetricResponse(datapoints) {

    const timeSeconds = []
    const maf = []

    const filteredData = filterData(datapoints)

    filteredData.forEach(datapoint => {
      timeSeconds.push(datapoint['cumulativetime'] || 0)
      maf.push(datapoint['maf_air_flows_rate'] || 0)
    })

    const fuelMass = calculateAccumulatedFuelMass(maf, null);

    const fuelFlowData = fuelMass.map((datapoint, index) => {
      return {
        x: timeSeconds[index],
        y: datapoint
      }
    })

    return super.buildMetricResponse(fuelFlowData);
  }
}

module.exports = FlowFuelTimeMetric;
