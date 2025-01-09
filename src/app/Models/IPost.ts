export interface IPost {
  id?: string;
  categoryid: string;
  description: string;
  title: string;
  categoryName?: string;
}

export interface CRUDAction<T> {
  action: 'Add' | 'Update' | 'Delete';
  data: T;
}
