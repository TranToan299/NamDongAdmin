


// @mui
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
// components
import { useLocales } from 'locales';
import Iconify from '../../../../components/iconify';
import { objectType } from '../../../../@types/objectType';

// ----------------------------------------------------------------------

type Props = {
  handleClick?: VoidFunction;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options?: objectType[] | [];
  onChange: (event: SelectChangeEvent) => void;
  typeProduct: string;
};

export default function ProductTableToolbar({
  handleClick,
  filterName,
  onFilterName,
  options,
  onChange,
  typeProduct,
}: Props) {
  const { t } = useLocales();
  return (
    <Stack 
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder={t('search') || 'Search...'}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
      <FormControl fullWidth sx={{maxWidth: 350}} >
        <InputLabel id="demo-simple-select-label">{t('productType')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={typeProduct}
          label="productType"
          onChange={onChange}
        >
          {options?.map((option: objectType) => (
            <MenuItem value={option.id}>{option.objectName}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        sx={{ flexShrink: 0 }}
        type="button"
        onClick={handleClick}
        startIcon={<FilterAltOutlinedIcon />}
      >
        {t('apply')}
      </Button>
    </Stack>
  );
}

