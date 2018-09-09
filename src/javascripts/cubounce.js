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

  const Cubounce = {
    animationStart(element, name) {
      this.animationListener = this.removeClass.bind(this, element, name);
      element.addEventListener("animationend", this.animationListener);
    },

    animationEnd(element) {
      element.removeEventListener("animationend", this.animationListener);
    },
    
    addClass(element, name) {
      this.animationStart(element, name);
      element.classList.add(className.ANIMATE, `cb-${name}`);
    },

    removeClass(element, name) {
      element.classList.remove(className.ANIMATE, `cb-${name}`);
      this.animationEnd(element);
    },

    isArray(obj) {
      if (obj) return obj.constructor === Array;
    },
    
    animate(selector, name) {
      if (!selector || !name) return;
      if (name.indexOf("cb-") === 0) name = name.slice(3);
      if (!animation.includes(name)) return;

      if (this.isArray(selector)) {
        selector.map(currentSelector => document.querySelector(currentSelector))
        .forEach(element => this.addClass(element, name));

        return;
      }

      this.addClass(document.querySelector(selector), name);
    },


  }

  return Cubounce;
})();

Cubounce.animate("#yo", "cb-bounce");