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
      font-family: 'Verdana', sans-serif; 
      font-size: 24px;
    }

    /* Apply the font style to all descendants */
    * {
      font-family: inherit;
      font-size: inherit;
    }

    .container {
      background-color: #3aa1f5;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    #name-translated {
      font-size: 36px;
      font-weight: bold;
    }

    footer {
      background-color: #3aa1f5;
      font-size: 14px;
      text-align: center;
      padding: 5px;
      position: fixed;
      bottom: 0;
      width: 100%;
      box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    }

    footer a {
      color: black;
    }
  </style>
  <div class="container">
    <name-form></name-form>
    <p id="name-greeting"></p>
    <p id="name-translated"></p>
    <all-language-translator></all-language-translator>
  </div>
  <footer>
    <p>Denna webbapplikation är skapad av Maria Fredriksson, för en uppgift i kursen 1DV610 vid Linnéuniversitetet.</p>
    <p>Mer information om all-språket: 
      <a href="https://sv.wikipedia.org/wiki/Allspr%C3%A5ket" target="_blank">Allspråket - Wikipedia</a>
    </p>
  </footer>
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
      // Set the attribute to the name to translate
      this.#allLanguageTranslator.setAttribute('translate-string', this.#name)
    }

    /**
     * TODO: add description.
     */
    #showTranslation () {
      // Show the translated name
      this.shadowRoot.querySelector('#name-greeting').textContent = `${this.#name} på all-språket är:`
      this.shadowRoot.querySelector('#name-translated').textContent = this.#translatedName
    }
  }
)
