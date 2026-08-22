var QRCode = require("qrcode")
const totalCount = 5

const generateUuids = (count) => {
  const uuidArray = []
  for (let i = 0; i < count; i++) {
    uuidArray.push(crypto.randomUUID())
  }
  return uuidArray
}
let uuidArray = generateUuids(totalCount)
console.log(uuidArray)

QRCode.toDataURL("I am a pony!", function (err, url) {
  console.log(url)
})
