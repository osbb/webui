import { Poll, Auth, Flat, House, User } from '../models';

export interface AppStore {
  polls: Array<Poll>;
  auth: Auth;
  houses: Array<House>;
  selectedHouse: House;
  flats: Array<Flat>;
  selectedFlat: Flat;
  currentUser: User;
}
