import {User} from './user';

export class Project {
  title: string;
  description: string;
  key_words: string;
  initial_date: Date;
  final_date: Date;
  enabled?: boolean;
  user_id: number;
}
