import React       from 'react';
import { connect } from 'react-redux';

import CustomButton          from 'components/Common/CustomButton/CustomButton';
import SchemasListContainer  from 'components/SchemasList/SchemasListContainer';
import SchemasPanelContainer from 'components/SchemasPanel/SchemasPanelContainer';

import { selectSchema, UiModes } from 'redux/reducers/ui';

import { makeStyles } from '@material-ui/core/styles';
import AppBar         from '@material-ui/core/AppBar';
import Toolbar        from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        flexWrap: ({ isWrap }) => isWrap ? 'wrap' : 'nowrap',
        justifyContent: 'space-between',
        padding: theme.spacing(1),
        [theme.breakpoints.down('xs')]: {
          paddingLeft: 0,
          paddingRight: 0
        }
    },
    button: {
        margin: theme.spacing(1)
    }
}));

/**
 * Header component with control buttons.
 * Consists of two parts - a clickable [CustomButton]{@link CustomButton} and a panel to display either the [SchemasList]{@link SchemasList} or the control [SchemasPanel]{@link SchemasPanel}.
 * @param {Object}      props
 * @param {number|null} props.selectedSchemaId    - The id of the selected schema from the Redux State.
 * @param {string}      props.mode                - The current ui mode from the Redux State.
 * @param {function}    props.selectSchema        - The dispatch function to select schema.
 * @param {boolean}     props.isSchemasClicked    - Indicates whether the Schemas button is clicked.
 * @param {function}    props.setIsSchemasClicked - Set value of the isSchemasClicked.
 */
const Header = ({
    selectedSchemaId,
    mode,
    // profile,
    selectSchema,
    isSchemasClicked,
    setIsSchemasClicked
}) => {
    const isShowSchema = selectedSchemaId && mode === UiModes.SHOW;
    const classes = useStyles({ isWrap: !isShowSchema && isSchemasClicked });
    const handleBackClick = () => selectSchema(null);
    const handleSchemasClick = () => setIsSchemasClicked(true);

    return (
        <AppBar
            color='inherit'
            position={(
                mode === UiModes.ADD || (selectedSchemaId && mode === UiModes.EDIT) ?
                    'static'
                : 'sticky'
            )}
        >
            <Toolbar className={classes.toolbar}>
                {isShowSchema ?
                    <CustomButton
                        onClick={handleBackClick}
                        text='Back'
                    />
                : <CustomButton
                    isClicked={isSchemasClicked}
                    onClick={handleSchemasClick}
                    text='Schemas'
                />}
                {isShowSchema ?
                    <SchemasListContainer />
                : isSchemasClicked ?
                    <SchemasPanelContainer />
                : <div />}
                {/* TODO <Plate text={profile.name} onClick={() => setContent(profile)} /> */}
            </Toolbar>
        </AppBar>
    );
};

export default connect(
    (state) => ({
        selectedSchemaId: state.ui.selectedSchemaId,
        mode: state.ui.mode,
        // profile: state.profile
    }),
    { selectSchema }
)(Header);
