interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserDTO {
  name: string;
  // TODO: Add other properties
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

  static fromDTO(userDTO: UserDTO) {
    return new User({
      firstName: userDTO.name,
      lastName: "",
      email: "",
      password: "",
    });
  }
}
