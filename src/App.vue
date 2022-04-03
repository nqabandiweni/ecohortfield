<template>
  <div id="app">
    <div id="nav">
       <div v-if="loading" class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span v-if="!loading"  @click="refresh"><i class="bi bi-arrow-repeat" style="font-size: 2rem;"></i></span>
     
    </div>
    <router-view/>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{

    }
  },
  computed:{
    ...mapState(['loading'])
  },
  methods:{
    refresh:function(){
      this.$store.dispatch('fetchAllAppointments')
      .then()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
