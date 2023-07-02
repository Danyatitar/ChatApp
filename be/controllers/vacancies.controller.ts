import applicationsService from 'services/applications/applications.service';
import {VacancyStatus, ApplicationStatus} from '@utils/enums';

import mongoose, {SortOrder} from 'mongoose';
import vacanciesService from '../services/vacancies/vacancies.service';
import {IGetVacancy} from '../interfaces/vacancies/responses/IGetVacancy';
import {Response, Request} from 'express';
import {IVacancyRequest} from 'interfaces/vacancies/requests/IVacancyRequest';
import {notFound} from '@utils/error';
import {IGetVacancyListResponse} from 'interfaces/vacancies/responses/IGetVacancyListResponse';
import questionService from 'services/questions/question.service';

function vacancyHandler(response) {
  return function (data, code = 200, key = 'data') {
    return response.json({code, [key]: data});
  };
}

/**
 * @apiDefine VacanciesBase
 *
 * @apiPermission Admin
 *
 * @apiHeader {String} Authorization Auth token provided by firebase.
 * @apiHeaderExample {json} Authorization Header Example:
 *     {
 *       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *     }
 *
 * @apiError UserNotAuthorized [401] Invalid user's token.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "User's token is invalid",
 *       "status": "user.invalid_token",
 *       "http_code": 401
 *     }
 */

/**
 * @apiDefine VacanciesCreateOrUpdate
 *
 * @apiBody {String} title        Vacancy title.
 * @apiBody {String} [link]       Vacancy link.
 * @apiBody {String} description  Vacancy description.
 *
 * @apiSuccess {Number} code HTTP status code of the response.
 * @apiSuccess {Object} data             Vacancy object
 * @apiSuccess {ObjectId} data._id       Vacancy id.
 * @apiSuccess {String} data.title       Vacancy title.
 * @apiSuccess {String} data.link        Vacancy link.
 * @apiSuccess {String} data.status      Vacancy status.
 * @apiSuccess {String[]} data.questions Array with questions id.
 * @apiSuccess {String} data.description Vacancy description.
 * @apiSuccess {String} data.createdAt   Vacancy creation date.
 * @apiSuccess {String} data.updatedAt   Vacancy last update date.
 * @apiSuccess {String} data.openedDate  Vacancy opening date.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *         "code": 201,
 *         "data": {
 *             "title": "Middle Back-end (Node.js) developer",
 *             "link": "https://www.techmagic.co/career/vacancy/node-js-middle-dev",
 *             "description": "We are looking for an experienced Middle Node.js developer with 3+ years of experience...",
 *             "status": "active",
 *             "type": "Web",
 *             "questions": [
 *                 "64816f51d536321d682a986b",
 *                 "64830180af60c809b43e38ef"
 *             ],
 *             "_id": "64873ce9f6fd718ed17f86db",
 *             "createdAt": "2023-06-12T15:42:33.943Z",
 *             "updatedAt": "2023-06-12T15:42:33.943Z",
 *             "openedDate": "2023-06-12T15:42:33.944Z"
 *         }
 *     }
 *
 */

/**
 * @api {get} /vacancies Get all vacancies
 * @apiName ListVacancies
 * @apiDescription This route allows to list all vacancies.
 * @apiGroup Vacancies
 *
 * @apiSampleRequest /vacancies/
 *
 * @apiSuccess {Number} code                       HTTP status code of the response.
 * @apiSuccess {Object} data                       Data object.
 * @apiSuccess {Object[]} data.vacancies           Array of vacancies.
 * @apiSuccess {ObjectId} data.vacancies._id       Vacancy id.
 * @apiSuccess {String} data.vacancies.title       Vacancy title.
 * @apiSuccess {String} data.vacancies.link        Vacancy link.
 * @apiSuccess {String} data.vacancies.status      Vacancy status.
 * @apiSuccess {String[]} data.vacancies.questions Array with questions id.
 * @apiSuccess {String} data.vacancies.description Vacancy description.
 * @apiSuccess {String} data.vacancies.createdAt   Vacancy creation date.
 * @apiSuccess {String} data.vacancies.updatedAt   Vacancy last update date.
 * @apiSuccess {String} data.vacancies.openedDate  Vacancy opening date.
 * @apiSuccess {Number} data.page                  The current page of the vacancy list being displayed.
 * @apiSuccess {Number} data.limit                 The maximum number of vacancies displayed per page.
 * @apiSuccess {Number} data.total                 The total number of vacancies available in the database.
 * @apiSuccessExample Success Response:
 *     HTTP/1.1 200 OK
 *      {
 *         "code": 200,
 *         "data": {
 *            "vacancies": [
 *                {
 *                    "title": "Middle Back-end (Node.js) developer",
 *                    "link": "https://www.techmagic.co/career/vacancy/node-js-middle-dev",
 *                    "description": "We are looking for an experienced Middle Node.js developer with 3+ years of experience...",
 *                    "status": "active",
 *                    "type": "Web",
 *                    "questions": [
 *                        "64816f51d536321d682a986b",
 *                        "64830180af60c809b43e38ef"
 *                    ],
 *                    "_id": "64873ce9f6fd718ed17f86db",
 *                    "createdAt": "2023-06-12T15:42:33.943Z",
 *                    "updatedAt": "2023-06-12T15:42:33.943Z",
 *                    "openedDate": "2023-06-12T15:42:33.944Z"
 *                },
 *                ...,
 *                "page": 1,
 *                "limit": 20,
 *                "total": 4
 *            ]
 *        }
 *     }
 *
 * @apiUse VacanciesBase
 */
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

/**
 * @api {get} /vacancies/:id Get vacancy by id
 * @apiName GetVacancy
 * @apiDescription This route allows to get vacancy by id.
 * @apiGroup Vacancies
 * @apiSampleRequest /vacancies/:id
 *
 * @apiParam {String} id Vacancy id.
 *
 * @apiParamExample {String} Request-Example:
 *    /api/vacancies/6192fed468bdd05ad4618292
 *
 * @apiSuccess {Number} code             HTTP status code of the response.
 * @apiSuccess {Object} data             Vacancy object.
 * @apiSuccess {ObjectId} data._id       Vacancy id.
 * @apiSuccess {String} data.title       Vacancy title.
 * @apiSuccess {String} data.link        Vacancy link.
 * @apiSuccess {String} data.status      Vacancy status.
 * @apiSuccess {String[]} data.questions Array with questions id.
 * @apiSuccess {String} data.description Vacancy description.
 * @apiSuccess {String} data.createdAt   Vacancy creation date.
 * @apiSuccess {String} data.updatedAt   Vacancy last update date.
 * @apiSuccess {String} data.openedDate  Vacancy opening date.
 *
 * @apiSuccessExample Success Response:
 *      HTTP/1.1 200 OK
 *      {
 *         "code": 200,
 *         "data": {
 *            "title": "Middle Back-end (Node.js) developer",
 *            "link": "https://www.techmagic.co/career/vacancy/node-js-middle-dev",
 *            "description": "We are looking for an experienced Middle Node.js developer with 3+ years of experience...",
 *            "status": "active",
 *            "type": "Web",
 *            "questions": [
 *                "64816f51d536321d682a986b",
 *                "64830180af60c809b43e38ef"
 *            ],
 *            "_id": "64873ce9f6fd718ed17f86db",
 *            "createdAt": "2023-06-12T15:42:33.943Z",
 *            "updatedAt": "2023-06-12T15:42:33.943Z",
 *            "openedDate": "2023-06-12T15:42:33.944Z"
 *        }
 *     }
 *
 * @apiError VacancyNotFound [404] Vacancy not found.
 *
 * @apiUse VacanciesBase
 */
async function getVacancy(req: Request, res: Response<IGetVacancy>, next) {
  try {
    const vacancy = await vacanciesService.getVacancy(new mongoose.Types.ObjectId(req.params.id));
    if (vacancy) {
      return vacancyHandler(res)(vacancy);
    } else {
      throw notFound('Vacancy not found!', 'VacancyNotFound');
    }
  } catch (e) {
    next(e);
  }
}

// Add api doc similar to updateVacancy, but for create
/**
 * @api {post} /vacancies Create vacancy
 * @apiName CreateVacancy
 * @apiDescription This route allows to create vacancy.
 * @apiGroup Vacancies
 * @apiSampleRequest /vacancies
 *
 * @apiBody {string} status       Vacancy status.
 * @apiBody {string} type         Vacancy type.
 * @apiBody {date}   [openedDate]     Vacancy openedDate.
 *
 * @apiParamExample {json} Request Body Example:
 *    {
 *    "title": "Middle Back-end (Node.js) developer",
 *    "link": "https://www.techmagic.co/career/vacancy/node-js-middle-dev",
 *    "description": "We are looking for an experienced Middle Node.js developer with 3+ years of experience...",
 *    "status": "active",
 *    "type": "Web"
 *    }
 *
 * @apiError ValidationError [400] Validation error.
 *
 * @apiUse VacanciesBase
 * @apiUse VacanciesCreateOrUpdate
 *
 */

async function createVacancy(req: Request, res: Response<IGetVacancy>, next) {
  try {
    const vacancy = await vacanciesService.createVacancy(req.body);
    for (const question of vacancy.questions) {
      const questionInfo = await questionService.getQuestion(String(question));
      if (questionInfo.editable) {
        await questionService.updateQuestion(String(question), {editable: false});
      }
    }
    return vacancyHandler(res)(vacancy, 201);
  } catch (e) {
    next(e);
  }

  return null;
}

/**
 * @api {patch} /vacancies/:id Update vacancy
 * @apiName UpdateVacancies
 * @apiDescription This route allows to update vacancy by id.
 * @apiGroup Vacancies
 *
 * @apiSampleRequest /vacancies/:id
 *
 * @apiParam {ObjectId} id    Vacancy id.
 * @apiParamExample {string} Request Url Example:
 *     /api/vacancies/507f1f77bcf86cd799439011
 *
 * @apiError VacanciesNotFound [400] Vacancy not found.
 *
 * @apiUse VacanciesBase
 * @apiUse VacanciesCreateOrUpdate
 */
async function updateVacancy(req: Request, res: Response<IGetVacancy>, next) {
  try {
    const vacancy: IGetVacancy = await vacanciesService.updateVacancy(
      new mongoose.Types.ObjectId(req.params.id),
      req.body
    );
    if (vacancy) {
      if (req.body.status) {
        for (const question of vacancy.questions) {
          const questionInfo = await questionService.getQuestion(String(question));

          if (questionInfo.editable) {
            await questionService.updateQuestion(String(question), {editable: false});
          }
        }
      }
      return vacancyHandler(res)(vacancy);
    } else {
      throw notFound('Vacancy not found!', 'VacancyNotFound');
    }
  } catch (e) {
    next(e);
  }
}

/**
 * @api {delete} /vacancies/:id Delete vacancy
 * @apiName DeleteVacancies
 * @apiDescription This route allows to delete vacancy by id.
 * @apiGroup Vacancies
 *
 * @apiSampleRequest /vacancies/:id
 *
 * @apiParam {ObjectId} id Vacancy id.
 * @apiParamExample {string} Request Url Example:
 *     /api/vacancies/507f1f77bcf86cd799439011
 *
 * @apiSuccess {Number} code            HTTP status code of the response.
 * @apiSuccess {Object} data            Data object.
 * @apiSuccess {Object} data.deleted    Deleted vacancy object.
 *
 * @apiSuccessExample Success Response:
 *      HTTP/1.1 200 OK
 *      {
 *         "code": 200,
 *         "data": {
 *            "deleted": {
 *                "title": "Middle Back-end (Node.js) developer",
 *                "link": "https://www.techmagic.co/career/vacancy/node-js-middle-dev",
 *                "description": "We are looking for an experienced Middle Node.js developer with 3+ years of experience...",
 *                "status": "active",
 *                "type": "Web",
 *                "questions": [
 *                    "64816f51d536321d682a986b",
 *                    "64830180af60c809b43e38ef"
 *                ],
 *                "_id": "64873ce9f6fd718ed17f86db",
 *                "createdAt": "2023-06-12T15:42:33.943Z",
 *                "updatedAt": "2023-06-12T15:42:33.943Z",
 *                "openedDate": "2023-06-12T15:42:33.944Z"
 *            }
 *        }
 *     }
 *
 * @apiError VacanciesNotFound [400] Vacancy not found.
 *
 * @apiUse VacanciesBase
 */
async function deleteVacancy(req: Request, res: Response<IGetVacancy>, next) {
  try {
    const deleted = await vacanciesService.updateVacancy(
      new mongoose.Types.ObjectId(req.params.id),
      {status: VacancyStatus.Closed}
    );

    if (deleted) {
      const applications = await applicationsService.getApplicationByVacancy(
        new mongoose.Types.ObjectId(req.params.id)
      );
      const applicationsIds = applications.map(application => application.id);
      await applicationsService.updateManyApplications(applicationsIds, ApplicationStatus.Closed);
      for (const question of deleted.questions) {
        const vacancies = await vacanciesService.geUnwindList(question);
        if (!vacancies.length) {
          await questionService.updateQuestion(String(question), {editable: true});
        }
      }
      return vacancyHandler(res)({deleted});
    } else {
      throw notFound('Vacancy not found!', 'VacancyNotFound');
    }
  } catch (e) {
    next(e);
  }
}

export {getList, createVacancy, updateVacancy, deleteVacancy, getVacancy};
