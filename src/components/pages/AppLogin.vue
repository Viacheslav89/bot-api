<template>
  <div class="form">
    <h1 class="form__title">Добро пожаловать</h1>
    <div class="form__control">
      <v-sheet class="mx-auto" width="500" padding="300">
        <v-form @submit.prevent>
          <v-text-field
            v-model="userData.email"
            :rules="validationEmail"
            label="First name"
          ></v-text-field>

          <v-text-field
            v-model="userData.password"
            label="Last name"
          ></v-text-field>

          <p class="form__error">
            <span class="form__error-message" v-if="!error"
              >Неверный логин и пароль</span
            >
          </p>

          <v-btn
            class="mt-2"
            type="submit"
            color="#32afc0"
            block
            @click="handleLogin()"
            >Войти</v-btn
          >
        </v-form>
      </v-sheet>
    </div>
    <p class="form__registration registration">
      Нет аккаунта?
      <a href="#" class="registration__link">Зарегистрироваться</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { UserFormData } from "./../../type";
import { useAdminStore } from "./../../stores/useAdminSrore";
import { useLoginFormStore } from "./../../stores/useLoginFormStore";
import { useRouter } from "vue-router";

const userStore = useAdminStore();
const loginFormStore = useLoginFormStore();
const router = useRouter();

const error = computed(() => {
  if (!loginFormStore.isCorrectFormData.value) {
    return false;
  } else {
    return true;
  }
});

const userData = ref<UserFormData>({
  email: "admin@axas.ru",
  password: "123123123",
});

const validationEmail = ref([
  (value: string) => {
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    re.test(String(value).toLowerCase());
    if (re.test(String(value).toLowerCase())) return true;
    return "Введите корректный email";
  },
]);

const handleLogin = async () => {
  await loginFormStore.login(userData.value);

  if (userStore.user.isSuperuser) {
    router.push({ name: "Main" });
  }
};
</script>

<style setup lang="scss">
.form {
  width: 500px;
  margin: 120px auto;

  &__title {
    text-align: left;
    font-size: 32px;
    margin-bottom: 20px;
    font-weight: 400;
    font-family: sans-serif;
  }

  &__error {
    color: rgb(197, 20, 20);
    font-size: 13px;
    margin-bottom: 15px;
  }

  &__error-message {
    display: block;
    background-color: rgb(252, 233, 233);
    padding: 8px;
    padding-left: 16px;
    color: rgb(197, 20, 20);
  }

  &__control {
    margin-bottom: 25px;
  }
}

.registration {
  text-align: center;

  &__link {
    text-decoration: none;
    color: #32afc0;
  }
}
</style>
