export interface INotesRepository {
  create(id_order: string, observations: string): Promise<void>;
}
