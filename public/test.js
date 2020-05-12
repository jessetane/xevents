import {
  Event,
  CustomEvent,
  EventTarget
} from 'xevent/index.js'

var emitter = new EventTarget()
emitter.addEventListener('custom-event', e => {
  console.log(e.type, e.detail, e instanceof Event, JSON.stringify(e, null, 2))
  document.querySelector('body').innerHTML = `<pre>${e.type} ${e.detail} ${e instanceof Event} ${JSON.stringify(e, null, 2)}</pre>`
})
var evt = new CustomEvent('custom-event', { detail: 42 })
emitter.dispatchEvent(evt)
