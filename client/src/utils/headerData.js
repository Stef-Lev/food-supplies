import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import QueueIcon from "@material-ui/icons/Queue";
import TableChartIcon from "@material-ui/icons/TableChart";

const headerData = [
  {
    label: "Home",
    icon: <HomeIcon />,
    href: "/",
  },
  {
    label: "Add Product",
    icon: <QueueIcon />,
    href: "/product",
  },
  {
    label: "Products List",
    icon: <FormatListNumberedIcon />,
    href: `/user/list`,
  },
  {
    label: "Overview",
    icon: <TableChartIcon />,
    href: `/user/overview`,
  },
  {
    label: "Logout",
    icon: <ExitToAppIcon />,
    href: "/logout",
  },
];

export { headerData };
