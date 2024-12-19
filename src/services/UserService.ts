import { User } from "../types/User";

const users = [
  {
    id: 1,
    name: "Quyn Rivera",
  },
  {
    id: 2,
    name: "Inez Castillo",
  },
  {
    id: 3,
    name: "Maisie Cochran",
  },
  {
    id: 4,
    name: "Signe Conway",
  },
  {
    id: 5,
    name: "Kessie Hewitt",
  },
];
const getUsers = async (): Promise<User[]> => {
  return Promise.resolve(users);
};

export const UserService = {
  list: getUsers,
};
