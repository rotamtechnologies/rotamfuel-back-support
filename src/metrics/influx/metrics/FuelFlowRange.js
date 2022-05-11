const InfluxBaseMetric = require("../influxBaseMetric");

class FuelFlowRangeMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "fuel_flow_range_metric";
  }

  buildMetricParams() {
    return {
      _measurements: ["maf_air_flows_rate"],
    };
  }

  buildMetricResponse(datapoints) {
    const AFR = 14.5;
    const mffData = datapoints.map(point => {
      
      const mff = point._value / AFR;
      let Ef_MFF = null;

      if (mff > 0 && mff <= 0.8) {
        Ef_MFF = 'Eficiente';
      }

      if (mff > 0.8 && mff <= 1.8) {
        Ef_MFF = 'Moderado';
      }

      if (mff > 1.8) {
        Ef_MFF = 'Ineficiente';
      }

      return {
        x: point._time,
        y: Ef_MFF
      }
    });
    return super.buildMetricResponse(mffData);
  }
}

module.exports = FuelFlowRangeMetric;
