import React, { Component } from "react";
import { connect } from 'react-redux';
import {
    Grid,
    Segment,
    Header,
} from "semantic-ui-react";

import MechsList from "./MechsList";
import MechDetails from "./MechDetails";
import schema from '../../schema';
import { selectMech } from './mechActions';
import { selectCurrentMech } from './mechSelectors';

class Mechs extends Component {
    render() {
        const { mechs = [], currentMech, selectMech } = this.props;
        const currentMechEntry = mechs.find(mech => mech.id === currentMech);

        return (
            <Segment>
                <Grid>
                    <Grid.Column width={10}>
                        <Header as="h3">Mechs List</Header>
                        <MechsList
                            mechs={mechs}
                            currentMech={currentMech}
                            onMechClicked={selectMech}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Header as="h3">Mech Details</Header>
                        <Segment >
                            <MechDetails
                                mech={currentMechEntry}
                            />
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}

const mapStateToProps = (state) => {
    const session = schema.from(state.entities);
    const { Mech } = session;

    const mechs = Mech.all().withModels.map(mechModel => {
        const mech = {
            ...mechModel.ref,
            mechType: {}
        };

        if (mechModel.type) {
            mech.mechType = { ...mechModel.type.ref }
        }

        return mech;
    });

    const currentMech = selectCurrentMech(state);
    return { mechs, currentMech };
}

const mapDispatchToProps = {
    selectMech
}

export default connect(mapStateToProps, mapDispatchToProps)(Mechs);