import { createPopper } from '@popperjs/core/lib/popper-lite.js'

const button = document.querySelector('#social-button')
const tooltip = document.querySelector('#social-tooltip')

createPopper(button, tooltip, {
  placement: 'right',
})
