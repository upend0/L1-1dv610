/**
 * The translate-application web component module.
 *
 * @author Maria Fredriksson <mf223wk@student.lnu.se>
 * @version 1.0.0
 */

import './name-form'

console.log('Hi from translate-application!')

// Create a template
const template = document.createElement('template')
template.innerHTML = `
  <style>
    
  </style>
  <p>Hi from translate-application!</p>
  <name-form></name-form>
`
customElements.define('translate-application',
  /**
   * Represents a translate-application element.
   */
  class extends HTMLElement {
    #nameForm
    #name

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#nameForm = this.shadowRoot.querySelector('name-form')

      // Listen for when a name has been submitted
      this.#nameForm.addEventListener('nameOK', event => {
        this.#name = event.detail
        console.log(this.#name)
      })
    }
  }
)
