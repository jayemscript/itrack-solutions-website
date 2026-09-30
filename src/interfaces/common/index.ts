export interface BaseFields {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  version: number;
  [key: string]: unknown;
  isActive?: boolean;
  isDefault?: boolean;
  isPrimary?: boolean;
}

export interface CommonResponse<T> {
  statusCode: number;
  message: string;
  timestamp: string;
  data: T;
}

export interface ErrorResponseMessage {
  message?: string | string[] | { message?: string | string[] };
}

export interface BasePaginationResponse<T> {
  status: string;
  message: string;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  [key: string]: T[] | string | number;
}

export interface GetAllPaginatedParams {
  page?: number;
  limit?: number;
  keyword?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, unknown>;
}

export interface FormModalProps {
  open: boolean;
  close: () => void;
  onSuccess?: () => void;
  initialData?: Record<string, unknown>;
  mode?: "add" | "edit";
}
