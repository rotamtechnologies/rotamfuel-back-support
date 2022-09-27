const InfluxBaseMetric = require("../../influxBaseMetric");
const { 
  filterData, 
  calculateDistance,
  calculateAccumulatedFuelMass
} = require("../../kpi");

class FlowFuelMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "flow_fuel_distance_metric";
  }

  buildMetricParams() {
    return {
      _measurements: ["maf_air_flows_rate", "cumulativetime", "vehicle_speed"],
    };
  }

  buildMetricResponse(datapoints) {

    const timeSeconds = []
    const maf = []
    const speed = []

    const filteredData = filterData(datapoints)

    filteredData.forEach(datapoint => {
      timeSeconds.push(datapoint['cumulativetime'] || 0)
      maf.push(datapoint['maf_air_flows_rate'] || 0)
      speed.push(datapoint['vehicle_speed'] || 0)
    })

    const distance = calculateDistance(timeSeconds, speed);
    const fuelMass = calculateAccumulatedFuelMass(maf, null);

    const fuelFlowData = fuelMass.map((datapoint, index) => {
      return {
        x: distance[index],
        y: datapoint
      }
    })

    return super.buildMetricResponse(fuelFlowData);
  }
}

module.exports = FlowFuelMetric;
