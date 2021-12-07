import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { User } from "../entities/User";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import {
  CONFIRM_USER_PREFIX,
  COOKIE_NAME,
  FORGET_PASSWORD_PREFIX,
} from "../constants";
import { UserFieldError, UserInput } from "./UserInput";
// import { getConnection } from "typeorm";
import { MyContext } from "../types";
import { sendEmail } from "../utils/sendEmail";
import { validateRegister, registerErrors } from "../utils/validateRegister";

@ObjectType()
class userResponse {
  @Field(() => [UserFieldError], { nullable: true })
  errors?: UserFieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === user.id) {
      return user.email;
    }
    return "";
  }

  @FieldResolver(() => String)
  name(@Root() user: User) {
    return `${user.firstName} ${user.lastName}`;
  }

  @Mutation(() => userResponse)
  async register(
    @Arg("options") options: UserInput,
    @Ctx() { redis, req }: MyContext
  ): Promise<userResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hasedPassword = await argon2.hash(options.password);
    let user;
    try {
      user = await User.create({
        firstName: options.firstName,
        lastName: options.lastName,
        username: options.username,
        email: options.email,
        password: hasedPassword,
        avatar: options.avatar,
      }).save();
      // const result = await getConnection()
      //   .createQueryBuilder()
      //   .insert()
      //   .into(User)
      //   .values({
      //     username: options.username,
      //     email: options.email,
      //     password: hasedPassword,
      //   })
      //   .returning("*")
      //   .execute();
      // console.log(result);
      // user = result.raw[0];
    } catch (err) {
      console.log(err);
      const response = registerErrors(err);
      if (response) {
        console.log(response);
        return response;
      }
    }

    // console.log(user);
    // log in after register and send confirmation email
    if (user) {
      req.session.userId = user.id;
      const token = uuidv4();
      await redis.set(CONFIRM_USER_PREFIX + token, user.id, "ex", 60 * 60 * 24);
      await sendEmail(
        user.email,
        "Validate Register",
        `http://localhost:3000/user/confirm/${token}`
      );
    }
    // req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => userResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<userResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "That username/email does not exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };
    }

    req.session.userId = user.id;
    return { user };
  }

  @Query(() => User, { nullable: true })
  getCurrentUser(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => userResponse)
  async validateUser(
    @Arg("token") token: string,
    @Ctx() { redis }: MyContext
  ): Promise<userResponse> {
    const key = CONFIRM_USER_PREFIX + token;
    const userIdRedis = await redis.get(key);
    if (!userIdRedis) {
      return {
        errors: [
          {
            field: "token",
            message: "Token expired",
          },
        ],
      };
    }

    const userId = userIdRedis;
    const user = await User.findOne(userId);
    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "User no longer exists.",
          },
        ],
      };
    }

    await User.update({ id: userId }, { verified: true });
    await redis.del(key);

    return { user };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx()
    { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return true;
    }

    const token = uuidv4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      60 * 60 * 24 * 3
    );
    const mailBody = `http://localhost:3000/change-password/${token}`;
    await sendEmail(user.email, "Forgot Password", mailBody);
    return true;
  }

  @Mutation(() => userResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req, redis }: MyContext
  ): Promise<userResponse> {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "lenght must be greather than 2",
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;
    const userIdRedis = await redis.get(key);
    if (!userIdRedis) {
      return {
        errors: [
          {
            field: "token",
            message: "token expired",
          },
        ],
      };
    }

    const userId = userIdRedis;
    const user = await User.findOne(userId);
    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exists",
          },
        ],
      };
    }

    await User.update(
      { id: userId },
      { password: await argon2.hash(newPassword) }
    );
    await redis.del(key);

    // log in after change pass
    req.session.userId = user.id;
    return { user };
  }
}
