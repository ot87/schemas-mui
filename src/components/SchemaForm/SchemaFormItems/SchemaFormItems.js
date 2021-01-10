import React          from 'react';
import { FieldArray } from 'react-final-form-arrays';
import cn             from 'classnames';

import FormField from 'components/Common/FormField/FormField';

import { makeStyles } from '@material-ui/core/styles';
import Grid           from '@material-ui/core/Grid';
import useMediaQuery  from '@material-ui/core/useMediaQuery';
import red            from '@material-ui/core/colors/red';

const useStyles = makeStyles((theme) => ({
    row: {
        '&:hover': {
            backgroundColor: red[300],
            borderRadius: theme.shape.borderRadius,
            cursor: 'pointer'
        }
    },
    clicked: {
        backgroundColor: red[500],
        borderRadius: theme.shape.borderRadius
    }
}));

/**
 * Function with validation rule.
 * @callback ValidationFunction
 * @param {string} value - Value to validate.
 * @returns {boolean} - Indicates whether value is valid.
 */

/**
 * Renders Schema's items in the table-like style with the help of the [FieldArray]{@link https://github.com/final-form/react-final-form-arrays#fieldarray--reactcomponenttypefieldarrayprops} and [FormField]{@link FormField}.
 * @param {Object}             props
 * @param {function}           props.handleRemoveOnItemsRowClick - On item row click function.
 * @param {Object[]}           props.initItems          - Initial values of the schema's items.
 * @param {number}             props.initItems.id       - Initial item id.
 * @param {string}             props.initItems.name     - Initial item name.
 * @param {string}             props.initItems.quantity - Initial item quantity.
 * @param {string}             props.initItems.time     - Initial item time.
 * @param {boolean}            props.isRemoveClicked    - Indicates whether Remove button is clicked.
 * @param {number[]}           props.itemsIdsToRemove   - Array of items ids to remove from the form.
 * @param {ValidationFunction} props.onValidate         - Field validation function.
 */
const SchemaFormItems = ({
    handleRemoveOnItemsRowClick,
    initItems,
    isRemoveClicked,
    itemsIdsToRemove,
    onValidate
}) => {
    const classes = useStyles();
    const smScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const onRowClick = (id) => () => isRemoveClicked && handleRemoveOnItemsRowClick(id);

    return (
        <FieldArray
            name='items'
            initialValue={initItems}
            render={({ fields }) => fields.map((name, index) => (
                <Grid
                    className={cn({
                        [classes.row]: isRemoveClicked,
                        [classes.clicked]: isRemoveClicked && itemsIdsToRemove.indexOf(index) !== -1
                    })}
                    container item
                    justify='center'
                    key={index}
                    onClick={onRowClick(index)}
                    spacing={smScreen ? 1 : 2}
                    xs={11} sm={6} md={11}
                >
                    <Grid item xs={12} md={4}>
                        <FormField
                            disabled={isRemoveClicked}
                            label='Name'
                            name={`${name}.name`}
                            validate={onValidate}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormField
                            disabled={isRemoveClicked}
                            label='Quantity'
                            name={`${name}.quantity`}
                            validate={onValidate}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormField
                            disabled={isRemoveClicked}
                            label='Time'
                            name={`${name}.time`}
                        />
                    </Grid>
                </Grid>
            ))}
        />
    );
};

export default SchemaFormItems;
