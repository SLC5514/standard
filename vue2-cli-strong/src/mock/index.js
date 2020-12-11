import Mock from 'mockjs'
import { param2Obj } from '../utils'

function XHR2ExpressReqWrap(respond) {
  return function(options) {
    let result = null
    if (respond instanceof Function) {
      const { body, type, url } = options
      // https://expressjs.com/en/4x/api.html#req
      result = respond({
        method: type,
        body: JSON.parse(body),
        query: param2Obj(url)
      })
    } else {
      result = respond
    }
    return Mock.mock(result)
  }
}

if (process.env.NODE_ENV === 'development') {
  let mocks = []
  const context = require.context('./services', true, /\.mock.js$/)
  context.keys().forEach((key) => {
    Object.keys(context(key)).forEach((paramKey) => {
      mocks.push(...context(key)[paramKey])
    })
  })

  Mock.setup({
    timeout: '500-800'
  })

  // for front mock
  // please use it cautiously, it will redefine XMLHttpRequest,
  // which will cause many of your third-party libraries to be invalidated(like progress event).

  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}
