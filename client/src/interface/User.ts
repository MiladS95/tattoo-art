export interface User {
  email: string;
  username: string;
  id?: string;
  profileImage: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}

export interface Customer {
  _id: string;
  user_id: {
    _id: string;
    profileImage?: string;
  };
  payment_id: string;
  customer_id: string;
  register_date: string;
}
