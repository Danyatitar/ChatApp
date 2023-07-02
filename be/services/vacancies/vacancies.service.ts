import {VacancyStatus} from '@utils/enums';

import {validateCreateVacancy, validateUpdateVacancy} from './vacancies.validate';
import {vacanciesRepository} from '../../repositories';
import {IGetVacancy} from 'interfaces/vacancies/responses/IGetVacancy';
import mongoose, {SortOrder} from 'mongoose';

class VacanciesService {
  getList(sortField: string, sortOrder: SortOrder, page: number, limit: number) {
    return vacanciesRepository
      .find({})
      .sort({[sortField]: sortOrder})
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async createVacancy(payload: IGetVacancy) {
    const data = await validateCreateVacancy(payload);

    return vacanciesRepository.create(data);
  }

  async getVacancy(id: mongoose.Types.ObjectId) {
    return vacanciesRepository.findById(id).populate('questions');
  }

  async updateVacancy(id: mongoose.Types.ObjectId, body: Partial<IGetVacancy>) {
    const data = await validateUpdateVacancy(body);

    return vacanciesRepository.findOneAndUpdate({_id: id}, data, {new: true});
  }
  async deleteVacancy(id: mongoose.Types.ObjectId) {
    return vacanciesRepository.findOneAndDelete({_id: id});
  }

  async getListLength() {
    return vacanciesRepository.countDocuments({});
  }
  async geUnwindList(question) {
    return vacanciesRepository
      .aggregate([])
      .unwind('questions')
      .match({questions: question, status: VacancyStatus.Active});
  }
}

export default new VacanciesService();
