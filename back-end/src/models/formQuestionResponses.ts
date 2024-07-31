export interface FormQuestionResponses {
    name: string;
}

export interface FormTextQuestionResponses extends FormQuestionResponses {
    responses: string[]
}

export interface OptionsResponses {
    option: string;
    count: number;
}

export interface FormSelectQuestionResponses extends FormQuestionResponses {
    responses: OptionsResponses[];
}

