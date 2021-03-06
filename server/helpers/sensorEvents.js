import db from '../schema'
import sensorsPubSub from './sensorsPubSub'
import checkSensorAlarmTrigger from './checkSensorAlarmTrigger'
import settings from '../../client/src/settings.json'

const minUpdateIntervalMinutes = 30

const sensorEvents = () => {
  let telldus = null
  if (!settings.dev) {
    telldus = require('telldus')
  }

  if (telldus !== null) {
    // telldus.addRawDeviceEventListener((deviceId, status) => {
    //   console.log(deviceId)
    //   console.log(status)
    // })
    telldus.addSensorEventListener((
      deviceId,
      protocol,
      model,
      type,
      value
    ) => {
      const now = new Date()
      db.Sensor.find({}, (err, sensors) => {
        if (!err) {
          sensors.map(sensor => {
            if (sensor.identificationId === deviceId) {
              // Make sure were not updating if its less than minUpdateIntervalMinutes
              const millisDiff = Math.abs(now - new Date(sensor.lastReportedTime))
              const minutes = Math.floor((millisDiff / 1000) / 60)
              if (minutes > minUpdateIntervalMinutes) {
                const updated = { lastReportedValue: value, lastReportedTime: now }
                checkSensorAlarmTrigger(sensor, value)
                sensor.update(updated, () => {
                  const newSensorValue = new db.SensorValue({
                    sensorId: sensor._id,
                    value,
                    time: now,
                  })
                  newSensorValue.save(err => {
                    if (err) {
                      console.log(err)
                    }
                    console.log(`added new sensorvalue for ${sensor.name} : ${value}`)
                    sensorsPubSub()
                  })
                })
              }
            }
            return null
          })
        }
      })
    })
  }
}

export default sensorEvents
