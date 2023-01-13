import { action, makeObservable } from 'mobx';
import { Queue } from '../types/queue';

class QueuesStore {
  queues: Queue[] = [];

  constructor() {
    makeObservable(this, { queues: true, getQueues: action });
  }

  getQueues() {
    this.queues = [
      { id: '1', title: 'test' },
      { id: '2', title: 'test 2' },
    ];
  }
}

const queuesStore = new QueuesStore();

export { queuesStore };
