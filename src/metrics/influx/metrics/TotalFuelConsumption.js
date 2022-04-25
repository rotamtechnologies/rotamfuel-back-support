const InfluxBaseMetric = require("../influxBaseMetric");

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
    let soloFechas = datapoints.map((o) => o._time);
    soloFechas = Array.from(new Set(soloFechas));
    let datosFiltrados = [];
    for (let fecha of soloFechas) {
      datosFiltrados.push(datapoints.filter((o) => o._time == fecha));
    }
    let datosFiltradosObjetos = [];
    let MIC = 0;
    let CTCglo = null;

    for (let datoF of datosFiltrados) {
      let obj = {};

      for (let aD of datoF) {
        obj['time'] = aD._time;
        obj[aD._field] = aD._value;
      }
      let MAF = obj["MAF air flow rate"];

      let AFR = 14.5; // para diesel
      let DeltaTime = obj["DeltaTime"] / 1000;

      let MFF = MAF / AFR;
      MIC = MFF * DeltaTime;

      let PGCAL = 3217; // para diesel
      if (CTCglo == null) {
        CTCglo = MIC / PGCAL;
      } else {
        CTCglo += MIC;
      }
      obj["CTC"] = CTCglo;

      datosFiltradosObjetos.push(obj);
    }
    
    datosFiltradosObjetos = datosFiltradosObjetos.map(record => ({
      x: record.time,
      y: record.CTC
    }));

    return super.buildMetricResponse(datosFiltradosObjetos);
  }
}

module.exports = TotalFuelConsumptionMetric;
