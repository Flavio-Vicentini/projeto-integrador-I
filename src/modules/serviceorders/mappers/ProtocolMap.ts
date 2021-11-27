import { Note } from "../entities/Note";

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
  notes: Note[];
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
  };
  open_so_user: {
    id: string;
    name: string;
  };
  client: {
    id: string;
    name: string;
    cpf_cnpj: string;
    telephone: string;
  };
  notes: {
    id: string;
    observations: string;
    created_at: Date;
  }[];
}
class ProtocolMap {
  static toDTO(orders: IOrders): IServiceOrderResponse {
    return {
      id: orders.id,
      protocol: orders.protocol,
      status: orders.status,
      defect: orders.defect,
      open_date: orders.open_date,
      close_date: orders.close_date,
      requester_name: orders.requester_name,
      requester_phone: orders.requester_phone,
      client: {
        id: orders.client.id,
        name: orders.client.name,
        cpf_cnpj: orders.client.cpf_cnpj,
        telephone: orders.client.telephone,
      },
      open_so_user: {
        id: orders.open_so_user.id,
        name: orders.open_so_user.name,
      },
      external_user: {
        id: orders.external_user.id,
        name: orders.external_user.name,
      },
      notes: orders.notes.map((note) => {
        return {
          id: note.id,
          observations: note.observations,
          created_at: note.created_at,
        };
      }),
    };
  }
}

export { ProtocolMap };
