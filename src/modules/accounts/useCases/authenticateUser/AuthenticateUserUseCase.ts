import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { sign } from 'jsonwebtoken';

import { compare } from 'bcrypt';
import { User } from "../../entities/User";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name,
    email
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRespository: IUsersRepository
  ) {}

  async execute({email, password}: IRequest): Promise<IResponse> {
    const user = await this.usersRespository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    const token = sign({user}, "a4c41d3e638a11e52489c23a496e7bbb", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn;
  }
}

export {AuthenticateUserUseCase}