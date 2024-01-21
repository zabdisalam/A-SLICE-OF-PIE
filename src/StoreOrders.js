import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import orderData from "./data/order_data.json";

const StoreOrders = () => {
  const storeOrderCounts = useMemo(() => {
    return orderData.reduce(
      (acc, order) => {
        let orderCount = 0;
        order.items.forEach((item, index) => {
          if (item.size === "S") acc[0][order.store] += 1;
          else if (item.size === "M") acc[1][order.store] += 1;
          else if (item.size === "L") acc[2][order.store] += 1;
          if (item.type === "Cheese") acc[3][order.store] += 1;
          else if (item.type === "Pepperoni") acc[4][order.store] += 1;
          else if (item.type === "Deluxe") acc[5][order.store] += 1;
          else if (item.type === "Hawaiian") acc[6][order.store] += 1;
          else if (item.type === "Meatlovers") acc[7][order.store] += 1;
        });
        acc[order.store] += orderCount;
        return acc;
      },
      // [{"S"},{"M"},{"L"},{"Cheese"},{"Pepperoni"},{"Deluxe"},{"Hawaiian"},{"Meatlovers"}]
      Array(8)
        .fill()
        .flatMap(() =>
          [
            {
              Kanata: 0,
              Orleans: 0,
              Downtown: 0,
              "Sandy Hill": 0,
              "The Glebe": 0,
            },
          ].map((e) => ({ ...e }))
        )
    );
  }, []);

  const chartConfig = {
    type: "bar",
    stacked: true,
    height: 240,
    series: [
      {
        name: "S",
        data: Object.values(storeOrderCounts[0]),
      },
      {
        name: "M",
        data: Object.values(storeOrderCounts[1]),
      },
      {
        name: "L",
        data: Object.values(storeOrderCounts[2]),
      },
      {
        name: "Cheese",
        data: Object.values(storeOrderCounts[3]),
      },
      {
        name: "Pepperoni",
        data: Object.values(storeOrderCounts[4]),
      },
      {
        name: "Deluxe",
        data: Object.values(storeOrderCounts[5]),
      },
      {
        name: "Hawaiian",
        data: Object.values(storeOrderCounts[6]),
      },
      {
        name: "Meatlovers",
        data: Object.values(storeOrderCounts[7]),
      },
    ],
    options: {
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: [
        "#1f77b4", // Blue
        "#ff7f0e", // Orange
        "#2ca02c", // Green
        "#9467bd", // Purple
        "#8c564b", // Brown
        "#7f7f7f", // Gray
        "#bcbd22", // Olive
        "#17becf", // Cyan
      ],
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: Object.keys(storeOrderCounts[0]),
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        theme: "dark",
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <BuildingStorefrontIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Store Orders
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            This bar chart displays 2023 order counts for each A Slice of Pi
            location, highlighting customer preferences across neighborhoods.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};

export default StoreOrders;
