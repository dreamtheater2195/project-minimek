import React, { Component } from "react";
import { Form, Dropdown, Grid, Button } from "semantic-ui-react";
import { connect } from 'react-redux';
import schema from '../../../schema';
import { selectCurrentPilot, selectIsEditingPilot } from '../pilotsSelectors';
import { startEditingPilot, stopEditingPilot } from '../pilotsActions';
import { updateEntity } from '../../entities/entityActions';
import { getValueFromEvent } from '../../../common/utils/clientUtils';
import FormEditWrapper from '../../../common/components/FormEditWrapper';
const RANKS = [
    { value: "Private", text: "Private" },
    { value: "Corporal", text: "Corporal" },
    { value: "Sergeant", text: "Sergeant" },
    { value: "Lieutenant", text: "Lieutenant" },
    { value: "Captain", text: "Captain" },
    { value: "Major", text: "Major" },
    { value: "Colonel", text: "Colonel" },
];

const SKILL_VALUES = [
    { value: 0, text: 0 },
    { value: 1, text: 1 },
    { value: 2, text: 2 },
    { value: 3, text: 3 },
    { value: 4, text: 4 },
    { value: 5, text: 5 },
    { value: 6, text: 6 },
    { value: 7, text: 7 },
    { value: 8, text: 8 },
]

const MECHS = [
    { value: "WHM-6R", text: "Warhammer WHM-6R" }
];
export class PilotDetails extends Component {

    onInputChanged = (event) => {
        const newValues = getValueFromEvent(event);
        const { id } = this.props.pilot;
        this.props.updateEntity("Pilot", id, newValues);
    }

    onDropdownChanged = (e, result) => {
        const { name, value } = result;
        const newValues = { [name]: value };
        const { id } = this.props.pilot;
        this.props.updateEntity("Pilot", id, newValues);
    }
    render() {

        const { pilot = {}, pilotIsSelected = false, isEditingPilot = false, ...actions } = this.props;
        const {
            name = "",
            rank = "",
            age = "",
            gunnery = "",
            piloting = "",
            mechType = "",
        } = pilot;

        const canStartEditing = pilotIsSelected && !isEditingPilot;
        const canStopEditing = pilotIsSelected && isEditingPilot;
        return (
            <Form size="large">
                <FormEditWrapper
                    singleValue={true}
                    value={{ name }}
                    onChange={this.onInputChanged}
                    passIsEditing={false}
                >
                    <Form.Field
                        name="name"
                        width={16}
                        label="Name"
                        placeholder="Name"
                        value={name}
                        disabled={!canStopEditing}
                        control="input"
                    />
                </FormEditWrapper>
                <Form.Field
                    name="rank"
                    width={16}
                    label="Rank"
                    control={Dropdown}
                    fluid
                    selection
                    options={RANKS}
                    value={rank}
                    disabled={!canStopEditing}
                    onChange={this.onDropdownChanged}
                />
                <FormEditWrapper
                    singleValue={true}
                    value={{ age }}
                    onChange={this.onInputChanged}
                    passIsEditing={false}
                >
                    <Form.Field
                        name="age"
                        width={6}
                        label="Age"
                        placeholder="Age"
                        value={age}
                        disabled={!canStopEditing}
                        control="input"
                    />
                </FormEditWrapper>
                <Form.Field
                    name="gunnery"
                    width={6}
                    label="Gunnery"
                    control={Dropdown}
                    fluid
                    selection
                    options={SKILL_VALUES}
                    value={gunnery}
                    disabled={!canStopEditing}
                    onChange={this.onDropdownChanged}
                />
                <Form.Field
                    name="piloting"
                    width={6}
                    label="Piloting"
                    control={Dropdown}
                    fluid
                    selection
                    options={SKILL_VALUES}
                    value={piloting}
                    disabled={!canStopEditing}
                    onChange={this.onDropdownChanged}
                />
                <Form.Field
                    name="mech"
                    width={16}
                    label="Mech"
                    control={Dropdown}
                    fluid
                    selection
                    options={MECHS}
                    value={mechType}
                    disabled={true}
                />
                <Grid.Row width={16}>
                    <Button
                        primary
                        disabled={!canStartEditing}
                        type="button"
                        onClick={actions.startEditingPilot}
                    >
                        Start Editing
                </Button>
                    <Button
                        secondary
                        disabled={!canStopEditing}
                        type="button"
                        onClick={actions.stopEditingPilot}
                    >
                        Stop Editing
                </Button>
                </Grid.Row>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    let pilot;
    const currentPilotId = selectCurrentPilot(state);
    const session = schema.from(state.entities);
    const { Pilot } = session;
    if (Pilot.hasId(currentPilotId)) {
        pilot = Pilot.withId(currentPilotId).ref;
    }
    const pilotIsSelected = Boolean(currentPilotId);
    const isEditingPilot = selectIsEditingPilot(state);

    return { pilot, pilotIsSelected, isEditingPilot };
}

const actions = {
    startEditingPilot,
    stopEditingPilot,
    updateEntity
}
export default connect(mapStateToProps, actions)(PilotDetails);