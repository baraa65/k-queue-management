import { IUser, User } from '../types/user';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
class UsersStore {
  users: IUser[] = [];

  getUsers() {
    return this.users;
  }

  pushUser(user: FirebaseFirestoreTypes.DocumentSnapshot<IUser>) {
    const data = user.data();

    if (data) this.users.push(new User({ id: user.id, ...data }));
  }

  setUsers(users: FirebaseFirestoreTypes.QueryDocumentSnapshot<IUser>[]) {
    this.users = users.map(user => new User({ id: user.id, ...user.data() }));
  }

  async addUser(data: IUser) {
    const userRef = await firestore().collection<IUser>('users').add(data);
    const user = await userRef.get();
    this.pushUser(user);
  }

  async fetchUsers() {
    const users = await firestore().collection<IUser>('users').get();

    this.setUsers(users.docs);

    return this.users;
  }
}

const usersStore = new UsersStore();

export { usersStore };
