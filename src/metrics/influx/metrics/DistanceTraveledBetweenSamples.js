const InfluxBaseMetric = require("../influxBaseMetric");

class DistanceTraveledBetweenSamplesMetric extends InfluxBaseMetric {
  static getMetricId() {
    return "distance_traveled_between_samples_metric";
  }

  buildMetricParams() {
    return {
      _fields: ["vehicle speed", "DeltaTime"],
    };
  }

  buildMetricResponse(datapoints) {
    const deltaTime = datapoints.filter(datapoint => datapoint._field == 'DeltaTime');
    const vehicleSpeed = datapoints.filter(datapoint => datapoint._field == 'vehicle speed');

    const dataTime = [];
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
          x: deltaTime[index]._time,
          y: accumDistanceTmp
        });
      }
    }

    return super.buildMetricResponse(accumDistance);
  }
}

module.exports = DistanceTraveledBetweenSamplesMetric;
