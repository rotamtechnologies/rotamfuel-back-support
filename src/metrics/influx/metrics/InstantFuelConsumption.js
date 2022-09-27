const InfluxBaseMetric = require("../influxBaseMetric");
const { 
  filterData, 
  calculateDistance,
  calculateAccumulatedFuelMass
} = require("../kpi");

class InstantFuelConsumptionMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "instant_fuel_consumption_metric";
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
    const DENSITY = 0.8607

    const filteredData = filterData(datapoints)

    filteredData.forEach(datapoint => {
      timeSeconds.push(datapoint['cumulativetime'] || 0)
      maf.push(datapoint['maf_air_flows_rate'] || 0)
      speed.push(datapoint['vehicle_speed'] || 0)
    })

    const distance = calculateDistance(timeSeconds, speed, false);
    const fuelMass = calculateAccumulatedFuelMass(maf, null);

    const fuelFlowData = fuelMass.map((datapoint, index) => {
      return {
        x: timeSeconds[index],
        y: (datapoint / distance[index]) / (DENSITY * 1000)
      }
    })

    return super.buildMetricResponse(fuelFlowData);
  }
}

module.exports = InstantFuelConsumptionMetric;
