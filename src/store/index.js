import { createSlice, configureStore} from '@reduxjs/toolkit';

export const myReducer = {
    increase(state, action) {
        if(state !== undefined) {
            const index = state.ships.findIndex(ship => ship.name === action.payload)
            state.ships[index].total_no++;
        }
    },
    decrease(state, action) {
        if(state !== undefined){
            const index = state.ships.findIndex(ship => ship.name === action.payload)
        state.ships[index].total_no--;
        }
    },
    update(state, action) {
        state.ships = action.payload
    }
}

const initialState = {
    ships: []
} 

const shipSlice = createSlice({
    name: "Ship State",
    initialState,
    reducers: myReducer
});


const store = configureStore({
    reducer: shipSlice.reducer
});

export const shipActions = shipSlice.actions

export default store;