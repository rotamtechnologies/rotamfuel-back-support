const {InfluxDB} = require('@influxdata/influxdb-client')

// You can generate an API token from the "API Tokens Tab" in the UI
const token = 'jzGeZqdyFRblCyitjRoETcMHtIAqtJfHlt3LjVMEZZ-QlTF6HxAoDMpShCvXsVOwRPYQlxLln38UX8oeAuVwbA=='
const org = 'rotam'
const bucket = 'iot4'


module.exports = {
    getIotData: (dataReq = {}) => {
        return new Promise((ok, nok) => {
            const client = new InfluxDB({url: 'http://44.200.220.115:8086', token: token})
            console.log(dataReq);
            const queryApi = client.getQueryApi(org)

            // const query = `from(bucket: "iot2") |> range(start: -${dataReq?.relativeTime})`
            const query = `from(bucket: "iot4")
  |> range(start: 0)
  |> filter(fn: (r) => r["viajeMongo"] == "${dataReq?.viaje}")`
            let data = []
            queryApi.queryRows(query, {
                next(row, tableMeta) {
                    const o = tableMeta.toObject(row)
                    data.push(o)
                },
                error(error) {
                    nok(error)
                    console.log('Finished ERROR')
                },
                complete() {
                    ok(data)
                }
            })
        })
    }
}