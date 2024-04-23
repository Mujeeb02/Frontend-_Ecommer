import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllUserResponse, DeleteUserRequest, MessageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";
export const userApi=createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl:`https://mern-ecommerce-server-2.onrender.com/api/v1/user/`}),
    tagTypes: ["users"],
    endpoints:(builder)=>({
      
        login:builder.mutation<MessageResponse,User>({
            query:(user)=>({
                url:"new",
                method:"POST",
                body:user
            }),
            invalidatesTags:["users"]
        }),
        
        deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
          query: ({ userId, adminUserId }) => ({
            url: `delete/${userId}?id=${adminUserId}`,
            method: "DELETE",
          }),
          invalidatesTags: ["users"],
        }),
    
        allUsers: builder.query<AllUserResponse, string>({
          query: (id) => `getall?id=${id}`,
          providesTags: ["users"],
        }),
    }),
})



export const getUser = async (id: string) => {
    try {
      const { data }: { data: UserResponse } = await axios.get(
        `https://mern-ecommerce-server-2.onrender.com/api/v1/user/${id}`
      );
    //   console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const { useLoginMutation,useAllUsersQuery,useDeleteUserMutation} =userApi;