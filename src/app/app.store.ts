import { Poll } from './poll.model';
import { Auth } from './auth.model';
import { Flat } from './flat.model';
import { House } from './house.model';

export interface AppStore {
  polls: Array<Poll>;
  auth: Auth;
  houses: Array<House>;
  selectedHouse: House;
  flats: Array<Flat>;
  selectedFlat: Flat;
}
