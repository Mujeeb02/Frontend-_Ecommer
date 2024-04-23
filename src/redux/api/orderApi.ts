import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { MessageResponse, MyOrderResponse, NewOrderRequest, OrderDetailsResponse, UpdateOrderRequest } from "../../types/api-types";

export const orderApi = createApi({
    reducerPath:"orderApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`https://mern-ecommerce-server-2.onrender.com/api/v1/order/`,
    }),
    tagTypes:["order"],
    endpoints:(builder)=>({
        newOrder:builder.mutation<MessageResponse,NewOrderRequest>({
            query:(order)=>({url:"new",method:"POST",body:order}),
            invalidatesTags:["order"]
        }),
        updateOrder:builder.mutation<MessageResponse,UpdateOrderRequest>({
            query:({userId,orderId})=>({url:`process/${orderId}?id=${userId}`,method:"PUT"}),
            invalidatesTags:["order"]
        }),
        deleteOrder:builder.mutation<MessageResponse,UpdateOrderRequest>({
            query:({userId,orderId})=>({url:`delete/${orderId}?id=${userId}`,method:"DELETE"}),
            invalidatesTags:["order"]
        }),
        myOrders:builder.query<MyOrderResponse,string>({
            query:(id)=>`orders?id=${id}`,
            providesTags:["order"]
        }),
        allOrders:builder.query<MyOrderResponse,string>({
            query:(id)=>`allorders?id=${id}`,
            providesTags:["order"]
        }),
        orderDetails:builder.query<OrderDetailsResponse,string>({
            query:(id)=>`single/${id}`,
            providesTags:["order"]
        }),
    }),
})

export const{
    useNewOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useMyOrdersQuery,
    useAllOrdersQuery,
    useOrderDetailsQuery,
} =orderApi