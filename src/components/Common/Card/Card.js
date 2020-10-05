import React from 'react';
import css from './Card.module.css';

/**
 * Callback for events handling.
 * @callback EventHandlerFunction
 */

/**
 * Functional component which renders a custom Card element.
 * @param {Object}               props
 * @param {string}               props.name         - Name of the Card.
 * @param {*}                    props.content      - Content of the Card.
 * @param {'gold'|'red'}         [props.colorTheme] - Color theme of the Card.
 * @param {boolean}              [props.isClicked]  - Indicates whether the Card is clicked.
 * @param {EventHandlerFunction} props.onClick      - On click function for the Card.
 */
const Card = ({ name, content, colorTheme, isClicked, onClick }) => {
    let cardCss = css.card;

    if (colorTheme === 'gold') {
        cardCss = css.goldCard;
    }
    if (colorTheme === 'red') {
        cardCss = css.redCard;
    }
    if (isClicked) {
        cardCss += ' ' + css.clicked;
    }

    return (
        <div role="button" className={cardCss} onClick={onClick}>
            <div className={css.cardName}>
                {name}
            </div>
            <div><hr /></div>
            <div className={css.cardContent}>
                {content}
            </div>
        </div>
    );
};

export default Card;