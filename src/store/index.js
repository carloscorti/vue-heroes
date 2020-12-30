import Vue from 'vue';
import Vuex from 'vuex';

import { getApiData, addHero } from '@/shared';
import { GET_HEROES, ADD_HERO } from '@/store/mutations-types';

Vue.use(Vuex);

const state = {
  heroes: [],
};

const mutations = {
  [GET_HEROES](state, heroes) {
    state.heroes = heroes;
  },
  [ADD_HERO](state, hero) {
    state.heroes = [...state.heroes, hero];
  },
};

const actions = {
  async getHeroesAction({ commit }) {
    const heroesList = await getApiData();
    commit(GET_HEROES, heroesList);
  },

  async addHeroAction({ commit }, hero) {
    const addedHero = await addHero(hero);
    commit(ADD_HERO, addedHero);
  },
};

const getters = {
  getHeroById: state => id => state.heroes.find(hero => hero.id === id),
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
});
