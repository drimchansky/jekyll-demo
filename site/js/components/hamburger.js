;(() => {
  const hamburger = document.querySelector('.hamburger')
  const nav = document.querySelector('.nav')
  const body = document.getElementsByTagName('body')[0]

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active')
    nav.classList.toggle('nav_visible')
    body.classList.toggle('is-open')
  })
})()
