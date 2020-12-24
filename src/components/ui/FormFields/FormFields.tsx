import React from 'react';
import { BoxProps } from '@chakra-ui/core';
import _debounce from 'lodash/debounce';
import _keyBy from 'lodash/keyBy';
import _omit from 'lodash/omit';
import { useForm, UseFormMethods } from 'react-hook-form';

import {
  FieldParams,
  FormFieldMode,
  FieldRendererArgsType,
  SelectFieldParams,
  ImageUploaderFieldParams,
  FormFieldsContextType
} from './types';
import { selectField, inputField } from './fields';

export type FieldType = {
  name: string;
  type: 'input' | 'select' | 'textarea' | 'image-uploader';
  label?: string;
  dataCy?: string;
  params?: FieldParams & { boxProps?: BoxProps };
};

export type FormFieldsType = {
  fields: FieldType[];
  debounce?: number;
  onChange?: (data: {}) => any;
  defaultValues?: {};
};

type FormFieldsActionsType = {
  handleSubmit: UseFormMethods['handleSubmit'];
};

export function createField(name, type, label, params = {}) {
  return {
    name,
    type,
    label,
    params
  };
}

const FormContext = React.createContext<FormFieldsContextType>({
  fields: [],
  actions: {},
  fieldsByName: {},
  data: {},
  onChange: () => {}
});

const FORM_DEBOUNCE = 100;

const Field: React.FC<{
  fieldName: string;
  params?: any;
  mode?: FormFieldMode;
}> = React.memo(({ fieldName, params, mode = 'edit' }) => {
  const context = React.useContext(FormContext);
  const field = context.fieldsByName[fieldName];
  const value = context.data[fieldName];

  const boxParams = React.useMemo(() => {
    return {
      flex: 1,
      ...field?.params?.boxProps,
      ...params?.boxProps
    };
  }, [field, params]);

  const mergedParams = {
    ..._omit(field?.params, 'boxProps'),
    ..._omit(params, 'boxProps')
  };

  const rendererProps = {
    field,
    context,
    boxParams,
    params: mergedParams,
    value
  };
  switch (field.type) {
    case 'select': {
      return selectField.renderField(
        mode,
        rendererProps as FieldRendererArgsType<SelectFieldParams>
      );
    }
    case 'textarea':
    case 'input':
    default: {
      return inputField.renderField(mode, rendererProps);
    }
  }
});

const FormFieldAction: React.FC<{
  children: (actions: FormFieldsActionsType) => any;
}> = ({ children }) => {
  const context = React.useContext(FormContext);
  return children({
    handleSubmit: context.actions?.handleSubmit
  } as FormFieldsActionsType);
};

const FormFieldData: React.FC<{
  children: ({ data }: { data?: {} }) => any;
}> = ({ children }) => {
  const context = React.useContext(FormContext);
  return children({ data: context.data });
};

type FormFieldHelpers = {
  Item: typeof Field;
  Actions: typeof FormFieldAction;
  Data: typeof FormFieldData;
};

const FormFields: React.FC<FormFieldsType> & FormFieldHelpers = ({
  fields,
  debounce = FORM_DEBOUNCE,
  children,
  onChange: onChangeProps,
  defaultValues
}) => {
  const [data, setData] = React.useState({ ...defaultValues });
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    errors,
    control,
    getValues
  } = useForm({
    defaultValues
  });

  /**
   * for those use-cases when form doesn't have regular submit button and need live data on every change can listen to onChange function.
   */
  const onChange = React.useCallback(
    _debounce(() => {
      const values = getValues();
      setData(values);
      onChangeProps?.(values);
    }, debounce),
    [getValues, setData]
  );

  const fieldsByName = React.useMemo<{}>(() => {
    return _keyBy(fields, 'name');
  }, [fields]);

  /**
   * all values that will persisted in context
   */
  const value = React.useMemo(
    () => ({
      onChange,
      actions: {
        handleSubmit
      },
      register,
      unregister,
      getValues,
      errors,
      fields,
      data,
      setValue,
      fieldsByName,
      control
    }),
    [
      onChange,
      handleSubmit,
      register,
      unregister,
      setValue,
      getValues,
      errors,
      fields,
      data,
      fieldsByName,
      control
    ]
  );
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

FormFields.Item = Field;
FormFields.Actions = FormFieldAction;
FormFields.Data = FormFieldData;

export default FormFields;
