import { useDropzone } from 'react-dropzone';
import { AnimatePresence, m } from 'framer-motion';

// @mui
import { Box, Button, Grid, IconButton, Stack, StackProps, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// assets
import { UploadIllustration } from '../../assets/illustrations';
//
import Iconify from '../iconify';
//
import { useLocales } from '../../locales';
import i18n from '../../locales/i18n';
import RejectionFiles from './errors/RejectionFiles';
import MultiFilePreviewV2 from './preview/MultiFilePreviewV2';
import SingleFilePreview from './preview/SingleFilePreview';
import { UploadProps } from './types';
import { fileData } from '../file-thumbnail';
import { varFade } from '../animate';
import FileThumbnail from '../file-thumbnail/FileThumbnail';
import { fData } from '../../utils/formatNumber';

// ----------------------------------------------------------------------
const WIDTH_IMAGE = 160;
const HEIGHT_IMAGE = 160;

const StyledDropZone = styled('div')(({ theme }) => ({
  outline: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  '&:hover': {
    opacity: 0.72,
  },
}));

// ----------------------------------------------------------------------

export default function UploadV2({
  disabled,
  multiple = false,
  error,
  helperText,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  isUpload,
  limit,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled,
    ...other,
  });
  const { t } = useLocales();

  const hasFile = !!file && !multiple;

  const hasFiles = files && multiple && files.length > 0;

  const isError = isDragReject || !!error;
  if (typeof files === 'string') return <div>files is string</div>;

  return (
    <Box sx={{ width: 1, position: 'relative', ...sx }}>
      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />

      {hasFile && onDelete && (
        <IconButton
          size="small"
          onClick={onDelete}
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            position: 'absolute',
            color: (theme) => alpha(theme.palette.common.white, 0.8),
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
            },
          }}
        >
          <Iconify icon="eva:close-fill" width={18} />
        </IconButton>
      )}

      <>
        <Box sx={{ my: 3 }}>
          <AnimatePresence initial={false}>
            <Grid container>
              {files?.map((itemFile) => {
                const { key, name = '', size = 0 } = fileData(itemFile);

                const isNotFormatFile = typeof itemFile === 'string';

                if (thumbnail) {
                  return (
                    <Stack
                      key={key}
                      component={m.div}
                      {...varFade().inUp}
                      alignItems="center"
                      display="inline-flex"
                      justifyContent="center"
                      sx={{
                        m: 1,
                        width: WIDTH_IMAGE,
                        height: HEIGHT_IMAGE,
                        borderRadius: 2,
                        overflow: 'hidden',
                        position: 'relative',
                        border: (theme) => `solid 1px ${theme.palette.divider}`,
                        ...sx,
                      }}
                    >
                      <FileThumbnail
                        tooltip
                        imageView
                        file={itemFile}
                        sx={{ position: 'absolute' }}
                        imgSx={{ position: 'absolute' }}
                      />

                      {onRemove && (
                        <IconButton
                          size="small"
                          onClick={() => onRemove(itemFile)}
                          sx={{
                            top: 4,
                            right: 4,
                            p: '1px',
                            position: 'absolute',
                            color: (theme) => alpha(theme.palette.common.white, 0.72),
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                            '&:hover': {
                              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                            },
                          }}
                        >
                          <Iconify icon="eva:close-fill" width={16} />
                        </IconButton>
                      )}
                    </Stack>
                  );
                }

                return (
                  <Stack
                    key={key}
                    component={m.div}
                    {...varFade().inUp}
                    spacing={2}
                    direction="row"
                    alignItems="center"
                    sx={{
                      h: HEIGHT_IMAGE,
                      w: WIDTH_IMAGE,
                      m: 1,
                      px: 1,
                      py: 0.75,
                      borderRadius: 2,
                      border: (theme) => `solid 1px ${theme.palette.divider}`,
                      ...sx,
                    }}
                  >
                    <FileThumbnail file={itemFile} />

                    <Stack flexGrow={1} sx={{ minWidth: 0 }}>
                      <Typography variant="subtitle2" noWrap>
                        {isNotFormatFile ? itemFile : name}
                      </Typography>

                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {isNotFormatFile ? '' : fData(size)}
                      </Typography>
                    </Stack>

                    {onRemove && (
                      <IconButton edge="end" size="small" onClick={() => onRemove(itemFile)}>
                        <Iconify icon="eva:close-fill" />
                      </IconButton>
                    )}
                  </Stack>
                );
              })}
              {isUpload && (
                <StyledDropZone
                  {...getRootProps()}
                  sx={{
                    ...(isDragActive && {
                      opacity: 0.72,
                    }),
                    ...(isError && {
                      color: 'error.main',
                      bgcolor: 'error.lighter',
                      borderColor: 'error.light',
                    }),
                    ...(disabled && {
                      opacity: 0.48,
                      pointerEvents: 'none',
                    }),
                    ...(hasFile && {
                      padding: '12% 0',
                    }),
                  }}
                >
                  <input {...getInputProps()} />

                  {limit && files && files.length < limit && (
                    <Stack
                      component={m.div}
                      {...varFade().inUp}
                      alignItems="center"
                      display="inline-flex"
                      justifyContent="center"
                      sx={{
                        m: 1,
                        width: WIDTH_IMAGE,
                        height: HEIGHT_IMAGE,
                        borderRadius: 2,
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: (theme) => theme.palette.background.neutral,
                        border: (theme) => `solid 1px ${theme.palette.divider}`,
                        // border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
                        ...sx,
                      }}
                    >
                      <UploadIllustration sx={{ position: 'absolute', width: '134px' }} />
                    </Stack>
                  )}

                  {hasFile && <SingleFilePreview file={file} />}
                </StyledDropZone>
              )}
            </Grid>
          </AnimatePresence>
        </Box>

        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          {onRemoveAll && (
            <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
              {t('removeAll')}
            </Button>
          )}

          {onUpload && (
            <Button size="small" variant="contained" onClick={onUpload}>
              Upload files
            </Button>
          )}
        </Stack>
      </>
    </Box>
  );
}

// ----------------------------------------------------------------------

// function Placeholder({ sx, ...other }: StackProps) {
//   return (
//     <Stack
//       spacing={5}
//       alignItems="center"
//       justifyContent="center"
//       direction={{
//         xs: 'column',
//         md: 'row',
//       }}
//       sx={{
//         width: 1,
//         textAlign: {
//           xs: 'center',
//           md: 'left',
//         },
//         ...sx,
//       }}
//       {...other}
//     >
//       <UploadIllustration sx={{ width: 220 }} />
//     </Stack>
//   );
// }
