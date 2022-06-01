import { onResize, onChecked, syncHeight } from './utils.js'

const container = document.querySelector('.container')
const cnEl = document.querySelectorAll('#cn > *:not(hr)')
const enEl = document.querySelectorAll('#en > *:not(hr)')

function isFocusMode() {
  return !!container.classList.contains('focus')
}
function setFocusMode(focus) {
  if (focus) {
    container.classList.add('focus')
    document.querySelector('.btn-focus').checked = true
  } else {
    container.classList.remove('focus')
    document.querySelector('.btn-focus').checked = false
  }
}

function highlight(el) {
  el.classList.add('highlight')
  localStorage.setItem('highlight', el.getAttribute('data-index'))
}
function unhighlight(el) {
  el.classList.remove('highlight')
}

function cleanHightlight() {
  document.querySelectorAll('.highlight').forEach((el) => unhighlight(el))
}

function bindHighlight(els) {
  els.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (!isFocusMode() || el.classList.contains('highlight')) return
      cleanHightlight()
      els.forEach((el) => highlight(el))
    })
    el.addEventListener('click', () => {
      if (!isFocusMode()) {
        setFocusMode(true)
        cleanHightlight()
        const els = document.querySelectorAll(
          `[data-index="${el.getAttribute('data-index')}"]`
        )
        els.forEach((el) => highlight(el))
        return
      } else {
        setFocusMode(false)
      }
    })
  })
}

function main() {
  if (enEl.length !== cnEl.length) {
    throw new Error('The number of lines is not equal')
  }

  for (let i = 0; i < cnEl.length; i++) {
    syncHeight(enEl[i], cnEl[i])
    bindHighlight([enEl[i], cnEl[i]])
    enEl[i].setAttribute('data-index', i)
    cnEl[i].setAttribute('data-index', i)
  }

  onResize(() => {
    for (let i = 0; i < cnEl.length; i++) {
      syncHeight(enEl[i], cnEl[i])
    }
  })

  onChecked({
    el: document.querySelector('.btn-focus'),
    check: () => {
      setFocusMode(true)
      const idx = localStorage.getItem('highlight')
      if (idx !== null) {
        highlight(enEl[idx])
        highlight(cnEl[idx])
      }
    },
    uncheck: () => setFocusMode(false),
    key: 'focus',
  })
  onChecked({
    el: document.querySelector('.btn-switch'),
    check: () => container.classList.add('reverse'),
    uncheck: () => container.classList.remove('reverse'),
    key: 'switch',
  })
}

main()
