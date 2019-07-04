import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { version } from "./new-component-tag-version.js";

export default class NewComponentClass extends RiseElement {

  static get template() {
    return html`[[value]]`;
  }

  static get properties() {
    return {
      value: {
        type: String
      }
    }
  }

  constructor() {
    super();

    this._setVersion( version );
  }

}

customElements.define("new-component-tag", NewComponentClass);
