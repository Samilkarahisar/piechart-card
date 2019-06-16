import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js';



import {
    LitElement, html
  } from 'https://unpkg.com/@polymer/lit-element@^0.5.2/lit-element.js?module';

class LinkyCardTest extends LitElement {
    static get properties() {
        return {
          hass: Object,
          config: Object,
          myChart: { type: Object }
        }
      }


  _render({ hass, config }) {

    const entityId = this.config.entity;
    const state = hass.states[entityId];
    const stateStr = state ? state.state : 'unavailable';
  

    return html`
<ha-card>
    <div style="background-color:green; padding:5px;">
    <p>Inside render</p>
      L'entité ${entityId} montre: ${stateStr}.
    <canvas id="pie-chart" width="800" height="300"></canvas>
  </div>
</ha-card>
    `;
  }
  



  firstUpdated() {
    this.myChart = new Chart(document.getElementById("pie-chart"), {
      type: 'pie',
      data: {
        labels: ["Oui", "Non"],
        datasets: [{
          label: "Probabilité (en pourcentage)",
          backgroundColor: ["#3e95cd", "#8e5ea2"],
          data: [50,50]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Je mappel bien Muhammet oui ou non?'
        }
      }
  });
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
}

customElements.define('test-card', LinkyCardTest);
