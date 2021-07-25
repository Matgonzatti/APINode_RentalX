import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  })

  it("Should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      name: "Matheus",
      email: "matheus.gonzatti@gmail.com",
      password: "123456",
      driver_license: "123456789"
    };

    await createUserUseCase.execute(user);

    const token = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(token).toHaveProperty("token");
  });

  it("Should not be able to authenticate an non existing user", () => {
     expect(async () => {
      await authenticateUserUseCase.execute({
        email: "a@a.com",
        password: "123"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "Matheus",
        email: "matheus.gonzatti@gmail.com",
        password: "123456",
        driver_license: "123456789"
      };
      
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "123"
      });
   }).rejects.toBeInstanceOf(AppError);
 });
})