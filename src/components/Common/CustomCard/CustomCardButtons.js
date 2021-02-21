import React from 'react';
import PropTypes from 'prop-types';

import CustomCard   from './CustomCard';
import CustomButton from 'components/Common/CustomButton/CustomButton';

import Box from '@material-ui/core/Box';

/**
 * Callback for events handling.
 * @callback EventHandlerFunction
 */

/**
 * Functional component which wraps the [CustomCard]{@link CustomCard} element.
 * When it is clicked, CustomCardButtons passes into the [CustomCard]{@link CustomCard} two clickable [CustomButton]{@link CustomButton} as the content.
 * @param {Object}               props
 * @param {Object}               props.buttons                - Props of the CustomButton to display as the Card's content.
 * @param {Object}               props.buttons.first          - The first CustomButton's props.
 * @param {EventHandlerFunction} props.buttons.first.onClick  - On click function for the first CustomButton.
 * @param {string}               props.buttons.first.text     - Text to display on the first CustomButton.
 * @param {Object}               props.buttons.second         - The second CustomButton's props.
 * @param {EventHandlerFunction} props.buttons.second.onClick - On click function for the second CustomButton.
 * @param {string}               props.buttons.second.text    - Text to display on the second CustomButton.
 *
 * @param {boolean}              [props.isCardClicked] - If CustomCard is clicked, then CustomCard onClick will be nullified and two CustomButton will be displayed instead of the content prop.
 * @param {*}                    props.content         - Content of the CustomCard.
 * @param {string}               props.name            - Name of the CustomCard.
 * @param {EventHandlerFunction} [props.onClick]       - On click function for the CustomCard.
 */
const CustomCardButtons = ({
    buttons: { first, second },
    isCardClicked = false,
    content,
    name,
    onClick
}) => {
    if (isCardClicked) {
        onClick = null;
        content = (
            <Box display='flex' flexDirection='column'>
                <CustomButton
                    colorTheme='red'
                    onClick={first.onClick}
                    text={first.text}
                />
                <CustomButton
                    onClick={second.onClick}
                    text={second.text}
                />
            </Box>
        );
    }

    return (
        <CustomCard
            colorTheme='red'
            content={content}
            isClicked={isCardClicked}
            name={name}
            onClick={onClick}
        />
    );
};

CustomCardButtons.propTypes = {
    buttons: PropTypes.shape({
        first: PropTypes.shape({
            onClick: PropTypes.func.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired,
        second: PropTypes.shape({
            onClick: PropTypes.func.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired,
    }).isRequired,
    isCardClicked: PropTypes.bool,
    content:       PropTypes.any.isRequired,
    name:          PropTypes.string.isRequired,
    onClick:       PropTypes.func
};

export default CustomCardButtons;
