export interface IService {
  serviceId?: string;
  serviceName: string;
  serviceDescription: string;
  servicePrice: string;
}

export default class Services {
  _serviceId?: string;
  _serviceName: string;
  _serviceDescription: string;
  _servicePrice: string;
  constructor(props: IService) {
    this._serviceId = props.serviceId;
    this._serviceName = props.serviceName;
    this._serviceDescription = props.serviceDescription;
    this._servicePrice = props.servicePrice;
  }
}
