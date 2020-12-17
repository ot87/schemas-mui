import React from 'react';

import Card from './Card';
import Plate from '../Plate/Plate';

/**
 * Callback for events handling.
 * @callback EventHandlerFunction
 */

/**
 * Functional component which wraps the [Card]{@link Card} element. When it is clicked, CardWithButtons passes into the [Card]{@link Card} two clickable [Plates]{@link Plate} as the content.
 * @param {Object}               props
 * @param {string}               props.name          - Name of the Card.
 * @param {*}                    props.content       - Content of the Card.
 * @param {'gold'|'red'}         [props.colorTheme]  - Color theme of the Card.
 * @param {boolean}              props.cardIsClicked - If Card is clicked, then Card onClick will be nullified and two Plates will be displayed instead of the content prop.
 * @param {EventHandlerFunction} props.onClick       - On click function for the Card.
 *
 * @param {Object}               props.buttons                - Props of the Plates to display as the Card's content.
 * @param {Object}               props.buttons.first          - The first Plate's props.
 * @param {string}               props.buttons.first.text     - Text to display on the first Plate.
 * @param {EventHandlerFunction} props.buttons.first.onClick  - On click function for the first Plate.
 * @param {Object}               props.buttons.second         - The second Plate's props.
 * @param {string}               props.buttons.second.text    - Text to display on the second Plate.
 * @param {EventHandlerFunction} props.buttons.second.onClick - On click function for the second Plate.
 */
const CardWithButtons = ({
    name,
    content,
    colorTheme,
    cardIsClicked,
    onClick,
    buttons: { first, second }
}) => {
    if (cardIsClicked) {
        onClick = null;
        content = <>
            <Plate
                text={first.text}
                onClick={first.onClick}
            />
            <Plate
                text={second.text}
                onClick={second.onClick}
            />
        </>;
    }

    return (
        <Card
            name={name}
            content={content}
            colorTheme={colorTheme}
            isClicked={cardIsClicked}
            onClick={onClick}
        />
    );
};

export default CardWithButtons;