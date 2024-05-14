import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React from "react";

export default function BarGarph({ options }) {
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
