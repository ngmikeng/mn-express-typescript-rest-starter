import { default as mongoose, Model, Document } from "mongoose";
import { Promise } from "bluebird";
import httpStatus from "http-status";
import APIError from "../helpers/errorHandlers/APIError";

const connection = mongoose.connection;
if (!connection) {
  throw new Error("No such a connection to mongodb");
}

export interface IUserDocument extends Document {
  username: string;
  email: string;
  fullName: string;
}

export interface IUser extends IUserDocument {}

export interface IUserModel extends Model<IUser> {
  getById(id: string): Promise<IUserDocument>;
  getList(options: object): Promise<Array<IUserDocument>>;
}

/**
 * User Type
 */
// export type UserModel = mongoose.Document & {
//   username: string,
//   email: string,
//   fullName: string
// };

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  }
}, { timestamps: true });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user by id
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  getById(id: string) {
    return this.findById(id)
      .exec()
      .then((user: IUserModel) => {
        if (user) {
          return user;
        }
        const err = new APIError("No such user exists!", httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  getList({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef User
 */
const User: IUserModel = connection.model<IUser, IUserModel>("User", UserSchema);
// const User = connection.model("User", UserSchema);
export default User;
