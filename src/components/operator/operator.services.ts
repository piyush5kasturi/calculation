import { useMutation } from "@tanstack/react-query";
import API from "../../lib/api-client";

export const fetchList = async (perPage = 10, page = 1) => {
  const url = `/api/operator/${perPage}/${page}`;
  const response = await API("get", url);
  const result = response?.data?.result;
  return {
    rows: result?.payDetailResponses,
    count: result?.totalCount,
    columns: result?.tableColumns,
  };
};

const operator = async (values: any) => {
  const url = "/api/operator";
  const response = await API("post", url, values);
  if (!response) {
    throw false;
  }
  return response.data.result;
};

export function useOperator<T extends string>() {
  const {
    mutate: OperatorMutation,
    isLoading,
    error,
    data,
    isError,
  } = useMutation<any, any, any, T>((values: any) => operator(values));
  return {
    OperatorMutation,
    isLoading,
    error: (error && error?.data) || "",
    data,
    isError,
  };
}

const deleteOperator = async (id) => {
  const url = `/api/operator/${id}`;
  const response = await API("delete", url);
  if (!response) {
    throw false;
  }
  return true;
};

export function useDelete<T extends string>() {
  const {
    mutate: deleteMutation,
    isLoading,
    error,
    data,
    isError,
  } = useMutation<any, any, any, T>((id: any) => deleteOperator(id));
  return {
    deleteMutation,
    isLoading,
    error: (error && error?.data) || "",
    data,
    isError,
  };
}
