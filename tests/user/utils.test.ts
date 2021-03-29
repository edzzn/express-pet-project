import { ValueOrFailure } from "../../src/core/valueObject";
import { User } from "../../src/user/user";
import {
  filterABC,
  sortUsersByName,
  userOccurrencesCount,
} from "../../src/user/utils";

describe("Sort User by name", () => {
  test("The input is empty", () => {
    const users: User[] = [];
    const expectedSortedUsers: User[] = [];

    const sortedUsers = sortUsersByName(users);
    expect;
    expect(sortedUsers).toEqual(expectedSortedUsers);
  });

  test("The input has one User", async () => {
    const usersOrFailure: ValueOrFailure<User>[] = [
      await User.build({
        firstName: "E",
        lastName: "R",
        email: "",
        password: "pass",
      }),
    ];

    let users: User[] = [];

    for (const userOrFailure of usersOrFailure) {
      if (userOrFailure.ok) users.push(userOrFailure.value);
    }

    const expectedSortedUsers: User[] = users;

    const sortedUsers = sortUsersByName(users);
    expect;
    expect(sortedUsers).toEqual(expectedSortedUsers);
  });

  test("The input has one User", async () => {
    const users: User[] = [
      new User(
        {
          firstName: "Edisson",
          lastName: "Reinozo",
          email: "e@email.com",
          password: "Secret",
        },
        true
      ),
    ];

    const expectedSortedUsers: User[] = users;

    const sortedUsers = sortUsersByName(users);
    expect;
    expect(sortedUsers).toEqual(expectedSortedUsers);
  });

  test("The input has many users", async () => {
    const user1 = new User(
      {
        firstName: "Edisson",
        lastName: "A",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );
    const user2 = new User(
      {
        firstName: "Edisson",
        lastName: "B",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );
    const user3 = new User(
      {
        firstName: "Edisson",
        lastName: "C",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );

    const users: User[] = [user3, user1, user2];

    const expectedSortedUsers: User[] = [user1, user2, user3];

    const sortedUsers = sortUsersByName(users);
    expect;
    expect(sortedUsers).toEqual(expectedSortedUsers);
  });
});

describe("filter ABC users", () => {
  test("The input is empty", () => {
    const users: User[] = [];
    const expectedSortedUsers: User[] = [];

    const sortedUsers = filterABC(users);
    expect;
    expect(sortedUsers).toEqual(expectedSortedUsers);
  });

  test("The input has one ABC user", async () => {
    const user1 = new User(
      {
        firstName: "Edisson",
        lastName: "X",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );
    const user2 = new User(
      {
        firstName: "Edisson",
        lastName: "B",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );
    const user3 = new User(
      {
        firstName: "Edisson",
        lastName: "Z",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );

    const users: User[] = [user3, user1, user2];

    const expectedSortedUsers: User[] = [user2];

    const sortedUsers = filterABC(users);
    expect;
    expect(sortedUsers).toEqual(expectedSortedUsers);
  });

  test("The input has many ABC user", async () => {
    const user1 = new User(
      {
        firstName: "Edisson",
        lastName: "X",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );
    const user2 = new User(
      {
        firstName: "Edisson",
        lastName: "B",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );
    const user3 = new User(
      {
        firstName: "Edisson",
        lastName: "Z",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );
    const user4 = new User(
      {
        firstName: "Edisson",
        lastName: "C",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );

    const users: User[] = [user1, user2, user3, user4];

    const expectedSortedUsers: User[] = [user2, user4];

    const sortedUsers = filterABC(users);
    expect;
    expect(sortedUsers).toEqual(expectedSortedUsers);
  });
});

describe("User Occurrences Count", () => {
  test("The input is empty, count 'A'", () => {
    const users: User[] = [];
    const expectedCount = 0;

    const sortedUsers = userOccurrencesCount(users, "A");

    expect(sortedUsers).toEqual(expectedCount);
  });

  test("The input has one ABC user, count 'A'", async () => {
    const user1 = new User(
      {
        firstName: "Edisson",
        lastName: "A",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );
    const user2 = new User(
      {
        firstName: "Edisson",
        lastName: "B",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );
    const user3 = new User(
      {
        firstName: "Edisson",
        lastName: "Z",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );

    const users: User[] = [user3, user1, user2];

    const expectedCount = 1;

    const sortedUsers = userOccurrencesCount(users, "A");
    expect(sortedUsers).toEqual(expectedCount);
  });

  test("The input has many ABC user, count 'A'", async () => {
    const user1 = new User(
      {
        firstName: "Edisson",
        lastName: "A",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );
    const user2 = new User(
      {
        firstName: "Edisson",
        lastName: "B",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );
    const user3 = new User(
      {
        firstName: "Edisson",
        lastName: "AB",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );
    const user4 = new User(
      {
        firstName: "Edisson",
        lastName: "C",
        email: "e@email.com",
        password: "Secret",
      },
      true
    );

    const users: User[] = [user1, user2, user3, user4];

    const expectedCount = 2;

    const sortedUsers = userOccurrencesCount(users, "A");
    expect(sortedUsers).toEqual(expectedCount);
  });
});
