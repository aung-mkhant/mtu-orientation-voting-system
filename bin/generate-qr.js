const QRCode = require("qrcode")
const fs = require("fs")
const path = require("path")
const { stringify } = require("csv-stringify/sync")

const totalCount = 5

const generateUuids = (count) => {
  const uuidArray = []
  for (let i = 0; i < count; i++) {
    uuidArray.push(crypto.randomUUID())
  }
  return uuidArray
}

const generateQrRecords = (uuids) => {
  return Promise.all(
    uuids.map((uuid) =>
      QRCode.toDataURL(uuid).then((qr_code) => {
        return { uuid, qr_code }
      }),
    ),
  )
}

const exportToCSV = async () => {
  let uuidArray = generateUuids(totalCount)
  const records = await generateQrRecords(uuidArray)
  const csvData = stringify(records, {
    header: true,
    columns: [
      { key: "uuid", header: "UUID" },
      { key: "qr_code", header: "QR_Code_Data_URL" },
    ],
  })
  fs.writeFileSync(path.join(__dirname, "qr_code.csv"), csvData)
}

exportToCSV()
