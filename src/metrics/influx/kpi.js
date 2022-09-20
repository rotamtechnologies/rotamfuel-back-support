const filterData = (datapoints) => {
  let soloFechas = datapoints.map(o => o._time)
  soloFechas = Array.from(new Set(soloFechas))
  let datosFiltrados = []
  for (let fecha of soloFechas) {
      datosFiltrados.push(datapoints.filter(o => o._time === fecha))
  }
  let datosFiltradosObjetos = []
  for (let datoF of datosFiltrados) {
      let obj = {}
      for (let aD of datoF) {
          obj[aD._measurement] = aD._value
          obj.ts = aD._time
      }
      datosFiltradosObjetos.push(obj)
  }
  const sortedAsc = datosFiltradosObjetos.sort(
      (objA, objB) => Number(new Date(parseInt(objA.ts))) - Number(new Date(parseInt(objB.ts))),
  );

  return sortedAsc
}


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
        obj[aD._measurement] = aD._value;
      }
      let MAF = obj["maf_air_flows_rate"];

      let AFR = 14.5; // para diesel
      let DeltaTime = obj["deltatime"] / 1000;

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
    const cummulativeTime = datapoints.filter(datapoint => datapoint._measurement == 'cumulativetime');
    const vehicleSpeed = datapoints.filter(datapoint => datapoint._measurement == 'vehicle_speed');

    const time = [];
    const speed = [];
    const accumDistance = [];
    let tmpTimeHour = 0;

    for (let index = 0; index < cummulativeTime.length; index ++) {
      if (cummulativeTime[index] && vehicleSpeed[index] && cummulativeTime[index]._value && vehicleSpeed[index]._value) {
        tmpTimeHour += (cummulativeTime[index]._value) / 3600;
        speed.push(vehicleSpeed[index]._value);
        time.push(tmpTimeHour);
      }
    }

    console.log(speed)

    for (let index = 0; index < cummulativeTime.length; index ++) {
      const accumDistanceTmp = ((speed[index + 1] + speed[index])/2)*(time[index + 1]-time[index]);
      if (!isNaN(accumDistanceTmp)) {
        accumDistance.push({
          time: cummulativeTime[index]._time,
          distance: accumDistanceTmp
        });
      }
    }

    return accumDistance;
};

const calculateDistanceWithTimeSpeed = (timeSeconds, speed) => {

  let time = timeSeconds.map(time => time / 3600);
  let distance = [];
  for (let index = 0; index < timeSeconds.length; index ++) {
    const accumDistanceTmp = ((speed[index + 1] + speed[index])/2)*(time[index + 1]-time[index]);
    if (!isNaN(accumDistanceTmp)) {
      distance.push(
        {
          distance: accumDistanceTmp,
          time: time[index]
        }
      )
    }
  }
  return distance;
};

const calculateAccumulatedFuelMass = (maf, time) => {
  const LIGHT_DIESEL_VEHICLE_CORRECTION_FACTOR = 1.38496
  const AIR_FUEL_RATIO = 14.5

  let deltas = [];
  let accumulatedFuelMass = []

  if (time) {
    deltas = [time[0]]
    
    for(let index = 0; index < time.length; index ++) {
      deltas.push(!isNaN(time[index + 1] - time[index]) ? time[index + 1] - time[index] : 0)
    }
  }

  const afmArray = []

  maf.forEach((datapoint, index) => {
    const AFM = datapoint / (LIGHT_DIESEL_VEHICLE_CORRECTION_FACTOR * AIR_FUEL_RATIO)
    afmArray.push(AFM)
    if (time) {
      accumulatedFuelMass.push(AFM * deltas[index])
    }
  })

  if (time) {
    return accumulatedFuelMass
  }

  return afmArray
}

module.exports = {
    calculateCTC,
    calculateDistance,
    filterData,
    calculateDistanceWithTimeSpeed,
    calculateAccumulatedFuelMass
};