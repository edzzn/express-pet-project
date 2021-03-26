import bcrypt, { hash } from "bcrypt";
import { ValueOrFailure } from "../core/valueObject";
const saltRounds = 10;

interface UserProps {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserDTO {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export class User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: UserProps, containsSecurePassword: boolean) {
    if (typeof containsSecurePassword === "undefined") {
      throw new Error("Cannot be called directly, use the build method");
    }

    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.password = props.password;

    if (props.id) this.id = props.id;
    if (props.createdAt) this.createdAt = props.createdAt;
    if (props.updatedAt) this.updatedAt = props.updatedAt;
  }

  static async build(props: UserProps): Promise<ValueOrFailure<User>> {
    // Validation
    // This can be moved to a Validator class if necessary
    if (props.password.length <= 5) {
      return { ok: false, message: "The password is too short." };
    }

    const securePassword = await bcrypt.hash(props.password, saltRounds);
    props.password = securePassword;
    return { ok: true, value: new User(props, true) };
  }

  toDTO(): UserDTO {
    const userDTO: UserDTO = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      createdAt: (this.createdAt || new Date()).toISOString(),
      updatedAt: (this.createdAt || new Date()).toISOString(),
    };
    return userDTO;
  }

  async verifyPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  static fromDTO(userDTO: UserDTO): User {
    return new User(
      {
        id: userDTO.id,
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: userDTO.email,
        password: userDTO.password,
        createdAt: new Date(userDTO.createdAt),
        updatedAt: new Date(userDTO.updatedAt),
      },
      true
    );
  }
}
