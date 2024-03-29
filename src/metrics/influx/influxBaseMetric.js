/* eslint-disable class-methods-use-this */
const { InfluxDB } = require('@influxdata/influxdb-client');
const { buildFilters, parseTimestampToIso } = require('./utils');
const BaseMetric = require('../baseMetric');

class InfluxBaseMetric extends BaseMetric {
    constructor({
        id,
        query,
        trip,
        start,
        stop,
        type,
    }) {
        super();
        this.source = new InfluxDB({
            url: process.env.INFLUX_URL || 'https://rotamfuel.com:8086',
            token: process.env.INFLUX_TOKEN || 'jzGeZqdyFRblCyitjRoETcMHtIAqtJfHlt3LjVMEZZ-QlTF6HxAoDMpShCvXsVOwRPYQlxLln38UX8oeAuVwbA==',
        }).getQueryApi(process.env.INFLUX_ORG || 'rotam');
        this.measurements = [];
        this.id = id;
        this.query = query;
        this.trip = trip;
        this.start = start;
        this.stop = stop;
        this.type = type;
    }

    buildMetricParams(
        {
            viajeMongo, measurements,
        },
    ) {
        return {
            _viajeMongo: viajeMongo,
            _measurements: measurements,
        };
    }

    async buildMetricQuery() {
        const {
            bucket,
            period,
            params,
        } = this.query;

        const {
            _measurements,
        } = this.buildMetricParams();

        this.measurements = _measurements;

        if (!this.trip) {
            return null;
        }

        let tripQuery = null;

        const parsedStart = parseTimestampToIso(this.start);
        const parsedStop = parseTimestampToIso(this.stop);

        const _bucket = bucket || process.env.INFLUX_BUCKET;
        const bucketQuery = `from(bucket: "${_bucket}")`;
        const rangeQuery = `|> range(start: ${parsedStart}, stop:  ${parsedStop})`;

        switch (this.type) {
            case 'trip':
                tripQuery = `|> filter(fn: (r) => r["viajeMongo"] == "${this.trip}") `;    
            break;

            case 'vehicle':
                tripQuery = `|> filter(fn: (r) => r["vehiculo"] == "${this.trip}") `;    
            break;

            case 'fleet':
                const { vehicles } = params;
                let vehiclesQuery = '';
                vehicles.forEach((vehicle, index) => {
                    if (index == 0) {
                        vehiclesQuery += `r["vehiculo"] == "${vehicle}"`
                    } else {
                        vehiclesQuery += ` or r["vehiculo"] == "${vehicle}"`
                    }
                })
                tripQuery = `|> filter(fn: (r) => ${vehiclesQuery} )`;
            break;
        
            default:
                tripQuery = `|> filter(fn: (r) => r["viajeMongo"] == "${this.trip}") `; 
        }

        const measurementsQuery = this.measurements && this.measurements.length ? `${buildFilters(this.measurements, '_measurement')})` : '';
        const periodQuery = period ? `|> aggregateWindow(every: ${period}s, fn: mean, createEmpty: false)` : '';

        const yieldQuery = '|> yield(name: "mean")';

        const builtQuery = `
            ${bucketQuery}
            ${rangeQuery}
            ${tripQuery}
            ${measurementsQuery}
            ${periodQuery}
            ${yieldQuery}
        `;
        return builtQuery;
    }

    async execMetricQuery(builtQuery) {
        const results = await this.source.collectRows(builtQuery);
        return results;
    }

    buildMetricResponse(datapoints) {
        return {
            id: this.id,
            datapoints,
        };
    }
}

module.exports = InfluxBaseMetric;
