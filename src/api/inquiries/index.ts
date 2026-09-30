import axios from "@/configs/axios-client";
import { handleRequest } from "@/configs/api.helper";
import { INQUIRIES_BASEURL, INQUIRIES_ENDPOINTS } from "@/configs/inquiries";
import {
  ICreateInquiries,
  TCreateInquiriuesResponse,
} from "@/interfaces/inquiries";

export function CreateInquiries(
  payload: ICreateInquiries,
): Promise<TCreateInquiriuesResponse> {
  return handleRequest(
    axios.post(`${INQUIRIES_BASEURL}${INQUIRIES_ENDPOINTS.CREATE}`, payload, {
      public: true,
    }),
  );
}
