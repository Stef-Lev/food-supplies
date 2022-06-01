import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import QueueIcon from "@material-ui/icons/Queue";
import AssignmentIcon from "@material-ui/icons/Assignment";
import GridOnIcon from "@material-ui/icons/GridOn";

const headerData = [
  {
    intlId: "header.comp.home",
    defaultMsg: "Home",
    icon: <HomeIcon />,
    href: "/",
  },
  {
    intlId: "header.comp.add",
    defaultMsg: "Add Product",
    icon: <QueueIcon />,
    href: "/product",
  },
  {
    intlId: "header.comp.lists",
    defaultMsg: "My Lists",
    icon: <AssignmentIcon />,
    href: `/user/lists`,
  },
  {
    intlId: "header.comp.reports",
    defaultMsg: "Reports",
    icon: <GridOnIcon />,
    href: `/user/tables`,
  },
  {
    intlId: "header.comp.logout",
    defaultMsg: "Logout",
    icon: <ExitToAppIcon />,
    href: "/logout",
  },
];

export { headerData };
