import { Typography } from "@material-tailwind/react";
import React, { useMemo } from "react";
import orderData from "./data/order_data.json";
import pricingData from "./data/pricing_data.json";

const Revenue = () => {
  const totalRevenue = useMemo(() => {
    return orderData.reduce((acc, order) => {
      order.items.forEach((item, j) => {
        acc += pricingData[item.type][item.size];
      });
      return acc;
    }, 0);
  }, []);

  return (
    <div className="p-5">
      <Typography variant="h1">${totalRevenue.toLocaleString()}</Typography>
    </div>
  );
};

export default Revenue;
