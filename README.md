# cubounce

A set of powerful, easy to use CSS animations.

* Simple class names
* Animations for entrances, exits and whatever else

## Install

Install through npm:

```bash
$ npm install cubounce
```

## Basic usage

Include CSS in head and if needed JS before end of body

```html
<head>
  <link rel="stylesheet" href="cubounce.min.css">
</head>
<body>
  <script src="cubounce.min.js"></script>
</body>
```

## Using Cubounce through Cubounce.js

```javascript
const options = {
  animation:  "bounce", // omit "cb-"
  duration:   800, // ms
  delay:      200,
  count:      4 // accepts "infinite"
}

cb("#title").animate(options);
```

### Advanced selectors

```javascript
const options = {animation: "jelly"};

cb(".header > [data-title]").animate(options);
```

## Using Cubounce in HTML

```html
<h1 class="cb-animate cb-bounce cb-infinite cb-delay-2s">
```

Example of manually adding an animation through HTML

### Available animations

| Class Name  |
| ----------- |
| `cb-bounce` |
| `cb-flash`  |
| `cb-jelly`  |
| `cb-pulse`  |
| `cb-spin`   |

**Note:** When adding animations through Cubounce.js, _'cb-'_ should be omitted.

### Delay and Speed

_These class names aren't required_.

| Class Name    | Delay Time |
| ------------- | ---------- |
| `cb-delay-1s` | `1s`       |
| `cb-delay-2s` | `2s`       |
| `cb-delay-3s` | `3s`       |
| `cb-delay-4s` | `4s`       |
| `cb-delay-5s` | `5s`       |

**Note:** By default, there is no delay.

| Class Name   | Speed      |
| ------------ | ---------- |
| `cb-slowest` | `3s`       |
| `cb-slow`    | `2s`       |
| `cb-fast`    | `750ms`    |
| `cb-fastest` | `400ms`    |

**Note:** By default, the speed of each animation is 1s.