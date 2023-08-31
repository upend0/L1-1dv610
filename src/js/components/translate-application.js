/**
 * The translate-application web component module.
 *
 * @author Maria Fredriksson <mf223wk@student.lnu.se>
 * @version 1.0.0
 */

import './name-form'
import './all-language-translator'

// Create a template
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh; /* This ensures the component takes up the full viewport height */
    }
  </style>
  <name-form></name-form>
  <p id="nameGreeting"></p>
  <all-language-translator></all-language-translator>
`
customElements.define('translate-application',
  /**
   * Represents a translate-application element.
   */
  class extends HTMLElement {
    #nameForm
    #allLanguageTranslator
    #name
    #translatedName

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#nameForm = this.shadowRoot.querySelector('name-form')
      this.#allLanguageTranslator = this.shadowRoot.querySelector('all-language-translator')

      // Listen for when a name has been submitted
      this.#nameForm.addEventListener('nameOK', event => {
        this.#name = event.detail

        // Translate the name
        this.#translateName()
      })

      // Listen for when the name has been translated
      this.#allLanguageTranslator.addEventListener('translatedToAll', event => {
        this.#translatedName = event.detail

        // Show the translated name
        this.#showTranslation()
      })
    }

    /**
     * TODO: add description.
     */
    #translateName () {
      // Write a greeting to the user
      this.shadowRoot.querySelector('#nameGreeting').textContent = `Hej ${this.#name}!`

      // Set the attribute to the name to translate
      this.#allLanguageTranslator.setAttribute('translate-string', this.#name)
    }

    /**
     * TODO: add description.
     */
    #showTranslation () {
      // Show the translated name
      this.shadowRoot.querySelector('#nameGreeting').textContent = `${this.#name} på all-språket är ${this.#translatedName}`
    }
  }
)
