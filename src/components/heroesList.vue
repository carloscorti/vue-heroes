<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
    </div>
    <div class="columns">
      <div class="column is-3">
        <header class="card-header">
          <p class="card-header-title">heroes list</p>
        </header>
        <ul class="card-content is-hoverable" v-if="heroes.length > 0">
          <li v-for="hero in heroes" :key="hero.id">
            <a
              href="#"
              class="list-item"
              :class="{ 'is-active': selectedHero === hero }"
              @click="setSelectedHero(hero)"
            >
              <span>{{ hero.firstName }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="columns" v-if="selectedHero">
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
    </div>
    <div class="notification is-info" v-show="showMore && message">
      <pre>{{ message }}</pre>
    </div>
  </div>
</template>

<script>
const mockHeroes = [
  {
    id: 10,
    firstName: 'Ellen',
    lastName: 'Stone',
    description: 'fashionista',
    capeCounter: 0,
  },
  {
    id: 20,
    firstName: 'Megan',
    lastName: 'Weiss',
    description: 'the cat whisperer',
    capeCounter: 1,
  },
  {
    id: 30,
    firstName: 'Harold',
    lastName: 'Morgan',
    description: 'pen wielder',
    capeCounter: 3,
  },
  {
    id: 40,
    firstName: 'Paris',
    lastName: 'Papper',
    description: 'arc trooper',
    capeCounter: 4,
  },
];

export default {
  name: 'Heroes',
  data() {
    return {
      selectedHero: undefined,
      showMore: false,
      heroes: [],
      message: '',
      capeMessage: '',
    };
  },
  created() {
    this.loadValues();
  },
  computed: {
    fullName() {
      return `${this.selectedHero.firstName} ${this.selectedHero.lastName}`;
    },
  },
  methods: {
    setSelectedHero(hero) {
      this.selectedHero = hero;
    },

    handleTheCapes(newValue) {
      const value = parseInt(newValue, 10);
      switch (value) {
        case 0:
          this.capeMessage = 'Where is my cape?';
          break;
        case 1:
          this.capeMessage = 'One is all I need';
          break;
        case 2:
          this.capeMessage = 'Always have a spare';
          break;
        default:
          this.capeMessage = 'You can never have enough capes';
          break;
      }
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
  watch: {
    'selectedHero.capeCounter': {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(`old values=${oldValue} -- new values=${newValue}`);
        this.handleTheCapes(newValue);
      },
    },
  },
};
</script>
