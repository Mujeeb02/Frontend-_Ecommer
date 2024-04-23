import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BarResponse, LineResponse, PieResponse, StatsResponse } from "../../types/api-types";

export const dashboardApi = createApi({
    reducerPath:"dashboardApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`https://mern-ecommerce-server-2.onrender.com/api/v1/stats/`,
    }),
    tagTypes:["dasboard"],
    endpoints:(builder)=>({
        dashboardstats:builder.query<StatsResponse,string>({
            query:(id)=>`dashboardstats?id=${id}`,
            keepUnusedDataFor:0
        }),
        piestats:builder.query<PieResponse,string>({
            query:(id)=>`pie?id=${id}`,
            keepUnusedDataFor:0
        }),
        barstats:builder.query<BarResponse,string>({
            query:(id)=>`bar?id=${id}`,
            keepUnusedDataFor:0
        }),
        linestats:builder.query<LineResponse,string>({
            query:(id)=>`line?id=${id}`,
            keepUnusedDataFor:0
        }),
    }),
})

//keepunuseddatafor is used to update the data in real time

export const{
    useDashboardstatsQuery,
    usePiestatsQuery,
    useBarstatsQuery,
    useLinestatsQuery,
} =dashboardApi