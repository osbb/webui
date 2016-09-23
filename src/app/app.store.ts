import { Decision } from './decision.model';
import { Auth } from './auth.model';
import { Flat } from './flat.model';

export interface AppStore {
  decisions: Array<Decision>;
  auth: Auth;
  flats: Array<Flat>;
}
