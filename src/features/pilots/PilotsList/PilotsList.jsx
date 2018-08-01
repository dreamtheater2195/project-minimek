import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import PilotsListHeader from "./PilotsListHeader";
import PilotsListRow from "./PilotsListRow";
import { connect } from "react-redux";
import orm from "../../../schema";
import { selectPilot } from "../pilotsActions";
import { selectCurrentPilot } from "../pilotsSelectors";

class PilotsList extends Component {
    render() {
        const { pilotIDs = [], selectPilot, currentPilotID } = this.props;
        const pilotRows = pilotIDs.map(pilotID => (
            <PilotsListRow
                pilotID={pilotID}
                key={pilotID}
                onPilotClicked={selectPilot}
                selected={pilotID === currentPilotID}
            />
        ));

        return (
            <Table celled>
                <PilotsListHeader />
                <Table.Body>
                    {pilotRows}
                </Table.Body>
            </Table>
        )
    }
}

const mapStateToProps = (state) => {
    const session = orm.session(state.entities);
    const { Pilot } = session;

    // Extract a list of IDs for each Pilot entry
    const pilotIDs = Pilot.all().toModelArray().map(pilotModel => pilotModel.getId());

    const currentPilotID = selectCurrentPilot(state);

    // Return the list of pilot IDs and the current pilot ID as props
    return { pilotIDs, currentPilotID };
}

const actions = {
    selectPilot,
};

export default connect(mapStateToProps, actions)(PilotsList);