import {FilterQuery, Model, UpdateQuery} from 'mongoose';

export abstract class BaseRepository<T extends Model<any> = Model<any>> {
  private model: T;

  protected constructor(model: T) {
    this.model = model;
  }

  /**
   * Perform distinct operation
   * @param {String} field
   * @param {object|Query} [filter]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.distinct}
   * @returns {*}
   */
  distinct(field: string, filter?: FilterQuery<T>) {
    return this.model.distinct(field, filter);
  }

  /**
   * Perform aggregate operation
   * @param {Array} pipeline
   * @param {object} options
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.aggregate}
   * @returns {*}
   */
  aggregate(pipeline: any[], options?: object) {
    return this.model.aggregate(pipeline, options);
  }

  /**
   * Create one or multiple docs
   * @param {Array|object} docs
   * @param {object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.create}
   * @returns {*}
   */
  create(docs: T | T[], options?: object) {
    if (options && Array.isArray(docs)) {
      return this.model.create(docs, options);
    }
    return this.model.create(docs);
  }

  /**
   * Creates multiple docs
   * @param docs
   * @param {object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.insertMany}
   * @returns {*}
   */
  insertMany(docs: T | T[], options?: NonNullable<unknown>) {
    return this.model.insertMany(docs, options);
  }

  /**
   * Finds all the documents that match conditions
   * @param {object} filter
   * @param {object|String|Array<String>} projection
   * @param {object} options
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.find}
   * @returns {*}
   */
  find(
    filter: FilterQuery<T>,
    projection?: NonNullable<unknown> | string | string[],
    options?: NonNullable<unknown>
  ) {
    return this.model.find(filter, projection, options);
  }

  /**
   * Finds the first document that matches conditions
   * @param {object} conditions
   * @param {object|String|Array<String>} projection
   * @param {object} options
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.findOne}
   * @returns {*}
   */
  findOne(conditions: FilterQuery<T>, projection?: object | string | string[], options?: object) {
    return this.model.findOne(conditions, projection, options);
  }

  /**
   * Finds a single document by its _id field
   * @param {*} id
   * @param {object|String|Array<String>} projection
   * @param {object} options
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.findById}
   * @returns {*}
   */
  findById(id: any, projection?: object | string | string[], options?: object) {
    return this.model.findById(id, projection, options);
  }
  /**
   * Updates the first document that matches conditions
   * @param {object} filter
   * @param {object|Array} update
   * @param {object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate}
   * @returns {*}
   */
  updateOne(filter: FilterQuery<T>, update: UpdateQuery<T> | object[], options?: object) {
    return this.model.updateOne(filter, update, options);
  }
  /**
   * Updates the first document that matches conditions
   * @param {object} filter
   * @param {object|Array} update
   * @param {object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate}
   * @returns {*}
   */
  findOneAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T> | object[], options?: object) {
    return this.model.findOneAndUpdate(filter, update, options);
  }

  /**
   * Updates all the documents that match conditions
   * @param {object} filter
   * @param {object|Array} update
   * @param {object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.updateMany}
   * @returns {*}
   */
  updateMany(filter: FilterQuery<T>, update: UpdateQuery<T> | object[], options?: object) {
    return this.model.updateMany(filter, update, options);
  }

  /**
   * Deletes the first document that matches conditions
   * @param {object} filter
   * @param {object} update
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.deleteOne}
   * @returns {*}
   */
  deleteOne(filter: FilterQuery<T>, update?: object) {
    return this.model.deleteOne(filter, update);
  }
  findOneAndDelete(filter: FilterQuery<T>, options?: object) {
    return this.model.findOneAndDelete(filter, options);
  }
  /**
   * Deletes all the documents that match conditions
   * @param {object} conditions
   * @param {object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany}
   * @returns {*}
   */
  deleteMany(conditions: FilterQuery<T>, options?: object) {
    return this.model.deleteMany(conditions, options);
  }

  /**
   * Counts the number of documents that match conditions
   * @param {object} conditions
   * @param {object} [options]
   * @see {@link https://mongoosejs.com/docs/api/model.html#model_Model.countDocuments}
   * @returns {*}
   */
  countDocuments(filter: FilterQuery<T>, options?: object) {
    return this.model.countDocuments(filter, options);
  }
}

export default BaseRepository;
