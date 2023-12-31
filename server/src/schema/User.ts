import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
  roles: string[];
  score: string;
};

const userSchema: Schema<IUser> = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  score: { type: String}
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default UserModel;
