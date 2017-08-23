// @flow
import moment from "moment";
import { expect } from "chai";

import SpansToLines from "../src/Domain/SpansToLines";

describe("SpansToLines.arrange", () => {
    it("должен располагать элементы друг под другом", () => {
        const arranger = new SpansToLines();
        const spans = [
            {
                BeginTimestamp: moment("2013-02-08 12:00:00.000").format(),
                EndTimestamp: moment("2013-02-08 12:10:00.000").format(),
                TraceId: "1",
                SpanId: "1",
                OperationName: "Name",
                Annotations: null,
            },
            {
                BeginTimestamp: moment("2013-02-08 12:00:00.000").format(),
                EndTimestamp: moment("2013-02-08 12:10:00.000").format(),
                TraceId: "1",
                SpanId: "2",
                ParentSpanId: "1",
                OperationName: "Name",
                Annotations: null,
            },
        ];
        const spansByLines = arranger.arrange(spans);
        expect(spansByLines[0].items[0].SpanId).to.eql(spans[0].SpanId);
        expect(spansByLines[1].items[0].SpanId).to.eql(spans[1].SpanId);
    });
});