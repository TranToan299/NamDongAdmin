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
import Image from 'components/image/Image';
// components

import { IEvent } from '../../../../@types/event';
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { Utils } from '../../../../utils/utils';
import { ITooltip } from '../../../../@types/tooltip';

// ----------------------------------------------------------------------
type Props = {
  row: IEvent;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function EventTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { t } = useLocales();
  const { id, description, isPublish, name, thumbnail, type, typeName } = row;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [tooltipDescription, setTooltipDescription] = useState<ITooltip>({
    isTooltip: false,
    content: '',
  });

  useEffect(() => {
    if (description) {
      Utils.setTooltip(description, setTooltipDescription);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <TableCell align="left">{name}</TableCell>
        <TableCell align="left">{typeName}</TableCell>
        {/* <TableCell align="left">{isActive ? i18n.t<string>('hasActive'): i18n.t<string>('noneActive') }</TableCell> */}
        <TableCell align="left">
          {isPublish ? i18n.t<string>('hasPublic') : i18n.t<string>('nonePublic')}
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
        {/* <TableCell align="left">{fDate(createdAt)}</TableCell> */}
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
