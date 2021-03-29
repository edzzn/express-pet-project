import { User } from "./user";

export function sortUsersByName(users: User[]): User[] {
  const sortedUsers = users.sort((a: User, b: User) =>
    a.lastName > b.lastName ? 1 : -1
  );
  return sortedUsers;
}

export function filterABC(users: User[]): User[] {
  const sortedUsers = users.filter((user: User) =>
    ["a", "b", "c"].includes(user.lastName[0].toLowerCase())
  );

  return sortedUsers;
}

export function userOccurrencesCount(users: User[], query: string): number {
  const count = users.reduce((count, curr) => {
    if (curr.lastName.startsWith(query)) {
      return ++count;
    }
    return count;
  }, 0);

  return count;
}

export interface ABCOccurrences {
  a: number;
  b: number;
  c: number;
}

export function findABCUserOccurrences(users: User[]): ABCOccurrences {
  return {
    a: userOccurrencesCount(users, "a"),
    b: userOccurrencesCount(users, "b"),
    c: userOccurrencesCount(users, "c"),
  };
}
