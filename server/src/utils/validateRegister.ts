import { UserInput } from "src/resolvers/UserInput";

export const validateRegister = (options: UserInput) => {
  if (options.firstName.length <= 2) {
    return [
      {
        field: "First Name",
        message: "Lenght must be greather than 2",
      },
    ];
  }

  if (options.lastName.length <= 2) {
    return [
      {
        field: "Last Name",
        message: "Lenght must be greather than 2",
      },
    ];
  }

  if (options.username.length <= 2) {
    return [
      {
        field: "Username",
        message: "Lenght must be greather than 2",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "Username",
        message: "Invalid username - cannot include '@'",
      },
    ];
  }

  if (!options.email.includes("@") || options.email.length <= 2) {
    return [
      {
        field: "Email",
        message: "Invalid email",
      },
    ];
  }

  if (options.password.length <= 2) {
    return [
      {
        field: "password",
        message: "Lenght must be greather than 2",
      },
    ];
  }
  return null;
};

export const registerErrors = (err: any) => {
  if (err.code === "23505") {
    if (err.detail.includes("email")) {
      return {
        errors: [
          {
            field: "email",
            message: "email already taken",
          },
        ],
      };
    }
    if (err.detail.includes("username")) {
      return {
        errors: [
          {
            field: "username",
            message: "username already been taken",
          },
        ],
      };
    }
  }
  return null;
};
