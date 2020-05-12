try {
  var _ = Event
} catch (err) {
  _ = (function () {
    const getTime = () => {
      const time = process.hrtime()
      return time[0] * 1000000 + time[1] / 1000
    }

    // interface Event // https://dom.spec.whatwg.org/#event
    class Event {
      constructor (type, opts = {
        bubbles: false,
        cancelable: false,
        composed: false
      }) {
        this.isTrusted = false
        ;[
          ['type', type],
          ['bubbles', opts.bubbles],
          ['cancelable', opts.cancelable],
          ['composed', opts.composed],
          ['defaultPrevented', false],
          ['cancelBubble', false],
          ['cancelImmediateBubble', false],
          ['eventPhase', Event.NONE],
          ['timeStamp', getTime()],
          ['target', null],
          ['currentTarget', null]
        ].forEach(p => {
          Object.defineProperty(this, p[0], {
            value: p[1],
            enumerable: false,
            writable: true
          })
        })
      }

      stopPropagation () {
        this.cancelBubble = true
      }

      stopImmediatePropagation () {
        this.cancelBubble = true
        this.cancelImmediateBubble = true
      }

      preventDefault () {
        this.defaultPrevented = true
      }
    }

    Event.NONE = 0
    Event.CAPTURING_PHASE = 1
    Event.AT_TARGET = 2
    Event.BUBBLING_PHASE = 3

    return Event
  })()
}

export default _
