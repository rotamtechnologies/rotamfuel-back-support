const InfluxBaseMetric = require("../influxBaseMetric");
const { calculateCTC } = require("../kpi");

class TotalFuelConsumptionMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "total_fuel_consumption_metric";
  }

  buildMetricParams() {
    return {
      _fields: ["MAF air flow rate", "DeltaTime"],
    };
  }

  buildMetricResponse(datapoints) {
    let datosFiltradosObjetos = calculateCTC(datapoints);
    
    datosFiltradosObjetos = datosFiltradosObjetos.map(record => ({
      x: record.time,
      y: record.CTC
    }));

    return super.buildMetricResponse(datosFiltradosObjetos);
  }
}

module.exports = TotalFuelConsumptionMetric;
