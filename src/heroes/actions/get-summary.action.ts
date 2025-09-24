import { heroApi } from "../api/hero.api"
import type { SummaryInfoResponse } from "../types/summary-info.response";

export const getSummaryAction = async () => {
    const { data } = await heroApi.get<SummaryInfoResponse>("/summary");
    return data;
}