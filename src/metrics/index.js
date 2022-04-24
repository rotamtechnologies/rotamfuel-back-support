const TotalFuelConsumptionMetric = require('./influx/metrics/TotalFuelConsumption');
const FuelFlowRangeMetric = require('./influx/metrics/FuelFlowRange');

const ALL_METRIC_CLASSES = [
    TotalFuelConsumptionMetric,
    FuelFlowRangeMetric
];

const getMetric = metricId => ALL_METRIC_CLASSES.find(metricClass => metricClass.getMetricId() === metricId);

module.exports = {
    getMetric,
};
