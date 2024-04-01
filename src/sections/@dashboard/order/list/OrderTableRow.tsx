import { useEffect, useState } from 'react';

import { useLocales } from 'locales';
import i18n from 'locales/i18n';
// @mui
import {
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';

// components

import { IOrder } from '../../../../@types/order';
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { Utils } from '../../../../utils/utils';
import { ITooltip } from '../../../../@types/tooltip';

// ----------------------------------------------------------------------

type Props = {
  row: IOrder;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function OrderTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { t } = useLocales();
  const { id, address, email, fullName, note, phoneNumber } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [tooltipNote, setTooltipNote] = useState<ITooltip>({
    isTooltip: false,
    content: '',
  });
  const [tooltipAddress, setTooltipAddress] = useState<ITooltip>({
    isTooltip: false,
    content: '',
  });
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
    if (note) {
      Utils.setTooltip(note, setTooltipNote);
    }
    if (address) {
      Utils.setTooltip(address, setTooltipAddress);
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
            backgroundColor: 'white',
            zIndex: 800,
          }}
          padding="checkbox"
        >
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell align="left">{id}</TableCell>
        <TableCell align="left">{fullName}</TableCell>
        <TableCell align="left">
          <a href={`tel:${phoneNumber}`} target="_blank" rel="noopener noreferrer">
            {phoneNumber}
          </a>
        </TableCell>
        <TableCell align="left">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://mail.google.com/mail/u/0/?fs=1&to=${email}&tf=cm`}
          >
            {email}
          </a>
        </TableCell>
        {tooltipAddress.isTooltip ? (
          <Tooltip title={address}>
            <TableCell align="left">{tooltipAddress.content}</TableCell>
          </Tooltip>
        ) : (
          <TableCell align="left">{address}</TableCell>
        )}
        {tooltipNote.isTooltip ? (
          <Tooltip title={note}>
            <TableCell align="left">{tooltipNote.content}</TableCell>
          </Tooltip>
        ) : (
          <TableCell align="left">{note}</TableCell>
        )}
        <TableCell
          style={{
            position: 'sticky',
            right: 0,
            backgroundColor: 'white',
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
