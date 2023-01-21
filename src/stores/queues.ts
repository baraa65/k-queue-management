import firestore from '@react-native-firebase/firestore';
import { makeAutoObservable } from 'mobx';
import { IQueue, Queue } from '../types/queue';

class QueuesStore {
  queues: Queue[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getQueue(id: string) {
    return this.queues.find(q => q.id === id) || null;
  }

  async getQueues() {
    const queues = await firestore().collection<IQueue>('queues').get();

    this.queues = queues.docs.map(
      queue => new Queue({ id: queue.id, ...queue.data() }),
    );
  }

  async addQueue(data: IQueue) {
    const queueRef = await firestore().collection<IQueue>('queues').add(data);
    const queue = await queueRef.get();

    const queueData = queue.data();
    if (queueData) this.queues.push(new Queue({ id: queue.id, ...queueData }));
  }
}

const queuesStore = new QueuesStore();

export { queuesStore };
