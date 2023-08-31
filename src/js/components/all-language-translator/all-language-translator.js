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

    /**
     * Which attributes are to be observed.
     *
     * @returns {Array} The attributes that will be observed
     */
    static get observedAttributes () {
      // Attributes are not case-sensitive, therefore they are all in just lowercase.
      return ['translate-string']
    }

    /**
     * Listens to when an observed attribute is changed.
     *
     * @param {string} name - The name of the attribute.
     * @param {*} oldValue - The old value of the attribute.
     * @param {*} newValue - The new value of the attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'translate-string' && newValue !== oldValue) {
        this.#translateString(newValue)
      }
    }

    /**
     * TODO: add description.
     *
     * @param {string} stringToTranslate - The string to translate.
     */
    #translateString (stringToTranslate) {
      console.log('stringToTranslate: ', stringToTranslate)

      // ^^ Just test something. Remove later.
      const translatedString = stringToTranslate.split('').reverse().join('')

      // Dispatch an event with the translated string
      this.dispatchEvent(new window.CustomEvent('translatedToAll', { bubbles: true, detail: translatedString }))
    }
  }
)
