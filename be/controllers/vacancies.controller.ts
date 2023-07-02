import {VacancyStatus} from '@utils/enums';

import mongoose, {SortOrder} from 'mongoose';
import vacanciesService from '../services/vacancies/vacancies.service';
import {IGetVacancy} from '../interfaces/vacancies/responses/IGetVacancy';
import {Response, Request} from 'express';
import {IVacancyRequest} from 'interfaces/vacancies/requests/IVacancyRequest';
import {notFound} from '@utils/error';
import {IGetVacancyListResponse} from 'interfaces/vacancies/responses/IGetVacancyListResponse';

function vacancyHandler(response) {
  return function (data, code = 200, key = 'data') {
    return response.json({code, [key]: data});
  };
}

async function getList(
  req: Request<IVacancyRequest>,
  res: Response<IGetVacancyListResponse>,
  next
) {
  try {
    const {page = 1, limit = 20, sortOrder = -1, sortField = 'openedDate'} = req.query;

    const vacancies = await vacanciesService.getList(
      String(sortField),
      sortOrder as SortOrder,
      Number(page),
      Number(limit)
    );
    const total = await vacanciesService.getListLength();
    const vacancyListResponse: IGetVacancyListResponse = {
      vacancies,
      page: Number(page),
      limit: Number(limit),
      total
    };

    if (vacancies) {
      return vacancyHandler(res)(vacancyListResponse);
    } else {
      throw notFound('Vacancy not found!', 'VacancyNotFound');
    }
  } catch (e) {
    next(e);
  }
}

export {getList};
