export interface ICreateServiceOrderDTO {
  id_client: string;
  id_external_user: string;
  id_open_so_user: string;
  protocol?: string;
  defect: string;
  status: string;
  open_date: Date;
  close_date: Date;
  requester_name: string;
  requester_phone: string;
}
