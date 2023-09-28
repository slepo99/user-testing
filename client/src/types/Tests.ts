interface Answer {
    answer: string;
    isTrue: boolean;
    _id: string;
  }
  
  interface Test {
    _id: string;
    role: string;
    tests: {
      question: string;
      answers: Answer[];
      _id: string;
    }[];
    __v: number;
  }
  
  export default Test;
  