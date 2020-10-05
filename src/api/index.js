const API = {
    key: null,

    init(key) {
        this.key = key;
    },
    saveData(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    },
    loadData() {
        return JSON.parse(localStorage.getItem(this.key)) || {schemas: []};
    },
    addSchema(payload) {
        const data = this.loadData();

        payload.schema.id = data.schemas.length ? data.schemas[data.schemas.length - 1].id + 1 : 1;
        data.schemas.push(payload.schema);

        this.saveData(data);

        return Promise.resolve({ data: data.schemas[data.schemas.length - 1] });
    },
    updateSchema(payload) {
        const data = this.loadData();
        const updateId = data.schemas.findIndex(schema => schema.id === payload.schema.id);

        data.schemas[updateId] = payload.schema;

        this.saveData(data);

        return Promise.resolve({ data: data.schemas[updateId] });
    },
    deleteSchema(payload) {
        const data = this.loadData();

        data.schemas = data.schemas.filter(schema => schema.id !== payload.id);

        this.saveData(data);

        return Promise.resolve();
    }
};

export default API;