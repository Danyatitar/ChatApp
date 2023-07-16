import BaseRepository from './base.repository';
import {Users} from 'models';

export default class UsersRepository extends BaseRepository {
  constructor() {
    super(Users);
  }
}
