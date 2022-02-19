const {InfluxDB} = require('@influxdata/influxdb-client')

// You can generate an API token from the "API Tokens Tab" in the UI
const token = 'HO70-FCZsA1q-nR60-rv_XGshqgkY9ssmPwOIw7dr0T32prLhhF2Rn05jSnUtc5NP4-THLwME4QKDIM84UOPSQ=='
const org = 'rotam'
const bucket = 'iot3'


module.exports = {
    getIotData: (dataReq = {}) => {
        return new Promise((ok, nok) => {
            const client = new InfluxDB({url: 'http://localhost:8086', token: token})
            console.log(dataReq);
            const queryApi = client.getQueryApi(org)

            // const query = `from(bucket: "iot2") |> range(start: -${dataReq?.relativeTime})`
            const query = `from(bucket: "iot3")
  |> range(start: -${dataReq?.relativeTime})
  |> filter(fn: (r) => r["_measurement"] == "car")
  |> filter(fn: (r) => r["MAC"] == "00:1D:A5:68:98:8B")
  |> filter(fn: (r) => r["_field"] == "engine rpm")
  |> aggregateWindow(every: ${dataReq?.relativeTime}, fn: mean, createEmpty: false)
  |> yield(name: "mean")`
            let data = []
            queryApi.queryRows(query, {
                next(row, tableMeta) {
                    const o = tableMeta.toObject(row)
                    data.push(row)
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