import { makeAutoObservable } from 'mobx';
import { User } from '../types/user';
import { usersStore } from './users';

class AuthStore {
  user?: User;

  constructor() {
    makeAutoObservable(this);
  }

  login({ username, password }: { username: string; password: string }) {
    return new Promise((resolve, reject) => {
      const users = usersStore.getUsers();

      const currentUser = users.find(
        u => u.username === username && u.password === password,
      );

      if (currentUser) {
        this.user = currentUser;
        return resolve({ user: this.user });
      }
      reject('Login Failed!');
    });
  }
}

const authStore = new AuthStore();

export { authStore };
