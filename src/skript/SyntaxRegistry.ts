import { events } from './Syntaxes'

Object.entries(events).forEach(([id, event]) => {
  console.log(id, event.origin.class)
})
