import React, { useMemo, useRef, useState } from "react";
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

export default function Calculation() {
  const ref = useRef<any>(null);
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
  // const addMutation = useAddCalculatedField();

  const { isLoading, isError, error, data } = useQuery<any, any, any>({
    queryKey: ["master", "list"],
    queryFn: () => fetchList(30, 1),
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
    return data?.rows?.map(({ autoID, name }) => ({
      label: name,
      value: autoID,
    }));
  }, [data]);

  console.log(data, ";;");
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

  // useEffect(() => {
  //   if (data && dataSourceList) {
  //     reset({
  //       name: data.name,
  //       dataSource: dataSourceList.filter((item) => {
  //         if (item.value == data.datasource_id) {
  //           return { label: item.name, value: item.id };
  //         }
  //       })[0],
  //       columns: { label: "", value: "" },
  //     });
  //     setFormula(data.expression);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data, reset, dataSource]);
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
      setIndex(formula.length);
    }
    setErrorMsg("");
  };

  // if (addMutation.data || updateMutation.data) {
  //   toggle(true, addMutation.data || updateMutation.data);
  // }

  const onSubmit = async (value) => {
    if (formulaError === undefined) {
      setErrorMsg("Required");
      return;
    } else if (formulaError) {
      setErrorMsg("Please enter valid formula");
      return;
    }
    const response = {
      name: value.name,
      datasource_id: value.dataSource.value,
      expression: formula,
    };
    // if (id) {
    //   updateMutation.mutate({ ...response, id });
    // } else {
    //   addMutation.mutate(response);
    // }
  };
  return (
    <>
      <form>
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
                    debugger;
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
                      items={[
                        { label: "sdsd", value: 1 },
                        { label: "sdsdsfsfsdfd", value: 2 },
                      ]}
                      onChange={(val) => {
                        onChange(val);

                        if (index || index == 0) {
                          const tempArr: any = [...formula];
                          tempArr.splice(index + 1, 0, {
                            type: "Column",
                            value: val.value,
                            label: val.label,
                          });
                          console.log(tempArr, ";;;;;");
                          setFormula(tempArr);
                          setIndex(index + 1);
                        } else {
                          setFormula((pre) => [
                            ...pre,
                            {
                              type: "Column",
                              value: val.value,
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
                    handleOperatorClick(value);
                  }}
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
            />
            <Button type="button" size="large" text="Save" />
          </div>
        </div>
      </form>
    </>
  );
}
