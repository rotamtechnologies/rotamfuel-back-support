const TotalFuelConsumptionMetric = require('./influx/metrics/TotalFuelConsumption');
const FuelFlowRangeMetric = require('./influx/metrics/FuelFlowRange');
const DistanceTraveledBetweenSamplesMetric = require('./influx/metrics/DistanceTraveledBetweenSamples');
const CO2EmissionsMetric = require('./influx/metrics/CO2Emissions');
const SpeedMetric = require('./influx/metrics/Speed');
const EngineMetric = require('./influx/metrics/EngineRpm');

const ALL_METRIC_CLASSES = [
    TotalFuelConsumptionMetric,
    FuelFlowRangeMetric,
    DistanceTraveledBetweenSamplesMetric,
    CO2EmissionsMetric,
    SpeedMetric,
    EngineMetric,
];

const getMetric = metricId => ALL_METRIC_CLASSES.find(metricClass => metricClass.getMetricId() === metricId);

module.exports = {
    getMetric,
};
