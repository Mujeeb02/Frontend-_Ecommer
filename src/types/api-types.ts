import { Bar, CartItem, Line, Order,Pie, Product, ShippingInfo, Stats, User } from "./types";

export type customError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  }
}

export type MessageResponse = {
  success: boolean;
  message: string;
}

export type UserResponse = {
  success: boolean;
  users: User;
}

export type AllUserResponse = {
  success: boolean;
  users: User[];
}

export type DeleteUserRequest = {
  userId:string;
  adminUserId:string;
}

export type AllProductsResponse = {
  success: boolean;
  data: Product[];
};
export type ProductsResponse = {
  success: boolean;
  data: Product;
};

export type CategoriesResponse = {
  success: boolean;
  data: string[];
};

export type SearchProductResponse = {
  success: boolean;
  data: Product[];
  totalPage: number;
}

export type SearchProductRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
}

export type NewpProductRequest = {
  id: string;
  formData: FormData;
}

export type UpdatepProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
  productName: string;
}

export type DeleteProductRequest = {
  userId: string;
  productId: string;
}

export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  subtotal: number;
  shippingCharges: number;
  discount: number;
  total: number;
  tax: number;
  user: string;
}

export type UpdateOrderRequest = {
  userId:string;
  orderId:string;
}


export type MyOrderResponse = {
  success: boolean;
  orders: Order[];
};

export type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};

export type StatsResponse = {
  success: boolean;
  stats: Stats;
};

export type PieResponse = {
  success: boolean;
  charts: Pie;
};

export type BarResponse = {
  success: boolean;
  charts: Bar;
};

export type LineResponse = {
  success: boolean;
  charts: Line;
};