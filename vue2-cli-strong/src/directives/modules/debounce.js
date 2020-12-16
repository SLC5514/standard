/**
 * 防止短时间内被多次点击
 */
const debounce = {
  inserted: function (el, binding) {
    let timer
    el.addEventListener('click', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
        clearTimeout(timer)
        timer = null
      }, 1000)
    })
  },
}

export default debounce
