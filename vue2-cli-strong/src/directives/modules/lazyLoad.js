// ! 推荐vue-lazyload
/**
 * 图片懒加载
 */
const lazyLoad = {
  // install方法
  // install(Vue, options) {
  //   const defaultSrc = options.default
  //   Vue.directive('lazyLoad', {
  //     bind(el, binding) {
  //       lazyLoad.init(el, binding.value, defaultSrc)
  //     },
  //     inserted(el) {
  //       if (IntersectionObserver) {
  //         lazyLoad.observe(el)
  //       } else {
  //         lazyLoad.listenerScroll(el)
  //       }
  //     },
  //   })
  // },
  bind(el, binding) {
    lazyLoad.init(el, binding.value)
  },
  inserted(el) {
    if (IntersectionObserver) {
      lazyLoad.observe(el)
    } else {
      lazyLoad.listenerScroll(el)
    }
  },
  // 初始化
  init(el, val, def) {
    el.setAttribute('data-src', val)
    el.setAttribute('src', def)
  },
  // 利用IntersectionObserver监听el
  observe(el) {
    var io = new IntersectionObserver((entries) => {
      const realSrc = el.dataset.src
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc
          el.removeAttribute('data-src')
        }
      }
    })
    io.observe(el)
  },
  // 监听scroll事件
  listenerScroll(el) {
    const handler = lazyLoad.throttle(lazyLoad.load, 300)
    lazyLoad.load(el)
    window.addEventListener('scroll', () => {
      handler(el)
    })
  },
  // 加载真实图片
  load(el) {
    const windowHeight = document.documentElement.clientHeight
    const elTop = el.getBoundingClientRect().top
    const elBtm = el.getBoundingClientRect().bottom
    const realSrc = el.dataset.src
    if (elTop - windowHeight < 0 && elBtm > 0) {
      if (realSrc) {
        el.src = realSrc
        el.removeAttribute('data-src')
      }
    }
  },
  // 节流
  throttle(fn, delay) {
    let timer
    let prevTime
    return function (...args) {
      const currTime = Date.now()
      const context = this
      if (!prevTime) prevTime = currTime
      clearTimeout(timer)

      if (currTime - prevTime > delay) {
        prevTime = currTime
        fn.apply(context, args)
        clearTimeout(timer)
        return
      }

      timer = setTimeout(function () {
        prevTime = Date.now()
        timer = null
        fn.apply(context, args)
      }, delay)
    }
  },
}

export default lazyLoad
