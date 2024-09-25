import { Link } from "@tanstack/react-router";
// import {
//   HiOutlineCalendarDays,
//   HiOutlineCog6Tooth,
//   HiOutlineHome,
//   HiOutlineHomeModern,
//   HiOutlineUsers,
// } from "react-icons/hi2";

import { Home, CalendarDays, Warehouse, Settings, Users } from "lucide-react";

export const MainNav = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <Link to="/dashboard" className="link">
            <Home />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/bookings" className="link">
            <CalendarDays />
            <span>Bookings</span>
          </Link>
        </li>
        <li>
          <Link to="/cabins" className="link">
            <Warehouse />
            <span>Cabins</span>
          </Link>
        </li>
        <li>
          <Link to="/users" className="link">
            <Users />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="link">
            <Settings />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
