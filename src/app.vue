<template>
  <div id="app">
    <HeaderBar />
    <div class="main-section content-title-group">
      <!-- <Heroes /> -->
      <HeroesList />
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar';
// import Heroes from '@/components/heroes';
import HeroesList from '@/components/heroesList';

export default {
  name: 'App',
  // components: { HeaderBar, Heroes },
  components: { HeaderBar, HeroesList },
};
</script>

<style lang="scss">
@import '@/design/index.scss';
</style>
