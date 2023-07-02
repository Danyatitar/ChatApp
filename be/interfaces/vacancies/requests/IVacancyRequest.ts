import {SortOrder} from 'mongoose';

export interface IVacancyRequest {
  page: number;
  limit: number;
  sortOrder: SortOrder;
  sortField?: string;
}
