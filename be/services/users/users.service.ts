import {usersRepository} from './../../repositories/index';

import {validateCreateUser, validatePhone} from './users.validate';

class UsersService {
  async createUser(payload) {
    const user = await validateCreateUser(payload);
    return usersRepository.create(user);
  }
  async getUserByPhone(phone: string) {
    const data = await validatePhone({phoneNumber: phone});
    return usersRepository.findOne({phoneNumber: data.phoneNumber});
  }
}
export default new UsersService();
