import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
import { ListSpecificationController } from "./ListSpecificationController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";


const specificationRepository = SpecificationsRepository.getInstance();
const listSpecificationUseCase = new ListSpecificationUseCase(specificationRepository);
const listSpecificationController = new ListSpecificationController(listSpecificationUseCase);

export { listSpecificationController }