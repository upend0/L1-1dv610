/**
 * The name-form web component module.
 *
 * @author Maria Fredriksson <mf223wk@student.lnu.se>
 * @version 1.0.0
 */

// Create a template
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .container {
      font-family: Verdana, sans-serif;
    }

    .name-input, .submit-btn {
      font-size: 24px; 
    }
  </style>
  <div class="container">
    <form id="name-form">
      <input class="name-input" type="text" placeholder="Skriv ditt namn">
      <button class="submit-btn" type="submit">OK</button>
    </form>
    <p id="error-container"></p>
  </div>
`
customElements.define('name-form',
  /**
   * Represents a name-form element.
   */
  class extends HTMLElement {
    #nameForm
    #name
    #errorContainer

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#nameForm = this.shadowRoot.querySelector('#name-form')
      this.#errorContainer = this.shadowRoot.querySelector('#error-container')

      // Sets the focus on the input field from the start
      this.#nameForm.querySelector('.name-input').focus()

      // Listen for when a name has been submitted
      this.#nameForm.addEventListener('submit', event => this.#nameSubmitted(event))
    }

    /**
     * TODO: add description.
     *
     * @param {Event} event - The event object.
     */
    #nameSubmitted (event) {
      // Prevent the page from loading when the button is clicked
      event.preventDefault()

      // Get the name from the input field
      this.#name = this.#nameForm.querySelector('.name-input').value.trim()

      // TODO: add felhantering

      if (this.#name === '') {
        this.#displayError('Skriv in ett namn.')
        return
      }

      // Check if the input contains only letters, spaces, and Swedish special characters
      if (!/^[A-Za-zåäöÅÄÖ\s]+$/.test(this.#name)) {
        this.#displayError('Endast svenska bokstäver, tyvärr.')
        return
      }

      // Clear any error messages
      this.#clearError()

      // Dispatch an event with the name
      this.dispatchEvent(new window.CustomEvent('nameOK', { bubbles: true, detail: this.#name }))

      // Reset the form
      this.#nameForm.reset()
    }

    #displayError (message) {
      this.#errorContainer.textContent = message
    }

    #clearError () {
      this.#errorContainer.textContent = ''
    }
  }
)
