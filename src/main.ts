import { LitElement, html, css, property } from "lit-element";

import pjson from "../package.json";

class CardConfig {
  entity?: string;
  //off_state_behaviour?: string; // progress, icon, hide
  show?: ShowConfig;
  colors?: ColorConfig;
  icon?: string;
  unit?: string;
  attribute?: string;
  value?: number | string;
  min?: number;
  max?: number;
  string_value?: string;
  stroke_size?: number | string;
  size?: number;
  font_size?: number;
  icon_size?: number;
}

class ColorConfig {
  progress?: string;
  track?: string;
  text?: string;
  icon?: string;
}

class ShowConfig {
  value?: boolean;
  icon?: boolean;
  progress?: boolean;
  track?: boolean;
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
      const parsedValue = parseFloat(value);

      if (parsedValue != null) {
        if (parsedValue > 0 && parsedValue < 1 && !min && !max && unit == '%') {
          min = 0;
          max = 1;
        }

        numericValue = parsedValue;
      }
    }

    min = min ?? 0;
    max = max ?? 100;

    const progress = numericValue != null ? (numericValue - min) / (max - min) : 1;
    const hideUnit = numericValue == null || valueString;
    const adjustedValue = numericValue != null ? (unit == '%' ? Math.round((numericValue - min) / (max - min) * 100) : Math.round(numericValue)) : undefined;
    valueString = valueString ? `${valueString}` : adjustedValue != null ? `${adjustedValue}` : `${value}`;

    const icon = this._getTemplateOrValue(this._state, this._config.icon) ?? this._state.attributes.icon;

    const size = this._getTemplateOrValue(this._state, this._config.size) ?? 100;
    const strokeSize = this._getTemplateOrValue(this._state, this._config.stroke_size) ?? 4;
    const iconSize = this._getTemplateOrValue(this._state, this._config.icon_size) ?? 46;
    const fontSize = this._getTemplateOrValue(this._state, this._config.font_size) ?? 16;

    const progressColor = this._getTemplateOrValue(this._state, this._config.colors?.progress) ?? "var(--paper-item-icon-color, #44739e)";
    const trackColor = this._getTemplateOrValue(this._state, this._config.colors?.track) ?? "var(--divider-color, #e8e8e8)";
    const textColor = this._getTemplateOrValue(this._state, this._config.colors?.text) ?? "var(--primary-text-color)";
    const iconColor = this._getTemplateOrValue(this._state, this._config.colors?.icon) ?? "var(--primary-text-color)";

    const radius = Math.floor(25 - (strokeSize / 2));
    const circumference = radius * 2 * Math.PI;

    const showIcon = (this._getTemplateOrValue(this._state, this._config.show?.icon) ?? !numericValue) && icon;
    const showValue = this._getTemplateOrValue(this._state, this._config.show?.value) ?? !showIcon;
    const showTrack = this._getTemplateOrValue(this._state, this._config.show?.track) ?? true;
    const showProgress = this._getTemplateOrValue(this._state, this._config.show?.progress) ?? true;
    const showBackground = this._getTemplateOrValue(this._state, this._config.show?.background) ?? true;

    return html`
    <ha-card style="${showBackground ? '' : 'background: none; box-shadow: none;'}">
      <div class="wrapper" style="
      --stroke-circumference: ${circumference}; 
      --stroke-offset: ${circumference - progress * circumference}; 
      --stroke-size: ${strokeSize}; 
      --progress-color: ${progressColor}; 
      --track-color: ${trackColor}; 
      --text-color: ${textColor}; 
      --icon-color: ${iconColor};
      --size: ${size}%;
      --font-size: ${fontSize}px;">

        <svg viewBox="0 0 50 50"">
          <circle class="track-bar" cx="25" cy="25" r="${radius}" fill="none" style="${showTrack ? '' : 'display: none;'}"/>
          <circle class="progress-bar animate-progress" cx="25" cy="25" r="${radius}" fill="none" style="${showProgress ? '' : 'display: none;'}"/>
          <text x="50%" y="54%" text-anchor="middle" alignment-baseline="middle" dominant-baseline="middle" style="${showValue ? '' : 'display: none;'}">
            ${valueString}<tspan style="${hideUnit ? 'display: none;' : ''}">${unit}</tspan>
          </text>
        </svg>
        ${showIcon ? html`
        <div class="icon-wrapper" style="--icon-size: ${iconSize}%;">
          <ha-icon id="progress-icon" icon="${icon}" style="color: ${iconColor}; --mdc-icon-size: 100%;"></ha-icon>
        </div>` : ''}
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
      .wrapper {
        margin: calc((100% - var(--size)) / 2);
        overflow: hidden;
      }
      circle {
        stroke-width: var(--stroke-size);
      }
      circle.track-bar {
        stroke: var(--track-color);
      }
      circle.progress-bar {
        stroke: var(--progress-color);
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        stroke-linecap: round;
        transition: stroke-dashoffset 0.5s ease-in-out;
        stroke-dasharray: var(--stroke-circumference);
        stroke-dashoffset: var(--stroke-offset);
      }
      path,
      text,
      text tspan {
        fill: var(--text-color);
      }
      text {
        font-size: var(--font-size);
      }
      tspan {
        font-size: calc(0.75 * var(--font-size));
        alignment-baseline: central;
      }
      @keyframes animate-progress {
        0% {
          stroke-dashoffset: var(--stroke-circumference);
        }
        100% {
          stroke-dashoffset: var(--stroke-offset);
        }
      }
      circle.animate-progress {
        animation: animate-progress 0.8s;
      }
      .icon-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        padding: calc(50% - var(--icon-size) / 2);
        box-sizing: border-box;
      }
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
