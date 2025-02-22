<template>
  <MainPage>
    <div class="mailing">
      <h1 class="mailing__title">Рассылка</h1>
    </div>
  </MainPage>
</template>

<script setup lang="ts">
import MainPage from '@/views/MainView.vue';
</script>

<style scoped lang="scss">
.mailing {
  &__title {
    font-size: 30px;
    text-align: center;
    font-weight: 400;
    font-family: Roboto, sans-serif;
    margin-top: 50px;
  }
}
</style>
