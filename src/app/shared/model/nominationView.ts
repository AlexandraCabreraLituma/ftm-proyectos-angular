import {User} from './user';
import {ProjectProfileView} from './projectsprofileView';

export class NominationView {
  id?: number;
  projectprofile: ProjectProfileView;
  user: User;
  state?: string;
}
