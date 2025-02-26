type WithId<T> = T & {
  _id: string;
};

export default WithId;