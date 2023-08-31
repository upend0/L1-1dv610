/**
 * The all-language-translator web component module.
 *
 * @author Maria Fredriksson <mf223wk@student.lnu.se>
 * @version 1.0.0
 */

// Create a template
const template = document.createElement('template')
template.innerHTML = `
  <style>
    
  </style>
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
      // Split the input string into words
      const words = stringToTranslate.split(' ')

      // Translate each word and join them back into a sentence
      const translatedWords = words.map(word => this.#translateWord(word))
      const translatedString = translatedWords.join(' ').toLocaleLowerCase()

      // Dispatch an event with the translated string
      this.dispatchEvent(new window.CustomEvent('translatedToAll', { bubbles: true, detail: translatedString }))
    }

    /**
     * Function to translate a single word.
     *
     * @param {string} word - The word to translate.
     * @returns {string} The translated word.
     */
    #translateWord (word) {
      let index = 0
      while (index < word.length && !this.#isVowel(word[index])) {
        index++
      }
      return word.slice(index) + word.slice(0, index) + 'all'
    }

    /**
     * Function to check if a character is a vowel.
     *
     * @param {char} char - The character to check.
     * @returns {boolean} True if the character is a vowel, otherwise false.
     */
    #isVowel (char) {
      return ['a', 'e', 'i', 'o', 'u', 'y', 'å', 'ä', 'ö'].includes(char.toLowerCase())
    }
  }
)
