import {
  LitElement, html
} from 'https://unpkg.com/@polymer/lit-element@^0.5.2/lit-element.js?module';

import 'https://cdn.jsdelivr.net/npm/google-charts@2.0.0/dist/googleCharts.min.js';

class TestGoogleChart extends LitElement {
  static get properties() {
    return {
      hass: Object,
      config: Object,
    }
  }

  
  _render({ hass, config }) {


    const entityId = this.config.entity;
    const state = hass.states[entityId];
    const stateStr = state ? state.state : 'unavailable';


    return html`
    The state of ${entityId} is ${stateStr}!

    <br><br>
    <div style="background-color:white; display:block;">
   
    <google-chart
      type='pie'
      options='{"title": "Test", "pieHole": 0.6}'
      cols='[{"label":"Heures", "type":"string"}, {"label":"Consomation", "type":"number"}]'
      rows='[["Pleines",50],["Creuse", 50]]'>
    </google-chart>
    </div>
  `;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
  }


  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
}
customElements.define('test-card', TestGoogleChart);

