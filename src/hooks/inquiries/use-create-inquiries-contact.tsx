"use client";

import { useCallback, useState } from "react";
import { CreateInquiries } from "@/api/inquiries";
import type { ICreateInquiries } from "@/interfaces/inquiries";
import { extractErrorMessage } from "@/configs/api.helper";

export default function useCreateInquiriesContact() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const createInquiry = useCallback(async (payload: ICreateInquiries) => {
    setIsLoading(true);
    setError(null);

    try {
      return await CreateInquiries(payload);
    } catch (requestError) {
      setError(requestError);
      throw new Error(extractErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createInquiry,
    isLoading,
    error,
  };
}
