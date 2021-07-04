import { Specification } from "../../model/Specification";
import { ISpecificationsRepository } from "../../repositories/implementations/ISpecificationsRepository";

class ListSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) { }

  execute() {
    const specifications = this.specificationRepository.list();

    return specifications;
  }
}

export { ListSpecificationUseCase }