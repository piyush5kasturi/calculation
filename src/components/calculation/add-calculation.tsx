import React, { useEffect, useMemo, useRef, useState } from "react";
import Alert from "../../ui-components/alert";
import { Controller, useForm } from "react-hook-form";
import Input from "../../ui-components/input";
import { FormValues } from "./calculation.interface";
import { nameRegex } from "../../utils/regex";
import FormulaArea from "../../ui-components/formula-builder";
import { useQuery } from "@tanstack/react-query";
import { fetchList } from "../master/master.services";
import Operators from "../../ui-components/formula-builder/operators";
import Button from "../../ui-components/button";
import Dropdown from "../../ui-components/dropdown";
import { fetchListOperater } from "../operator/operator.services";
import { useCalculation } from "./calculation.services";
import { useLocation, useNavigate } from "react-router-dom";

export default function CalculationAdd() {
  const { state } = useLocation();
  const ref = useRef<any>(null);
  const navigate = useNavigate();
  // const dataSourceQuery = useDataItems(["data_source_list"]);
  // const dataSource: any = useMemo(
  //   () => dataSourceQuery?.data ?? [],
  //   [dataSourceQuery?.data]
  // );
  const [formula, setFormula] = useState<
    { type: string; value: string; label: string }[]
  >([]);
  const [formulaError, setFormulaError] = useState<boolean | undefined>(
    undefined
  );
  const [index, setIndex] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const addMutation = useCalculation();
  console.log(state, ";;;;;");
  const { isLoading, isError, error, data } = useQuery<any, any, any>({
    queryKey: ["master", "list"],
    queryFn: () => fetchList(1000, 1),
  });

  const {
    isLoading: operatorIsLoading,
    isError: operatorIsError,
    error: operatorError,
    data: operatorData,
  } = useQuery<any, any, any>({
    queryKey: ["operator", "list"],
    queryFn: () => fetchListOperater(1000, 1),
  });

  // const updateMutation = useUpdateUser();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      dataSource: { label: "", value: "" },
      columns: { label: "", value: "" },
    },
  });
  // const dataSourceList = useMemo(() => {
  //   return dataSource
  //     ? dataSource.map((item) => {
  //         return { label: item.name, value: item.id };
  //       })
  //     : [];
  // }, [dataSource]);
  // const watchdataSource = watch("dataSource");
  const columnList = useMemo(() => {
    return data?.rows?.map(({ autoID, name, value }) => ({
      label: name,
      value: autoID.toString(),
      labelvalue: value,
    }));
  }, [data]);

  const operatorist = useMemo(() => {
    return operatorData?.rows?.map(({ value, labelName }) => ({
      label: labelName,
      value: value,
    }));
  }, [operatorData]);

  // const columnList = useMemo(() => {
  //   const selectedItem = dataSource
  //     ? dataSource.filter((item) => {
  //         if (item.id == watchdataSource?.value) {
  //           return item;
  //         }
  //       })
  //     : [];

  //   const filteredColumn = selectedItem[0]?.columns?.filter((item) => {
  //     if (item.type === "integer" || item.type === "float") {
  //       return item;
  //     }
  //   });
  //   return filteredColumn?.map((item) => {
  //     return { label: item.label, value: item.name };
  //   });
  // }, [watchdataSource, dataSource]);

  useEffect(() => {
    if (state) {
      reset({
        name: state?.query?.name,
        columns: { label: "", value: "" },
      });
      setFormula(state?.query?.dql_json);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, reset]);

  const handleOperatorClick = (val) => {
    const tempArr = [...formula];
    if (index || index == 0) {
      tempArr.splice(index + 1, 0, {
        type: "operator",
        value: val,
        label: val,
      });
      setFormula(tempArr);
      setIndex(index + 1);
    } else {
      setFormula((pre) => [
        ...pre,
        { type: "operator", value: val, label: val },
      ]);
      setIndex(formula?.length);
    }
    setErrorMsg("");
  };

  if (addMutation.data) {
    navigate("/calc");
  }

  const onSubmit = async (value) => {
    console.log(formula, "asasas");
    if (formulaError === undefined) {
      setErrorMsg("Required");
      return;
    } else if (formulaError) {
      setErrorMsg("Please enter valid formula");
      return;
    }

    const response = {
      name: value.name,
      dql_json: formula,
    };

    if (state?.autoID) {
      addMutation.CalculationMutation({ ...response, autoID: state?.autoID });
    } else {
      addMutation.CalculationMutation(response);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5 grid gap-1">
          <div className="mt-3">
            {/* {(isError || addMutation.error || updateMutation.error) && (
              <Alert
                type="error"
                text={
                  addMutation.error?.data?.message ||
                  updateMutation.error?.data?.message ||
                  error?.data.message
                }
              />
            )} */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-4 col-span-2">
                {/* {isLoading && id ? (
                  placeholderElInput()
                ) : ( */}
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    validate: (value) => {
                      if (!value.match(nameRegex)) {
                        return "Please enter a valid name";
                      }
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      label="Property Name"
                      value={value}
                      onChange={onChange}
                      placeholder="Enter Property Name"
                      errors={!!errors?.name}
                      required
                    />
                  )}
                  name="name"
                />
                {/* )} */}
                {/* {isLoading && id ? (
                  placeholderFormula()
                ) : ( */}
                <FormulaArea
                  formula={formula}
                  error={formulaError}
                  setError={(val) => setFormulaError(val)}
                  errorMsg={errorMsg}
                  setErrorMsg={(val) => setErrorMsg(val)}
                  setIndexFn={(index) => {
                    setIndex(index);
                  }}
                  setFormula={(e) => {
                    setFormula([...e]);
                  }}
                />
                {/* )} */}
              </div>
              <div className="grid gap-4 mx-4 border-l-2 border-[#EDEEF1] pl-4">
                {/* {isLoading && id ? (
                  placeholderElInput()
                ) : ( */}
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Dropdown
                      items={columnList}
                      onChange={(val) => {
                        onChange(val);

                        if (index || index == 0) {
                          const tempArr: any = [...formula];
                          tempArr.splice(index + 1, 0, {
                            type: "Column",
                            value: val.labelvalue.toString(),
                            label: val.label,
                          });
                          setFormula(tempArr);
                          setIndex(index + 1);
                        } else {
                          setFormula((pre) => [
                            ...pre,
                            {
                              type: "Column",
                              value: val.labelvalue.toString(),
                              label: val.label,
                            },
                          ]);
                          setIndex(formula.length);
                        }
                        setErrorMsg("");
                      }}
                      error={errors.columns}
                      label=""
                      value={value}
                      placeholder={"Columns"}
                    />
                  )}
                  name="columns"
                />
                {/* )} */}
                {/* {isLoading && id ? (
                  placeholderElInput()
                ) : ( */}
                <Operators
                  handleClick={(value) => {
                    handleOperatorClick(value?.value);
                  }}
                  operatorist={operatorist}
                />
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-[#ffffff]  border-t-[1px] border-[#E7E7E7]">
          <div className="flex p-6 gap-2 items-center justify-end">
            <Button
              type="button"
              text="Cancel"
              variant="secondary"
              size="large"
              disabled={addMutation?.isLoading}
              onClick={() => navigate(-1)}
            />
            <Button
              type="submit"
              size="large"
              text="Save"
              isLoading={addMutation?.isLoading}
              disabled={addMutation?.isLoading}
            />
          </div>
        </div>
      </form>
    </>
  );
}
