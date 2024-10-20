import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Menu } from "lucide-react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import EditProfile from "./backup/EditProfile";
import Notifications from "./Notifications";
import MyTickets from "./MyTickets";

function SidebarMenu() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { path, url } = useRouteMatch();
  const location = useLocation(); // Hook to detect the current route

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Helper function to check if a menu item is active based on the current location
  const isActive = (route) => location.pathname === route;

  function MenuItem({ icon, label, to, activeColor, size }) {
    const active = isActive(to); // Check if the current route is active

    return (
      <Link
        to={to}
        className={`flex items-center cursor-pointer ${
          active ? "bg-accent-200" : "text-gray-600"
        } ${isExpanded ? "justify-start" : "justify-center"} rounded-lg`}
      >
        <div className="flex justify-center items-center w-12 h-12 p-2">
          {/* Apply active color to the icon when active */}
          {React.cloneElement(icon, {
            className: active
              ? `${activeColor} w-${size} h-${size}`
              : `text-gray-600 w-${size} h-${size}`,
          })}
        </div>
        {isExpanded && <span className="ml-4">{label}</span>}
      </Link>
    );
  }

  return (
    <Router>
      <div className="flex flex-col rounded-lg md:flex-row m-5">
        {/* Sidebar */}
        <div
          className={`${
            isExpanded ? "w-64" : "w-20"
          } transition-all duration-300 relative rounded-lg`}
        >
          <div className="bg-white text-nowrap p-5 shadow-lg">
            {/* Hamburger Menu */}
            <div className="absolute top-4 right-3">
              <Button variant="ghost" onClick={toggleSidebar}>
                <Menu size={24} />
              </Button>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center mt-16">
              <Avatar className="mb-4">
                <AvatarImage
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                />
              </Avatar>
            </div>

            {/* Menu Options */}
            <div className="mt-8 space-y-6">
              <MenuItem
                icon={<IoPersonCircleOutline />}
                label="ویرایش پروفایل"
                to={`${url}/edit`}
                activeColor="text-accent-600" // Set active color
                size={10} // Icon size
              />
              <MenuItem
                icon={<FaBell />}
                label="اعلان ها"
                to={`${url}/notifications`}
                activeColor="text-secondary-500" // Set active color
                size={7} // Icon size
              />
              <MenuItem
                icon={<HiTicket />}
                label="تیکت ها"
                to={`${url}/tickets`}
                activeColor="text-primary-700" // Set active color
                size={10} // Icon size
              />
              <MenuItem
                icon={<CiLogout />}
                label="خروج از حساب کاربری"
                to={`${url}/logout`}
                activeColor="text-state-error-red2" // Set active color
                size={10} // Icon size
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full flex flex-grow justify-center py-auto">
          <Switch>
            {/* Nested routes under "/profile" */}
            <Route exact path={`${path}/edit`}>
              <EditProfile />
            </Route>
            <Route path={`${path}/notifications`}>
              <Notifications />
            </Route>
            <Route path={`${path}/tickets`}>
              <MyTickets />
            </Route>
            <Route path={`${path}/logout`}>
              <div>Logging out...</div>
            </Route>
            <Route exact path={path}>
              <EditProfile /> {/* Default route for /profile */}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default SidebarMenu;
