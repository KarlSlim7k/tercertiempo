const slides = [...document.querySelectorAll('.slide')]
const counter = document.getElementById('counter')
const dots = document.getElementById('dots')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
let current = 0

slides.forEach((_, index) => {
  const button = document.createElement('button')
  button.className = `dot${index === 0 ? ' on' : ''}`
  button.type = 'button'
  button.setAttribute('aria-label', `Ir a la diapositiva ${index + 1}`)
  button.addEventListener('click', () => show(index))
  dots.appendChild(button)
})

function show(index) {
  current = Math.max(0, Math.min(index, slides.length - 1))
  slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === current))
  ;[...dots.children].forEach((dot, dotIndex) => dot.classList.toggle('on', dotIndex === current))
  counter.textContent = `${current + 1} / ${slides.length}`
  prevBtn.disabled = current === 0
  nextBtn.disabled = current === slides.length - 1
}

function fullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.()
  else document.exitFullscreen?.()
}

addEventListener('keydown', (event) => {
  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); show(current + 1) }
  if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); show(current - 1) }
  if (event.key.toLowerCase() === 'f') fullscreen()
  if (event.key === 'Home') show(0)
  if (event.key === 'End') show(slides.length - 1)
})

prevBtn.addEventListener('click', () => show(current - 1))
nextBtn.addEventListener('click', () => show(current + 1))

function fit() {
  const stage = document.getElementById('stage')
  const scale = Math.min(innerWidth / 1280, innerHeight / 720)
  const left = Math.max(0, (innerWidth - 1280 * scale) / 2)
  const top = Math.max(0, (innerHeight - 720 * scale) / 2)
  stage.style.transform = `scale(${scale})`
  stage.style.transformOrigin = 'top left'
  stage.style.left = `${left}px`
  stage.style.top = `${top}px`
  document.documentElement.style.setProperty('--nav-bar-h', `${Math.max(top, 96)}px`)
}

addEventListener('resize', fit)
fit()
show(0)
