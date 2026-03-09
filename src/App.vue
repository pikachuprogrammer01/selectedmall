<script setup>
  import { RouterView } from "vue-router";
  import Header from "@/components/Header/Header.vue";
  import Footer from "@/components/Footer/Footer.vue";
  import { storeToRefs } from "pinia";
  import { useUserStore } from "@/store/user.js";

  const { isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <div id="app">
    <Header v-if="isLoggedIn" />
    <main>
      <RouterView />
    </main>
    <Footer v-if="isLoggedIn" />
  </div>
</template>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    width: 100%;
    min-height: 100vh;
    max-width: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }
</style>
