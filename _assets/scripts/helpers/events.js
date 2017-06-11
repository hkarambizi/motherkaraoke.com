/**
 * Custom javascript events of jQuery functions
 */
/**
 * Custom event dispatcher (mimics jquery trigger)
 * @param  {element} element   Element to trigger on
 * @param  {string} eventname Custom event name
 * @param  {Object} [obj={}]  Custom parameters to pass along (find in event.detail)
 * @return {null}           No return value
 */
export function trigger(element, eventname, obj = {}) {
  let event;

  if (window.CustomEvent) {
    event = new CustomEvent(eventname, { detail: obj });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventname, true, true, obj);
  }

  element.dispatchEvent(event);
}

/**
 * Delegate event listener to children (mimics jquery behavior)
 * (source: http://bdadam.com/blog/plain-javascript-event-delegation.html)
 * @param  {element} element  DOM parent element
 * @param  {string} evt      Event to listen to
 * @param  {string} selector Selector to match children by
 * @param  {function} handler  Function to run as event handler
 * @return {null}          No Return
 */
export function delegateEventListener(element, evt, selector, handler) {
  const el = element;
  el.addEventListener(evt, (event) => {
    const possibleTargets = el.querySelectorAll(selector);
    const target = event.target;

    for (let i = 0, l = possibleTargets.length; i < l; i++) {
      let t = target;
      const p = possibleTargets[i];

      while (t && t !== element) {
        if (t === p) {
          return handler.call(p, event);
        }

        t = t.parentNode;
      }
    }
    return false;
  });
  /* element.addEventListener(evt, function callback(event) {
    const e = event || window.event;

    let t = e.target;

    while (t && t !== this) {
      console.log(`while t: ${t}`);
      if (t.matches(selector)) {
        console.log(`match t: ${t}`);
        handler.call(t, event);
      }
      console.log(`outside t: ${t}`);
      t = t.parentNode;
    }
  });
  */
}
