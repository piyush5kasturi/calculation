import BarGarph from "../../ui-components/highchart/bar-graph";
import React, { useState } from "react";
import Users from "../../ui-components/modals/users";
const defaultPopupState: {
  isPopupOpen: boolean;
  type: null | string;
  data?: any;
} = {
  isPopupOpen: false,
  type: null,
  data: null,
};
export default function List() {
  const [{ type, isPopupOpen, data: popupData }, setPopupState] =
    useState(defaultPopupState);

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Our very first chart",
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              setPopupState({ isPopupOpen: true, type: "graph", data: null });
            },
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        data: [1, 2, 3],
      },
    ],
  };

  return (
    <>
      {isPopupOpen && type === "graph" && (
        <Users
          isOpen={isPopupOpen}
          toggle={() => {
            setPopupState(defaultPopupState);
          }}
        />
      )}
      <BarGarph options={options} />
    </>
  );
}
