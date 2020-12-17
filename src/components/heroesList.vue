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

    <!-- <div class="columns" v-if="selectedHero">
      <div class="column is-3">
        <header class="card-header">
          <p class="card-header-title">{{ fullName }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label" for="id">id</label>
              <label class="input" id="id" readonly>
                {{ selectedHero.id }}
              </label>
            </div>
            <div class="field">
              <label class="label" for="firstName">first name</label>
              <input
                class="input"
                id="firstName"
                v-model="selectedHero.firstName"
              />
            </div>
            <div class="field">
              <label for="show" class="checkbox">
                Show More
                <input
                  type="checkbox"
                  id="show"
                  class="is-primary"
                  v-model="showMore"
                />
              </label>
            </div>
            <div class="field" v-show="showMore">
              <label class="label" for="lastName">last name</label>
              <input
                class="input"
                id="lastName"
                v-model="selectedHero.lastName"
              />
            </div>
            <div class="field" v-show="showMore">
              <label class="label" for="description">description</label>
              <input
                class="input"
                id="description"
                v-model="selectedHero.description"
              />
            </div>
            <div class="field" v-show="showMore">
              <label class="label" for="bornDate">Born Date</label>
              <input
                class="input"
                id="bornDate"
                type="date"
                v-model="selectedHero.bornDate"
              />
              <p class="comment">
                Origin date was {{ selectedHero.bornDate | commentDateFormat }}
              </p>
            </div>
            <div class="field" v-show="showMore">
              <label class="label" for="capeCounter">Cape Counter</label>
              <input
                class="input"
                id="capeCounter"
                min="0"
                type="number"
                v-model="selectedHero.capeCounter"
              />
            </div>
            <div class="field" v-show="showMore">
              <label class="label" for="capeMessage">Cape Message</label>
              <label class="input" name="capeMessage">{{ capeMessage }}</label>
            </div>
          </div>
        </div>
      </div>
    </div> -->
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
import { format } from 'date-fns';

import HeroDetail from '@/components/hero-detail';

const inputDateFormat = 'yyyy-MM-dd';

const mockHeroes = [
  {
    id: 10,
    firstName: 'Ellen',
    lastName: 'Stone',
    description: 'fashionista',
    bornDate: format(new Date(1998, 5, 25), inputDateFormat),
    capeCounter: 0,
  },
  {
    id: 20,
    firstName: 'Megan',
    lastName: 'Weiss',
    description: 'the cat whisperer',
    bornDate: format(new Date(1973, 3, 10), inputDateFormat),
    capeCounter: 1,
  },
  {
    id: 30,
    firstName: 'Harold',
    lastName: 'Morgan',
    description: 'pen wielder',
    bornDate: format(new Date(2008, 3, 16), inputDateFormat),
    capeCounter: 3,
  },
  {
    id: 40,
    firstName: 'Paris',
    lastName: 'Papper',
    description: 'arc trooper',
    bornDate: format(new Date(1920, 11, 12), inputDateFormat),
    capeCounter: 4,
  },
];

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
