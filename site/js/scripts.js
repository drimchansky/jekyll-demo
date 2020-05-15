import './components/hamburger'
import './components/map'
import './components/sticky'
import quicklink from '../../node_modules/quicklink/dist/quicklink'

window.addEventListener('load', () => {
  quicklink.listen()
})
