import ui, { setActiveSchemaId, setMode, UiModes } from './ui';

describe('ui reducer', () => {
    it('should handle initial state', () => {
        expect(ui(undefined, {})).toEqual({
            activeSchemaId: null,
            mode: UiModes.SHOW
        });
    });

    it('should handle "setActiveSchemaId"', () => {
        expect(
            ui(
                {
                    activeSchemaId: null,
                    mode: UiModes.SHOW
                },
                {
                    type: setActiveSchemaId.type,
                    payload: 1
                }
            )
        ).toEqual({
            activeSchemaId: 1,
            mode: UiModes.SHOW
        });

        expect(
            ui(
                {
                    activeSchemaId: 1,
                    mode: UiModes.SHOW
                },
                {
                    type: setActiveSchemaId.type,
                    payload: 2
                }
            )
        ).toEqual({
            activeSchemaId: 2,
            mode: UiModes.SHOW
        });
    });

    it('should handle "setMode', () => {
        expect(
            ui(
                {
                    activeSchemaId: null,
                    mode: UiModes.SHOW
                },
                {
                    type: setMode.type,
                    payload: UiModes.ADD
                }
            )
        ).toEqual({
            activeSchemaId: null,
            mode: UiModes.ADD
        });
    });
});
