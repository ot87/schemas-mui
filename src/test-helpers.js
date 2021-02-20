import { screen, within } from '@testing-library/react';

export const getByRole   = (type, name) => screen.getByRole(type, { name });
export const queryByRole = (type, name) => screen.queryByRole(type, { name });

export const getButton     = (name) => screen.getByRole('button', { name });
export const getAllButtons = (name) => screen.getAllByRole('button', { name });
export const queryButton = (name) => screen.queryByRole('button', { name });

export const getButtonWithin   = (element, name) => within(element).getByRole('button', { name });
export const queryButtonWithin = (element, name) => within(element).queryByRole('button', { name });

export const getTabList = (name) => screen.getByRole('tablist', { name });

export const getTab = (name) => screen.getByRole('tab', { name });

export const getGridCell     = (name) => screen.getByRole('gridcell', { name });
export const getAllGridCells = (name) => screen.getAllByRole('gridcell', { name });
export const queryGridCell   = (name) => screen.queryByRole('gridcell', { name });

export const getGridCellWithin   = (element, name) => within(element).getByRole('gridcell', { name });
export const queryGridCellWithin = (element, name) => within(element).queryByRole('gridcell', { name });

export const getTextBox      = (name) => screen.getByRole('textbox', { name });
export const getAllTextBoxes = (name) => screen.getAllByRole('textbox', { name });

export const getTextBoxWithin = (element, name) => within(element).getByRole('textbox', { name });

export const getTable = (name) => screen.getByRole('table', { name });

export const getGrid = (name) => screen.getByRole('grid', { name });

export const getByTextWithin = (element, text) => within(element).getByText(text);
