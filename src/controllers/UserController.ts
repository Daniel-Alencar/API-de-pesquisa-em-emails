import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepositories';

class UserController {
  async create(request: Request, response: Response) {
    const { email, name } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
    const userAlreadyExists = await usersRepository.findOne({
      email: email
    });
    if(userAlreadyExists) {
      return response.status(400).json({
        error: "User already exists!"
      })
    }

    const user = usersRepository.create({
      email: email,
      name: name,
    });
    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UserController };

