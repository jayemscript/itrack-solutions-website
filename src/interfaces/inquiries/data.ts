import { BaseFields } from "@/interfaces/common";

export interface Inquiries extends BaseFields {
  fullname: string;
  email: string;
  phone: string;
  company: string;
  context: string;
  message: string;
}
