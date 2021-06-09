import { LitElement, html, css, property } from "lit-element";

import pjson from "../package.json";

class CardConfig {
  entity?: string;
  off_state_behaviour?: string; // progress, icon, hide
  show?: ShowConfig;
  colors?: ColorConfig;
  icon?: string;
  icon_off?: string;
  unit?: string;
  attribute?: string;
  value?: number | string;
  min?: number;
  max?: number;
  string_value?: string;
  string_value_off?: string;
  stroke_size?: string;
  stroke_size_off?: string;
  size?: number;
  font_size?: number;
  icon_size?: number;
}

class ColorConfig {
  progress_bar?: string;
  track_bar?: string;
  text?: string;
  text_off?: string;
  icon?: string;
  icon_off?: string;
}

class ShowConfig {
  value?: boolean;
  icon?: boolean;
  progress_bar?: boolean;
  track_bar?: boolean;
  background?: boolean;
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

    const unit = this._config.unit ?? this._state.attributes.unit_of_measurement ?? '%';
    const value = this._config.value ? this._getTemplateOrValue(this._state, this._config.value) : this._config.attribute ? this._state.attributes[this._config.attribute] : this._state.state;
    var numericValue: number;

    var min = this._config.min;
    var max = this._config.max;
    var valueString = this._getTemplateOrValue(this._state, this._config.string_value);

    if (typeof value == 'number') {
      if (value > 0 && value < 1 && !min && !max && unit == '%') {
        min = 0;
        max = 1;
      }

      numericValue = value;
    } else {
      const parsedValue = parseInt(value);

      if (parsedValue) {
        if (parsedValue > 0 && parsedValue < 1 && !min && !max && unit == '%') {
          min = 0;
          max = 1;
        }

        numericValue = parsedValue;
      }
    }

    min = min ?? 0;
    max = max ?? 100;

    // const displayedProgress = numericValue ? (numericValue - min) / (max - min) * 100 : undefined;
    const progress = numericValue ? (numericValue - min) / (max - min) : 1;
    const hideUnit = !numericValue || valueString;
    const adjustedValue = numericValue ? (unit == '%' ? Math.round((numericValue - min) / (max - min) * 100) : Math.round(numericValue)) : undefined;
    valueString = valueString ? `${valueString}` : adjustedValue ? `${adjustedValue}` : `${value}`;

    const valueStringOff = this._getTemplateOrValue(this._state, this._config.string_value_off) ?? valueString;

    //temp
    const off_status = 'off';

    const state = 'on';//this._state.state === off_status ? 'off' : 'on animate-progress';
    const radius = 23;
    const circumference = radius * 2 * Math.PI;
    // const colorTemp = 90 - (entity.attributes.color_temp - entity.attributes.min_mireds) / (entity.attributes.max_mireds - entity.attributes.min_mireds) * 50;

    return html`
    <ha-card>
      <div style="--stroke-offset: ${circumference - progress * circumference}">
      <style>
        svg {
          width: 100%;
          top: 0;
          left: 0;
          //position: absolute;
        }
      </style>
      <svg viewBox="0 0 50 50"">
        <style>
          circle {
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
            stroke-linecap: round;
            transition: stroke-dashoffset 0.5s ease-in-out;
            stroke-dasharray: ${circumference};
            stroke-dashoffset: var(--stroke-offset);
          }
          circle.off {
            stroke: var(--card-icon-color-off, white);
          }
          circle.on {
            stroke: var(--card-icon-color-on, black);
          }
          path.off,
          text.off,
          text.off tspan{
            fill: var(--card-icon-color-off, white);
          }
          path.on,
          text.on,
          text.on tspan {
            fill: var(--card-icon-color-on, black);
          }
          text {
            font-size: 16px;
          }
          tspan {
            font-size: 12px;
            alignment-baseline: central;
          }
          @keyframes animate-progress {
            0% {
              stroke-dashoffset: ${circumference};
            }
            100% {
              stroke-dashoffset: var(--stroke-offset);
            }
          }
          circle.animate-progress {
            animation: animate-progress 0.8s;
          }
        </style>
        <circle class="${state}" cx="25" cy="25" r="${radius}" stroke-width="2" fill="none" />
        <text class="${state}" x="50%" y="54%" text-anchor="middle" alignment-baseline="middle" dominant-baseline="middle">${valueString}<tspan style="${hideUnit ? 'display: none;' : ''}">${unit}</tspan></text>
      </svg>
      </div>
    </ha-card>
    `;
  }

  private _evalTemplate(state: any | undefined, func: any): any {
    /* eslint no-new-func: 0 */
    try {
      return new Function('states', 'entity', 'user', 'hass', 'html', `'use strict'; ${func}`).call(
        this,
        this.hass!.states,
        state,
        this.hass!.user,
        this.hass,
        html,
      );
    } catch (e) {
      const funcTrimmed = func.length <= 100 ? func.trim() : `${func.trim().substring(0, 98)}...`;
      e.message = `${e.name}: ${e.message} in '${funcTrimmed}'`;
      e.name = 'CircleProgressCardJSTemplateError';
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
