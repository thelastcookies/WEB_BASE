import type { TagsRequestBody } from "@/api/base";
import type { Dayjs } from "dayjs";
import type { HisDataType } from "@/enums";

export interface HistoricalRequestBody extends TagsRequestBody {
  time: string;
}

export interface IntervalRequestBody extends HistoricalRequestBody {
  interval: number;
}

export interface HisTagParams {
  tags: string,
  st: Dayjs,
  ed?: Dayjs,
  interval?: number,
  type?: HisDataType,
  decimal?: number
}
