const {getIotData} = require("../repository/iotInflux")
const CsvParser = require("json2csv").Parser;

module.exports = {
    obtenerIotData: async (data) => {

        let dataInflux = await getIotData(data)

        let soloFechas = dataInflux.map(o => o._time)
        soloFechas = Array.from(new Set(soloFechas))
        let datosFiltrados = []
        for (let fecha of soloFechas) {
            datosFiltrados.push(dataInflux.filter(o => o._time == fecha))
        }
        let datosFiltradosObjetos = []
        let listaCTC = []
        let micPasado = 0
        let micActual = 0
        let CTCglo = null
        for (let datoF of datosFiltrados) {
            let obj = {}
            for (let aD of datoF) {
                obj[aD._field] = aD._value
            }
            let MAF = obj["MAF air flow rate"]
            console.log("MAF", MAF)

            let AFR = 14.5
            let DeltaTime = (obj["DeltaTime"] / 1000)

            let MFF = MAF / AFR
            console.log("MFF", MFF)
            micActual = MFF * DeltaTime
            console.log("MIC actual", micActual)


            let PGCAL = 3217
            if (CTCglo == null) {
                CTCglo = micActual / PGCAL
            } else {
                CTCglo += micActual
            }
            obj["CTC"] = CTCglo


            listaCTC.push(CTCglo)
            datosFiltradosObjetos.push(obj)
        }
        console.log(datosFiltradosObjetos)
        console.log("CTC", CTCglo)

        return {
            eventos: datosFiltradosObjetos.length,
            CTC: CTCglo,
            listaCTC


        }
    },
    descargarIotData: async (data) => {

        let dataInflux = await getIotData(data)

        let soloFechas = dataInflux.map(o => o._time)
        soloFechas = Array.from(new Set(soloFechas))
        let datosFiltrados = []
        for (let fecha of soloFechas) {
            datosFiltrados.push(dataInflux.filter(o => o._time == fecha))
        }
        let datosFiltradosObjetos = []
        let micPasado = 0
        let micActual = 0
        let CTCglo = null
        for (let datoF of datosFiltrados) {
            let obj = {}
            for (let aD of datoF) {
                obj[aD._field] = aD._value
            }
            let MAF = obj["MAF air flow rate"]
            console.log("MAF", MAF)

            let AFR = 14.5
            let DeltaTime = (obj["DeltaTime"] / 1000)

            let MFF = MAF / AFR
            console.log("MFF", MFF)
            micActual = MFF * DeltaTime
            console.log("MIC actual", micActual)


            let PGCAL = 3217
            if (CTCglo == null) {
                CTCglo = micActual / PGCAL
            } else {
                CTCglo += micActual
            }
            obj["CTC"] = CTCglo


            datosFiltradosObjetos.push(obj)
        }
        console.log(datosFiltradosObjetos)
        console.log("CTC", CTCglo)


        return datosFiltradosObjetos
    }
}