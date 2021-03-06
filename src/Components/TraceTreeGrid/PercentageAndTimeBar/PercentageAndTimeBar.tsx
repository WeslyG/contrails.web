import * as React from "react";

import { DateTimeUtils } from "../../../Domain/DateTimeUtils";

import cn from "./PercentageAndTimeBar.less";

interface PercentageAndTimeBarProps {
    time: number;
    percentage: number;
    focused: boolean;
    faded?: boolean;
}

export function PercentageAndTimeBar({ time, percentage, focused, faded }: PercentageAndTimeBarProps): JSX.Element {
    return (
        <>
            <div
                className={cn("cell-bar-chart", { faded: Boolean(faded) })}
                style={{
                    width: Math.round((140 - 8) * percentage),
                }}
            />
            <span className={cn("cell-values", { focused: focused, faded: Boolean(faded) })}>
                <span className={cn("value")}>{DateTimeUtils.millisecondsToString(time, "0")}</span>
                <span className={cn("percentage")}>{Math.round(percentage * 1000) / 10}%</span>
            </span>
        </>
    );
}
