import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import CustomCard from 'components/Common/CustomCard';

import { selectSchemaById }  from 'redux/reducers/schemas';
import { setActiveSchemaId } from 'redux/reducers/ui';

/**
 * Component to select a specified schema from the store for [CustomCard]{@link CustomCard}.
 * @param {Object}         props
 * @param {string}         props.id           - Schema id
 * @param {'yellow'|'red'} [props.colorTheme] - Color theme of the CustomCard.
 */
const CustomCardGridItem = ({ id, colorTheme = null }) => {
    const schema   = useSelector(selectSchemaById(id));
    const dispatch = useDispatch();

    const onClick = id => () => dispatch(setActiveSchemaId(id));

    return (
        <CustomCard
            colorTheme={colorTheme}
            content={schema.items.map(item => <div key={item.id}>{item.name}</div>)}
            name={schema.name}
            onClick={onClick(schema.id)}
        />
    );
};

CustomCardGridItem.propTypes = {
    id:         PropTypes.string.isRequired,
    colorTheme: PropTypes.oneOf(['yellow', 'red'])
};

export default CustomCardGridItem;
