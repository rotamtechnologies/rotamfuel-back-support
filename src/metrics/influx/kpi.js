const calculateCTC = (datapoints) => {
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
    return datosFiltradosObjetos;
};

const calculateDistance = (datapoints) => {
    const deltaTime = datapoints.filter(datapoint => datapoint._field == 'DeltaTime');
    const vehicleSpeed = datapoints.filter(datapoint => datapoint._field == 'vehicle speed');

    const time = [];
    const speed = [];
    const accumDistance = [{
      x: '',
      y: 0,
    }];
    let tmpTimeHour = 0;

    for (let index = 0; index < deltaTime.length; index ++) {
      tmpTimeHour += (deltaTime[index]._value) / 3600;
      speed.push(vehicleSpeed[index]._value);
      time.push(tmpTimeHour);
    }

    for (let index = 0; index < deltaTime.length; index ++) {
      const accumDistanceTmp = ((speed[index]+speed[index + 1])/2)*(time[index + 1]-time[index]);
      if (!isNaN(accumDistanceTmp)) {
        accumDistance.push({
          time: deltaTime[index]._time,
          distance: accumDistanceTmp
        });
      }
    }

    return accumDistance;
};

module.exports = {
    calculateCTC,
    calculateDistance
};