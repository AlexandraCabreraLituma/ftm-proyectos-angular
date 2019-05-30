import {Project} from './project';
import {Profile} from './profile';

export class ProjectProfileView {
  id?: string;
  project: Project;
  profile: Profile;
  state?: boolean;
}
