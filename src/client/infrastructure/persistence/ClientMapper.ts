import { Client } from '../../application/entities/Client';
import { ClientEntity } from './ClientEntity';

export class ClientMapper {
  static toDto(from: ClientEntity): Client {
    const { address, firstName, id, lastName, patronymic, phoneNumber } = from;

    return new Client({
      address,
      firstName,
      id,
      lastName,
      patronymic,
      phoneNumber,
    });
  }

  static toEntity(from: Client): ClientEntity {
    const { address, firstName, id, lastName, patronymic, phoneNumber } = from;

    return {
      address,
      firstName,
      id,
      lastName,
      patronymic,
      phoneNumber,
    };
  }
}
