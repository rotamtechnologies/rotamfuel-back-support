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
    });
};

const getMetrics = async ({
    trip,
    start,
    stop,
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
            });
            const datapoints = await metric.getResponse({ results, trip });
            if (datapoints) {
                results.push(datapoints);
            }
        } catch (error) {
            throw new Error(`Cannot get data from metric - ${id} ${error}`);
        }
    }
    return results;
};

module.exports = {
    getMetrics,
};
