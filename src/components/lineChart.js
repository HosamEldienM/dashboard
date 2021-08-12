import { useContext, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
} from "recharts";

import { LangContext } from "../contexts/cartContext";

const LinearChart = ({ elements, filterField, fieldName, description }) => {
  const { Lang } = useContext(LangContext);

  var days =
    Lang === "en"
      ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      : ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];
  const day = new Date().getDay();

  const time = new Date().getTime();

  function getItemsByDay(x) {
    return elements.filter(
      (element) =>
        Math.ceil(element[filterField] / 86400000) ===
        Math.ceil(time / 86400000) - x
    ).length;
  }

  const data = [
    {
      name: days[day - 6] || days[day + 1],
      [fieldName]: getItemsByDay(6),
    },
    {
      name: days[day - 5] || days[day + 2],
      [fieldName]: getItemsByDay(5),
    },
    {
      name: days[day - 4] || days[day + 3],
      [fieldName]: getItemsByDay(4),
    },
    {
      name: days[day - 3] || days[day + 4],
      [fieldName]: getItemsByDay(3),
    },
    {
      name: days[day - 2] || days[day + 5],
      [fieldName]: getItemsByDay(2),
    },
    {
      name: days[day - 1] || days[day + 6],
      [fieldName]: getItemsByDay(1),
    },
    {
      name: days[day],
      [fieldName]: getItemsByDay(0),
    },
  ];

  return (
    <div className="bgtwo myshadow rounded p-1 boeder-0 ">
      <LineChart width={350} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" minTickGap={-5} />
        <YAxis tickMargin={8} />

        <Tooltip />

        <Line type="monotone" dataKey={fieldName} stroke="#8884d8" />
      </LineChart>
      <h5 className="txtone">{description}</h5>
    </div>
  );
};

export default LinearChart;
