import mongoose, { Document, Schema } from "mongoose";

export interface ITest extends Document {
  tests: [
    {
      question: string;
      type: string;
      answers: [
        {
          answer: string;
          isTrue: boolean;
        }
      ];
    }
  ];
}

const TestSchema = new Schema<ITest>({
  tests: [
    {
      question: { type: String, required: true },
      type: { type: String, required: true },
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
