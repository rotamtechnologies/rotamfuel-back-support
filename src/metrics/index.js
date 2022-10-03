const TotalFuelConsumptionMetric = require('./influx/metrics/TotalFuelConsumption');
const EfficiencyMetric = require('./influx/metrics/Efficiency');
const CO2EmissionsMetric = require('./influx/metrics/CO2Emissions');
const SpeedTimeMetric = require('./influx/metrics/speed/SpeedTime');
const SpeedDistanceMetric = require('./influx/metrics/speed/SpeedDistance');
const EngineMetric = require('./influx/metrics/EngineRpm');
const FlowFuelTimeMetric = require('./influx/metrics/flow_fuel/FlowFuelTime');
const FlowFuelDistanceMetric = require('./influx/metrics/flow_fuel/FlowFuelDistance');
const InstantFuelConsumptionMetric = require('./influx/metrics/InstantFuelConsumption');

const ALL_METRIC_CLASSES = [
    TotalFuelConsumptionMetric,
    EfficiencyMetric,
    CO2EmissionsMetric,
    SpeedTimeMetric,
    SpeedDistanceMetric,
    EngineMetric,
    FlowFuelTimeMetric,
    FlowFuelDistanceMetric,
    InstantFuelConsumptionMetric,
];

const getMetric = metricId => ALL_METRIC_CLASSES.find(metricClass => metricClass.getMetricId() === metricId);

module.exports = {
    getMetric,
};
