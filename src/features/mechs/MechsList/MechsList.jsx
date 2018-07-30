import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { connect } from 'react-redux';
import MechsListHeader from "./MechsListHeader";
import MechsListRow from "./MechsListRow";
import schema from '../../../schema';
import { selectMech } from '../mechActions';
import { selectCurrentMech } from '../mechSelectors';

class MechsList extends Component {

    render() {
        const { mechIDs = [], selectMech, currentMechID } = this.props;

        const mechRows = mechIDs.map(mechID => (
            <MechsListRow
                mechID={mechID}
                key={mechID}
                onMechClicked={selectMech}
                selected={currentMechID === mechID}
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

const mapStateToProps = (state) => {
    const session = schema.from(state.entities);
    const { Mech } = session;

    const mechIDs = Mech.all().withModels.map(mechModel => mechModel.getId());

    const currentMechID = selectCurrentMech(state);

    return { mechIDs, currentMechID };
}

const mapDispatchToProps = {
    selectMech
}

export default connect(mapStateToProps, mapDispatchToProps)(MechsList);