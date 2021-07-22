import Group from "../graphql/types/Group";

export const groupMapper = (item: {
  id: number;
  name: string;
  code: string;
  students: [];
}) => {
  const group = new Group();
  group.id = item.id;
  group.name = item.name;
  group.code = item.code;
  group.students = item.students || [];
  return group;
};
