// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";

import TraceViewer from "../src/components/TraceViewer/TraceViewer";
import Response53ee602db8d444d9a7a674471be6b709 from "../src/Domain/Responses/53ee602db8d444d9a7a674471be6b709.json";

storiesOf("TraceViewer", module)
    .add("SingleSpan", () =>
        <TraceViewer
            traceInfo={{
                TraceId: "1",
                Spans: [
                    {
                        TraceId: "1",
                        SpanId: "1",
                        ParentSpanId: null,
                        OperationName: "HTTP",
                        BeginTimestamp: "2017-01-01T01:00:00.0000000+03:00",
                        EndTimestamp: "2017-01-01T01:01:00.0000000+03:00",
                        Annotations: {
                            OriginHost: "Host",
                            OriginId: "Id",
                        },
                    },
                ],
            }}
        />
    )
    .add("LostSpan", () =>
        <TraceViewer
            traceInfo={{
                TraceId: "1",
                Spans: [
                    {
                        TraceId: "1",
                        SpanId: "1",
                        ParentSpanId: null,
                        OperationName: "HTTP",
                        BeginTimestamp: "2017-01-01T01:00:00.0000000+03:00",
                        EndTimestamp: "2017-01-01T01:01:00.0000000+03:00",
                        Annotations: {
                            OriginHost: "Host",
                            OriginId: "Id",
                        },
                    },
                    {
                        TraceId: "1",
                        SpanId: "3",
                        ParentSpanId: "2",
                        OperationName: "HTTP",
                        BeginTimestamp: "2017-01-01T01:00:00.0000000+03:00",
                        EndTimestamp: "2017-01-01T01:01:00.0000000+03:00",
                        Annotations: {
                            OriginHost: "Host",
                            OriginId: "Id",
                        },
                    },
                ],
            }}
        />
    )
    .add("Default", () => <TraceViewer traceInfo={Response53ee602db8d444d9a7a674471be6b709[0]} />);
