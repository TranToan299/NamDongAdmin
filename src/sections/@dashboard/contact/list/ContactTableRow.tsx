import { useEffect, useState } from 'react';

import { useLocales } from 'locales';
// @mui
import {
  Box,
  Checkbox,
  Drawer,
  IconButton,
  List,
  ListItem,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  alpha,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useTheme } from '@mui/system';
import { Image } from '@mui/icons-material';

// components

import { IContact } from '../../../../@types/contact';
import Iconify from '../../../../components/iconify';
import { NAV } from '../../../../config-global';
import { bgBlur } from '../../../../utils/cssStyles';
import i18n from '../../../../locales/i18n';
import { ITooltip } from '../../../../@types/tooltip';
import { Utils } from '../../../../utils/utils';
import attach from '../../../../assets/images/attach.png';
// ----------------------------------------------------------------------
type Props = {
  row: IContact;
  selected: boolean;
  // onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
};

export default function ContactTableRow({
  row,
  selected,
  // onEditRow,
  onSelectRow,
}: Props) {
  const { t } = useLocales();
  const { fullName, phoneNumber, email, note, attach_url } = row;
  let listAttach: string[] = [];
  if (attach_url) listAttach = attach_url?.split(',');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [tooltipNote, setTooltipNote] = useState<ITooltip>({
    isTooltip: false,
    content: '',
  });
  const theme = useTheme();
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  useEffect(() => {
    if (note) {
      Utils.setTooltip(note, setTooltipNote);
    }
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
        {tooltipNote.isTooltip ? (
          <Tooltip title={note}>
            <TableCell align="left">{tooltipNote.content}</TableCell>
          </Tooltip>
        ) : (
          <TableCell align="left">{note}</TableCell>
        )}

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
          <IconButton color={openConfirm ? 'inherit' : 'default'} onClick={handleOpenConfirm}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Drawer
        anchor="right"
        open={openConfirm}
        onClose={handleCloseConfirm}
        BackdropProps={{ invisible: true }}
        PaperProps={{
          sx: {
            ...bgBlur({ color: theme.palette.background.default, opacity: 0.9 }),
            width: NAV.W_BASE,
            boxShadow: `-24px 12px 40px 0 ${alpha(
              theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
              0.16
            )}`,
            paddingBlock: 10,
            paddingInline: 5,
          },
        }}
      >
        <Typography variant="h5" paragraph>
          {t('attach')}
        </Typography>
        {listAttach && listAttach.length > 0 ? (
          <List>
            {listAttach.map((url, index) => {
              const name = `${i18n.t('file')} ${index + 1}`;

              return (
                <ListItem disablePadding>
                  <Typography
                    paragraph
                    className="clampText"
                    sx={{
                      textDecoration: 'underline',
                      '-webkit-text-fill-color': 'transparent',
                      background: 'linear-gradient(90.21deg,#090979 -5.91%,#0050b5 111.58%)',
                      '-webkit-background-clip': 'text',
                      'background-clip': 'text',
                    }}
                    alignItems="center"
                    alignContent="center"
                    display="flex"
                  >
                    <AttachFileIcon
                      sx={{
                        width: 20,
                        rotate: '30deg',
                        color: '#0050b5',
                      }}
                    />
                    <a
                      target="_blank"
                      href={url}
                      rel="noreferrer"
                      style={{ marginLeft: 10,  textDecoration: 'underline !important'}}
                    >
                      {name}
                    </a>
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Box
            mt={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <img style={{ width: 50 }} src={attach} alt="attach" />
            <Typography
              variant="subtitle1"
              paragraph
              sx={{
                '-webkit-text-fill-color': 'transparent',
                background: 'linear-gradient(90.21deg,#090979 -5.91%,#0050b5 111.58%)',
                '-webkit-background-clip': 'text',
                'background-clip': 'text',
              }}
            >
              {t('noFile')}
            </Typography>
          </Box>
        )}
      </Drawer>
    </>
  );
}
