// @flow
import React from "react";
import glamorous from "glamorous";
import ReactDom from "react-dom";

import ProfilerChart from "./ProfilerChart";
import type { ProfilerData, ProfilerItem } from "./ProfilerChart";
import ProfilerChartContainer from "./ProfilerChartContainer";
import ProfilerChartMinimap from "./ProfilerChartMinimap";

type ProfilerChartWithMinimapProps<TItem> = {
    data: ProfilerData<TItem>,
    from: number,
    to: number,
    onCustomDrawItem?: (context: CanvasRenderingContext2D, item: TItem) => void,
};

type ProfilerChartWithMinimapState = {
    width: ?number,
    viewPortFrom: ?number,
    xScale: ?number,
};

export default class ProfilerChartWithMinimap<TItem: ProfilerItem> extends React.Component<
    *,
    ProfilerChartWithMinimapProps<TItem>,
    ProfilerChartWithMinimapState
> {
    props: ProfilerChartWithMinimapProps<TItem>;
    state: ProfilerChartWithMinimapState = {
        width: null,
        viewPortFrom: null,
        xScale: null,
    };
    container: ?React.Component<any, any, any>;

    componentDidUpdate() {
        this.updateWidth();
    }

    componentDidMount() {
        this.updateWidth();
    }

    updateWidth() {
        const container = ReactDom.findDOMNode(this.container);
        if (!(container instanceof HTMLElement)) {
            return;
        }
        const { width } = this.state;
        const newWidth = container.getBoundingClientRect().width;
        if (newWidth !== width) {
            const { viewPortFrom, xScale } = this.state;
            if (viewPortFrom == null && xScale == null) {
                const { from, to } = this.props;
                this.setState({
                    width: newWidth,
                    viewPortFrom: from,
                    xScale: newWidth / (to - from),
                });
            } else {
                this.setState({
                    width: newWidth,
                });
            }
        }
    }

    handleWheel = (event: SyntheticWheelEvent) => {
        const { width, xScale, viewPortFrom } = this.state;
        const { from: maxFrom, to: maxTo } = this.props;
        const container = ReactDom.findDOMNode(this.container);
        if (!(container instanceof HTMLElement)) {
            return;
        }

        if (width == null || xScale == null || viewPortFrom == null) {
            return;
        }
        const containerRect = container.getBoundingClientRect();
        const mouseX = event.clientX - containerRect.left;
        const percentage = 0.2;

        const from = viewPortFrom;
        const to = viewPortFrom + width / xScale;
        const xPosRelative = this.toRelative(mouseX);
        const newViewPortWidth = to - from + (to - from) * percentage * (event.deltaY / 100);

        let newFrom = xPosRelative - newViewPortWidth * (from - xPosRelative) / (from - to);
        let newTo = xPosRelative + newViewPortWidth * (xPosRelative - to) / (from - to);
        if (newFrom < maxFrom && newTo > maxTo) {
            newFrom = maxFrom;
            newTo = maxTo;
        } else if (newFrom < maxFrom) {
            newFrom = maxFrom;
            newTo = maxFrom + newViewPortWidth;
        } else if (newTo > maxTo) {
            newFrom = maxTo - newViewPortWidth;
            newTo = maxTo;
        }
        const newXScale = width / (newTo - newFrom);
        const maxScale = width / (maxTo - maxFrom);
        this.setState({
            viewPortFrom: Math.max(maxFrom, newFrom),
            xScale: Math.max(newXScale, maxScale),
        });
        event.preventDefault();
    };

    toRelative(value: number): number {
        const { viewPortFrom, xScale } = this.state;
        if (xScale == null) {
            throw new Error("InvalidStateError");
        }
        return viewPortFrom + value / xScale;
    }

    render(): React.Element<*> {
        const { data, from, to } = this.props;
        const { width, xScale, viewPortFrom } = this.state;
        return (
            <Container ref={x => (this.container = x)}>
                {width != null &&
                    viewPortFrom != null &&
                    xScale != null &&
                    <div>
                        <ProfilerChartMinimap
                            from={from}
                            to={to}
                            viewPort={{
                                from: viewPortFrom,
                                to: viewPortFrom + width / xScale,
                            }}
                            onChangeViewPort={x =>
                                this.setState({
                                    viewPortFrom: x.from,
                                    xScale: width / (x.to - x.from),
                                })}
                        />
                    </div>}
                {width != null &&
                    viewPortFrom != null &&
                    xScale != null &&
                    <ChartContainer onWheel={this.handleWheel}>
                        <div />
                        <div>
                            <ProfilerChartContainer
                                from={from}
                                to={to}
                                viewPort={{
                                    from: viewPortFrom,
                                    scale: xScale,
                                }}>
                                <ProfilerChart
                                    from={from}
                                    to={to}
                                    xScale={xScale}
                                    data={data}
                                    onCustomDrawItem={this.props.onCustomDrawItem}
                                />
                            </ProfilerChartContainer>
                        </div>
                    </ChartContainer>}
            </Container>
        );
    }
}

const Container = glamorous.div({
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    maxHeight: "100%",
});

const ChartContainer = glamorous.div({
    flexShrink: 1,
    flexGrow: 0,
    overflowY: "auto",
});
