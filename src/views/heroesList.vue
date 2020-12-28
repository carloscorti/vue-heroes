<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
      <button class="button refresh-button" @click="loadHeroes()">
        <i class="fas fa-sync"></i>
      </button>
      <router-link
        tag="button"
        class="button add-button"
        :to="{ name: 'detail', params: { id: 0 } }"
      >
        <i class="fas fa-plus"></i>
      </router-link>
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
            <button class="link card-footer-item" @click="askToDelete(hero)">
              <i class="fas fa-trash"></i>
              <span>Delete</span>
            </button>
            <router-link
              tag="button"
              class="link card-footer-item"
              :to="{ name: 'detail', params: { id: hero.id } }"
            >
              <i class="fas fa-check"></i>
              <span>Select</span>
            </router-link>
          </footer>
        </div>
      </li>
    </ul>
    <!-- <div class="notification is-info" v-show="showModal && message"> -->
    <div class="notification is-info" v-show="message">
      <pre>{{ message }}</pre>
    </div>
    <Modal
      :message="modalMessage"
      :isOpen="showModal"
      @handleNo="closeModal"
      @handleYes="deleteHero"
    >
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  lifecycleHooks,
  heroWatchers,
  logger,
  getApiData,
  deleteHero,
} from '@/shared';

import Modal from '@/components/modal';

export default {
  name: 'HeroesList',
  data() {
    return {
      showModal: false,
      // heroes: [],
      message: '',
      heroToDelete: null,
    };
  },
  components: {
    Modal,
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
    await this.loadHeroes();
  },

  methods: {
    askToDelete(hero) {
      this.heroToDelete = hero;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async deleteHero() {
      this.closeModal();
      if (this.heroToDelete) {
        deleteHero(this.heroToDelete);
      }
      await this.loadHeroes();
    },

    async loadHeroes() {
      // this.showModal = true;
      this.message = 'loading heroes, please hold';
      // this.heroes = await await getApiData();
      this.message = '';
      // this.showModal = false;
    },
  },
  computed: {
    // heroes() {
    //   return this.$store.state.heroes;
    // },

    // ...mapState({ heroes: state => state.heroes }),
    // ...mapState({ heroes: 'heroes' }),
    ...mapState(['heroes']),

    modalMessage() {
      const name =
        this.heroToDelete && this.heroToDelete.fullName
          ? this.heroToDelete.fullName
          : '';
      return `Would you like to delete ${name} ?`;
    },
  },
};
</script>
