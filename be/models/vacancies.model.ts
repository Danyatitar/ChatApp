import {VacancyStatus, VacancyType} from '@utils/enums';
import {Schema, model} from 'mongoose';

const VacanciesSchema = new Schema(
  {
    title: {type: String, maxlength: 200, required: true},
    link: {type: String, maxlength: 2048, required: false},
    description: {type: String, maxlength: 800, required: true},
    status: {type: String, enum: Object.values(VacancyStatus), required: true, default: 'active'},
    type: {type: String, enum: Object.values(VacancyType), required: true},
    openedDate: {type: Date, required: false},
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'questions',
        required: true
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
);

// Implement middleware to generate default value for openedDate
VacanciesSchema.pre('save', function (next) {
  if (!this.openedDate) {
    this.openedDate = new Date();
  }
  next();
});

export const Vacancies = model('vacancies', VacanciesSchema);
