<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="usersStore.isOpenUpdateUserForm" max-width="600">
      <v-form ref="form">
        <v-card prepend-icon="mdi-account" title="User Profile">
          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="12" sm="6">
                <v-text-field
                  label="Имя"
                  v-model="user.fullName"
                  :rules="validateName"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  label="Email"
                  :rules="validationEmail"
                  v-model="user.email"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" sm="6">
                <v-text-field
                  label="Телефон"
                  :rules="[user.fullName.length > 0 || 'Введите телефон']"
                  class="form__input"
                  v-model="user.tel"
                  type="tel"
                  required
                  @input="validateTel($event)"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12" sm="6">
                <v-text-field
                  label="Пароль"
                  :rules="[user.fullName.length > 0 || 'Введите пароль']"
                  type="text"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="Закрыть" variant="plain" @click="closeForm()"></v-btn>

            <v-btn
              color="primary"
              :text="buttonTitle"
              variant="tonal"
              @click="takeUser(user)"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useUsersStore } from '@/stores/useUsersStore';
import type { UserCreate } from '@/type';

const usersStore = useUsersStore();
const form = ref();

const buttonTitle = computed(() => {
  if (usersStore.currentUserId) {
    return 'Редактировать';
  }
  return 'Создать';
});

const userData = computed(() => {
  if (usersStore.currentUserId) {
    const index = usersStore.usersList.findIndex(
      (user) => user.id === usersStore.currentUserId
    );
    return {
      ...usersStore.userCreateInitial(),
      email: usersStore.usersList[index].email,
      tel: usersStore.usersList[index].tel,
      fullName: usersStore.usersList[index].fullName,
      password: '',
    };
  } else {
    return {
      ...usersStore.userCreateInitial(),
      email: 'test@mail.ru',
    };
  }
});

const user = ref<UserCreate>({
  ...userData.value,
});

const closeForm = () => {
  usersStore.isOpenUpdateUserForm = false;
  usersStore.currentUserId = null;
};

const takeUser = async (updateUser: UserCreate) => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  const newPhoneNumber = updateUser.tel
    ? updateUser.tel.replace(/[\s\-\(\)]/g, '').replace('+7', '8')
    : null;

  if (usersStore.currentUserId) {
    usersStore.editUser(usersStore.currentUserId, {
      ...updateUser,
      tel: newPhoneNumber,
    });
  } else {
    usersStore.createUser({
      ...updateUser,
      tel: newPhoneNumber,
    });
  }
  closeForm();
};

const validationEmail = ref([
  (value: string) => {
    const re =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    re.test(String(value).toLowerCase());

    if (
      usersStore.usersList.some((user) => user.email === value) &&
      !usersStore.currentUserId
    )
      return 'Такой email уже существует';

    if (re.test(String(value).toLowerCase())) return true;
    return 'Введите корректный email';
  },
]);

const validateName = ref([
  (value: string) => {
    if (value.length > 0) return true;
    return 'Введите имя';
  },

  (value: string) => {
    if (value.length < 20) return true;
    return 'Имя не должно превышать 20 символов';
  },
]);

const validateTel = (event: Event) => {
  let value = (event.target as HTMLInputElement).value.replace(/\D/g, '');
  const countryCode = '+7';

  if (value.length === 0) {
    (event.target as HTMLInputElement).value = '';
    return;
  }

  if (value.startsWith('7') || value.startsWith('8')) {
    value = value.substring(1);
  }

  const areaCode = value.substring(0, 3);
  const firstPart = value.substring(3, 6);
  const secondPart = value.substring(6, 8);
  const thirdPart = value.substring(8, 10);

  let formattedValue = countryCode;

  if (areaCode) {
    formattedValue += `(${areaCode}`;
  }
  if (firstPart) {
    formattedValue += `) ${firstPart}`;
  }
  if (secondPart) {
    formattedValue += `-${secondPart}`;
  }
  if (thirdPart) {
    formattedValue += `-${thirdPart}`;
  }

  user.value.tel = formattedValue;
};
</script>

<style scoped lang="scss">
.form {
  &__wrapper {
    padding: 35px 60px;
  }

  &__button {
    width: 49%;
  }

  &__buttons {
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
}
</style>
