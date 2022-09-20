const InfluxBaseMetric = require("../influxBaseMetric");
const { filterData, calculateAccumulatedFuelMass } = require("../kpi");

class TotalFuelConsumptionMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "total_fuel_consumption_metric";
  }

  buildMetricParams() {
    return {
      _measurements: ["maf_air_flows_rate", "cumulativetime"],
    };
  }

  buildMetricResponse(datapoints) {
    const filteredData = filterData(datapoints)

    const time = []
    const maf = []

    const DENSITY = 0.8607
    const DIESEL_CONSTANT = 3.7854

    filteredData.forEach(datapoint => {
      time.push(datapoint['cumulativetime'] || 0)
      maf.push(datapoint['maf_air_flows_rate'] || 0)
    })

    const accumulatedFuelMass = calculateAccumulatedFuelMass(maf, time);

    let tmpValue = accumulatedFuelMass[0]
    const fuelConsumption = []

    for(let index = 0; index < accumulatedFuelMass.length; index ++) {
      let MCA = 0
      if (index === 0) {
        MCA = tmpValue
      } else {
        MCA = tmpValue + accumulatedFuelMass[index]
      }

      fuelConsumption.push(
        {
          x: time[index],
          y: ((MCA) / (DENSITY * DIESEL_CONSTANT)) / 1000
        }
      )

      tmpValue = MCA
    }

    return super.buildMetricResponse(fuelConsumption);
  }
}

module.exports = TotalFuelConsumptionMetric;
