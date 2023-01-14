import { makeAutoObservable } from 'mobx';
import { IUser } from './user';

export interface IQueue {
  id?: string;
  title: string;
  members: IUser[];
  activeMemberId?: string;
}

export class Queue implements IQueue {
  id?: string;
  title: string;
  members: IUser[];
  activeMemberId?: string;

  constructor({ id, title, members, activeMemberId }: IQueue) {
    this.id = id;
    this.title = title;
    this.members = members;
    this.activeMemberId = activeMemberId;

    makeAutoObservable(this);
  }

  getNextMember() {
    const currentMemberIndex = this.members.findIndex(
      m => m.id === this.activeMemberId,
    );

    const nextMember =
      this.members[(currentMemberIndex + 1) % this.members.length];

    if (!nextMember) console.error('Member Not Found!');

    return nextMember;
  }

  nextTurn() {
    if (!this.members.length) return;

    if (!this.activeMemberId) {
      this.activeMemberId = this.members[0].id;
      return;
    }

    const nextMember = this.getNextMember();

    if (nextMember) {
      this.activeMemberId = nextMember.id;
    } else {
      this.activeMemberId = this.members[0].id;
    }
  }
}
