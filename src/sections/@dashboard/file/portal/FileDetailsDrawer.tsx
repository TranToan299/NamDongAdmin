import { useState } from 'react';
import { dispatch, useSelector } from 'redux/store';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  DrawerProps,
  IconButton,
  Stack,
  StackProps,
  Typography,
} from '@mui/material';
import { useLocales } from 'locales';
// utils
import useResponsive from 'hooks/useResponsive';
import { Utils } from 'utils/utils';
import { fData } from '../../../../utils/formatNumber';
import { fDateTime } from '../../../../utils/formatTime';
// @types
import { IFile } from '../../../../@types/file';
// components

import FileThumbnail, { fileFormat, fileTypeByUrl } from '../../../../components/file-thumbnail';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
//

import FileNewFolderDialog from './FileNewFolderDialog';

// ----------------------------------------------------------------------

interface Props extends DrawerProps {
  item: IFile;
  favorited?: boolean;
  //
  onFavorite?: VoidFunction;
  onCopyLink: VoidFunction;
  //
  onClose: VoidFunction;
  onDelete: VoidFunction;
  employeeId?: any;
}

export default function FileDetailsDrawer({
  open,
  favorited,
  //
  onFavorite,
  onCopyLink,
  onClose,
  onDelete,
  employeeId,
  ...other
}: Props) {
  const { t } = useLocales();
  const [loading, setLoading] = useState<boolean>(false);



  const isMobile = useResponsive('down', 'sm');
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const handleUpload = async (e: any, item: any) => {
    setLoading(true);

  };
  const dummyData = [
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12_files',
      name: 'Bản cam kết',
      size: 4000000,
      type: 'docx',
      isFavorited: true,
      shared: [],
      url: '',
      tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
      dateCreated: '2023-04-10T01:36:22.468Z',
      dateModified: '2023-04-10T01:36:22.468Z',
    },

    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12_files',
      name: 'Đơn thôi việc',
      size: 4000000,
      type: 'docx',
      isFavorited: true,
      shared: [],
      url: '',
      tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
      dateCreated: '2023-04-10T01:36:22.468Z',
      dateModified: '2023-04-10T01:36:22.468Z',
    },

    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12_files',
      name: 'Bảng ký HĐTV',
      size: 4000000,
      type: 'docx',
      isFavorited: true,
      shared: [],
      url: '',
      tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
      dateCreated: '2023-04-10T01:36:22.468Z',
      dateModified: '2023-04-10T01:36:22.468Z',
    },

    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12_files',
      name: 'Bảng ký HĐLĐ lần 1',
      size: 4000000,
      type: 'docx',
      isFavorited: true,
      shared: [],
      url: '',
      tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
      dateCreated: '2023-04-10T01:36:22.468Z',
      dateModified: '2023-04-10T01:36:22.468Z',
    },

    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12_files',
      name: 'Bảng ký HĐLĐ lần 2',
      size: 4000000,
      type: 'docx',
      isFavorited: true,
      shared: [],
      url: '',
      tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
      dateCreated: '2023-04-10T01:36:22.468Z',
      dateModified: '2023-04-10T01:36:22.468Z',
    },

    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12_files',
      name: 'Bảng ký HĐLĐ lần 3',
      size: 4000000,
      type: 'docx',
      isFavorited: true,
      shared: [],
      url: '',
      tags: ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'],
      dateCreated: '2023-04-10T01:36:22.468Z',
      dateModified: '2023-04-10T01:36:22.468Z',
    },
  ];

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      BackdropProps={{
        invisible: true,
      }}
      PaperProps={{
        sx: { width: isMobile ? 320 : 400 },
      }}
      {...other}
    >
      <Scrollbar sx={{ height: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
          <Typography variant="h6"> {t('profile')} </Typography>
          <Checkbox
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorited}
            onChange={onFavorite}
            sx={{ p: 0.75 }}
          />
        </Stack>

        {dummyData?.map((item) => {
          if (item?.url?.includes('https')) {
            return (
              <Stack
                spacing={2.5}
                justifyContent="center"
                sx={{ p: 2.5, bgcolor: 'background.neutral', mb: 1 }}
              >
                <FileThumbnail
                  onDownload={() => window.open(item.url)}
                  imageView
                  file={item.type === 'folder' ? item.type : item.url}
                  sx={{ width: 64, height: 64 }}
                  imgSx={{ borderRadius: 1 }}
                />
                <Typography variant="h6" sx={{ wordBreak: 'break-all' }}>
                  {t(item.name)}
                </Typography>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Stack spacing={1.5}>
                  {/* <Row label="Size" value={fData(item.size)} />

                  <Row label="Modified" value={fDateTime(item.dateModified)} /> */}

                  <Row label="Type" value={fileFormat(item.type)} />
                </Stack>
              </Stack>
            );
          }
          return (
            <Stack
              spacing={2.5}
              justifyContent="center"
              sx={{ p: 2.5, bgcolor: 'background.neutral', mb: 1 }}
            >
              <Typography variant="h6" sx={{ wordBreak: 'break-all' }}>
                {t(item.name)}
              </Typography>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <LoadingButton
                loading={loading}
                sx={{ maxWidth: 200, mt: 2 }}
                component="label"
                variant="outlined"
              >
                <input onChange={(e) => handleUpload(e, item)} multiple hidden type="file" />
                <Iconify sx={{ mr: 1 }} icon="eva:cloud-upload-fill" />
                {t('uploadedInformation')}
              </LoadingButton>
            </Stack>
          );
        })}
      </Scrollbar>
      {/* 
      <Box sx={{ p: 2.5 }}>
        <Button
          fullWidth
          variant="soft"
          color="primary"
          size="large"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setOpenUploadFile(true)}
        >
          {t('addNew')}
        </Button>
      </Box> */}

      <FileNewFolderDialog open={openUploadFile} onClose={() => setOpenUploadFile(false)} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

interface PanelProps extends StackProps {
  label: string;
  toggle: boolean;
  onToggle: VoidFunction;
}

function Panel({ label, toggle, onToggle, ...other }: PanelProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" {...other}>
      <Typography variant="subtitle2"> {label} </Typography>

      <IconButton size="small" onClick={onToggle}>
        <Iconify icon={toggle ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
      </IconButton>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type RowProps = {
  label: string;
  value: string;
};

function Row({ label, value = '' }: RowProps) {
  return (
    <Stack
      direction="row"
      sx={{
        typography: 'caption',
        textTransform: 'capitalize',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
        {label}
      </Box>

      {value}
    </Stack>
  );
}
