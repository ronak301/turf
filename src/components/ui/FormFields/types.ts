import { BoxProps } from '@chakra-ui/core';
import { UseFormMethods } from 'react-hook-form';

import { Option } from '../forms/Select';
import { FieldType } from './FormFields';

export type CreateBaseFieldParams<T> = {
  placeholder?: string;
} & T;

export type InputFieldParams = CreateBaseFieldParams<{}>;
export type ImageUploaderFieldParams = CreateBaseFieldParams<{
  onReset: () => any;
}>;

export type SelectFieldParams = CreateBaseFieldParams<{
  options: Option[];
}>;

export type FieldParams =
  | InputFieldParams
  | SelectFieldParams
  | ImageUploaderFieldParams;

export type FormFieldsActionsType = {
  handleSubmit: UseFormMethods['handleSubmit'];
};

export type FormFieldsContextType = {
  onChange: (any) => any;
  fields: FieldType[];
  fieldsByName: { [key: string]: FieldType };
  data: {};
  actions: Partial<FormFieldsActionsType>;
} & Partial<Pick<UseFormMethods, 'register' | 'setValue' | 'control'>>;

export type FieldRendererArgsType<K = {}, T = any> = {
  field: FieldType;
  value: T;
  context: FormFieldsContextType;
  boxParams: BoxProps;
  params: K;
};

export type FormFieldMode = 'edit' | 'view';
