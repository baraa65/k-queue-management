import { action, makeObservable } from 'mobx';
import { IQueue, Queue } from '../types/queue';
import { usersStore } from './users';

class QueuesStore {
  queues: Queue[] = [];

  constructor() {
    makeObservable(this, { queues: true, getQueues: action, addQueue: action });
  }

  getQueue(id: string) {
    return this.queues.find(q => q.id === id) || null;
  }

  getQueues() {
    this.queues = [
      new Queue({
        id: '1',
        title: 'test',
        members: usersStore.users,
        activeMemberId: '1',
      }),
      new Queue({ id: '2', title: 'test 2', members: [] }),
    ];
  }

  addQueue(queue: IQueue) {
    this.queues.push(new Queue(queue));
  }
}

const queuesStore = new QueuesStore();

export { queuesStore };
