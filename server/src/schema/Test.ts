import mongoose, { Document, Schema } from "mongoose";

export interface ITest extends Document {
  question: string;
  answers: [{
    answer: string;
    isTrue: boolean;
  }];
}
 
const TestSchema = new Schema<ITest>({
  question: { type: String },
  answers: [
    {
      answer: { type: String },
      isTrue: { type: Boolean },
    },
  ], 
});

const TestModel = mongoose.model<ITest>("Test", TestSchema);

export default TestModel;
