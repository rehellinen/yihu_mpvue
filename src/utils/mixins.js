/**
 *  mixin.js
 *  Create By rehellinen
 *  Create On 2018/8/14 13:12
 */

import {Load} from 'utils/load'
var loadMixin = {
  mounted () {
    const REQUEST_NUMBER = 0
    this.load = new Load(this, REQUEST_NUMBER)
  }
}

export {loadMixin}
