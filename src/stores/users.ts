import { IUser } from '../types/user';

class UsersStore {
  users: IUser[] = [
    { id: '1', username: 'baraa', password: 'baraa' },
    { id: '2', username: 'adnan', password: 'adnan' },
    { id: '3', username: 'taha', password: 'taha' },
  ];

  getUsers() {
    return this.users;
  }
}

const usersStore = new UsersStore();

export { usersStore };
