import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { AllProductsResponse, CategoriesResponse, DeleteProductRequest, MessageResponse, NewpProductRequest, ProductsResponse, SearchProductRequest, SearchProductResponse, UpdatepProductRequest } from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://mern-ecommerce-server-2.onrender.com/api/v1/product/` }),
  tagTypes:["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "latest",
      providesTags:["product"]
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags:["product"]
    }),
    productDetails: builder.query<ProductsResponse, string>({
      query: (id) => id,
      providesTags:["product"]
    }),
    categories: builder.query<CategoriesResponse, string>({
      query: () => `category`,
      providesTags:["product"]
    }),
    searchProducts:builder.query<SearchProductResponse,SearchProductRequest>({
      query:({price,search,sort,category,page})=>{
        let base=`all?search=${search}&page=${page}`
        if(price){
          base+=`&price=${price}`
        }
        if(sort){
          base+=`&sort=${sort}`
        }
        if(category){
          base+=`&category=${category}`
        }
        return base;
      },
      providesTags:["product"]
    }),
    newProduct: builder.mutation<MessageResponse,NewpProductRequest>({
      query: ({formData,id}) => ({
        url:`new?id=${id}`,
        method:"POST",
        body:formData
      }),
      invalidatesTags:["product"]
    }),
    updateProduct: builder.mutation<MessageResponse,UpdatepProductRequest>({
      query: ({formData,userId,productId,productName}) => ({
        url:`update/${productId}?id=${userId}&name=${productName}`,
        method:"PUT",
        body:formData
      }),
      invalidatesTags:["product"]
    }),
    deleteProduct: builder.mutation<MessageResponse,DeleteProductRequest>({
      query: ({userId,productId}) => ({
        url:`delete/${productId}?id=${userId}`,
        method:"DELETE",
      }),
      invalidatesTags:["product"]
    }),
  }),
});

export const { useLatestProductsQuery,
   useAllProductsQuery, 
   useCategoriesQuery,
   useSearchProductsQuery,
   useNewProductMutation,
  useProductDetailsQuery,
useUpdateProductMutation,
useDeleteProductMutation } = productApi;
