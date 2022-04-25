const TotalFuelConsumptionMetric = require('./influx/metrics/TotalFuelConsumption');
const FuelFlowRangeMetric = require('./influx/metrics/FuelFlowRange');
const DistanceTraveledBetweenSamplesMetric = require('./influx/metrics/DistanceTraveledBetweenSamples');

const ALL_METRIC_CLASSES = [
    TotalFuelConsumptionMetric,
    FuelFlowRangeMetric,
    DistanceTraveledBetweenSamplesMetric
];

const getMetric = metricId => ALL_METRIC_CLASSES.find(metricClass => metricClass.getMetricId() === metricId);

module.exports = {
    getMetric,
};
