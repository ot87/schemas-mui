import React       from 'react';
import { connect } from 'react-redux';

import Schema                    from '../Schema/Schema';
import AddSchemaForm             from '../AddSchemaForm/AddSchemaForm';
import EditSchemaForm            from '../EditSchemaForm/EditSchemaForm';
import CustomCardGridItem        from '../CustomCardGridItem/CustomCardGridItem';
import CustomCardButtonsGridItem from '../CustomCardButtonsGridItem/CustomCardButtonsGridItem';

import { selectSchemas } from 'redux/reducers/schemas';
import { UiModes } from 'redux/reducers/ui';

import { makeStyles } from '@material-ui/core/styles';
import Box            from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    root: {
        rowGap: '3vh',
        [theme.breakpoints.down('sm')]: {
            rowGap: '2vh'
        },
        [theme.breakpoints.down('xs')]: {
            rowGap: '1vh'
        }
    }
}));

/**
 * Component to display a list of all Schemas by [Card]{@link Card} or [CardWithButtons]{@link CardWithButtons} or a single selected [Schema]{@link Schema} or [SchemaFormContainer]{@link SchemaFormContainer}.
 * The displayed content depends on value of the activeSchemaId and mode parameters.
 * @param {Object}               props
 * @param {Object[]}             props.schemas                - The data of the all schemas from the Redux State.
 * @param {string}               props.schemas.id             - Schema id.
 * @param {string}               props.schemas.name           - Schema name.
 * @param {string}               [props.schemas.description]  - Schema description.
 * @param {Object[]}             props.schemas.items          - Array of schema items.
 * @param {number}               props.schemas.items.id       - Schema item id.
 * @param {string}               props.schemas.items.name     - Schema item name.
 * @param {string}               props.schemas.items.quantity - Schema item quantity.
 * @param {string}               props.schemas.items.time     - Schema item time.
 *
 * @param {string|null}          props.activeSchemaId         - The id of the selected schema from the Redux State.
 * @param {string}               props.mode                   - The current ui mode from the Redux State.
 */
const SchemasBoard = ({
    schemas,
    activeSchemaId,
    mode
}) => {
    const classes = useStyles();
    const isAdd    = mode === UiModes.ADD;
    const isEdit   = mode === UiModes.EDIT;
    const isDelete = mode === UiModes.DELETE;

    let schemasBoard;

    if (activeSchemaId) {
        if (isEdit) {
            schemasBoard = <EditSchemaForm id={activeSchemaId} />;
        } else if (isDelete) {
            schemasBoard = (
                <Box
                    className={classes.root}
                    display='flex'
                    flexWrap='wrap'
                    justifyContent='space-evenly'
                >
                    {schemas.map(({ id }) => (
                        <CustomCardButtonsGridItem
                            id={id}
                            isCardClicked={id === activeSchemaId}
                            key={id}
                        />
                    ))}
                </Box>
            );
        } else {
            schemasBoard = <Schema id={activeSchemaId} />;
        }
    } else {
        if (isAdd) {
            schemasBoard = <AddSchemaForm />;
        } else {
            const cardColorTheme = (
                isEdit ?
                    'yellow'
                : isDelete ?
                    'red'
                : null
            );

            schemasBoard = (
                <Box
                    className={classes.root}
                    display='flex'
                    flexWrap='wrap'
                    justifyContent='space-evenly'
                >
                    {schemas.map(({ id }) => (
                        <CustomCardGridItem
                            id={id}
                            colorTheme={cardColorTheme}
                            key={id}
                        />
                    ))}
                </Box>
            );
        }
    }

    return schemasBoard;
};

export default connect(
    state => ({
        schemas: selectSchemas(state),
        activeSchemaId: state.ui.activeSchemaId,
        mode: state.ui.mode
    })
)(SchemasBoard);
