"use client"

import useSWR, { useSWRConfig } from "swr"
import { endpoints } from "../apis/endpoints"
import { messageApi } from "../apis/messageApi"
import { apiClient } from "../apis/client"

export const useMessage = () => {
     const { data } = useSWR(endpoints.message.all, messageApi.getAllRoom)
     return { data }
}

export const useRoomDetail = (roomId: string) => {
     const { data } = useSWR(
          roomId ? endpoints.message.detail(roomId) : null,
          () => messageApi.getRoomDetail(roomId)
     )
     return { data }
}

export const useRoomMessages = (roomId: string) => {
     const { data, mutate } = useSWR(
          roomId ? endpoints.message.allMessage(roomId, 999999) : null,
          () => messageApi.getAllMessage(roomId, 999999),
          { refreshInterval: 0 }
     )
     return { data, mutate }
}

export const useCreateRoomMessage = () => {
     const { mutate } = useSWRConfig()

     const createNewRoomMessage = async (otherUserId: string) => {
          const res = await apiClient.post(endpoints.message.createDirect(otherUserId))
          await mutate(endpoints.message.all)
          return res.data
     }

     return { createNewRoomMessage }
}