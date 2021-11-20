import { useFormikContext } from 'formik';
import React from 'react';
import ErrorMessage from './ErrorMessage';
import AppPicker from '../AppPicker';

export default function AppFormPicker({
    items,
    name,
    numberOfColumns,
    placeholder,
    PickerItemComponent,
    width }) {
    const { errors, setFieldValue, touched, values } = useFormikContext();

    return (
        <>
            <AppPicker
                items={items}
                numberOfColumns={numberOfColumns}
                onSelectItem={(item) => setFieldValue(name, item)}
                PickerItemComponent={PickerItemComponent}
                placeholder={placeholder}
                selectedItem={values[name]}
                width={width}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    )
}
