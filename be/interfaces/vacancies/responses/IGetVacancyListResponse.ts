import {IGetVacancy} from './IGetVacancy';

export interface IGetVacancyListResponse {
  vacancies: IGetVacancy[];
  page: number;
  limit: number;
  total: number;
}
