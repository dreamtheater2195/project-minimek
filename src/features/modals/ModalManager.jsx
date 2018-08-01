import React, { Component } from 'react';
import { connect } from "react-redux";
import TestModal from "./TestModal";
import ColorPickerDialog from '../../common/components/ColorPicker/ColorPickerDialog';
const modalComponentLookupTable = {
    TestModal,
    ColorPickerDialog
};

export class ModalManager extends Component {
    render() {
        const { currentModals } = this.props;
        const renderModals = currentModals.map((modal, index) => {
            const { modalType, modalProps } = modal;
            const ModalComponent = modalComponentLookupTable[modalType];

            return <ModalComponent {...modalProps} key={modalType + index} />
        });
        return (
            <span>{renderModals}</span>
        )
    }
}

const mapStateToProps = (state) => ({ currentModals: state.modals });

export default connect(mapStateToProps)(ModalManager);