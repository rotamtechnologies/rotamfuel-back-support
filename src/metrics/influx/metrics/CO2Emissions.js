const InfluxBaseMetric = require("../influxBaseMetric");
const { calculateCTC, calculateDistance } = require("../kpi");

class CO2EmissionsMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "co2_emissions_metric";
  }

  buildMetricParams() {
    return {
      _fields: ["MAF air flow rate", "vehicle speed", "DeltaTime"],
    };
  }

  buildMetricResponse(datapoints) {
    const datapointsCTC = calculateCTC(datapoints);
    const datapointsDistance = calculateDistance(datapoints);
    const co2Emissions = [];
    const EM_GAL = 8.870;

    for (let index = 0; index < datapointsCTC.length; index ++) {
      const emKm = EM_GAL * (datapointsCTC[index].CTC / datapointsDistance[index].distance);
      co2Emissions.push({
        x: datapointsCTC[index].time,
        y: emKm
      });
    }

    return super.buildMetricResponse(co2Emissions);
  }
}

module.exports = CO2EmissionsMetric;