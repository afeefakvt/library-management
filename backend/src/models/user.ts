import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

export default mongoose.model<IUser>("User", userSchema);
