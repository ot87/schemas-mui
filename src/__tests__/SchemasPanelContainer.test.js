import React from 'react';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';

import SchemasPanelContainer from '../components/SchemasPanel/SchemasPanelContainer';

const renderSchemasPanel = (init = false, initData = {}) => {
    let plates = {};

    if (init) {
        let initialState = { schemas: [{id: 1, name: 'schema 1', items: []}] };
        if (Object.keys(initData).length) {
            initialState = {
                ...initialState,
                ...initData
            };
        }
        render(<SchemasPanelContainer />, { initialState });

        plates['editPlate']   = screen.getByRole('button', { name: 'Edit' });
        plates['deletePlate'] = screen.getByRole('button', { name: 'Delete' });
    } else {
        render(<SchemasPanelContainer />);
    }

    plates['addPlate'] = screen.getByRole('button', { name: 'Add' });

    return plates;
};

test('displays only Add Plate that is clickable once only', () => {
    const { addPlate } = renderSchemasPanel();

    // check that Add Plate is displayed
    expect(addPlate).toBeInTheDocument();
    expect(addPlate).toHaveClass('greenPlate');

    // check that Edit and Delete Plates aren't displayed
    expect(screen.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();

    // check that Add Plate is clicked
    userEvent.click(addPlate);
    expect(addPlate).toHaveClass('greenPlate clickedPlate greenTheme');
});

test('displays all three Plates - Add, Edit and Delete; Edit and Delete are togglable', () => {
    const { addPlate, editPlate, deletePlate } = renderSchemasPanel(true);

    // check that Add, Edit and Delete Plates are displayed
    expect(addPlate).toBeInTheDocument();
    expect(addPlate).toHaveClass('greenPlate');

    expect(editPlate).toBeInTheDocument();
    expect(editPlate).toHaveClass('goldPlate');

    expect(deletePlate).toBeInTheDocument();
    expect(deletePlate).toHaveClass('redPlate');

    // check that only Edit Plate is toggled
    userEvent.click(editPlate);
    expect(editPlate).toHaveClass('goldPlate toggledPlate goldTheme');
    expect(addPlate).not.toHaveClass('clickedPlate greenTheme');
    expect(deletePlate).not.toHaveClass('toggledPlate redTheme');

    // check that only Delete Plate is toggled
    userEvent.click(deletePlate);
    expect(deletePlate).toHaveClass('redPlate toggledPlate redTheme');
    expect(addPlate).not.toHaveClass('clickedPlate greenTheme');
    expect(editPlate).not.toHaveClass('toggledPlate goldTheme');

    // check that Edit is toggled back
    userEvent.click(editPlate);
    expect(editPlate).toHaveClass('goldPlate toggledPlate goldTheme');
    expect(addPlate).not.toHaveClass('clickedPlate greenTheme');
    expect(deletePlate).not.toHaveClass('toggledPlate redTheme');
});

test('Add Plate is clickable once only; Edit and Delete Plates are disabled and not clickable', () => {
    const { addPlate, editPlate, deletePlate } = renderSchemasPanel(true);

    userEvent.click(addPlate);

    // check that Add Plate is clicked
    expect(addPlate).toHaveClass('greenPlate clickedPlate greenTheme');
    expect(editPlate).not.toHaveClass('toggledPlate goldTheme');
    expect(deletePlate).not.toHaveClass('toggledPlate redTheme');

    // check that Edit Plate is disabled
    expect(editPlate).toHaveClass('goldPlate disabledPlate');
    userEvent.click(editPlate);
    expect(editPlate).not.toHaveClass('toggledPlate goldTheme');

    // check that Delete Plate is disabled
    expect(deletePlate).toHaveClass('redPlate disabledPlate');
    userEvent.click(deletePlate);
    expect(deletePlate).not.toHaveClass('toggledPlate redTheme');
});

test('Edit Plate is clickable once only; Add and Delete Plates are disabled and not clickable', () => {
    const { addPlate, editPlate, deletePlate } = renderSchemasPanel(true, {
        ui: { selectedSchemaId: 1 }
    });

    userEvent.click(editPlate);

    // check that Edit Plate is clicked
    expect(editPlate).toHaveClass('goldPlate clickedPlate goldTheme');
    expect(addPlate).not.toHaveClass('clickedPlate greenTheme');
    expect(deletePlate).not.toHaveClass('clickedPlate redTheme');

    // check that Add Plate is disabled
    expect(addPlate).toHaveClass('greenPlate disabledPlate');
    userEvent.click(addPlate);
    expect(addPlate).not.toHaveClass('clickedPlate greenTheme');

    // check that Delete Plate is disabled
    expect(deletePlate).toHaveClass('redPlate disabledPlate');
    userEvent.click(deletePlate);
    expect(deletePlate).not.toHaveClass('clickedPlate redTheme');
});

test('Delete Plate is clickable once only; Add and Edit Plates are disabled and not clickable', () => {
    const { addPlate, editPlate, deletePlate } = renderSchemasPanel(true, {
        ui: { selectedSchemaId: 1 }
    });

    userEvent.click(deletePlate);

    // check that Delete Plate is clicked
    expect(deletePlate).toHaveClass('redPlate clickedPlate redTheme');
    expect(addPlate).not.toHaveClass('clickedPlate greenTheme');
    expect(editPlate).not.toHaveClass('clickedPlate goldTheme');

    // check that Add Plate is disabled
    expect(addPlate).toHaveClass('greenPlate disabledPlate');
    userEvent.click(addPlate);
    expect(addPlate).not.toHaveClass('clickedPlate greenTheme');

    // check that Edit Plate is disabled
    expect(editPlate).toHaveClass('goldPlate disabledPlate');
    userEvent.click(editPlate);
    expect(editPlate).not.toHaveClass('clickedPlate goldTheme');
});