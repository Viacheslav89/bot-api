<template>
  <MainPage>
    <div class="users">
      <h1 class="users__title">Пользователи</h1>

      <div class="users__button">
        <v-btn
          class="mt-2"
          type="submit"
          color="grey"
          block
          @click="toggleForm()"
        >
          Создать пользователя
        </v-btn>
      </div>

      <div class="user__table">
        <v-table density="comfortable">
          <thead>
            <tr>
              <th class="text-left">Имя</th>
              <th class="text-left">Email</th>
              <th class="text-left">Телефон</th>
              <th class="text-left">Действия</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in usersStore.usersList">
              <td class="users__td">{{ user.fullName }}</td>
              <td class="users__td">{{ user.email }}</td>
              <td class="users__td">{{ user.tel }}</td>
              <td>
                <div class="users__buttons">
                  <v-btn
                    fab
                    icon
                    size="x-small"
                    class="users__btn"
                    @click="(usersStore.currentUserId = user.id), toggleForm()"
                    v-if="!user.isSuperuser"
                  >
                    <v-icon>mdi-square-edit-outline</v-icon>
                  </v-btn>

                  <v-btn
                    fab
                    icon
                    size="x-small"
                    class="users__btn"
                    @click="usersStore.deleteUser(user.id)"
                    v-if="!user.isSuperuser"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>

    <AppUsersForm v-if="usersStore.isOpenUpdateUserForm" />
  </MainPage>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useUsersStore } from '@/stores/useUsersStore';
import AppUsersForm from '@/components/pages/AppUserForm.vue';
import type { User } from './../../type';
import MainPage from '@/views/MainView.vue';

const usersStore = useUsersStore();

onMounted(() => {
  usersStore.fetchDataUsers();
});

const toggleForm = () => {
  usersStore.isOpenUpdateUserForm = !usersStore.isOpenUpdateUserForm;
};
</script>

<style scoped lang="scss">
.users {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;

  &__title {
    font-size: 30px;
    text-align: center;
    font-weight: 400;
    font-family: Roboto, sans-serif;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  &__button {
    width: 270px;
    margin: 0 auto 50px auto;
  }

  &__buttons {
    width: 72px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
