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
      console.log({ username, password });
      usersStore.users.forEach(user => console.log(user));
      const currentUser = usersStore.users.find(
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
