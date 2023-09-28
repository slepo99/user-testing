import mongoose, { Document, Schema } from "mongoose";

export interface ITest extends Document {
  role: string;
  tests: {
    question: string;
    answers: {
      answer: string;
      isTrue: boolean; 
    }[];
  }[];
}

const TestSchema = new Schema<ITest>({
  role: { type: String, required: true },
  tests: [
    {
      question: { type: String, required: true },
      answers: [
        {
          answer: { type: String, required: true },
          isTrue: { type: Boolean, required: true },
        },
      ],
    },
  ],
});

const TestModel = mongoose.model<ITest>("Test", TestSchema);

export default TestModel;
