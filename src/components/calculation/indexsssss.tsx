import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../ui-components/input";
import Button from "../../ui-components/button";
import { useQuery } from "@tanstack/react-query";
import { fetchList } from "../master/master.services";
import Dropdown from "../../ui-components/dropdown";
import { validateFormula } from "../../ui-components/formula-builder/helpers";
import FormulaBuilder from "../../ui-components/formula-builder/indexsdsd";
import { droppable } from "./helper";

export default function Calculation() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      propertyName: "",
      master: "",
      dql_json: [],
    },
  });

  const {
    isLoading,
    isError,
    error,
    data: masterData = [],
    refetch,
  } = useQuery<any, any, any>({
    queryKey: ["master", "list"],
    queryFn: () => fetchList(30, 1),
  });

  const masterFinalData = useMemo(() => {
    return masterData?.rows?.map(({ autoID, name }) => ({
      label: name,
      value: autoID,
    }));
  }, [masterData]);

  return (
    <>
      <div>
        <form>
          <div className="grid grid-cols-2 gap-6">
            <Controller
              control={control}
              name="propertyName"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  type="text"
                  label="Property Name"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter Property Name"
                  errors={!!errors?.propertyName}
                  required
                />
              )}
            />
            {/* <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <div>
                  <Dropdown
                    items={masterFinalData}
                    onChange={onChange}
                    error={errors.master}
                    value={value}
                    label="Master"
                    placeholder=" Select Master Property"
                    required
                  />
                </div>
              )}
              name="master"
            /> */}
            <div className="col-span-2">
              <Controller
                control={control}
                rules={{
                  validate: {
                    required: (values) => {
                      if (validateFormula(values)?.length || !values?.length)
                        return "required";
                    },
                  },
                  required: true,
                }}
                render={({ field: { value, onChange } }) => {
                  return (
                    <>
                      {/* {isDataLoadingState || isKPIMasterDatafetching ? (
                      placeholderElBuilder()
                    ) : ( */}
                      <FormulaBuilder
                        value={value}
                        allowTyping={{
                          inCurlyBrackets: false,
                          outSideCurlyBrackets: true,
                        }}
                        label="Calculation Builder"
                        {...(true && {
                          operatorsWhenEnclosedWithBracket: [
                            "=",
                            "≠",
                            "AND",
                            "OR",
                          ],
                        })}
                        {...(true && {
                          operatorsWhenEnclosedWithoutBracket: [
                            "+",
                            "-",
                            "x",
                            "/",
                            "{",
                            "}",
                            "(",
                            ")",
                          ],
                        })}
                        onChange={(prevState) => {
                          onChange(prevState(value));
                        }}
                        placeholder="Build your Calculation Property..."
                        error={!!errors?.dql_json}
                        filters={[
                          {
                            placeholder: "Select Master Property",
                            type: "kpi",
                            items: masterFinalData,
                            label: "Master",
                          },
                        ]}
                        operators={
                          false
                            ? [
                                "AND",
                                "OR",
                                "+",
                                "-",
                                "x",
                                "/",
                                "{",
                                "}",
                                "(",
                                ")",
                                "=",
                                "≠",
                              ]
                            : ["+", "-", "x", "/", "{", "}"]
                        }
                        droppable={droppable}
                      />
                      {/* )} */}
                    </>
                  );
                }}
                name="dql_json"
              />
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
      </div>
    </>
  );
}
