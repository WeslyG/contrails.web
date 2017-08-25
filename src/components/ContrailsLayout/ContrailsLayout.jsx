// @flow
import * as React from "react";
import { Button, Input, Icon } from "ui";

import cn from "./ContrailsLayout.less";

type ContrailsLayoutProps = {
    children: React.Node,
};

type ContrailsLayoutState = {};

export default class ContrailsLayout extends React.Component<ContrailsLayoutProps, ContrailsLayoutState> {
    props: ContrailsLayoutProps;
    state: ContrailsLayoutState;

    render(): React.Element<*> {
        const { children } = this.props;
        return (
            <div className={cn("container")}>
                <div className={cn("header")}>
                    <div className={cn("logo")}>
                        <div className={cn("logo-icon")}>
                            <Icon name="OwnershipBoat" />
                        </div>
                        <div className={cn("logo-text")}>Contrails</div>
                    </div>
                    <div className={cn("trace-id-container")}>
                        <Input placeholder="Введите TraceId" autoFocus width={500} />
                        <div className={cn("gap")} />
                        <Button use="success">Открыть</Button>
                    </div>
                </div>
                <div className={cn("content")}>
                    {children}
                </div>
            </div>
        );
    }
}
