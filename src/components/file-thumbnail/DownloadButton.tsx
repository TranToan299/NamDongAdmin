// @mui
import { useTheme } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../utils/cssStyles';
//
import Iconify from '../iconify';

// ----------------------------------------------------------------------

type Props = {
  onDownload?: VoidFunction;
};

export default function DownloadButton({ onDownload }: Props) {
  return (
    <Box
      // color="inherit"
      onClick={onDownload}
    >
      <Iconify sx={{cursor: "pointer"}} icon="eva:arrow-circle-down-fill" width={24} />
    </Box>
  );
}
