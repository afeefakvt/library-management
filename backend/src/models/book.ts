import mongoose, { Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  publishedYear?: number;
  genre?: string;
  stock: number;
}

const bookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: Number,
  genre: String,
  stock: { type: Number, required: true, min: 0 },
});

export default mongoose.model<IBook>("Book", bookSchema);
