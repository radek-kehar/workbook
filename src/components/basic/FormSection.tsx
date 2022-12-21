import React, {ReactNode} from "react";

type TextProps = {
    text: string
}

const FormSectionTitle = ({text}: TextProps) => {
    return (
        <h2 className="text-xl text-primary">{text}</h2>
    )
}

const FormSectionDescription = ({text}: TextProps) => {
    return (
        <p className="text-secondary">{text}</p>
    )
}

type FormSectionProps = {
    description?: string,
    title?: string,
    children: ReactNode
}

const FormSection = ({description, title, children}: FormSectionProps) => {
    return (
        <div className="pb-2 mb-2 border-gray-200 border-b">
            {title &&
                <div className="mb-2">
                    <FormSectionTitle text={title}/>
                    {description && <FormSectionDescription text={description}/>}
                </div>
            }
            {children}
        </div>
    )
}

export default FormSection;
