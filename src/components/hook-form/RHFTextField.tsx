// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type ColorType = '#ccc' | '#fff' |'#000';
type BackgroundColorType = '#ccc' | '#333' | '#000' |'#CED8DD' | '#CBDDCA' |'#fff' |"#e9ecef" |"#f6fff8";
type PlaceholderColorType = '#fff' | '#333' |'#000';

type Props = TextFieldProps & {
  name: string;
  label?: string;
  isRequired?: boolean;
  shrink?: boolean;
  readOnly?: boolean;
  inputColor?: ColorType;
  backgroundColor?: BackgroundColorType;
  placeholderColor?: PlaceholderColorType;
};

export default function RHFTextField({
  name,
  helperText,
  label,
  isRequired,
  shrink,
  readOnly = false,
  inputColor,
  backgroundColor,
  placeholderColor,
  ...other
}: Props) {
  const { control } = useFormContext();

  const colorValue = inputColor ?? 'auto';
  const backgroundColorValue = backgroundColor ?? 'auto';
  const placeholderColorValue = placeholderColor ?? 'auto';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          label={
            <>
              {label}
              {isRequired && <span className="required">*</span>}
            </>
          }
          inputRef={ref}
          InputLabelProps={{
            shrink: shrink || !!field.value,
            style: {
              color: placeholderColorValue,
            },
          }}
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          InputProps={{
            readOnly,
            style: { color: colorValue, backgroundColor: backgroundColorValue },
          }}
          {...other}
        />
      )}
    />
  );
}
