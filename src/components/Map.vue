<template>
  <div class="map-wrap">
    <a href="https://www.maptiler.com" class="watermark"><img
        src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"/></a>


      
      <div class="map" ref="mapContainer"></div>
        <div class="mapC"></div>
        <div class="marker" id="el" @click="showModal = true"></div>
        
            <div class="modal-overlay" v-show="showModal">

                <div class="close-button" @click="showModal=false">

                  <svg viewBox="0 0 40 40" fill="white" class="cross">
                    <path d="M10.71,10l3.67-3.67a.5.5,0,1,0-.71-.71L10,9.29,6.33,5.62a.5.5,0,1,0-.71.71L9.29,10,5.62,13.67a.5.5,0,0,0,0,.71.49.49,0,0,0,.35.15.51.51,0,0,0,.36-.15L10,10.71l3.67,3.67a.51.51,0,0,0,.36.15.49.49,0,0,0,.35-.15.5.5,0,0,0,0-.71Z"></path>
                    </svg>
                </div>
                <h1 class="side-title">Midtbyen</h1>
                <p>Sist målte snødybde fra dette stedet:</p>
                <p class="depth-text" id="depth-text"></p>
                <p>Utvikling over tid:</p>
                <div class="chart-wrapper">
                  <canvas id="planet-chart"></canvas>
                </div>
                <p>Skriv inn ditt nummer for å få melding om når det er brøytet her</p>
                <form @submit.prevent="Register">
                  <input type="text" placeholder="Eks. +4795555608" v-model="number"/>
                  <input type="submit" value="Register">
                </form>

                
                <!--
                <form @submit.prevent="Register">
                    <input type="submit" value="Register">
                </form>
                -->
                

            </div>
        
  </div>
</template>

<script>

import {ref} from 'vue';
import { Map, NavigationControl, Marker} from 'maplibre-gl';
import { shallowRef, onMounted, onUnmounted, markRaw } from 'vue';
import { getDatabase, get, child, update} from 'firebase/database';
import { ref as storageRef } from 'firebase/database';

import Chart from 'chart.js';
import planetChartData from '../data.js'


export default {
  name: "Map",
  data (){
      return {
          showModal: false,
          depth: 100,
          planetChartData: planetChartData
      }

  },
  mounted() {
    
    var labelArr = [];
    var depthArr = [];
    var elem = document.getElementById('depth-text');


    const dbRef = storageRef(getDatabase());
    get(child(dbRef, '/Measurement')).then((snapshot) => {
        if (snapshot.exists()) {

            
            console.log(snapshot.val());
            const sliced = Object.fromEntries(
            Object.entries(snapshot.val()).slice(Object.keys(snapshot.val()).length-7, Object.keys(snapshot.val()).length)
            )
            for (const key in sliced) {

                labelArr.push(key);
                depthArr.push(parseInt(sliced[key]));

                //console.log(`${key}: ${snapshot.val()[key]}`);
            }
            elem.innerText = depthArr.slice(-1)[0] + " mm";

            
            
            
            

        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });

    this.$nextTick(function () {
    
    //const ctx = document.getElementById('planet-chart').getContext("2d");
    const ctx2 = document.getElementById('planet-chart');
    
    
    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: labelArr,
      datasets: [
        {
          label: "Snødybde i mm",
          data: depthArr,
          backgroundColor: "rgba(54,73,93,.5)",
          borderColor: "#36495d",
          borderWidth: 3
        }
    
      ]},
      options: {},
    });
    
    })
  },
  methods: {
      changeDepth: function(depth) {
          this.depth = depth;
          return this.depth;
      }

  },
  created () {
    
  },
  setup () {

    const number = ref("");


    

    
    const Register = () => {

        
        const dbRef = getDatabase();
        var t = number.value

          update(storageRef(dbRef, '/Number'), {
              [t] : t
          }).catch(alert);

    }
   

    
    
    
    
    
    const mapContainer = shallowRef(null);
    const map = shallowRef(null);
    

    //set(ref(db, "/"), {test: "test"}).catch(alert);


    onMounted(() => {
      
      

      const apiKey = 'eZI4eDmGWNU8hj3m6i2B';

      const initialState = { lng: 10.3905, lat: 63.4297, zoom: 14 };

      map.value = markRaw(new Map({
        container: mapContainer.value,
        style: `https://api.maptiler.com/maps/81b2f6d8-5d11-4312-aa41-18e9d3ae0e6f/style.json?key=${apiKey}`,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom
      }));
        map.value.addControl(new NavigationControl(), 'top-right');

        
        



        
        var el = document.getElementById('el');
        new Marker(el)
        .setLngLat([10.3905,63.4297])
        .addTo(map.value);

        
        
        
        

        

        
    }),
    onUnmounted(() => {
      map.value?.remove();
    })

    return {
        Register,
      map, mapContainer, number
    };
  }
};
</script>


<style >
@import '~maplibre-gl/dist/maplibre-gl.css';

.body {
    margin: 0;
    padding: 0;
}

.map-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh - 37px); /* calculate height of the screen minus the heading */
  
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
.mapC {
  position: absolute;
    top: 0;
    right: 0;
    left:0;
    height: 25px;
    z-index: 98;
    background-image: linear-gradient(white, rgba(0,0,0,0))

    
}
.close-button {
  background-color: rgba(54, 53, 53, 1);
  width: 35px;
  height: 35px;
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 18px;
  margin-bottom: 0;
  
}
.cross {
  margin-left: 11.5px;
  margin-top: 12px;

}

.side-title {
  margin-left: -270px;
  font-size: 40px;
  color: rgba(0, 0, 0, 0.75);
}
.depth-text {
  font-size: 70px;
  font-weight:bolder;
  
}

.chart-wrapper {
  width: 500px;
  margin: auto;
}




.watermark {
  position: absolute;
  left: 10px;
  bottom: 10px;
  z-index: 999;
}

.marker {
        background-image: url('https://cdn-icons.flaticon.com/png/512/186/premium/186250.png?token=exp=1650792179~hmac=71cf54ad4a1e9d8e7e85ad17fa7a05a5');
        content: "hei";
      background-size: cover;
      width: 50px;
      height: 50px;
      cursor: pointer;
}
.modal-overlay {
    position: absolute;
    top: 0;
    left: 60%;
    right: 0;
    bottom: 0;
    z-index: 98;
    background-color: rgba(235, 235, 223);
    box-shadow: -2px 0 15px rgba(0, 0, 0, 0.1);
}
</style>