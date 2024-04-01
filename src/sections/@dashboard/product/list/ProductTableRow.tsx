import { useLocales } from 'locales';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

// @mui
import { Close, Done } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';

// @types
import Image from 'components/image/Image';
import { ProductType } from '../../../../@types/product';
// components
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import i18n from '../../../../locales/i18n';
import { ITooltip } from '../../../../@types/tooltip';
import { Utils } from '../../../../utils/utils';
import { useSettingsContext } from '../../../../components/settings';
import { backgroundColor } from '../../../../constants/app.constants';
// ----------------------------------------------------------------------

type Props = {
  row: ProductType;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function ProductTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { t } = useLocales();
  const { id, name, thumbnail, description, isLiquid, isSale, type, typeName } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const [tooltipDescription, setTooltipDescription] = useState<ITooltip>({
    isTooltip: false,
    content: '',
  });

  const theme = useTheme();
  const { themeMode } = useSettingsContext();
  const isDark = themeMode === 'dark';

  const PRIMARY_MAIN = theme.palette.primary.main;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  useEffect(() => {
    if (description) {
      Utils.setTooltip(description, setTooltipDescription);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <TableRow>
        <TableCell
          style={{
            position: 'sticky',
            left: 0,
            backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,
            zIndex: 800,
          }}
          padding="checkbox"
        >
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell align="left">{id}</TableCell>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="left">{typeName}</TableCell>
        <TableCell align="left">
          {isLiquid ? (
            <Done sx={{ color: PRIMARY_MAIN, fontSize: 16 }} />
          ) : (
            <Close sx={{ fontSize: 16 }} />
          )}
        </TableCell>
        <TableCell align="left">
          {isSale ? (
            <Done sx={{ color: PRIMARY_MAIN, fontSize: 16 }} />
          ) : (
            <Close sx={{ fontSize: 16 }} />
          )}
        </TableCell>
        {tooltipDescription.isTooltip ? (
          <Tooltip title={description}>
            <TableCell align="left">{tooltipDescription.content}</TableCell>
          </Tooltip>
        ) : (
          <TableCell align="left">{description}</TableCell>
        )}
        <TableCell align="left">
          <Image src={thumbnail} alt="Thumbnail" sx={{ width: '100px', height: '100px' }} />
        </TableCell>
        {/* <TableCell align="left">{content}</TableCell> */}

        <TableCell
          style={{
            position: 'sticky',
            right: 0,
            backgroundColor: isDark ? theme.palette.mode : backgroundColor.white,
            zIndex: 800,
          }}
          align="right"
        >
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          {t('delete')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          {t('edit')}
        </MenuItem>
      </MenuPopover>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={i18n.t<string>('delete')}
        content={i18n.t<string>('deleteConfirm')}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {i18n.t<string>('delete')}
          </Button>
        }
      />
    </>
  );
}
