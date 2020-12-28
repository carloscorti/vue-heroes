import Vue from 'vue';
import Vuex from 'vuex';

import { getApiData } from '@/shared';
import { GET_HEROES } from '@/store/mutations-types';

Vue.use(Vuex);

const state = {
  heroes: [],
};
const mutations = {
  [GET_HEROES](state, heroes) {
    state.heroes = heroes;
  },
};
const actions = {
  async getHeroesAction({ commit }) {
    const heroesList = await getApiData();
    commit(GET_HEROES, heroesList);
  },
};
const getters = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
