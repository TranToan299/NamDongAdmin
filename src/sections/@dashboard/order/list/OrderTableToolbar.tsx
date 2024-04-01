


// @mui
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
// components
import { useLocales } from 'locales';
import Iconify from '../../../../components/iconify'

// ----------------------------------------------------------------------

type Props = {
  handleClick?: VoidFunction;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function OrderTableToolbar({
  handleClick,
  filterName,
  onFilterName,
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

