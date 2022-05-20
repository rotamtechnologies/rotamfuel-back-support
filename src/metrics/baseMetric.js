/* eslint-disable class-methods-use-this */

class BaseMetric {
    constructor() {
        this.metricId = null;
        this.devices = [];
        this.datapoints = [];
    }

    static getMetricId() {
        throw new Error('Override on each sub-class');
    }

    buildMetricParams() {
        throw new Error('Override on each sub-class');
    }

    buildMetricQuery() {
        throw new Error('Override on each sub-class');
    }

    execMetricQuery() {
        throw new Error('Override on each sub-class');
    }

    async getResponse() {
        let datapoints = [];
        const builtQuery = await this.buildMetricQuery();
        if (builtQuery) {
            datapoints = await this.execMetricQuery(builtQuery);
        }
        return this.buildMetricResponse(datapoints);
    }
}

module.exports = BaseMetric;
