const Cubounce = (() => {

  const className = {
    ANIMATE:  "cb-animate",
    INFINITE: "cb-infinite",
    SLOWEST:  "cb-slowest",
    SLOW:     "cb-slow",
    FAST:     "cb-fast",
    FASTEST:  "cb-fastest"
  }

  const animation = [
    "bounce",
    "flash",
    "jelly",
    "pulse",
    "spin"
  ];

  const errorMessage = {
    NOSELECTOR:   "Please enter a valid selector.",
    NONAME:       "Please enter a valid animation name.",
    NOANIMATION:  `Beep boop. Whoops! Animation not found. Boop.`
  }

  const Cubounce = {
    handleAnimation(element, name) {
      let animationHandler = (listenerMethod) => element[listenerMethod]("animationend", removeClass);
      let classHandler     = (classMethod)    => element.classList[classMethod](className.ANIMATE, `cb-${name}`);

      let removeClass = () => {
        classHandler("remove")
        animationHandler("removeEventListener");
      }

      animationHandler("addEventListener");
      classHandler("add");
    },

    isArray(obj) {
      if (obj) return obj.constructor === Array;
    },

    logError(message) {
      console.error(message);
    },
    
    animate(selector, name) {
      if (!selector) return this.logError(errorMessage.NOSELECTOR);
      if (!name)     return this.logError(errorMessage.NONAME);
      if (name.indexOf("cb-") === 0) name = name.slice(3);
      if (!animation.includes(name)) return this.logError(errorMessage.NOANIMATION);

      if (this.isArray(selector)) {
        selector.map(currentSelector => document.querySelector(currentSelector))
        .forEach(element => this.handleAnimation(element, name));

        return;
      }

      this.handleAnimation(document.querySelector(selector), name);
    }
  }

  return Cubounce;
})();

Cubounce.animate(["#yo", "#oy"], "cb-hurr");

//Cubounce.animate("#oy", "cb-bounce");