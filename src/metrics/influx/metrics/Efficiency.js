const InfluxBaseMetric = require("../influxBaseMetric");
const { 
  filterData, 
  calculateAccumulatedFuelMass
} = require("../kpi");

class EfficiencyMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "efficiency_metric";
  }

  buildMetricParams() {
    return {
      _measurements: ["maf_air_flows_rate"],
    };
  }

  buildMetricResponse(datapoints) {

    const filteredData = filterData(datapoints)
    const maf = []

    filteredData.forEach(datapoint => {
      maf.push(datapoint['maf_air_flows_rate'] || 0)
    })

    const accumulatedFuelMass = calculateAccumulatedFuelMass(maf, null);

    const mffData = accumulatedFuelMass.map(point => {
      let Ef_MFF = '';
      if (point > 0 && point <= 0.5) {
        Ef_MFF = 'Eficiente';
      }

      if (point > 0.5 && point <= 1) {
        Ef_MFF = 'Moderado';
      }

      if (point > 1) {
        Ef_MFF = 'Ineficiente';
      }

      return {
        x: Ef_MFF,
        y: Ef_MFF
      }
    });
    return super.buildMetricResponse(mffData);
  }
}

module.exports = EfficiencyMetric;
