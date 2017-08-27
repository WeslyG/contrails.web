// @flow
import moment from "moment";

import type { TraceInfo } from "./TraceInfo";
import type { IContrailsApi } from "./IContrailsApi";

export default class ContrailsApi implements IContrailsApi {
    async getTrace(id: string): Promise<TraceInfo[]> {
        const resp = await (await fetch(`/api/findTrace?traceId=${id}&out=vostok`)).json();
        const firstItem = resp[0].Spans[0];
        for (const item of resp[0].Spans) {
            const diffMs = moment(firstItem.BeginTimestamp).valueOf() - moment(item.BeginTimestamp).valueOf();
            if (Math.abs(diffMs) > 1000 * 60 * 60 * 2 - 1000 * 600) {
                item.BeginTimestamp = moment(
                    moment(item.BeginTimestamp).valueOf() + Math.sign(diffMs) * 1000 * 60 * 60 * 2
                ).format();
                item.EndTimestamp = moment(
                    moment(item.EndTimestamp).valueOf() + Math.sign(diffMs) * 1000 * 60 * 60 * 2
                ).format();
                item.TimeFixed = true;
            }
        }
        return resp;
    }
}
