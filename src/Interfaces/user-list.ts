/* eslint-disable camelcase */
export interface UserListItem {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  // Image url
  avatar: string;
}

export interface UserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserListItem[];
}

export interface UserListState {
  data?: UserListItem[];
  total?: number;
  totalPages?: number;
  currentPage: number;
  loading: boolean;
}

export interface UserToSend extends Omit<Omit<UserListItem, 'id'>, 'avatar'> {}
