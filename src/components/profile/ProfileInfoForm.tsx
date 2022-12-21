import React, {useContext, useState} from "react";
import {Validate} from "@/model/validation";
import {AvatarOptionList, ProfileInfo} from "@/model/profile";
import {ValidationDispatchContext, ValidationProvider} from "@/components/form/validation/ValidationProvider";
import InputText from "@/components/form/InputText";
import {InputModel} from "@/model/form";
import Button, {ButtonMode} from "@/components/form/Button";
import {useNavigate} from "react-router-dom";
import ToolbarContainers from "@/components/containers/ToolbarContainers";
import {ThemeOptionList} from "@/themes";
import {recordValues} from "@/lib/utils";
import ColorPicker from "@/components/form/ColorPicker";
import AvatarPicker from "@/components/form/AvatarPicker";
import FormSection from "@/components/basic/FormSection";
import {ExerciseModel} from "@/model/exercise";
import {ProfileContext, ProfilesState} from "@/components/profile/ProfileProvider";

export type ProfileInfoFormProps = {
    value: ProfileInfo,
    onCancel: () => void,
    onSave: (value: ProfileInfo) => void
};

const ThemeOptions = recordValues(ThemeOptionList);

const AvatarOptions = recordValues(AvatarOptionList);

const createValidates = (profiles: ProfilesState): Validate<ProfileInfo>[] => {
    return [
        (value: ProfileInfo) => {
            if (profiles.profileList
                .filter((item, index) => profiles.activeProfile !== index)
                .filter((item, index) => item.info.name === value.name).length > 0) {
                return {key: 'name', error: 'Pod zadaným jménem je již zaregistrován jiný uživatel.'};
            }
            return true;
        }
    ]
}

const Form = ({value, onCancel, onSave}: ProfileInfoFormProps) => {
    const navigation = useNavigate();

    const [model, setModel] = useState<ProfileInfo>({...value});
    const validate = useContext(ValidationDispatchContext);

    const handleOnChange = <V extends any>(value: InputModel<string, V>) => {
        setModel({...model, [value.name]: value.value})
    }

    const handleSave = () => {
        const formValidation = validate(model);
        if (formValidation.isValid()) {
            onSave(model);
        }
    }

    const handleCancel = () => {
        onCancel();
    }

    return (
        <form>
            <FormSection>
                <InputText label="Jméno"
                           name={'name'}
                           value={model.name}
                           onChange={handleOnChange}
                           autoFocus/>

                <div className="mt-4">
                    <AvatarPicker label="Obrázek"
                                  name={'avatar'}
                                  options={AvatarOptions}
                                  value={model.avatar}
                                  onChange={handleOnChange}/>
                </div>

                <div className="mt-4">
                    <ColorPicker label="Barva"
                                 name={'theme'}
                                 options={ThemeOptions}
                                 value={model.theme}
                                 onChange={handleOnChange}/>
                </div>
            </FormSection>

            <ToolbarContainers className="mt-4">
                <Button mode={ButtonMode.THEMATHIC} type='button' text='Uložit' click={handleSave}/>
                <Button mode={ButtonMode.SECONDARY} type='button' text='Zrušit' click={handleCancel}/>
            </ToolbarContainers>
        </form>
    )
}

const ProfileInfoForm = ({value, onCancel, onSave}: ProfileInfoFormProps) => {
    const profiles = useContext<ProfilesState>(ProfileContext);
    const validates = createValidates(profiles);

    return (
        <ValidationProvider validates={validates}>
            <Form value={value} onCancel={onCancel} onSave={onSave}/>
        </ValidationProvider>
    )
}

export default ProfileInfoForm;
