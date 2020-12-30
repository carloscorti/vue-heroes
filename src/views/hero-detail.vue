<template>
  <div class="columns">
    <h2 class="title">{{ title }}</h2>

    <div class="column is-3">
      <header class="card-header">
        <p class="card-header-title">{{ clonedHero.fullName }}</p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field">
            <label class="label" for="id">id</label>
            <label class="input" id="id" readonly>
              {{ clonedHero.id }}
            </label>
          </div>
          <div class="field">
            <label class="label" for="firstName">first name</label>
            <input
              class="input"
              id="firstName"
              v-model="clonedHero.firstName"
            />
          </div>
          <div class="field">
            <label for="show" class="checkbox">
              Show More
              <input
                type="checkbox"
                id="show"
                class="is-primary"
                v-model="showMoreDetails"
              />
            </label>
          </div>
          <div class="field" v-show="showMoreDetails">
            <label class="label" for="lastName">last name</label>
            <input class="input" id="lastName" v-model="clonedHero.lastName" />
          </div>
          <div class="field" v-show="showMoreDetails">
            <label class="label" for="description">description</label>
            <input
              class="input"
              id="description"
              v-model="clonedHero.description"
            />
          </div>
          <div class="field" v-show="showMoreDetails">
            <label class="label" for="originDate">Born Date</label>
            <input
              class="input"
              id="originDate"
              type="date"
              v-model="clonedHero.originDate"
            />
            <p class="comment">
              Origin date was {{ clonedHero.originDate | commentDateFormat }}
            </p>
          </div>
          <div class="field" v-show="showMoreDetails">
            <label class="label" for="capeCounter">Cape Counter</label>
            <input
              class="input"
              id="capeCounter"
              min="0"
              type="number"
              v-model="clonedHero.capeCounter"
            />
          </div>
          <div class="field" v-show="showMoreDetails">
            <label class="label" for="capeMessage">Cape Message</label>
            <label class="input" name="capeMessage">{{ capeMessage }}</label>
          </div>
          <footer class="card-footer">
            <button
              class="link card-footer-item cancel-button"
              @click="cancelHero()"
            >
              <i class="fas fa-undo"></i>
              <span>Cancel</span>
            </button>
            <button class="link card-footer-item" @click="saveHero()">
              <i class="fas fa-save"></i>
              <span>Save</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from 'date-fns';

import cloneDeep from 'lodash.clonedeep';

import { mapGetters, mapActions } from 'vuex';

import {
  // lifecycleHooks,
  // heroWatchers,
  inputDateFormat,
  displayDateFormat,
} from '@/shared';

export default {
  name: 'HeroDetail',
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showMoreDetails: false,
      clonedHero: {},
    };
  },

  created() {
    if (this.isAddMode) {
      this.clonedHero = {
        id: undefined,
        firstName: '',
        lastName: '',
        description: '',
        capeCounter: 0,
        originDate: format(new Date('01/01/2000'), inputDateFormat),
      };
    } else {
      this.clonedHero = cloneDeep(this.getHeroById(this.id));
    }
  },

  mixins: [
    // lifecycleHooks,
    // heroWatchers('clonedHero.capeCounter'),
    // heroWatchers('showMoreDetails'),
  ],

  computed: {
    // ...mapGetters({ getHeroById: 'getHeroById' }),
    ...mapGetters(['getHeroById']),
    isAddMode() {
      return !this.id;
    },
    title() {
      return `${this.isAddMode ? 'Add' : 'Edit'} Hero`;
    },
  },
  methods: {
    ...mapActions(['addHeroAction', 'updateHeroAction']),

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

    async saveHero() {
      this.clonedHero.id
        ? await this.updateHeroAction(this.clonedHero)
        : await this.addHeroAction(this.clonedHero);
      this.$router.push('/heroes');
    },

    cancelHero() {
      this.$router.push({ name: 'heroes' });
    },
  },
  watch: {
    'clonedHero.capeCounter': {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(`old values=${oldValue} -- new values=${newValue}`);
        this.handleTheCapes(newValue);
      },
    },
  },
  filters: {
    commentDateFormat: value => {
      if (value) {
        return format(parseISO(value), displayDateFormat);
      }
      return;
    },
  },
};
</script>
