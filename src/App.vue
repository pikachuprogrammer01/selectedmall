<script setup>
  import { RouterView } from "vue-router";
  import { createPinia } from "pinia";
  import Header from "./components/Header/Header.vue";
  import Footer from "./components/Footer/Footer.vue";

  const pinia = createPinia();
</script>

<template>
  <div id="app">
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }
</style>
