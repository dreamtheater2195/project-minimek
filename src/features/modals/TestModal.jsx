import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Modal,
    Button
} from "semantic-ui-react";
import { closeModal, openModal } from "./modalActions";

export class TestModal extends Component {
    onNextModalClick = () => {
        const { counter, openModal } = this.props;
        openModal("TestModal", { counter: counter + 1 });
    }
    render() {
        const { closeModal, counter } = this.props;
        return (
            <Modal
                closeIcon="close"
                open={true}
                onClose={closeModal}
            >
                <Modal.Header>Modal #{counter}</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <p>This is a modal dialog.  Pretty neat, huh?</p>
                        <h4>
                            Value from props:
                        </h4>
                        <div>
                            counter = {counter}
                        </div>
                        <div>
                            <Button onClick={this.onNextModalClick}>Add Another Modal</Button>
                        </div>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                </Modal.Actions>
            </Modal >
        )
    }
}
const actions = { closeModal, openModal };

export default connect(null, actions)(TestModal); 