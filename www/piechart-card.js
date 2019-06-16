
class PieChartCard extends HTMLElement {
    set hass(hass) {
      if (!this.content) {
        const card = document.createElement('ha-card');
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = '/local/piechart-card.css';
        card.appendChild(link);
        this.content = document.createElement('div');
        this.content.className = 'card';
        card.appendChild(this.content);
        this.appendChild(card);
      }
      
      

      const innermes="Pie chart";
      const innermes2="by samilkarahisar"
      const variable1=30;
      const variable2=60;
      const variable3=92.3;
      var Values=[30,10,20,40]; //the values should sum up to a 100%
      var Colors=["3e2731","a22633","e43b44","f77622","feae34","fee761","63c74d","3e8948","265c42","193c3e","124e89","0099db","2ce8f5","c0cbdc","8b9bb4","5a6988","3a4466","262b44","181425"];

      var buffer=0;

      Values.sort(function(a, b){return a - b});

      var Disttozero=new Array();

      var k;
      for (k = 0; k < Values.length; k++) { 
          buffer+=Values[k];
          Disttozero[k]=buffer;
      }

      var percentage_error=false;
      if(buffer>100){
     //THIS WOULD MEAN that Values sum up to more than a 100%
      percentage_error=true;
      }else{
      percentage_error=false;
      }

      var myhtml=``;

      if(percentage_error==false){
      var text=``;
      var i;
      for (i = Disttozero.length; i >=0; i--) {  
        text +=`<circle class="circle-chart__circle" stroke="#${Colors[i]}" stroke-width="2" stroke-dasharray="${Disttozero[i]},100" stroke-linecap="round" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />`;
       }
       text+=`<g class="circle-chart__info">
       <text class="circle-chart__subline" x="16.91549431" y="15.5" alignment-baseline="central" text-anchor="middle" font-size="3">${innermes}</text>
       <text class="circle-chart__subline" x="16.91549431" y="18.5" alignment-baseline="central" text-anchor="middle" font-size="2">${innermes2}</text>
       </g>`;
        

     myhtml= 
     `<center><div class="container">
      <section>
      <svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      `+ 
    
      `<circle class="circle-chart__background" stroke="#efefef" stroke-width="2" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
        `+text+
        +`
      </svg>
    </section>
      </div></center>`;
      }
      else if(percentage_error){
       myhtml=`Error: The sum of the values in Values array is more than a 100%`;
      }
      
      this.content.innerHTML =myhtml;


    }
  
    setConfig(config) {
      if (!config.entity) {
        throw new Error('You need to define an entity');
      }
      this.config = config;
    }
  
    // @TODO: This requires more intelligent logic
    getCardSize() {
      return 3;
    }
  }
  
  customElements.define('test-card', PieChartCard);
