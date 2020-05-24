import {
  Event,
  CustomEvent,
  EventTarget
} from './index.js'

var emitter = new EventTarget()
emitter.addEventListener('custom-event', e => {
  console.log(e.type, e.detail, e.timeStamp, e instanceof Event, JSON.stringify(e, null, 2))
})
var evt = new CustomEvent('custom-event', { detail: 42 })
setTimeout(() => {
  emitter.dispatchEvent(evt)
}, 250)
