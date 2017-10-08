// @flow
/* eslint-disable import/prefer-default-export */
import moment from "moment";

import type { TraceInfo } from "./TraceInfo";
import type { IContrailsApi } from "./IContrailsApi";

export class ContrailsApi implements IContrailsApi {
    async getTrace(id: string): Promise<TraceInfo[]> {
        const response = await fetch(`/api/findTrace?traceId=${id}&out=vostok`);
        if (response.status !== 200) {
            throw new Error("500");
        }
        const resp = await response.json();
        if (resp.length === 0) {
            return resp;
        }
        const firstItem = resp[0].Spans[0];
        for (const item of resp[0].Spans) {
            const diffMs = moment(firstItem.BeginTimestamp).valueOf() - moment(item.BeginTimestamp).valueOf();
            if (Math.abs(diffMs) > 1000 * 60 * 60 * 2 - 1000 * 600) {
                item.BeginTimestamp = moment(
                    moment(item.BeginTimestamp).valueOf() + Math.sign(diffMs) * 1000 * 60 * 60 * 2
                ).format("YYYY-MM-DDTHH:mm:ss.SSSSSSSZ");
                item.EndTimestamp = moment(
                    moment(item.EndTimestamp).valueOf() + Math.sign(diffMs) * 1000 * 60 * 60 * 2
                ).format("YYYY-MM-DDTHH:mm:ss.SSSSSZ");
                item.TimeFixed = true;
            }
        }
        return resp;
    }
}
