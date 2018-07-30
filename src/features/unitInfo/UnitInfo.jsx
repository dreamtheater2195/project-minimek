import React, { Component } from "react";
import {
    Form,
    Dropdown,
    Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { selectUnitInfo } from "./unitInfoSelectors";

const FACTIONS = [
    { value: "cc", text: "Capellan Confederation" },
    { value: "dc", text: "Draconis Combine" },
    { value: "elh", text: "Eridani Light Horse" },
    { value: "fs", text: "Federated Suns" },
    { value: "fwl", text: "Free Worlds League" },
    { value: "hr", text: "Hansen's Roughriders" },
    { value: "lc", text: "Lyran Commonwealth" },
    { value: "wd", text: "Wolf's Dragoons" },
];

class UnitInfo extends Component {
    render() {
        const { unitInfo } = this.props;
        const { name, affiliation } = unitInfo;
        return (
            <Segment attached="bottom">
                <Form size="large">
                    <Form.Field name="name" width={6} >
                        <label>Unit Name</label>
                        <input placeholder="Name" value={name} />
                    </Form.Field>
                    <Form.Field name="affiliation" width={6}>
                        <label>Affiliation</label>
                        <Dropdown
                            selection
                            options={FACTIONS}
                            value={affiliation}
                        />
                    </Form.Field>
                </Form>
            </Segment>
        );
    }
}

const mapStateToProps = (state) => ({
    unitInfo: selectUnitInfo(state),
});


export default connect(mapStateToProps)(UnitInfo); 