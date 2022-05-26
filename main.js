const container = document.querySelector('.container')
const cn = document.querySelector('#cn')
const en = document.querySelector('#en')
const cnEl = cn.querySelectorAll('p, h1')
const enEl = en.querySelectorAll('p, h1')
const focusBtn = document.querySelector('.focus-btn')

function main() {
  if (enEl.length !== cnEl.length) {
    throw new Error('The number of lines is not equal')
  }
  for (let i = 0; i < cnEl.length; i++) {
    align(enEl[i], cnEl[i])
    highlight(enEl[i], cnEl[i])
    highlight(cnEl[i], enEl[i])
  }

  focusBtn.addEventListener('change', (e) => {
    if (e.target.checked) {
      container.classList.add('focus')
    } else {
      container.classList.remove('focus')
      cleanHightlight()
    }
  })
}

function align(a, b) {
  if (a.clientHeight > b.clientHeight) {
    b.style.height = a.clientHeight + 'px'
  } else if (a.clientHeight < b.clientHeight) {
    a.style.height = b.clientHeight + 'px'
  }
}

function cleanHightlight() {
  const els = document.querySelectorAll('.highlight')
  for (let el of els) {
    el.classList.remove('highlight')
  }
}
function highlight(a, b) {
  a.addEventListener('mouseenter', () => {
    if (!container.classList.contains('focus')) return
    cleanHightlight()
    b.classList.add('highlight')
    a.classList.add('highlight')
  })
}

main()
