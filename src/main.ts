import { LitElement, html, css, property } from "lit-element";
import {parseTemplate} from "card-tools/src/templates";

import pjson from "../package.json";

class CardConfig {
  entity?: string;
  off_state_behaviour?: string; // progress, icon, hide
  hide_value?: boolean;
  hide_icon?: boolean;
  hide_circle?: boolean;
  transparent_card?: boolean;
  icon?: string;
  icon_off?: string;
  unit?: string;
  value?: number|string;
  string_value?: string;
  string_value_off?: string;
  stroke_size?: string;
  stroke_size_off?: string;
}

class CircleProgressCard extends LitElement {
  _config: CardConfig;
  _state?: any;

  _evaledVariables?: any;

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

    // const state = entity.state === variables.off_status ? 'off' : 'on animate-progress';
    // const value = variables.info_circle_value ?? 100;
    // const text = variables.info_circle_value_string ?? variables.info_circle_value;
    // const radius = 23;
    // const circumference = radius * 2 * Math.PI;
    // const colorTemp = 90 - (entity.attributes.color_temp - entity.attributes.min_mireds) / (entity.attributes.max_mireds - entity.attributes.min_mireds) * 50;

    return html`
      ${this._getTemplateOrValue(this._state, "[[[ return entity.attributes.friendly_name; ]]]")} //parseTemplate(this.hass, "return state.attributes.friendly_name;", {state: this._state})}
    `;

    // <style>
    //   svg {
    //     width: 100%;
    //     top: 0;
    //     left: 0;
    //     position: absolute;
    //   }
    // </style>
    // <svg viewBox="0 0 50 50">
    //   <style>
    //     circle {
    //       transform: rotate(-90deg);
    //       transform-origin: 50% 50%;
    //       stroke-dasharray: ${circumference};
    //       stroke-dashoffset: ${circumference - value / 100 * circumference};
    //       // stroke: hsl(44, 100%, ${colorTemp ? colorTemp : 70}%);
    //     }
    //     circle.off {
    //       stroke: var(--card-icon-color-off, white);
    //     }
    //     circle.on {
    //       stroke: var(--card-icon-color-on, black);
    //     }
    //     path.off,
    //     text.off,
    //     tspan.off{
    //       fill: var(--card-icon-color-off, white);
    //     }
    //     path.on,
    //     text.on,
    //     tspan.on {
    //       fill: var(--card-icon-color-on, black);
    //     }
    //     text {
    //       font-size: 16px;
    //     }
    //     tspan {
    //       font-size: 12px;
    //       alignment-baseline: central;
    //     }
    //     @keyframes animate-progress {
    //       0% {
    //         stroke-dashoffset: ${circumference};
    //       }
    //       100% {
    //         stroke-dashoffset: ${circumference - value / 100 * circumference};
    //       }
    //     }
    //     circle.animate-progress {
    //       animation: animate-progress 0.8s;
    //     }
    //   </style>
    //   <circle class="${state}" cx="25" cy="25" r="${radius}" stroke-width="2" fill="none" />
    //   <text class="${state}" x="50%" y="54%" text-anchor="middle" alignment-baseline="middle" dominant-baseline="middle">${text}<tspan class="${state}">${variables.info_circle_unit}</tspan></text>
    // </svg>
  }

  private _evalTemplate(state: any | undefined, func: any): any {
    /* eslint no-new-func: 0 */
    try {
      return new Function('states', 'entity', 'user', 'hass', 'variables', 'html', `'use strict'; ${func}`).call(
        this,
        this.hass!.states,
        state,
        this.hass!.user,
        this.hass,
        this._evaledVariables,
        html,
      );
    } catch (e) {
      const funcTrimmed = func.length <= 100 ? func.trim() : `${func.trim().substring(0, 98)}...`;
      e.message = `${e.name}: ${e.message} in '${funcTrimmed}'`;
      e.name = 'ButtonCardJSTemplateError';
      throw e;
    }
  }

  // private _objectEvalTemplate(state: any | undefined, obj: any | undefined): any {
  //   const objClone = copy(obj);
  //   return this._getTemplateOrValue(state, objClone);
  // }

  private _getTemplateOrValue(state: any | undefined, value: any | undefined): any | undefined {
    if (['number', 'boolean'].includes(typeof value)) return value;
    if (!value) return value;
    if (typeof value === 'object') {
      Object.keys(value).forEach((key) => {
        value[key] = this._getTemplateOrValue(state, value[key]);
      });
      return value;
    }
    const trimmed = value.trim();
    if (trimmed.substring(0, 3) === '[[[' && trimmed.slice(-3) === ']]]') {
      return this._evalTemplate(state, trimmed.slice(3, -3));
    } else {
      return value;
    }
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
