import namesEn from './name/en';
import namesZh from './name/zh';
import emailSuffix from './email/suffixData';
import {
  random,
  randomId
} from './utils/random';
import check from './utils/check';
import getEmail from './email/index';
import getSex from './sex/index';
import { isArray } from './utils/is';

class Fake {
  constructor(opts) {
    check(opts);
    const defaultOpts = {
      lang: 'zh',
      sex: 'male'
    };
    this.opts = Object.assign({}, defaultOpts, opts || {});
    this.namesEn = namesEn;
    this.namesZh = namesZh;
    this.emailSuffix = emailSuffix;
  }

  /**
   * 
   * @param {Object} opts
   * 
   * @opts.lang
   * @opts.sex
   * @opts.lastName
   * @opts.count
   */
  name(opts) {
    check(opts);
    const _defaults = {
      lang: this.opts.lang,
      sex: this.opts.sex,
      count: 1
    };
    const _opts = Object.assign({}, _defaults, opts || {});
    const names = {
      zh: namesZh,
      en: namesEn
    };
    const firstNames = names[_opts.lang].firstName[_opts.sex];
    const lastNames = names[_opts.lang].lastName;
    let allNames = [];
    for (let i = 0; i < _opts.count; i++) {
      const firstName = firstNames.names[random(0, firstNames.count - 1)];
      let lastName = lastNames.names[random(0, lastNames.count - 1)];
      let name;
      if (_opts.lastName && ~lastNames.names.indexOf(_opts.lastName)) {
        lastName = _opts.lastName;
      }
      name = _opts.lang === 'en' ? `${firstName} ${lastName}` : `${lastName}${firstName}`;
      allNames.push(name);
    }
    return allNames;
  }

  /**
   * 
   * @param {Object} opts
   * 
   * @opts.sex
   * @opts.type - ['number', 'letter', 'name'] default: 'name'
   * @opts.suffix - specify custom suffix
   * @opts.count
   */
  email(opts) {
    check(opts);
    const _defaults = {
      sex: this.opts.sex,
      type: 'name',
      count: 1
    };
    const _opts = Object.assign({}, _defaults, opts || {});
    return getEmail(_opts);
  }

  id(length = 10) {
    return randomId(length);
  }

  sex(opts) {
    check(opts);
    const _defaults = {
      lang: this.opts.lang
    };
    const _opts = Object.assign({}, _defaults, opts || {});
    return getSex(_opts);
  }

  random(list = [], count = 1) {
    const length = list.length;
    let result = [];
    if (isArray(list)) {
      for (let i = 0; i < count; i++) {
        result.push(list[random(0, length - 1)]);
      }
    }
    return result;
  }
}

export default Fake;