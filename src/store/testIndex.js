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
    ships: [
        {
            "name": "Space pod",
            "total_no": 2,
            "max_distance": 200,
            "speed": 2
        },
        {
            "name": "Space rocket",
            "total_no": 1,
            "max_distance": 300,
            "speed": 4
        },
        {
            "name": "Space shuttle",
            "total_no": 1,
            "max_distance": 400,
            "speed": 5
        },
        {
            "name": "Space ship",
            "total_no": 2,
            "max_distance": 600,
            "speed": 10
        }
    ]
} 

const shipSlice = createSlice({
    name: "Ship State",
    initialState,
    reducers: myReducer
});


const testStore = configureStore({
    reducer: shipSlice.reducer
});

export const shipActions = shipSlice.actions

export default testStore;