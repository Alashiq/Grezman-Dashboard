import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

// import App from './pages/Layout/Layout.vue'
import Vuex from 'vuex'
import storeModule from './store/index'


import router from './router'
import './tailwind.css'
import './app.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Alert from "./shared/Alert";
import DataServices from "./shared/DataServices";
import Loading from "./shared/Loading";
import Language from "./shared/Language";




const app = createApp(App)




app.use(createPinia())
app.use(Vuex)
const store = new Vuex.Store({
    modules: {
      storeModule
    }
  })

  
app.use(store)

app.use(router)


app.use(VueSweetalert2);

app.config.globalProperties.$alert = Alert
app.config.globalProperties.$http = DataServices
app.config.globalProperties.$loading = Loading
app.config.globalProperties.$lang = Language

app.mixin({
  beforeCreate() {
    if (localStorage.getItem("language") === 'ar' || localStorage.getItem("language") === 'en') {
      this.$store.commit("channgeLanguage", localStorage.getItem("language"));
    } else {
      this.$store.commit("channgeLanguage", 'ar');
    }
  }
})


app.mount('#app')
