import React from 'react';

import css from './SchemaFormItemsControls.module.css';
import Plate from '../../Common/Plate/Plate';

/**
 * Callback for events handling.
 * @callback EventHandlerFunction
 */

/**
 * Renders [Plates]{@link {Plate}} to add new or remove existing items rows during work with [SchemaFormContainer]{@link SchemaFormContainer}.
 * @param {Object}               props
 * @param {boolean}              props.isRemoveClicked    - Indicates whether Remove Plate is clicked.
 * @param {boolean}              props.showRemove         - If true, show Remove and All Plates.
 * @param {boolean}              props.isRemoveAllClicked - Indicates whether All Plate is clicked.
 * @param {EventHandlerFunction} props.addOnClick         - On click function for Add Plate.
 * @param {EventHandlerFunction} props.removeOnClick      - On click function for Remove Plate.
 * @param {EventHandlerFunction} props.removeAllOnClick   - On click function for All Plate.
 */
const SchemaFormItemsControls = ({
    isRemoveClicked,
    showRemove,
    isRemoveAllClicked,
    addOnClick,
    removeOnClick,
    removeAllOnClick
}) => (
    <div className={css.schemaFormItemsControls}>
        <Plate
            text='Add'
            colorTheme='green'
            isDisabled={isRemoveClicked}
            onClick={addOnClick}
        />
        {showRemove ?
            <Plate
                text='Remove'
                colorTheme='red'
                isToggled={isRemoveClicked}
                onClick={removeOnClick}
            />
        : null}
        {isRemoveClicked ?
            <Plate
                text='All'
                colorTheme='red'
                isToggled={isRemoveAllClicked}
                onClick={removeAllOnClick}
            />
        : null}
    </div>
);

export default SchemaFormItemsControls;