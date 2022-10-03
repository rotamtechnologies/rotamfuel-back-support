/* eslint-disable no-await-in-loop */
const { getMetric } = require('./index');

const getMetricClass = ({
    id,
    metricType,
    index,
    queries,
    trip,
    start,
    stop,
    type,
}) => {
    const MetricClass = getMetric(metricType);

    if (!MetricClass) {
        throw new Error(`Metric type '${metricType}' does not exist - ${id}`);
    }

    return new MetricClass({
        id,
        query: queries[index],
        trip,
        start,
        stop,
        type,
    });
};

const getMetrics = async ({
    trip,
    start,
    stop,
    type,
    queries,
}) => {
    const results = [];
    for (let index = 0; index < queries.length; index++) {
        const { id, metric_type: metricType } = queries[index];
        try {
            const metric = getMetricClass({
                id,
                metricType,
                index,
                queries,
                trip,
                start,
                stop,
                type,
            });
            const datapoints = await metric.getResponse({ results, trip });
            if (datapoints) {
                results.push(datapoints);
            }
        } catch (error) {
            throw new Error(`Cannot get data from metric - ${id} ${error.stack}`);
        }
    }
    return results;
};

module.exports = {
    getMetrics,
};
