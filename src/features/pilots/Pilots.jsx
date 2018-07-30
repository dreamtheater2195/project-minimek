import React, { Component } from "react";
import PilotsList from "./PilotsList";
import PilotDetails from "./PilotDetails";
import {
    Grid,
    Segment,
    Header
} from 'semantic-ui-react';


class Pilots extends Component {
    render() {
        return (
            <Segment>
                <Grid>
                    <Grid.Column width={10}>
                        <Header as="h3">Pilot List</Header>
                        <PilotsList />
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <Header as="h3">Pilot Details</Header>
                        <Segment>
                            <PilotDetails />
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

export default Pilots;