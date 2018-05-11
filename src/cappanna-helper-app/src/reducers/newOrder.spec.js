import newOrderReducer, { initialState } from "reducers/newOrder";
import {
  resetOrder,
  createEmptyOrder,
  incrementOrderDetailQuantity,
  setOrderTable,
  setOrderTableCategory,
  setOrderSeats,
  setOrderNotes
} from "actions";

describe("new order reducer", () => {
  it("should return the initial state", () => {
    expect(newOrderReducer(undefined, {})).toEqual(initialState);
  });

  it("should reset header data to initial and details' quantity", () => {
    const state = {
      header: {
        seats: 10,
        chTable: 10,
        tableCategory: "whatever",
        totalPrice: 100
      },
      details: [
        {
          id: 1,
          quantity: 1
        },
        {
          id: 2,
          quantity: 2
        }
      ]
    };
    const expectedState = {
      header: initialState.header,
      details: [
        {
          id: 1,
          quantity: 0
        },
        {
          id: 2,
          quantity: 0
        }
      ]
    };

    expect(newOrderReducer(state, resetOrder())).toEqual(expectedState);
  });

  it("should set details from payload", () => {
    const details = [
      {
        id: 1
      },
      {
        id: 2
      }
    ];
    const state = {
      header: initialState.header,
      details: []
    };
    const expectedState = {
      header: initialState.header,
      details: [
        {
          id: 1,
          quantity: 0
        },
        {
          id: 2,
          quantity: 0
        }
      ]
    };
    expect(newOrderReducer(state, createEmptyOrder(details))).toEqual(
      expectedState
    );
  });

  it("should increment a detail's quantity and total price", () => {
    const initialQuantity = 0;
    const state = {
      header: initialState.header,
      details: [
        {
          id: 1,
          quantity: initialQuantity
        },
        {
          id: 2,
          quantity: 0
        }
      ]
    };
    const quantity = 1;
    const price = 5;
    const expectedState = {
      header: {
        ...initialState.header,
        totalPrice: initialState.header.totalPrice + price
      },
      details: [
        {
          id: 1,
          quantity: initialQuantity + quantity
        },
        {
          id: 2,
          quantity: 0
        }
      ]
    };
    expect(
      newOrderReducer(
        state,
        incrementOrderDetailQuantity(state.details[0].id, quantity, price)
      )
    ).toEqual(expectedState);
  });

  it("should set table", () => {
    const table = 1;
    const expectedState = {
      header: { ...initialState.header, chTable: table },
      details: initialState.details
    };

    expect(newOrderReducer(initialState, setOrderTable(table))).toEqual(
      expectedState
    );
  });

  it("should set table category", () => {
    const category = "whatever";
    const expectedState = {
      header: { ...initialState.header, tableCategory: category },
      details: initialState.details
    };

    expect(
      newOrderReducer(initialState, setOrderTableCategory(category))
    ).toEqual(expectedState);
  });

  it("should set seats number", () => {
    const seats = 1;
    const expectedState = {
      header: { ...initialState.header, seats },
      details: initialState.details
    };

    expect(newOrderReducer(initialState, setOrderSeats(seats))).toEqual(
      expectedState
    );
  });

  it("should set notes", () => {
    const notes = 1;
    const expectedState = {
      header: { ...initialState.header, notes },
      details: initialState.details
    };

    expect(newOrderReducer(initialState, setOrderNotes(notes))).toEqual(
      expectedState
    );
  });
});
