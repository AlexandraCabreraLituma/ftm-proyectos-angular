import {Project} from './project';
import {Profile} from './profile';

export class ProjectProfileView {
  id?: number;
  project: Project;
  profile: Profile;
  state?: boolean;
}
