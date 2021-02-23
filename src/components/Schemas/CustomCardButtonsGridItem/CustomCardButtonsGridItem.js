import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import CustomCardButtons from 'components/Common/CustomCard/CustomCardButtons';

import { selectSchemaById, deleteSchema } from 'redux/reducers/schemas';
import { setActiveSchemaId } from 'redux/reducers/ui';

/**
 * Component to select a specified schema from the store for [CustomCardButtons]{@link CustomCardButtons}.
 * @param {Object}  props
 * @param {string}  props.id              - Schema id
 * @param {boolean} [props.isCardClicked] - Indicates whether the CustomCardButtons is clicked.
 */
const CustomCardButtonsGridItem = ({
    id,
    isCardClicked = false
}) => {
    const schema   = useSelector(selectSchemaById(id));
    const dispatch = useDispatch();

    const onDeleteClick = id => () => dispatch(deleteSchema(id));
    const onCancelClick = () => dispatch(setActiveSchemaId(null));
    const onCardClick   = id => () => dispatch(setActiveSchemaId(id));

    return (
        <CustomCardButtons
            buttons={({
                first: {
                    onClick: onDeleteClick(schema.id),
                    text: 'Delete'
                },
                second: {
                    onClick: onCancelClick,
                    text: 'Cancel'
                }
            })}
            isCardClicked={isCardClicked}
            content={schema.items.map(item => <div key={item.id}>{item.name}</div>)}
            name={schema.name}
            onClick={onCardClick(schema.id)}
        />
    );
};

CustomCardButtonsGridItem.propTypes = {
    id:            PropTypes.string.isRequired,
    isCardClicked: PropTypes.bool
};

export default CustomCardButtonsGridItem;
