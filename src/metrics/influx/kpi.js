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

const calculateDistance = (timeSeconds, speed, accumulated = true) => {

  const time = timeSeconds.map(time => time / 3600);
  let distance = [];
  for (let index = 0; index < timeSeconds.length; index ++) {
    const accumDistanceTmp = ((speed[index + 1] + speed[index])/2)*(time[index + 1]-time[index]);
    if (!isNaN(accumDistanceTmp) && accumDistanceTmp > 0) {
      distance.push(accumDistanceTmp);
    } else {
      distance.push(0);
    }
  }

  if (!accumulated) {
    return distance
  }

  let tmpValue = distance[0]
  const accumulatedDistance = []

  distance.forEach((datapoint, index) => {
    let acDis = 0
    if (index === 0) {
      acDis = tmpValue
    } else {
      acDis = tmpValue + datapoint
    }
    accumulatedDistance.push(acDis)
    tmpValue = acDis
  });

  return accumulatedDistance;
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
    calculateAccumulatedFuelMass
};