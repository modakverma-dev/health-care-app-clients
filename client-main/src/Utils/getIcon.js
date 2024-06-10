import React from "react";
import HomeTabIcon from "../Icons/Home/HomeTabIcon";
import ReportTabIcon from "../Icons/Home/ReportTabIcon";
import ProfileTabIcon from "../Icons/Home/ProfileTabIcon";
import ActiveHomeTabIcon from "../Icons/Home/ActiveHomeTabIcon";
import ActiveReportTabIcon from "../Icons/Home/ActiveReportTabIcon";
import ActiveProfileTabIcon from "../Icons/Home/ActiveProfileTabIcon";

const getIcon = (icon, selected) => {
  switch (icon) {
    case "HomeTabIcon":
      return <HomeTabIcon selected={selected} />;
    case "ReportTabIcon":
      return <ReportTabIcon selected={selected} />;
    case "ProfileTabIcon":
      return <ProfileTabIcon selected={selected} />;
    case "ActiveHomeTabIcon":
      return <ActiveHomeTabIcon selected={selected} />;
    case "ActiveReportTabIcon":
      return <ActiveReportTabIcon selected={selected} />;
    case "ActiveProfileTabIcon":
      return <ActiveProfileTabIcon selected={selected} />;
  }
};

export default getIcon;
