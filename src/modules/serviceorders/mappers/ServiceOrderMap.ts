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
  notes: {
    id: string;
    observations: string;
    created_at: Date;
  }[];
}
class ServiceOrderMap {
  static toDTO(orders: IOrders[]): IServiceOrderResponse[] {
    const response = orders.map((order) => {
      return {
        id: order.id,
        protocol: order.protocol,
        status: order.status,
        defect: order.defect,
        open_date: order.open_date,
        close_date: order.close_date,
        requester_name: order.requester_name,
        requester_phone: order.requester_phone,
        client: {
          id: order.client.id,
          name: order.client.name,
          cpf_cnpj: order.client.cpf_cnpj,
          telephone: order.client.telephone,
        },
        open_so_user: {
          id: order.open_so_user.id,
          name: order.open_so_user.name,
          email: order.open_so_user.email,
        },
        external_user: {
          id: order.external_user.id,
          name: order.external_user.name,
          email: order.external_user.email,
        },
        notes: order.notes.map((note) => {
          return {
            id: note.id,
            observations: note.observations,
            created_at: note.created_at,
          };
        }),
      };
    });
    return response;
  }
}

export { ServiceOrderMap };
