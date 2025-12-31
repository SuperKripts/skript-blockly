<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue"
import MainComponent from "@/components/MainComponent.vue"
import FooterComponent from "@/components/FooterComponent.vue"
</script>

<template>
  <div class="container">
    <HeaderComponent />
    <MainComponent class="main" />
    <FooterComponent />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.main {
  flex: 1;
}
</style>
