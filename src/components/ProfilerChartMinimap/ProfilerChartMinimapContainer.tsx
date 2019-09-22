import memoizee from "memoizee";
import { connect } from "react-redux";

import { strictDefined } from "../../Commons/StrictDefined";
import { Colors as itemColors } from "../../Domain/Colors";
import { SpanLineItem } from "../../Domain/SpanLines/SpansToLinesArranger";
import { TimeRange } from "../../Domain/TimeRange";
import { ActionType } from "../../Store/ContrailsApplicationActions";
import { ContrailsApplicationState } from "../../Store/ContrailsApplicationState";
import { ContrailsDispatch } from "../../Store/ContrailsDispatch";
import { ProfilerData } from "../ProfilerChart/Internal/ProfilerChartDrawer";

import { MinimapChartData, ProfilerChartMinimap } from "./ProfilerChartMinimap";

function getMinimapItemColor(item: SpanLineItem): undefined | string {
    return itemColors[item.source.colorConfig].background;
}

function buildMinimapChartData(
    data: ProfilerData<SpanLineItem>,
    onGetMinimapColor?: (item: SpanLineItem) => undefined | string
): MinimapChartData {
    return {
        lines: data.lines.map(line => ({
            items: line.items.map(item => ({
                from: item.from,
                to: item.to,
                color: onGetMinimapColor != undefined ? onGetMinimapColor(item) : undefined,
            })),
        })),
    };
}

const buildMinimapChartDataMemoized = memoizee(buildMinimapChartData);

const mapProps = (state: ContrailsApplicationState) => ({
    timeRange: strictDefined(state.timeRange),
    viewPort: strictDefined(state.viewPort),
    data: buildMinimapChartDataMemoized(strictDefined(state.spanLines), getMinimapItemColor),
});

const mapDispatch = (dispatch: ContrailsDispatch) => ({
    onChangeViewPort: (viewPort: TimeRange) =>
        dispatch({ type: ActionType.ChangeViewPort, payload: { viewPort: viewPort } }),
});

export const ProfilerChartMinimapContainer = connect(
    mapProps,
    mapDispatch
)(ProfilerChartMinimap);