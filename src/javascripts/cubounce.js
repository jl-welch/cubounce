const cb = (() => {
  const cbAnimate = "cb-animate";

  function animateEnd({ animationName, srcElement }) {
    srcElement.classList.remove(cbAnimate, `cb-${animationName}`);
    srcElement.removeEventListener("animationend", animateEnd);
  }

  function animate(element, animation, options) {
    if (!animation) return this;
    let {duration, delay, count} = options;

    if (!isNaN(duration)) element.style.animationDuration = `${duration}ms`;
    if (!isNaN(delay))    element.style.animationDelay = `${delay}ms`;
    if (!isNaN(count) || count === "infinite") element.style.animationIterationCount = count;

    if (count !== "infinite") element.addEventListener("animationend", animateEnd);
    element.classList.add(cbAnimate, `cb-${animation}`);
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