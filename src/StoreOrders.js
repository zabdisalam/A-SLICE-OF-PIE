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
        if (acc[order.store] !== undefined) {
          acc[order.store] += 1;
        }
        return acc;
      },
      { Kanata: 0, Orleans: 0, Downtown: 0, "Sandy Hill": 0, "The Glebe": 0 }
    );
  }, []);

  const chartConfig = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Orders",
        data: Object.values(storeOrderCounts),
      },
    ],
    options: {
      chart: {
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
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: Object.keys(storeOrderCounts),
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
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
