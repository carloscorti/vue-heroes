<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
    </div>
    <ul v-if="!selectedHero">
      <li v-for="hero in heroes" :key="hero.id">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <div :key="hero.name" class="name">
                {{ hero.firstName }} {{ hero.lastName }}
              </div>
              <div class="description">{{ hero.description }}</div>
            </div>
          </div>
          <footer class="card-footer">
            <button
              class="link card-footer-item"
              @click="setSelectedHero(hero)"
            >
              <i class="fas fa-check"></i>
              <span>Select</span>
            </button>
          </footer>
        </div>
      </li>
    </ul>

    <HeroDetail
      v-if="selectedHero"
      :hero="selectedHero"
      :showMore="showMore"
      @save="saveHero"
      @cancel="cancelHero"
    />
    <div class="notification is-info" v-show="showMore && message">
      <pre>{{ message }}</pre>
    </div>
  </div>
</template>

<script>
import HeroDetail from '@/components/hero-detail';

import { mockHeroes } from '@/shared';

export default {
  name: 'Heroes',
  components: {
    HeroDetail,
  },
  data() {
    return {
      selectedHero: undefined,
      showMore: false,
      heroes: [],
      message: '',
      // capeMessage: '',
    };
  },
  created() {
    this.loadValues();
  },

  methods: {
    cancelHero() {
      this.selectedHero = undefined;
    },

    saveHero(emitedHero) {
      const index = this.heroes.findIndex(h => h.id === emitedHero.id);
      this.heroes.splice(index, 1, emitedHero);
      this.heroes = [...this.heroes];
      this.selectedHero = undefined;
    },

    setSelectedHero(hero) {
      this.selectedHero = hero;
    },

    async getHeroes() {
      return new Promise(resolve => {
        setTimeout(() => resolve(mockHeroes), 1500);
      });
    },

    async loadValues() {
      this.showMore = true;
      this.message = 'loading heroes, please hold';
      this.heroes = await this.getHeroes();
      this.message = '';
      this.showMore = false;
    },
  },
};
</script>
