import Vue from 'vue';
import Vuex from 'vuex';

import { getApiData, addHero, updateHero, deleteHero } from '@/shared';
import {
  GET_HEROES,
  ADD_HERO,
  UPDATE_HERO,
  DELETE_HERO,
} from '@/store/mutations-types';

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
  [UPDATE_HERO](state, updatedHero) {
    state.heroes = state.heroes.map(
      // eslint-disable-next-line prettier/prettier
      hero => (hero = hero.id === updateHero.id ? updatedHero : hero),
    );
  },
  [DELETE_HERO](state, deletedHeroId) {
    state.heroes = state.heroes.filter(hero => hero.id !== deletedHeroId);
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

  async updateHeroAction({ commit }, hero) {
    const updatedHero = await updateHero(hero);
    commit(UPDATE_HERO, updatedHero);
    // commit(ADD_HERO, updatedHero);
  },

  async deleteHeroAction({ commit }, hero) {
    const updatedHeroId = await deleteHero(hero);
    commit(DELETE_HERO, updatedHeroId);
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
