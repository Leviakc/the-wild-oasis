import { createLazyFileRoute, getRouteApi } from "@tanstack/react-router";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DashboardLayout } from "@/features/dashboard/DashboardLayout";
import { Row } from "@/components/Row";
import { Heading } from "@/components/Heading";
import { Loader } from "@/components/Loader";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_auth/_layout/dashboard/")({
  component: Dashboard,
  pendingComponent: Loader,
});

type DashboardSearch = 7 | 30 | 90 | undefined;

const routeApi = getRouteApi("/_auth/_layout/dashboard/");

function Dashboard() {
  const { last = "" } = routeApi.useSearch();
  const [daysStayed, setDaysStaye] = useState(String(last) || "7");
  const navigate = useNavigate();

  return (
    <>
      <Row variant={"horizontal"} className="mb-6">
        <Heading>Dashboard</Heading>
        <Select
          value={daysStayed}
          onValueChange={(value) => {
            navigate({
              to: ".",
              replace: true,
              search: {
                last: Number(value) as DashboardSearch,
              },
            });
            setDaysStaye(value);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Last 7 days" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Dates</SelectLabel>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Row>

      <DashboardLayout />
    </>
  );
}
