import QRCode from 'qrcode'
import fs from 'fs'
import path from 'path'
import { stringify } from 'csv-stringify/sync'

const totalCount = 5

type QRRecord = {
  uuid: string
  qr_code: string
}
export const generateUuids = (count: number) => {
  const uuidArray = []
  for (let i = 0; i < count; i++) {
    uuidArray.push(crypto.randomUUID())
  }
  return uuidArray
}

export const generateRecords = (uuids: string[]): Promise<QRRecord[]> => {
  return Promise.all(
    uuids.map((uuid) =>
      QRCode.toDataURL(uuid).then((qr_code: string) => {
        return { uuid, qr_code }
      }),
    ),
  )
}

export const generateQRImages = (dirPath: string, uuids: string[]) => {
  return Promise.all(
    uuids.map((uuid) =>
      QRCode.toFile(path.join(dirPath, `${uuid}.png`), String(uuid), {
        color: {
          light: '#0000',
        },
      }),
    ),
  )
}
export const exportCSV = async (records: QRRecord[]) => {
  const csvData = stringify(records, {
    header: true,
    columns: [
      { key: 'uuid', header: 'UUID' },
      { key: 'qr_code', header: 'QR_Code_Data_URL' },
    ],
  })
  fs.writeFileSync(
    path.join(import.meta.dirname, '../allowed_codes.csv'),
    csvData,
  )
}

const main = async () => {
  try {
    let uuidArray = generateUuids(totalCount)
    const records = await generateRecords(uuidArray)
    await exportCSV(records)

    const dirPath = path.join(import.meta.dirname, 'QR_images')
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    await generateQRImages(dirPath, uuidArray)
  } catch (err) {
    console.error('Error generating QR codes:', err)
  }
}

main()
