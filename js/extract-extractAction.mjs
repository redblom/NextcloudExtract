/*! third party licenses: js/vendor.LICENSE.txt */
const appName = "extract";
const appVersion = "1.4.0";
function getDefaultExportFromCjs$1(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var browser = { exports: {} };
var process$1 = browser.exports = {};
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    if (typeof setTimeout === "function") {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e2) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === "function") {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e2) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e2) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e22) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e2) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e22) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process$1.nextTick = function(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function() {
  this.fun.apply(null, this.array);
};
process$1.title = "browser";
process$1.browser = true;
process$1.env = {};
process$1.argv = [];
process$1.version = "";
process$1.versions = {};
function noop$1() {
}
process$1.on = noop$1;
process$1.addListener = noop$1;
process$1.once = noop$1;
process$1.off = noop$1;
process$1.removeListener = noop$1;
process$1.removeAllListeners = noop$1;
process$1.emit = noop$1;
process$1.prependListener = noop$1;
process$1.prependOnceListener = noop$1;
process$1.listeners = function(name) {
  return [];
};
process$1.binding = function(name) {
  throw new Error("process.binding is not supported");
};
process$1.cwd = function() {
  return "/";
};
process$1.chdir = function(dir) {
  throw new Error("process.chdir is not supported");
};
process$1.umask = function() {
  return 0;
};
var browserExports = browser.exports;
const process$1$1 = /* @__PURE__ */ getDefaultExportFromCjs$1(browserExports);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var define_process_env_default$2 = {};
const debug$2 = typeof process$1$1 === "object" && define_process_env_default$2 && define_process_env_default$2.NODE_DEBUG && /\bsemver\b/i.test(define_process_env_default$2.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
};
var debug_1$1 = debug$2;
const SEMVER_SPEC_VERSION$1 = "2.0.0";
const MAX_LENGTH$2 = 256;
const MAX_SAFE_INTEGER$2 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991;
const MAX_SAFE_COMPONENT_LENGTH$1 = 16;
const MAX_SAFE_BUILD_LENGTH$1 = MAX_LENGTH$2 - 6;
const RELEASE_TYPES$1 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var constants$1 = {
  MAX_LENGTH: MAX_LENGTH$2,
  MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH$1,
  MAX_SAFE_BUILD_LENGTH: MAX_SAFE_BUILD_LENGTH$1,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$2,
  RELEASE_TYPES: RELEASE_TYPES$1,
  SEMVER_SPEC_VERSION: SEMVER_SPEC_VERSION$1,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
var re$2 = { exports: {} };
(function(module, exports) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2,
    MAX_SAFE_BUILD_LENGTH: MAX_SAFE_BUILD_LENGTH2,
    MAX_LENGTH: MAX_LENGTH2
  } = constants$1;
  const debug2 = debug_1$1;
  exports = module.exports = {};
  const re2 = exports.re = [];
  const safeRe = exports.safeRe = [];
  const src = exports.src = [];
  const t2 = exports.t = {};
  let R = 0;
  const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
  const safeRegexReplacements = [
    ["\\s", 1],
    ["\\d", MAX_LENGTH2],
    [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH2]
  ];
  const makeSafeRegex = (value) => {
    for (const [token, max2] of safeRegexReplacements) {
      value = value.split(`${token}*`).join(`${token}{0,${max2}}`).split(`${token}+`).join(`${token}{1,${max2}}`);
    }
    return value;
  };
  const createToken = (name, value, isGlobal) => {
    const safe = makeSafeRegex(value);
    const index = R++;
    debug2(name, index, value);
    t2[name] = index;
    src[index] = value;
    re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
    safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
  createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
  createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
  createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
  createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
  createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?`);
  createToken("COERCE", `${src[t2.COERCEPLAIN]}(?:$|[^\\d])`);
  createToken("COERCEFULL", src[t2.COERCEPLAIN] + `(?:${src[t2.PRERELEASE]})?(?:${src[t2.BUILD]})?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t2.COERCE], true);
  createToken("COERCERTLFULL", src[t2.COERCEFULL], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
  exports.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
  exports.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
  exports.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(re$2, re$2.exports);
var reExports = re$2.exports;
const looseOption = Object.freeze({ loose: true });
const emptyOpts = Object.freeze({});
const parseOptions$1 = (options) => {
  if (!options) {
    return emptyOpts;
  }
  if (typeof options !== "object") {
    return looseOption;
  }
  return options;
};
var parseOptions_1 = parseOptions$1;
const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);
  if (anum && bnum) {
    a = +a;
    b = +b;
  }
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);
var identifiers = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};
const debug = debug_1$1;
const { MAX_LENGTH, MAX_SAFE_INTEGER } = constants$1;
const { safeRe: re, t: t$1 } = reExports;
const parseOptions = parseOptions_1;
const { compareIdentifiers } = identifiers;
let SemVer$2 = class SemVer {
  constructor(version2, options) {
    options = parseOptions(options);
    if (version2 instanceof SemVer) {
      if (version2.loose === !!options.loose && version2.includePrerelease === !!options.includePrerelease) {
        return version2;
      } else {
        version2 = version2.version;
      }
    } else if (typeof version2 !== "string") {
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version2}".`);
    }
    if (version2.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      );
    }
    debug("SemVer", version2, options);
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    const m = version2.trim().match(options.loose ? re[t$1.LOOSE] : re[t$1.FULL]);
    if (!m) {
      throw new TypeError(`Invalid Version: ${version2}`);
    }
    this.raw = version2;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map((id2) => {
        if (/^[0-9]+$/.test(id2)) {
          const num = +id2;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id2;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join(".")}`;
    }
    return this.version;
  }
  toString() {
    return this.version;
  }
  compare(other) {
    debug("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      if (typeof other === "string" && other === this.version) {
        return 0;
      }
      other = new SemVer(other, this.options);
    }
    if (other.version === this.version) {
      return 0;
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }
  comparePre(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  compareBuild(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug("build compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(release, identifier, identifierBase) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier, identifierBase);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier, identifierBase);
        this.inc("pre", identifier, identifierBase);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier, identifierBase);
        }
        this.inc("pre", identifier, identifierBase);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre": {
        const base = Number(identifierBase) ? 1 : 0;
        if (!identifier && identifierBase === false) {
          throw new Error("invalid increment argument: identifier is empty");
        }
        if (this.prerelease.length === 0) {
          this.prerelease = [base];
        } else {
          let i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === "number") {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            if (identifier === this.prerelease.join(".") && identifierBase === false) {
              throw new Error("invalid increment argument: identifier already exists");
            }
            this.prerelease.push(base);
          }
        }
        if (identifier) {
          let prerelease = [identifier, base];
          if (identifierBase === false) {
            prerelease = [identifier];
          }
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = prerelease;
            }
          } else {
            this.prerelease = prerelease;
          }
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${release}`);
    }
    this.raw = this.format();
    if (this.build.length) {
      this.raw += `+${this.build.join(".")}`;
    }
    return this;
  }
};
var semver = SemVer$2;
const SemVer$1 = semver;
const parse$1 = (version2, options, throwErrors = false) => {
  if (version2 instanceof SemVer$1) {
    return version2;
  }
  try {
    return new SemVer$1(version2, options);
  } catch (er) {
    if (!throwErrors) {
      return null;
    }
    throw er;
  }
};
var parse_1 = parse$1;
const parse = parse_1;
const valid = (version2, options) => {
  const v = parse(version2, options);
  return v ? v.version : null;
};
var valid_1 = valid;
const valid$1 = /* @__PURE__ */ getDefaultExportFromCjs(valid_1);
const SemVer2 = semver;
const major = (a, loose) => new SemVer2(a, loose).major;
var major_1 = major;
const major$1 = /* @__PURE__ */ getDefaultExportFromCjs(major_1);
class ProxyBus {
  bus;
  constructor(bus2) {
    if (typeof bus2.getVersion !== "function" || !valid$1(bus2.getVersion())) {
      console.warn("Proxying an event bus with an unknown or invalid version");
    } else if (major$1(bus2.getVersion()) !== major$1(this.getVersion())) {
      console.warn(
        "Proxying an event bus of version " + bus2.getVersion() + " with " + this.getVersion()
      );
    }
    this.bus = bus2;
  }
  getVersion() {
    return "3.3.1";
  }
  subscribe(name, handler) {
    this.bus.subscribe(name, handler);
  }
  unsubscribe(name, handler) {
    this.bus.unsubscribe(name, handler);
  }
  emit(name, event) {
    this.bus.emit(name, event);
  }
}
class SimpleBus {
  handlers = /* @__PURE__ */ new Map();
  getVersion() {
    return "3.3.1";
  }
  subscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).concat(
        handler
      )
    );
  }
  unsubscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).filter((h) => h !== handler)
    );
  }
  emit(name, event) {
    (this.handlers.get(name) || []).forEach((h) => {
      try {
        h(event);
      } catch (e2) {
        console.error("could not invoke event listener", e2);
      }
    });
  }
}
let bus = null;
function getBus() {
  if (bus !== null) {
    return bus;
  }
  if (typeof window === "undefined") {
    return new Proxy({}, {
      get: () => {
        return () => console.error(
          "Window not available, EventBus can not be established!"
        );
      }
    });
  }
  if (window.OC?._eventBus && typeof window._nc_event_bus === "undefined") {
    console.warn(
      "found old event bus instance at OC._eventBus. Update your version!"
    );
    window._nc_event_bus = window.OC._eventBus;
  }
  if (typeof window?._nc_event_bus !== "undefined") {
    bus = new ProxyBus(window._nc_event_bus);
  } else {
    bus = window._nc_event_bus = new SimpleBus();
  }
  return bus;
}
function subscribe(name, handler) {
  getBus().subscribe(name, handler);
}
function emit(name, event) {
  getBus().emit(name, event);
}
let r$1;
const u$1 = [];
function d() {
  if (r$1 === void 0) {
    const e2 = document?.getElementsByTagName("head")[0];
    r$1 = e2 ? e2.getAttribute("data-requesttoken") : null;
  }
  return r$1;
}
function c(e2) {
  u$1.push(e2);
}
subscribe("csrf-token-update", (e2) => {
  r$1 = e2.token, u$1.forEach((t2) => {
    try {
      t2(r$1);
    } catch (s) {
      console.error("error updating CSRF token observer", s);
    }
  });
});
let n$1;
const o = (e2, t2) => e2 ? e2.getAttribute(t2) : null;
function l() {
  if (n$1 !== void 0)
    return n$1;
  const e2 = document?.getElementsByTagName("head")[0];
  if (!e2)
    return null;
  const t2 = o(e2, "data-user");
  return t2 === null ? (n$1 = null, n$1) : (n$1 = {
    uid: t2,
    displayName: o(e2, "data-user-displayname"),
    isAdmin: !!window._oc_isadmin
  }, n$1);
}
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["Debug"] = 0] = "Debug";
  LogLevel2[LogLevel2["Info"] = 1] = "Info";
  LogLevel2[LogLevel2["Warn"] = 2] = "Warn";
  LogLevel2[LogLevel2["Error"] = 3] = "Error";
  LogLevel2[LogLevel2["Fatal"] = 4] = "Fatal";
  return LogLevel2;
})(LogLevel || {});
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, key + "", value);
  return value;
};
class ConsoleLogger {
  constructor(context) {
    __publicField$1(this, "context");
    this.context = context || {};
  }
  formatMessage(message, level, context) {
    let msg = "[" + LogLevel[level].toUpperCase() + "] ";
    if (context && context.app) {
      msg += context.app + ": ";
    }
    if (typeof message === "string")
      return msg + message;
    msg += "Unexpected ".concat(message.name);
    if (message.message)
      msg += ' "'.concat(message.message, '"');
    if (level === LogLevel.Debug && message.stack)
      msg += "\n\nStack trace:\n".concat(message.stack);
    return msg;
  }
  log(level, message, context) {
    var _a2, _b;
    if (typeof ((_a2 = this.context) == null ? void 0 : _a2.level) === "number" && level < ((_b = this.context) == null ? void 0 : _b.level)) {
      return;
    }
    if (typeof message === "object" && (context == null ? void 0 : context.error) === void 0) {
      context.error = message;
    }
    switch (level) {
      case LogLevel.Debug:
        console.debug(this.formatMessage(message, LogLevel.Debug, context), context);
        break;
      case LogLevel.Info:
        console.info(this.formatMessage(message, LogLevel.Info, context), context);
        break;
      case LogLevel.Warn:
        console.warn(this.formatMessage(message, LogLevel.Warn, context), context);
        break;
      case LogLevel.Error:
        console.error(this.formatMessage(message, LogLevel.Error, context), context);
        break;
      case LogLevel.Fatal:
      default:
        console.error(this.formatMessage(message, LogLevel.Fatal, context), context);
        break;
    }
  }
  debug(message, context) {
    this.log(LogLevel.Debug, message, Object.assign({}, this.context, context));
  }
  info(message, context) {
    this.log(LogLevel.Info, message, Object.assign({}, this.context, context));
  }
  warn(message, context) {
    this.log(LogLevel.Warn, message, Object.assign({}, this.context, context));
  }
  error(message, context) {
    this.log(LogLevel.Error, message, Object.assign({}, this.context, context));
  }
  fatal(message, context) {
    this.log(LogLevel.Fatal, message, Object.assign({}, this.context, context));
  }
}
function buildConsoleLogger(context) {
  return new ConsoleLogger(context);
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class LoggerBuilder {
  constructor(factory) {
    __publicField(this, "context");
    __publicField(this, "factory");
    this.context = {};
    this.factory = factory;
  }
  /**
   * Set the app name within the logging context
   *
   * @param appId App name
   */
  setApp(appId) {
    this.context.app = appId;
    return this;
  }
  /**
   * Set the logging level within the logging context
   *
   * @param level Logging level
   */
  setLogLevel(level) {
    this.context.level = level;
    return this;
  }
  /* eslint-disable jsdoc/no-undefined-types */
  /**
   * Set the user id within the logging context
   * @param uid User ID
   * @see {@link detectUser}
   */
  /* eslint-enable jsdoc/no-undefined-types */
  setUid(uid2) {
    this.context.uid = uid2;
    return this;
  }
  /**
   * Detect the currently logged in user and set the user id within the logging context
   */
  detectUser() {
    const user = l();
    if (user !== null) {
      this.context.uid = user.uid;
    }
    return this;
  }
  /**
   * Detect and use logging level configured in nextcloud config
   */
  detectLogLevel() {
    const self2 = this;
    const onLoaded = () => {
      var _a2, _b;
      if (document.readyState === "complete" || document.readyState === "interactive") {
        self2.context.level = (_b = (_a2 = window._oc_config) == null ? void 0 : _a2.loglevel) != null ? _b : LogLevel.Warn;
        if (window._oc_debug) {
          self2.context.level = LogLevel.Debug;
        }
        document.removeEventListener("readystatechange", onLoaded);
      } else {
        document.addEventListener("readystatechange", onLoaded);
      }
    };
    onLoaded();
    return this;
  }
  /** Build a logger using the logging context and factory */
  build() {
    if (this.context.level === void 0) {
      this.detectLogLevel();
    }
    return this.factory(this.context);
  }
}
function getLoggerBuilder() {
  return new LoggerBuilder(buildConsoleLogger);
}
function assertPath(path) {
  if (typeof path !== "string") {
    throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
  }
}
function normalizeStringPosix(path, allowAboveRoot) {
  var res = "";
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code2;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code2 = path.charCodeAt(i);
    else if (code2 === 47)
      break;
    else
      code2 = 47;
    if (code2 === 47) {
      if (lastSlash === i - 1 || dots === 1) ;
      else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = "";
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += "/..";
          else
            res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += "/" + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code2 === 46 && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}
var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = "";
    var resolvedAbsolute = false;
    var cwd;
    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === void 0)
          cwd = process$1$1.cwd();
        path = cwd;
      }
      assertPath(path);
      if (path.length === 0) {
        continue;
      }
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47;
    }
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return "/" + resolvedPath;
      else
        return "/";
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return ".";
    }
  },
  normalize: function normalize(path) {
    assertPath(path);
    if (path.length === 0) return ".";
    var isAbsolute2 = path.charCodeAt(0) === 47;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47;
    path = normalizeStringPosix(path, !isAbsolute2);
    if (path.length === 0 && !isAbsolute2) path = ".";
    if (path.length > 0 && trailingSeparator) path += "/";
    if (isAbsolute2) return "/" + path;
    return path;
  },
  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47;
  },
  join: function join() {
    if (arguments.length === 0)
      return ".";
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === void 0)
          joined = arg;
        else
          joined += "/" + arg;
      }
    }
    if (joined === void 0)
      return ".";
    return posix.normalize(joined);
  },
  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);
    if (from === to) return "";
    from = posix.resolve(from);
    to = posix.resolve(to);
    if (from === to) return "";
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47) {
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47) {
            lastCommonSep = i;
          } else if (i === 0) {
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47)
        lastCommonSep = i;
    }
    var out = "";
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47) {
        if (out.length === 0)
          out += "..";
        else
          out += "/..";
      }
    }
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47)
        ++toStart;
      return to.slice(toStart);
    }
  },
  _makeLong: function _makeLong(path) {
    return path;
  },
  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return ".";
    var code2 = path.charCodeAt(0);
    var hasRoot = code2 === 47;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code2 = path.charCodeAt(i);
      if (code2 === 47) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        matchedSlash = false;
      }
    }
    if (end === -1) return hasRoot ? "/" : ".";
    if (hasRoot && end === 1) return "//";
    return path.slice(0, end);
  },
  basename: function basename(path, ext) {
    if (ext !== void 0 && typeof ext !== "string") throw new TypeError('"ext" argument must be a string');
    assertPath(path);
    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;
    if (ext !== void 0 && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return "";
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code2 = path.charCodeAt(i);
        if (code2 === 47) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            if (code2 === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                end = i;
              }
            } else {
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }
      if (start === end) end = firstNonSlashEnd;
      else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1) return "";
      return path.slice(start, end);
    }
  },
  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code2 = path.charCodeAt(i);
      if (code2 === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code2 === 46) {
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return "";
    }
    return path.slice(startDot, end);
  },
  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== "object") {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format("/", pathObject);
  },
  parse: function parse2(path) {
    assertPath(path);
    var ret = { root: "", dir: "", base: "", ext: "", name: "" };
    if (path.length === 0) return ret;
    var code2 = path.charCodeAt(0);
    var isAbsolute2 = code2 === 47;
    var start;
    if (isAbsolute2) {
      ret.root = "/";
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;
    var preDotState = 0;
    for (; i >= start; --i) {
      code2 = path.charCodeAt(i);
      if (code2 === 47) {
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
      if (end === -1) {
        matchedSlash = false;
        end = i + 1;
      }
      if (code2 === 46) {
        if (startDot === -1) startDot = i;
        else if (preDotState !== 1) preDotState = 1;
      } else if (startDot !== -1) {
        preDotState = -1;
      }
    }
    if (startDot === -1 || end === -1 || // We saw a non-dot character immediately before the dot
    preDotState === 0 || // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute2) ret.base = ret.name = path.slice(1, end);
        else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute2) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }
    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
    else if (isAbsolute2) ret.dir = "/";
    return ret;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
posix.posix = posix;
var pathBrowserify = posix;
function encodePath(path) {
  if (!path) {
    return path;
  }
  return path.split("/").map(encodeURIComponent).join("/");
}
const g = (n2) => "/remote.php/" + n2, U = (n2, e2) => {
  var o2;
  return ((o2 = void 0) != null ? o2 : w()) + g(n2);
}, u = (n2, e2, o2) => {
  const c2 = Object.assign({
    escape: true
  }, {}), r2 = function(i, s) {
    return s = s || {}, i.replace(
      /{([^{}]*)}/g,
      function(l2, t2) {
        const a = s[t2];
        return c2.escape ? encodeURIComponent(typeof a == "string" || typeof a == "number" ? a.toString() : l2) : typeof a == "string" || typeof a == "number" ? a.toString() : l2;
      }
    );
  };
  return n2.charAt(0) !== "/" && (n2 = "/" + n2), r2(n2, {});
}, _ = (n2, e2, o2) => {
  var c2, r2, i;
  const s = Object.assign({
    noRewrite: false
  }, {}), l2 = (c2 = void 0) != null ? c2 : f();
  return ((i = (r2 = window == null ? void 0 : window.OC) == null ? void 0 : r2.config) == null ? void 0 : i.modRewriteWorking) === true && !s.noRewrite ? l2 + u(n2) : l2 + "/index.php" + u(n2);
}, w = () => window.location.protocol + "//" + window.location.host + f();
function f() {
  let n2 = window._oc_webroot;
  if (typeof n2 > "u") {
    n2 = location.pathname;
    const e2 = n2.indexOf("/index.php/");
    if (e2 !== -1)
      n2 = n2.slice(0, e2);
    else {
      const o2 = n2.indexOf("/", 1);
      n2 = n2.slice(0, o2 > 0 ? o2 : void 0);
    }
  }
  return n2;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action2) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action2 + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
var toStringTag = typeof Symbol !== "undefined" ? Symbol.toStringTag : "@@toStringTag";
var _internals = /* @__PURE__ */ new WeakMap();
var _promise = /* @__PURE__ */ new WeakMap();
class CancelablePromiseInternal {
  constructor(_ref) {
    var {
      executor = () => {
      },
      internals = defaultInternals(),
      promise = new Promise((resolve3, reject2) => executor(resolve3, reject2, (onCancel) => {
        internals.onCancelList.push(onCancel);
      }))
    } = _ref;
    _classPrivateFieldInitSpec(this, _internals, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _promise, {
      writable: true,
      value: void 0
    });
    _defineProperty(this, toStringTag, "CancelablePromise");
    this.cancel = this.cancel.bind(this);
    _classPrivateFieldSet(this, _internals, internals);
    _classPrivateFieldSet(this, _promise, promise || new Promise((resolve3, reject2) => executor(resolve3, reject2, (onCancel) => {
      internals.onCancelList.push(onCancel);
    })));
  }
  then(onfulfilled, onrejected) {
    return makeCancelable(_classPrivateFieldGet(this, _promise).then(createCallback(onfulfilled, _classPrivateFieldGet(this, _internals)), createCallback(onrejected, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
  }
  catch(onrejected) {
    return makeCancelable(_classPrivateFieldGet(this, _promise).catch(createCallback(onrejected, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
  }
  finally(onfinally, runWhenCanceled) {
    if (runWhenCanceled) {
      _classPrivateFieldGet(this, _internals).onCancelList.push(onfinally);
    }
    return makeCancelable(_classPrivateFieldGet(this, _promise).finally(createCallback(() => {
      if (onfinally) {
        if (runWhenCanceled) {
          _classPrivateFieldGet(this, _internals).onCancelList = _classPrivateFieldGet(this, _internals).onCancelList.filter((callback) => callback !== onfinally);
        }
        return onfinally();
      }
    }, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
  }
  cancel() {
    _classPrivateFieldGet(this, _internals).isCanceled = true;
    var callbacks = _classPrivateFieldGet(this, _internals).onCancelList;
    _classPrivateFieldGet(this, _internals).onCancelList = [];
    for (var callback of callbacks) {
      if (typeof callback === "function") {
        try {
          callback();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  isCanceled() {
    return _classPrivateFieldGet(this, _internals).isCanceled === true;
  }
}
class CancelablePromise extends CancelablePromiseInternal {
  constructor(executor) {
    super({
      executor
    });
  }
}
_defineProperty(CancelablePromise, "all", function all(iterable) {
  return makeAllCancelable(iterable, Promise.all(iterable));
});
_defineProperty(CancelablePromise, "allSettled", function allSettled(iterable) {
  return makeAllCancelable(iterable, Promise.allSettled(iterable));
});
_defineProperty(CancelablePromise, "any", function any(iterable) {
  return makeAllCancelable(iterable, Promise.any(iterable));
});
_defineProperty(CancelablePromise, "race", function race(iterable) {
  return makeAllCancelable(iterable, Promise.race(iterable));
});
_defineProperty(CancelablePromise, "resolve", function resolve2(value) {
  return cancelable(Promise.resolve(value));
});
_defineProperty(CancelablePromise, "reject", function reject(reason) {
  return cancelable(Promise.reject(reason));
});
_defineProperty(CancelablePromise, "isCancelable", isCancelablePromise);
function cancelable(promise) {
  return makeCancelable(promise, defaultInternals());
}
function isCancelablePromise(promise) {
  return promise instanceof CancelablePromise || promise instanceof CancelablePromiseInternal;
}
function createCallback(onResult, internals) {
  if (onResult) {
    return (arg) => {
      if (!internals.isCanceled) {
        var result = onResult(arg);
        if (isCancelablePromise(result)) {
          internals.onCancelList.push(result.cancel);
        }
        return result;
      }
      return arg;
    };
  }
}
function makeCancelable(promise, internals) {
  return new CancelablePromiseInternal({
    internals,
    promise
  });
}
function makeAllCancelable(iterable, promise) {
  var internals = defaultInternals();
  internals.onCancelList.push(() => {
    for (var resolvable of iterable) {
      if (isCancelablePromise(resolvable)) {
        resolvable.cancel();
      }
    }
  });
  return new CancelablePromiseInternal({
    internals,
    promise
  });
}
function defaultInternals() {
  return {
    isCanceled: false,
    onCancelList: []
  };
}
const global$e = globalThis || void 0 || self;
var define_process_env_default$1 = {};
/*! For license information please see index.js.LICENSE.txt */
var t = { 2: (t2) => {
  function e2(t3, e3, o2) {
    t3 instanceof RegExp && (t3 = n2(t3, o2)), e3 instanceof RegExp && (e3 = n2(e3, o2));
    var i2 = r2(t3, e3, o2);
    return i2 && { start: i2[0], end: i2[1], pre: o2.slice(0, i2[0]), body: o2.slice(i2[0] + t3.length, i2[1]), post: o2.slice(i2[1] + e3.length) };
  }
  function n2(t3, e3) {
    var n3 = e3.match(t3);
    return n3 ? n3[0] : null;
  }
  function r2(t3, e3, n3) {
    var r3, o2, i2, s2, a2, c2 = n3.indexOf(t3), u2 = n3.indexOf(e3, c2 + 1), l2 = c2;
    if (c2 >= 0 && u2 > 0) {
      for (r3 = [], i2 = n3.length; l2 >= 0 && !a2; ) l2 == c2 ? (r3.push(l2), c2 = n3.indexOf(t3, l2 + 1)) : 1 == r3.length ? a2 = [r3.pop(), u2] : ((o2 = r3.pop()) < i2 && (i2 = o2, s2 = u2), u2 = n3.indexOf(e3, l2 + 1)), l2 = c2 < u2 && c2 >= 0 ? c2 : u2;
      r3.length && (a2 = [i2, s2]);
    }
    return a2;
  }
  t2.exports = e2, e2.range = r2;
}, 101: function(t2, e2, n2) {
  var r2;
  t2 = n2.nmd(t2), function(o2) {
    var i2 = (t2 && t2.exports, "object" == typeof global$e && global$e);
    i2.global !== i2 && i2.window;
    var s2 = function(t3) {
      this.message = t3;
    };
    (s2.prototype = new Error()).name = "InvalidCharacterError";
    var a2 = function(t3) {
      throw new s2(t3);
    }, c2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u2 = /[\t\n\f\r ]/g, l2 = { encode: function(t3) {
      t3 = String(t3), /[^\0-\xFF]/.test(t3) && a2("The string to be encoded contains characters outside of the Latin1 range.");
      for (var e3, n3, r3, o3, i3 = t3.length % 3, s3 = "", u3 = -1, l3 = t3.length - i3; ++u3 < l3; ) e3 = t3.charCodeAt(u3) << 16, n3 = t3.charCodeAt(++u3) << 8, r3 = t3.charCodeAt(++u3), s3 += c2.charAt((o3 = e3 + n3 + r3) >> 18 & 63) + c2.charAt(o3 >> 12 & 63) + c2.charAt(o3 >> 6 & 63) + c2.charAt(63 & o3);
      return 2 == i3 ? (e3 = t3.charCodeAt(u3) << 8, n3 = t3.charCodeAt(++u3), s3 += c2.charAt((o3 = e3 + n3) >> 10) + c2.charAt(o3 >> 4 & 63) + c2.charAt(o3 << 2 & 63) + "=") : 1 == i3 && (o3 = t3.charCodeAt(u3), s3 += c2.charAt(o3 >> 2) + c2.charAt(o3 << 4 & 63) + "=="), s3;
    }, decode: function(t3) {
      var e3 = (t3 = String(t3).replace(u2, "")).length;
      e3 % 4 == 0 && (e3 = (t3 = t3.replace(/==?$/, "")).length), (e3 % 4 == 1 || /[^+a-zA-Z0-9/]/.test(t3)) && a2("Invalid character: the string to be decoded is not correctly encoded.");
      for (var n3, r3, o3 = 0, i3 = "", s3 = -1; ++s3 < e3; ) r3 = c2.indexOf(t3.charAt(s3)), n3 = o3 % 4 ? 64 * n3 + r3 : r3, o3++ % 4 && (i3 += String.fromCharCode(255 & n3 >> (-2 * o3 & 6)));
      return i3;
    }, version: "1.0.0" };
    void 0 === (r2 = function() {
      return l2;
    }.call(e2, n2, e2, t2)) || (t2.exports = r2);
  }();
}, 172: (t2, e2) => {
  e2.d = function(t3) {
    if (!t3) return 0;
    for (var e3 = (t3 = t3.toString()).length, n2 = t3.length; n2--; ) {
      var r2 = t3.charCodeAt(n2);
      56320 <= r2 && r2 <= 57343 && n2--, 127 < r2 && r2 <= 2047 ? e3++ : 2047 < r2 && r2 <= 65535 && (e3 += 2);
    }
    return e3;
  };
}, 526: (t2) => {
  var e2 = { utf8: { stringToBytes: function(t3) {
    return e2.bin.stringToBytes(unescape(encodeURIComponent(t3)));
  }, bytesToString: function(t3) {
    return decodeURIComponent(escape(e2.bin.bytesToString(t3)));
  } }, bin: { stringToBytes: function(t3) {
    for (var e3 = [], n2 = 0; n2 < t3.length; n2++) e3.push(255 & t3.charCodeAt(n2));
    return e3;
  }, bytesToString: function(t3) {
    for (var e3 = [], n2 = 0; n2 < t3.length; n2++) e3.push(String.fromCharCode(t3[n2]));
    return e3.join("");
  } } };
  t2.exports = e2;
}, 298: (t2) => {
  var e2, n2;
  e2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n2 = { rotl: function(t3, e3) {
    return t3 << e3 | t3 >>> 32 - e3;
  }, rotr: function(t3, e3) {
    return t3 << 32 - e3 | t3 >>> e3;
  }, endian: function(t3) {
    if (t3.constructor == Number) return 16711935 & n2.rotl(t3, 8) | 4278255360 & n2.rotl(t3, 24);
    for (var e3 = 0; e3 < t3.length; e3++) t3[e3] = n2.endian(t3[e3]);
    return t3;
  }, randomBytes: function(t3) {
    for (var e3 = []; t3 > 0; t3--) e3.push(Math.floor(256 * Math.random()));
    return e3;
  }, bytesToWords: function(t3) {
    for (var e3 = [], n3 = 0, r2 = 0; n3 < t3.length; n3++, r2 += 8) e3[r2 >>> 5] |= t3[n3] << 24 - r2 % 32;
    return e3;
  }, wordsToBytes: function(t3) {
    for (var e3 = [], n3 = 0; n3 < 32 * t3.length; n3 += 8) e3.push(t3[n3 >>> 5] >>> 24 - n3 % 32 & 255);
    return e3;
  }, bytesToHex: function(t3) {
    for (var e3 = [], n3 = 0; n3 < t3.length; n3++) e3.push((t3[n3] >>> 4).toString(16)), e3.push((15 & t3[n3]).toString(16));
    return e3.join("");
  }, hexToBytes: function(t3) {
    for (var e3 = [], n3 = 0; n3 < t3.length; n3 += 2) e3.push(parseInt(t3.substr(n3, 2), 16));
    return e3;
  }, bytesToBase64: function(t3) {
    for (var n3 = [], r2 = 0; r2 < t3.length; r2 += 3) for (var o2 = t3[r2] << 16 | t3[r2 + 1] << 8 | t3[r2 + 2], i2 = 0; i2 < 4; i2++) 8 * r2 + 6 * i2 <= 8 * t3.length ? n3.push(e2.charAt(o2 >>> 6 * (3 - i2) & 63)) : n3.push("=");
    return n3.join("");
  }, base64ToBytes: function(t3) {
    t3 = t3.replace(/[^A-Z0-9+\/]/gi, "");
    for (var n3 = [], r2 = 0, o2 = 0; r2 < t3.length; o2 = ++r2 % 4) 0 != o2 && n3.push((e2.indexOf(t3.charAt(r2 - 1)) & Math.pow(2, -2 * o2 + 8) - 1) << 2 * o2 | e2.indexOf(t3.charAt(r2)) >>> 6 - 2 * o2);
    return n3;
  } }, t2.exports = n2;
}, 635: (t2, e2, n2) => {
  const r2 = n2(31), o2 = n2(338), i2 = n2(221);
  t2.exports = { XMLParser: o2, XMLValidator: r2, XMLBuilder: i2 };
}, 705: (t2, e2) => {
  const n2 = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", r2 = "[" + n2 + "][" + n2 + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*", o2 = new RegExp("^" + r2 + "$");
  e2.isExist = function(t3) {
    return void 0 !== t3;
  }, e2.isEmptyObject = function(t3) {
    return 0 === Object.keys(t3).length;
  }, e2.merge = function(t3, e3, n3) {
    if (e3) {
      const r3 = Object.keys(e3), o3 = r3.length;
      for (let i2 = 0; i2 < o3; i2++) t3[r3[i2]] = "strict" === n3 ? [e3[r3[i2]]] : e3[r3[i2]];
    }
  }, e2.getValue = function(t3) {
    return e2.isExist(t3) ? t3 : "";
  }, e2.isName = function(t3) {
    return !(null == o2.exec(t3));
  }, e2.getAllMatches = function(t3, e3) {
    const n3 = [];
    let r3 = e3.exec(t3);
    for (; r3; ) {
      const o3 = [];
      o3.startIndex = e3.lastIndex - r3[0].length;
      const i2 = r3.length;
      for (let t4 = 0; t4 < i2; t4++) o3.push(r3[t4]);
      n3.push(o3), r3 = e3.exec(t3);
    }
    return n3;
  }, e2.nameRegexp = r2;
}, 31: (t2, e2, n2) => {
  const r2 = n2(705), o2 = { allowBooleanAttributes: false, unpairedTags: [] };
  function i2(t3) {
    return " " === t3 || "	" === t3 || "\n" === t3 || "\r" === t3;
  }
  function s2(t3, e3) {
    const n3 = e3;
    for (; e3 < t3.length; e3++) if ("?" != t3[e3] && " " != t3[e3]) ;
    else {
      const r3 = t3.substr(n3, e3 - n3);
      if (e3 > 5 && "xml" === r3) return d2("InvalidXml", "XML declaration allowed only at the start of the document.", m(t3, e3));
      if ("?" == t3[e3] && ">" == t3[e3 + 1]) {
        e3++;
        break;
      }
    }
    return e3;
  }
  function a2(t3, e3) {
    if (t3.length > e3 + 5 && "-" === t3[e3 + 1] && "-" === t3[e3 + 2]) {
      for (e3 += 3; e3 < t3.length; e3++) if ("-" === t3[e3] && "-" === t3[e3 + 1] && ">" === t3[e3 + 2]) {
        e3 += 2;
        break;
      }
    } else if (t3.length > e3 + 8 && "D" === t3[e3 + 1] && "O" === t3[e3 + 2] && "C" === t3[e3 + 3] && "T" === t3[e3 + 4] && "Y" === t3[e3 + 5] && "P" === t3[e3 + 6] && "E" === t3[e3 + 7]) {
      let n3 = 1;
      for (e3 += 8; e3 < t3.length; e3++) if ("<" === t3[e3]) n3++;
      else if (">" === t3[e3] && (n3--, 0 === n3)) break;
    } else if (t3.length > e3 + 9 && "[" === t3[e3 + 1] && "C" === t3[e3 + 2] && "D" === t3[e3 + 3] && "A" === t3[e3 + 4] && "T" === t3[e3 + 5] && "A" === t3[e3 + 6] && "[" === t3[e3 + 7]) {
      for (e3 += 8; e3 < t3.length; e3++) if ("]" === t3[e3] && "]" === t3[e3 + 1] && ">" === t3[e3 + 2]) {
        e3 += 2;
        break;
      }
    }
    return e3;
  }
  e2.validate = function(t3, e3) {
    e3 = Object.assign({}, o2, e3);
    const n3 = [];
    let c3 = false, u3 = false;
    "\uFEFF" === t3[0] && (t3 = t3.substr(1));
    for (let o3 = 0; o3 < t3.length; o3++) if ("<" === t3[o3] && "?" === t3[o3 + 1]) {
      if (o3 += 2, o3 = s2(t3, o3), o3.err) return o3;
    } else {
      if ("<" !== t3[o3]) {
        if (i2(t3[o3])) continue;
        return d2("InvalidChar", "char '" + t3[o3] + "' is not expected.", m(t3, o3));
      }
      {
        let g22 = o3;
        if (o3++, "!" === t3[o3]) {
          o3 = a2(t3, o3);
          continue;
        }
        {
          let v2 = false;
          "/" === t3[o3] && (v2 = true, o3++);
          let y = "";
          for (; o3 < t3.length && ">" !== t3[o3] && " " !== t3[o3] && "	" !== t3[o3] && "\n" !== t3[o3] && "\r" !== t3[o3]; o3++) y += t3[o3];
          if (y = y.trim(), "/" === y[y.length - 1] && (y = y.substring(0, y.length - 1), o3--), h3 = y, !r2.isName(h3)) {
            let e4;
            return e4 = 0 === y.trim().length ? "Invalid space after '<'." : "Tag '" + y + "' is an invalid name.", d2("InvalidTag", e4, m(t3, o3));
          }
          const b = l2(t3, o3);
          if (false === b) return d2("InvalidAttr", "Attributes for '" + y + "' have open quote.", m(t3, o3));
          let w2 = b.value;
          if (o3 = b.index, "/" === w2[w2.length - 1]) {
            const n4 = o3 - w2.length;
            w2 = w2.substring(0, w2.length - 1);
            const r3 = p2(w2, e3);
            if (true !== r3) return d2(r3.err.code, r3.err.msg, m(t3, n4 + r3.err.line));
            c3 = true;
          } else if (v2) {
            if (!b.tagClosed) return d2("InvalidTag", "Closing tag '" + y + "' doesn't have proper closing.", m(t3, o3));
            if (w2.trim().length > 0) return d2("InvalidTag", "Closing tag '" + y + "' can't have attributes or invalid starting.", m(t3, g22));
            {
              const e4 = n3.pop();
              if (y !== e4.tagName) {
                let n4 = m(t3, e4.tagStartPos);
                return d2("InvalidTag", "Expected closing tag '" + e4.tagName + "' (opened in line " + n4.line + ", col " + n4.col + ") instead of closing tag '" + y + "'.", m(t3, g22));
              }
              0 == n3.length && (u3 = true);
            }
          } else {
            const r3 = p2(w2, e3);
            if (true !== r3) return d2(r3.err.code, r3.err.msg, m(t3, o3 - w2.length + r3.err.line));
            if (true === u3) return d2("InvalidXml", "Multiple possible root nodes found.", m(t3, o3));
            -1 !== e3.unpairedTags.indexOf(y) || n3.push({ tagName: y, tagStartPos: g22 }), c3 = true;
          }
          for (o3++; o3 < t3.length; o3++) if ("<" === t3[o3]) {
            if ("!" === t3[o3 + 1]) {
              o3++, o3 = a2(t3, o3);
              continue;
            }
            if ("?" !== t3[o3 + 1]) break;
            if (o3 = s2(t3, ++o3), o3.err) return o3;
          } else if ("&" === t3[o3]) {
            const e4 = f2(t3, o3);
            if (-1 == e4) return d2("InvalidChar", "char '&' is not expected.", m(t3, o3));
            o3 = e4;
          } else if (true === u3 && !i2(t3[o3])) return d2("InvalidXml", "Extra text at the end", m(t3, o3));
          "<" === t3[o3] && o3--;
        }
      }
    }
    var h3;
    return c3 ? 1 == n3.length ? d2("InvalidTag", "Unclosed tag '" + n3[0].tagName + "'.", m(t3, n3[0].tagStartPos)) : !(n3.length > 0) || d2("InvalidXml", "Invalid '" + JSON.stringify(n3.map((t4) => t4.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 }) : d2("InvalidXml", "Start tag expected.", 1);
  };
  const c2 = '"', u2 = "'";
  function l2(t3, e3) {
    let n3 = "", r3 = "", o3 = false;
    for (; e3 < t3.length; e3++) {
      if (t3[e3] === c2 || t3[e3] === u2) "" === r3 ? r3 = t3[e3] : r3 !== t3[e3] || (r3 = "");
      else if (">" === t3[e3] && "" === r3) {
        o3 = true;
        break;
      }
      n3 += t3[e3];
    }
    return "" === r3 && { value: n3, index: e3, tagClosed: o3 };
  }
  const h2 = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
  function p2(t3, e3) {
    const n3 = r2.getAllMatches(t3, h2), o3 = {};
    for (let t4 = 0; t4 < n3.length; t4++) {
      if (0 === n3[t4][1].length) return d2("InvalidAttr", "Attribute '" + n3[t4][2] + "' has no space in starting.", v(n3[t4]));
      if (void 0 !== n3[t4][3] && void 0 === n3[t4][4]) return d2("InvalidAttr", "Attribute '" + n3[t4][2] + "' is without value.", v(n3[t4]));
      if (void 0 === n3[t4][3] && !e3.allowBooleanAttributes) return d2("InvalidAttr", "boolean attribute '" + n3[t4][2] + "' is not allowed.", v(n3[t4]));
      const r3 = n3[t4][2];
      if (!g2(r3)) return d2("InvalidAttr", "Attribute '" + r3 + "' is an invalid name.", v(n3[t4]));
      if (o3.hasOwnProperty(r3)) return d2("InvalidAttr", "Attribute '" + r3 + "' is repeated.", v(n3[t4]));
      o3[r3] = 1;
    }
    return true;
  }
  function f2(t3, e3) {
    if (";" === t3[++e3]) return -1;
    if ("#" === t3[e3]) return function(t4, e4) {
      let n4 = /\d/;
      for ("x" === t4[e4] && (e4++, n4 = /[\da-fA-F]/); e4 < t4.length; e4++) {
        if (";" === t4[e4]) return e4;
        if (!t4[e4].match(n4)) break;
      }
      return -1;
    }(t3, ++e3);
    let n3 = 0;
    for (; e3 < t3.length; e3++, n3++) if (!(t3[e3].match(/\w/) && n3 < 20)) {
      if (";" === t3[e3]) break;
      return -1;
    }
    return e3;
  }
  function d2(t3, e3, n3) {
    return { err: { code: t3, msg: e3, line: n3.line || n3, col: n3.col } };
  }
  function g2(t3) {
    return r2.isName(t3);
  }
  function m(t3, e3) {
    const n3 = t3.substring(0, e3).split(/\r?\n/);
    return { line: n3.length, col: n3[n3.length - 1].length + 1 };
  }
  function v(t3) {
    return t3.startIndex + t3[1].length;
  }
}, 221: (t2, e2, n2) => {
  const r2 = n2(87), o2 = { attributeNamePrefix: "@_", attributesGroupName: false, textNodeName: "#text", ignoreAttributes: true, cdataPropName: false, format: false, indentBy: "  ", suppressEmptyNode: false, suppressUnpairedNode: true, suppressBooleanAttributes: true, tagValueProcessor: function(t3, e3) {
    return e3;
  }, attributeValueProcessor: function(t3, e3) {
    return e3;
  }, preserveOrder: false, commentPropName: false, unpairedTags: [], entities: [{ regex: new RegExp("&", "g"), val: "&amp;" }, { regex: new RegExp(">", "g"), val: "&gt;" }, { regex: new RegExp("<", "g"), val: "&lt;" }, { regex: new RegExp("'", "g"), val: "&apos;" }, { regex: new RegExp('"', "g"), val: "&quot;" }], processEntities: true, stopNodes: [], oneListGroup: false };
  function i2(t3) {
    this.options = Object.assign({}, o2, t3), this.options.ignoreAttributes || this.options.attributesGroupName ? this.isAttribute = function() {
      return false;
    } : (this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = c2), this.processTextOrObjNode = s2, this.options.format ? (this.indentate = a2, this.tagEndChar = ">\n", this.newLine = "\n") : (this.indentate = function() {
      return "";
    }, this.tagEndChar = ">", this.newLine = "");
  }
  function s2(t3, e3, n3) {
    const r3 = this.j2x(t3, n3 + 1);
    return void 0 !== t3[this.options.textNodeName] && 1 === Object.keys(t3).length ? this.buildTextValNode(t3[this.options.textNodeName], e3, r3.attrStr, n3) : this.buildObjectNode(r3.val, e3, r3.attrStr, n3);
  }
  function a2(t3) {
    return this.options.indentBy.repeat(t3);
  }
  function c2(t3) {
    return !(!t3.startsWith(this.options.attributeNamePrefix) || t3 === this.options.textNodeName) && t3.substr(this.attrPrefixLen);
  }
  i2.prototype.build = function(t3) {
    return this.options.preserveOrder ? r2(t3, this.options) : (Array.isArray(t3) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (t3 = { [this.options.arrayNodeName]: t3 }), this.j2x(t3, 0).val);
  }, i2.prototype.j2x = function(t3, e3) {
    let n3 = "", r3 = "";
    for (let o3 in t3) if (void 0 === t3[o3]) this.isAttribute(o3) && (r3 += "");
    else if (null === t3[o3]) this.isAttribute(o3) ? r3 += "" : "?" === o3[0] ? r3 += this.indentate(e3) + "<" + o3 + "?" + this.tagEndChar : r3 += this.indentate(e3) + "<" + o3 + "/" + this.tagEndChar;
    else if (t3[o3] instanceof Date) r3 += this.buildTextValNode(t3[o3], o3, "", e3);
    else if ("object" != typeof t3[o3]) {
      const i3 = this.isAttribute(o3);
      if (i3) n3 += this.buildAttrPairStr(i3, "" + t3[o3]);
      else if (o3 === this.options.textNodeName) {
        let e4 = this.options.tagValueProcessor(o3, "" + t3[o3]);
        r3 += this.replaceEntitiesValue(e4);
      } else r3 += this.buildTextValNode(t3[o3], o3, "", e3);
    } else if (Array.isArray(t3[o3])) {
      const n4 = t3[o3].length;
      let i3 = "";
      for (let s3 = 0; s3 < n4; s3++) {
        const n5 = t3[o3][s3];
        void 0 === n5 || (null === n5 ? "?" === o3[0] ? r3 += this.indentate(e3) + "<" + o3 + "?" + this.tagEndChar : r3 += this.indentate(e3) + "<" + o3 + "/" + this.tagEndChar : "object" == typeof n5 ? this.options.oneListGroup ? i3 += this.j2x(n5, e3 + 1).val : i3 += this.processTextOrObjNode(n5, o3, e3) : i3 += this.buildTextValNode(n5, o3, "", e3));
      }
      this.options.oneListGroup && (i3 = this.buildObjectNode(i3, o3, "", e3)), r3 += i3;
    } else if (this.options.attributesGroupName && o3 === this.options.attributesGroupName) {
      const e4 = Object.keys(t3[o3]), r4 = e4.length;
      for (let i3 = 0; i3 < r4; i3++) n3 += this.buildAttrPairStr(e4[i3], "" + t3[o3][e4[i3]]);
    } else r3 += this.processTextOrObjNode(t3[o3], o3, e3);
    return { attrStr: n3, val: r3 };
  }, i2.prototype.buildAttrPairStr = function(t3, e3) {
    return e3 = this.options.attributeValueProcessor(t3, "" + e3), e3 = this.replaceEntitiesValue(e3), this.options.suppressBooleanAttributes && "true" === e3 ? " " + t3 : " " + t3 + '="' + e3 + '"';
  }, i2.prototype.buildObjectNode = function(t3, e3, n3, r3) {
    if ("" === t3) return "?" === e3[0] ? this.indentate(r3) + "<" + e3 + n3 + "?" + this.tagEndChar : this.indentate(r3) + "<" + e3 + n3 + this.closeTag(e3) + this.tagEndChar;
    {
      let o3 = "</" + e3 + this.tagEndChar, i3 = "";
      return "?" === e3[0] && (i3 = "?", o3 = ""), !n3 && "" !== n3 || -1 !== t3.indexOf("<") ? false !== this.options.commentPropName && e3 === this.options.commentPropName && 0 === i3.length ? this.indentate(r3) + "<!--".concat(t3, "-->") + this.newLine : this.indentate(r3) + "<" + e3 + n3 + i3 + this.tagEndChar + t3 + this.indentate(r3) + o3 : this.indentate(r3) + "<" + e3 + n3 + i3 + ">" + t3 + o3;
    }
  }, i2.prototype.closeTag = function(t3) {
    let e3 = "";
    return -1 !== this.options.unpairedTags.indexOf(t3) ? this.options.suppressUnpairedNode || (e3 = "/") : e3 = this.options.suppressEmptyNode ? "/" : "></".concat(t3), e3;
  }, i2.prototype.buildTextValNode = function(t3, e3, n3, r3) {
    if (false !== this.options.cdataPropName && e3 === this.options.cdataPropName) return this.indentate(r3) + "<![CDATA[".concat(t3, "]]>") + this.newLine;
    if (false !== this.options.commentPropName && e3 === this.options.commentPropName) return this.indentate(r3) + "<!--".concat(t3, "-->") + this.newLine;
    if ("?" === e3[0]) return this.indentate(r3) + "<" + e3 + n3 + "?" + this.tagEndChar;
    {
      let o3 = this.options.tagValueProcessor(e3, t3);
      return o3 = this.replaceEntitiesValue(o3), "" === o3 ? this.indentate(r3) + "<" + e3 + n3 + this.closeTag(e3) + this.tagEndChar : this.indentate(r3) + "<" + e3 + n3 + ">" + o3 + "</" + e3 + this.tagEndChar;
    }
  }, i2.prototype.replaceEntitiesValue = function(t3) {
    if (t3 && t3.length > 0 && this.options.processEntities) for (let e3 = 0; e3 < this.options.entities.length; e3++) {
      const n3 = this.options.entities[e3];
      t3 = t3.replace(n3.regex, n3.val);
    }
    return t3;
  }, t2.exports = i2;
}, 87: (t2) => {
  function e2(t3, s2, a2, c2) {
    let u2 = "", l2 = false;
    for (let h2 = 0; h2 < t3.length; h2++) {
      const p2 = t3[h2], f2 = n2(p2);
      let d2 = "";
      if (d2 = 0 === a2.length ? f2 : "".concat(a2, ".").concat(f2), f2 === s2.textNodeName) {
        let t4 = p2[f2];
        o2(d2, s2) || (t4 = s2.tagValueProcessor(f2, t4), t4 = i2(t4, s2)), l2 && (u2 += c2), u2 += t4, l2 = false;
        continue;
      }
      if (f2 === s2.cdataPropName) {
        l2 && (u2 += c2), u2 += "<![CDATA[".concat(p2[f2][0][s2.textNodeName], "]]>"), l2 = false;
        continue;
      }
      if (f2 === s2.commentPropName) {
        u2 += c2 + "<!--".concat(p2[f2][0][s2.textNodeName], "-->"), l2 = true;
        continue;
      }
      if ("?" === f2[0]) {
        const t4 = r2(p2[":@"], s2), e3 = "?xml" === f2 ? "" : c2;
        let n3 = p2[f2][0][s2.textNodeName];
        n3 = 0 !== n3.length ? " " + n3 : "", u2 += e3 + "<".concat(f2).concat(n3).concat(t4, "?>"), l2 = true;
        continue;
      }
      let g2 = c2;
      "" !== g2 && (g2 += s2.indentBy);
      const m = r2(p2[":@"], s2), v = c2 + "<".concat(f2).concat(m), y = e2(p2[f2], s2, d2, g2);
      -1 !== s2.unpairedTags.indexOf(f2) ? s2.suppressUnpairedNode ? u2 += v + ">" : u2 += v + "/>" : y && 0 !== y.length || !s2.suppressEmptyNode ? y && y.endsWith(">") ? u2 += v + ">".concat(y).concat(c2, "</").concat(f2, ">") : (u2 += v + ">", y && "" !== c2 && (y.includes("/>") || y.includes("</")) ? u2 += c2 + s2.indentBy + y + c2 : u2 += y, u2 += "</".concat(f2, ">")) : u2 += v + "/>", l2 = true;
    }
    return u2;
  }
  function n2(t3) {
    const e3 = Object.keys(t3);
    for (let t4 = 0; t4 < e3.length; t4++) {
      const n3 = e3[t4];
      if (":@" !== n3) return n3;
    }
  }
  function r2(t3, e3) {
    let n3 = "";
    if (t3 && !e3.ignoreAttributes) for (let r3 in t3) {
      let o3 = e3.attributeValueProcessor(r3, t3[r3]);
      o3 = i2(o3, e3), true === o3 && e3.suppressBooleanAttributes ? n3 += " ".concat(r3.substr(e3.attributeNamePrefix.length)) : n3 += " ".concat(r3.substr(e3.attributeNamePrefix.length), '="').concat(o3, '"');
    }
    return n3;
  }
  function o2(t3, e3) {
    let n3 = (t3 = t3.substr(0, t3.length - e3.textNodeName.length - 1)).substr(t3.lastIndexOf(".") + 1);
    for (let r3 in e3.stopNodes) if (e3.stopNodes[r3] === t3 || e3.stopNodes[r3] === "*." + n3) return true;
    return false;
  }
  function i2(t3, e3) {
    if (t3 && t3.length > 0 && e3.processEntities) for (let n3 = 0; n3 < e3.entities.length; n3++) {
      const r3 = e3.entities[n3];
      t3 = t3.replace(r3.regex, r3.val);
    }
    return t3;
  }
  t2.exports = function(t3, n3) {
    let r3 = "";
    return n3.format && n3.indentBy.length > 0 && (r3 = "\n"), e2(t3, n3, "", r3);
  };
}, 193: (t2, e2, n2) => {
  const r2 = n2(705);
  function o2(t3, e3) {
    let n3 = "";
    for (; e3 < t3.length && "'" !== t3[e3] && '"' !== t3[e3]; e3++) n3 += t3[e3];
    if (n3 = n3.trim(), -1 !== n3.indexOf(" ")) throw new Error("External entites are not supported");
    const r3 = t3[e3++];
    let o3 = "";
    for (; e3 < t3.length && t3[e3] !== r3; e3++) o3 += t3[e3];
    return [n3, o3, e3];
  }
  function i2(t3, e3) {
    return "!" === t3[e3 + 1] && "-" === t3[e3 + 2] && "-" === t3[e3 + 3];
  }
  function s2(t3, e3) {
    return "!" === t3[e3 + 1] && "E" === t3[e3 + 2] && "N" === t3[e3 + 3] && "T" === t3[e3 + 4] && "I" === t3[e3 + 5] && "T" === t3[e3 + 6] && "Y" === t3[e3 + 7];
  }
  function a2(t3, e3) {
    return "!" === t3[e3 + 1] && "E" === t3[e3 + 2] && "L" === t3[e3 + 3] && "E" === t3[e3 + 4] && "M" === t3[e3 + 5] && "E" === t3[e3 + 6] && "N" === t3[e3 + 7] && "T" === t3[e3 + 8];
  }
  function c2(t3, e3) {
    return "!" === t3[e3 + 1] && "A" === t3[e3 + 2] && "T" === t3[e3 + 3] && "T" === t3[e3 + 4] && "L" === t3[e3 + 5] && "I" === t3[e3 + 6] && "S" === t3[e3 + 7] && "T" === t3[e3 + 8];
  }
  function u2(t3, e3) {
    return "!" === t3[e3 + 1] && "N" === t3[e3 + 2] && "O" === t3[e3 + 3] && "T" === t3[e3 + 4] && "A" === t3[e3 + 5] && "T" === t3[e3 + 6] && "I" === t3[e3 + 7] && "O" === t3[e3 + 8] && "N" === t3[e3 + 9];
  }
  function l2(t3) {
    if (r2.isName(t3)) return t3;
    throw new Error("Invalid entity name ".concat(t3));
  }
  t2.exports = function(t3, e3) {
    const n3 = {};
    if ("O" !== t3[e3 + 3] || "C" !== t3[e3 + 4] || "T" !== t3[e3 + 5] || "Y" !== t3[e3 + 6] || "P" !== t3[e3 + 7] || "E" !== t3[e3 + 8]) throw new Error("Invalid Tag instead of DOCTYPE");
    {
      e3 += 9;
      let r3 = 1, h2 = false, p2 = false, f2 = "";
      for (; e3 < t3.length; e3++) if ("<" !== t3[e3] || p2) if (">" === t3[e3]) {
        if (p2 ? "-" === t3[e3 - 1] && "-" === t3[e3 - 2] && (p2 = false, r3--) : r3--, 0 === r3) break;
      } else "[" === t3[e3] ? h2 = true : f2 += t3[e3];
      else {
        if (h2 && s2(t3, e3)) e3 += 7, [entityName, val, e3] = o2(t3, e3 + 1), -1 === val.indexOf("&") && (n3[l2(entityName)] = { regx: RegExp("&".concat(entityName, ";"), "g"), val });
        else if (h2 && a2(t3, e3)) e3 += 8;
        else if (h2 && c2(t3, e3)) e3 += 8;
        else if (h2 && u2(t3, e3)) e3 += 9;
        else {
          if (!i2) throw new Error("Invalid DOCTYPE");
          p2 = true;
        }
        r3++, f2 = "";
      }
      if (0 !== r3) throw new Error("Unclosed DOCTYPE");
    }
    return { entities: n3, i: e3 };
  };
}, 63: (t2, e2) => {
  const n2 = { preserveOrder: false, attributeNamePrefix: "@_", attributesGroupName: false, textNodeName: "#text", ignoreAttributes: true, removeNSPrefix: false, allowBooleanAttributes: false, parseTagValue: true, parseAttributeValue: false, trimValues: true, cdataPropName: false, numberParseOptions: { hex: true, leadingZeros: true, eNotation: true }, tagValueProcessor: function(t3, e3) {
    return e3;
  }, attributeValueProcessor: function(t3, e3) {
    return e3;
  }, stopNodes: [], alwaysCreateTextNode: false, isArray: () => false, commentPropName: false, unpairedTags: [], processEntities: true, htmlEntities: false, ignoreDeclaration: false, ignorePiTags: false, transformTagName: false, transformAttributeName: false, updateTag: function(t3, e3, n3) {
    return t3;
  } };
  e2.buildOptions = function(t3) {
    return Object.assign({}, n2, t3);
  }, e2.defaultOptions = n2;
}, 299: (t2, e2, n2) => {
  const r2 = n2(705), o2 = n2(365), i2 = n2(193), s2 = n2(494);
  function a2(t3) {
    const e3 = Object.keys(t3);
    for (let n3 = 0; n3 < e3.length; n3++) {
      const r3 = e3[n3];
      this.lastEntities[r3] = { regex: new RegExp("&" + r3 + ";", "g"), val: t3[r3] };
    }
  }
  function c2(t3, e3, n3, r3, o3, i3, s3) {
    if (void 0 !== t3 && (this.options.trimValues && !r3 && (t3 = t3.trim()), t3.length > 0)) {
      s3 || (t3 = this.replaceEntitiesValue(t3));
      const r4 = this.options.tagValueProcessor(e3, t3, n3, o3, i3);
      return null == r4 ? t3 : typeof r4 != typeof t3 || r4 !== t3 ? r4 : this.options.trimValues || t3.trim() === t3 ? w2(t3, this.options.parseTagValue, this.options.numberParseOptions) : t3;
    }
  }
  function u2(t3) {
    if (this.options.removeNSPrefix) {
      const e3 = t3.split(":"), n3 = "/" === t3.charAt(0) ? "/" : "";
      if ("xmlns" === e3[0]) return "";
      2 === e3.length && (t3 = n3 + e3[1]);
    }
    return t3;
  }
  "<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g, r2.nameRegexp);
  const l2 = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
  function h2(t3, e3, n3) {
    if (!this.options.ignoreAttributes && "string" == typeof t3) {
      const n4 = r2.getAllMatches(t3, l2), o3 = n4.length, i3 = {};
      for (let t4 = 0; t4 < o3; t4++) {
        const r3 = this.resolveNameSpace(n4[t4][1]);
        let o4 = n4[t4][4], s3 = this.options.attributeNamePrefix + r3;
        if (r3.length) if (this.options.transformAttributeName && (s3 = this.options.transformAttributeName(s3)), "__proto__" === s3 && (s3 = "#__proto__"), void 0 !== o4) {
          this.options.trimValues && (o4 = o4.trim()), o4 = this.replaceEntitiesValue(o4);
          const t5 = this.options.attributeValueProcessor(r3, o4, e3);
          i3[s3] = null == t5 ? o4 : typeof t5 != typeof o4 || t5 !== o4 ? t5 : w2(o4, this.options.parseAttributeValue, this.options.numberParseOptions);
        } else this.options.allowBooleanAttributes && (i3[s3] = true);
      }
      if (!Object.keys(i3).length) return;
      if (this.options.attributesGroupName) {
        const t4 = {};
        return t4[this.options.attributesGroupName] = i3, t4;
      }
      return i3;
    }
  }
  const p2 = function(t3) {
    t3 = t3.replace(/\r\n?/g, "\n");
    const e3 = new o2("!xml");
    let n3 = e3, r3 = "", s3 = "";
    for (let a3 = 0; a3 < t3.length; a3++) if ("<" === t3[a3]) if ("/" === t3[a3 + 1]) {
      const e4 = v(t3, ">", a3, "Closing Tag is not closed.");
      let o3 = t3.substring(a3 + 2, e4).trim();
      if (this.options.removeNSPrefix) {
        const t4 = o3.indexOf(":");
        -1 !== t4 && (o3 = o3.substr(t4 + 1));
      }
      this.options.transformTagName && (o3 = this.options.transformTagName(o3)), n3 && (r3 = this.saveTextToParentTag(r3, n3, s3));
      const i3 = s3.substring(s3.lastIndexOf(".") + 1);
      if (o3 && -1 !== this.options.unpairedTags.indexOf(o3)) throw new Error("Unpaired tag can not be used as closing tag: </".concat(o3, ">"));
      let c3 = 0;
      i3 && -1 !== this.options.unpairedTags.indexOf(i3) ? (c3 = s3.lastIndexOf(".", s3.lastIndexOf(".") - 1), this.tagsNodeStack.pop()) : c3 = s3.lastIndexOf("."), s3 = s3.substring(0, c3), n3 = this.tagsNodeStack.pop(), r3 = "", a3 = e4;
    } else if ("?" === t3[a3 + 1]) {
      let e4 = y(t3, a3, false, "?>");
      if (!e4) throw new Error("Pi Tag is not closed.");
      if (r3 = this.saveTextToParentTag(r3, n3, s3), this.options.ignoreDeclaration && "?xml" === e4.tagName || this.options.ignorePiTags) ;
      else {
        const t4 = new o2(e4.tagName);
        t4.add(this.options.textNodeName, ""), e4.tagName !== e4.tagExp && e4.attrExpPresent && (t4[":@"] = this.buildAttributesMap(e4.tagExp, s3, e4.tagName)), this.addChild(n3, t4, s3);
      }
      a3 = e4.closeIndex + 1;
    } else if ("!--" === t3.substr(a3 + 1, 3)) {
      const e4 = v(t3, "-->", a3 + 4, "Comment is not closed.");
      if (this.options.commentPropName) {
        const o3 = t3.substring(a3 + 4, e4 - 2);
        r3 = this.saveTextToParentTag(r3, n3, s3), n3.add(this.options.commentPropName, [{ [this.options.textNodeName]: o3 }]);
      }
      a3 = e4;
    } else if ("!D" === t3.substr(a3 + 1, 2)) {
      const e4 = i2(t3, a3);
      this.docTypeEntities = e4.entities, a3 = e4.i;
    } else if ("![" === t3.substr(a3 + 1, 2)) {
      const e4 = v(t3, "]]>", a3, "CDATA is not closed.") - 2, o3 = t3.substring(a3 + 9, e4);
      if (r3 = this.saveTextToParentTag(r3, n3, s3), this.options.cdataPropName) n3.add(this.options.cdataPropName, [{ [this.options.textNodeName]: o3 }]);
      else {
        let t4 = this.parseTextData(o3, n3.tagname, s3, true, false, true);
        null == t4 && (t4 = ""), n3.add(this.options.textNodeName, t4);
      }
      a3 = e4 + 2;
    } else {
      let i3 = y(t3, a3, this.options.removeNSPrefix), c3 = i3.tagName, u3 = i3.tagExp, l3 = i3.attrExpPresent, h3 = i3.closeIndex;
      this.options.transformTagName && (c3 = this.options.transformTagName(c3)), n3 && r3 && "!xml" !== n3.tagname && (r3 = this.saveTextToParentTag(r3, n3, s3, false));
      const p3 = n3;
      if (p3 && -1 !== this.options.unpairedTags.indexOf(p3.tagname) && (n3 = this.tagsNodeStack.pop(), s3 = s3.substring(0, s3.lastIndexOf("."))), c3 !== e3.tagname && (s3 += s3 ? "." + c3 : c3), this.isItStopNode(this.options.stopNodes, s3, c3)) {
        let e4 = "";
        if (u3.length > 0 && u3.lastIndexOf("/") === u3.length - 1) a3 = i3.closeIndex;
        else if (-1 !== this.options.unpairedTags.indexOf(c3)) a3 = i3.closeIndex;
        else {
          const n4 = this.readStopNodeData(t3, c3, h3 + 1);
          if (!n4) throw new Error("Unexpected end of ".concat(c3));
          a3 = n4.i, e4 = n4.tagContent;
        }
        const r4 = new o2(c3);
        c3 !== u3 && l3 && (r4[":@"] = this.buildAttributesMap(u3, s3, c3)), e4 && (e4 = this.parseTextData(e4, c3, s3, true, l3, true, true)), s3 = s3.substr(0, s3.lastIndexOf(".")), r4.add(this.options.textNodeName, e4), this.addChild(n3, r4, s3);
      } else {
        if (u3.length > 0 && u3.lastIndexOf("/") === u3.length - 1) {
          "/" === c3[c3.length - 1] ? (c3 = c3.substr(0, c3.length - 1), s3 = s3.substr(0, s3.length - 1), u3 = c3) : u3 = u3.substr(0, u3.length - 1), this.options.transformTagName && (c3 = this.options.transformTagName(c3));
          const t4 = new o2(c3);
          c3 !== u3 && l3 && (t4[":@"] = this.buildAttributesMap(u3, s3, c3)), this.addChild(n3, t4, s3), s3 = s3.substr(0, s3.lastIndexOf("."));
        } else {
          const t4 = new o2(c3);
          this.tagsNodeStack.push(n3), c3 !== u3 && l3 && (t4[":@"] = this.buildAttributesMap(u3, s3, c3)), this.addChild(n3, t4, s3), n3 = t4;
        }
        r3 = "", a3 = h3;
      }
    }
    else r3 += t3[a3];
    return e3.child;
  };
  function f2(t3, e3, n3) {
    const r3 = this.options.updateTag(e3.tagname, n3, e3[":@"]);
    false === r3 || ("string" == typeof r3 ? (e3.tagname = r3, t3.addChild(e3)) : t3.addChild(e3));
  }
  const d2 = function(t3) {
    if (this.options.processEntities) {
      for (let e3 in this.docTypeEntities) {
        const n3 = this.docTypeEntities[e3];
        t3 = t3.replace(n3.regx, n3.val);
      }
      for (let e3 in this.lastEntities) {
        const n3 = this.lastEntities[e3];
        t3 = t3.replace(n3.regex, n3.val);
      }
      if (this.options.htmlEntities) for (let e3 in this.htmlEntities) {
        const n3 = this.htmlEntities[e3];
        t3 = t3.replace(n3.regex, n3.val);
      }
      t3 = t3.replace(this.ampEntity.regex, this.ampEntity.val);
    }
    return t3;
  };
  function g2(t3, e3, n3, r3) {
    return t3 && (void 0 === r3 && (r3 = 0 === Object.keys(e3.child).length), void 0 !== (t3 = this.parseTextData(t3, e3.tagname, n3, false, !!e3[":@"] && 0 !== Object.keys(e3[":@"]).length, r3)) && "" !== t3 && e3.add(this.options.textNodeName, t3), t3 = ""), t3;
  }
  function m(t3, e3, n3) {
    const r3 = "*." + n3;
    for (const n4 in t3) {
      const o3 = t3[n4];
      if (r3 === o3 || e3 === o3) return true;
    }
    return false;
  }
  function v(t3, e3, n3, r3) {
    const o3 = t3.indexOf(e3, n3);
    if (-1 === o3) throw new Error(r3);
    return o3 + e3.length - 1;
  }
  function y(t3, e3, n3) {
    const r3 = function(t4, e4) {
      let n4, r4 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ">", o4 = "";
      for (let i4 = e4; i4 < t4.length; i4++) {
        let e5 = t4[i4];
        if (n4) e5 === n4 && (n4 = "");
        else if ('"' === e5 || "'" === e5) n4 = e5;
        else if (e5 === r4[0]) {
          if (!r4[1]) return { data: o4, index: i4 };
          if (t4[i4 + 1] === r4[1]) return { data: o4, index: i4 };
        } else "	" === e5 && (e5 = " ");
        o4 += e5;
      }
    }(t3, e3 + 1, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ">");
    if (!r3) return;
    let o3 = r3.data;
    const i3 = r3.index, s3 = o3.search(/\s/);
    let a3 = o3, c3 = true;
    if (-1 !== s3 && (a3 = o3.substr(0, s3).replace(/\s\s*$/, ""), o3 = o3.substr(s3 + 1)), n3) {
      const t4 = a3.indexOf(":");
      -1 !== t4 && (a3 = a3.substr(t4 + 1), c3 = a3 !== r3.data.substr(t4 + 1));
    }
    return { tagName: a3, tagExp: o3, closeIndex: i3, attrExpPresent: c3 };
  }
  function b(t3, e3, n3) {
    const r3 = n3;
    let o3 = 1;
    for (; n3 < t3.length; n3++) if ("<" === t3[n3]) if ("/" === t3[n3 + 1]) {
      const i3 = v(t3, ">", n3, "".concat(e3, " is not closed"));
      if (t3.substring(n3 + 2, i3).trim() === e3 && (o3--, 0 === o3)) return { tagContent: t3.substring(r3, n3), i: i3 };
      n3 = i3;
    } else if ("?" === t3[n3 + 1]) n3 = v(t3, "?>", n3 + 1, "StopNode is not closed.");
    else if ("!--" === t3.substr(n3 + 1, 3)) n3 = v(t3, "-->", n3 + 3, "StopNode is not closed.");
    else if ("![" === t3.substr(n3 + 1, 2)) n3 = v(t3, "]]>", n3, "StopNode is not closed.") - 2;
    else {
      const r4 = y(t3, n3, ">");
      r4 && ((r4 && r4.tagName) === e3 && "/" !== r4.tagExp[r4.tagExp.length - 1] && o3++, n3 = r4.closeIndex);
    }
  }
  function w2(t3, e3, n3) {
    if (e3 && "string" == typeof t3) {
      const e4 = t3.trim();
      return "true" === e4 || "false" !== e4 && s2(t3, n3);
    }
    return r2.isExist(t3) ? t3 : "";
  }
  t2.exports = class {
    constructor(t3) {
      this.options = t3, this.currentNode = null, this.tagsNodeStack = [], this.docTypeEntities = {}, this.lastEntities = { apos: { regex: /&(apos|#39|#x27);/g, val: "'" }, gt: { regex: /&(gt|#62|#x3E);/g, val: ">" }, lt: { regex: /&(lt|#60|#x3C);/g, val: "<" }, quot: { regex: /&(quot|#34|#x22);/g, val: '"' } }, this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" }, this.htmlEntities = { space: { regex: /&(nbsp|#160);/g, val: " " }, cent: { regex: /&(cent|#162);/g, val: "¢" }, pound: { regex: /&(pound|#163);/g, val: "£" }, yen: { regex: /&(yen|#165);/g, val: "¥" }, euro: { regex: /&(euro|#8364);/g, val: "€" }, copyright: { regex: /&(copy|#169);/g, val: "©" }, reg: { regex: /&(reg|#174);/g, val: "®" }, inr: { regex: /&(inr|#8377);/g, val: "₹" } }, this.addExternalEntities = a2, this.parseXml = p2, this.parseTextData = c2, this.resolveNameSpace = u2, this.buildAttributesMap = h2, this.isItStopNode = m, this.replaceEntitiesValue = d2, this.readStopNodeData = b, this.saveTextToParentTag = g2, this.addChild = f2;
    }
  };
}, 338: (t2, e2, n2) => {
  const { buildOptions: r2 } = n2(63), o2 = n2(299), { prettify: i2 } = n2(728), s2 = n2(31);
  t2.exports = class {
    constructor(t3) {
      this.externalEntities = {}, this.options = r2(t3);
    }
    parse(t3, e3) {
      if ("string" == typeof t3) ;
      else {
        if (!t3.toString) throw new Error("XML data is accepted in String or Bytes[] form.");
        t3 = t3.toString();
      }
      if (e3) {
        true === e3 && (e3 = {});
        const n4 = s2.validate(t3, e3);
        if (true !== n4) throw Error("".concat(n4.err.msg, ":").concat(n4.err.line, ":").concat(n4.err.col));
      }
      const n3 = new o2(this.options);
      n3.addExternalEntities(this.externalEntities);
      const r3 = n3.parseXml(t3);
      return this.options.preserveOrder || void 0 === r3 ? r3 : i2(r3, this.options);
    }
    addEntity(t3, e3) {
      if (-1 !== e3.indexOf("&")) throw new Error("Entity value can't have '&'");
      if (-1 !== t3.indexOf("&") || -1 !== t3.indexOf(";")) throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
      if ("&" === e3) throw new Error("An entity with value '&' is not permitted");
      this.externalEntities[t3] = e3;
    }
  };
}, 728: (t2, e2) => {
  function n2(t3, e3, s2) {
    let a2;
    const c2 = {};
    for (let u2 = 0; u2 < t3.length; u2++) {
      const l2 = t3[u2], h2 = r2(l2);
      let p2 = "";
      if (p2 = void 0 === s2 ? h2 : s2 + "." + h2, h2 === e3.textNodeName) void 0 === a2 ? a2 = l2[h2] : a2 += "" + l2[h2];
      else {
        if (void 0 === h2) continue;
        if (l2[h2]) {
          let t4 = n2(l2[h2], e3, p2);
          const r3 = i2(t4, e3);
          l2[":@"] ? o2(t4, l2[":@"], p2, e3) : 1 !== Object.keys(t4).length || void 0 === t4[e3.textNodeName] || e3.alwaysCreateTextNode ? 0 === Object.keys(t4).length && (e3.alwaysCreateTextNode ? t4[e3.textNodeName] = "" : t4 = "") : t4 = t4[e3.textNodeName], void 0 !== c2[h2] && c2.hasOwnProperty(h2) ? (Array.isArray(c2[h2]) || (c2[h2] = [c2[h2]]), c2[h2].push(t4)) : e3.isArray(h2, p2, r3) ? c2[h2] = [t4] : c2[h2] = t4;
        }
      }
    }
    return "string" == typeof a2 ? a2.length > 0 && (c2[e3.textNodeName] = a2) : void 0 !== a2 && (c2[e3.textNodeName] = a2), c2;
  }
  function r2(t3) {
    const e3 = Object.keys(t3);
    for (let t4 = 0; t4 < e3.length; t4++) {
      const n3 = e3[t4];
      if (":@" !== n3) return n3;
    }
  }
  function o2(t3, e3, n3, r3) {
    if (e3) {
      const o3 = Object.keys(e3), i3 = o3.length;
      for (let s2 = 0; s2 < i3; s2++) {
        const i4 = o3[s2];
        r3.isArray(i4, n3 + "." + i4, true, true) ? t3[i4] = [e3[i4]] : t3[i4] = e3[i4];
      }
    }
  }
  function i2(t3, e3) {
    const { textNodeName: n3 } = e3, r3 = Object.keys(t3).length;
    return 0 === r3 || !(1 !== r3 || !t3[n3] && "boolean" != typeof t3[n3] && 0 !== t3[n3]);
  }
  e2.prettify = function(t3, e3) {
    return n2(t3, e3);
  };
}, 365: (t2) => {
  t2.exports = class {
    constructor(t3) {
      this.tagname = t3, this.child = [], this[":@"] = {};
    }
    add(t3, e2) {
      "__proto__" === t3 && (t3 = "#__proto__"), this.child.push({ [t3]: e2 });
    }
    addChild(t3) {
      "__proto__" === t3.tagname && (t3.tagname = "#__proto__"), t3[":@"] && Object.keys(t3[":@"]).length > 0 ? this.child.push({ [t3.tagname]: t3.child, ":@": t3[":@"] }) : this.child.push({ [t3.tagname]: t3.child });
    }
  };
}, 135: (t2) => {
  function e2(t3) {
    return !!t3.constructor && "function" == typeof t3.constructor.isBuffer && t3.constructor.isBuffer(t3);
  }
  t2.exports = function(t3) {
    return null != t3 && (e2(t3) || function(t4) {
      return "function" == typeof t4.readFloatLE && "function" == typeof t4.slice && e2(t4.slice(0, 0));
    }(t3) || !!t3._isBuffer);
  };
}, 542: (t2, e2, n2) => {
  var r2, o2, i2, s2, a2;
  r2 = n2(298), o2 = n2(526).utf8, i2 = n2(135), s2 = n2(526).bin, (a2 = function(t3, e3) {
    t3.constructor == String ? t3 = e3 && "binary" === e3.encoding ? s2.stringToBytes(t3) : o2.stringToBytes(t3) : i2(t3) ? t3 = Array.prototype.slice.call(t3, 0) : Array.isArray(t3) || t3.constructor === Uint8Array || (t3 = t3.toString());
    for (var n3 = r2.bytesToWords(t3), c2 = 8 * t3.length, u2 = 1732584193, l2 = -271733879, h2 = -1732584194, p2 = 271733878, f2 = 0; f2 < n3.length; f2++) n3[f2] = 16711935 & (n3[f2] << 8 | n3[f2] >>> 24) | 4278255360 & (n3[f2] << 24 | n3[f2] >>> 8);
    n3[c2 >>> 5] |= 128 << c2 % 32, n3[14 + (c2 + 64 >>> 9 << 4)] = c2;
    var d2 = a2._ff, g2 = a2._gg, m = a2._hh, v = a2._ii;
    for (f2 = 0; f2 < n3.length; f2 += 16) {
      var y = u2, b = l2, w2 = h2, x = p2;
      u2 = d2(u2, l2, h2, p2, n3[f2 + 0], 7, -680876936), p2 = d2(p2, u2, l2, h2, n3[f2 + 1], 12, -389564586), h2 = d2(h2, p2, u2, l2, n3[f2 + 2], 17, 606105819), l2 = d2(l2, h2, p2, u2, n3[f2 + 3], 22, -1044525330), u2 = d2(u2, l2, h2, p2, n3[f2 + 4], 7, -176418897), p2 = d2(p2, u2, l2, h2, n3[f2 + 5], 12, 1200080426), h2 = d2(h2, p2, u2, l2, n3[f2 + 6], 17, -1473231341), l2 = d2(l2, h2, p2, u2, n3[f2 + 7], 22, -45705983), u2 = d2(u2, l2, h2, p2, n3[f2 + 8], 7, 1770035416), p2 = d2(p2, u2, l2, h2, n3[f2 + 9], 12, -1958414417), h2 = d2(h2, p2, u2, l2, n3[f2 + 10], 17, -42063), l2 = d2(l2, h2, p2, u2, n3[f2 + 11], 22, -1990404162), u2 = d2(u2, l2, h2, p2, n3[f2 + 12], 7, 1804603682), p2 = d2(p2, u2, l2, h2, n3[f2 + 13], 12, -40341101), h2 = d2(h2, p2, u2, l2, n3[f2 + 14], 17, -1502002290), u2 = g2(u2, l2 = d2(l2, h2, p2, u2, n3[f2 + 15], 22, 1236535329), h2, p2, n3[f2 + 1], 5, -165796510), p2 = g2(p2, u2, l2, h2, n3[f2 + 6], 9, -1069501632), h2 = g2(h2, p2, u2, l2, n3[f2 + 11], 14, 643717713), l2 = g2(l2, h2, p2, u2, n3[f2 + 0], 20, -373897302), u2 = g2(u2, l2, h2, p2, n3[f2 + 5], 5, -701558691), p2 = g2(p2, u2, l2, h2, n3[f2 + 10], 9, 38016083), h2 = g2(h2, p2, u2, l2, n3[f2 + 15], 14, -660478335), l2 = g2(l2, h2, p2, u2, n3[f2 + 4], 20, -405537848), u2 = g2(u2, l2, h2, p2, n3[f2 + 9], 5, 568446438), p2 = g2(p2, u2, l2, h2, n3[f2 + 14], 9, -1019803690), h2 = g2(h2, p2, u2, l2, n3[f2 + 3], 14, -187363961), l2 = g2(l2, h2, p2, u2, n3[f2 + 8], 20, 1163531501), u2 = g2(u2, l2, h2, p2, n3[f2 + 13], 5, -1444681467), p2 = g2(p2, u2, l2, h2, n3[f2 + 2], 9, -51403784), h2 = g2(h2, p2, u2, l2, n3[f2 + 7], 14, 1735328473), u2 = m(u2, l2 = g2(l2, h2, p2, u2, n3[f2 + 12], 20, -1926607734), h2, p2, n3[f2 + 5], 4, -378558), p2 = m(p2, u2, l2, h2, n3[f2 + 8], 11, -2022574463), h2 = m(h2, p2, u2, l2, n3[f2 + 11], 16, 1839030562), l2 = m(l2, h2, p2, u2, n3[f2 + 14], 23, -35309556), u2 = m(u2, l2, h2, p2, n3[f2 + 1], 4, -1530992060), p2 = m(p2, u2, l2, h2, n3[f2 + 4], 11, 1272893353), h2 = m(h2, p2, u2, l2, n3[f2 + 7], 16, -155497632), l2 = m(l2, h2, p2, u2, n3[f2 + 10], 23, -1094730640), u2 = m(u2, l2, h2, p2, n3[f2 + 13], 4, 681279174), p2 = m(p2, u2, l2, h2, n3[f2 + 0], 11, -358537222), h2 = m(h2, p2, u2, l2, n3[f2 + 3], 16, -722521979), l2 = m(l2, h2, p2, u2, n3[f2 + 6], 23, 76029189), u2 = m(u2, l2, h2, p2, n3[f2 + 9], 4, -640364487), p2 = m(p2, u2, l2, h2, n3[f2 + 12], 11, -421815835), h2 = m(h2, p2, u2, l2, n3[f2 + 15], 16, 530742520), u2 = v(u2, l2 = m(l2, h2, p2, u2, n3[f2 + 2], 23, -995338651), h2, p2, n3[f2 + 0], 6, -198630844), p2 = v(p2, u2, l2, h2, n3[f2 + 7], 10, 1126891415), h2 = v(h2, p2, u2, l2, n3[f2 + 14], 15, -1416354905), l2 = v(l2, h2, p2, u2, n3[f2 + 5], 21, -57434055), u2 = v(u2, l2, h2, p2, n3[f2 + 12], 6, 1700485571), p2 = v(p2, u2, l2, h2, n3[f2 + 3], 10, -1894986606), h2 = v(h2, p2, u2, l2, n3[f2 + 10], 15, -1051523), l2 = v(l2, h2, p2, u2, n3[f2 + 1], 21, -2054922799), u2 = v(u2, l2, h2, p2, n3[f2 + 8], 6, 1873313359), p2 = v(p2, u2, l2, h2, n3[f2 + 15], 10, -30611744), h2 = v(h2, p2, u2, l2, n3[f2 + 6], 15, -1560198380), l2 = v(l2, h2, p2, u2, n3[f2 + 13], 21, 1309151649), u2 = v(u2, l2, h2, p2, n3[f2 + 4], 6, -145523070), p2 = v(p2, u2, l2, h2, n3[f2 + 11], 10, -1120210379), h2 = v(h2, p2, u2, l2, n3[f2 + 2], 15, 718787259), l2 = v(l2, h2, p2, u2, n3[f2 + 9], 21, -343485551), u2 = u2 + y >>> 0, l2 = l2 + b >>> 0, h2 = h2 + w2 >>> 0, p2 = p2 + x >>> 0;
    }
    return r2.endian([u2, l2, h2, p2]);
  })._ff = function(t3, e3, n3, r3, o3, i3, s3) {
    var a3 = t3 + (e3 & n3 | ~e3 & r3) + (o3 >>> 0) + s3;
    return (a3 << i3 | a3 >>> 32 - i3) + e3;
  }, a2._gg = function(t3, e3, n3, r3, o3, i3, s3) {
    var a3 = t3 + (e3 & r3 | n3 & ~r3) + (o3 >>> 0) + s3;
    return (a3 << i3 | a3 >>> 32 - i3) + e3;
  }, a2._hh = function(t3, e3, n3, r3, o3, i3, s3) {
    var a3 = t3 + (e3 ^ n3 ^ r3) + (o3 >>> 0) + s3;
    return (a3 << i3 | a3 >>> 32 - i3) + e3;
  }, a2._ii = function(t3, e3, n3, r3, o3, i3, s3) {
    var a3 = t3 + (n3 ^ (e3 | ~r3)) + (o3 >>> 0) + s3;
    return (a3 << i3 | a3 >>> 32 - i3) + e3;
  }, a2._blocksize = 16, a2._digestsize = 16, t2.exports = function(t3, e3) {
    if (null == t3) throw new Error("Illegal argument " + t3);
    var n3 = r2.wordsToBytes(a2(t3, e3));
    return e3 && e3.asBytes ? n3 : e3 && e3.asString ? s2.bytesToString(n3) : r2.bytesToHex(n3);
  };
}, 285: (t2, e2, n2) => {
  var r2 = n2(2);
  t2.exports = function(t3) {
    return t3 ? ("{}" === t3.substr(0, 2) && (t3 = "\\{\\}" + t3.substr(2)), m(function(t4) {
      return t4.split("\\\\").join(o2).split("\\{").join(i2).split("\\}").join(s2).split("\\,").join(a2).split("\\.").join(c2);
    }(t3), true).map(l2)) : [];
  };
  var o2 = "\0SLASH" + Math.random() + "\0", i2 = "\0OPEN" + Math.random() + "\0", s2 = "\0CLOSE" + Math.random() + "\0", a2 = "\0COMMA" + Math.random() + "\0", c2 = "\0PERIOD" + Math.random() + "\0";
  function u2(t3) {
    return parseInt(t3, 10) == t3 ? parseInt(t3, 10) : t3.charCodeAt(0);
  }
  function l2(t3) {
    return t3.split(o2).join("\\").split(i2).join("{").split(s2).join("}").split(a2).join(",").split(c2).join(".");
  }
  function h2(t3) {
    if (!t3) return [""];
    var e3 = [], n3 = r2("{", "}", t3);
    if (!n3) return t3.split(",");
    var o3 = n3.pre, i3 = n3.body, s3 = n3.post, a3 = o3.split(",");
    a3[a3.length - 1] += "{" + i3 + "}";
    var c3 = h2(s3);
    return s3.length && (a3[a3.length - 1] += c3.shift(), a3.push.apply(a3, c3)), e3.push.apply(e3, a3), e3;
  }
  function p2(t3) {
    return "{" + t3 + "}";
  }
  function f2(t3) {
    return /^-?0\d/.test(t3);
  }
  function d2(t3, e3) {
    return t3 <= e3;
  }
  function g2(t3, e3) {
    return t3 >= e3;
  }
  function m(t3, e3) {
    var n3 = [], o3 = r2("{", "}", t3);
    if (!o3) return [t3];
    var i3 = o3.pre, a3 = o3.post.length ? m(o3.post, false) : [""];
    if (/\$$/.test(o3.pre)) for (var c3 = 0; c3 < a3.length; c3++) {
      var l3 = i3 + "{" + o3.body + "}" + a3[c3];
      n3.push(l3);
    }
    else {
      var v, y, b = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(o3.body), w2 = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(o3.body), x = b || w2, N = o3.body.indexOf(",") >= 0;
      if (!x && !N) return o3.post.match(/,.*\}/) ? m(t3 = o3.pre + "{" + o3.body + s2 + o3.post) : [t3];
      if (x) v = o3.body.split(/\.\./);
      else if (1 === (v = h2(o3.body)).length && 1 === (v = m(v[0], false).map(p2)).length) return a3.map(function(t4) {
        return o3.pre + v[0] + t4;
      });
      if (x) {
        var P = u2(v[0]), A = u2(v[1]), O = Math.max(v[0].length, v[1].length), E = 3 == v.length ? Math.abs(u2(v[2])) : 1, T = d2;
        A < P && (E *= -1, T = g2);
        var j = v.some(f2);
        y = [];
        for (var C = P; T(C, A); C += E) {
          var S;
          if (w2) "\\" === (S = String.fromCharCode(C)) && (S = "");
          else if (S = String(C), j) {
            var I = O - S.length;
            if (I > 0) {
              var k = new Array(I + 1).join("0");
              S = C < 0 ? "-" + k + S.slice(1) : k + S;
            }
          }
          y.push(S);
        }
      } else {
        y = [];
        for (var R = 0; R < v.length; R++) y.push.apply(y, m(v[R], false));
      }
      for (R = 0; R < y.length; R++) for (c3 = 0; c3 < a3.length; c3++) l3 = i3 + y[R] + a3[c3], (!e3 || x || l3) && n3.push(l3);
    }
    return n3;
  }
}, 829: (t2) => {
  function e2(t3) {
    return e2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t4) {
      return typeof t4;
    } : function(t4) {
      return t4 && "function" == typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
    }, e2(t3);
  }
  function n2(t3) {
    var e3 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
    return n2 = function(t4) {
      if (null === t4 || (n3 = t4, -1 === Function.toString.call(n3).indexOf("[native code]"))) return t4;
      var n3;
      if ("function" != typeof t4) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== e3) {
        if (e3.has(t4)) return e3.get(t4);
        e3.set(t4, s3);
      }
      function s3() {
        return r2(t4, arguments, i2(this).constructor);
      }
      return s3.prototype = Object.create(t4.prototype, { constructor: { value: s3, enumerable: false, writable: true, configurable: true } }), o2(s3, t4);
    }, n2(t3);
  }
  function r2(t3, e3, n3) {
    return r2 = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if ("function" == typeof Proxy) return true;
      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        })), true;
      } catch (t4) {
        return false;
      }
    }() ? Reflect.construct : function(t4, e4, n4) {
      var r3 = [null];
      r3.push.apply(r3, e4);
      var i3 = new (Function.bind.apply(t4, r3))();
      return n4 && o2(i3, n4.prototype), i3;
    }, r2.apply(null, arguments);
  }
  function o2(t3, e3) {
    return o2 = Object.setPrototypeOf || function(t4, e4) {
      return t4.__proto__ = e4, t4;
    }, o2(t3, e3);
  }
  function i2(t3) {
    return i2 = Object.setPrototypeOf ? Object.getPrototypeOf : function(t4) {
      return t4.__proto__ || Object.getPrototypeOf(t4);
    }, i2(t3);
  }
  var s2 = function(t3) {
    function n3(t4) {
      var r3;
      return function(t5, e3) {
        if (!(t5 instanceof e3)) throw new TypeError("Cannot call a class as a function");
      }(this, n3), (r3 = function(t5, n4) {
        return !n4 || "object" !== e2(n4) && "function" != typeof n4 ? function(t6) {
          if (void 0 === t6) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t6;
        }(t5) : n4;
      }(this, i2(n3).call(this, t4))).name = "ObjectPrototypeMutationError", r3;
    }
    return function(t4, e3) {
      if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
      t4.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t4, writable: true, configurable: true } }), e3 && o2(t4, e3);
    }(n3, t3), n3;
  }(n2(Error));
  function a2(t3, n3) {
    for (var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {
    }, o3 = n3.split("."), i3 = o3.length, s3 = function(e3) {
      var n4 = o3[e3];
      if (!t3) return { v: void 0 };
      if ("+" === n4) {
        if (Array.isArray(t3)) return { v: t3.map(function(n5, i5) {
          var s4 = o3.slice(e3 + 1);
          return s4.length > 0 ? a2(n5, s4.join("."), r3) : r3(t3, i5, o3, e3);
        }) };
        var i4 = o3.slice(0, e3).join(".");
        throw new Error("Object at wildcard (".concat(i4, ") is not an array"));
      }
      t3 = r3(t3, n4, o3, e3);
    }, c3 = 0; c3 < i3; c3++) {
      var u2 = s3(c3);
      if ("object" === e2(u2)) return u2.v;
    }
    return t3;
  }
  function c2(t3, e3) {
    return t3.length === e3 + 1;
  }
  t2.exports = { set: function(t3, n3, r3) {
    if ("object" != e2(t3) || null === t3) return t3;
    if (void 0 === n3) return t3;
    if ("number" == typeof n3) return t3[n3] = r3, t3[n3];
    try {
      return a2(t3, n3, function(t4, e3, n4, o3) {
        if (t4 === Reflect.getPrototypeOf({})) throw new s2("Attempting to mutate Object.prototype");
        if (!t4[e3]) {
          var i3 = Number.isInteger(Number(n4[o3 + 1])), a3 = "+" === n4[o3 + 1];
          t4[e3] = i3 || a3 ? [] : {};
        }
        return c2(n4, o3) && (t4[e3] = r3), t4[e3];
      });
    } catch (e3) {
      if (e3 instanceof s2) throw e3;
      return t3;
    }
  }, get: function(t3, n3) {
    if ("object" != e2(t3) || null === t3) return t3;
    if (void 0 === n3) return t3;
    if ("number" == typeof n3) return t3[n3];
    try {
      return a2(t3, n3, function(t4, e3) {
        return t4[e3];
      });
    } catch (e3) {
      return t3;
    }
  }, has: function(t3, n3) {
    var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    if ("object" != e2(t3) || null === t3) return false;
    if (void 0 === n3) return false;
    if ("number" == typeof n3) return n3 in t3;
    try {
      var o3 = false;
      return a2(t3, n3, function(t4, e3, n4, i3) {
        if (!c2(n4, i3)) return t4 && t4[e3];
        o3 = r3.own ? t4.hasOwnProperty(e3) : e3 in t4;
      }), o3;
    } catch (t4) {
      return false;
    }
  }, hasOwn: function(t3, e3, n3) {
    return this.has(t3, e3, n3 || { own: true });
  }, isIn: function(t3, n3, r3) {
    var o3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    if ("object" != e2(t3) || null === t3) return false;
    if (void 0 === n3) return false;
    try {
      var i3 = false, s3 = false;
      return a2(t3, n3, function(t4, n4, o4, a3) {
        return i3 = i3 || t4 === r3 || !!t4 && t4[n4] === r3, s3 = c2(o4, a3) && "object" === e2(t4) && n4 in t4, t4 && t4[n4];
      }), o3.validPath ? i3 && s3 : i3;
    } catch (t4) {
      return false;
    }
  }, ObjectPrototypeMutationError: s2 };
}, 47: (t2, e2, n2) => {
  var r2 = n2(410), o2 = function(t3) {
    return "string" == typeof t3;
  };
  function i2(t3, e3) {
    for (var n3 = [], r3 = 0; r3 < t3.length; r3++) {
      var o3 = t3[r3];
      o3 && "." !== o3 && (".." === o3 ? n3.length && ".." !== n3[n3.length - 1] ? n3.pop() : e3 && n3.push("..") : n3.push(o3));
    }
    return n3;
  }
  var s2 = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, a2 = {};
  function c2(t3) {
    return s2.exec(t3).slice(1);
  }
  a2.resolve = function() {
    for (var t3 = "", e3 = false, n3 = arguments.length - 1; n3 >= -1 && !e3; n3--) {
      var r3 = n3 >= 0 ? arguments[n3] : process$1$1.cwd();
      if (!o2(r3)) throw new TypeError("Arguments to path.resolve must be strings");
      r3 && (t3 = r3 + "/" + t3, e3 = "/" === r3.charAt(0));
    }
    return (e3 ? "/" : "") + (t3 = i2(t3.split("/"), !e3).join("/")) || ".";
  }, a2.normalize = function(t3) {
    var e3 = a2.isAbsolute(t3), n3 = "/" === t3.substr(-1);
    return (t3 = i2(t3.split("/"), !e3).join("/")) || e3 || (t3 = "."), t3 && n3 && (t3 += "/"), (e3 ? "/" : "") + t3;
  }, a2.isAbsolute = function(t3) {
    return "/" === t3.charAt(0);
  }, a2.join = function() {
    for (var t3 = "", e3 = 0; e3 < arguments.length; e3++) {
      var n3 = arguments[e3];
      if (!o2(n3)) throw new TypeError("Arguments to path.join must be strings");
      n3 && (t3 += t3 ? "/" + n3 : n3);
    }
    return a2.normalize(t3);
  }, a2.relative = function(t3, e3) {
    function n3(t4) {
      for (var e4 = 0; e4 < t4.length && "" === t4[e4]; e4++) ;
      for (var n4 = t4.length - 1; n4 >= 0 && "" === t4[n4]; n4--) ;
      return e4 > n4 ? [] : t4.slice(e4, n4 + 1);
    }
    t3 = a2.resolve(t3).substr(1), e3 = a2.resolve(e3).substr(1);
    for (var r3 = n3(t3.split("/")), o3 = n3(e3.split("/")), i3 = Math.min(r3.length, o3.length), s3 = i3, c3 = 0; c3 < i3; c3++) if (r3[c3] !== o3[c3]) {
      s3 = c3;
      break;
    }
    var u2 = [];
    for (c3 = s3; c3 < r3.length; c3++) u2.push("..");
    return (u2 = u2.concat(o3.slice(s3))).join("/");
  }, a2._makeLong = function(t3) {
    return t3;
  }, a2.dirname = function(t3) {
    var e3 = c2(t3), n3 = e3[0], r3 = e3[1];
    return n3 || r3 ? (r3 && (r3 = r3.substr(0, r3.length - 1)), n3 + r3) : ".";
  }, a2.basename = function(t3, e3) {
    var n3 = c2(t3)[2];
    return e3 && n3.substr(-1 * e3.length) === e3 && (n3 = n3.substr(0, n3.length - e3.length)), n3;
  }, a2.extname = function(t3) {
    return c2(t3)[3];
  }, a2.format = function(t3) {
    if (!r2.isObject(t3)) throw new TypeError("Parameter 'pathObject' must be an object, not " + typeof t3);
    var e3 = t3.root || "";
    if (!o2(e3)) throw new TypeError("'pathObject.root' must be a string or undefined, not " + typeof t3.root);
    return (t3.dir ? t3.dir + a2.sep : "") + (t3.base || "");
  }, a2.parse = function(t3) {
    if (!o2(t3)) throw new TypeError("Parameter 'pathString' must be a string, not " + typeof t3);
    var e3 = c2(t3);
    if (!e3 || 4 !== e3.length) throw new TypeError("Invalid path '" + t3 + "'");
    return e3[1] = e3[1] || "", e3[2] = e3[2] || "", e3[3] = e3[3] || "", { root: e3[0], dir: e3[0] + e3[1].slice(0, e3[1].length - 1), base: e3[2], ext: e3[3], name: e3[2].slice(0, e3[2].length - e3[3].length) };
  }, a2.sep = "/", a2.delimiter = ":", t2.exports = a2;
}, 647: (t2, e2) => {
  var n2 = Object.prototype.hasOwnProperty;
  function r2(t3) {
    try {
      return decodeURIComponent(t3.replace(/\+/g, " "));
    } catch (t4) {
      return null;
    }
  }
  function o2(t3) {
    try {
      return encodeURIComponent(t3);
    } catch (t4) {
      return null;
    }
  }
  e2.stringify = function(t3, e3) {
    e3 = e3 || "";
    var r3, i2, s2 = [];
    for (i2 in "string" != typeof e3 && (e3 = "?"), t3) if (n2.call(t3, i2)) {
      if ((r3 = t3[i2]) || null != r3 && !isNaN(r3) || (r3 = ""), i2 = o2(i2), r3 = o2(r3), null === i2 || null === r3) continue;
      s2.push(i2 + "=" + r3);
    }
    return s2.length ? e3 + s2.join("&") : "";
  }, e2.parse = function(t3) {
    for (var e3, n3 = /([^=?#&]+)=?([^&]*)/g, o3 = {}; e3 = n3.exec(t3); ) {
      var i2 = r2(e3[1]), s2 = r2(e3[2]);
      null === i2 || null === s2 || i2 in o3 || (o3[i2] = s2);
    }
    return o3;
  };
}, 670: (t2) => {
  t2.exports = function(t3, e2) {
    if (e2 = e2.split(":")[0], !(t3 = +t3)) return false;
    switch (e2) {
      case "http":
      case "ws":
        return 80 !== t3;
      case "https":
      case "wss":
        return 443 !== t3;
      case "ftp":
        return 21 !== t3;
      case "gopher":
        return 70 !== t3;
      case "file":
        return false;
    }
    return 0 !== t3;
  };
}, 494: (t2) => {
  const e2 = /^[-+]?0x[a-fA-F0-9]+$/, n2 = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
  !Number.parseInt && window.parseInt && (Number.parseInt = window.parseInt), !Number.parseFloat && window.parseFloat && (Number.parseFloat = window.parseFloat);
  const r2 = { hex: true, leadingZeros: true, decimalPoint: ".", eNotation: true };
  t2.exports = function(t3) {
    let o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (o2 = Object.assign({}, r2, o2), !t3 || "string" != typeof t3) return t3;
    let i2 = t3.trim();
    if (void 0 !== o2.skipLike && o2.skipLike.test(i2)) return t3;
    if (o2.hex && e2.test(i2)) return Number.parseInt(i2, 16);
    {
      const e3 = n2.exec(i2);
      if (e3) {
        const n3 = e3[1], r3 = e3[2];
        let a2 = (s2 = e3[3]) && -1 !== s2.indexOf(".") ? ("." === (s2 = s2.replace(/0+$/, "")) ? s2 = "0" : "." === s2[0] ? s2 = "0" + s2 : "." === s2[s2.length - 1] && (s2 = s2.substr(0, s2.length - 1)), s2) : s2;
        const c2 = e3[4] || e3[6];
        if (!o2.leadingZeros && r3.length > 0 && n3 && "." !== i2[2]) return t3;
        if (!o2.leadingZeros && r3.length > 0 && !n3 && "." !== i2[1]) return t3;
        {
          const e4 = Number(i2), s3 = "" + e4;
          return -1 !== s3.search(/[eE]/) || c2 ? o2.eNotation ? e4 : t3 : -1 !== i2.indexOf(".") ? "0" === s3 && "" === a2 || s3 === a2 || n3 && s3 === "-" + a2 ? e4 : t3 : r3 ? a2 === s3 || n3 + a2 === s3 ? e4 : t3 : i2 === s3 || i2 === n3 + s3 ? e4 : t3;
        }
      }
      return t3;
    }
    var s2;
  };
}, 737: (t2, e2, n2) => {
  var r2 = n2(670), o2 = n2(647), i2 = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, s2 = /[\n\r\t]/g, a2 = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, c2 = /:\d+$/, u2 = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, l2 = /^[a-zA-Z]:/;
  function h2(t3) {
    return (t3 || "").toString().replace(i2, "");
  }
  var p2 = [["#", "hash"], ["?", "query"], function(t3, e3) {
    return g2(e3.protocol) ? t3.replace(/\\/g, "/") : t3;
  }, ["/", "pathname"], ["@", "auth", 1], [NaN, "host", void 0, 1, 1], [/:(\d*)$/, "port", void 0, 1], [NaN, "hostname", void 0, 1, 1]], f2 = { hash: 1, query: 1 };
  function d2(t3) {
    var e3, n3 = ("undefined" != typeof window ? window : "undefined" != typeof global$e ? global$e : "undefined" != typeof self ? self : {}).location || {}, r3 = {}, o3 = typeof (t3 = t3 || n3);
    if ("blob:" === t3.protocol) r3 = new v(unescape(t3.pathname), {});
    else if ("string" === o3) for (e3 in r3 = new v(t3, {}), f2) delete r3[e3];
    else if ("object" === o3) {
      for (e3 in t3) e3 in f2 || (r3[e3] = t3[e3]);
      void 0 === r3.slashes && (r3.slashes = a2.test(t3.href));
    }
    return r3;
  }
  function g2(t3) {
    return "file:" === t3 || "ftp:" === t3 || "http:" === t3 || "https:" === t3 || "ws:" === t3 || "wss:" === t3;
  }
  function m(t3, e3) {
    t3 = (t3 = h2(t3)).replace(s2, ""), e3 = e3 || {};
    var n3, r3 = u2.exec(t3), o3 = r3[1] ? r3[1].toLowerCase() : "", i3 = !!r3[2], a3 = !!r3[3], c3 = 0;
    return i3 ? a3 ? (n3 = r3[2] + r3[3] + r3[4], c3 = r3[2].length + r3[3].length) : (n3 = r3[2] + r3[4], c3 = r3[2].length) : a3 ? (n3 = r3[3] + r3[4], c3 = r3[3].length) : n3 = r3[4], "file:" === o3 ? c3 >= 2 && (n3 = n3.slice(2)) : g2(o3) ? n3 = r3[4] : o3 ? i3 && (n3 = n3.slice(2)) : c3 >= 2 && g2(e3.protocol) && (n3 = r3[4]), { protocol: o3, slashes: i3 || g2(o3), slashesCount: c3, rest: n3 };
  }
  function v(t3, e3, n3) {
    if (t3 = (t3 = h2(t3)).replace(s2, ""), !(this instanceof v)) return new v(t3, e3, n3);
    var i3, a3, c3, u3, f3, y, b = p2.slice(), w2 = typeof e3, x = this, N = 0;
    for ("object" !== w2 && "string" !== w2 && (n3 = e3, e3 = null), n3 && "function" != typeof n3 && (n3 = o2.parse), i3 = !(a3 = m(t3 || "", e3 = d2(e3))).protocol && !a3.slashes, x.slashes = a3.slashes || i3 && e3.slashes, x.protocol = a3.protocol || e3.protocol || "", t3 = a3.rest, ("file:" === a3.protocol && (2 !== a3.slashesCount || l2.test(t3)) || !a3.slashes && (a3.protocol || a3.slashesCount < 2 || !g2(x.protocol))) && (b[3] = [/(.*)/, "pathname"]); N < b.length; N++) "function" != typeof (u3 = b[N]) ? (c3 = u3[0], y = u3[1], c3 != c3 ? x[y] = t3 : "string" == typeof c3 ? ~(f3 = "@" === c3 ? t3.lastIndexOf(c3) : t3.indexOf(c3)) && ("number" == typeof u3[2] ? (x[y] = t3.slice(0, f3), t3 = t3.slice(f3 + u3[2])) : (x[y] = t3.slice(f3), t3 = t3.slice(0, f3))) : (f3 = c3.exec(t3)) && (x[y] = f3[1], t3 = t3.slice(0, f3.index)), x[y] = x[y] || i3 && u3[3] && e3[y] || "", u3[4] && (x[y] = x[y].toLowerCase())) : t3 = u3(t3, x);
    n3 && (x.query = n3(x.query)), i3 && e3.slashes && "/" !== x.pathname.charAt(0) && ("" !== x.pathname || "" !== e3.pathname) && (x.pathname = function(t4, e4) {
      if ("" === t4) return e4;
      for (var n4 = (e4 || "/").split("/").slice(0, -1).concat(t4.split("/")), r3 = n4.length, o3 = n4[r3 - 1], i4 = false, s3 = 0; r3--; ) "." === n4[r3] ? n4.splice(r3, 1) : ".." === n4[r3] ? (n4.splice(r3, 1), s3++) : s3 && (0 === r3 && (i4 = true), n4.splice(r3, 1), s3--);
      return i4 && n4.unshift(""), "." !== o3 && ".." !== o3 || n4.push(""), n4.join("/");
    }(x.pathname, e3.pathname)), "/" !== x.pathname.charAt(0) && g2(x.protocol) && (x.pathname = "/" + x.pathname), r2(x.port, x.protocol) || (x.host = x.hostname, x.port = ""), x.username = x.password = "", x.auth && (~(f3 = x.auth.indexOf(":")) ? (x.username = x.auth.slice(0, f3), x.username = encodeURIComponent(decodeURIComponent(x.username)), x.password = x.auth.slice(f3 + 1), x.password = encodeURIComponent(decodeURIComponent(x.password))) : x.username = encodeURIComponent(decodeURIComponent(x.auth)), x.auth = x.password ? x.username + ":" + x.password : x.username), x.origin = "file:" !== x.protocol && g2(x.protocol) && x.host ? x.protocol + "//" + x.host : "null", x.href = x.toString();
  }
  v.prototype = { set: function(t3, e3, n3) {
    var i3 = this;
    switch (t3) {
      case "query":
        "string" == typeof e3 && e3.length && (e3 = (n3 || o2.parse)(e3)), i3[t3] = e3;
        break;
      case "port":
        i3[t3] = e3, r2(e3, i3.protocol) ? e3 && (i3.host = i3.hostname + ":" + e3) : (i3.host = i3.hostname, i3[t3] = "");
        break;
      case "hostname":
        i3[t3] = e3, i3.port && (e3 += ":" + i3.port), i3.host = e3;
        break;
      case "host":
        i3[t3] = e3, c2.test(e3) ? (e3 = e3.split(":"), i3.port = e3.pop(), i3.hostname = e3.join(":")) : (i3.hostname = e3, i3.port = "");
        break;
      case "protocol":
        i3.protocol = e3.toLowerCase(), i3.slashes = !n3;
        break;
      case "pathname":
      case "hash":
        if (e3) {
          var s3 = "pathname" === t3 ? "/" : "#";
          i3[t3] = e3.charAt(0) !== s3 ? s3 + e3 : e3;
        } else i3[t3] = e3;
        break;
      case "username":
      case "password":
        i3[t3] = encodeURIComponent(e3);
        break;
      case "auth":
        var a3 = e3.indexOf(":");
        ~a3 ? (i3.username = e3.slice(0, a3), i3.username = encodeURIComponent(decodeURIComponent(i3.username)), i3.password = e3.slice(a3 + 1), i3.password = encodeURIComponent(decodeURIComponent(i3.password))) : i3.username = encodeURIComponent(decodeURIComponent(e3));
    }
    for (var u3 = 0; u3 < p2.length; u3++) {
      var l3 = p2[u3];
      l3[4] && (i3[l3[1]] = i3[l3[1]].toLowerCase());
    }
    return i3.auth = i3.password ? i3.username + ":" + i3.password : i3.username, i3.origin = "file:" !== i3.protocol && g2(i3.protocol) && i3.host ? i3.protocol + "//" + i3.host : "null", i3.href = i3.toString(), i3;
  }, toString: function(t3) {
    t3 && "function" == typeof t3 || (t3 = o2.stringify);
    var e3, n3 = this, r3 = n3.host, i3 = n3.protocol;
    i3 && ":" !== i3.charAt(i3.length - 1) && (i3 += ":");
    var s3 = i3 + (n3.protocol && n3.slashes || g2(n3.protocol) ? "//" : "");
    return n3.username ? (s3 += n3.username, n3.password && (s3 += ":" + n3.password), s3 += "@") : n3.password ? (s3 += ":" + n3.password, s3 += "@") : "file:" !== n3.protocol && g2(n3.protocol) && !r3 && "/" !== n3.pathname && (s3 += "@"), (":" === r3[r3.length - 1] || c2.test(n3.hostname) && !n3.port) && (r3 += ":"), s3 += r3 + n3.pathname, (e3 = "object" == typeof n3.query ? t3(n3.query) : n3.query) && (s3 += "?" !== e3.charAt(0) ? "?" + e3 : e3), n3.hash && (s3 += n3.hash), s3;
  } }, v.extractProtocol = m, v.location = d2, v.trimLeft = h2, v.qs = o2, t2.exports = v;
}, 410: () => {
}, 388: () => {
}, 805: () => {
}, 345: () => {
}, 800: () => {
} }, e = {};
function n(r2) {
  var o2 = e[r2];
  if (void 0 !== o2) return o2.exports;
  var i2 = e[r2] = { id: r2, loaded: false, exports: {} };
  return t[r2].call(i2.exports, i2, i2.exports, n), i2.loaded = true, i2.exports;
}
n.n = (t2) => {
  var e2 = t2 && t2.__esModule ? () => t2.default : () => t2;
  return n.d(e2, { a: e2 }), e2;
}, n.d = (t2, e2) => {
  for (var r2 in e2) n.o(e2, r2) && !n.o(t2, r2) && Object.defineProperty(t2, r2, { enumerable: true, get: e2[r2] });
}, n.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), n.nmd = (t2) => (t2.paths = [], t2.children || (t2.children = []), t2);
var r = {};
(() => {
  n.d(r, { hT: () => C, O4: () => S, Kd: () => T, YK: () => j, UU: () => Ke, Gu: () => M, ky: () => te, h4: () => Jt, ch: () => Qt, hq: () => zt, i5: () => ee });
  var t2 = n(737), e2 = n.n(t2);
  function o2(t3) {
    if (!i2(t3)) throw new Error("Parameter was not an error");
  }
  function i2(t3) {
    return "[object Error]" === (e3 = t3, Object.prototype.toString.call(e3)) || t3 instanceof Error;
    var e3;
  }
  class s2 extends Error {
    constructor(t3, e3) {
      const n2 = [...arguments], { options: r2, shortMessage: o3 } = function(t4) {
        let e4, n3 = "";
        if (0 === t4.length) e4 = {};
        else if (i2(t4[0])) e4 = { cause: t4[0] }, n3 = t4.slice(1).join(" ") || "";
        else if (t4[0] && "object" == typeof t4[0]) e4 = Object.assign({}, t4[0]), n3 = t4.slice(1).join(" ") || "";
        else {
          if ("string" != typeof t4[0]) throw new Error("Invalid arguments passed to Layerr");
          e4 = {}, n3 = n3 = t4.join(" ") || "";
        }
        return { options: e4, shortMessage: n3 };
      }(n2);
      let s3 = o3;
      if (r2.cause && (s3 = "".concat(s3, ": ").concat(r2.cause.message)), super(s3), this.message = s3, r2.name && "string" == typeof r2.name ? this.name = r2.name : this.name = "Layerr", r2.cause && Object.defineProperty(this, "_cause", { value: r2.cause }), Object.defineProperty(this, "_info", { value: {} }), r2.info && "object" == typeof r2.info && Object.assign(this._info, r2.info), Error.captureStackTrace) {
        const t4 = r2.constructorOpt || this.constructor;
        Error.captureStackTrace(this, t4);
      }
    }
    static cause(t3) {
      return o2(t3), t3._cause && i2(t3._cause) ? t3._cause : null;
    }
    static fullStack(t3) {
      o2(t3);
      const e3 = s2.cause(t3);
      return e3 ? "".concat(t3.stack, "\ncaused by: ").concat(s2.fullStack(e3)) : t3.stack;
    }
    static info(t3) {
      o2(t3);
      const e3 = {}, n2 = s2.cause(t3);
      return n2 && Object.assign(e3, s2.info(n2)), t3._info && Object.assign(e3, t3._info), e3;
    }
    cause() {
      return s2.cause(this);
    }
    toString() {
      let t3 = this.name || this.constructor.name || this.constructor.prototype.name;
      return this.message && (t3 = "".concat(t3, ": ").concat(this.message)), t3;
    }
  }
  var a2 = n(47), c2 = n.n(a2);
  const u2 = "__PATH_SEPARATOR_POSIX__", l2 = "__PATH_SEPARATOR_WINDOWS__";
  function h2(t3) {
    try {
      const e3 = t3.replace(/\//g, u2).replace(/\\\\/g, l2);
      return encodeURIComponent(e3).split(l2).join("\\\\").split(u2).join("/");
    } catch (t4) {
      throw new s2(t4, "Failed encoding path");
    }
  }
  function p2(t3) {
    return t3.startsWith("/") ? t3 : "/" + t3;
  }
  function f2(t3) {
    let e3 = t3;
    return "/" !== e3[0] && (e3 = "/" + e3), /^.+\/$/.test(e3) && (e3 = e3.substr(0, e3.length - 1)), e3;
  }
  function d2(t3) {
    let n2 = new (e2())(t3).pathname;
    return n2.length <= 0 && (n2 = "/"), f2(n2);
  }
  function g2() {
    for (var t3 = arguments.length, e3 = new Array(t3), n2 = 0; n2 < t3; n2++) e3[n2] = arguments[n2];
    return function() {
      return function(t4) {
        var e4 = [];
        if (0 === t4.length) return "";
        if ("string" != typeof t4[0]) throw new TypeError("Url must be a string. Received " + t4[0]);
        if (t4[0].match(/^[^/:]+:\/*$/) && t4.length > 1) {
          var n3 = t4.shift();
          t4[0] = n3 + t4[0];
        }
        t4[0].match(/^file:\/\/\//) ? t4[0] = t4[0].replace(/^([^/:]+):\/*/, "$1:///") : t4[0] = t4[0].replace(/^([^/:]+):\/*/, "$1://");
        for (var r2 = 0; r2 < t4.length; r2++) {
          var o3 = t4[r2];
          if ("string" != typeof o3) throw new TypeError("Url must be a string. Received " + o3);
          "" !== o3 && (r2 > 0 && (o3 = o3.replace(/^[\/]+/, "")), o3 = r2 < t4.length - 1 ? o3.replace(/[\/]+$/, "") : o3.replace(/[\/]+$/, "/"), e4.push(o3));
        }
        var i3 = e4.join("/"), s3 = (i3 = i3.replace(/\/(\?|&|#[^!])/g, "$1")).split("?");
        return s3.shift() + (s3.length > 0 ? "?" : "") + s3.join("&");
      }("object" == typeof arguments[0] ? arguments[0] : [].slice.call(arguments));
    }(e3.reduce((t4, e4, n3) => ((0 === n3 || "/" !== e4 || "/" === e4 && "/" !== t4[t4.length - 1]) && t4.push(e4), t4), []));
  }
  var m = n(542), v = n.n(m);
  const y = "abcdef0123456789";
  function b(t3, e3) {
    const n2 = t3.url.replace("//", ""), r2 = -1 == n2.indexOf("/") ? "/" : n2.slice(n2.indexOf("/")), o3 = t3.method ? t3.method.toUpperCase() : "GET", i3 = !!/(^|,)\s*auth\s*($|,)/.test(e3.qop) && "auth", s3 = "00000000".concat(e3.nc).slice(-8), a3 = function(t4, e4, n3, r3, o4, i4, s4) {
      const a4 = s4 || v()("".concat(e4, ":").concat(n3, ":").concat(r3));
      return t4 && "md5-sess" === t4.toLowerCase() ? v()("".concat(a4, ":").concat(o4, ":").concat(i4)) : a4;
    }(e3.algorithm, e3.username, e3.realm, e3.password, e3.nonce, e3.cnonce, e3.ha1), c3 = v()("".concat(o3, ":").concat(r2)), u3 = i3 ? v()("".concat(a3, ":").concat(e3.nonce, ":").concat(s3, ":").concat(e3.cnonce, ":").concat(i3, ":").concat(c3)) : v()("".concat(a3, ":").concat(e3.nonce, ":").concat(c3)), l3 = { username: e3.username, realm: e3.realm, nonce: e3.nonce, uri: r2, qop: i3, response: u3, nc: s3, cnonce: e3.cnonce, algorithm: e3.algorithm, opaque: e3.opaque }, h3 = [];
    for (const t4 in l3) l3[t4] && ("qop" === t4 || "nc" === t4 || "algorithm" === t4 ? h3.push("".concat(t4, "=").concat(l3[t4])) : h3.push("".concat(t4, '="').concat(l3[t4], '"')));
    return "Digest ".concat(h3.join(", "));
  }
  function w2(t3) {
    return "digest" === (t3.headers && t3.headers.get("www-authenticate") || "").split(/\s/)[0].toLowerCase();
  }
  var x = n(101), N = n.n(x);
  function P(t3) {
    return N().decode(t3);
  }
  function A(t3, e3) {
    const n2 = (r2 = "".concat(t3, ":").concat(e3), N().encode(r2));
    var r2;
    return "Basic ".concat(n2);
  }
  const O = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : "undefined" != typeof window ? window : globalThis, E = O.fetch.bind(O), T = O.Request, j = O.Response;
  let C = function(t3) {
    return t3.Auto = "auto", t3.Digest = "digest", t3.None = "none", t3.Password = "password", t3.Token = "token", t3;
  }({}), S = function(t3) {
    return t3.DataTypeNoLength = "data-type-no-length", t3.InvalidAuthType = "invalid-auth-type", t3.InvalidOutputFormat = "invalid-output-format", t3.LinkUnsupportedAuthType = "link-unsupported-auth", t3.InvalidUpdateRange = "invalid-update-range", t3.NotSupported = "not-supported", t3;
  }({});
  function I(t3, e3, n2, r2, o3) {
    switch (t3.authType) {
      case C.Auto:
        e3 && n2 && (t3.headers.Authorization = A(e3, n2));
        break;
      case C.Digest:
        t3.digest = /* @__PURE__ */ function(t4, e4, n3) {
          return { username: t4, password: e4, ha1: n3, nc: 0, algorithm: "md5", hasDigestAuth: false };
        }(e3, n2, o3);
        break;
      case C.None:
        break;
      case C.Password:
        t3.headers.Authorization = A(e3, n2);
        break;
      case C.Token:
        t3.headers.Authorization = "".concat((i3 = r2).token_type, " ").concat(i3.access_token);
        break;
      default:
        throw new s2({ info: { code: S.InvalidAuthType } }, "Invalid auth type: ".concat(t3.authType));
    }
    var i3;
  }
  n(345), n(800);
  const k = "@@HOTPATCHER", R = () => {
  };
  function L(t3) {
    return { original: t3, methods: [t3], final: false };
  }
  class _2 {
    constructor() {
      this._configuration = { registry: {}, getEmptyAction: "null" }, this.__type__ = k;
    }
    get configuration() {
      return this._configuration;
    }
    get getEmptyAction() {
      return this.configuration.getEmptyAction;
    }
    set getEmptyAction(t3) {
      this.configuration.getEmptyAction = t3;
    }
    control(t3) {
      let e3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      if (!t3 || t3.__type__ !== k) throw new Error("Failed taking control of target HotPatcher instance: Invalid type or object");
      return Object.keys(t3.configuration.registry).forEach((n2) => {
        this.configuration.registry.hasOwnProperty(n2) ? e3 && (this.configuration.registry[n2] = Object.assign({}, t3.configuration.registry[n2])) : this.configuration.registry[n2] = Object.assign({}, t3.configuration.registry[n2]);
      }), t3._configuration = this.configuration, this;
    }
    execute(t3) {
      const e3 = this.get(t3) || R;
      for (var n2 = arguments.length, r2 = new Array(n2 > 1 ? n2 - 1 : 0), o3 = 1; o3 < n2; o3++) r2[o3 - 1] = arguments[o3];
      return e3(...r2);
    }
    get(t3) {
      const e3 = this.configuration.registry[t3];
      if (!e3) switch (this.getEmptyAction) {
        case "null":
          return null;
        case "throw":
          throw new Error("Failed handling method request: No method provided for override: ".concat(t3));
        default:
          throw new Error("Failed handling request which resulted in an empty method: Invalid empty-action specified: ".concat(this.getEmptyAction));
      }
      return function() {
        for (var t4 = arguments.length, e4 = new Array(t4), n2 = 0; n2 < t4; n2++) e4[n2] = arguments[n2];
        if (0 === e4.length) throw new Error("Failed creating sequence: No functions provided");
        return function() {
          for (var t5 = arguments.length, n3 = new Array(t5), r2 = 0; r2 < t5; r2++) n3[r2] = arguments[r2];
          let o3 = n3;
          const i3 = this;
          for (; e4.length > 0; ) o3 = [e4.shift().apply(i3, o3)];
          return o3[0];
        };
      }(...e3.methods);
    }
    isPatched(t3) {
      return !!this.configuration.registry[t3];
    }
    patch(t3, e3) {
      let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      const { chain: r2 = false } = n2;
      if (this.configuration.registry[t3] && this.configuration.registry[t3].final) throw new Error("Failed patching '".concat(t3, "': Method marked as being final"));
      if ("function" != typeof e3) throw new Error("Failed patching '".concat(t3, "': Provided method is not a function"));
      if (r2) this.configuration.registry[t3] ? this.configuration.registry[t3].methods.push(e3) : this.configuration.registry[t3] = L(e3);
      else if (this.isPatched(t3)) {
        const { original: n3 } = this.configuration.registry[t3];
        this.configuration.registry[t3] = Object.assign(L(e3), { original: n3 });
      } else this.configuration.registry[t3] = L(e3);
      return this;
    }
    patchInline(t3, e3) {
      this.isPatched(t3) || this.patch(t3, e3);
      for (var n2 = arguments.length, r2 = new Array(n2 > 2 ? n2 - 2 : 0), o3 = 2; o3 < n2; o3++) r2[o3 - 2] = arguments[o3];
      return this.execute(t3, ...r2);
    }
    plugin(t3) {
      for (var e3 = arguments.length, n2 = new Array(e3 > 1 ? e3 - 1 : 0), r2 = 1; r2 < e3; r2++) n2[r2 - 1] = arguments[r2];
      return n2.forEach((e4) => {
        this.patch(t3, e4, { chain: true });
      }), this;
    }
    restore(t3) {
      if (!this.isPatched(t3)) throw new Error("Failed restoring method: No method present for key: ".concat(t3));
      if ("function" != typeof this.configuration.registry[t3].original) throw new Error("Failed restoring method: Original method not found or of invalid type for key: ".concat(t3));
      return this.configuration.registry[t3].methods = [this.configuration.registry[t3].original], this;
    }
    setFinal(t3) {
      if (!this.configuration.registry.hasOwnProperty(t3)) throw new Error("Failed marking '".concat(t3, "' as final: No method found for key"));
      return this.configuration.registry[t3].final = true, this;
    }
  }
  let U2 = null;
  function M() {
    return U2 || (U2 = new _2()), U2;
  }
  function F(t3) {
    return function(t4) {
      if ("object" != typeof t4 || null === t4 || "[object Object]" != Object.prototype.toString.call(t4)) return false;
      if (null === Object.getPrototypeOf(t4)) return true;
      let e3 = t4;
      for (; null !== Object.getPrototypeOf(e3); ) e3 = Object.getPrototypeOf(e3);
      return Object.getPrototypeOf(t4) === e3;
    }(t3) ? Object.assign({}, t3) : Object.setPrototypeOf(Object.assign({}, t3), Object.getPrototypeOf(t3));
  }
  function D() {
    for (var t3 = arguments.length, e3 = new Array(t3), n2 = 0; n2 < t3; n2++) e3[n2] = arguments[n2];
    let r2 = null, o3 = [...e3];
    for (; o3.length > 0; ) {
      const t4 = o3.shift();
      r2 = r2 ? $2(r2, t4) : F(t4);
    }
    return r2;
  }
  function $2(t3, e3) {
    const n2 = F(t3);
    return Object.keys(e3).forEach((t4) => {
      n2.hasOwnProperty(t4) ? Array.isArray(e3[t4]) ? n2[t4] = Array.isArray(n2[t4]) ? [...n2[t4], ...e3[t4]] : [...e3[t4]] : "object" == typeof e3[t4] && e3[t4] ? n2[t4] = "object" == typeof n2[t4] && n2[t4] ? $2(n2[t4], e3[t4]) : F(e3[t4]) : n2[t4] = e3[t4] : n2[t4] = e3[t4];
    }), n2;
  }
  function B(t3) {
    const e3 = {};
    for (const n2 of t3.keys()) e3[n2] = t3.get(n2);
    return e3;
  }
  function W() {
    for (var t3 = arguments.length, e3 = new Array(t3), n2 = 0; n2 < t3; n2++) e3[n2] = arguments[n2];
    if (0 === e3.length) return {};
    const r2 = {};
    return e3.reduce((t4, e4) => (Object.keys(e4).forEach((n3) => {
      const o3 = n3.toLowerCase();
      r2.hasOwnProperty(o3) ? t4[r2[o3]] = e4[n3] : (r2[o3] = n3, t4[n3] = e4[n3]);
    }), t4), {});
  }
  n(805);
  const V = "function" == typeof ArrayBuffer, { toString: z } = Object.prototype;
  function q(t3) {
    return V && (t3 instanceof ArrayBuffer || "[object ArrayBuffer]" === z.call(t3));
  }
  function G(t3) {
    return null != t3 && null != t3.constructor && "function" == typeof t3.constructor.isBuffer && t3.constructor.isBuffer(t3);
  }
  function H(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }
  function X(t3, e3, n2) {
    return t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3;
  }
  const Z = H(function(t3) {
    const e3 = t3._digest;
    return delete t3._digest, e3.hasDigestAuth && (t3 = D(t3, { headers: { Authorization: b(t3, e3) } })), X(Q(t3), function(n2) {
      let r2 = false;
      return o3 = function(t4) {
        return r2 ? t4 : n2;
      }, (i3 = function() {
        if (401 == n2.status) return e3.hasDigestAuth = function(t4, e4) {
          if (!w2(t4)) return false;
          const n3 = /([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;
          for (; ; ) {
            const r3 = t4.headers && t4.headers.get("www-authenticate") || "", o4 = n3.exec(r3);
            if (!o4) break;
            e4[o4[1]] = o4[2] || o4[3];
          }
          return e4.nc += 1, e4.cnonce = function() {
            let t5 = "";
            for (let e5 = 0; e5 < 32; ++e5) t5 = "".concat(t5).concat(y[Math.floor(16 * Math.random())]);
            return t5;
          }(), true;
        }(n2, e3), function() {
          if (e3.hasDigestAuth) return X(Q(t3 = D(t3, { headers: { Authorization: b(t3, e3) } })), function(t4) {
            return 401 == t4.status ? e3.hasDigestAuth = false : e3.nc++, r2 = true, t4;
          });
        }();
        e3.nc++;
      }()) && i3.then ? i3.then(o3) : o3(i3);
      var o3, i3;
    });
  }), Y = H(function(t3, e3) {
    return X(Q(t3), function(n2) {
      return n2.ok ? (e3.authType = C.Password, n2) : 401 == n2.status && w2(n2) ? (e3.authType = C.Digest, I(e3, e3.username, e3.password, void 0, void 0), t3._digest = e3.digest, Z(t3)) : n2;
    });
  }), K = H(function(t3, e3) {
    return e3.authType === C.Auto ? Y(t3, e3) : t3._digest ? Z(t3) : Q(t3);
  });
  function J(t3, e3, n2) {
    const r2 = F(t3);
    return r2.headers = W(e3.headers, r2.headers || {}, n2.headers || {}), void 0 !== n2.data && (r2.data = n2.data), n2.signal && (r2.signal = n2.signal), e3.httpAgent && (r2.httpAgent = e3.httpAgent), e3.httpsAgent && (r2.httpsAgent = e3.httpsAgent), e3.digest && (r2._digest = e3.digest), "boolean" == typeof e3.withCredentials && (r2.withCredentials = e3.withCredentials), r2;
  }
  function Q(t3) {
    const e3 = M();
    return e3.patchInline("request", (t4) => e3.patchInline("fetch", E, t4.url, function(t5) {
      let e4 = {};
      const n2 = { method: t5.method };
      if (t5.headers && (e4 = W(e4, t5.headers)), void 0 !== t5.data) {
        const [r2, o3] = function(t6) {
          if ("string" == typeof t6) return [t6, {}];
          if (G(t6)) return [t6, {}];
          if (q(t6)) return [t6, {}];
          if (t6 && "object" == typeof t6) return [JSON.stringify(t6), { "content-type": "application/json" }];
          throw new Error("Unable to convert request body: Unexpected body type: ".concat(typeof t6));
        }(t5.data);
        n2.body = r2, e4 = W(e4, o3);
      }
      return t5.signal && (n2.signal = t5.signal), t5.withCredentials && (n2.credentials = "include"), n2.headers = e4, n2;
    }(t4)), t3);
  }
  var tt = n(285);
  const et = { "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true], "[:alpha:]": ["\\p{L}\\p{Nl}", true], "[:ascii:]": ["\\x00-\\x7f", false], "[:blank:]": ["\\p{Zs}\\t", true], "[:cntrl:]": ["\\p{Cc}", true], "[:digit:]": ["\\p{Nd}", true], "[:graph:]": ["\\p{Z}\\p{C}", true, true], "[:lower:]": ["\\p{Ll}", true], "[:print:]": ["\\p{C}", true], "[:punct:]": ["\\p{P}", true], "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true], "[:upper:]": ["\\p{Lu}", true], "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true], "[:xdigit:]": ["A-Fa-f0-9", false] }, nt = (t3) => t3.replace(/[[\]\\-]/g, "\\$&"), rt = (t3) => t3.join(""), ot = (t3, e3) => {
    const n2 = e3;
    if ("[" !== t3.charAt(n2)) throw new Error("not in a brace expression");
    const r2 = [], o3 = [];
    let i3 = n2 + 1, s3 = false, a3 = false, c3 = false, u3 = false, l3 = n2, h3 = "";
    t: for (; i3 < t3.length; ) {
      const e4 = t3.charAt(i3);
      if ("!" !== e4 && "^" !== e4 || i3 !== n2 + 1) {
        if ("]" === e4 && s3 && !c3) {
          l3 = i3 + 1;
          break;
        }
        if (s3 = true, "\\" !== e4 || c3) {
          if ("[" === e4 && !c3) {
            for (const [e5, [s4, c4, u4]] of Object.entries(et)) if (t3.startsWith(e5, i3)) {
              if (h3) return ["$.", false, t3.length - n2, true];
              i3 += e5.length, u4 ? o3.push(s4) : r2.push(s4), a3 = a3 || c4;
              continue t;
            }
          }
          c3 = false, h3 ? (e4 > h3 ? r2.push(nt(h3) + "-" + nt(e4)) : e4 === h3 && r2.push(nt(e4)), h3 = "", i3++) : t3.startsWith("-]", i3 + 1) ? (r2.push(nt(e4 + "-")), i3 += 2) : t3.startsWith("-", i3 + 1) ? (h3 = e4, i3 += 2) : (r2.push(nt(e4)), i3++);
        } else c3 = true, i3++;
      } else u3 = true, i3++;
    }
    if (l3 < i3) return ["", false, 0, false];
    if (!r2.length && !o3.length) return ["$.", false, t3.length - n2, true];
    if (0 === o3.length && 1 === r2.length && /^\\?.$/.test(r2[0]) && !u3) {
      return [(p3 = 2 === r2[0].length ? r2[0].slice(-1) : r2[0], p3.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")), false, l3 - n2, false];
    }
    var p3;
    const f3 = "[" + (u3 ? "^" : "") + rt(r2) + "]", d3 = "[" + (u3 ? "" : "^") + rt(o3) + "]";
    return [r2.length && o3.length ? "(" + f3 + "|" + d3 + ")" : r2.length ? f3 : d3, a3, l3 - n2, true];
  };
  function it(t3, e3, n2) {
    var r2;
    return (e3 = "symbol" == typeof (r2 = function(t4, e4) {
      if ("object" != typeof t4 || !t4) return t4;
      var n3 = t4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r3 = n3.call(t4, "string");
        if ("object" != typeof r3) return r3;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(t4);
    }(e3)) ? r2 : String(r2)) in t3 ? Object.defineProperty(t3, e3, { value: n2, enumerable: true, configurable: true, writable: true }) : t3[e3] = n2, t3;
  }
  const st = function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    return Ft(e3), !(!n2.nocomment && "#" === e3.charAt(0)) && new Bt(e3, n2).match(t3);
  }, at = st, ct = /^\*+([^+@!?\*\[\(]*)$/, ut = (t3) => (e3) => !e3.startsWith(".") && e3.endsWith(t3), lt = (t3) => (e3) => e3.endsWith(t3), ht = (t3) => (t3 = t3.toLowerCase(), (e3) => !e3.startsWith(".") && e3.toLowerCase().endsWith(t3)), pt = (t3) => (t3 = t3.toLowerCase(), (e3) => e3.toLowerCase().endsWith(t3)), ft = /^\*+\.\*+$/, dt = (t3) => !t3.startsWith(".") && t3.includes("."), gt = (t3) => "." !== t3 && ".." !== t3 && t3.includes("."), mt = /^\.\*+$/, vt = (t3) => "." !== t3 && ".." !== t3 && t3.startsWith("."), yt = /^\*+$/, bt = (t3) => 0 !== t3.length && !t3.startsWith("."), wt = (t3) => 0 !== t3.length && "." !== t3 && ".." !== t3, xt = /^\?+([^+@!?\*\[\(]*)?$/, Nt = (t3) => {
    let [e3, n2 = ""] = t3;
    const r2 = Et([e3]);
    return n2 ? (n2 = n2.toLowerCase(), (t4) => r2(t4) && t4.toLowerCase().endsWith(n2)) : r2;
  }, Pt = (t3) => {
    let [e3, n2 = ""] = t3;
    const r2 = Tt([e3]);
    return n2 ? (n2 = n2.toLowerCase(), (t4) => r2(t4) && t4.toLowerCase().endsWith(n2)) : r2;
  }, At = (t3) => {
    let [e3, n2 = ""] = t3;
    const r2 = Tt([e3]);
    return n2 ? (t4) => r2(t4) && t4.endsWith(n2) : r2;
  }, Ot = (t3) => {
    let [e3, n2 = ""] = t3;
    const r2 = Et([e3]);
    return n2 ? (t4) => r2(t4) && t4.endsWith(n2) : r2;
  }, Et = (t3) => {
    let [e3] = t3;
    const n2 = e3.length;
    return (t4) => t4.length === n2 && !t4.startsWith(".");
  }, Tt = (t3) => {
    let [e3] = t3;
    const n2 = e3.length;
    return (t4) => t4.length === n2 && "." !== t4 && ".." !== t4;
  }, jt = "object" == typeof process$1$1 && process$1$1 ? "object" == typeof define_process_env_default$1 && define_process_env_default$1 && define_process_env_default$1.__MINIMATCH_TESTING_PLATFORM__ || process$1$1.platform : "posix";
  st.sep = "win32" === jt ? "\\" : "/";
  const Ct = Symbol("globstar **");
  st.GLOBSTAR = Ct;
  const St = { "!": { open: "(?:(?!(?:", close: "))[^/]*?)" }, "?": { open: "(?:", close: ")?" }, "+": { open: "(?:", close: ")+" }, "*": { open: "(?:", close: ")*" }, "@": { open: "(?:", close: ")" } }, It = "[^/]", kt = It + "*?", Rt = (t3) => t3.split("").reduce((t4, e3) => (t4[e3] = true, t4), {}), Lt = Rt("().*{}+?[]^$\\!"), _t = Rt("[.(");
  st.filter = function(t3) {
    let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return (n2) => st(n2, t3, e3);
  };
  const Ut = function(t3) {
    let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return Object.assign({}, t3, e3);
  };
  st.defaults = (t3) => {
    if (!t3 || "object" != typeof t3 || !Object.keys(t3).length) return st;
    const e3 = st;
    return Object.assign(function(n2, r2) {
      return e3(n2, r2, Ut(t3, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}));
    }, { Minimatch: class extends e3.Minimatch {
      constructor(e4) {
        super(e4, Ut(t3, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}));
      }
      static defaults(n2) {
        return e3.defaults(Ut(t3, n2)).Minimatch;
      }
    }, unescape: function(n2) {
      let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return e3.unescape(n2, Ut(t3, r2));
    }, escape: function(n2) {
      let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return e3.escape(n2, Ut(t3, r2));
    }, filter: function(n2) {
      let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return e3.filter(n2, Ut(t3, r2));
    }, defaults: (n2) => e3.defaults(Ut(t3, n2)), makeRe: function(n2) {
      let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return e3.makeRe(n2, Ut(t3, r2));
    }, braceExpand: function(n2) {
      let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return e3.braceExpand(n2, Ut(t3, r2));
    }, match: function(n2, r2) {
      let o3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      return e3.match(n2, r2, Ut(t3, o3));
    }, sep: e3.sep, GLOBSTAR: Ct });
  };
  const Mt = function(t3) {
    let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return Ft(t3), e3.nobrace || !/\{(?:(?!\{).)*\}/.test(t3) ? [t3] : tt(t3);
  };
  st.braceExpand = Mt;
  const Ft = (t3) => {
    if ("string" != typeof t3) throw new TypeError("invalid pattern");
    if (t3.length > 65536) throw new TypeError("pattern is too long");
  };
  st.makeRe = function(t3) {
    return new Bt(t3, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).makeRe();
  }, st.match = function(t3, e3) {
    const n2 = new Bt(e3, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {});
    return t3 = t3.filter((t4) => n2.match(t4)), n2.options.nonull && !t3.length && t3.push(e3), t3;
  };
  const Dt = /[?*]|[+@!]\(.*?\)|\[|\]/, $t = (t3) => t3.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  class Bt {
    constructor(t3) {
      let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      it(this, "options", void 0), it(this, "set", void 0), it(this, "pattern", void 0), it(this, "windowsPathsNoEscape", void 0), it(this, "nonegate", void 0), it(this, "negate", void 0), it(this, "comment", void 0), it(this, "empty", void 0), it(this, "preserveMultipleSlashes", void 0), it(this, "partial", void 0), it(this, "globSet", void 0), it(this, "globParts", void 0), it(this, "nocase", void 0), it(this, "isWindows", void 0), it(this, "platform", void 0), it(this, "windowsNoMagicRoot", void 0), it(this, "regexp", void 0), Ft(t3), e3 = e3 || {}, this.options = e3, this.pattern = t3, this.platform = e3.platform || jt, this.isWindows = "win32" === this.platform, this.windowsPathsNoEscape = !!e3.windowsPathsNoEscape || false === e3.allowWindowsEscape, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!e3.preserveMultipleSlashes, this.regexp = null, this.negate = false, this.nonegate = !!e3.nonegate, this.comment = false, this.empty = false, this.partial = !!e3.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = void 0 !== e3.windowsNoMagicRoot ? e3.windowsNoMagicRoot : !(!this.isWindows || !this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make();
    }
    hasMagic() {
      if (this.options.magicalBraces && this.set.length > 1) return true;
      for (const t3 of this.set) for (const e3 of t3) if ("string" != typeof e3) return true;
      return false;
    }
    debug() {
    }
    make() {
      const t3 = this.pattern, e3 = this.options;
      if (!e3.nocomment && "#" === t3.charAt(0)) return void (this.comment = true);
      if (!t3) return void (this.empty = true);
      this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], e3.debug && (this.debug = function() {
        return console.error(...arguments);
      }), this.debug(this.pattern, this.globSet);
      const n2 = this.globSet.map((t4) => this.slashSplit(t4));
      this.globParts = this.preprocess(n2), this.debug(this.pattern, this.globParts);
      let r2 = this.globParts.map((t4, e4, n3) => {
        if (this.isWindows && this.windowsNoMagicRoot) {
          const e5 = !("" !== t4[0] || "" !== t4[1] || "?" !== t4[2] && Dt.test(t4[2]) || Dt.test(t4[3])), n4 = /^[a-z]:/i.test(t4[0]);
          if (e5) return [...t4.slice(0, 4), ...t4.slice(4).map((t5) => this.parse(t5))];
          if (n4) return [t4[0], ...t4.slice(1).map((t5) => this.parse(t5))];
        }
        return t4.map((t5) => this.parse(t5));
      });
      if (this.debug(this.pattern, r2), this.set = r2.filter((t4) => -1 === t4.indexOf(false)), this.isWindows) for (let t4 = 0; t4 < this.set.length; t4++) {
        const e4 = this.set[t4];
        "" === e4[0] && "" === e4[1] && "?" === this.globParts[t4][2] && "string" == typeof e4[3] && /^[a-z]:$/i.test(e4[3]) && (e4[2] = "?");
      }
      this.debug(this.pattern, this.set);
    }
    preprocess(t3) {
      if (this.options.noglobstar) for (let e4 = 0; e4 < t3.length; e4++) for (let n2 = 0; n2 < t3[e4].length; n2++) "**" === t3[e4][n2] && (t3[e4][n2] = "*");
      const { optimizationLevel: e3 = 1 } = this.options;
      return e3 >= 2 ? (t3 = this.firstPhasePreProcess(t3), t3 = this.secondPhasePreProcess(t3)) : t3 = e3 >= 1 ? this.levelOneOptimize(t3) : this.adjascentGlobstarOptimize(t3), t3;
    }
    adjascentGlobstarOptimize(t3) {
      return t3.map((t4) => {
        let e3 = -1;
        for (; -1 !== (e3 = t4.indexOf("**", e3 + 1)); ) {
          let n2 = e3;
          for (; "**" === t4[n2 + 1]; ) n2++;
          n2 !== e3 && t4.splice(e3, n2 - e3);
        }
        return t4;
      });
    }
    levelOneOptimize(t3) {
      return t3.map((t4) => 0 === (t4 = t4.reduce((t5, e3) => {
        const n2 = t5[t5.length - 1];
        return "**" === e3 && "**" === n2 ? t5 : ".." === e3 && n2 && ".." !== n2 && "." !== n2 && "**" !== n2 ? (t5.pop(), t5) : (t5.push(e3), t5);
      }, [])).length ? [""] : t4);
    }
    levelTwoFileOptimize(t3) {
      Array.isArray(t3) || (t3 = this.slashSplit(t3));
      let e3 = false;
      do {
        if (e3 = false, !this.preserveMultipleSlashes) {
          for (let n3 = 1; n3 < t3.length - 1; n3++) {
            const r2 = t3[n3];
            1 === n3 && "" === r2 && "" === t3[0] || "." !== r2 && "" !== r2 || (e3 = true, t3.splice(n3, 1), n3--);
          }
          "." !== t3[0] || 2 !== t3.length || "." !== t3[1] && "" !== t3[1] || (e3 = true, t3.pop());
        }
        let n2 = 0;
        for (; -1 !== (n2 = t3.indexOf("..", n2 + 1)); ) {
          const r2 = t3[n2 - 1];
          r2 && "." !== r2 && ".." !== r2 && "**" !== r2 && (e3 = true, t3.splice(n2 - 1, 2), n2 -= 2);
        }
      } while (e3);
      return 0 === t3.length ? [""] : t3;
    }
    firstPhasePreProcess(t3) {
      let e3 = false;
      do {
        e3 = false;
        for (let n2 of t3) {
          let r2 = -1;
          for (; -1 !== (r2 = n2.indexOf("**", r2 + 1)); ) {
            let o4 = r2;
            for (; "**" === n2[o4 + 1]; ) o4++;
            o4 > r2 && n2.splice(r2 + 1, o4 - r2);
            let i3 = n2[r2 + 1];
            const s3 = n2[r2 + 2], a3 = n2[r2 + 3];
            if (".." !== i3) continue;
            if (!s3 || "." === s3 || ".." === s3 || !a3 || "." === a3 || ".." === a3) continue;
            e3 = true, n2.splice(r2, 1);
            const c3 = n2.slice(0);
            c3[r2] = "**", t3.push(c3), r2--;
          }
          if (!this.preserveMultipleSlashes) {
            for (let t4 = 1; t4 < n2.length - 1; t4++) {
              const r3 = n2[t4];
              1 === t4 && "" === r3 && "" === n2[0] || "." !== r3 && "" !== r3 || (e3 = true, n2.splice(t4, 1), t4--);
            }
            "." !== n2[0] || 2 !== n2.length || "." !== n2[1] && "" !== n2[1] || (e3 = true, n2.pop());
          }
          let o3 = 0;
          for (; -1 !== (o3 = n2.indexOf("..", o3 + 1)); ) {
            const t4 = n2[o3 - 1];
            if (t4 && "." !== t4 && ".." !== t4 && "**" !== t4) {
              e3 = true;
              const t5 = 1 === o3 && "**" === n2[o3 + 1] ? ["."] : [];
              n2.splice(o3 - 1, 2, ...t5), 0 === n2.length && n2.push(""), o3 -= 2;
            }
          }
        }
      } while (e3);
      return t3;
    }
    secondPhasePreProcess(t3) {
      for (let e3 = 0; e3 < t3.length - 1; e3++) for (let n2 = e3 + 1; n2 < t3.length; n2++) {
        const r2 = this.partsMatch(t3[e3], t3[n2], !this.preserveMultipleSlashes);
        r2 && (t3[e3] = r2, t3[n2] = []);
      }
      return t3.filter((t4) => t4.length);
    }
    partsMatch(t3, e3) {
      let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r2 = 0, o3 = 0, i3 = [], s3 = "";
      for (; r2 < t3.length && o3 < e3.length; ) if (t3[r2] === e3[o3]) i3.push("b" === s3 ? e3[o3] : t3[r2]), r2++, o3++;
      else if (n2 && "**" === t3[r2] && e3[o3] === t3[r2 + 1]) i3.push(t3[r2]), r2++;
      else if (n2 && "**" === e3[o3] && t3[r2] === e3[o3 + 1]) i3.push(e3[o3]), o3++;
      else if ("*" !== t3[r2] || !e3[o3] || !this.options.dot && e3[o3].startsWith(".") || "**" === e3[o3]) {
        if ("*" !== e3[o3] || !t3[r2] || !this.options.dot && t3[r2].startsWith(".") || "**" === t3[r2]) return false;
        if ("a" === s3) return false;
        s3 = "b", i3.push(e3[o3]), r2++, o3++;
      } else {
        if ("b" === s3) return false;
        s3 = "a", i3.push(t3[r2]), r2++, o3++;
      }
      return t3.length === e3.length && i3;
    }
    parseNegate() {
      if (this.nonegate) return;
      const t3 = this.pattern;
      let e3 = false, n2 = 0;
      for (let r2 = 0; r2 < t3.length && "!" === t3.charAt(r2); r2++) e3 = !e3, n2++;
      n2 && (this.pattern = t3.slice(n2)), this.negate = e3;
    }
    matchOne(t3, e3) {
      let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
      const r2 = this.options;
      if (this.isWindows) {
        const n3 = "" === t3[0] && "" === t3[1] && "?" === t3[2] && "string" == typeof t3[3] && /^[a-z]:$/i.test(t3[3]), r3 = "" === e3[0] && "" === e3[1] && "?" === e3[2] && "string" == typeof e3[3] && /^[a-z]:$/i.test(e3[3]);
        if (n3 && r3) {
          const n4 = t3[3], r4 = e3[3];
          n4.toLowerCase() === r4.toLowerCase() && (t3[3] = r4);
        } else if (r3 && "string" == typeof t3[0]) {
          const n4 = e3[3], r4 = t3[0];
          n4.toLowerCase() === r4.toLowerCase() && (e3[3] = r4, e3 = e3.slice(3));
        } else if (n3 && "string" == typeof e3[0]) {
          const n4 = t3[3];
          n4.toLowerCase() === e3[0].toLowerCase() && (e3[0] = n4, t3 = t3.slice(3));
        }
      }
      const { optimizationLevel: o3 = 1 } = this.options;
      o3 >= 2 && (t3 = this.levelTwoFileOptimize(t3)), this.debug("matchOne", this, { file: t3, pattern: e3 }), this.debug("matchOne", t3.length, e3.length);
      for (var i3 = 0, s3 = 0, a3 = t3.length, c3 = e3.length; i3 < a3 && s3 < c3; i3++, s3++) {
        this.debug("matchOne loop");
        var u3 = e3[s3], l3 = t3[i3];
        if (this.debug(e3, u3, l3), false === u3) return false;
        if (u3 === Ct) {
          this.debug("GLOBSTAR", [e3, u3, l3]);
          var h3 = i3, p3 = s3 + 1;
          if (p3 === c3) {
            for (this.debug("** at the end"); i3 < a3; i3++) if ("." === t3[i3] || ".." === t3[i3] || !r2.dot && "." === t3[i3].charAt(0)) return false;
            return true;
          }
          for (; h3 < a3; ) {
            var f3 = t3[h3];
            if (this.debug("\nglobstar while", t3, h3, e3, p3, f3), this.matchOne(t3.slice(h3), e3.slice(p3), n2)) return this.debug("globstar found match!", h3, a3, f3), true;
            if ("." === f3 || ".." === f3 || !r2.dot && "." === f3.charAt(0)) {
              this.debug("dot detected!", t3, h3, e3, p3);
              break;
            }
            this.debug("globstar swallow a segment, and continue"), h3++;
          }
          return !(!n2 || (this.debug("\n>>> no match, partial?", t3, h3, e3, p3), h3 !== a3));
        }
        let o4;
        if ("string" == typeof u3 ? (o4 = l3 === u3, this.debug("string match", u3, l3, o4)) : (o4 = u3.test(l3), this.debug("pattern match", u3, l3, o4)), !o4) return false;
      }
      if (i3 === a3 && s3 === c3) return true;
      if (i3 === a3) return n2;
      if (s3 === c3) return i3 === a3 - 1 && "" === t3[i3];
      throw new Error("wtf?");
    }
    braceExpand() {
      return Mt(this.pattern, this.options);
    }
    parse(t3) {
      Ft(t3);
      const e3 = this.options;
      if ("**" === t3) return Ct;
      if ("" === t3) return "";
      let n2, r2 = null;
      (n2 = t3.match(yt)) ? r2 = e3.dot ? wt : bt : (n2 = t3.match(ct)) ? r2 = (e3.nocase ? e3.dot ? pt : ht : e3.dot ? lt : ut)(n2[1]) : (n2 = t3.match(xt)) ? r2 = (e3.nocase ? e3.dot ? Pt : Nt : e3.dot ? At : Ot)(n2) : (n2 = t3.match(ft)) ? r2 = e3.dot ? gt : dt : (n2 = t3.match(mt)) && (r2 = vt);
      let o3 = "", i3 = false, s3 = false;
      const a3 = [], c3 = [];
      let u3, l3 = false, h3 = false, p3 = "." === t3.charAt(0), f3 = e3.dot || p3;
      const d3 = (t4) => "." === t4.charAt(0) ? "" : e3.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", g22 = () => {
        if (l3) {
          switch (l3) {
            case "*":
              o3 += kt, i3 = true;
              break;
            case "?":
              o3 += It, i3 = true;
              break;
            default:
              o3 += "\\" + l3;
          }
          this.debug("clearStateChar %j %j", l3, o3), l3 = false;
        }
      };
      for (let n3, r3 = 0; r3 < t3.length && (n3 = t3.charAt(r3)); r3++) if (this.debug("%s	%s %s %j", t3, r3, o3, n3), s3) {
        if ("/" === n3) return false;
        Lt[n3] && (o3 += "\\"), o3 += n3, s3 = false;
      } else switch (n3) {
        case "/":
          return false;
        case "\\":
          g22(), s3 = true;
          continue;
        case "?":
        case "*":
        case "+":
        case "@":
        case "!":
          this.debug("%s	%s %s %j <-- stateChar", t3, r3, o3, n3), this.debug("call clearStateChar %j", l3), g22(), l3 = n3, e3.noext && g22();
          continue;
        case "(": {
          if (!l3) {
            o3 += "\\(";
            continue;
          }
          const e4 = { type: l3, start: r3 - 1, reStart: o3.length, open: St[l3].open, close: St[l3].close };
          this.debug(this.pattern, "	", e4), a3.push(e4), o3 += e4.open, 0 === e4.start && "!" !== e4.type && (p3 = true, o3 += d3(t3.slice(r3 + 1))), this.debug("plType %j %j", l3, o3), l3 = false;
          continue;
        }
        case ")": {
          const t4 = a3[a3.length - 1];
          if (!t4) {
            o3 += "\\)";
            continue;
          }
          a3.pop(), g22(), i3 = true, u3 = t4, o3 += u3.close, "!" === u3.type && c3.push(Object.assign(u3, { reEnd: o3.length }));
          continue;
        }
        case "|": {
          const e4 = a3[a3.length - 1];
          if (!e4) {
            o3 += "\\|";
            continue;
          }
          g22(), o3 += "|", 0 === e4.start && "!" !== e4.type && (p3 = true, o3 += d3(t3.slice(r3 + 1)));
          continue;
        }
        case "[":
          g22();
          const [f4, m3, v3, y2] = ot(t3, r3);
          v3 ? (o3 += f4, h3 = h3 || m3, r3 += v3 - 1, i3 = i3 || y2) : o3 += "\\[";
          continue;
        case "]":
          o3 += "\\" + n3;
          continue;
        default:
          g22(), o3 += $t(n3);
      }
      for (u3 = a3.pop(); u3; u3 = a3.pop()) {
        let t4;
        t4 = o3.slice(u3.reStart + u3.open.length), this.debug(this.pattern, "setting tail", o3, u3), t4 = t4.replace(/((?:\\{2}){0,64})(\\?)\|/g, (t5, e5, n3) => (n3 || (n3 = "\\"), e5 + e5 + n3 + "|")), this.debug("tail=%j\n   %s", t4, t4, u3, o3);
        const e4 = "*" === u3.type ? kt : "?" === u3.type ? It : "\\" + u3.type;
        i3 = true, o3 = o3.slice(0, u3.reStart) + e4 + "\\(" + t4;
      }
      g22(), s3 && (o3 += "\\\\");
      const m2 = _t[o3.charAt(0)];
      for (let t4 = c3.length - 1; t4 > -1; t4--) {
        const e4 = c3[t4], n3 = o3.slice(0, e4.reStart), r3 = o3.slice(e4.reStart, e4.reEnd - 8);
        let i4 = o3.slice(e4.reEnd);
        const s4 = o3.slice(e4.reEnd - 8, e4.reEnd) + i4, a4 = n3.split(")").length, u4 = n3.split("(").length - a4;
        let l4 = i4;
        for (let t5 = 0; t5 < u4; t5++) l4 = l4.replace(/\)[+*?]?/, "");
        i4 = l4, o3 = n3 + r3 + i4 + ("" === i4 ? "(?:$|\\/)" : "") + s4;
      }
      if ("" !== o3 && i3 && (o3 = "(?=.)" + o3), m2 && (o3 = (p3 ? "" : f3 ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)") + o3), !e3.nocase || i3 || e3.nocaseMagicOnly || (i3 = t3.toUpperCase() !== t3.toLowerCase()), !i3) return o3.replace(/\\(.)/g, "$1");
      const v2 = (e3.nocase ? "i" : "") + (h3 ? "u" : "");
      try {
        const e4 = r2 ? { _glob: t3, _src: o3, test: r2 } : { _glob: t3, _src: o3 };
        return Object.assign(new RegExp("^" + o3 + "$", v2), e4);
      } catch (t4) {
        return this.debug("invalid regexp", t4), new RegExp("$.");
      }
    }
    makeRe() {
      if (this.regexp || false === this.regexp) return this.regexp;
      const t3 = this.set;
      if (!t3.length) return this.regexp = false, this.regexp;
      const e3 = this.options, n2 = e3.noglobstar ? kt : e3.dot ? "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?" : "(?:(?!(?:\\/|^)\\.).)*?", r2 = e3.nocase ? "i" : "";
      let o3 = t3.map((t4) => {
        const e4 = t4.map((t5) => "string" == typeof t5 ? $t(t5) : t5 === Ct ? Ct : t5._src);
        return e4.forEach((t5, r3) => {
          const o4 = e4[r3 + 1], i3 = e4[r3 - 1];
          t5 === Ct && i3 !== Ct && (void 0 === i3 ? void 0 !== o4 && o4 !== Ct ? e4[r3 + 1] = "(?:\\/|" + n2 + "\\/)?" + o4 : e4[r3] = n2 : void 0 === o4 ? e4[r3 - 1] = i3 + "(?:\\/|" + n2 + ")?" : o4 !== Ct && (e4[r3 - 1] = i3 + "(?:\\/|\\/" + n2 + "\\/)" + o4, e4[r3 + 1] = Ct));
        }), e4.filter((t5) => t5 !== Ct).join("/");
      }).join("|");
      o3 = "^(?:" + o3 + ")$", this.negate && (o3 = "^(?!" + o3 + ").*$");
      try {
        this.regexp = new RegExp(o3, r2);
      } catch (t4) {
        this.regexp = false;
      }
      return this.regexp;
    }
    slashSplit(t3) {
      return this.preserveMultipleSlashes ? t3.split("/") : this.isWindows && /^\/\/[^\/]+/.test(t3) ? ["", ...t3.split(/\/+/)] : t3.split(/\/+/);
    }
    match(t3) {
      let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.partial;
      if (this.debug("match", t3, this.pattern), this.comment) return false;
      if (this.empty) return "" === t3;
      if ("/" === t3 && e3) return true;
      const n2 = this.options;
      this.isWindows && (t3 = t3.split("\\").join("/"));
      const r2 = this.slashSplit(t3);
      this.debug(this.pattern, "split", r2);
      const o3 = this.set;
      this.debug(this.pattern, "set", o3);
      let i3 = r2[r2.length - 1];
      if (!i3) for (let t4 = r2.length - 2; !i3 && t4 >= 0; t4--) i3 = r2[t4];
      for (let t4 = 0; t4 < o3.length; t4++) {
        const s3 = o3[t4];
        let a3 = r2;
        if (n2.matchBase && 1 === s3.length && (a3 = [i3]), this.matchOne(a3, s3, e3)) return !!n2.flipNegate || !this.negate;
      }
      return !n2.flipNegate && this.negate;
    }
    static defaults(t3) {
      return st.defaults(t3).Minimatch;
    }
  }
  function Wt(t3) {
    const e3 = new Error("".concat(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", "Invalid response: ").concat(t3.status, " ").concat(t3.statusText));
    return e3.status = t3.status, e3.response = t3, e3;
  }
  function Vt(t3, e3) {
    const { status: n2 } = e3;
    if (401 === n2 && t3.digest) return e3;
    if (n2 >= 400) throw Wt(e3);
    return e3;
  }
  function zt(t3, e3) {
    return arguments.length > 2 && void 0 !== arguments[2] && arguments[2] ? { data: e3, headers: t3.headers ? B(t3.headers) : {}, status: t3.status, statusText: t3.statusText } : e3;
  }
  st.Minimatch = Bt, st.escape = function(t3) {
    let { windowsPathsNoEscape: e3 = false } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return e3 ? t3.replace(/[?*()[\]]/g, "[$&]") : t3.replace(/[?*()[\]\\]/g, "\\$&");
  }, st.unescape = function(t3) {
    let { windowsPathsNoEscape: e3 = false } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return e3 ? t3.replace(/\[([^\/\\])\]/g, "$1") : t3.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
  };
  const qt = (Gt = function(t3, e3, n2) {
    let r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const o3 = J({ url: g2(t3.remoteURL, h2(e3)), method: "COPY", headers: { Destination: g2(t3.remoteURL, h2(n2)), Overwrite: false === r2.overwrite ? "F" : "T", Depth: r2.shallow ? "0" : "infinity" } }, t3, r2);
    return s3 = function(e4) {
      Vt(t3, e4);
    }, (i3 = K(o3, t3)) && i3.then || (i3 = Promise.resolve(i3)), s3 ? i3.then(s3) : i3;
    var i3, s3;
  }, function() {
    for (var t3 = [], e3 = 0; e3 < arguments.length; e3++) t3[e3] = arguments[e3];
    try {
      return Promise.resolve(Gt.apply(this, t3));
    } catch (t4) {
      return Promise.reject(t4);
    }
  });
  var Gt, Ht = n(635), Xt = n(829), Zt = n.n(Xt), Yt = function(t3) {
    return t3.Array = "array", t3.Object = "object", t3.Original = "original", t3;
  }(Yt || {});
  function Kt(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Yt.Original;
    const r2 = Zt().get(t3, e3);
    return "array" === n2 && false === Array.isArray(r2) ? [r2] : "object" === n2 && Array.isArray(r2) ? r2[0] : r2;
  }
  function Jt(t3) {
    return new Promise((e3) => {
      e3(function(t4) {
        const { multistatus: e4 } = t4;
        if ("" === e4) return { multistatus: { response: [] } };
        if (!e4) throw new Error("Invalid response: No root multistatus found");
        const n2 = { multistatus: Array.isArray(e4) ? e4[0] : e4 };
        return Zt().set(n2, "multistatus.response", Kt(n2, "multistatus.response", Yt.Array)), Zt().set(n2, "multistatus.response", Zt().get(n2, "multistatus.response").map((t5) => function(t6) {
          const e5 = Object.assign({}, t6);
          return e5.status ? Zt().set(e5, "status", Kt(e5, "status", Yt.Object)) : (Zt().set(e5, "propstat", Kt(e5, "propstat", Yt.Object)), Zt().set(e5, "propstat.prop", Kt(e5, "propstat.prop", Yt.Object))), e5;
        }(t5))), n2;
      }(new Ht.XMLParser({ removeNSPrefix: true, numberParseOptions: { hex: true, leadingZeros: false } }).parse(t3)));
    });
  }
  function Qt(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    const { getlastmodified: r2 = null, getcontentlength: o3 = "0", resourcetype: i3 = null, getcontenttype: s3 = null, getetag: a3 = null } = t3, u3 = i3 && "object" == typeof i3 && void 0 !== i3.collection ? "directory" : "file", l3 = { filename: e3, basename: c2().basename(e3), lastmod: r2, size: parseInt(o3, 10), type: u3, etag: "string" == typeof a3 ? a3.replace(/"/g, "") : null };
    return "file" === u3 && (l3.mime = s3 && "string" == typeof s3 ? s3.split(";")[0] : ""), n2 && (l3.props = t3), l3;
  }
  function te(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r2 = null;
    try {
      t3.multistatus.response[0].propstat && (r2 = t3.multistatus.response[0]);
    } catch (t4) {
    }
    if (!r2) throw new Error("Failed getting item stat: bad response");
    const { propstat: { prop: o3, status: i3 } } = r2, [s3, a3, c3] = i3.split(" ", 3), u3 = parseInt(a3, 10);
    if (u3 >= 400) {
      const t4 = new Error("Invalid response: ".concat(u3, " ").concat(c3));
      throw t4.status = u3, t4;
    }
    return Qt(o3, f2(e3), n2);
  }
  function ee(t3) {
    switch (t3.toString()) {
      case "-3":
        return "unlimited";
      case "-2":
      case "-1":
        return "unknown";
      default:
        return parseInt(t3, 10);
    }
  }
  function ne(t3, e3, n2) {
    return t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3;
  }
  const re2 = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const { details: r2 = false } = n2, o3 = J({ url: g2(t3.remoteURL, h2(e3)), method: "PROPFIND", headers: { Accept: "text/plain,application/xml", Depth: "0" } }, t3, n2);
    return ne(K(o3, t3), function(n3) {
      return Vt(t3, n3), ne(n3.text(), function(t4) {
        return ne(Jt(t4), function(t5) {
          const o4 = te(t5, e3, r2);
          return zt(n3, o4, r2);
        });
      });
    });
  });
  function oe(t3, e3, n2) {
    return t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3;
  }
  const ie = se(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = function(t4) {
      if (!t4 || "/" === t4) return [];
      let e4 = t4;
      const n3 = [];
      do {
        n3.push(e4), e4 = c2().dirname(e4);
      } while (e4 && "/" !== e4);
      return n3;
    }(f2(e3));
    r2.sort((t4, e4) => t4.length > e4.length ? 1 : e4.length > t4.length ? -1 : 0);
    let o3 = false;
    return function(t4, e4, n3) {
      if ("function" == typeof t4[ue]) {
        let l3 = function(t5) {
          try {
            for (; !(r3 = s3.next()).done; ) if ((t5 = e4(r3.value)) && t5.then) {
              if (!pe(t5)) return void t5.then(l3, i3 || (i3 = le.bind(null, o4 = new he(), 2)));
              t5 = t5.v;
            }
            o4 ? le(o4, 1, t5) : o4 = t5;
          } catch (t6) {
            le(o4 || (o4 = new he()), 2, t6);
          }
        };
        var r3, o4, i3, s3 = t4[ue]();
        if (l3(), s3.return) {
          var a3 = function(t5) {
            try {
              r3.done || s3.return();
            } catch (t6) {
            }
            return t5;
          };
          if (o4 && o4.then) return o4.then(a3, function(t5) {
            throw a3(t5);
          });
          a3();
        }
        return o4;
      }
      if (!("length" in t4)) throw new TypeError("Object is not iterable");
      for (var c3 = [], u3 = 0; u3 < t4.length; u3++) c3.push(t4[u3]);
      return function(t5, e5, n4) {
        var r4, o5, i4 = -1;
        return function s4(a4) {
          try {
            for (; ++i4 < t5.length && (!n4 || !n4()); ) if ((a4 = e5(i4)) && a4.then) {
              if (!pe(a4)) return void a4.then(s4, o5 || (o5 = le.bind(null, r4 = new he(), 2)));
              a4 = a4.v;
            }
            r4 ? le(r4, 1, a4) : r4 = a4;
          } catch (t6) {
            le(r4 || (r4 = new he()), 2, t6);
          }
        }(), r4;
      }(c3, function(t5) {
        return e4(c3[t5]);
      }, n3);
    }(r2, function(r3) {
      return i3 = function() {
        return function(n3, o4) {
          try {
            var i4 = oe(re2(t3, r3), function(t4) {
              if ("directory" !== t4.type) throw new Error("Path includes a file: ".concat(e3));
            });
          } catch (t4) {
            return o4(t4);
          }
          return i4 && i4.then ? i4.then(void 0, o4) : i4;
        }(0, function(e4) {
          const i4 = e4;
          return function() {
            if (404 === i4.status) return o3 = true, ce(fe(t3, r3, { ...n2, recursive: false }));
            throw e4;
          }();
        });
      }, (s3 = function() {
        if (o3) return ce(fe(t3, r3, { ...n2, recursive: false }));
      }()) && s3.then ? s3.then(i3) : i3();
      var i3, s3;
    }, function() {
      return false;
    });
  });
  function se(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }
  function ae() {
  }
  function ce(t3, e3) {
    return t3 && t3.then ? t3.then(ae) : Promise.resolve();
  }
  const ue = "undefined" != typeof Symbol ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
  function le(t3, e3, n2) {
    if (!t3.s) {
      if (n2 instanceof he) {
        if (!n2.s) return void (n2.o = le.bind(null, t3, e3));
        1 & e3 && (e3 = n2.s), n2 = n2.v;
      }
      if (n2 && n2.then) return void n2.then(le.bind(null, t3, e3), le.bind(null, t3, 2));
      t3.s = e3, t3.v = n2;
      const r2 = t3.o;
      r2 && r2(t3);
    }
  }
  const he = function() {
    function t3() {
    }
    return t3.prototype.then = function(e3, n2) {
      const r2 = new t3(), o3 = this.s;
      if (o3) {
        const t4 = 1 & o3 ? e3 : n2;
        if (t4) {
          try {
            le(r2, 1, t4(this.v));
          } catch (t5) {
            le(r2, 2, t5);
          }
          return r2;
        }
        return this;
      }
      return this.o = function(t4) {
        try {
          const o4 = t4.v;
          1 & t4.s ? le(r2, 1, e3 ? e3(o4) : o4) : n2 ? le(r2, 1, n2(o4)) : le(r2, 2, o4);
        } catch (t5) {
          le(r2, 2, t5);
        }
      }, r2;
    }, t3;
  }();
  function pe(t3) {
    return t3 instanceof he && 1 & t3.s;
  }
  const fe = se(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    if (true === n2.recursive) return ie(t3, e3, n2);
    const r2 = J({ url: g2(t3.remoteURL, (o3 = h2(e3), o3.endsWith("/") ? o3 : o3 + "/")), method: "MKCOL" }, t3, n2);
    var o3;
    return oe(K(r2, t3), function(e4) {
      Vt(t3, e4);
    });
  });
  var de = n(388), ge = n.n(de);
  const me = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = {};
    if ("object" == typeof n2.range && "number" == typeof n2.range.start) {
      let t4 = "bytes=".concat(n2.range.start, "-");
      "number" == typeof n2.range.end && (t4 = "".concat(t4).concat(n2.range.end)), r2.Range = t4;
    }
    const o3 = J({ url: g2(t3.remoteURL, h2(e3)), method: "GET", headers: r2 }, t3, n2);
    return s3 = function(e4) {
      if (Vt(t3, e4), r2.Range && 206 !== e4.status) {
        const t4 = new Error("Invalid response code for partial request: ".concat(e4.status));
        throw t4.status = e4.status, t4;
      }
      return n2.callback && setTimeout(() => {
        n2.callback(e4);
      }, 0), e4.body;
    }, (i3 = K(o3, t3)) && i3.then || (i3 = Promise.resolve(i3)), s3 ? i3.then(s3) : i3;
    var i3, s3;
  }), ve = () => {
  }, ye = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3, n2) {
    n2.url || (n2.url = g2(t3.remoteURL, h2(e3)));
    const r2 = J(n2, t3, {});
    return i3 = function(e4) {
      return Vt(t3, e4), e4;
    }, (o3 = K(r2, t3)) && o3.then || (o3 = Promise.resolve(o3)), i3 ? o3.then(i3) : o3;
    var o3, i3;
  }), be = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = J({ url: g2(t3.remoteURL, h2(e3)), method: "DELETE" }, t3, n2);
    return i3 = function(e4) {
      Vt(t3, e4);
    }, (o3 = K(r2, t3)) && o3.then || (o3 = Promise.resolve(o3)), i3 ? o3.then(i3) : o3;
    var o3, i3;
  }), we = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    return function(r2, o3) {
      try {
        var i3 = (s3 = re2(t3, e3, n2), a3 = function() {
          return true;
        }, c3 ? a3 ? a3(s3) : s3 : (s3 && s3.then || (s3 = Promise.resolve(s3)), a3 ? s3.then(a3) : s3));
      } catch (t4) {
        return o3(t4);
      }
      var s3, a3, c3;
      return i3 && i3.then ? i3.then(void 0, o3) : i3;
    }(0, function(t4) {
      if (404 === t4.status) return false;
      throw t4;
    });
  });
  function xe(t3, e3, n2) {
    return t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3;
  }
  const Ne = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = J({ url: g2(t3.remoteURL, h2(e3), "/"), method: "PROPFIND", headers: { Accept: "text/plain,application/xml", Depth: n2.deep ? "infinity" : "1" } }, t3, n2);
    return xe(K(r2, t3), function(r3) {
      return Vt(t3, r3), xe(r3.text(), function(o3) {
        if (!o3) throw new Error("Failed parsing directory contents: Empty response");
        return xe(Jt(o3), function(o4) {
          const i3 = p2(e3);
          let a3 = function(t4, e4, n3) {
            let r4 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], o5 = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            const i4 = c2().join(e4, "/"), { multistatus: { response: a4 } } = t4, u3 = a4.map((t5) => {
              const e5 = function(t6) {
                try {
                  return t6.replace(/^https?:\/\/[^\/]+/, "");
                } catch (t7) {
                  throw new s2(t7, "Failed normalising HREF");
                }
              }(t5.href), { propstat: { prop: n4 } } = t5;
              return Qt(n4, "/" === i4 ? decodeURIComponent(f2(e5)) : f2(c2().relative(decodeURIComponent(i4), decodeURIComponent(e5))), r4);
            });
            return o5 ? u3 : u3.filter((t5) => t5.basename && ("file" === t5.type || t5.filename !== n3.replace(/\/$/, "")));
          }(o4, p2(t3.remoteBasePath || t3.remotePath), i3, n2.details, n2.includeSelf);
          return n2.glob && (a3 = function(t4, e4) {
            return t4.filter((t5) => at(t5.filename, e4, { matchBase: true }));
          }(a3, n2.glob)), zt(r3, a3, n2.details);
        });
      });
    });
  });
  function Pe(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }
  const Ae = Pe(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = J({ url: g2(t3.remoteURL, h2(e3)), method: "GET", headers: { Accept: "text/plain" }, transformResponse: [je] }, t3, n2);
    return Oe(K(r2, t3), function(e4) {
      return Vt(t3, e4), Oe(e4.text(), function(t4) {
        return zt(e4, t4, n2.details);
      });
    });
  });
  function Oe(t3, e3, n2) {
    return t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3;
  }
  const Ee = Pe(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = J({ url: g2(t3.remoteURL, h2(e3)), method: "GET" }, t3, n2);
    return Oe(K(r2, t3), function(e4) {
      let r3;
      return Vt(t3, e4), function(t4, e5) {
        var n3 = t4();
        return n3 && n3.then ? n3.then(e5) : e5();
      }(function() {
        return Oe(e4.arrayBuffer(), function(t4) {
          r3 = t4;
        });
      }, function() {
        return zt(e4, r3, n2.details);
      });
    });
  }), Te = Pe(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const { format: r2 = "binary" } = n2;
    if ("binary" !== r2 && "text" !== r2) throw new s2({ info: { code: S.InvalidOutputFormat } }, "Invalid output format: ".concat(r2));
    return "text" === r2 ? Ae(t3, e3, n2) : Ee(t3, e3, n2);
  }), je = (t3) => t3;
  function Ce(t3) {
    return new Ht.XMLBuilder({ attributeNamePrefix: "@_", format: true, ignoreAttributes: false, suppressEmptyNode: true }).build(Se({ lockinfo: { "@_xmlns:d": "DAV:", lockscope: { exclusive: {} }, locktype: { write: {} }, owner: { href: t3 } } }, "d"));
  }
  function Se(t3, e3) {
    const n2 = { ...t3 };
    for (const t4 in n2) n2.hasOwnProperty(t4) && (n2[t4] && "object" == typeof n2[t4] && -1 === t4.indexOf(":") ? (n2["".concat(e3, ":").concat(t4)] = Se(n2[t4], e3), delete n2[t4]) : false === /^@_/.test(t4) && (n2["".concat(e3, ":").concat(t4)] = n2[t4], delete n2[t4]));
    return n2;
  }
  function Ie(t3, e3, n2) {
    return t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3;
  }
  function ke(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }
  const Re = ke(function(t3, e3, n2) {
    let r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const o3 = J({ url: g2(t3.remoteURL, h2(e3)), method: "UNLOCK", headers: { "Lock-Token": n2 } }, t3, r2);
    return Ie(K(o3, t3), function(e4) {
      if (Vt(t3, e4), 204 !== e4.status && 200 !== e4.status) throw Wt(e4);
    });
  }), Le = ke(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const { refreshToken: r2, timeout: o3 = _e } = n2, i3 = { Accept: "text/plain,application/xml", Timeout: o3 };
    r2 && (i3.If = r2);
    const s3 = J({ url: g2(t3.remoteURL, h2(e3)), method: "LOCK", headers: i3, data: Ce(t3.contactHref) }, t3, n2);
    return Ie(K(s3, t3), function(e4) {
      return Vt(t3, e4), Ie(e4.text(), function(t4) {
        const n3 = (i4 = t4, new Ht.XMLParser({ removeNSPrefix: true, parseAttributeValue: true, parseTagValue: true }).parse(i4)), r3 = Zt().get(n3, "prop.lockdiscovery.activelock.locktoken.href"), o4 = Zt().get(n3, "prop.lockdiscovery.activelock.timeout");
        var i4;
        if (!r3) throw Wt(e4, "No lock token received: ");
        return { token: r3, serverTimeout: o4 };
      });
    });
  }), _e = "Infinite, Second-4100000000";
  function Ue(t3, e3, n2) {
    return t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3;
  }
  const Me = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3) {
    let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const n2 = e3.path || "/", r2 = J({ url: g2(t3.remoteURL, n2), method: "PROPFIND", headers: { Accept: "text/plain,application/xml", Depth: "0" } }, t3, e3);
    return Ue(K(r2, t3), function(n3) {
      return Vt(t3, n3), Ue(n3.text(), function(t4) {
        return Ue(Jt(t4), function(t5) {
          const r3 = function(t6) {
            try {
              const [e4] = t6.multistatus.response, { propstat: { prop: { "quota-used-bytes": n4, "quota-available-bytes": r4 } } } = e4;
              return void 0 !== n4 && void 0 !== r4 ? { used: parseInt(n4, 10), available: ee(r4) } : null;
            } catch (t7) {
            }
            return null;
          }(t5);
          return zt(n3, r3, e3.details);
        });
      });
    });
  });
  function Fe(t3, e3, n2) {
    return t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3;
  }
  const De = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const { details: r2 = false } = n2, o3 = J({ url: g2(t3.remoteURL, h2(e3)), method: "SEARCH", headers: { Accept: "text/plain,application/xml", "Content-Type": t3.headers["Content-Type"] || "application/xml; charset=utf-8" } }, t3, n2);
    return Fe(K(o3, t3), function(n3) {
      return Vt(t3, n3), Fe(n3.text(), function(t4) {
        return Fe(Jt(t4), function(t5) {
          const o4 = function(t6, e4, n4) {
            const r3 = { truncated: false, results: [] };
            return r3.truncated = t6.multistatus.response.some((t7) => {
              var n5, r4;
              return "507" === (null === (n5 = (t7.status || (null === (r4 = t7.propstat) || void 0 === r4 ? void 0 : r4.status)).split(" ", 3)) || void 0 === n5 ? void 0 : n5[1]) && t7.href.replace(/\/$/, "").endsWith(h2(e4).replace(/\/$/, ""));
            }), t6.multistatus.response.forEach((t7) => {
              if (void 0 === t7.propstat) return;
              const e5 = t7.href.split("/").map(decodeURIComponent).join("/");
              r3.results.push(Qt(t7.propstat.prop, e5, n4));
            }), r3;
          }(t5, e3, r2);
          return zt(n3, o4, r2);
        });
      });
    });
  }), $e = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3, n2) {
    let r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const o3 = J({ url: g2(t3.remoteURL, h2(e3)), method: "MOVE", headers: { Destination: g2(t3.remoteURL, h2(n2)), Overwrite: false === r2.overwrite ? "F" : "T" } }, t3, r2);
    return s3 = function(e4) {
      Vt(t3, e4);
    }, (i3 = K(o3, t3)) && i3.then || (i3 = Promise.resolve(i3)), s3 ? i3.then(s3) : i3;
    var i3, s3;
  });
  var Be = n(172);
  const We = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3, n2) {
    let r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const { contentLength: o3 = true, overwrite: i3 = true } = r2, a3 = { "Content-Type": "application/octet-stream" };
    false === o3 || (a3["Content-Length"] = "".concat("number" == typeof o3 ? o3 : function(t4) {
      if (q(t4)) return t4.byteLength;
      if (G(t4)) return t4.length;
      if ("string" == typeof t4) return (0, Be.d)(t4);
      throw new s2({ info: { code: S.DataTypeNoLength } }, "Cannot calculate data length: Invalid type");
    }(n2))), i3 || (a3["If-None-Match"] = "*");
    const c3 = J({ url: g2(t3.remoteURL, h2(e3)), method: "PUT", headers: a3, data: n2 }, t3, r2);
    return l3 = function(e4) {
      try {
        Vt(t3, e4);
      } catch (t4) {
        const e5 = t4;
        if (412 !== e5.status || i3) throw e5;
        return false;
      }
      return true;
    }, (u3 = K(c3, t3)) && u3.then || (u3 = Promise.resolve(u3)), l3 ? u3.then(l3) : u3;
    var u3, l3;
  }), Ve = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = J({ url: g2(t3.remoteURL, h2(e3)), method: "OPTIONS" }, t3, n2);
    return i3 = function(e4) {
      var n3, r3;
      try {
        Vt(t3, e4);
      } catch (t4) {
        throw t4;
      }
      return { compliance: (null !== (n3 = e4.headers.get("DAV")) && void 0 !== n3 ? n3 : "").split(",").map((t4) => t4.trim()), server: null !== (r3 = e4.headers.get("Server")) && void 0 !== r3 ? r3 : "" };
    }, (o3 = K(r2, t3)) && o3.then || (o3 = Promise.resolve(o3)), i3 ? o3.then(i3) : o3;
    var o3, i3;
  });
  function ze(t3, e3, n2) {
    return t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3;
  }
  const qe = Xe(function(t3, e3, n2, r2, o3) {
    let i3 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
    if (n2 > r2 || n2 < 0) throw new s2({ info: { code: S.InvalidUpdateRange } }, "Invalid update range ".concat(n2, " for partial update"));
    const a3 = { "Content-Type": "application/octet-stream", "Content-Length": "".concat(r2 - n2 + 1), "Content-Range": "bytes ".concat(n2, "-").concat(r2, "/*") }, c3 = J({ url: g2(t3.remoteURL, h2(e3)), method: "PUT", headers: a3, data: o3 }, t3, i3);
    return ze(K(c3, t3), function(e4) {
      Vt(t3, e4);
    });
  });
  function Ge(t3, e3) {
    var n2 = t3();
    return n2 && n2.then ? n2.then(e3) : e3(n2);
  }
  const He = Xe(function(t3, e3, n2, r2, o3) {
    let i3 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
    if (n2 > r2 || n2 < 0) throw new s2({ info: { code: S.InvalidUpdateRange } }, "Invalid update range ".concat(n2, " for partial update"));
    const a3 = { "Content-Type": "application/x-sabredav-partialupdate", "Content-Length": "".concat(r2 - n2 + 1), "X-Update-Range": "bytes=".concat(n2, "-").concat(r2) }, c3 = J({ url: g2(t3.remoteURL, h2(e3)), method: "PATCH", headers: a3, data: o3 }, t3, i3);
    return ze(K(c3, t3), function(e4) {
      Vt(t3, e4);
    });
  });
  function Xe(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++) e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }
  const Ze = Xe(function(t3, e3, n2, r2, o3) {
    let i3 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
    return ze(Ve(t3, e3, i3), function(a3) {
      let c3 = false;
      return Ge(function() {
        if (a3.compliance.includes("sabredav-partialupdate")) return ze(He(t3, e3, n2, r2, o3, i3), function(t4) {
          return c3 = true, t4;
        });
      }, function(u3) {
        let l3 = false;
        return c3 ? u3 : Ge(function() {
          if (a3.server.includes("Apache") && a3.compliance.includes("<http://apache.org/dav/propset/fs/1>")) return ze(qe(t3, e3, n2, r2, o3, i3), function(t4) {
            return l3 = true, t4;
          });
        }, function(t4) {
          if (l3) return t4;
          throw new s2({ info: { code: S.NotSupported } }, "Not supported");
        });
      });
    });
  }), Ye = "https://github.com/perry-mitchell/webdav-client/blob/master/LOCK_CONTACT.md";
  function Ke(t3) {
    let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const { authType: n2 = null, remoteBasePath: r2, contactHref: o3 = Ye, ha1: i3, headers: a3 = {}, httpAgent: c3, httpsAgent: u3, password: l3, token: p3, username: f3, withCredentials: m2 } = e3;
    let v2 = n2;
    v2 || (v2 = f3 || l3 ? C.Password : C.None);
    const y2 = { authType: v2, remoteBasePath: r2, contactHref: o3, ha1: i3, headers: Object.assign({}, a3), httpAgent: c3, httpsAgent: u3, password: l3, remotePath: d2(t3), remoteURL: t3, token: p3, username: f3, withCredentials: m2 };
    return I(y2, f3, l3, p3, i3), { copyFile: (t4, e4, n3) => qt(y2, t4, e4, n3), createDirectory: (t4, e4) => fe(y2, t4, e4), createReadStream: (t4, e4) => function(t5, e5) {
      let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      const r3 = new (ge()).PassThrough();
      return me(t5, e5, n3).then((t6) => {
        t6.pipe(r3);
      }).catch((t6) => {
        r3.emit("error", t6);
      }), r3;
    }(y2, t4, e4), createWriteStream: (t4, e4, n3) => function(t5, e5) {
      let n4 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ve;
      const o4 = new (ge()).PassThrough(), i4 = {};
      false === n4.overwrite && (i4["If-None-Match"] = "*");
      const s3 = J({ url: g2(t5.remoteURL, h2(e5)), method: "PUT", headers: i4, data: o4, maxRedirects: 0 }, t5, n4);
      return K(s3, t5).then((e6) => Vt(t5, e6)).then((t6) => {
        setTimeout(() => {
          r3(t6);
        }, 0);
      }).catch((t6) => {
        o4.emit("error", t6);
      }), o4;
    }(y2, t4, e4, n3), customRequest: (t4, e4) => ye(y2, t4, e4), deleteFile: (t4, e4) => be(y2, t4, e4), exists: (t4, e4) => we(y2, t4, e4), getDirectoryContents: (t4, e4) => Ne(y2, t4, e4), getFileContents: (t4, e4) => Te(y2, t4, e4), getFileDownloadLink: (t4) => function(t5, e4) {
      let n3 = g2(t5.remoteURL, h2(e4));
      const r3 = /^https:/i.test(n3) ? "https" : "http";
      switch (t5.authType) {
        case C.None:
          break;
        case C.Password: {
          const e5 = P(t5.headers.Authorization.replace(/^Basic /i, "").trim());
          n3 = n3.replace(/^https?:\/\//, "".concat(r3, "://").concat(e5, "@"));
          break;
        }
        default:
          throw new s2({ info: { code: S.LinkUnsupportedAuthType } }, "Unsupported auth type for file link: ".concat(t5.authType));
      }
      return n3;
    }(y2, t4), getFileUploadLink: (t4) => function(t5, e4) {
      let n3 = "".concat(g2(t5.remoteURL, h2(e4)), "?Content-Type=application/octet-stream");
      const r3 = /^https:/i.test(n3) ? "https" : "http";
      switch (t5.authType) {
        case C.None:
          break;
        case C.Password: {
          const e5 = P(t5.headers.Authorization.replace(/^Basic /i, "").trim());
          n3 = n3.replace(/^https?:\/\//, "".concat(r3, "://").concat(e5, "@"));
          break;
        }
        default:
          throw new s2({ info: { code: S.LinkUnsupportedAuthType } }, "Unsupported auth type for file link: ".concat(t5.authType));
      }
      return n3;
    }(y2, t4), getHeaders: () => Object.assign({}, y2.headers), getQuota: (t4) => Me(y2, t4), lock: (t4, e4) => Le(y2, t4, e4), moveFile: (t4, e4, n3) => $e(y2, t4, e4, n3), putFileContents: (t4, e4, n3) => We(y2, t4, e4, n3), partialUpdateFileContents: (t4, e4, n3, r3, o4) => Ze(y2, t4, e4, n3, r3, o4), getDAVCompliance: (t4) => Ve(y2, t4), search: (t4, e4) => De(y2, t4, e4), setHeaders: (t4) => {
      y2.headers = Object.assign({}, t4);
    }, stat: (t4, e4) => re2(y2, t4, e4), unlock: (t4, e4, n3) => Re(y2, t4, e4, n3) };
  }
})();
r.hT;
r.O4;
r.Kd;
r.YK;
r.UU;
r.Gu;
r.ky;
r.h4;
r.ch;
r.hq;
r.i5;
function loadState(app, key, fallback) {
  const elem = document.querySelector(`#initial-state-${app}-${key}`);
  if (elem === null) {
    {
      return fallback;
    }
  }
  try {
    return JSON.parse(atob(elem.value));
  } catch (e2) {
    throw new Error(`Could not parse initial state ${key} of ${app}`);
  }
}
function isPublicShare() {
  return loadState("files_sharing", "isPublic", null) ?? document.querySelector(
    'input#isPublic[type="hidden"][name="isPublic"][value="1"]'
  ) !== null;
}
function getSharingToken() {
  return loadState("files_sharing", "sharingToken", null) ?? document.querySelector('input#sharingToken[type="hidden"]')?.value ?? null;
}
/*! @license DOMPurify 3.1.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.6/LICENSE */
const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf: getPrototypeOf$1,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor$2
} = Object;
let {
  freeze,
  seal,
  create: create$1
} = Object;
let {
  apply: apply$2,
  construct
} = typeof Reflect !== "undefined" && Reflect;
if (!freeze) {
  freeze = function freeze2(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal2(x) {
    return x;
  };
}
if (!apply$2) {
  apply$2 = function apply2(fun, thisValue, args) {
    return fun.apply(thisValue, args);
  };
}
if (!construct) {
  construct = function construct2(Func, args) {
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf$1 = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function(thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return apply$2(func, thisArg, args);
  };
}
function unconstruct(func) {
  return function() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return construct(func, args);
  };
}
function addToSet(set2, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    setPrototypeOf(set2, null);
  }
  let l2 = array.length;
  while (l2--) {
    let element = array[l2];
    if (typeof element === "string") {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        if (!isFrozen(array)) {
          array[l2] = lcElement;
        }
        element = lcElement;
      }
    }
    set2[element] = true;
  }
  return set2;
}
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}
function clone(object) {
  const newObject = create$1(null);
  for (const [property, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (Array.isArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === "object" && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor$2(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === "function") {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf$1(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}
const html$1$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
const svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
const svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
const svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
const mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
const mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
const text = freeze(["#text"]);
const html$2 = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
const svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
const mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
const xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/);
const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
const IS_ALLOWED_URI = seal(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MUSTACHE_EXPR,
  ERB_EXPR,
  TMPLIT_EXPR,
  DATA_ATTR,
  ARIA_ATTR,
  IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA,
  ATTR_WHITESPACE,
  DOCTYPE_NAME,
  CUSTOM_ELEMENT
});
const NODE_TYPE = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
  // Deprecated
};
const getGlobal = function getGlobal2() {
  return typeof window === "undefined" ? null : window;
};
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
    return null;
  }
  let suffix = null;
  const ATTR_NAME = "data-tt-policy-suffix";
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = "dompurify" + (suffix ? "#" + suffix : "");
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html2) {
        return html2;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_2) {
    console.warn("TrustedTypes policy " + policyName + " could not be created.");
    return null;
  }
};
function createDOMPurify() {
  let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
  const DOMPurify = (root) => createDOMPurify(root);
  DOMPurify.version = "3.1.6";
  DOMPurify.removed = [];
  if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document) {
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document: document2
  } = window2;
  const originalDocument = document2;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node: Node2,
    Element,
    NodeFilter,
    NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window2;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
  const remove = lookupGetter(ElementPrototype, "remove");
  const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
  const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
  const getParentNode = lookupGetter(ElementPrototype, "parentNode");
  if (typeof HTMLTemplateElement === "function") {
    const template = document2.createElement("template");
    if (template.content && template.content.ownerDocument) {
      document2 = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = "";
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document2;
  const {
    importNode
  } = originalDocument;
  let hooks = {};
  DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: MUSTACHE_EXPR2,
    ERB_EXPR: ERB_EXPR2,
    TMPLIT_EXPR: TMPLIT_EXPR2,
    DATA_ATTR: DATA_ATTR2,
    ARIA_ATTR: ARIA_ATTR2,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
    ATTR_WHITESPACE: ATTR_WHITESPACE2,
    CUSTOM_ELEMENT: CUSTOM_ELEMENT2
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html$2, ...svg, ...mathMl, ...xml]);
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create$1(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  let FORBID_TAGS = null;
  let FORBID_ATTR = null;
  let ALLOW_ARIA_ATTR = true;
  let ALLOW_DATA_ATTR = true;
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  let SAFE_FOR_TEMPLATES = false;
  let SAFE_FOR_XML = true;
  let WHOLE_DOCUMENT = false;
  let SET_CONFIG = false;
  let FORCE_BODY = false;
  let RETURN_DOM = false;
  let RETURN_DOM_FRAGMENT = false;
  let RETURN_TRUSTED_TYPE = false;
  let SANITIZE_DOM = true;
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
  let KEEP_CONTENT = true;
  let IN_PLACE = false;
  let USE_PROFILES = {};
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
  const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
  const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
  let transformCaseFunc = null;
  let CONFIG = null;
  const formElement = document2.createElement("form");
  const isRegexOrFunction = function isRegexOrFunction2(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  const _parseConfig = function _parseConfig2() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    if (!cfg || typeof cfg !== "object") {
      cfg = {};
    }
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
    ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(
      clone(DEFAULT_URI_SAFE_ATTRIBUTES),
      // eslint-disable-line indent
      cfg.ADD_URI_SAFE_ATTR,
      // eslint-disable-line indent
      transformCaseFunc
      // eslint-disable-line indent
    ) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(
      clone(DEFAULT_DATA_URI_TAGS),
      // eslint-disable-line indent
      cfg.ADD_DATA_URI_TAGS,
      // eslint-disable-line indent
      transformCaseFunc
      // eslint-disable-line indent
    ) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
    FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
    USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
    RETURN_DOM = cfg.RETURN_DOM || false;
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
    FORCE_BODY = cfg.FORCE_BODY || false;
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
    IN_PLACE = cfg.IN_PLACE || false;
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1$1);
        addToSet(ALLOWED_ATTR, html$2);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone(ALLOWED_TAGS);
      }
      addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
    }
    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone(ALLOWED_ATTR);
      }
      addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (KEEP_CONTENT) {
      ALLOWED_TAGS["#text"] = true;
    }
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
    }
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ["tbody"]);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      emptyHTML = trustedTypesPolicy.createHTML("");
    } else {
      if (trustedTypesPolicy === void 0) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
        emptyHTML = trustedTypesPolicy.createHTML("");
      }
    }
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  const MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
  const HTML_INTEGRATION_POINTS = addToSet({}, ["foreignobject", "annotation-xml"]);
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  const _checkValidNamespace = function _checkValidNamespace2(element) {
    let parent = getParentNode(element);
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: "template"
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "svg";
      }
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "math";
      }
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
      }
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    return false;
  };
  const _forceRemove = function _forceRemove2(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      getParentNode(node).removeChild(node);
    } catch (_2) {
      remove(node);
    }
  };
  const _removeAttribute = function _removeAttribute2(name, node) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: node.getAttributeNode(name),
        from: node
      });
    } catch (_2) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: node
      });
    }
    node.removeAttribute(name);
    if (name === "is" && !ALLOWED_ATTR[name]) {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(node);
        } catch (_2) {
        }
      } else {
        try {
          node.setAttribute(name, "");
        } catch (_2) {
        }
      }
    }
  };
  const _initDocument = function _initDocument2(dirty) {
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = "<remove></remove>" + dirty;
    } else {
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_2) {
      }
    }
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, "template", null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_2) {
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  const _createNodeIterator = function _createNodeIterator2(root) {
    return createNodeIterator.call(
      root.ownerDocument || root,
      root,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
      null
    );
  };
  const _isClobbered = function _isClobbered2(elm) {
    return elm instanceof HTMLFormElement && (typeof elm.nodeName !== "string" || typeof elm.textContent !== "string" || typeof elm.removeChild !== "function" || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== "function" || typeof elm.setAttribute !== "function" || typeof elm.namespaceURI !== "string" || typeof elm.insertBefore !== "function" || typeof elm.hasChildNodes !== "function");
  };
  const _isNode = function _isNode2(object) {
    return typeof Node2 === "function" && object instanceof Node2;
  };
  const _executeHook = function _executeHook2(entryPoint, currentNode, data2) {
    if (!hooks[entryPoint]) {
      return;
    }
    arrayForEach(hooks[entryPoint], (hook) => {
      hook.call(DOMPurify, currentNode, data2, CONFIG);
    });
  };
  const _sanitizeElements = function _sanitizeElements2(currentNode) {
    let content = null;
    _executeHook("beforeSanitizeElements", currentNode, null);
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    const tagName = transformCaseFunc(currentNode.nodeName);
    _executeHook("uponSanitizeElement", currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }
    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const childClone = cloneNode(childNodes[i], true);
            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        content = stringReplace(content, expr, " ");
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    _executeHook("afterSanitizeElements", currentNode, null);
    return false;
  };
  const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
      return false;
    }
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
    else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
    else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
      ) ;
      else {
        return false;
      }
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
    else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf$1(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
    else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if (value) {
      return false;
    } else ;
    return true;
  };
  const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
    return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
  };
  const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
    _executeHook("beforeSanitizeAttributes", currentNode, null);
    const {
      attributes
    } = currentNode;
    if (!attributes) {
      return;
    }
    const hookEvent = {
      attrName: "",
      attrValue: "",
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR
    };
    let l2 = attributes.length;
    while (l2--) {
      const attr = attributes[l2];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      let value = name === "value" ? attrValue : stringTrim(attrValue);
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = void 0;
      _executeHook("uponSanitizeAttribute", currentNode, hookEvent);
      value = hookEvent.attrValue;
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      _removeAttribute(name, currentNode);
      if (!hookEvent.keepAttr) {
        continue;
      }
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          value = stringReplace(value, expr, " ");
        });
      }
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        continue;
      }
      if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
        _removeAttribute(name, currentNode);
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
        if (namespaceURI) ;
        else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case "TrustedHTML": {
              value = trustedTypesPolicy.createHTML(value);
              break;
            }
            case "TrustedScriptURL": {
              value = trustedTypesPolicy.createScriptURL(value);
              break;
            }
          }
        }
      }
      try {
        if (namespaceURI) {
          currentNode.setAttributeNS(namespaceURI, name, value);
        } else {
          currentNode.setAttribute(name, value);
        }
        if (_isClobbered(currentNode)) {
          _forceRemove(currentNode);
        } else {
          arrayPop(DOMPurify.removed);
        }
      } catch (_2) {
      }
    }
    _executeHook("afterSanitizeAttributes", currentNode, null);
  };
  const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    _executeHook("beforeSanitizeShadowDOM", fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      _executeHook("uponSanitizeShadowNode", shadowNode, null);
      if (_sanitizeElements(shadowNode)) {
        continue;
      }
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
      _sanitizeAttributes(shadowNode);
    }
    _executeHook("afterSanitizeShadowDOM", fragment, null);
  };
  DOMPurify.sanitize = function(dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = "<!-->";
    }
    if (typeof dirty !== "string" && !_isNode(dirty)) {
      if (typeof dirty.toString === "function") {
        dirty = dirty.toString();
        if (typeof dirty !== "string") {
          throw typeErrorCreate("dirty is not a string, aborting");
        }
      } else {
        throw typeErrorCreate("toString is not a function");
      }
    }
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    DOMPurify.removed = [];
    if (typeof dirty === "string") {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
        }
      }
    } else if (dirty instanceof Node2) {
      body = _initDocument("<!---->");
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
        body = importedNode;
      } else if (importedNode.nodeName === "HTML") {
        body = importedNode;
      } else {
        body.appendChild(importedNode);
      }
    } else {
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf("<") === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      body = _initDocument(dirty);
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
      }
    }
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    while (currentNode = nodeIterator.nextNode()) {
      if (_sanitizeElements(currentNode)) {
        continue;
      }
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
      _sanitizeAttributes(currentNode);
    }
    if (IN_PLACE) {
      return dirty;
    }
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
    }
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        serializedHTML = stringReplace(serializedHTML, expr, " ");
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function() {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function(tag, attr, value) {
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function(entryPoint, hookFunction) {
    if (typeof hookFunction !== "function") {
      return;
    }
    hooks[entryPoint] = hooks[entryPoint] || [];
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function(entryPoint) {
    if (hooks[entryPoint]) {
      return arrayPop(hooks[entryPoint]);
    }
  };
  DOMPurify.removeHooks = function(entryPoint) {
    if (hooks[entryPoint]) {
      hooks[entryPoint] = [];
    }
  };
  DOMPurify.removeAllHooks = function() {
    hooks = {};
  };
  return DOMPurify;
}
var purify = createDOMPurify();
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */
var matchHtmlRegExp = /["'&<>]/;
var escapeHtml_1 = escapeHtml;
function escapeHtml(string) {
  var str = "" + string;
  var match2 = matchHtmlRegExp.exec(str);
  if (!match2) {
    return str;
  }
  var escape2;
  var html2 = "";
  var index = 0;
  var lastIndex = 0;
  for (index = match2.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escape2 = "&quot;";
        break;
      case 38:
        escape2 = "&amp;";
        break;
      case 39:
        escape2 = "&#39;";
        break;
      case 60:
        escape2 = "&lt;";
        break;
      case 62:
        escape2 = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) {
      html2 += str.substring(lastIndex, index);
    }
    lastIndex = index + 1;
    html2 += escape2;
  }
  return lastIndex !== index ? html2 + str.substring(lastIndex, index) : html2;
}
const escapeHTML = /* @__PURE__ */ getDefaultExportFromCjs(escapeHtml_1);
var define_process_env_default = {};
const logger = getLoggerBuilder().setApp("@nextcloud/files").detectUser().build();
var DefaultType = /* @__PURE__ */ ((DefaultType2) => {
  DefaultType2["DEFAULT"] = "default";
  DefaultType2["HIDDEN"] = "hidden";
  return DefaultType2;
})(DefaultType || {});
class FileAction {
  _action;
  constructor(action2) {
    this.validateAction(action2);
    this._action = action2;
  }
  get id() {
    return this._action.id;
  }
  get displayName() {
    return this._action.displayName;
  }
  get title() {
    return this._action.title;
  }
  get iconSvgInline() {
    return this._action.iconSvgInline;
  }
  get enabled() {
    return this._action.enabled;
  }
  get exec() {
    return this._action.exec;
  }
  get execBatch() {
    return this._action.execBatch;
  }
  get order() {
    return this._action.order;
  }
  get parent() {
    return this._action.parent;
  }
  get default() {
    return this._action.default;
  }
  get inline() {
    return this._action.inline;
  }
  get renderInline() {
    return this._action.renderInline;
  }
  validateAction(action2) {
    if (!action2.id || typeof action2.id !== "string") {
      throw new Error("Invalid id");
    }
    if (!action2.displayName || typeof action2.displayName !== "function") {
      throw new Error("Invalid displayName function");
    }
    if ("title" in action2 && typeof action2.title !== "function") {
      throw new Error("Invalid title function");
    }
    if (!action2.iconSvgInline || typeof action2.iconSvgInline !== "function") {
      throw new Error("Invalid iconSvgInline function");
    }
    if (!action2.exec || typeof action2.exec !== "function") {
      throw new Error("Invalid exec function");
    }
    if ("enabled" in action2 && typeof action2.enabled !== "function") {
      throw new Error("Invalid enabled function");
    }
    if ("execBatch" in action2 && typeof action2.execBatch !== "function") {
      throw new Error("Invalid execBatch function");
    }
    if ("order" in action2 && typeof action2.order !== "number") {
      throw new Error("Invalid order");
    }
    if ("parent" in action2 && typeof action2.parent !== "string") {
      throw new Error("Invalid parent");
    }
    if (action2.default && !Object.values(DefaultType).includes(action2.default)) {
      throw new Error("Invalid default");
    }
    if ("inline" in action2 && typeof action2.inline !== "function") {
      throw new Error("Invalid inline function");
    }
    if ("renderInline" in action2 && typeof action2.renderInline !== "function") {
      throw new Error("Invalid renderInline function");
    }
  }
}
const registerFileAction = function(action2) {
  if (typeof window._nc_fileactions === "undefined") {
    window._nc_fileactions = [];
    logger.debug("FileActions initialized");
  }
  if (window._nc_fileactions.find((search) => search.id === action2.id)) {
    logger.error(`FileAction ${action2.id} already registered`, { action: action2 });
    return;
  }
  window._nc_fileactions.push(action2);
};
var Permission = /* @__PURE__ */ ((Permission2) => {
  Permission2[Permission2["NONE"] = 0] = "NONE";
  Permission2[Permission2["CREATE"] = 4] = "CREATE";
  Permission2[Permission2["READ"] = 1] = "READ";
  Permission2[Permission2["UPDATE"] = 2] = "UPDATE";
  Permission2[Permission2["DELETE"] = 8] = "DELETE";
  Permission2[Permission2["SHARE"] = 16] = "SHARE";
  Permission2[Permission2["ALL"] = 31] = "ALL";
  return Permission2;
})(Permission || {});
var FileType = /* @__PURE__ */ ((FileType2) => {
  FileType2["Folder"] = "folder";
  FileType2["File"] = "file";
  return FileType2;
})(FileType || {});
const isDavRessource = function(source, davService) {
  return source.match(davService) !== null;
};
const validateData = (data2, davService) => {
  if (data2.id && typeof data2.id !== "number") {
    throw new Error("Invalid id type of value");
  }
  if (!data2.source) {
    throw new Error("Missing mandatory source");
  }
  try {
    new URL(data2.source);
  } catch (e2) {
    throw new Error("Invalid source format, source must be a valid URL");
  }
  if (!data2.source.startsWith("http")) {
    throw new Error("Invalid source format, only http(s) is supported");
  }
  if (data2.displayname && typeof data2.displayname !== "string") {
    throw new Error("Invalid displayname type");
  }
  if (data2.mtime && !(data2.mtime instanceof Date)) {
    throw new Error("Invalid mtime type");
  }
  if (data2.crtime && !(data2.crtime instanceof Date)) {
    throw new Error("Invalid crtime type");
  }
  if (!data2.mime || typeof data2.mime !== "string" || !data2.mime.match(/^[-\w.]+\/[-+\w.]+$/gi)) {
    throw new Error("Missing or invalid mandatory mime");
  }
  if ("size" in data2 && typeof data2.size !== "number" && data2.size !== void 0) {
    throw new Error("Invalid size type");
  }
  if ("permissions" in data2 && data2.permissions !== void 0 && !(typeof data2.permissions === "number" && data2.permissions >= Permission.NONE && data2.permissions <= Permission.ALL)) {
    throw new Error("Invalid permissions");
  }
  if (data2.owner && data2.owner !== null && typeof data2.owner !== "string") {
    throw new Error("Invalid owner type");
  }
  if (data2.attributes && typeof data2.attributes !== "object") {
    throw new Error("Invalid attributes type");
  }
  if (data2.root && typeof data2.root !== "string") {
    throw new Error("Invalid root type");
  }
  if (data2.root && !data2.root.startsWith("/")) {
    throw new Error("Root must start with a leading slash");
  }
  if (data2.root && !data2.source.includes(data2.root)) {
    throw new Error("Root must be part of the source");
  }
  if (data2.root && isDavRessource(data2.source, davService)) {
    const service = data2.source.match(davService)[0];
    if (!data2.source.includes(pathBrowserify.join(service, data2.root))) {
      throw new Error("The root must be relative to the service. e.g /files/emma");
    }
  }
  if (data2.status && !Object.values(NodeStatus).includes(data2.status)) {
    throw new Error("Status must be a valid NodeStatus");
  }
};
var NodeStatus = /* @__PURE__ */ ((NodeStatus2) => {
  NodeStatus2["NEW"] = "new";
  NodeStatus2["FAILED"] = "failed";
  NodeStatus2["LOADING"] = "loading";
  NodeStatus2["LOCKED"] = "locked";
  return NodeStatus2;
})(NodeStatus || {});
class Node {
  _data;
  _attributes;
  _knownDavService = /(remote|public)\.php\/(web)?dav/i;
  readonlyAttributes = Object.entries(Object.getOwnPropertyDescriptors(Node.prototype)).filter((e2) => typeof e2[1].get === "function" && e2[0] !== "__proto__").map((e2) => e2[0]);
  handler = {
    set: (target, prop, value) => {
      if (this.readonlyAttributes.includes(prop)) {
        return false;
      }
      return Reflect.set(target, prop, value);
    },
    deleteProperty: (target, prop) => {
      if (this.readonlyAttributes.includes(prop)) {
        return false;
      }
      return Reflect.deleteProperty(target, prop);
    },
    // TODO: This is deprecated and only needed for files v3
    get: (target, prop, receiver) => {
      if (this.readonlyAttributes.includes(prop)) {
        logger.warn(`Accessing "Node.attributes.${prop}" is deprecated, access it directly on the Node instance.`);
        return Reflect.get(this, prop);
      }
      return Reflect.get(target, prop, receiver);
    }
  };
  constructor(data2, davService) {
    validateData(data2, davService || this._knownDavService);
    this._data = {
      // TODO: Remove with next major release, this is just for compatibility
      displayname: data2.attributes?.displayname,
      ...data2,
      attributes: {}
    };
    this._attributes = new Proxy(this._data.attributes, this.handler);
    this.update(data2.attributes ?? {});
    if (davService) {
      this._knownDavService = davService;
    }
  }
  /**
   * Get the source url to this object
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get source() {
    return this._data.source.replace(/\/$/i, "");
  }
  /**
   * Get the encoded source url to this object for requests purposes
   */
  get encodedSource() {
    const { origin: origin2 } = new URL(this.source);
    return origin2 + encodePath(this.source.slice(origin2.length));
  }
  /**
   * Get this object name
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get basename() {
    return pathBrowserify.basename(this.source);
  }
  /**
   * The nodes displayname
   * By default the display name and the `basename` are identical,
   * but it is possible to have a different name. This happens
   * on the files app for example for shared folders.
   */
  get displayname() {
    return this._data.displayname || this.basename;
  }
  /**
   * Set the displayname
   */
  set displayname(displayname) {
    this._data.displayname = displayname;
  }
  /**
   * Get this object's extension
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get extension() {
    return pathBrowserify.extname(this.source);
  }
  /**
   * Get the directory path leading to this object
   * Will use the relative path to root if available
   *
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get dirname() {
    if (this.root) {
      let source = this.source;
      if (this.isDavRessource) {
        source = source.split(this._knownDavService).pop();
      }
      const firstMatch = source.indexOf(this.root);
      const root = this.root.replace(/\/$/, "");
      return pathBrowserify.dirname(source.slice(firstMatch + root.length) || "/");
    }
    const url = new URL(this.source);
    return pathBrowserify.dirname(url.pathname);
  }
  /**
   * Get the file mime
   * There is no setter as the mime is not meant to be changed
   */
  get mime() {
    return this._data.mime;
  }
  /**
   * Get the file modification time
   */
  get mtime() {
    return this._data.mtime;
  }
  /**
   * Set the file modification time
   */
  set mtime(mtime) {
    this._data.mtime = mtime;
  }
  /**
   * Get the file creation time
   * There is no setter as the creation time is not meant to be changed
   */
  get crtime() {
    return this._data.crtime;
  }
  /**
   * Get the file size
   */
  get size() {
    return this._data.size;
  }
  /**
   * Set the file size
   */
  set size(size) {
    this.updateMtime();
    this._data.size = size;
  }
  /**
   * Get the file attribute
   * This contains all additional attributes not provided by the Node class
   */
  get attributes() {
    return this._attributes;
  }
  /**
   * Get the file permissions
   */
  get permissions() {
    if (this.owner === null && !this.isDavRessource) {
      return Permission.READ;
    }
    return this._data.permissions !== void 0 ? this._data.permissions : Permission.NONE;
  }
  /**
   * Set the file permissions
   */
  set permissions(permissions) {
    this.updateMtime();
    this._data.permissions = permissions;
  }
  /**
   * Get the file owner
   * There is no setter as the owner is not meant to be changed
   */
  get owner() {
    if (!this.isDavRessource) {
      return null;
    }
    return this._data.owner;
  }
  /**
   * Is this a dav-related ressource ?
   */
  get isDavRessource() {
    return isDavRessource(this.source, this._knownDavService);
  }
  /**
   * Get the dav root of this object
   * There is no setter as the root is not meant to be changed
   */
  get root() {
    if (this._data.root) {
      return this._data.root.replace(/^(.+)\/$/, "$1");
    }
    if (this.isDavRessource) {
      const root = pathBrowserify.dirname(this.source);
      return root.split(this._knownDavService).pop() || null;
    }
    return null;
  }
  /**
   * Get the absolute path of this object relative to the root
   */
  get path() {
    if (this.root) {
      let source = this.source;
      if (this.isDavRessource) {
        source = source.split(this._knownDavService).pop();
      }
      const firstMatch = source.indexOf(this.root);
      const root = this.root.replace(/\/$/, "");
      return source.slice(firstMatch + root.length) || "/";
    }
    return (this.dirname + "/" + this.basename).replace(/\/\//g, "/");
  }
  /**
   * Get the node id if defined.
   * There is no setter as the fileid is not meant to be changed
   */
  get fileid() {
    return this._data?.id;
  }
  /**
   * Get the node status.
   */
  get status() {
    return this._data?.status;
  }
  /**
   * Set the node status.
   */
  set status(status) {
    this._data.status = status;
  }
  /**
   * Move the node to a new destination
   *
   * @param {string} destination the new source.
   * e.g. https://cloud.domain.com/remote.php/dav/files/emma/Photos/picture.jpg
   */
  move(destination) {
    validateData({ ...this._data, source: destination }, this._knownDavService);
    const oldBasename = this.basename;
    this._data.source = destination;
    if (this.displayname === oldBasename && this.basename !== oldBasename) {
      this.displayname = this.basename;
    }
    this.updateMtime();
  }
  /**
   * Rename the node
   * This aliases the move method for easier usage
   *
   * @param basename The new name of the node
   */
  rename(basename2) {
    if (basename2.includes("/")) {
      throw new Error("Invalid basename");
    }
    this.move(pathBrowserify.dirname(this.source) + "/" + basename2);
  }
  /**
   * Update the mtime if exists
   */
  updateMtime() {
    if (this._data.mtime) {
      this._data.mtime = /* @__PURE__ */ new Date();
    }
  }
  /**
   * Update the attributes of the node
   * Warning, updating attributes will NOT automatically update the mtime.
   *
   * @param attributes The new attributes to update on the Node attributes
   */
  update(attributes) {
    for (const [name, value] of Object.entries(attributes)) {
      try {
        if (value === void 0) {
          delete this.attributes[name];
        } else {
          this.attributes[name] = value;
        }
      } catch (e2) {
        if (e2 instanceof TypeError) {
          continue;
        }
        throw e2;
      }
    }
  }
}
class Folder extends Node {
  constructor(data2) {
    super({
      ...data2,
      mime: "httpd/unix-directory"
    });
  }
  get type() {
    return FileType.Folder;
  }
  get extension() {
    return null;
  }
  get mime() {
    return "httpd/unix-directory";
  }
}
function davGetRootPath() {
  if (isPublicShare()) {
    return `/files/${getSharingToken()}`;
  }
  return `/files/${l()?.uid}`;
}
davGetRootPath();
function davGetRemoteURL() {
  const url = U("dav");
  if (isPublicShare()) {
    return url.replace("remote.php", "public.php");
  }
  return url;
}
davGetRemoteURL();
var util$3 = {};
(function(exports) {
  const nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
  const nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
  const nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
  const regexName = new RegExp("^" + nameRegexp + "$");
  const getAllMatches = function(string, regex) {
    const matches = [];
    let match2 = regex.exec(string);
    while (match2) {
      const allmatches = [];
      allmatches.startIndex = regex.lastIndex - match2[0].length;
      const len = match2.length;
      for (let index = 0; index < len; index++) {
        allmatches.push(match2[index]);
      }
      matches.push(allmatches);
      match2 = regex.exec(string);
    }
    return matches;
  };
  const isName = function(string) {
    const match2 = regexName.exec(string);
    return !(match2 === null || typeof match2 === "undefined");
  };
  exports.isExist = function(v) {
    return typeof v !== "undefined";
  };
  exports.isEmptyObject = function(obj) {
    return Object.keys(obj).length === 0;
  };
  exports.merge = function(target, a, arrayMode) {
    if (a) {
      const keys3 = Object.keys(a);
      const len = keys3.length;
      for (let i = 0; i < len; i++) {
        if (arrayMode === "strict") {
          target[keys3[i]] = [a[keys3[i]]];
        } else {
          target[keys3[i]] = a[keys3[i]];
        }
      }
    }
  };
  exports.getValue = function(v) {
    if (exports.isExist(v)) {
      return v;
    } else {
      return "";
    }
  };
  exports.isName = isName;
  exports.getAllMatches = getAllMatches;
  exports.nameRegexp = nameRegexp;
})(util$3);
if (!Number.parseInt && window.parseInt) {
  Number.parseInt = window.parseInt;
}
if (!Number.parseFloat && window.parseFloat) {
  Number.parseFloat = window.parseFloat;
}
const debug$1 = typeof process$1$1 === "object" && define_process_env_default && define_process_env_default.NODE_DEBUG && /\bsemver\b/i.test(define_process_env_default.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
};
var debug_1 = debug$1;
const SEMVER_SPEC_VERSION = "2.0.0";
const MAX_LENGTH$1 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991;
const MAX_SAFE_COMPONENT_LENGTH = 16;
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH$1 - 6;
const RELEASE_TYPES = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var constants = {
  MAX_LENGTH: MAX_LENGTH$1,
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  RELEASE_TYPES,
  SEMVER_SPEC_VERSION,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
var re$1 = { exports: {} };
(function(module, exports) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2,
    MAX_SAFE_BUILD_LENGTH: MAX_SAFE_BUILD_LENGTH2,
    MAX_LENGTH: MAX_LENGTH2
  } = constants;
  const debug2 = debug_1;
  exports = module.exports = {};
  const re2 = exports.re = [];
  const safeRe = exports.safeRe = [];
  const src = exports.src = [];
  const t2 = exports.t = {};
  let R = 0;
  const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
  const safeRegexReplacements = [
    ["\\s", 1],
    ["\\d", MAX_LENGTH2],
    [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH2]
  ];
  const makeSafeRegex = (value) => {
    for (const [token, max2] of safeRegexReplacements) {
      value = value.split(`${token}*`).join(`${token}{0,${max2}}`).split(`${token}+`).join(`${token}{1,${max2}}`);
    }
    return value;
  };
  const createToken = (name, value, isGlobal) => {
    const safe = makeSafeRegex(value);
    const index = R++;
    debug2(name, index, value);
    t2[name] = index;
    src[index] = value;
    re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
    safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
  createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
  createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
  createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
  createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
  createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?`);
  createToken("COERCE", `${src[t2.COERCEPLAIN]}(?:$|[^\\d])`);
  createToken("COERCEFULL", src[t2.COERCEPLAIN] + `(?:${src[t2.PRERELEASE]})?(?:${src[t2.BUILD]})?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t2.COERCE], true);
  createToken("COERCERTLFULL", src[t2.COERCEFULL], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
  exports.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
  exports.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
  exports.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(re$1, re$1.exports);
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString: toString$6 } = Object.prototype;
const { getPrototypeOf } = Object;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString$6.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val2) {
  return val2 !== null && !isUndefined(val2) && val2.constructor !== null && !isUndefined(val2.constructor) && isFunction(val2.constructor.isBuffer) && val2.constructor.isBuffer(val2);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val2) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val2);
  } else {
    result = val2 && val2.buffer && isArrayBuffer(val2.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject$6 = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val2) => {
  if (kindOf(val2) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val2);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val2) && !(Symbol.iterator in val2);
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val2) => isObject$6(val2) && isFunction(val2.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l2;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l2 = obj.length; i < l2; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    const keys3 = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys3.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys3[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys3 = Object.keys(obj);
  let i = keys3.length;
  let _key;
  while (i-- > 0) {
    _key = keys3[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global$e;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val2, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val2)) {
      result[targetKey] = merge(result[targetKey], val2);
    } else if (isPlainObject(val2)) {
      result[targetKey] = merge({}, val2);
    } else if (isArray(val2)) {
      result[targetKey] = val2.slice();
    } else {
      result[targetKey] = val2;
    }
  };
  for (let i = 0, l2 = arguments.length; i < l2; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val2, key) => {
    if (thisArg && isFunction(val2)) {
      a[key] = bind(val2, thisArg);
    } else {
      a[key] = val2;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator = generator.call(obj);
  let result;
  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty$1 = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const DIGIT = "0123456789";
const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length | 0];
  }
  return str;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject$6(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject$6(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject: isObject$6,
  isPlainObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty: hasOwnProperty$1,
  hasOwnProp: hasOwnProperty$1,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};
var buffer = {};
var base64Js = {};
base64Js.byteLength = byteLength;
base64Js.toByteArray = toByteArray;
base64Js.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(
      lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(
      lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
    );
  }
  return parts.join("");
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ieee754.read = function(buffer2, offset, isLE, mLen, nBytes) {
  var e2, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d2 = isLE ? -1 : 1;
  var s = buffer2[offset + i];
  i += d2;
  e2 = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e2 = e2 * 256 + buffer2[offset + i], i += d2, nBits -= 8) {
  }
  m = e2 & (1 << -nBits) - 1;
  e2 >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer2[offset + i], i += d2, nBits -= 8) {
  }
  if (e2 === 0) {
    e2 = 1 - eBias;
  } else if (e2 === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e2 = e2 - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e2 - mLen);
};
ieee754.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
  var e2, m, c2;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d2 = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e2 = eMax;
  } else {
    e2 = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c2 = Math.pow(2, -e2)) < 1) {
      e2--;
      c2 *= 2;
    }
    if (e2 + eBias >= 1) {
      value += rt / c2;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c2 >= 2) {
      e2++;
      c2 /= 2;
    }
    if (e2 + eBias >= eMax) {
      m = 0;
      e2 = eMax;
    } else if (e2 + eBias >= 1) {
      m = (value * c2 - 1) * Math.pow(2, mLen);
      e2 = e2 + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e2 = 0;
    }
  }
  for (; mLen >= 8; buffer2[offset + i] = m & 255, i += d2, m /= 256, mLen -= 8) {
  }
  e2 = e2 << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer2[offset + i] = e2 & 255, i += d2, e2 /= 256, eLen -= 8) {
  }
  buffer2[offset + i - d2] |= s * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(exports) {
  const base64 = base64Js;
  const ieee754$1 = ieee754;
  const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
  exports.Buffer = Buffer2;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  const K_MAX_LENGTH = 2147483647;
  exports.kMaxLength = K_MAX_LENGTH;
  const { Uint8Array: GlobalUint8Array, ArrayBuffer: GlobalArrayBuffer, SharedArrayBuffer: GlobalSharedArrayBuffer } = globalThis;
  Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
    console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
  }
  function typedArraySupport() {
    try {
      const arr = new GlobalUint8Array(1);
      const proto = { foo: function() {
        return 42;
      } };
      Object.setPrototypeOf(proto, GlobalUint8Array.prototype);
      Object.setPrototypeOf(arr, proto);
      return arr.foo() === 42;
    } catch (e2) {
      return false;
    }
  }
  Object.defineProperty(Buffer2.prototype, "parent", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this)) return void 0;
      return this.buffer;
    }
  });
  Object.defineProperty(Buffer2.prototype, "offset", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this)) return void 0;
      return this.byteOffset;
    }
  });
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    const buf = new GlobalUint8Array(length);
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function Buffer2(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      }
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  Buffer2.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    if (GlobalArrayBuffer.isView(value)) {
      return fromArrayView(value);
    }
    if (value == null) {
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    if (isInstance(value, GlobalArrayBuffer) || value && isInstance(value.buffer, GlobalArrayBuffer)) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof GlobalSharedArrayBuffer !== "undefined" && (isInstance(value, GlobalSharedArrayBuffer) || value && isInstance(value.buffer, GlobalSharedArrayBuffer))) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "number") {
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    }
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
      return Buffer2.from(valueOf, encodingOrOffset, length);
    }
    const b = fromObject(value);
    if (b) return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
      return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    }
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
    );
  }
  Buffer2.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Object.setPrototypeOf(Buffer2.prototype, GlobalUint8Array.prototype);
  Object.setPrototypeOf(Buffer2, GlobalUint8Array);
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be of type number');
    } else if (size < 0) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
  }
  function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size);
    }
    if (fill !== void 0) {
      return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
  }
  Buffer2.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer2.allocUnsafe = function(size) {
    return allocUnsafe(size);
  };
  Buffer2.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer2.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    const length = byteLength2(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for (let i = 0; i < length; i += 1) {
      buf[i] = array[i] & 255;
    }
    return buf;
  }
  function fromArrayView(arrayView) {
    if (isInstance(arrayView, GlobalUint8Array)) {
      const copy = new GlobalUint8Array(arrayView);
      return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
  }
  function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('"length" is outside of buffer bounds');
    }
    let buf;
    if (byteOffset === void 0 && length === void 0) {
      buf = new GlobalUint8Array(array);
    } else if (length === void 0) {
      buf = new GlobalUint8Array(array, byteOffset);
    } else {
      buf = new GlobalUint8Array(array, byteOffset, length);
    }
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function fromObject(obj) {
    if (Buffer2.isBuffer(obj)) {
      const len = checked(obj.length) | 0;
      const buf = createBuffer(len);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj.length !== void 0) {
      if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
        return createBuffer(0);
      }
      return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data);
    }
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer2.alloc(+length);
  }
  Buffer2.isBuffer = function isBuffer2(b) {
    return b != null && b._isBuffer === true && b !== Buffer2.prototype;
  };
  Buffer2.compare = function compare(a, b) {
    if (isInstance(a, GlobalUint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
    if (isInstance(b, GlobalUint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
    if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    }
    if (a === b) return 0;
    let x = a.length;
    let y = b.length;
    for (let i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
  Buffer2.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer2.concat = function concat2(list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
      return Buffer2.alloc(0);
    }
    let i;
    if (length === void 0) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }
    const buffer2 = Buffer2.allocUnsafe(length);
    let pos = 0;
    for (i = 0; i < list.length; ++i) {
      let buf = list[i];
      if (isInstance(buf, GlobalUint8Array)) {
        if (pos + buf.length > buffer2.length) {
          if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf);
          buf.copy(buffer2, pos);
        } else {
          GlobalUint8Array.prototype.set.call(
            buffer2,
            buf,
            pos
          );
        }
      } else if (!Buffer2.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      } else {
        buf.copy(buffer2, pos);
      }
      pos += buf.length;
    }
    return buffer2;
  };
  function byteLength2(string, encoding) {
    if (Buffer2.isBuffer(string)) {
      return string.length;
    }
    if (GlobalArrayBuffer.isView(string) || isInstance(string, GlobalArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
      );
    }
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) {
            return mustMatch ? -1 : utf8ToBytes(string).length;
          }
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.byteLength = byteLength2;
  function slowToString(encoding, start, end) {
    let loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding) encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.prototype._isBuffer = true;
  function swap(b, n2, m) {
    const i = b[n2];
    b[n2] = b[m];
    b[m] = i;
  }
  Buffer2.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (let i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this;
  };
  Buffer2.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (let i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };
  Buffer2.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (let i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };
  Buffer2.prototype.toString = function toString4() {
    const length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
  Buffer2.prototype.equals = function equals(b) {
    if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return Buffer2.compare(this, b) === 0;
  };
  Buffer2.prototype.inspect = function inspect() {
    let str = "";
    const max2 = exports.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max2).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max2) str += " ... ";
    return "<Buffer " + str + ">";
  };
  if (customInspectSymbol) {
    Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
  }
  Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, GlobalUint8Array)) {
      target = Buffer2.from(target, target.offset, target.byteLength);
    }
    if (!Buffer2.isBuffer(target)) {
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
      );
    }
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
      thisStart = 0;
    }
    if (thisEnd === void 0) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for (let i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer2, val2, byteOffset, encoding, dir) {
    if (buffer2.length === 0) return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (numberIsNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer2.length - 1;
    }
    if (byteOffset < 0) byteOffset = buffer2.length + byteOffset;
    if (byteOffset >= buffer2.length) {
      if (dir) return -1;
      else byteOffset = buffer2.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0;
      else return -1;
    }
    if (typeof val2 === "string") {
      val2 = Buffer2.from(val2, encoding);
    }
    if (Buffer2.isBuffer(val2)) {
      if (val2.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer2, val2, byteOffset, encoding, dir);
    } else if (typeof val2 === "number") {
      val2 = val2 & 255;
      if (typeof GlobalUint8Array.prototype.indexOf === "function") {
        if (dir) {
          return GlobalUint8Array.prototype.indexOf.call(buffer2, val2, byteOffset);
        } else {
          return GlobalUint8Array.prototype.lastIndexOf.call(buffer2, val2, byteOffset);
        }
      }
      return arrayIndexOf(buffer2, [val2], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val2, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val2.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val2.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i2) {
      if (indexSize === 1) {
        return buf[i2];
      } else {
        return buf.readUInt16BE(i2 * indexSize);
      }
    }
    let i;
    if (dir) {
      let foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val2, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        let found = true;
        for (let j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val2, j)) {
            found = false;
            break;
          }
        }
        if (found) return i;
      }
    }
    return -1;
  }
  Buffer2.prototype.includes = function includes(val2, byteOffset, encoding) {
    return this.indexOf(val2, byteOffset, encoding) !== -1;
  };
  Buffer2.prototype.indexOf = function indexOf2(val2, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val2, byteOffset, encoding, true);
  };
  Buffer2.prototype.lastIndexOf = function lastIndexOf(val2, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val2, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    const strLen = string.length;
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    let i;
    for (i = 0; i < length; ++i) {
      const parsed = parseInt(string.substr(i * 2, 2), 16);
      if (numberIsNaN(parsed)) return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer2.prototype.write = function write(string, offset, length, encoding) {
    if (offset === void 0) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === void 0 && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === void 0) encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else {
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    }
    const remaining = this.length - offset;
    if (length === void 0 || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding) encoding = "utf8";
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, string, offset, length);
        case "base64":
          return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer2.prototype.toJSON = function toJSON2() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while (i < end) {
      const firstByte = buf[i];
      let codePoint = null;
      let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        let secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  const MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    let res = "";
    let i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    let out = "";
    for (let i = start; i < end; ++i) {
      out += hexSliceLookupTable[buf[i]];
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    for (let i = 0; i < bytes.length - 1; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer2.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start) end = start;
    const newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer2.prototype);
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength3, this.length);
    let val2 = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength3 && (mul *= 256)) {
      val2 += this[offset + i] * mul;
    }
    return val2;
  };
  Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      checkOffset(offset, byteLength3, this.length);
    }
    let val2 = this[offset + --byteLength3];
    let mul = 1;
    while (byteLength3 > 0 && (mul *= 256)) {
      val2 += this[offset + --byteLength3] * mul;
    }
    return val2;
  };
  Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };
  Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };
  Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
  };
  Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };
  Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
  });
  Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
  });
  Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength3, this.length);
    let val2 = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength3 && (mul *= 256)) {
      val2 += this[offset + i] * mul;
    }
    mul *= 128;
    if (val2 >= mul) val2 -= Math.pow(2, 8 * byteLength3);
    return val2;
  };
  Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength3, this.length);
    let i = byteLength3;
    let mul = 1;
    let val2 = this[offset + --i];
    while (i > 0 && (mul *= 256)) {
      val2 += this[offset + --i] * mul;
    }
    mul *= 128;
    if (val2 >= mul) val2 -= Math.pow(2, 8 * byteLength3);
    return val2;
  };
  Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128)) return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val2 = this[offset] | this[offset + 1] << 8;
    return val2 & 32768 ? val2 | 4294901760 : val2;
  };
  Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val2 = this[offset + 1] | this[offset] << 8;
    return val2 & 32768 ? val2 | 4294901760 : val2;
  };
  Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };
  Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };
  Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val2 = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
    return (BigInt(val2) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
  });
  Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val2 = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    return (BigInt(val2) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
  });
  Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754$1.read(this, offset, true, 23, 4);
  };
  Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754$1.read(this, offset, false, 23, 4);
  };
  Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754$1.read(this, offset, true, 52, 8);
  };
  Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754$1.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max2, min2) {
    if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max2 || value < min2) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
  }
  Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset, byteLength3, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 255;
    while (++i < byteLength3 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset, byteLength3, maxBytes, 0);
    }
    let i = byteLength3 - 1;
    let mul = 1;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  function wrtBigUInt64LE(buf, value, offset, min2, max2) {
    checkIntBI(value, min2, max2, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
  }
  function wrtBigUInt64BE(buf, value, offset, min2, max2) {
    checkIntBI(value, min2, max2, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
  }
  Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset, byteLength3, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 255;
    while (++i < byteLength3 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset, byteLength3, limit - 1, -limit);
    }
    let i = byteLength3 - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
    if (value < 0) value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0) value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function checkIEEE754(buf, value, offset, ext, max2, min2) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    ieee754$1.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    ieee754$1.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    const len = end - start;
    if (this === target && typeof GlobalUint8Array.prototype.copyWithin === "function") {
      this.copyWithin(targetStart, start, end);
    } else {
      GlobalUint8Array.prototype.set.call(
        target,
        this.subarray(start, end),
        targetStart
      );
    }
    return len;
  };
  Buffer2.prototype.fill = function fill(val2, start, end, encoding) {
    if (typeof val2 === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      if (val2.length === 1) {
        const code2 = val2.charCodeAt(0);
        if (encoding === "utf8" && code2 < 128 || encoding === "latin1") {
          val2 = code2;
        }
      }
    } else if (typeof val2 === "number") {
      val2 = val2 & 255;
    } else if (typeof val2 === "boolean") {
      val2 = Number(val2);
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val2) val2 = 0;
    let i;
    if (typeof val2 === "number") {
      for (i = start; i < end; ++i) {
        this[i] = val2;
      }
    } else {
      const bytes = Buffer2.isBuffer(val2) ? val2 : Buffer2.from(val2, encoding);
      const len = bytes.length;
      if (len === 0) {
        throw new TypeError('The value "' + val2 + '" is invalid for argument "value"');
      }
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }
    return this;
  };
  const errors = {};
  function E(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
      constructor() {
        super();
        Object.defineProperty(this, "message", {
          value: getMessage.apply(this, arguments),
          writable: true,
          configurable: true
        });
        this.name = `${this.name} [${sym}]`;
        this.stack;
        delete this.name;
      }
      get code() {
        return sym;
      }
      set code(value) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value,
          writable: true
        });
      }
      toString() {
        return `${this.name} [${sym}]: ${this.message}`;
      }
    };
  }
  E(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(name) {
      if (name) {
        return `${name} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    },
    RangeError
  );
  E(
    "ERR_INVALID_ARG_TYPE",
    function(name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
    },
    TypeError
  );
  E(
    "ERR_OUT_OF_RANGE",
    function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    },
    RangeError
  );
  function addNumericalSeparator(val2) {
    let res = "";
    let i = val2.length;
    const start = val2[0] === "-" ? 1 : 0;
    for (; i >= start + 4; i -= 3) {
      res = `_${val2.slice(i - 3, i)}${res}`;
    }
    return `${val2.slice(0, i)}${res}`;
  }
  function checkBounds(buf, offset, byteLength3) {
    validateNumber(offset, "offset");
    if (buf[offset] === void 0 || buf[offset + byteLength3] === void 0) {
      boundsError(offset, buf.length - (byteLength3 + 1));
    }
  }
  function checkIntBI(value, min2, max2, buf, offset, byteLength3) {
    if (value > max2 || value < min2) {
      const n2 = typeof min2 === "bigint" ? "n" : "";
      let range;
      {
        if (min2 === 0 || min2 === BigInt(0)) {
          range = `>= 0${n2} and < 2${n2} ** ${(byteLength3 + 1) * 8}${n2}`;
        } else {
          range = `>= -(2${n2} ** ${(byteLength3 + 1) * 8 - 1}${n2}) and < 2 ** ${(byteLength3 + 1) * 8 - 1}${n2}`;
        }
      }
      throw new errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength3);
  }
  function validateNumber(value, name) {
    if (typeof value !== "number") {
      throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
    }
  }
  function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
      validateNumber(value, type);
      throw new errors.ERR_OUT_OF_RANGE("offset", "an integer", value);
    }
    if (length < 0) {
      throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new errors.ERR_OUT_OF_RANGE(
      "offset",
      `>= ${0} and <= ${length}`,
      value
    );
  }
  const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2) return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for (let i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0) break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0) break;
        bytes.push(
          codePoint >> 6 | 192,
          codePoint & 63 | 128
        );
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0) break;
        bytes.push(
          codePoint >> 12 | 224,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0) break;
        bytes.push(
          codePoint >> 18 | 240,
          codePoint >> 12 & 63 | 128,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    let c2, hi, lo;
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break;
      c2 = str.charCodeAt(i);
      hi = c2 >> 8;
      lo = c2 % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    let i;
    for (i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length) break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
  }
  function numberIsNaN(obj) {
    return obj !== obj;
  }
  const hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for (let i = 0; i < 16; ++i) {
      const i16 = i * 16;
      for (let j = 0; j < 16; ++j) {
        table[i16 + j] = alphabet[i] + alphabet[j];
      }
    }
    return table;
  }();
  function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
  }
  function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
  }
})(buffer);
const Buffer = buffer.Buffer;
function AxiosError(message, code2, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code2 && (this.code = code2);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}
utils$1.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const prototype$1 = AxiosError.prototype;
const descriptors$1 = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code2) => {
  descriptors$1[code2] = { value: code2 };
});
Object.defineProperties(AxiosError, descriptors$1);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError.from = (error, code2, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError.call(axiosError, error.message, code2, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match2) {
    return charMap[match2];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val2) {
  return encodeURIComponent(val2).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id2) {
    if (this.handlers[id2]) {
      this.handlers[id2] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const hasStandardBrowserEnv = ((product) => {
  return hasBrowserEnv && ["ReactNative", "NativeScript", "NS"].indexOf(product) < 0;
})(typeof navigator !== "undefined" && navigator.product);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data2, options) {
  return toFormData(data2, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match2) => {
    return match2[0] === "[]" ? "" : match2[1] || match2[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys3 = Object.keys(arr);
  let i;
  const len = keys3.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys3[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e2) {
      if (e2.name !== "SyntaxError") {
        throw e2;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data2, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data2);
    if (isObjectPayload && utils$1.isHTMLForm(data2)) {
      data2 = new FormData(data2);
    }
    const isFormData2 = utils$1.isFormData(data2);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data2)) : data2;
    }
    if (utils$1.isArrayBuffer(data2) || utils$1.isBuffer(data2) || utils$1.isStream(data2) || utils$1.isFile(data2) || utils$1.isBlob(data2) || utils$1.isReadableStream(data2)) {
      return data2;
    }
    if (utils$1.isArrayBufferView(data2)) {
      return data2.buffer;
    }
    if (utils$1.isURLSearchParams(data2)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data2.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data2, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data2)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData(
          isFileList2 ? { "files[]": data2 } : data2,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data2);
    }
    return data2;
  }],
  transformResponse: [function transformResponse(data2) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data2) || utils$1.isReadableStream(data2)) {
      return data2;
    }
    if (data2 && utils$1.isString(data2) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data2);
      } catch (e2) {
        if (strictJSONParsing) {
          if (e2.name === "SyntaxError") {
            throw AxiosError.from(e2, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e2;
        }
      }
    }
    return data2;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val2;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val2 = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val2);
      } else {
        parsed[key] = [val2];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val2 : val2;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match2;
  while (match2 = tokensRE.exec(str)) {
    tokens[match2[1]] = match2[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w2, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isHeaders(header)) {
      for (const [key, value] of header.entries()) {
        setHeader(value, key, rewrite);
      }
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys3 = Object.keys(this);
    let i = keys3.length;
    let deleted = false;
    while (i--) {
      const key = keys3[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format2) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format2 ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
}
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders.from(context.headers);
  let data2 = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data2 = fn.call(config, data2, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data2;
}
function isCancel(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError(message, config, request) {
  AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});
function settle(resolve3, reject2, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve3(response);
  } else {
    reject2(new AxiosError(
      "Request failed with status code " + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match2 = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match2 && match2[1] || "";
}
function speedometer(samplesCount, min2) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min2 = min2 !== void 0 ? min2 : 1e3;
  return function push2(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min2) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  const threshold = 1e3 / freq;
  let timer = null;
  return function throttled() {
    const force = this === true;
    const now = Date.now();
    if (force || now - timestamp > threshold) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timestamp = now;
      return fn.apply(null, arguments);
    }
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        timestamp = Date.now();
        return fn.apply(null, arguments);
      }, threshold - (now - timestamp));
    }
  };
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e2) => {
    const loaded = e2.loaded;
    const total = e2.lengthComputable ? e2.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data2 = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e2,
      lengthComputable: total != null
    };
    data2[isDownloadStream ? "download" : "upload"] = true;
    listener(data2);
  }, freq);
};
const isURLSameOrigin = platform.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement("a");
    let originURL;
    function resolveURL(url) {
      let href = url;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin2(requestURL) {
      const parsed = utils$1.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function nonStandardBrowserEnv() {
    return function isURLSameOrigin2() {
      return true;
    };
  }()
);
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push("path=" + path);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match2 = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match2 ? decodeURIComponent(match2[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders ? { ...thing } : thing;
function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };
  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig({}, config);
  let { data: data2, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  let contentType;
  if (utils$1.isFormData(data2)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if ((contentType = headers.getContentType()) !== false) {
      const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve3, reject2) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders.from(_config.headers).normalize();
    let { responseType } = _config;
    let onCanceled;
    function done() {
      if (_config.cancelToken) {
        _config.cancelToken.unsubscribe(onCanceled);
      }
      if (_config.signal) {
        _config.signal.removeEventListener("abort", onCanceled);
      }
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve3(value);
        done();
      }, function _reject(err) {
        reject2(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject2(new AxiosError("Request aborted", AxiosError.ECONNABORTED, _config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject2(new AxiosError("Network Error", AxiosError.ERR_NETWORK, _config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject2(new AxiosError(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        _config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val2, key) {
        request.setRequestHeader(key, val2);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (typeof _config.onDownloadProgress === "function") {
      request.addEventListener("progress", progressEventReducer(_config.onDownloadProgress, true));
    }
    if (typeof _config.onUploadProgress === "function" && request.upload) {
      request.upload.addEventListener("progress", progressEventReducer(_config.onUploadProgress));
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject2(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject2(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  let controller = new AbortController();
  let aborted;
  const onabort = function(cancel) {
    if (!aborted) {
      aborted = true;
      unsubscribe();
      const err = cancel instanceof Error ? cancel : this.reason;
      controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
    }
  };
  let timer = timeout && setTimeout(() => {
    onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
  }, timeout);
  const unsubscribe = () => {
    if (signals) {
      timer && clearTimeout(timer);
      timer = null;
      signals.forEach((signal2) => {
        signal2 && (signal2.removeEventListener ? signal2.removeEventListener("abort", onabort) : signal2.unsubscribe(onabort));
      });
      signals = null;
    }
  };
  signals.forEach((signal2) => signal2 && signal2.addEventListener && signal2.addEventListener("abort", onabort));
  const { signal } = controller;
  signal.unsubscribe = unsubscribe;
  return [signal, () => {
    timer && clearTimeout(timer);
    timer = null;
  }];
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (!chunkSize || len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize, encode2) {
  for await (const chunk of iterable) {
    yield* streamChunk(ArrayBuffer.isView(chunk) ? chunk : await encode2(String(chunk)), chunkSize);
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish, encode2) => {
  const iterator = readBytes(stream, chunkSize, encode2);
  let bytes = 0;
  return new ReadableStream({
    type: "bytes",
    async pull(controller) {
      const { done, value } = await iterator.next();
      if (done) {
        controller.close();
        onFinish();
        return;
      }
      let len = value.byteLength;
      onProgress && onProgress(bytes += len);
      controller.enqueue(new Uint8Array(value));
    },
    cancel(reason) {
      onFinish(reason);
      return iterator.return();
    }
  }, {
    highWaterMark: 2
  });
};
const fetchProgressDecorator = (total, fn) => {
  const lengthComputable = total != null;
  return (loaded) => setTimeout(() => fn({
    lengthComputable,
    total,
    loaded
  }));
};
const isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
const supportsRequestStream = isReadableStreamSupported && (() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
})();
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const supportsResponseStream = isReadableStreamSupported && !!(() => {
  try {
    return utils$1.isReadableStream(new Response("").body);
  } catch (err) {
  }
})();
const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};
isFetchSupported && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res2) => res2[type]() : (_2, config) => {
      throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
    });
  });
})(new Response());
const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils$1.isBlob(body)) {
    return body.size;
  }
  if (utils$1.isSpecCompliantForm(body)) {
    return (await new Request(body).arrayBuffer()).byteLength;
  }
  if (utils$1.isArrayBufferView(body)) {
    return body.byteLength;
  }
  if (utils$1.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils$1.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};
const resolveBodyLength = async (headers, body) => {
  const length = utils$1.toFiniteNumber(headers.getContentLength());
  return length == null ? getBodyLength(body) : length;
};
const fetchAdapter = isFetchSupported && (async (config) => {
  let {
    url,
    method,
    data: data2,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = "same-origin",
    fetchOptions
  } = resolveConfig(config);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let [composedSignal, stopTimeout] = signal || cancelToken || timeout ? composeSignals([signal, cancelToken], timeout) : [];
  let finished, request;
  const onFinish = () => {
    !finished && setTimeout(() => {
      composedSignal && composedSignal.unsubscribe();
    });
    finished = true;
  };
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data2)) !== 0) {
      let _request = new Request(url, {
        method: "POST",
        body: data2,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils$1.isFormData(data2) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        data2 = trackStream(_request.body, DEFAULT_CHUNK_SIZE, fetchProgressDecorator(
          requestContentLength,
          progressEventReducer(onUploadProgress)
        ), null, encodeText);
      }
    }
    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? "cors" : "omit";
    }
    request = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data2,
      duplex: "half",
      withCredentials
    });
    let response = await fetch(request);
    const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream && (onDownloadProgress || isStreamResponse)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onDownloadProgress && fetchProgressDecorator(
          responseContentLength,
          progressEventReducer(onDownloadProgress, true)
        ), isStreamResponse && onFinish, encodeText),
        options
      );
    }
    responseType = responseType || "text";
    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
    !isStreamResponse && onFinish();
    stopTimeout && stopTimeout();
    return await new Promise((resolve3, reject2) => {
      settle(resolve3, reject2, {
        data: responseData,
        headers: AxiosHeaders.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config,
        request
      });
    });
  } catch (err) {
    onFinish();
    if (err && err.name === "TypeError" && /fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request),
        {
          cause: err.cause || err
        }
      );
    }
    throw AxiosError.from(err, err && err.code, config, request);
  }
});
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e2) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i];
      let id2;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id2 = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError(`Unknown adapter '${id2}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id2 || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id2, state]) => `adapter ${id2} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION = "1.7.2";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version2, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError(
        formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
        AxiosError.ERR_DEPRECATED
      );
    }
    if (version2 && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version2 + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys3 = Object.keys(options);
  let i = keys3.length;
  while (i-- > 0) {
    const opt = keys3[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy;
        Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e2) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data2, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data: data2
      }));
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve3) {
      resolvePromise = resolve3;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve3) => {
        token.subscribe(resolve3);
        _resolve = resolve3;
      }).then(onfulfilled);
      promise.cancel = function reject2() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c2) {
      cancel = c2;
    });
    return {
      token,
      cancel
    };
  }
}
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios(defaultConfig);
  const instance = bind(Axios.prototype.request, context);
  utils$1.extend(instance, Axios.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create3(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios;
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;
axios.AxiosError = AxiosError;
axios.Cancel = axios.CanceledError;
axios.all = function all2(promises) {
  return Promise.all(promises);
};
axios.spread = spread;
axios.isAxiosError = isAxiosError;
axios.mergeConfig = mergeConfig;
axios.AxiosHeaders = AxiosHeaders;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode;
axios.default = axios;
const RETRY_KEY = Symbol("csrf-retry");
const onError$2 = (axios2) => async (error) => {
  var _a2;
  const { config, response, request } = error;
  const responseURL = request == null ? void 0 : request.responseURL;
  const status = response == null ? void 0 : response.status;
  if (status === 412 && ((_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.message) === "CSRF check failed" && config[RETRY_KEY] === void 0) {
    console.warn("Request to ".concat(responseURL, " failed because of a CSRF mismatch. Fetching a new token"));
    const { data: { token } } = await axios2.get(_("/csrftoken"));
    console.debug("New request token ".concat(token, " fetched"));
    axios2.defaults.headers.requesttoken = token;
    return axios2({
      ...config,
      headers: {
        ...config.headers,
        requesttoken: token
      },
      [RETRY_KEY]: true
    });
  }
  return Promise.reject(error);
};
const RETRY_DELAY_KEY = Symbol("retryDelay");
const onError$1 = (axios2) => async (error) => {
  var _a2;
  const { config, response, request } = error;
  const responseURL = request == null ? void 0 : request.responseURL;
  const status = response == null ? void 0 : response.status;
  const headers = response == null ? void 0 : response.headers;
  if (status === 503 && headers["x-nextcloud-maintenance-mode"] === "1" && config.retryIfMaintenanceMode && (!config[RETRY_DELAY_KEY] || config[RETRY_DELAY_KEY] <= 32)) {
    const retryDelay = ((_a2 = config[RETRY_DELAY_KEY]) != null ? _a2 : 1) * 2;
    console.warn("Request to ".concat(responseURL, " failed because of maintenance mode. Retrying in ").concat(retryDelay, "s"));
    await new Promise((resolve3) => {
      setTimeout(resolve3, retryDelay * 1e3);
    });
    return axios2({
      ...config,
      [RETRY_DELAY_KEY]: retryDelay
    });
  }
  return Promise.reject(error);
};
const onError = async (error) => {
  var _a2;
  const { config, response, request } = error;
  const responseURL = request == null ? void 0 : request.responseURL;
  const status = response == null ? void 0 : response.status;
  if (status === 401 && ((_a2 = response == null ? void 0 : response.data) == null ? void 0 : _a2.message) === "Current user is not logged in" && config.reloadExpiredSession && (window == null ? void 0 : window.location)) {
    console.error("Request to ".concat(responseURL, " failed because the user session expired. Reloading the page …"));
    window.location.reload();
  }
  return Promise.reject(error);
};
var _a;
const client = axios.create({
  headers: {
    requesttoken: (_a = d()) != null ? _a : "",
    "X-Requested-With": "XMLHttpRequest"
  }
});
const cancelableClient = Object.assign(client, {
  CancelToken: axios.CancelToken,
  isCancel: axios.isCancel
});
cancelableClient.interceptors.response.use((r2) => r2, onError$2(cancelableClient));
cancelableClient.interceptors.response.use((r2) => r2, onError$1(cancelableClient));
cancelableClient.interceptors.response.use((r2) => r2, onError);
c((token) => {
  client.defaults.headers.requesttoken = token;
});
var dist = {};
var fails$d = function(exec2) {
  try {
    return !!exec2();
  } catch (error) {
    return true;
  }
};
var fails$c = fails$d;
var functionBindNative = !fails$c(function() {
  var test2 = function() {
  }.bind();
  return typeof test2 != "function" || test2.hasOwnProperty("prototype");
});
var NATIVE_BIND$2 = functionBindNative;
var FunctionPrototype$2 = Function.prototype;
var apply$1 = FunctionPrototype$2.apply;
var call$9 = FunctionPrototype$2.call;
var functionApply = typeof Reflect == "object" && Reflect.apply || (NATIVE_BIND$2 ? call$9.bind(apply$1) : function() {
  return call$9.apply(apply$1, arguments);
});
var NATIVE_BIND$1 = functionBindNative;
var call$8 = Function.prototype.call;
var functionCall = NATIVE_BIND$1 ? call$8.bind(call$8) : function() {
  return call$8.apply(call$8, arguments);
};
var NATIVE_BIND = functionBindNative;
var FunctionPrototype$1 = Function.prototype;
var call$7 = FunctionPrototype$1.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype$1.bind.bind(call$7, call$7);
var functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
  return function() {
    return call$7.apply(fn, arguments);
  };
};
var check = function(it) {
  return it && it.Math === Math && it;
};
var global$d = (
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == "object" && self) || check(typeof commonjsGlobal == "object" && commonjsGlobal) || check(typeof commonjsGlobal == "object" && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  /* @__PURE__ */ function() {
    return this;
  }() || Function("return this")()
);
var objectGetOwnPropertyDescriptor = {};
var fails$b = fails$d;
var descriptors = !fails$b(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] !== 7;
});
var objectPropertyIsEnumerable = {};
var $propertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;
var createPropertyDescriptor$2 = function(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value
  };
};
var uncurryThis$c = functionUncurryThis;
var toString$5 = uncurryThis$c({}.toString);
var stringSlice$5 = uncurryThis$c("".slice);
var classofRaw$1 = function(it) {
  return stringSlice$5(toString$5(it), 8, -1);
};
var uncurryThis$b = functionUncurryThis;
var fails$a = fails$d;
var classof$3 = classofRaw$1;
var $Object$3 = Object;
var split = uncurryThis$b("".split);
var indexedObject = fails$a(function() {
  return !$Object$3("z").propertyIsEnumerable(0);
}) ? function(it) {
  return classof$3(it) === "String" ? split(it, "") : $Object$3(it);
} : $Object$3;
var isNullOrUndefined$3 = function(it) {
  return it === null || it === void 0;
};
var isNullOrUndefined$2 = isNullOrUndefined$3;
var $TypeError$6 = TypeError;
var requireObjectCoercible$4 = function(it) {
  if (isNullOrUndefined$2(it)) throw new $TypeError$6("Can't call method on " + it);
  return it;
};
var IndexedObject = indexedObject;
var requireObjectCoercible$3 = requireObjectCoercible$4;
var toIndexedObject$4 = function(it) {
  return IndexedObject(requireObjectCoercible$3(it));
};
var documentAll = typeof document == "object" && document.all;
var isCallable$d = typeof documentAll == "undefined" && documentAll !== void 0 ? function(argument) {
  return typeof argument == "function" || argument === documentAll;
} : function(argument) {
  return typeof argument == "function";
};
var isCallable$c = isCallable$d;
var isObject$5 = function(it) {
  return typeof it == "object" ? it !== null : isCallable$c(it);
};
var global$c = global$d;
var isCallable$b = isCallable$d;
var aFunction = function(argument) {
  return isCallable$b(argument) ? argument : void 0;
};
var getBuiltIn$3 = function(namespace, method) {
  return arguments.length < 2 ? aFunction(global$c[namespace]) : global$c[namespace] && global$c[namespace][method];
};
var uncurryThis$a = functionUncurryThis;
var objectIsPrototypeOf = uncurryThis$a({}.isPrototypeOf);
var engineUserAgent = typeof navigator != "undefined" && String(navigator.userAgent) || "";
var global$b = global$d;
var userAgent = engineUserAgent;
var process = global$b.process;
var Deno = global$b.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
  match = v8.split(".");
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}
var engineV8Version = version;
var V8_VERSION = engineV8Version;
var fails$9 = fails$d;
var global$a = global$d;
var $String$4 = global$a.String;
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$9(function() {
  var symbol = Symbol("symbol detection");
  return !$String$4(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});
var NATIVE_SYMBOL$1 = symbolConstructorDetection;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == "symbol";
var getBuiltIn$2 = getBuiltIn$3;
var isCallable$a = isCallable$d;
var isPrototypeOf = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var $Object$2 = Object;
var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function(it) {
  return typeof it == "symbol";
} : function(it) {
  var $Symbol = getBuiltIn$2("Symbol");
  return isCallable$a($Symbol) && isPrototypeOf($Symbol.prototype, $Object$2(it));
};
var $String$3 = String;
var tryToString$1 = function(argument) {
  try {
    return $String$3(argument);
  } catch (error) {
    return "Object";
  }
};
var isCallable$9 = isCallable$d;
var tryToString = tryToString$1;
var $TypeError$5 = TypeError;
var aCallable$1 = function(argument) {
  if (isCallable$9(argument)) return argument;
  throw new $TypeError$5(tryToString(argument) + " is not a function");
};
var aCallable = aCallable$1;
var isNullOrUndefined$1 = isNullOrUndefined$3;
var getMethod$2 = function(V, P) {
  var func = V[P];
  return isNullOrUndefined$1(func) ? void 0 : aCallable(func);
};
var call$6 = functionCall;
var isCallable$8 = isCallable$d;
var isObject$4 = isObject$5;
var $TypeError$4 = TypeError;
var ordinaryToPrimitive$1 = function(input, pref) {
  var fn, val2;
  if (pref === "string" && isCallable$8(fn = input.toString) && !isObject$4(val2 = call$6(fn, input))) return val2;
  if (isCallable$8(fn = input.valueOf) && !isObject$4(val2 = call$6(fn, input))) return val2;
  if (pref !== "string" && isCallable$8(fn = input.toString) && !isObject$4(val2 = call$6(fn, input))) return val2;
  throw new $TypeError$4("Can't convert object to primitive value");
};
var sharedStore = { exports: {} };
var global$9 = global$d;
var defineProperty$1 = Object.defineProperty;
var defineGlobalProperty$3 = function(key, value) {
  try {
    defineProperty$1(global$9, key, { value, configurable: true, writable: true });
  } catch (error) {
    global$9[key] = value;
  }
  return value;
};
var globalThis$1 = global$d;
var defineGlobalProperty$2 = defineGlobalProperty$3;
var SHARED = "__core-js_shared__";
var store$3 = sharedStore.exports = globalThis$1[SHARED] || defineGlobalProperty$2(SHARED, {});
(store$3.versions || (store$3.versions = [])).push({
  version: "3.37.0",
  mode: "global",
  copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.37.0/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var sharedStoreExports = sharedStore.exports;
var store$2 = sharedStoreExports;
var shared$4 = function(key, value) {
  return store$2[key] || (store$2[key] = value || {});
};
var requireObjectCoercible$2 = requireObjectCoercible$4;
var $Object$1 = Object;
var toObject$2 = function(argument) {
  return $Object$1(requireObjectCoercible$2(argument));
};
var uncurryThis$9 = functionUncurryThis;
var toObject$1 = toObject$2;
var hasOwnProperty = uncurryThis$9({}.hasOwnProperty);
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$1(it), key);
};
var uncurryThis$8 = functionUncurryThis;
var id = 0;
var postfix = Math.random();
var toString$4 = uncurryThis$8(1 .toString);
var uid$2 = function(key) {
  return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString$4(++id + postfix, 36);
};
var global$8 = global$d;
var shared$3 = shared$4;
var hasOwn$6 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var Symbol$1 = global$8.Symbol;
var WellKnownSymbolsStore = shared$3("wks");
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1["for"] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;
var wellKnownSymbol$5 = function(name) {
  if (!hasOwn$6(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$6(Symbol$1, name) ? Symbol$1[name] : createWellKnownSymbol("Symbol." + name);
  }
  return WellKnownSymbolsStore[name];
};
var call$5 = functionCall;
var isObject$3 = isObject$5;
var isSymbol$1 = isSymbol$2;
var getMethod$1 = getMethod$2;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$4 = wellKnownSymbol$5;
var $TypeError$3 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$4("toPrimitive");
var toPrimitive$1 = function(input, pref) {
  if (!isObject$3(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod$1(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === void 0) pref = "default";
    result = call$5(exoticToPrim, input, pref);
    if (!isObject$3(result) || isSymbol$1(result)) return result;
    throw new $TypeError$3("Can't convert object to primitive value");
  }
  if (pref === void 0) pref = "number";
  return ordinaryToPrimitive(input, pref);
};
var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;
var toPropertyKey$2 = function(argument) {
  var key = toPrimitive(argument, "string");
  return isSymbol(key) ? key : key + "";
};
var global$7 = global$d;
var isObject$2 = isObject$5;
var document$1 = global$7.document;
var EXISTS$1 = isObject$2(document$1) && isObject$2(document$1.createElement);
var documentCreateElement$1 = function(it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};
var DESCRIPTORS$7 = descriptors;
var fails$8 = fails$d;
var createElement = documentCreateElement$1;
var ie8DomDefine = !DESCRIPTORS$7 && !fails$8(function() {
  return Object.defineProperty(createElement("div"), "a", {
    get: function() {
      return 7;
    }
  }).a !== 7;
});
var DESCRIPTORS$6 = descriptors;
var call$4 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$1 = createPropertyDescriptor$2;
var toIndexedObject$3 = toIndexedObject$4;
var toPropertyKey$1 = toPropertyKey$2;
var hasOwn$5 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$3(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) {
  }
  if (hasOwn$5(O, P)) return createPropertyDescriptor$1(!call$4(propertyIsEnumerableModule.f, O, P), O[P]);
};
var objectDefineProperty = {};
var DESCRIPTORS$5 = descriptors;
var fails$7 = fails$d;
var v8PrototypeDefineBug = DESCRIPTORS$5 && fails$7(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: false
  }).prototype !== 42;
});
var isObject$1 = isObject$5;
var $String$2 = String;
var $TypeError$2 = TypeError;
var anObject$7 = function(argument) {
  if (isObject$1(argument)) return argument;
  throw new $TypeError$2($String$2(argument) + " is not an object");
};
var DESCRIPTORS$4 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$6 = anObject$7;
var toPropertyKey = toPropertyKey$2;
var $TypeError$1 = TypeError;
var $defineProperty = Object.defineProperty;
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE$1 = "configurable";
var WRITABLE = "writable";
objectDefineProperty.f = DESCRIPTORS$4 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$6(O);
  P = toPropertyKey(P);
  anObject$6(Attributes);
  if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }
  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty2(O, P, Attributes) {
  anObject$6(O);
  P = toPropertyKey(P);
  anObject$6(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
  }
  if ("get" in Attributes || "set" in Attributes) throw new $TypeError$1("Accessors not supported");
  if ("value" in Attributes) O[P] = Attributes.value;
  return O;
};
var DESCRIPTORS$3 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$2;
var createNonEnumerableProperty$3 = DESCRIPTORS$3 ? function(object, key, value) {
  return definePropertyModule$3.f(object, key, createPropertyDescriptor(1, value));
} : function(object, key, value) {
  object[key] = value;
  return object;
};
var makeBuiltIn$2 = { exports: {} };
var DESCRIPTORS$2 = descriptors;
var hasOwn$4 = hasOwnProperty_1;
var FunctionPrototype = Function.prototype;
var getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn$4(FunctionPrototype, "name");
var PROPER = EXISTS && function something() {
}.name === "something";
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$2 || DESCRIPTORS$2 && getDescriptor(FunctionPrototype, "name").configurable);
var functionName = {
  EXISTS,
  PROPER,
  CONFIGURABLE
};
var uncurryThis$7 = functionUncurryThis;
var isCallable$7 = isCallable$d;
var store$1 = sharedStoreExports;
var functionToString = uncurryThis$7(Function.toString);
if (!isCallable$7(store$1.inspectSource)) {
  store$1.inspectSource = function(it) {
    return functionToString(it);
  };
}
var inspectSource$1 = store$1.inspectSource;
var global$6 = global$d;
var isCallable$6 = isCallable$d;
var WeakMap$2 = global$6.WeakMap;
var weakMapBasicDetection = isCallable$6(WeakMap$2) && /native code/.test(String(WeakMap$2));
var shared$2 = shared$4;
var uid = uid$2;
var keys = shared$2("keys");
var sharedKey$2 = function(key) {
  return keys[key] || (keys[key] = uid(key));
};
var hiddenKeys$4 = {};
var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$5 = global$d;
var isObject = isObject$5;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;
var hasOwn$3 = hasOwnProperty_1;
var shared$1 = sharedStoreExports;
var sharedKey$1 = sharedKey$2;
var hiddenKeys$3 = hiddenKeys$4;
var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError$1 = global$5.TypeError;
var WeakMap$1 = global$5.WeakMap;
var set, get, has;
var enforce = function(it) {
  return has(it) ? get(it) : set(it, {});
};
var getterFor = function(TYPE) {
  return function(it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError$1("Incompatible receiver, " + TYPE + " required");
    }
    return state;
  };
};
if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap$1());
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  set = function(it, metadata) {
    if (store.has(it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function(it) {
    return store.get(it) || {};
  };
  has = function(it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey$1("state");
  hiddenKeys$3[STATE] = true;
  set = function(it, metadata) {
    if (hasOwn$3(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$2(it, STATE, metadata);
    return metadata;
  };
  get = function(it) {
    return hasOwn$3(it, STATE) ? it[STATE] : {};
  };
  has = function(it) {
    return hasOwn$3(it, STATE);
  };
}
var internalState = {
  set,
  get,
  has,
  enforce,
  getterFor
};
var uncurryThis$6 = functionUncurryThis;
var fails$6 = fails$d;
var isCallable$5 = isCallable$d;
var hasOwn$2 = hasOwnProperty_1;
var DESCRIPTORS$1 = descriptors;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var inspectSource = inspectSource$1;
var InternalStateModule = internalState;
var enforceInternalState = InternalStateModule.enforce;
var getInternalState$1 = InternalStateModule.get;
var $String$1 = String;
var defineProperty3 = Object.defineProperty;
var stringSlice$4 = uncurryThis$6("".slice);
var replace$2 = uncurryThis$6("".replace);
var join2 = uncurryThis$6([].join);
var CONFIGURABLE_LENGTH = DESCRIPTORS$1 && !fails$6(function() {
  return defineProperty3(function() {
  }, "length", { value: 8 }).length !== 8;
});
var TEMPLATE = String(String).split("String");
var makeBuiltIn$1 = makeBuiltIn$2.exports = function(value, name, options) {
  if (stringSlice$4($String$1(name), 0, 7) === "Symbol(") {
    name = "[" + replace$2($String$1(name), /^Symbol\(([^)]*)\).*$/, "$1") + "]";
  }
  if (options && options.getter) name = "get " + name;
  if (options && options.setter) name = "set " + name;
  if (!hasOwn$2(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
    if (DESCRIPTORS$1) defineProperty3(value, "name", { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$2(options, "arity") && value.length !== options.arity) {
    defineProperty3(value, "length", { value: options.arity });
  }
  try {
    if (options && hasOwn$2(options, "constructor") && options.constructor) {
      if (DESCRIPTORS$1) defineProperty3(value, "prototype", { writable: false });
    } else if (value.prototype) value.prototype = void 0;
  } catch (error) {
  }
  var state = enforceInternalState(value);
  if (!hasOwn$2(state, "source")) {
    state.source = join2(TEMPLATE, typeof name == "string" ? name : "");
  }
  return value;
};
Function.prototype.toString = makeBuiltIn$1(function toString2() {
  return isCallable$5(this) && getInternalState$1(this).source || inspectSource(this);
}, "toString");
var makeBuiltInExports = makeBuiltIn$2.exports;
var isCallable$4 = isCallable$d;
var definePropertyModule$2 = objectDefineProperty;
var makeBuiltIn = makeBuiltInExports;
var defineGlobalProperty$1 = defineGlobalProperty$3;
var defineBuiltIn$2 = function(O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== void 0 ? options.name : key;
  if (isCallable$4(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) {
    }
    if (simple) O[key] = value;
    else definePropertyModule$2.f(O, key, {
      value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  }
  return O;
};
var objectGetOwnPropertyNames = {};
var ceil = Math.ceil;
var floor$1 = Math.floor;
var mathTrunc = Math.trunc || function trunc(x) {
  var n2 = +x;
  return (n2 > 0 ? floor$1 : ceil)(n2);
};
var trunc2 = mathTrunc;
var toIntegerOrInfinity$4 = function(argument) {
  var number = +argument;
  return number !== number || number === 0 ? 0 : trunc2(number);
};
var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;
var max$1 = Math.max;
var min$2 = Math.min;
var toAbsoluteIndex$1 = function(index, length) {
  var integer = toIntegerOrInfinity$3(index);
  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
};
var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;
var min$1 = Math.min;
var toLength$2 = function(argument) {
  var len = toIntegerOrInfinity$2(argument);
  return len > 0 ? min$1(len, 9007199254740991) : 0;
};
var toLength$1 = toLength$2;
var lengthOfArrayLike$1 = function(obj) {
  return toLength$1(obj.length);
};
var toIndexedObject$2 = toIndexedObject$4;
var toAbsoluteIndex = toAbsoluteIndex$1;
var lengthOfArrayLike = lengthOfArrayLike$1;
var createMethod$1 = function(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O = toIndexedObject$2($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      if (value !== value) return true;
    }
    else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};
var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$1(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$1(false)
};
var uncurryThis$5 = functionUncurryThis;
var hasOwn$1 = hasOwnProperty_1;
var toIndexedObject$1 = toIndexedObject$4;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;
var push$1 = uncurryThis$5([].push);
var objectKeysInternal = function(object, names) {
  var O = toIndexedObject$1(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$1(hiddenKeys$2, key) && hasOwn$1(O, key) && push$1(result, key);
  while (names.length > i) if (hasOwn$1(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$1(result, key);
  }
  return result;
};
var enumBugKeys$3 = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
];
var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;
var hiddenKeys$1 = enumBugKeys$2.concat("length", "prototype");
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};
var objectGetOwnPropertySymbols = {};
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
var getBuiltIn$1 = getBuiltIn$3;
var uncurryThis$4 = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$5 = anObject$7;
var concat$1 = uncurryThis$4([].concat);
var ownKeys$1 = getBuiltIn$1("Reflect", "ownKeys") || function ownKeys(it) {
  var keys3 = getOwnPropertyNamesModule.f(anObject$5(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat$1(keys3, getOwnPropertySymbols(it)) : keys3;
};
var hasOwn2 = hasOwnProperty_1;
var ownKeys2 = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$1 = objectDefineProperty;
var copyConstructorProperties$1 = function(target, source, exceptions) {
  var keys3 = ownKeys2(source);
  var defineProperty4 = definePropertyModule$1.f;
  var getOwnPropertyDescriptor3 = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys3.length; i++) {
    var key = keys3[i];
    if (!hasOwn2(target, key) && !(exceptions && hasOwn2(exceptions, key))) {
      defineProperty4(target, key, getOwnPropertyDescriptor3(source, key));
    }
  }
};
var fails$5 = fails$d;
var isCallable$3 = isCallable$d;
var replacement = /#|\.prototype\./;
var isForced$1 = function(feature, detection) {
  var value = data[normalize2(feature)];
  return value === POLYFILL ? true : value === NATIVE ? false : isCallable$3(detection) ? fails$5(detection) : !!detection;
};
var normalize2 = isForced$1.normalize = function(string) {
  return String(string).replace(replacement, ".").toLowerCase();
};
var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = "N";
var POLYFILL = isForced$1.POLYFILL = "P";
var isForced_1 = isForced$1;
var global$4 = global$d;
var getOwnPropertyDescriptor2 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;
var defineBuiltIn$1 = defineBuiltIn$2;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced = isForced_1;
var _export = function(options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$4;
  } else if (STATIC) {
    target = global$4[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = global$4[TARGET] && global$4[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor2(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
    if (!FORCED && targetProperty !== void 0) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty$1(sourceProperty, "sham", true);
    }
    defineBuiltIn$1(target, key, sourceProperty, options);
  }
};
var wellKnownSymbol$3 = wellKnownSymbol$5;
var TO_STRING_TAG$1 = wellKnownSymbol$3("toStringTag");
var test = {};
test[TO_STRING_TAG$1] = "z";
var toStringTagSupport = String(test) === "[object z]";
var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$2 = isCallable$d;
var classofRaw = classofRaw$1;
var wellKnownSymbol$2 = wellKnownSymbol$5;
var TO_STRING_TAG = wellKnownSymbol$2("toStringTag");
var $Object = Object;
var CORRECT_ARGUMENTS = classofRaw(/* @__PURE__ */ function() {
  return arguments;
}()) === "Arguments";
var tryGet = function(it, key) {
  try {
    return it[key];
  } catch (error) {
  }
};
var classof$2 = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
  var O, tag, result;
  return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) === "Object" && isCallable$2(O.callee) ? "Arguments" : result;
};
var classof$1 = classof$2;
var $String = String;
var toString$3 = function(argument) {
  if (classof$1(argument) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
  return $String(argument);
};
var anObject$4 = anObject$7;
var regexpFlags$1 = function() {
  var that = anObject$4(this);
  var result = "";
  if (that.hasIndices) result += "d";
  if (that.global) result += "g";
  if (that.ignoreCase) result += "i";
  if (that.multiline) result += "m";
  if (that.dotAll) result += "s";
  if (that.unicode) result += "u";
  if (that.unicodeSets) result += "v";
  if (that.sticky) result += "y";
  return result;
};
var fails$4 = fails$d;
var global$3 = global$d;
var $RegExp$2 = global$3.RegExp;
var UNSUPPORTED_Y$1 = fails$4(function() {
  var re2 = $RegExp$2("a", "y");
  re2.lastIndex = 2;
  return re2.exec("abcd") !== null;
});
var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$4(function() {
  return !$RegExp$2("a", "y").sticky;
});
var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$4(function() {
  var re2 = $RegExp$2("^r", "gy");
  re2.lastIndex = 2;
  return re2.exec("str") !== null;
});
var regexpStickyHelpers = {
  BROKEN_CARET,
  MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y$1
};
var objectDefineProperties = {};
var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;
var objectKeys$1 = Object.keys || function keys2(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};
var DESCRIPTORS = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule = objectDefineProperty;
var anObject$3 = anObject$7;
var toIndexedObject = toIndexedObject$4;
var objectKeys = objectKeys$1;
objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$3(O);
  var props = toIndexedObject(Properties);
  var keys3 = objectKeys(Properties);
  var length = keys3.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys3[index++], props[key]);
  return O;
};
var getBuiltIn = getBuiltIn$3;
var html$1 = getBuiltIn("document", "documentElement");
var anObject$2 = anObject$7;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html = html$1;
var documentCreateElement = documentCreateElement$1;
var sharedKey = sharedKey$2;
var GT = ">";
var LT = "<";
var PROTOTYPE = "prototype";
var SCRIPT = "script";
var IE_PROTO = sharedKey("IE_PROTO");
var EmptyConstructor = function() {
};
var scriptTag = function(content) {
  return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
};
var NullProtoObjectViaActiveX = function(activeXDocument2) {
  activeXDocument2.write(scriptTag(""));
  activeXDocument2.close();
  var temp = activeXDocument2.parentWindow.Object;
  activeXDocument2 = null;
  return temp;
};
var NullProtoObjectViaIFrame = function() {
  var iframe = documentCreateElement("iframe");
  var JS = "java" + SCRIPT + ":";
  var iframeDocument;
  iframe.style.display = "none";
  html.appendChild(iframe);
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag("document.F=Object"));
  iframeDocument.close();
  return iframeDocument.F;
};
var activeXDocument;
var NullProtoObject = function() {
  try {
    activeXDocument = new ActiveXObject("htmlfile");
  } catch (error) {
  }
  NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};
hiddenKeys[IE_PROTO] = true;
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$2(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
};
var fails$3 = fails$d;
var global$2 = global$d;
var $RegExp$1 = global$2.RegExp;
var regexpUnsupportedDotAll = fails$3(function() {
  var re2 = $RegExp$1(".", "s");
  return !(re2.dotAll && re2.test("\n") && re2.flags === "s");
});
var fails$2 = fails$d;
var global$1 = global$d;
var $RegExp = global$1.RegExp;
var regexpUnsupportedNcg = fails$2(function() {
  var re2 = $RegExp("(?<a>b)", "g");
  return re2.exec("b").groups.a !== "b" || "b".replace(re2, "$<a>c") !== "bc";
});
var call$3 = functionCall;
var uncurryThis$3 = functionUncurryThis;
var toString$2 = toString$3;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = shared$4;
var create2 = objectCreate;
var getInternalState = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;
var nativeReplace = shared("native-string-replace", String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$3 = uncurryThis$3("".charAt);
var indexOf = uncurryThis$3("".indexOf);
var replace$1 = uncurryThis$3("".replace);
var stringSlice$3 = uncurryThis$3("".slice);
var UPDATES_LAST_INDEX_WRONG = function() {
  var re1 = /a/;
  var re2 = /b*/g;
  call$3(nativeExec, re1, "a");
  call$3(nativeExec, re2, "a");
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}();
var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;
var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
if (PATCH) {
  patchedExec = function exec2(string) {
    var re2 = this;
    var state = getInternalState(re2);
    var str = toString$2(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match2, i, object, group;
    if (raw) {
      raw.lastIndex = re2.lastIndex;
      result = call$3(patchedExec, raw, str);
      re2.lastIndex = raw.lastIndex;
      return result;
    }
    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re2.sticky;
    var flags = call$3(regexpFlags, re2);
    var source = re2.source;
    var charsAdded = 0;
    var strCopy = str;
    if (sticky) {
      flags = replace$1(flags, "y", "");
      if (indexOf(flags, "g") === -1) {
        flags += "g";
      }
      strCopy = stringSlice$3(str, re2.lastIndex);
      if (re2.lastIndex > 0 && (!re2.multiline || re2.multiline && charAt$3(str, re2.lastIndex - 1) !== "\n")) {
        source = "(?: " + source + ")";
        strCopy = " " + strCopy;
        charsAdded++;
      }
      reCopy = new RegExp("^(?:" + source + ")", flags);
    }
    if (NPCG_INCLUDED) {
      reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re2.lastIndex;
    match2 = call$3(nativeExec, sticky ? reCopy : re2, strCopy);
    if (sticky) {
      if (match2) {
        match2.input = stringSlice$3(match2.input, charsAdded);
        match2[0] = stringSlice$3(match2[0], charsAdded);
        match2.index = re2.lastIndex;
        re2.lastIndex += match2[0].length;
      } else re2.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match2) {
      re2.lastIndex = re2.global ? match2.index + match2[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match2 && match2.length > 1) {
      call$3(nativeReplace, match2[0], reCopy, function() {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === void 0) match2[i] = void 0;
        }
      });
    }
    if (match2 && groups) {
      match2.groups = object = create2(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match2[group[1]];
      }
    }
    return match2;
  };
}
var regexpExec$2 = patchedExec;
var $ = _export;
var exec = regexpExec$2;
$({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
  exec
});
var call$2 = functionCall;
var defineBuiltIn = defineBuiltIn$2;
var regexpExec$1 = regexpExec$2;
var fails$1 = fails$d;
var wellKnownSymbol$1 = wellKnownSymbol$5;
var createNonEnumerableProperty = createNonEnumerableProperty$3;
var SPECIES = wellKnownSymbol$1("species");
var RegExpPrototype = RegExp.prototype;
var fixRegexpWellKnownSymbolLogic = function(KEY, exec2, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$1(KEY);
  var DELEGATES_TO_SYMBOL = !fails$1(function() {
    var O = {};
    O[SYMBOL] = function() {
      return 7;
    };
    return ""[KEY](O) !== 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$1(function() {
    var execCalled = false;
    var re2 = /a/;
    if (KEY === "split") {
      re2 = {};
      re2.constructor = {};
      re2.constructor[SPECIES] = function() {
        return re2;
      };
      re2.flags = "";
      re2[SYMBOL] = /./[SYMBOL];
    }
    re2.exec = function() {
      execCalled = true;
      return null;
    };
    re2[SYMBOL]("");
    return !execCalled;
  });
  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec2(SYMBOL, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
      var $exec = regexp.exec;
      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          return { done: true, value: call$2(nativeRegExpMethod, regexp, str, arg2) };
        }
        return { done: true, value: call$2(nativeMethod, str, regexp, arg2) };
      }
      return { done: false };
    });
    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }
  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], "sham", true);
};
var uncurryThis$2 = functionUncurryThis;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
var toString$1 = toString$3;
var requireObjectCoercible$1 = requireObjectCoercible$4;
var charAt$2 = uncurryThis$2("".charAt);
var charCodeAt = uncurryThis$2("".charCodeAt);
var stringSlice$2 = uncurryThis$2("".slice);
var createMethod = function(CONVERT_TO_STRING) {
  return function($this, pos) {
    var S = toString$1(requireObjectCoercible$1($this));
    var position = toIntegerOrInfinity$1(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? "" : void 0;
    first = charCodeAt(S, position);
    return first < 55296 || first > 56319 || position + 1 === size || (second = charCodeAt(S, position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? charAt$2(S, position) : first : CONVERT_TO_STRING ? stringSlice$2(S, position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
  };
};
var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};
var charAt$1 = stringMultibyte.charAt;
var advanceStringIndex$1 = function(S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
};
var uncurryThis$1 = functionUncurryThis;
var toObject = toObject$2;
var floor = Math.floor;
var charAt = uncurryThis$1("".charAt);
var replace = uncurryThis$1("".replace);
var stringSlice$1 = uncurryThis$1("".slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
var getSubstitution$1 = function(matched, str, position, captures, namedCaptures, replacement2) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== void 0) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement2, symbols, function(match2, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case "$":
        return "$";
      case "&":
        return matched;
      case "`":
        return stringSlice$1(str, 0, position);
      case "'":
        return stringSlice$1(str, tailPos);
      case "<":
        capture = namedCaptures[stringSlice$1(ch, 1, -1)];
        break;
      default:
        var n2 = +ch;
        if (n2 === 0) return match2;
        if (n2 > m) {
          var f2 = floor(n2 / 10);
          if (f2 === 0) return match2;
          if (f2 <= m) return captures[f2 - 1] === void 0 ? charAt(ch, 1) : captures[f2 - 1] + charAt(ch, 1);
          return match2;
        }
        capture = captures[n2 - 1];
    }
    return capture === void 0 ? "" : capture;
  });
};
var call$1 = functionCall;
var anObject$1 = anObject$7;
var isCallable$1 = isCallable$d;
var classof = classofRaw$1;
var regexpExec = regexpExec$2;
var $TypeError = TypeError;
var regexpExecAbstract = function(R, S) {
  var exec2 = R.exec;
  if (isCallable$1(exec2)) {
    var result = call$1(exec2, R, S);
    if (result !== null) anObject$1(result);
    return result;
  }
  if (classof(R) === "RegExp") return call$1(regexpExec, R, S);
  throw new $TypeError("RegExp#exec called on incompatible receiver");
};
var apply = functionApply;
var call = functionCall;
var uncurryThis = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var fails = fails$d;
var anObject = anObject$7;
var isCallable = isCallable$d;
var isNullOrUndefined = isNullOrUndefined$3;
var toIntegerOrInfinity = toIntegerOrInfinity$4;
var toLength = toLength$2;
var toString3 = toString$3;
var requireObjectCoercible = requireObjectCoercible$4;
var advanceStringIndex = advanceStringIndex$1;
var getMethod = getMethod$2;
var getSubstitution = getSubstitution$1;
var regExpExec = regexpExecAbstract;
var wellKnownSymbol = wellKnownSymbol$5;
var REPLACE = wellKnownSymbol("replace");
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis("".indexOf);
var stringSlice = uncurryThis("".slice);
var maybeToString = function(it) {
  return it === void 0 ? it : String(it);
};
var REPLACE_KEEPS_$0 = function() {
  return "a".replace(/./, "$0") === "$0";
}();
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
  if (/./[REPLACE]) {
    return /./[REPLACE]("a", "$0") === "";
  }
  return false;
}();
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
  var re2 = /./;
  re2.exec = function() {
    var result = [];
    result.groups = { a: "7" };
    return result;
  };
  return "".replace(re2, "$<a>") !== "7";
});
fixRegExpWellKnownSymbolLogic("replace", function(_2, nativeReplace2, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace2(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = isNullOrUndefined(searchValue) ? void 0 : getMethod(searchValue, REPLACE);
      return replacer ? call(replacer, searchValue, O, replaceValue) : call(nativeReplace2, toString3(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function(string, replaceValue) {
      var rx = anObject(this);
      var S = toString3(string);
      if (typeof replaceValue == "string" && stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf(replaceValue, "$<") === -1) {
        var res = maybeCallNative(nativeReplace2, rx, S, replaceValue);
        if (res.done) return res.value;
      }
      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString3(replaceValue);
      var global2 = rx.global;
      var fullUnicode;
      if (global2) {
        fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      var result;
      while (true) {
        result = regExpExec(rx, S);
        if (result === null) break;
        push(results, result);
        if (!global2) break;
        var matchStr = toString3(result[0]);
        if (matchStr === "") rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = "";
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = toString3(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        var replacement2;
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== void 0) push(replacerArgs, namedCaptures);
          replacement2 = toString3(apply(replaceValue, void 0, replacerArgs));
        } else {
          replacement2 = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement2;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);
Object.defineProperty(dist, "__esModule", {
  value: true
});
dist.generateUrl = dist.generateRemoteUrl = dist.generateOcsUrl = dist.generateFilePath = void 0;
dist.getAppRootUrl = getAppRootUrl;
dist.getRootUrl = getRootUrl;
dist.linkTo = dist.imagePath = void 0;
const linkTo = (app, file) => generateFilePath(app, "", file);
dist.linkTo = linkTo;
const linkToRemoteBase = (service) => getRootUrl() + "/remote.php/" + service;
const generateRemoteUrl = (service) => window.location.protocol + "//" + window.location.host + linkToRemoteBase(service);
dist.generateRemoteUrl = generateRemoteUrl;
const generateOcsUrl = (url, params, options) => {
  const allOptions = Object.assign({
    ocsVersion: 2
  }, options || {});
  const version2 = allOptions.ocsVersion === 1 ? 1 : 2;
  return window.location.protocol + "//" + window.location.host + getRootUrl() + "/ocs/v" + version2 + ".php" + _generateUrlPath(url, params, options);
};
dist.generateOcsUrl = generateOcsUrl;
const _generateUrlPath = (url, params, options) => {
  const allOptions = Object.assign({
    escape: true
  }, options || {});
  const _build = function(text2, vars) {
    vars = vars || {};
    return text2.replace(/{([^{}]*)}/g, function(a, b) {
      var r2 = vars[b];
      if (allOptions.escape) {
        return typeof r2 === "string" || typeof r2 === "number" ? encodeURIComponent(r2.toString()) : encodeURIComponent(a);
      } else {
        return typeof r2 === "string" || typeof r2 === "number" ? r2.toString() : a;
      }
    });
  };
  if (url.charAt(0) !== "/") {
    url = "/" + url;
  }
  return _build(url, params || {});
};
const generateUrl = (url, params, options) => {
  var _window;
  const allOptions = Object.assign({
    noRewrite: false
  }, options || {});
  if (((_window = window) === null || _window === void 0 || (_window = _window.OC) === null || _window === void 0 || (_window = _window.config) === null || _window === void 0 ? void 0 : _window.modRewriteWorking) === true && !allOptions.noRewrite) {
    return getRootUrl() + _generateUrlPath(url, params, options);
  }
  return getRootUrl() + "/index.php" + _generateUrlPath(url, params, options);
};
dist.generateUrl = generateUrl;
const imagePath = (app, file) => {
  if (file.indexOf(".") === -1) {
    return generateFilePath(app, "img", file + ".svg");
  }
  return generateFilePath(app, "img", file);
};
dist.imagePath = imagePath;
const generateFilePath = (app, type, file) => {
  var _window2;
  const isCore = ((_window2 = window) === null || _window2 === void 0 || (_window2 = _window2.OC) === null || _window2 === void 0 || (_window2 = _window2.coreApps) === null || _window2 === void 0 ? void 0 : _window2.indexOf(app)) !== -1;
  let link = getRootUrl();
  if (file.substring(file.length - 3) === "php" && !isCore) {
    link += "/index.php/apps/" + app;
    if (file !== "index.php") {
      link += "/";
      if (type) {
        link += encodeURI(type + "/");
      }
      link += file;
    }
  } else if (file.substring(file.length - 3) !== "php" && !isCore) {
    link = getAppRootUrl(app);
    if (type) {
      link += "/" + type + "/";
    }
    if (link.substring(link.length - 1) !== "/") {
      link += "/";
    }
    link += file;
  } else {
    if ((app === "settings" || app === "core" || app === "search") && type === "ajax") {
      link += "/index.php/";
    } else {
      link += "/";
    }
    if (!isCore) {
      link += "apps/";
    }
    if (app !== "") {
      app += "/";
      link += app;
    }
    if (type) {
      link += type + "/";
    }
    link += file;
  }
  return link;
};
dist.generateFilePath = generateFilePath;
function getRootUrl() {
  let webroot = window._oc_webroot;
  if (typeof webroot === "undefined") {
    webroot = location.pathname;
    const pos = webroot.indexOf("/index.php/");
    if (pos !== -1) {
      webroot = webroot.substr(0, pos);
    } else {
      webroot = webroot.substr(0, webroot.lastIndexOf("/"));
    }
  }
  return webroot;
}
function getAppRootUrl(app) {
  var _window$_oc_appswebro, _webroots$app;
  const webroots = (_window$_oc_appswebro = window._oc_appswebroots) !== null && _window$_oc_appswebro !== void 0 ? _window$_oc_appswebro : {};
  return (_webroots$app = webroots[app]) !== null && _webroots$app !== void 0 ? _webroots$app : "";
}
function getAppTranslations(appId) {
  var _a2, _b, _c, _d;
  return {
    translations: (_b = (_a2 = window._oc_l10n_registry_translations) === null || _a2 === void 0 ? void 0 : _a2[appId]) !== null && _b !== void 0 ? _b : {},
    pluralFunction: (_d = (_c = window._oc_l10n_registry_plural_functions) === null || _c === void 0 ? void 0 : _c[appId]) !== null && _d !== void 0 ? _d : (number) => number
  };
}
function translate(app, text2, vars, number, options) {
  const defaultOptions = {
    escape: true,
    sanitize: true
  };
  const allOptions = Object.assign({}, defaultOptions, {});
  const identity = (value) => value;
  const optSanitize = allOptions.sanitize ? purify.sanitize : identity;
  allOptions.escape ? escapeHTML : identity;
  const bundle = getAppTranslations(app);
  let translation = bundle.translations[text2] || text2;
  translation = Array.isArray(translation) ? translation[0] : translation;
  {
    return optSanitize(translation);
  }
}
const FolderZipSvg = '<svg xmlns="http://www.w3.org/2000/svg" id="mdi-folder-zip" viewBox="0 0 24 24"><path d="M20 6H12L10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6M18 12H16V14H18V16H16V18H14V16H16V14H14V12H16V10H14V8H16V10H18V12Z" /></svg>';
/*! third party licenses: js/vendor.LICENSE.txt */
const action = new FileAction({
  id: "extract",
  displayName: () => translate("extract", "Extract here"),
  iconSvgInline: () => FolderZipSvg,
  // Only works on single files
  enabled(nodes) {
    if (nodes.length !== 1) {
      return false;
    }
    if (nodes[0].attributes.getcontenttype === "application/zip" || nodes[0].attributes.getcontenttype === "application/x-tar" || nodes[0].attributes.getcontenttype === "application/gzip" || nodes[0].attributes.getcontenttype === "application/x-rar-compressed" || nodes[0].attributes.getcontenttype === "application/x-7z-compressed" || nodes[0].attributes.getcontenttype === "application/x-deb" || nodes[0].attributes.getcontenttype === "application/x-bzip2") {
      return (nodes[0].permissions & Permission.UPDATE) !== 0;
    }
    return false;
  },
  async exec(node, view, dir) {
    var data2 = {
      nameOfFile: node.attributes.basename,
      directory: dir,
      external: node.attributes["mount-type"].startsWith("external") ? 1 : 0,
      mime: node.attributes.mime
    };
    const url = _("/apps/extract/ajax/extract.php");
    cancelableClient.post(url, data2).then((resp) => resp.data).then((data22) => {
      const time = data22["extracted"]["mtime"] * 1e3;
      const folder = new Folder({
        id: data22["extracted"]["fileId"],
        source: data22["extracted"]["source"],
        root: data22["extracted"]["root"],
        owner: data22["extracted"]["owner"],
        permissions: data22["extracted"]["permissions"],
        mtime: new Date(time),
        // Include mount-type from parent folder as this is inherited
        attributes: {
          "mount-type": data22["extracted"]["mount-type"],
          "owner-id": data22["extracted"]["owner"],
          "owner-display-name": data22["extracted"]["owner-display-name"]
        }
      });
      emit("files:node:created", folder);
      window.OCP.Files.Router.goToRoute(
        null,
        // use default route
        { view: "files", fileid: data22["fileId"] },
        { dir }
      );
      return null;
    }).catch((error) => {
      console.log("Could not send extract request.");
      console.log(error);
    });
    return null;
  },
  order: 25
});
export {
  action as a,
  registerFileAction as r
};
//# sourceMappingURL=extract-extractAction.mjs.map
