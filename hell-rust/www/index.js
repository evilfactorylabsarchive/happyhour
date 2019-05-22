import { LitElement, html, css } from 'lit-element'
import { raw_to_md5 } from 'hell-rust'

class App extends LitElement {
  static get styles() {
    return css`
      textarea {
        box-sizing: border-box;
        height: 100px;
        padding: 0.5rem;
        width: 100%;
        font-family: inherit;
      }
    `
  }
  static get properties() {
    return {
      text: { type: String }
    }
  }

  constructor() {
    super()
    this.text = ''
  }

  handleInput(e) {
    this.text = e.target.value
  }

  render() {
    return html`
      <h2>Text to md5</h2>
      <p>Generate plain text to md5 hash powered by wasm</p>
      <p>Text: ${this.text}</p>
      <p>MD5: ${this.text === '' ? '' : raw_to_md5(this.text)}</p>
      <textarea
        placeholder="input here"
        @input="${this.handleInput}"
      ></textarea>
    `
  }
}

window.customElements.define('my-app', App)
