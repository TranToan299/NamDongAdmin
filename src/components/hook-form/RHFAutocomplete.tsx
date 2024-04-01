// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

// ----------------------------------------------------------------------
type ColorType = '#ccc' | '#fff' | '#000';
type BackgroundColorType = '#ccc' | '#333' | '#000' | '#CED8DD' | '#F6D2CB' | '#fff';
type PlaceholderColorType = '#fff' | '#333' | '#000';
interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
  handleChange?: any;
  shrink?: boolean;
  isRequired?: boolean;
  inputColor?: ColorType;
  backgroundColor?: BackgroundColorType;
  placeholderColor?: PlaceholderColorType;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  label,
  helperText,
  handleChange,
  isRequired,
  inputColor,
  shrink,
  backgroundColor,
  placeholderColor,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();
  const colorValue = inputColor ?? 'auto';
  const backgroundColorValue = backgroundColor ?? 'auto';
  const placeholderColorValue = placeholderColor ?? 'auto';
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(event, newValue) => {
            console.log(newValue)
              setValue(name, newValue, { shouldValidate: true });
          }}
          renderInput={(params) => (
            <TextField
              inputRef={ref}
              {...field}
              label={
                <>
                  {label}
                  {isRequired && <span className="required">*</span>}
                </>
              }
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
              InputProps={{
                ...params.InputProps,
                style: { color: colorValue, backgroundColor: backgroundColorValue },
              }}
              InputLabelProps={{
                style: {
                  color: placeholderColorValue,
                },
              }}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
