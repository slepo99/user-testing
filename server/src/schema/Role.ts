import mongoose, { Document, Model, Schema } from 'mongoose';

interface IRole extends Document {
  value: string;
}

const roleSchema: Schema<IRole> = new Schema<IRole>({
  value: { type: String, unique: true, default: 'USER' },
});

const RoleModel: Model<IRole> = mongoose.model<IRole>('Role', roleSchema);

export default RoleModel;
