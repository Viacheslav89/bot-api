import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '../plugins/api';
import type { User, UserCreate } from '../type';

const userCreateInitial = (): UserCreate => {
  return {
    email: '',
    tel: null,
    is_active: false,
    is_superuser: false,
    fullName: '',
    password: '',
  };
};

const usersList = ref<User[]>([]);
const currentUserId = ref<number | null>(null);
const isOpenUpdateUserForm = ref(false);

export const useUsersStore = defineStore('users', () => {
  const fetchDataUsers = async () => {
    try {
      const response = await api('users/');
      usersList.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (user: UserCreate) => {
    try {
      const response = await api.post('users/', {
        ...user,
      });
      usersList.value.push(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (userId: number, updateUser: UserCreate) => {
    try {
      const response = await api.put(`users/${userId}/`, updateUser);
      const index = usersList.value.findIndex((user) => user.id === userId);
      const currentUser = usersList.value[index];

      usersList.value.splice(index, 1, {
        ...currentUser,
        ...updateUser,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      const response = await api.delete(`users/${userId}/`);
      const index = usersList.value.findIndex((user) => user.id === userId);
      usersList.value.splice(index, 1);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    usersList,
    currentUserId,
    isOpenUpdateUserForm,

    userCreateInitial,
    fetchDataUsers,
    createUser,
    editUser,
    deleteUser,
  };
});
