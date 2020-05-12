# xevents
Use DOM events everywhere.

## Why
So you can write programs with event handling code that will work in node and the browser.

## How
Use `Event`, `CustomEvent` and `EventTarget` globals if defined, otherwise fall back to local implementations.

Note on use in the browser: sure, it's wasteful to send unnecessary shims, but it's also cool if node code Just Works without requiring a build step... if a build step is used, optimizing this should be straightforward.

## Example
```javascript
import {
  Event,
  CustomEvent,
  EventTarget
} from 'xevent/index.js'

var emitter = new EventTarget()
emitter.addEventListener('custom-event', e => {
  console.log(e.type, e.detail, e instanceof Event, e)
})
var evt = new CustomEvent('custom-event', { detail: 42 })
emitter.dispatchEvent(evt)
```

## Prior art
[basicHTML](https://github.com/webreflection/basichtml), [ungap](https://github.com/ungap).

## License
MIT

