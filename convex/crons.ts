import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Run resetData every 24 hours
crons.interval(
  "reset data daily",
  { hours: 24 },
  internal.resetData.resetData,
  {},
);

export default crons;
