import {User} from './user';

export class Project {
  title: string;
  description: string;
  specific_objectives: string;
  initial_date: Date;
  final_date: Date;
  enabled?: boolean;
  category: string;
  user_id: number;
}
