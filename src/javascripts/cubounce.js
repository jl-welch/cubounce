const cb = (() => {
  const className = "cb-animate";
  const animationName = [
    "bounce",
    "flash",
    "jelly",
    "pulse",
    "spin"
  ];

  function typeOf(obj, type) {
    if (obj && type) return obj["constructor"] === type;
  }

  function classHandler(animation, element, method) {
    element.classList[method](className, `cb-${animation}`);
  }

  function animateEvent(element, method) {
    element[method]("animationend", animateEnd);
  }

  function animateEnd({ animationName, srcElement }) {
    classHandler(animationName, srcElement, "remove");
    animateEvent(srcElement, "removeEventListener");
  }

  function animate(element, animation, options) {
    if (!animation || !animationName.includes(animation)) return this;
    let {duration, delay, count} = options;

    if (typeOf(duration, Number)) element.style.animationDuration = `${duration}ms`;
    if (typeOf(delay, Number))    element.style.animationDelay = `${delay}ms`;
    if (typeOf(count, Number) || count === "infinite") element.style.animationIterationCount = count;

    if (count !== "infinite") animateEvent(element, "addEventListener");
    classHandler(animation, element, "add");
  }

  let cb = function(selector) {
    return new cb.fn.init(selector);
  }

  cb.fn = cb.prototype;

  cb.fn.init = function(selector) {
    if (!selector || typeof selector !== "string") return this;

    this.el = document.querySelectorAll(selector);

    return this;
  }

  cb.fn.init.prototype = cb.fn;

  cb.fn.animate = function(animation, options = {}) {
    if (!this.el || !this.el.length) return this;
    
    this.el.forEach(element => animate(element, animation, options));

    return this;
  }

  return cb;
})();