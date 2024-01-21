import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import orderData from "./data/order_data.json";
import pricingData from "./data/pricing_data.json";
import Revenue from "./Revenue";

const MonthlyRevenue = () => {
  const monthlyRevenues = useMemo(() => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return orderData.reduce(
      (acc, order) => {
        const monthIndex = new Date(order.date).getMonth(); // Extracts month as a number (0-11)
        const monthName = monthNames[monthIndex]; // Converts month number to name
        let revenue = 0;
        order.items.forEach((item, i) => {
          revenue += pricingData[item.type][item.size];
        });
        acc[monthName] = (acc[monthName] || 0) + revenue; // Increments the count for the month
        console.log(`${order.order_id} - ${monthName}: ${acc[monthName]}`);
        return acc;
      },
      {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
      }
    );
  }, []);
  console.log(monthlyRevenues);

  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Revenue",
        data: Object.values(monthlyRevenues),
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
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
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
        categories: Object.keys(monthlyRevenues),
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
          <BanknotesIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Line Chart
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Discover A Slice of Pi's 2023 revenue overview: a total sales figure
            and a month-by-month earnings line chart.
          </Typography>
        </div>
      </CardHeader>
      <Revenue />
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
};

export default MonthlyRevenue;
