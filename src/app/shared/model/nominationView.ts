import {User} from './user';
import {ProjectProfileView} from './projectsprofileView';

export class NominationView {
  id?: string;
  projectprofile: ProjectProfileView;
  user: User;
  state?: string;
}
