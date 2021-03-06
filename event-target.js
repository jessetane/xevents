import Event from './event.js'

try {
  var _ = EventTarget
} catch (err) {
  _ = (function () {
    const crawlUp = node =>
      node.parentNode ||
      (node.nodeType === node.DOCUMENT_NODE ? node.defaultView : null)

    const getHandler = (self, handler) =>
      handler.handleEvent
        ? e => handler.handleEvent(e)
        : e => handler.call(self, e)

    const getOnce = (self, type, handler, options) =>
      e => {
        self.removeEventListener(type, handler, options)
        getHandler(self, handler)(e)
      }

    // interface EventTarget // https://dom.spec.whatwg.org/#eventtarget
    class EventTarget {
      constructor () {
        const et = EventTarget.prototype
        ;[
          ['listeners', {}],
          ['addEventListener', et.addEventListener],
          ['removeEventListener', et.removeEventListener],
          ['dispatchEvent', et.dispatchEvent]
        ].forEach(p => {
          Object.defineProperty(this, p[0], {
            value: p[1],
            enumerable: false
          })
        })
      }

      addEventListener (type, handler, options) {
        const listener = this.listeners[type] || (this.listeners[type] = {
          handlers: [],
          callbacks: []
        })
        const i = listener.handlers.indexOf(handler)
        if (i < 0) {
          listener.callbacks[listener.handlers.push(handler) - 1] =
            options && options.once
              ? getOnce(this, type, handler, options)
              : getHandler(this, handler)
        }
      }

      removeEventListener (type, handler, options) {
        const listener = this.listeners[type]
        if (listener) {
          const i = listener.handlers.indexOf(handler)
          if (i > -1) {
            listener.handlers.splice(i, 1)
            listener.callbacks.splice(i, 1)
            if (listener.handlers.length < 1) {
              delete this.listeners[type]
            }
          }
        }
      }

      dispatchEvent (event) {
        const type = event.type
        let node = this
        if (!event.target) event.target = node
        if (!event.currentTarget) event.currentTarget = node
        event.eventPhase = Event.AT_TARGET
        do {
          if (type in node.listeners) {
            node.listeners[type].callbacks.some(cb => {
              cb(event)
              return event.cancelImmediateBubble
            })
          }
          event.eventPhase = Event.BUBBLING_PHASE
        } while (event.bubbles && !event.cancelBubble && (node = crawlUp(node)))
        return !event.defaultPrevented
      }
    }

    return EventTarget
  })()
}

export default _
