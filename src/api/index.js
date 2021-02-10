import { nanoid } from '@reduxjs/toolkit';

const API = {
    key: null,

    init(key) {
        this.key = key;
    },
    saveData(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    },
    loadData() {
        return JSON.parse(localStorage.getItem(this.key)) || { schemas: [] };
    },
    loadSchemas() {
        let { schemas } = API.loadData();

        // TODO with demo schema
        if (!schemas.length) {
            schemas = [{"id":nanoid(),"name":"Demo Schema 1","description":"Demo Schema 1 Description","items":[{"id":1,"name":"Item 1","quantity":"Quantity 1","time":"Time 1"},{"id":2,"name":"Item 2","quantity":"Quantity 2","time":"Time 2"},{"id":3,"name":"Item 3","quantity":"Quantity 3","time":"Time 3"},{"id":4,"name":"Item 4","quantity":"Quantity 4","time":"Time 4"},{"id":5,"name":"Item 5","quantity":"Quantity 5","time":"Time 5"},{"id":6,"name":"Item 6","quantity":"Quantity 6","time":"Time 6"},{"id":7,"name":"Item 7","quantity":"Quantity 7","time":"Time 7"},{"id":8,"name":"Item 8","quantity":"Quantity 8","time":"Time 8"},{"id":10,"name":"Item 10","quantity":"Quantity 10","time":"Time 10"},{"id":11,"name":"Item 11","quantity":"Quantity 11","time":"Time 11"},{"id":12,"name":"Item 12","quantity":"Quantity 12","time":"Time 12"},{"id":13,"name":"Item 13","quantity":"Quantity 13","time":"Time 13"},{"id":14,"name":"Item 14","quantity":"Quantity 14","time":"Time 14"},{"id":15,"name":"Item 15","quantity":"Quantity 15","time":"Time 15"}]}];
            API.saveData({ schemas });
        }

        return Promise.resolve({ data: schemas });
    },
    addSchema(payload) {
        const data = this.loadData();
        payload.id = nanoid();
        data.schemas.push(payload);

        this.saveData(data);

        return Promise.resolve({ data: payload });
    },
    updateSchema(payload) {
        const data = this.loadData();
        const updateId = data.schemas.findIndex(schema => schema.id === payload.id);
        data.schemas[updateId] = payload;

        this.saveData(data);

        return Promise.resolve({ data: data.schemas[updateId] });
    },
    deleteSchema(payload) {
        const data = this.loadData();
        data.schemas = data.schemas.filter(schema => schema.id !== payload);

        this.saveData(data);

        return Promise.resolve({ data: payload });
    }
};

export default API;
