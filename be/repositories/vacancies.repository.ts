import BaseRepository from './base.repository';
import {Vacancies} from '../models';

export default class VacanciesRepository extends BaseRepository {
  constructor() {
    super(Vacancies);
  }
}
