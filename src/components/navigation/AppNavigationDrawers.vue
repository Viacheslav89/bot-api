<template>
    <v-navigation-drawer expand-on-hover mobile-breakpoint="xs" rail>
      <v-list>
        <v-list-item
          prepend-avatar=""
          prepend-icon="mdi-menu"
          :subtitle="userStore.user.email"
          :title="userStore.user.fullName"
        ></v-list-item>
      </v-list>
  
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Пользователи"
          value="myfiles"
          @click="openUsers"
        ></v-list-item>
  
        <v-list-item
          prepend-icon="mdi-information "
          title="Информация"
          value="shared"
          color="gray"
          @click="openInfo"
        ></v-list-item>
  
        <v-list-item
          prepend-icon="mdi-star"
          title="Рассылка"
          value="starred"
          @click="openMailing"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script setup lang="ts">
  import { useAdminStore } from '../../stores/useAdminSrore';
  import { useRouter } from 'vue-router';
  import { useUsersStore } from '@/stores/useUsersStore';
  
  const userStore = useAdminStore();
  const usersStore = useUsersStore();
  const router = useRouter();
  
  const openUsers = () => {
    if (router.currentRoute.value.name === 'Users') return;
    if (router.currentRoute.value.name !== 'Users') {
      router.push({ name: 'Users' });
      usersStore.fetchDataUsers();
    } else {
      router.push({ name: 'Main' });
    }
  };
  
  const openInfo = () => {
    if (router.currentRoute.value.name === 'Info') return;
    if (router.currentRoute.value.name !== 'Info') {
      router.push({ name: 'Info' });
    } else {
      router.push({ name: 'Main' });
    }
  };
  
  const openMailing = () => {
    if (router.currentRoute.value.name === 'Mailing') return;
    if (router.currentRoute.value.name !== 'Mailing') {
      router.push({ name: 'Mailing' });
    } else {
      router.push({ name: 'Main' });
    }
  };
  </script>
  