import React, { Component } from "react";
import { Table } from "semantic-ui-react";

import MechsListHeader from "./MechsListHeader";
import MechsListRow from "./MechsListRow";

export default class MechsList extends Component {

    render() {
        const { mechs = [], onMechClicked, currentMech } = this.props;

        const mechRows = mechs.map(mech => (
            <MechsListRow
                mech={mech}
                key={mech.id}
                onMechClicked={onMechClicked}
                selected={currentMech === mech.id}
            />
        ));

        return (
            <Table celled>
                <MechsListHeader />
                <Table.Body>
                    {mechRows}
                </Table.Body>
            </Table>
        );
    }
}