import { Box, Stack, SxProps, Tooltip } from '@mui/material';
import { Theme } from '@mui/material/styles';
//
import DownloadButton from './DownloadButton';
import { fileData, fileFormat, fileThumb } from './utils';

// ----------------------------------------------------------------------

type FileIconProps = {
  file: File | string;
  tooltip?: boolean;
  imageView?: boolean;
  onDownload?: VoidFunction;
  sx?: SxProps<Theme>;
  imgSx?: SxProps<Theme>;
};

export default function FileThumbnail({
  file,
  tooltip,
  imageView,
  onDownload,
  sx,
  imgSx,
}: FileIconProps) {
  const { name = '', path = '', preview = '' } = fileData(file);

  const format = fileFormat(path || preview);

  const renderContent =
    format === 'image' && imageView ? (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box
          onClick={() => {
        
            window.open(preview)
          }}
          component="img"
          src={preview}
          sx={{
            width: 1,
            height: 1,
            flexShrink: 0,
            objectFit: 'cover',
            cursor: 'pointer',
            ...imgSx,
          }}
        />
        {onDownload && (
          <Box>
            <DownloadButton onDownload={onDownload} />
          </Box>
        )}
      </Box>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box
          component="img"
          src={fileThumb(format)}
          sx={{
            width: 32,
            height: 32,
            flexShrink: 0,
            cursor: 'pointer',
            ...sx,
          }}
        />
        {onDownload && (
          <Box>
            <DownloadButton onDownload={onDownload} />
          </Box>
        )}
      </Box>
    );

  if (tooltip) {
    return (
      <Tooltip title={name}>
        <Stack
          flexShrink={0}
          component="span"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 'fit-content',
            height: 'inherit',
          }}
        >
          {renderContent}
          {onDownload && <DownloadButton onDownload={onDownload} />}
        </Stack>
      </Tooltip>
    );
  }

  return <>{renderContent}</>;
}
