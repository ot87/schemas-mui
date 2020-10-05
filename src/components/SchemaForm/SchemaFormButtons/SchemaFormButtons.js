import React from 'react';

import css from './SchemaFormButtons.module.css';
import Plate from '../../Common/Plate/Plate';

/**
 * Callback for events handling.
 * @callback EventHandlerFunction
 */

/**
 * Renders [Plates]{@link Plate} as form buttons.
 * @param {Object}               props
 * @param {Object}               props.submit            - Props for the Submit Plate.
 * @param {boolean}              props.submit.isDisabled - Indicates whether Plate is disabled.
 * @param {EventHandlerFunction} props.submit.onClick    - On click function for Submit Plate.
 * @param {Object}               props.reset             - Props for the Reset Plate.
 * @param {boolean}              props.reset.isDisabled  - Indicates whether Plate is disabled.
 * @param {EventHandlerFunction} props.reset.onClick     - On click function for Reset Plate.
 * @param {Object}               props.cancel            - Props for the Cancel Plate.
 * @param {boolean}              props.cancel.isDisabled - Indicates whether Plate is disabled.
 * @param {EventHandlerFunction} props.cancel.onClick    - On click function for Cancel Plate.
 */
const SchemaFormButtons = ({ submit, reset, cancel }) => (
    <div className={css.schemaButtons}>
        <Plate
            text='Submit'
            colorTheme='green'
            isDisabled={submit.isDisabled}
            onClick={submit.onClick}
        />
        <Plate
            text='Reset'
            colorTheme='gold'
            isDisabled={reset.isDisabled}
            onClick={reset.onClick}
        />
        <Plate
            text='Cancel'
            colorTheme='red'
            isDisabled={cancel.isDisabled}
            onClick={cancel.onClick}
        />
    </div>
);

export default SchemaFormButtons;