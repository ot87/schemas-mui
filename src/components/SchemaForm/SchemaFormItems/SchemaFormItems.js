import React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import cn from 'classnames';

import css from './SchemaFormItems.module.css';
import FormField from '../../Common/FormField/FormField';

import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
 * @param {ValidationFunction} props.onValidate         - Field validation function.
 * @param {boolean}            props.isRemoveClicked    - Indicates whether Remove button is clicked.
 * @param {number[]}           props.itemsIdsToRemove   - Array of items ids to remove from the form.
 * @param {function}           props.handleRemoveOnItemsRowClick - On item row click function.
 */
const SchemaFormItems = ({
    initItems,
    onValidate,
    isRemoveClicked,
    itemsIdsToRemove,
    handleRemoveOnItemsRowClick
}) => {
    const smScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <FieldArray
            name='items'
            initialValue={initItems}
            render={({ fields }) => fields.map((name, index) => {
                let rowCss = cn({
                    [css.itemsRow]: true,
                    [css.remove]: isRemoveClicked,
                    [css.clickedItemsRow]: isRemoveClicked && itemsIdsToRemove.indexOf(index) !== -1
                });

                return (
                    <Grid
                        key={index}
                        container item
                        xs={11} sm={6} md={11}
                        justify='center'
                        spacing={smScreen ? 1 : 2}
                    >
                    {/* <div
                        key={index}
                        role="row"
                        onClick={() => isRemoveClicked && handleRemoveOnItemsRowClick(index)}
                        className={rowCss}
                    > */}
                        <Grid item xs={12} md={4}>
                            <FormField
                                disabled={isRemoveClicked}
                                label='Name'
                                name={`${name}.name`}
                                type='text'
                                validate={onValidate}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormField
                                disabled={isRemoveClicked}
                                label='Quantity'
                                name={`${name}.quantity`}
                                type='text'
                                validate={onValidate}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormField
                                disabled={isRemoveClicked}
                                label='Time'
                                name={`${name}.time`}
                                type='text'
                            />
                        </Grid>
                    {/* </div> */}
                    </Grid>
                );
            })}
        />
    );
};

export default SchemaFormItems;
