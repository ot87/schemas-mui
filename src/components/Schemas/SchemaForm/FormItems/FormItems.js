import React          from 'react';
import { FieldArray } from 'react-final-form-arrays';

import FormItemsRow from './FormItemsRow/FormItemsRow';

/**
 * Function with validation rule.
 * @callback ValidationFunction
 * @param {string} value - Value to validate.
 * @returns {boolean} - Indicates whether value is valid.
 */

/**
 * Renders Schema's items in the table-like style with the help of the [FieldArray]{@link https://github.com/final-form/react-final-form-arrays#fieldarray--reactcomponenttypefieldarrayprops} and [FormField]{@link FormField}.
 * @param {Object}             props
 * @param {Object[]}           props.initItems          - Initial values of the schema's items.
 * @param {number}             props.initItems.id       - Initial item id.
 * @param {string}             props.initItems.name     - Initial item name.
 * @param {string}             props.initItems.quantity - Initial item quantity.
 * @param {string}             props.initItems.time     - Initial item time.
 * @param {boolean}            props.isRemoveClicked    - Indicates whether Remove button is clicked.
 * @param {number[]}           props.itemsIdsToRemove   - Array of items ids to remove from the form.
 * @param {function}           props.onItemsRowClick    - On item row click function.
 * @param {ValidationFunction} props.onValidate         - Field validation function.
 */
const FormItems = ({
    initItems,
    isRemoveClicked,
    itemsIdsToRemove,
    onItemsRowClick,
    onValidate
}) => {
    const onRowClick = id => () => onItemsRowClick(id);

    return (
        <FieldArray
            name='items'
            initialValue={initItems}
            render={({ fields }) => fields.map((name, index) => (
                <FormItemsRow
                    key={index}
                    isClicked={itemsIdsToRemove.indexOf(index) !== -1}
                    isDisabled={isRemoveClicked}
                    name={name}
                    onRowClick={onRowClick(index)}
                    onValidate={onValidate}
                />
            ))}
        />
    );
};

export default FormItems;
