import { http, HttpResponse } from "msw";

import LAUNCHES_MOCK from "./launches.json";

export const handlers = [
  http.post(import.meta.env.VITE_API_BASE_URL + "/launches/query", async () => {
    return HttpResponse.json(LAUNCHES_MOCK);
  }),
];
