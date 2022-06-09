import React, {useContext} from "react";
import InputNumber from "components/form/InputNumber";
import CheckBoxGroup from "components/form/CheckBoxGroup";
import Button from "components/form/Button";
import {OperationType, Unknown} from "model/generator";
import {resetAction, setOperationAction, setRangeAction, setUnknownAction} from "state/exercise";
import {ExerciseContext, ExerciseDispatchContext} from "components/exercise/ExerciseProvider";
import {saveExercise} from "lib/store/exercise";
import {operationTypeInfos, unknownInfos} from "message/enums";
import { useNavigate } from "react-router-dom";

const NumericRange = ({value, onChange}) => {

    const handleChange = (event) => {
        const newRange = {...value, [event.name]: Number(event.value)}
        onChange(newRange)
    }

    return (
        <div>
            <InputNumber label='Od' max={value.maxDigit} name='min' value={value.minDigit} onChange={handleChange}/>
            <InputNumber label='Do' min={value.minDigit} name='max' value={value.maxDigit} onChange={handleChange}/>
        </div>
    )
}

const allOperations = Object.keys(OperationType).filter(item => isNaN(Number(item))).map(item => OperationType[item])

const allUnknowns = Object.keys(Unknown).filter(item => isNaN(Number(item))).map(item => Unknown[item])

const ExerciseForm = () => {
    const navigate = useNavigate();

    const state = useContext(ExerciseContext);
    const dispatch = useContext(ExerciseDispatchContext);

    const handleChange = (action, value) => {
        dispatch(action(value))
    }

    const handleReset = () => {
        dispatch(resetAction())
    }

    const handleStart = () => {
        saveExercise(state)
        navigate("/example")
    }

    const operations = allOperations.map(operation => {
        return {
            name: operation,
            value: state.operations.includes(operation),
            label: operationTypeInfos[operation].label
        }
    })
    const unknowns = allUnknowns.map(unknown => {
        return {
            name: unknown,
            value: state.unknowns.includes(unknown),
            label: unknownInfos[unknown].label
        }
    })

    return (
        <div>
            <form>
                <CheckBoxGroup value={operations} onChange={(value) => handleChange(setOperationAction, value)}/>
                <NumericRange value={state.range} onChange={(value) => handleChange(setRangeAction, value)}/>
                {/*<CheckBox label='Přes 10' name='overbase' value={state.overbase} onChange={handleChange}/>*/}
                <CheckBoxGroup value={unknowns} onChange={(value) => handleChange(setUnknownAction, value)}/>
                <Button type='button' text='Reset' click={handleReset}/>
                <Button type='button' text='Spusť' click={handleStart}/>
            </form>
        </div>
    )
}
export default ExerciseForm;
