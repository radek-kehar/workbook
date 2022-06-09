import {ExerciseOptions} from "model/exercise";

const STORAGE_KEY = 'exercise.options'

export const loadExercise = (): ExerciseOptions => {
    if (typeof window === 'undefined') {
        return null
    }
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === null) {
        return null
    }
    try {
        return JSON.parse(stored)
    } catch {
        return null
    }
}

export const saveExercise = (value: ExerciseOptions): void => {
    if (typeof window === 'undefined') {
        return null
    }
    const json = JSON.stringify(value)
    localStorage.setItem(STORAGE_KEY, json)
}
