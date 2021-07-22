import Student from "../graphql/types/Student";

export const studentMapper = (item: {
  id: number;
  fullname: string;
  email: string;
  age: number;
}) => {
  const student = new Student();
  student.id = item.id;
  student.fullname = item.fullname;
  student.email = item.email;
  student.age = item.age;
  return student;
};
