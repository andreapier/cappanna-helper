import newOrderReducer, { initialState } from "reducers/newOrder";
import { resetOrder, createEmptyOrder, incrementOrderDetailQuantity, setOrderTable, setOrderSeats, setOrderNotes } from "actions";

describe("new order reducer", () => {
    it("should return the initial state", () => {
        expect(newOrderReducer(undefined, {})).toEqual(initialState);
    });

    it("should reset header data to initial and details' quantity", () => {
        const state = {
            seats: 10,
            chTable: "10",
            totalPrice: 100,
            details: [
                { itemId: 1, quantity: 1 },
                { itemId: 2, quantity: 2 }
            ]
        };
        const expectedState = {
            ...initialState,
            details: [
                { itemId: 1, quantity: 0 },
                { itemId: 2, quantity: 0 }
            ]
        };

        expect(newOrderReducer(state, resetOrder())).toEqual(expectedState);
    });

    it("should set details from payload", () => {
        const details = [{ id: 1 }, { id: 2 }];
        const state = {
            ...initialState,
            details: []
        };
        const expectedState = {
            ...initialState,
            details: [
                { itemId: 1, quantity: 0 },
                { itemId: 2, quantity: 0 }
            ]
        };
        expect(newOrderReducer(state, createEmptyOrder(details))).toEqual(expectedState);
    });

    it("should increment a detail's quantity and total price", () => {
        const initialQuantity = 0;
        const state = {
            ...initialState,
            details: [
                { itemId: 1, quantity: initialQuantity },
                { itemId: 2, quantity: 0 }
            ]
        };
        const quantity = 1;
        const price = 5;
        const expectedState = {
            ...initialState,
            totalPrice: initialState.totalPrice + price,
            details: [
                { itemId: 1, quantity: initialQuantity + quantity },
                { itemId: 2, quantity: 0 }
            ]
        };
        expect(newOrderReducer(state, incrementOrderDetailQuantity(state.details[0].itemId, quantity, price))).toEqual(expectedState);
    });

    it("should set table", () => {
        const table = "1";
        const expectedState = {
            ...initialState,
            chTable: table,
            details: initialState.details
        };

        expect(newOrderReducer(initialState, setOrderTable(table))).toEqual(expectedState);
    });

    it("should set seats number", () => {
        const seats = 1;
        const expectedState = {
            ...initialState,
            seats,
            details: initialState.details
        };

        expect(newOrderReducer(initialState, setOrderSeats(seats))).toEqual(expectedState);
    });

    it("should set notes", () => {
        const notes = 1;
        const expectedState = {
            ...initialState,
            notes,
            details: initialState.details
        };

        expect(newOrderReducer(initialState, setOrderNotes(notes))).toEqual(expectedState);
    });
});
