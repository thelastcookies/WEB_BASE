import type { AdminResponseBody } from "@/api/admin";
import type { TagsRequestBody, ValueResponseBody } from "@/api/base";

export const getRealtime = (tags: string) => {
  return usePost<AdminResponseBody<ValueResponseBody>, TagsRequestBody>(
    `${PERM_URL}/RealTime/GetReal`,
    { tags },
  );
};
