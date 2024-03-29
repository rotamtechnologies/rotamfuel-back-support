const {InfluxDB} = require('@influxdata/influxdb-client')

// You can generate an API token from the "API Tokens Tab" in the UI
//const token = 'HO70-FCZsA1q-nR60-rv_XGshqgkY9ssmPwOIw7dr0T32prLhhF2Rn05jSnUtc5NP4-THLwME4QKDIM84UOPSQ=='
const token = 'jzGeZqdyFRblCyitjRoETcMHtIAqtJfHlt3LjVMEZZ-QlTF6HxAoDMpShCvXsVOwRPYQlxLln38UX8oeAuVwbA=='
const org = 'rotam'
const bucket = 'datahistory'


module.exports = {
    getIotData: (dataReq = {}) => {
        return new Promise((ok, nok) => {
            const client = new InfluxDB({url: 'https://rotamfuel.com:8086', token: token})
            console.log(dataReq);
            const queryApi = client.getQueryApi(org)

            // const query = `from(bucket: "iot2") |> range(start: -${dataReq?.relativeTime})`
            const query = `from(bucket: "${bucket}")
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
    },
    getIotData2: (dataReq = {}) => {
        return new Promise((ok, nok) => {
            const client = new InfluxDB({url: 'https://rotamfuel.com:8086', token: token})
            console.log("dataReq");
            console.log(dataReq);
            const queryApi = client.getQueryApi(org)

            // const query = `from(bucket: "iot2") |> range(start: -${dataReq?.relativeTime})`
            const query = `from(bucket: "${bucket}")
  |> range(start: ${dataReq?.startDate} , stop: ${dataReq?.endDate})
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