interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(props: UserProps) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.password = props.password;
  }

  toDTO(): UserDTO {
    const userDTO: UserDTO = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };
    return userDTO;
  }

  static fromDTO(userDTO: UserDTO) {
    return new User({
      firstName: userDTO.firstName || "",
      lastName: userDTO.lastName || "",
      email: userDTO.email,
      password: userDTO.password,
    });
  }
}
