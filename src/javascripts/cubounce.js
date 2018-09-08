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

  class Cubounce {
    animate(selector, name) {
      if (name.indexOf("cb-") !== -1) name = name.slice(3);
      if (!animation.includes(name)) return;
      if (!selector) return;

      let element;

      let addAnimationClass = (element) => {
        if (!element) return;
        this.animateEnd(element, `cb-${name}`);
        element.classList.add(className.ANIMATE, `cb-${name}`);
      }

      if (selector.constructor === Array) {
        element = selector.map(currentSelector => document.querySelector(currentSelector));
        element.forEach(currentElement => {
          addAnimationClass(currentElement);
        });
      } else {
        element = document.querySelector(selector);
        addAnimationClass(element);
      }
    }

    animateEnd(element, name) {
      if (!element) return;

      let removeAnimationClass = element => {  
        element.classList.remove(className.ANIMATE, name);
        element.removeEventListener("animationend", removeAnimationClass);
      }

      let removeAnimation = element => {
        if (!element) return;
        removeAnimationClass = removeAnimationClass.bind(this, element);
        element.addEventListener("animationend", removeAnimationClass);
      }

      if (element.constructor === Array) {
        element.forEach(currentElement => {
          removeAnimation(currentElement, name);
        });
      } else {
        removeAnimation(element);
      }
    }
  }

  return new Cubounce();
})();