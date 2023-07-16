import {Schema, model} from 'mongoose';

const UsersShema = new Schema(
  {
    name: {type: String, maxlength: 200, minlength: 3, required: true},
    username: {type: String, maxlength: 200, minlength: 3, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: String, required: true}
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export const Users = model('users', UsersShema);
