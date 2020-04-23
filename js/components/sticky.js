// When the user scrolls the page, execute myFunction
window.onscroll = function() {
  myFunction()
}

// Get the header
const header = document.querySelector('.header')

// Get the offset position of the navbar
const sticky = header.offsetTop

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add('header_sticky')
    console.log('sticky')
  } else {
    header.classList.remove('header_sticky')
  }
}
