import React       from 'react';
import { connect } from 'react-redux';

import Schema                    from '../Schema/Schema';
import SchemasGrid               from '../SchemasGrid/SchemasGrid';
import AddSchemaForm             from '../AddSchemaForm/AddSchemaForm';
import EditSchemaForm            from '../EditSchemaForm/EditSchemaForm';
import CustomCardGridItem        from '../CustomCardGridItem/CustomCardGridItem';
import CustomCardButtonsGridItem from '../CustomCardButtonsGridItem/CustomCardButtonsGridItem';

import { UiModes } from 'redux/reducers/ui';

/**
 * Component to display a list of all Schemas by [Card]{@link Card} or [CardWithButtons]{@link CardWithButtons} or a single selected [Schema]{@link Schema} or [SchemaFormContainer]{@link SchemaFormContainer}.
 * The displayed content depends on value of the activeSchemaId and mode parameters.
 * @param {Object}      props
 * @param {string|null} props.activeSchemaId - The id of the selected schema from the Redux State.
 * @param {string}      props.mode           - The current ui mode from the Redux State.
 */
const SchemasBoard = ({
    activeSchemaId,
    mode
}) => {
    const isAdd    = mode === UiModes.ADD;
    const isEdit   = mode === UiModes.EDIT;
    const isDelete = mode === UiModes.DELETE;

    let schemasBoard;

    if (activeSchemaId) {
        if (isEdit) {
            schemasBoard = <EditSchemaForm id={activeSchemaId} />;
        } else if (isDelete) {
            schemasBoard = (
                <SchemasGrid
                    render={id => (
                        <CustomCardButtonsGridItem
                            id={id}
                            isCardClicked={id === activeSchemaId}
                            key={id}
                        />
                    )}
                />
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
                <SchemasGrid
                    render={id => (
                        <CustomCardGridItem
                            id={id}
                            colorTheme={cardColorTheme}
                            key={id}
                        />
                    )}
                />
            );
        }
    }

    return schemasBoard;
};

export default connect(
    state => ({
        activeSchemaId: state.ui.activeSchemaId,
        mode: state.ui.mode
    })
)(SchemasBoard);
