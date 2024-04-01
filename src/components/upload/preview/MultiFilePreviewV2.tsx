import { m, AnimatePresence } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
//
import Iconify from '../../iconify';
import { varFade } from '../../animate';
import FileThumbnail, { fileData } from '../../file-thumbnail';
//
import { UploadProps } from '../types';
import { UploadIllustration } from '../../../assets/illustrations';

// ----------------------------------------------------------------------

export default function MultiFilePreviewV2({ thumbnail, files, onRemove, sx }: UploadProps) {
  if (!files?.length) {
    return null;
  }

  return (
    <AnimatePresence initial={false}>
      <Grid container>
        {files.map((file) => {
          const { key, name = '', size = 0 } = fileData(file);

          const isNotFormatFile = typeof file === 'string';

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
                  m: 0.5,
                  width: 80,
                  height: 80,
                  borderRadius: 1.25,
                  overflow: 'hidden',
                  position: 'relative',
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                  ...sx,
                }}
              >
                <FileThumbnail
                  tooltip
                  imageView
                  file={file}
                  sx={{ position: 'absolute' }}
                  imgSx={{ position: 'absolute' }}
                />

                {onRemove && (
                  <IconButton
                    size="small"
                    onClick={() => onRemove(file)}
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
                my: 1,
                px: 1,
                py: 0.75,
                borderRadius: 0.75,
                border: (theme) => `solid 1px ${theme.palette.divider}`,
                ...sx,
              }}
            >
              <FileThumbnail file={file} />

              <Stack flexGrow={1} sx={{ minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap>
                  {isNotFormatFile ? file : name}
                </Typography>

                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {isNotFormatFile ? '' : fData(size)}
                </Typography>
              </Stack>

              {onRemove && (
                <IconButton edge="end" size="small" onClick={() => onRemove(file)}>
                  <Iconify icon="eva:close-fill" />
                </IconButton>
              )}
            </Stack>
          );
        })}
        <Stack
          component={m.div}
          {...varFade().inUp}
          alignItems="center"
          display="inline-flex"
          justifyContent="center"
          sx={{
            m: 0.5,
            width: 80,
            height: 80,
            borderRadius: 1.25,
            overflow: 'hidden',
            position: 'relative',
            border: (theme) => `solid 1px ${theme.palette.divider}`,
            ...sx,
          }}
        >
          <UploadIllustration sx={{ position: 'absolute' }} />
        </Stack>
      </Grid>
    </AnimatePresence>
  );
}

function Placeholder({ sx, ...other }: any) {
  return (
    <Stack
      spacing={5}
      alignItems="center"
      justifyContent="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{
        width: 1,
        textAlign: {
          xs: 'center',
          md: 'left',
        },
        ...sx,
      }}
      {...other}
    >
      <UploadIllustration sx={{ width: 220 }} />

      <div>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {/* {i18n.t('dropSelectHere')} */}

          {/* Drop files here or click */}
          <Typography
            variant="body2"
            component="span"
            sx={{
              mx: 0.5,
              color: 'primary.main',
              textDecoration: 'underline',
            }}
          >
            {/* browse */}
          </Typography>
          {/* thorough your machine */}
        </Typography>
      </div>
    </Stack>
  );
}
