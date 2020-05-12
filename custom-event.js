import Event from './event.js'

try {
  var _ = CustomEvent
} catch (err) {
  _ = (function () {
    // interface CustomEvent // https://dom.spec.whatwg.org/#customevent
    class CustomEvent extends Event {
      constructor (type, opts = {
        bubbles: false,
        cancelable: false,
        composed: false,
        detail: null
      }) {
        super(type, opts)
        Object.defineProperty(this, 'detail', {
          value: opts.detail,
          enumerable: false,
          writable: true
        })
      }
    }

    return CustomEvent
  })()
}

export default _
