<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
    </div>
    <ul>
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
            <router-link
              :to="{ name: 'detail', params: { id: hero.id } }"
              tag="button"
              class="link card-footer-item"
            >
              <i class="fas fa-check"></i>
              <span>Select</span>
            </router-link>
          </footer>
        </div>
      </li>
    </ul>

    <div class="notification is-info" v-show="showMore && message">
      <pre>{{ message }}</pre>
    </div>
  </div>
</template>

<script>
import { lifecycleHooks, heroWatchers, logger, getApiData } from '@/shared';

export default {
  name: 'HeroesList',
  data() {
    return {
      // selectedHero: undefined,
      showMore: false,
      heroes: [],
      message: '',
    };
  },
  mixins: [
    lifecycleHooks,
    heroWatchers('message'),
    heroWatchers('selectedHero'),
  ],

  async created() {
    logger.info(
      // eslint-disable-next-line
      `${this.componentName} called created hook from component itself`,
    );
    await this.loadValues();
  },

  methods: {
    //   cancelHero() {
    //     this.selectedHero = undefined;
    //   },

    // saveHero(emitedHero) {
    //   const index = this.heroes.findIndex(h => h.id === emitedHero.id);
    //   this.heroes.splice(index, 1, emitedHero);
    //   this.heroes = [...this.heroes];
    //   this.selectedHero = undefined;
    // },

    // setSelectedHero(hero) {
    //   this.selectedHero = hero;
    // },

    async getHeroes() {
      return await getApiData();
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
