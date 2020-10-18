import React from 'react';
import cn from 'classnames';
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
    const cardCss = cn({
        [css.goldCard]: colorTheme === 'gold',
        [css.redCard]: colorTheme === 'red',
        [css.card]: ['gold', 'red'].indexOf(colorTheme) === -1,
        [css.clicked]: isClicked
    });

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