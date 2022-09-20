const InfluxBaseMetric = require("../influxBaseMetric");
const { filterData, calculateAccumulatedFuelMass } = require("../kpi");

class CO2EmissionsMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "co2_emissions_metric";
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

    const FACTOR_DE_EMISION_DE_CO2_EN_UNIDADES_COMUNES = 10.27650193
    const DENSITY = 0.8607
    const DIESEL_CONSTANT = 3.7854

    filteredData.forEach(datapoint => {
      time.push(datapoint['cumulativetime'] || 0)
      maf.push(datapoint['maf_air_flows_rate'] || 0)
    })

    const accumulatedFuelMass = calculateAccumulatedFuelMass(maf, time);

    let tmpValue = accumulatedFuelMass[0]
    const co2Emissions = []

    for(let index = 0; index < accumulatedFuelMass.length; index ++) {
      let MCA = 0
      if (index === 0) {
        MCA = tmpValue
      } else {
        MCA = tmpValue + accumulatedFuelMass[index]
      }
      const value = ((MCA * FACTOR_DE_EMISION_DE_CO2_EN_UNIDADES_COMUNES) / DIESEL_CONSTANT) / (DENSITY * 1000)

      co2Emissions.push(
        {
          x: time[index],
          y: value
        }
      )

      tmpValue = MCA
    }

    return super.buildMetricResponse(co2Emissions);
  }
}

module.exports = CO2EmissionsMetric;
