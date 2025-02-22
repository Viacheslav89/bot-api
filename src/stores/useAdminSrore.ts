import { defineStore } from 'pinia';
import api from '../plugins/api';
import { ref } from 'vue';
import type { User } from './../type';

const userInitial = () => {
  return {
    email: '',
    fullName: '',
    id: 0,
    isActive: false,
    isSuperuser: false,
    lastActivity: null,
    tel: null,
  };
};

export const useAdminStore = defineStore('admin', () => {
  const isAuthenticated = ref(false);
  const user = ref<User>({ ...userInitial() });

  const resetUser = () => {
    user.value = userInitial();
    isAuthenticated.value = false;
  };

  const updateUser = (newUserData: User) => {
    Object.assign(user.value, newUserData);
  };

  const restoreSession = async () => {
    const userStore = useAdminStore();
    try {
      if (localStorage.getItem('token')) {
        const response = await api.get('/users/me/');
        if (response.status === 200) {
          isAuthenticated.value = true;
          userStore.updateUser(response.data.data);
        } else {
          isAuthenticated.value = false;
        }
      } else {
        isAuthenticated.value = false;
      }

      return isAuthenticated.value;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    isAuthenticated,
    user,
    userInitial,
    restoreSession,
    updateUser,
    resetUser,
  };
});
