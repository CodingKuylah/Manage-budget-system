import cron from "node-cron";
import { scheduleMonthlyEmail } from "../EmailController.js";

cron.schedule("0 8 28 * * ", () => {
  console.info("running monthly email scheduler");
  scheduleMonthlyEmail();
});
