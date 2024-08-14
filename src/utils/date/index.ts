import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import duration from 'dayjs/plugin/duration';

dayjs.locale("zh-cn");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);
dayjs.extend(duration);

dayjs.tz.setDefault("Asia/Shanghai");

export { dayjs };
