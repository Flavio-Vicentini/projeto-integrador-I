interface IClient {
  id: string;
  name: string;
  cpf_cnpj: string;
  telephone: string;
  created_at: Date;
  address: {
    id: string;
    id_client: string;
    type: string;
    street_address: string;
    number: string;
    district: string;
    city: string;
    zip_code: string;
    created_at: Date;
  }[];
}
interface IResponse {
  id: string;
  name: string;
  cpf_cnpj: string;
  telephone: string;
  created_at: Date;
  address: {
    id: string;
    type: string;
    street_address: string;
    number: string;
    district: string;
    city: string;
    zip_code: string;
    created_at: Date;
  }[];
}

class ClientMap {
  static toDTO(clients: IClient[]): IResponse[] {
    const response = clients.map((client) => {
      return {
        id: client.id,
        name: client.name,
        cpf_cnpj: client.cpf_cnpj,
        telephone: client.telephone,
        created_at: client.created_at,
        address: client.address.map((address) => {
          return {
            id: address.id,
            type: address.type,
            street_address: address.street_address,
            number: address.number,
            district: address.district,
            city: address.city,
            zip_code: address.zip_code,
            created_at: address.created_at,
          };
        }),
      };
    });
    return response;
  }
}

export { ClientMap };
