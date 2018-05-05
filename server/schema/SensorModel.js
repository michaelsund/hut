import mongoose from 'mongoose'

const sensor = mongoose.Schema({
  name: { type: String, default: 'Unnamed sensor' },
  description: { type: String, default: '' },
  measurementType: {
    type: String,
    lowercase: true,
    trim: true,
    default: ''
  },
  measurementUnit: {
    type: String,
    lowercase: true,
    trim: true,
    default: ''
  },
  scaling: { type: Number, default: 0 },
  external: { type: Boolean, default: true },
  lastReportedValue: { type: Number, default: null },
  lastReportedTime: { type: Date, default: null },
  maxAgeMinutes: { type: Number, default: null },
  maxAgeMinutesAlarm: { type: Boolean, default: false },
  maxAgeMinutesAlarmActive: { type: Boolean, default: false },
  maxAgeMinutesAlarmManualReset: { type: Boolean, default: false },
  maxValueAlarm: { type: Boolean, default: false },
  maxValueAlarmActive: { type: Boolean, default: false },
  maxValue: { type: Number, default: null },
  minValueAlarm: { type: Boolean, default: false },
  minValueAlarmActive: { type: Boolean, default: false },
  minValue: { type: Number, default: null }
})

export default mongoose.model('Sensor', sensor);
