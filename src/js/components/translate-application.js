/**
 * The translate-application web component module.
 *
 * @author Maria Fredriksson <mf223wk@student.lnu.se>
 * @version 1.0.0
 */

console.log('Hi from translate-application!')

// Create a template
const template = document.createElement('template')
template.innerHTML = `
  <style>
    
  </style>
  <p>Hi from translate-application!</p>
`
customElements.define('translate-application',
  /**
   * Represents a translate-application element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }
  }
)
