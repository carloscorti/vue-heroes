<template>
  <div id="app">
    <HeaderBar />
    <div class="main-section content-title-group">
      <!-- <HeroesList /> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar';

export default {
  name: 'App',
  components: { HeaderBar },
};
</script>

<style lang="scss">
@import '@/design/index.scss';
</style>
