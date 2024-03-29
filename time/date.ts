// deno-lint-ignore-file ban-types

declare global {
  interface Date {
    timezoneOffset: number;
    add(diff: number, unit?: UnitType): Date;
    getTimezone(): number; //hours offset
    _getTime: Function;
    _setTime: Function;
    format(form?: string): string;
    diff(d: Date, unit?: UnitType): number;
    startOf(diff: number, unit: UnitType): Date;
    endOf(diff: number, unit: UnitType): Date;
    _toString(): string;
    unitWeight: typeof unitWeight;
    clone(): Date;
    setYear(s: string | number): number;
    setMonth(s: string | number): number;
    setDate(s: string | number): number;
    setHours(s: string | number): number;
    setMinutes(s: string | number): number;
    setSeconds(s: string | number): number;
    setTimezone(hours: number, minutes?: number): Date;
    parseTime(s: string, formate?: string): Date;
  }
}
/**
 * Store timezone
 */
Date.prototype.timezoneOffset = new Date().getTimezoneOffset();
Date.prototype.getTimezoneOffset = function () {
  return this.timezoneOffset;
};

/**
 * Get timezone(hours offset)
 */
Date.prototype.getTimezone = function () {
  return -this.timezoneOffset / 60;
};

/**
 * Set timezone (do not change realtime)
 */
Date.prototype.setTimezone = function (hours = 0, minutes = 0) {
  const timezoneOffset = -hours * 60 - minutes;
  const offset = timezoneOffset - this.timezoneOffset;
  const d = new Date(this._getTime() - offset * 60 * 1000);
  d.timezoneOffset = timezoneOffset;
  return d;
};

/**
 * real gettime
 */
Date.prototype._getTime = Date.prototype.getTime;
/**
 * real gettime
 */
Date.prototype.getTime = function () {
  return (
    this._getTime() +
    (this.timezoneOffset - Date.prototype.timezoneOffset) * 60 * 1000
  );
};

/**
 * Override valueOf with realtime
 */
Date.prototype.valueOf = Date.prototype.getTime;
Date.prototype._setTime = Date.prototype.setTime;
Date.prototype.setTime = function (ms) {
  ms -= (this.timezoneOffset - Date.prototype.timezoneOffset) * 60 * 1000;
  return this._setTime(ms);
};


/**
 * todo: new toString
 */
Date.prototype._toString = Date.prototype.toString;
Date.prototype.toString = function () {
  return this.format();
};

/**
 * Time unit
 */
const unitWeight = {
  Y: 365 * 86400 * 1000,
  y: 365 * 86400 * 1000,
  m: 30 * 86400 * 1000,
  w: 7 * 86400 * 1000,
  d: 86400 * 1000,
  H: 3600000,
  M: 60000,
  S: 1000,
  f: 1,
};

Date.prototype.unitWeight = unitWeight;
/**
 * Diff time
 */
Date.prototype.diff = function (d: Date, unit = 'S') {
  const weight = this.unitWeight[unit] || 1000;
  return ((+this) - (+d)) / weight;
};

/**
 * Clone with zone
 */
Date.prototype.clone = function () {
  const d = new Date(this._getTime());
  d.timezoneOffset = this.timezoneOffset;
  return d;
};

/**
 * Add time
 */
Date.prototype.add = function (n = 0, unit = 'S') {
  const d = this.clone();
  const weight = this.unitWeight[unit] || 1000;
  d._setTime(this._getTime() + n * weight);
  return d;
};

Date.prototype.startOf = function (n = 0, unit = 'S') {
  let format, d;
  switch (unit) {
    case 'Y':
      d = new Date(this.format('%Y-06-01T00:00:00.000%z'));
      break;
    case 'm':
      d = new Date(this.format('%Y-%m-15T00:00:00.000%z'));
      break;
    default:
      d = this;
  }
  format = {
    f: format = '%Y-%m-%dT%H:%M:%S.%f%z',
    S: format = '%Y-%m-%dT%H:%M:%S.000%z',
    M: format = '%Y-%m-%dT%H:%M:00.000%z',
    H: format = '%Y-%m-%dT%H:00:00.000%z',
    d: format = '%Y-%m-%dT00:00:00.000%z',
    w: format = '%Y-%m-%dT00:00:00.000%z',
    m: format = '%Y-%m-01T00:00:00.000%z',
    y: format = '%Y-01-01T00:00:00.000%z',
    Y: format = '%Y-01-01T00:00:00.000%z',
  }[unit];
  if (unit == 'w') {
    const day = d.getDay();
    const diff_day = day > 0 ? 1 - day : -6;
    d = d.add(diff_day, 'd');
  }
  d = new Date(d.add(n, unit).format(format));
  return d;
};
Date.prototype.endOf = function (n = 0, unit = 'S') {
  return this.startOf(n + 1, unit).add(-1, 'f');
};

//(new Date()).format()
Date.prototype.format = function (format = '%Y-%m-%dT%H:%M:%S%z') {
  // deno-lint-ignore no-this-alias
  const d = this;
  const hours = this.getHours();
  const pairs = {
    '%Y': d.getFullYear().toString(),
    '%m': (d.getMonth() + 1 + '').padStart(2, '0'),
    '%d': ('0' + d.getDate()).slice(-2),
    '%H': ('' + d.getHours()).padStart(2, '0'),
    '%M': ('' + d.getMinutes()).padStart(2, '0'),
    '%S': ('' + d.getSeconds()).padStart(2, '0'),
    '%f': ('' + d.getMilliseconds()).padStart(3, '0'),
    '%s': ((d.getTime() / 1000) | 0) + '', //unixTimestamp
    '%I': hours % 12 == 0 ? '12' : ('0' + (hours % 12)).slice(-2),
    '%w': d.getDay().toString(),
    '%z': () => {
      const offset = -d.getTimezoneOffset() / 60;
      let zone = '';
      if (offset >= 0) {
        zone += '+' + ('' + offset).padStart(2, '0') + ':00';
      } else {
        zone += '-' + ('' + -offset).padStart(2, '0') + ':00';
      }
      return zone;
    },
  };
  type PairsKey = keyof typeof pairs;
  return format.replace(/%./g, key => {
    const value = pairs[key as PairsKey];
    if (value) {
      return value instanceof Function ? value() : value;
    } else {
      return key.replace('%', '');
    }
  });
};
//new Date().format('%Y-%m-%d %H:%M:%S%z')

//Date.parseTime('2017-10-31')
Date.prototype.parseTime = function (str: string, format = undefined) {
  if (!format) {
    return new Date(str);
  }
  const d = new Date('1970-01-01T00:00:00.000Z');
  const formatMatches = format.match(/%.|./g);
  if (!formatMatches) {
    throw new Error("bad date from format '" + format + "'");
  }
  for (const s of formatMatches!) {
    let pad = 1;
    switch (s) {
      case '%Y':
        pad = 4;
        d.setYear(str.slice(0, pad));
        break;
      case '%m':
        pad = /^\d\d/.test(str) ? 2 : 1;
        d.setMonth(+str.slice(0, pad) - 1);
        break;
      case '%d':
        pad = /^\d\d/.test(str) ? 2 : 1;
        d.setDate(str.slice(0, pad));
        break;
      case '%H':
        pad = /^\d\d/.test(str) ? 2 : 1;
        d.setHours(str.slice(0, pad));
        break;
      case '%M':
        pad = /^\d\d/.test(str) ? 2 : 1;
        d.setMinutes(str.slice(0, pad));
        break;
      case '%S':
        pad = /^\d\d/.test(str) ? 2 : 1;
        d.setSeconds(str.slice(0, pad));
        break;
      case '%f': {
        const fmatch = /^\d{1,9}/.exec(str);
        pad = fmatch ? fmatch[0].length : 3;
        d.setMilliseconds(
          +str
            .slice(0, pad)
            .padEnd(3, '0')
            .slice(0, 3),
        );
        break;
      }
      case '%z': {
        const m = /^([\+\-]\d{2})(:\d{2})?/.exec(str);
        if (m) {
          pad = m[0].length;
          let offset = +m[1] * 60;
          offset = -offset - d.getTimezoneOffset();
          d._setTime(d._getTime() + offset * 60000);
        } else {
          throw Error(`Invalid date string(${str})`);
        }
        break;
      }
      default:
        pad = 1;
    }
    str = str.slice(pad);
  }
  return d;
};

interface DateTypes {
  _setTime: typeof Date.prototype._setTime;
}

type UnitType = keyof typeof unitWeight;
