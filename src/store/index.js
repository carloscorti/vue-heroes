import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  heroes: [
    {
      id: 10,
      firstName: 'Eleonor',
      lastName: 'Jax',
      capeCounter: 1,
      originDate: '10/11/1945',
      description: 'fashionista',
    },
  ],
};
const mutations = {};
const actions = {};
const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
