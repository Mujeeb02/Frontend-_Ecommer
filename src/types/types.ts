export interface User {
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: string;
    _id: string;
}

export type Product = {
    description: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    photo: string;
    _id: string;
};

export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
};

export type CartItem = {
    productId: string;
    name: string;
    photo: string;
    price: number;
    quantity: number;
    stock: number;
    category: string;
};

export type OrderItems = {
    productId: string;
    name: string;
    photo: string;
    price: number;
    quantity: number;
    _id: string;
};

export type Order = {
    orderItems: OrderItems[];
    shippingInfo: ShippingInfo;
    subtotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    user: {
        name: string;
        _id: string;
    };
    _id: string;
};

type CountAndChange = {
    revenue: number;
    product: number;
    user: number;
    order: number;
  };
  
  type LatestTransaction = {
    _id: string;
    amount: number;
    discount: number;
    quantity: number;
    status: string;
  };

export type Stats = {
    categoryCount: Record<string, number>[];
    percentageChange: CountAndChange;
    count: CountAndChange;
    chart: {
        order: number[];
        revenue: number[];
    };
    userRatio: {
        male: number;
        female: number;
    };
    latestTransaction: LatestTransaction[];
};

type OrderFullfillment = {
    processing: number;
    shipped: number;
    delivered: number;
};

type RevenueDistribution = {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
};

type UsersAgeGroup = {
    teen: number;
    adult: number;
    old: number;
};


export type Pie = {
    orderFullfillment: OrderFullfillment;
    productCategories: Record<string, number>[];
    stockAvailablity: {
        inStock: number;
        outOfStock: number;
    };
    revenueDistribution: RevenueDistribution;
    usersAgeGroup: UsersAgeGroup;
    adminCustomer: {
        admin: number;
        customer: number;
    };
};

export type Bar = {
    users: number[];
    products: number[];
    orders: number[];
};
export type Line = {
    users: number[];
    products: number[];
    discount: number[];
    revenue: number[];
};