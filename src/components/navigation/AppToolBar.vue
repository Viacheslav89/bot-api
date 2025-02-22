<template>
  <v-toolbar>
    <v-toolbar-title>Main</v-toolbar-title>

    <v-btn icon @click="openAccaunt">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>

    <v-btn icon @click="exitAccaunt">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script setup lang="ts">
import { useAdminStore } from '../../stores/useAdminSrore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useAdminStore();

const openAccaunt = () => {
  if (router.currentRoute.value.name !== 'Account') {
    router.push({ name: 'Account' });
  } else {
    router.push({ name: 'Main' });
  }
};

const exitAccaunt = () => {
  userStore.resetUser();
  router.push({ name: 'Login' });
  localStorage.removeItem('token');
};
</script>
