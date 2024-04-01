import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { LoadingButton } from '@mui/lab';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { width } from '@mui/system';
import { fileFormat } from 'components/file-thumbnail';
import Iconify from 'components/iconify/Iconify';
import Image from 'components/image/Image';

import { useLocales } from 'locales';
import { useState } from 'react';
import { Utils } from 'utils/utils';

type Props = {
  dirName?: string;
  setFileUrl: (value: any) => void;
  fileUrl: any;
  fileNameUpload?: string;
  typeFile?: any;
  setTypeFile?: any;
};

const UploadFile = ({
  dirName = 'test',
  fileUrl,
  setFileUrl,
  fileNameUpload,
  typeFile = 'pdf',
  setTypeFile,
}: Props) => {
  const { t } = useLocales();
  const [loading, setLoading] = useState<boolean>(false);
  const handleUpload = async (file: any) => {
    setLoading(true);
    try {
      const url = await Utils.uploadFile(file, dirName);
      console.log(url);
      if (setTypeFile) {
        setTypeFile(fileFormat(url));
      }
      setFileUrl(url);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenFile = () => {
    window.open(fileUrl);
  };

  const handleDeleteFile = () => {
    setFileUrl('');
  };

  return (
    <Box>
      {fileUrl && typeFile === 'image' ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Image sx={{ mt: 1.5, borderRadius: '10px' }} src={fileUrl} />

          <Tooltip onClick={handleDeleteFile} title={t('delete')}>
            <IconButton sx={{ width: '50px', height: '50px' }}>
              <HighlightOffIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        ''
      )}
      {fileUrl && typeFile !== 'image' ? (
        <Box sx={{ mt: 1, display: 'flex', gap: 0.5, alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'flex-end' }}>
            <InsertDriveFileIcon />
            <Typography
              onClick={handleOpenFile}
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
              variant="body2"
            >
              {t(fileNameUpload)}
            </Typography>
          </Box>
          <Tooltip onClick={handleDeleteFile} title={t('delete')}>
            <IconButton>
              <HighlightOffIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        ''
      )}

      {!fileUrl ? (
        <LoadingButton
          loading={loading}
          sx={{ maxWidth: 200, mt: 2 }}
          component="label"
          variant="outlined"
        >
          <input onChange={(e) => handleUpload(e.target.files?.[0])} multiple hidden type="file" />
          <Iconify sx={{ mr: 1 }} icon="eva:cloud-upload-fill" />
          {t('uploadedInformation')}
        </LoadingButton>
      ) : (
        ''
      )}
    </Box>
  );
};

export default UploadFile;
