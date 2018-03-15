// @flow
import _ from "lodash";
import type { AnnotationsFormat } from "./SpanBuildingUtils";
import type { TraceInfo } from "../../Domain/TraceInfo";
import { SpanInfoBuilder } from "./SpanBuildingUtils";

// 0. Длинные задержки сети
// 1. Очень длинный спан
// 2. Много спанов

export type ExampleTraceInfosMap = { [id: string]: TraceInfo };

export default function buildExamples(annotationsFormat: AnnotationsFormat): ExampleTraceInfosMap {
    const builder = new SpanInfoBuilder(annotationsFormat);
    return {
        "831a3146-d50f-4fe1-b91e-d37b3197670d": {
            TraceId: "831a3146-d50f-4fe1-b91e-d37b3197670d",
            Spans: builder.createSpan("Web.UI.FrontEnd", "vm-frn-01", 0, 900, false, [
                builder.createSpan("Web.UI.Services", "vm-frn-01", 0, 10, false, [
                    builder.createSpan("Abonents", "vm-host-hst-01", 0, 10, false, [
                        builder.createSpan("Zebra.TabletServer.Nonpaged", "zebra-hst-1", 0, 10, false, [
                            builder.createSpan("Zebra.TabletServer.Nonpaged", "zebra-hst-2", 1, 2, false),
                            builder.createSpan("Zebra.TabletServer.Nonpaged", "zebra-hst-2", 2, 3, false),
                            builder.createSpan("Zebra.TabletServer.Nonpaged", "zebra-hst-2", 4, 10, false),
                        ]),
                    ]),
                ]),
                builder.createSpan("Web.UI.Services", "vm-frn-01", 10, 15, false),
                builder.createSpan("Services", "vm-frn-01", 15, 21, false),
                builder.createSpan("Services", "vm-frn-01", 23, 50, false),
                builder.createSpan("Web.UI.Services", "", 52, 90, false),
                builder.createSpan("Web.UI.Services", "", 100, 900, false, [
                    builder.createSpan("LinkService.Name", "", 100, 110, false, [
                        builder.createSpan("LinkService.Name", "", 100, 110, false, [
                            builder.createSpan("LinkService.Name", "", 101, 102, false),
                            builder.createSpan("LinkService.Name", "", 102, 103, false),
                            builder.createSpan("LinkService.Name", "", 104, 110, false),
                        ]),
                    ]),
                    builder.createSpan("PartyService", "vm-host-01", 113, 900, false, [
                        builder.createSpan("PartyService", "vm-host-01", 113, 900, false, [
                            builder.createSpan("PartyService", "vm-host-01", 113, 900, false, [
                                builder.createSpan("UsersService", "vm-user-01", 113, 900, true, [
                                    builder.createSpan("IndexService", "vm-idx-01", 800, 801, false),
                                ]),
                            ]),
                        ]),
                    ]),
                ]),
            ]),
        },
        "8fce28c6-985b-4d51-b474-ca93032fafeb": {
            TraceId: "8fce28c6-985b-4d51-b474-ca93032fafeb",
            Spans: builder.createSpan("Web.UI.FrontEnd", "", 0, 1200, false, [
                builder.createSpanR("Web.UI.FrontEnd", "", 0, 20, false, [
                    builder.createSpan("Web.UI.FrontEnd", "", 0, 12, false),
                    builder.createSpanR("PartyService", "", 12, 16, false, [
                        builder.createSpanR("PartyService", "", 0, 4, false, [
                            builder.createSpanR("IndexService", "", 1, 3, false, [
                                builder.createSpanR("Zebra.Nonpaged", "", 1, 2, false, []),
                                builder.createSpanR("Zebra.Nonpaged", "", 0, 1, false, [
                                    builder.createSpanR("Zebra.Nonpaged", "", 0, 1, false, [builder.createSpanR("", "", 0, 1, false)]),
                                ]),
                            ]),
                        ]),
                    ]),
                    builder.createSpan("UsersService", "", 18, 20, false),
                ]),
                builder.createSpanR2("Web.UI.FrontEnd", "vm-frn-01", 20, 900, false, [
                    builder.createSpanR2("UsersService", "vm-services-21", 0, 0, false, [
                        builder.createSpanR2("UsersService", "vm-services-11", 0, -10, false, [
                            builder.createSpanR2("PartyService", "vm-services-21", 0, -865, false),
                            builder.createSpanR2("PartyService", "vm-services-04", 20, -10, false, [
                                builder.createSpanR2("IndexService", "vm-index-01", 0, -10, false, []),
                            ]),
                        ]),
                    ]),
                ]),
                builder.createSpan("Billy.LinkService", "", 900, 920, false),
                builder.createSpan("Billy.LinkService", "", 930, 1200, false),
            ]),
        },
        "84cbafbc-40b3-49b9-ac4e-28fab6099c58": {
            TraceId: "84cbafbc-40b3-49b9-ac4e-28fab6099c58",
            Spans: builder.createSpan("Web.UI.FrontEnd", "", 0, 1200, false, [
                builder.createSpanR("Web.UI.FrontEnd", "", 0, 20, false, [
                    builder.createSpan("UsersService", "", 0, 12, false),
                    builder.createSpanR("PartyService", "", 12, 16, false, [
                        builder.createSpanR("Billy.Payments", "", 0, 4, false, [
                            builder.createSpanR("Billy.Payments", "", 1, 3, false, [
                                builder.createSpanR("Billy.IndexService", "", 1, 2, false, []),
                                builder.createSpanR("Billy.Payments", "", 0, 1, false, [
                                    builder.createSpanR("", "", 0, 1, false, [builder.createSpanR("", "", 0, 1, false)]),
                                ]),
                            ]),
                        ]),
                    ]),
                    builder.createSpan("UsersService", "vm-frn-01", 18, 20, false),
                ]),
                builder.createSpanR("Web.UI.FrontEnd", "vm-frn-01", 20, 900, false, [
                    builder.createSpanR("PartyService", "vm-cmn-services-01", 0, 880, false, [
                        builder.createSpanR("PartyService", "vm-cmn-services-01", 10, 870, false, [
                            builder.createSpanR("PartyService", "vm-cmn-services-01", 3, 10, false),
                            builder.createSpanR(
                                "UsersService",
                                "vm-cmn-services-01",
                                20,
                                850,
                                false,
                                _.range(0, 300).map(x =>
                                    builder.createSpan("Billy.Payments", "vm-host-01", x * 2.1, x * 2.1 + 2, false, [])
                                )
                            ),
                        ]),
                    ]),
                ]),
                builder.createSpan("WebUI.FrontEnd", "vm-frn-03", 900, 920, false),
                builder.createSpan("WebUI.FrontEnd", "vm-frn-03", 930, 1200, false),
            ]),
        },
    };
}
