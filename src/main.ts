import { LitElement, html, css, property } from "lit-element";

import pjson from "../package.json";

class CardConfig {
  entity?: string;
}

class CircleProgressCard extends LitElement {
  _config: CardConfig;
  _state?: any;

  @property() hass: any;

  setConfig(config: CardConfig) {
    this._config = config;
    if (!config.entity) throw new Error(`No entity specified.`);
  }

  async resized() {
    await this.updateComplete;
  }

  async firstUpdated() {
    await this.resized();
  }

  render() {
    this._state = this.hass.states[this._config.entity]
    if (!this._state)
      return html`
        <hui-warning>
          ${this.hass.localize(
        "ui.panel.lovelace.warning.entity_not_found",
        "entity",
        this._config.entity
      )}
        </hui-warning>
      `;

    const dir = this.hass.translationMetadata.translations[
      this.hass.language || "en"
    ].isRTL
      ? "rtl"
      : "ltr";

    

    return html``;
  }

  static get styles() {
    return css`
      
    `;
  }
}

if (!customElements.get("circle-progress-card")) {
  customElements.define("circle-progress-card", CircleProgressCard);
  console.info(
    `%cCIRCLE-PROGRESS-CARD ${pjson.version} IS INSTALLED`,
    "color: green; font-weight: bold",
    ""
  );
}
