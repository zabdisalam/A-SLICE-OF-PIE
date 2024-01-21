// import { Button } from "@material-tailwind/react";
import "./App.css";
import MonthlyRevenue from "./MonthlyRevenue";
import StoreOrders from "./StoreOrders";

import Reviews from "./Reviews";

function App() {
  return (
    <div>
      <Reviews /> {/* Goal 1 */}
      <StoreOrders /> {/* Goal 2 */}
      <MonthlyRevenue /> {/* Goal 3 & 4 */}
    </div>
  );
}

export default App;
