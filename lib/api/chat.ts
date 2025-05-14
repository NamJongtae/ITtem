import { AxiosResponse } from "axios";
import customAxios from "../customAxios";
import { StartChatResponseData } from "@/types/api-types";

export async function startChat({
  productId,
  userId
}: {
  productId: string;
  userId: string;
}): Promise<AxiosResponse<StartChatResponseData>> {
  try {
    const response = await customAxios.post(`/api/chat`, {
      productId,
      userId
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function joinChatRoom(
  chatRoomId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const reponse = await customAxios.patch(`/api/chat/${chatRoomId}/join`);
    return reponse;
  } catch (error) {
    throw error;
  }
}

export async function leaveChatRoom(
  chatRoomId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const reponse = await customAxios.patch(`/api/chat/${chatRoomId}/leave`);
    return reponse;
  } catch (error) {
    throw error;
  }
}

export async function sendToChatMessage({
  chatRoomId,
  message
}: {
  chatRoomId: string;
  message: string;
}): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.post(`/api/chat/${chatRoomId}/message`, {
      message
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function exitChatRoom(
  chatRoomId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch(`/api/chat/${chatRoomId}/exit`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteChatRoom(
  chatRoomId: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.delete(`/api/chat/${chatRoomId}`);
    return response;
  } catch (error) {
    throw error;
  }
}
