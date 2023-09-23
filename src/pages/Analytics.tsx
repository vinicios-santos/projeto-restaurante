import "./Analytics.module.css";
import Welcome from "../components/base/Welcome";
import GraphicChart from "../components/graphicchart/GraphicChart";
import DateNow from "../components/analytics/DateNow";
import FilterGraphic from "../components/graphicchart/FilterGraphic";

const Analytics = () => {
    return (
      <>
        <Welcome/>
        <div className="SubHeaderAnalytics">
          <DateNow/>
          <FilterGraphic/>
        </div>
        <GraphicChart/>
      </>
    )
  }

export default Analytics;


