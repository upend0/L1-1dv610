/**
 * The all-language-translator web component module.
 *
 * @author Maria Fredriksson <mf223wk@student.lnu.se>
 * @version 1.0.0
 */

console.log('Hi from all-language-translator!')

// Create a template
const template = document.createElement('template')
template.innerHTML = `
  <style>
    
  </style>
  <p>Hi from all-language-translator!</p>
`
customElements.define('all-language-translator',
  /**
   * Represents a all-language-translator element.
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
