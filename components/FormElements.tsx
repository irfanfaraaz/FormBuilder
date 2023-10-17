export type ElementsType = "TextField";

export type FormElement = {
    type: ElementsType;
    designerComponent: React.FC;
    formComponent: React.FC;
    propertiesComponent: React.FC;
};

type FormElementsType = {
    [key in ElementsType]: FormElement;
};
