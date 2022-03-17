export interface FormInterface {
  field_id: string;
  field_label: string;
  field_mandatory: string;
  field_placeholder: string;
  field_type: string;
  field_value: string;
}

export interface InputElements {
  field: FormInterface ;
  helper: (param: string, param2: string) => void;
}

export interface FormElements {
  page_label: string;
  fields: FormInterface[];
}
