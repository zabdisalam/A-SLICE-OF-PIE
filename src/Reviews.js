import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { StarIcon } from "@heroicons/react/24/outline";
import reviewData from "./data/review_data.json";

const Reviews = () => {
  const sentimentCounts = useMemo(() => {
    return reviewData.reduce(
      (acc, review) => {
        if (acc[review.sentiment] !== undefined) {
          acc[review.sentiment] += 1;
        }
        return acc;
      },
      { delighted: 0, happy: 0, sad: 0, angry: 0 }
    );
  }, []);

  const percentages = useMemo(() => {
    const totalReviews = reviewData.length;
    return totalReviews === 0
      ? [0, 0, 0, 0]
      : Object.values(sentimentCounts).map((count) =>
          Math.round((count / totalReviews) * 100)
        );
  }, [sentimentCounts]);

  const chartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: percentages,
    options: {
      chart: { toolbar: { show: false } },
      dataLabels: { enabled: false },
      labels: Object.keys(sentimentCounts),
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5"],
      legend: { show: false },
    },
  };

  return (
    <div>
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
            <StarIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Reviews
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="max-w-sm font-normal"
            >
              This pie chart illustrates customer sentiment distribution for
              2023, showcasing the range of feedback received at A Slice of Pi.
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="mt-4 grid place-items-center px-2">
          <Chart {...chartConfig} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Reviews;
