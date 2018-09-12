const Cubounce = (() => {
  const className = {
    ANIMATE:  "cb-animate"
  };

  const errorMessage = {
    NOSELECTOR:   "No element selector provided.",
    NONAME:       "No animation name provided.",
    NOANIMATION:  "No animation with that name found."
  };

  const animationName = [
    "bounce",
    "flash",
    "jelly",
    "pulse",
    "spin"
  ];

  function logError(message) {
    console.error(message);
  }

  function checkType(obj, type) {
    if (obj) return obj["constructor"] === type;
  }

  function setAnimationProperty(element, property, value) {
    element.style[property] = value;
  }

  function classHandler(animation, element, method) {
    element.classList[method](className.ANIMATE, `cb-${animation}`);
  }

  function animationEvent(element, method) {
    element[method]("animationend", animationEnd);
  }

  function animationEnd(event) {
    classHandler(event.animationName, event.srcElement, "remove");
    animationEvent(event.srcElement, "removeEventListener");
  }

  function handleAnimation(element, options) {
    let {animation, duration, delay, loop} = options;

    if (duration && checkType(duration, Number)) setAnimationProperty(element, "animationDuration", `${duration}ms`);
    if (delay    && checkType(delay, Number))    setAnimationProperty(element, "animationDelay", `${delay}ms`);
    if (loop     && checkType(loop, Boolean))    setAnimationProperty(element, "animationIterationCount", "infinite");

    if (!loop) animationEvent(element, "addEventListener");
    classHandler(animation, element, "add");
  }

  const Cubounce = {
    animate(options) {
      let {selector, animation} = options;

      if (!selector)  return logError(errorMessage.NOSELECTOR);
      if (!animation) return logError(errorMessage.NONAME);
      if (!animationName.includes(animation)) return logError(errorMessage.NOANIMATION);

      if (checkType(selector, Array)) {
        selector.map(currentSelector => document.querySelector(currentSelector))
        .forEach(element => handleAnimation(element, options));

        return;
      }

      handleAnimation(document.querySelector(selector), options);
    }
  };

  return Cubounce;
})();