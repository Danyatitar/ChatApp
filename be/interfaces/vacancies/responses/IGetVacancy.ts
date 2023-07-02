import {IGetQuestions} from 'interfaces/questions/responses/IGetQuestions';
import {VacancyStatus, VacancyType} from '@utils/enums';
export interface IGetVacancy {
  title: string;
  status: VacancyStatus;
  type: VacancyType;
  openedDate?: Date;
  link?: string;
  description: string;
  questions?: IGetQuestions[];
}
