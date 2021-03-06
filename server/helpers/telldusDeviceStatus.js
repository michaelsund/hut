import settings from '../../client/src/settings.json'

let telldus = null

if (!settings.dev) {
  // eslint-disable-next-line
  telldus = require('telldus')
}

const telldusDeviceStatus = identificationId => new Promise((resolve, reject) => {
  telldus.getDevices((err, devices) => {
    const result = devices.filter(device => device.id === identificationId)
    if (result.length > 0) {
      if (result[0].status.name === 'ON') {
        console.log('Status is ON')
        resolve(true)
      } else {
        console.log('Status is OFF')
        resolve(false)
      }
    } else {
      console.log(`device not found ${identificationId}`)
      reject(new Error('device not found'))
    }
  })
})

export default telldusDeviceStatus
