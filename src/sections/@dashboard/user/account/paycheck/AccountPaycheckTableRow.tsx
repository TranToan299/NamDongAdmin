import { useState } from 'react';
import { RHFSelect, RHFTextField, RHFUploadBox } from 'components/hook-form';
import { useLocales } from 'locales';

// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
// @types
import ConfirmDialog from 'components/confirm-dialog/ConfirmDialog';
import MenuPopover from 'components/menu-popover/MenuPopover';
import Iconify from 'components/iconify/Iconify';

// components

// ----------------------------------------------------------------------

type Props = {
  row: {
    title: string | number;
    values: string | number;
  };
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function AccountPaycheckTableRow({ row, onEditRow, onDeleteRow }: Props) {
  const { t } = useLocales();
  const { title, values } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

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

  return (
    <>
      <TableRow>
        <TableCell align="left">{title}</TableCell>
        <TableCell align="center">{values}</TableCell>
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
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
