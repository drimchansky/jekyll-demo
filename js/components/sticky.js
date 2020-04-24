{
  const header = document.querySelector('.header')
  const sticky = header.offsetTop

  window.onscroll = () => {
    if (window.pageYOffset > sticky) {
      header.classList.add('header_sticky')
    } else {
      header.classList.remove('header_sticky')
    }
  }
}
