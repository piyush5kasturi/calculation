import { useMutation } from "@tanstack/react-query";
import API from "../../lib/api-client";

export const fetchList = async (perPage = 10, page = 1) => {
  const url = `/api/DynamicQuery/${perPage}/${page}/false`;
  const response = await API("get", url);
  const result = response?.data?.result;
  return {
    rows: result?.dynamicQueryRes,
    count: result?.totalCount,
    columns: result?.tableColumns,
  };
};

const calculation = async (values: any) => {
  const url = "/api/DynamicQuery";
  const response = await API("post", url, values);
  if (!response) {
    throw false;
  }
  return response.data.result;
};

export function useCalculation<T extends string>() {
  const {
    mutate: CalculationMutation,
    isLoading,
    error,
    data,
    isError,
  } = useMutation<any, any, any, T>((values: any) => calculation(values));
  return {
    CalculationMutation,
    isLoading,
    error: (error && error?.data) || "",
    data,
    isError,
  };
}

const deleteMaster = async (id) => {
  const url = `/api/DynamicQuery/${id}`;
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
  } = useMutation<any, any, any, T>((id: any) => deleteMaster(id));
  return {
    deleteMutation,
    isLoading,
    error: (error && error?.data) || "",
    data,
    isError,
  };
}
