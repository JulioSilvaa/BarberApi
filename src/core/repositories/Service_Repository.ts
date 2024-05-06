import { IService } from "../entities/Service";

export default interface Service_Repository {
  save(props: IService, credential?: string): Promise<void>;
  delete(id: string, credential?: string): Promise<void>;
  find(id: string): Promise<IService>;
  update(props: any): Promise<void>;
  getAll(): Promise<IService[]>;
}
