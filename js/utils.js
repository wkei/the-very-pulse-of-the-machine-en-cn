export function onResize(cb, delay = 150) {
  let timer = null
  window.addEventListener('resize', () => {
    clearTimeout(timer)
    timer = setTimeout(() => cb(), delay)
  })
}

export function onChecked({ el, check, uncheck, key }) {
  const checked = localStorage.getItem(key)
  if (checked === 'true') {
    el.checked = true
    check()
  }
  el.addEventListener('change', (e) => {
    if (e.target.checked) {
      check && check()
    } else {
      uncheck && uncheck()
    }
    if (key) {
      localStorage.setItem(key, e.target.checked)
    }
  })
}

export function syncHeight(a, b) {
  a.style.minHeight = 'auto'
  b.style.minHeight = 'auto'
  const aH = a.getBoundingClientRect().height
  const bH = b.getBoundingClientRect().height
  if (aH > bH) {
    b.style.minHeight = aH + 'px'
  } else if (aH < bH) {
    a.style.minHeight = bH + 'px'
  }
}
