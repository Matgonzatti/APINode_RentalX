import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) { }

  execute() {
    const specifications = this.specificationRepository.list();

    return specifications;
  }
}

export { ListSpecificationUseCase }