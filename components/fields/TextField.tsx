"use client";

import { MdTextFields } from "react-icons/md";
import {
    ElementsType,
    FormElement,
    FormElementInstance,
} from "../FormElements";
import { Form } from "@prisma/client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import z from "zod";

const type: ElementsType = "TextField";

const extraAttributes = {
    label: "Text Field",
    helperText: "Helper Text",
    required: false,
    placeholder: "Placeholder",
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeholder: z.string().max(50),
});

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field",
    },
    designerComponent: DesignerComponent,
    formComponent: () => <div>Form Component</div>,
    propertiesComponent: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};
function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeholder, helperText } =
        element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && "*"}
            </Label>
            <Input readOnly disabled placeholder={placeholder} />
            {helperText && (
                <p className="text-muted-foreground text-[0.8rem]">
                    {helperText}
                </p>
            )}
        </div>
    );
}

function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    return <div>Form Properties foe {element.extraAttributes.label}</div>;
}
