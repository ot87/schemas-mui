import React from 'react';

import CustomCard from './CustomCard';
import CustomButton from '../CustomButton/CustomButton';

import Box from '@material-ui/core/Box';

/**
 * Callback for events handling.
 * @callback EventHandlerFunction
 */

/**
 * Functional component which wraps the [CustomCard]{@link CustomCard} element. When it is clicked, CustomCardWithButtons passes into the [CustomCard]{@link CustomCard} two clickable [CustomButton]{@link CustomButton} as the content.
 * @param {Object}               props
 * @param {Object}               props.buttons                - Props of the CustomButton to display as the Card's content.
 * @param {Object}               props.buttons.first          - The first CustomButton's props.
 * @param {EventHandlerFunction} props.buttons.first.onClick  - On click function for the first CustomButton.
 * @param {string}               props.buttons.first.text     - Text to display on the first CustomButton.
 * @param {Object}               props.buttons.second         - The second CustomButton's props.
 * @param {EventHandlerFunction} props.buttons.second.onClick - On click function for the second CustomButton.
 * @param {string}               props.buttons.second.text    - Text to display on the second CustomButton.
 *
 * @param {boolean}              props.cardIsClicked - If CustomCard is clicked, then CustomCard onClick will be nullified and two CustomButton will be displayed instead of the content prop.
 * @param {*}                    props.content       - Content of the CustomCard.
 * @param {string}               props.name          - Name of the CustomCard.
 * @param {EventHandlerFunction} props.onClick       - On click function for the CustomCard.
 */
const CustomCardWithButtons = ({
    buttons: { first, second },
    cardIsClicked,
    content,
    name,
    onClick
}) => {
    if (cardIsClicked) {
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
            isClicked={cardIsClicked}
            name={name}
            onClick={onClick}
        />
    );
};

export default CustomCardWithButtons;