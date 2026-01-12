import uuid4 from "uuid4";

export const generateRandomId = () => {
  const id = uuid4();
  return `APR-${id}`;
};
