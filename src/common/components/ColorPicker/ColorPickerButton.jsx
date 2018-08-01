import React from "react";
import { Button } from "semantic-ui-react";

const ColorPickerButton = ({ value, onClick, disabled = false }) => {
    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            type="button"
            style={{ padding: "4px", margin: 0 }}
        >
            <div
                style={{
                    width: 30,
                    height: 15,
                    backgroundColor: value
                }}
            />
        </Button>
    )
}

export default ColorPickerButton;