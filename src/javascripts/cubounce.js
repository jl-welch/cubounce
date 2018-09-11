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

  const Cubounce = {
    handleAnimation(element, options) {
      let {animation, duration, delay, loop} = options;

      if (duration && this.checkType(duration, Number)) this.setAnimationProperty(element, "animationDuration", `${duration}ms`);
      if (delay    && this.checkType(delay, Number))    this.setAnimationProperty(element, "animationDelay", `${delay}ms`);
      if (loop     && this.checkType(loop, Boolean))    this.setAnimationProperty(element, "animationIterationCount", "infinite");

      let animationHandler = (listenerMethod) => element[listenerMethod]("animationend", removeClass);
      let classHandler     = (classMethod)    => element.classList[classMethod](className.ANIMATE, `cb-${animation}`);

      let removeClass = () => {
        classHandler("remove");
        animationHandler("removeEventListener");
      };

      if (!loop) animationHandler("addEventListener");
      classHandler("add");
    },

    checkType(obj, type) {
      if (obj) return obj["constructor"] === type;
    },

    logError(message) {
      console.error(message);
    },

    setAnimationProperty(element, property, value) {
      element.style[property] = value;
    },
    
    animate(options) {
      let {selector, animation} = options;

      if (!selector)  return this.logError(errorMessage.NOSELECTOR);
      if (!animation) return this.logError(errorMessage.NONAME);
      if (!animationName.includes(animation)) return this.logError(errorMessage.NOANIMATION);

      if (this.checkType(selector, Array)) {
        selector.map(currentSelector => document.querySelector(currentSelector))
        .forEach(element => this.handleAnimation(element, options));

        return;
      }

      this.handleAnimation(document.querySelector(selector), options);
    }
  };

  return Cubounce;
})();