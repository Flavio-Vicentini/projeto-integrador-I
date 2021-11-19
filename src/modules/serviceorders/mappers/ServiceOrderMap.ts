interface IOrders {
  id: string;
  id_client: string;
  id_external_user: string;
  id_open_so_user: string;
  protocol: string;
  defect: string;
  status: string;
  open_date: Date;
  close_date: Date;
  requester_name: string;
  requester_phone: string;
  created_at: Date;
  updated_at: Date;
  client: {
    id: string;
    name: string;
    cpf_cnpj: string;
    telephone: string;
    created_at: Date;
  };
  external_user: {
    id: string;
    name: string;
    email: string;
    password: string;
    is_admin: boolean;
    created_at: Date;
  };
  open_so_user: {
    id: string;
    name: string;
    email: string;
    password: string;
    is_admin: boolean;
    created_at: Date;
  };
}
interface IServiceOrderResponse {
  id: string;
  protocol: string;
  defect: string;
  status: string;
  open_date: Date;
  close_date: Date;
  requester_name: string;
  requester_phone: string;
  external_user: {
    id: string;
    name: string;
    email: string;
  };
  open_so_user: {
    id: string;
    name: string;
    email: string;
  };
  client: {
    id: string;
    name: string;
    cpf_cnpj: string;
    telephone: string;
  };
}
class ServiceOrderMap {
  static toDTO([
    {
      id,

      protocol,
      defect,
      close_date,
      open_date,
      requester_name,
      requester_phone,
      status,
      external_user,
      open_so_user,
      client,
    },
  ]: IOrders[]): IServiceOrderResponse {
    return {
      id,
      protocol,
      status,
      defect,
      open_date,
      close_date,
      requester_name,
      requester_phone,
      client: {
        id: client.id,
        name: client.name,
        cpf_cnpj: client.cpf_cnpj,
        telephone: client.telephone,
      },
      open_so_user: {
        id: open_so_user.id,
        name: open_so_user.name,
        email: open_so_user.email,
      },
      external_user: {
        id: external_user.id,
        name: external_user.name,
        email: external_user.email,
      },
    };
  }
}

export { ServiceOrderMap };
