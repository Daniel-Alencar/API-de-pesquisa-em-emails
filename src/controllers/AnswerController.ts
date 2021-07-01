import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

  /**
   * Ex.: http://localhost:3333/answers/10
   * 
   * Route params => parâmetros que compõem a rota
   * routes.get("/answers/:value")
   * 
   * Nesse caso, value é igual a 10.
   * 
   * 
   * Ex.: http://localhost:3333/answers/?value=5
   * 
   * Query params => Parâmetros de busca e paginação (não são obrigatórios)
   * routes.get("/answers/?value")
   * 
   * Nesse caso, value é igual a 5.
   */

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    });

    if(!surveyUser) {
      throw new AppError("Survey user does not exists!");
    }

    surveyUser.value = Number(value);
    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswerController }