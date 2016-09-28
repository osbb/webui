import { Decision } from './decision.model';
import { Auth } from './auth.model';
import { Flat } from './flat.model';
import { House } from './house.model';

export interface AppStore {
  decisions: Array<Decision>;
  auth: Auth;
  flats: Array<Flat>;
  houses: Array<House>;
  selectedHouse: House;
}
