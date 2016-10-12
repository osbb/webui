import { Poll } from '../models/poll.model';
import { Auth } from '../models/auth.model';
import { Flat } from '../models/flat.model';
import { House } from '../models/house.model';

export interface AppStore {
  polls: Array<Poll>;
  auth: Auth;
  houses: Array<House>;
  selectedHouse: House;
  flats: Array<Flat>;
  selectedFlat: Flat;
}
