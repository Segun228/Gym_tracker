import {getWorkouts} from "./../../../api/requests/workouts/workoutsRequest.js"
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWorkouts = createAsyncThunk(
    'workouts/fetchAll',
    async () => {
        try {
            const response = await getWorkouts()
            return response
        } catch (error) {
            console.error(error)
            return rejectWithValue(error.response.data)
        }
    }
);