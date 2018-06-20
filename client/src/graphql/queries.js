import gql from 'graphql-tag'

const getServers = gql`
  query getServers {
    servers {
      serverName
      serverType
      serverIp
      status
      lastChecked
      port
    }
  }
`

const getControllers = gql`
  query getControllers {
    controllers {
      _id
      name
      description
      identificationId
      status
      lastReportedTime
      timer
      onTime
      offTime
    }
  }
`

const getSensors = gql`
  query getSensors {
    sensors {
      _id
      name
      description
      measurementType
      measurementUnit
      scaling
      identificationId
      external
      lastReportedValue
      lastReportedTime
      maxAgeMinutes
      maxAgeAlarm
      maxAgeAlarmActive
      maxAgeAlarmManualReset
      maxValueAlarm
      maxValueAlarmActive
      maxValue
      minValueAlarmActive
      minValue
    }
  }
`

export default {
  getControllers,
  getSensors,
  getServers
}
