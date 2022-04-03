import Vue from 'vue'
import Vuex from 'vuex'
import gql from 'graphql-tag';
import graphqlClient from '../utils/graphql';
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key:"local",
  reducer: (state) => ({ Appointments: state.Appointments })
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Appointments:[],
    visits:[],
    loading:false
  },
  mutations: {
    setVisits(state, visits) {
      state.visits = visits;
    },
    setAppointments(state, appointments) {
      state.Appointments = appointments;
    },
    setlLoadingStatus(state,status){
      state.loading = status
    }
  },
  actions: {
    //get visits by cohort
    async fetchVisits({ commit }, cohort) {
      try {
        const response = await graphqlClient.query({
          // It is important to not use the
          // ES6 template syntax for variables
          // directly inside the `gql` query,
          // because this would make it impossible
          // for Babel to optimize the code.
          query: gql`
            query GetVisits($cohort: CohortInput!) {
              getVisits(cohort: $cohort) 
            }
          `,
          variables: { cohort: cohort },
          fetchPolicy: 'no-cache'
        });
    
        
        commit('setVisits', response.data.getVisits);
        
      } catch (e) {
        console.log(e.networkError.result.errors)
      }
    },
    async fetchAllAppointments({ commit }) {
      try {
        console.log("ey")
        commit('setlLoadingStatus',true)
        const response = await graphqlClient.query({
          
          // It is important to not use the
          // ES6 template syntax for variables
          // directly inside the `gql` query,
          // because this would make it impossible
          // for Babel to optimize the code.
          query: gql`
            query GetAllAppointments {
              getAllAppointments {
                visit
                cohorts{
                  month
                  year
                }
              }
            }`,
          fetchPolicy: "no-cache"
        });
        
        
        commit('setAppointments', response.data.getAllAppointments);
        commit('setlLoadingStatus',false)
        
      } catch (e) {
        console.log(e.networkError.result.errors)
      }
    }
  },
  plugins: [vuexLocal.plugin]
})
