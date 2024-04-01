// @mui
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {
  Autocomplete,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
// components
import { useLocales } from 'locales';
import Iconify from '../../../../components/iconify';
import i18n from '../../../../locales/i18n';
import { IEventType } from '../../../../@types/event';

// ----------------------------------------------------------------------

type Props = {
  handleClick?: VoidFunction;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options?: IEventType[] | [];
  onChange: (event: SelectChangeEvent) => void;
  typeEvent: string;
};

export default function EventTableToolbar({
  handleClick,
  filterName,
  onFilterName,
  options,
  onChange,
  typeEvent,
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
      <FormControl fullWidth sx={{maxWidth: 350}}>
        <InputLabel id="demo-simple-select-label">{t('typeEvent')}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={typeEvent}
          label="typeEvent"
          onChange={onChange}
        >
          {options?.map((option: IEventType) => (
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
