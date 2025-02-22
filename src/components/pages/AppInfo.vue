<template>
  <MainPage>
    <div class="info">
      <h1 class="info__title">Информация</h1>
    </div>
  </MainPage>
</template>

<script setup lang="ts">
import MainPage from "@/views/MainView.vue";
</script>

<style scoped lang="scss">
.info {
  &__title {
    font-size: 30px;
    text-align: center;
    font-weight: 400;
    font-family: Roboto, sans-serif;
    margin-top: 50px;
  }
}
</style>
