import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Modal,
    Button,
} from "semantic-ui-react/dist/commonjs";
import { SketchPicker } from "react-color";
import { closeModal } from '../../../features/modals/modalActions';
import { colorSelected } from '../ColorPicker/colorPickerActions';

export class ColorPickerDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: props.color
        }
    }
    onSelectedColorChanged = (colorEvent) => {
        this.setState({ color: colorEvent.hex });

    }
    onSelectClicked = () => {
        this.props.colorSelected(this.state.color, this.props.onColorPicked);
        this.props.closeModal();
    }
    render() {
        const { closeModal } = this.props;
        const modalStyle = {
            marginTop: '0 !important',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
        return (
            <Modal
                closeIcon="close"
                open={true}
                onClose={closeModal}
                size="small"
                style={modalStyle}
            >
                <Modal.Header>Select Color</Modal.Header>
                <Modal.Content>
                    <SketchPicker
                        color={this.state.color}
                        onChangeComplete={this.onSelectedColorChanged}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={this.onSelectClicked}>Select</Button>
                    <Button secondary onClick={closeModal}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const actions = { closeModal, colorSelected };

ColorPickerDialog.defaultProps = {
    color: 'red'
}

export default connect(null, actions)(ColorPickerDialog);