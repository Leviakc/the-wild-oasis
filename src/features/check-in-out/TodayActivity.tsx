import { Loader } from "@/components/Loader";
import { Row } from "@/components/Row";
import { Heading } from "@/components/Heading";
import TodayItem from "./TodayItem";
import { useTodayActivity } from "./useTodayActivity";

export function TodayActivity() {
  const { activities = [], isLoading } = useTodayActivity();
  console.log(activities);

  return (
    <div className="col-[1_/_span_2] flex flex-col gap-6 border border-solid border-gray-100 bg-white p-2 pt-6 dark:border-gray-800 dark:bg-[#18212f]">
      <Row type="horizontal">
        <Heading variant="h2">Today</Heading>
      </Row>

      {!isLoading ? (
        activities?.length > 0 ? (
          <ul className="todayList">
            {activities?.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-center text-lg font-medium">
            No activity today...
          </p>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
}
