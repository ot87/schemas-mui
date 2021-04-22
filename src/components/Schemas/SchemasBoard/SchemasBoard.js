import React from 'react';
import { useSelector } from 'react-redux';

import Schema                    from '../Schema/Schema';
import SchemasGrid               from '../SchemasGrid/SchemasGrid';
import AddSchemaForm             from '../AddSchemaForm/AddSchemaForm';
import EditSchemaForm            from '../EditSchemaForm/EditSchemaForm';
import CustomCardGridItem        from '../CustomCardGridItem/CustomCardGridItem';
import CustomCardButtonsGridItem from '../CustomCardButtonsGridItem/CustomCardButtonsGridItem';

import {
    UiModes,
    selectActiveSchemaId,
    selectMode
} from 'redux/reducers/ui';

/**
 * Component to display a list of all Schemas by [CustomCard]{@link CustomCard} or [CustomCardWithButtons]{@link CustomCardWithButtons} or a single selected [Schema]{@link Schema} or [SchemaForm]{@link SchemaForm}.
 * The displayed content depends on value of the activeSchemaId and mode parameters from the store.
 */
const SchemasBoard = () => {
    const activeSchemaId = useSelector(selectActiveSchemaId);
    const mode = useSelector(selectMode);

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
            const cardThemeColor = (
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
                            themeColor={cardThemeColor}
                            key={id}
                        />
                    )}
                />
            );
        }
    }

    return schemasBoard;
};

export default SchemasBoard;
