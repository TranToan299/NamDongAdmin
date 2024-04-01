import { ApexOptions } from 'apexcharts';
// @mui
import DescriptionIcon from '@mui/icons-material/Description';
import { Box, Card, CardProps, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// utils
import { fNumber, fPercent } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  total: number;
  percent: number;
  chart: {
    colors?: string[];
    series: number[];
    options?: ApexOptions;
  };
  onGetData?: () => void;
}

export default function AppWidgetSummary({
  title,
  percent,
  total,
  chart,
  sx,
  onGetData,
  ...other
}: Props) {
  return (
    <Card
      onClick={onGetData}
      sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', p: 3, ...sx }}
      {...other}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ mb: 1 }} variant="subtitle2">
          {title}
        </Typography>

        <Typography variant="h3">{fNumber(total)}</Typography>
      </Box>

      <DescriptionIcon color="primary" fontSize="large" />
    </Card>
  );
}

// ----------------------------------------------------------------------

type TrendingInfoProps = {
  percent: number;
};

function TrendingInfo({ percent }: TrendingInfoProps) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
      <Iconify
        icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
        sx={{
          mr: 1,
          p: 0.5,
          width: 24,
          height: 24,
          borderRadius: '50%',
          color: 'success.main',
          bgcolor: (theme) => alpha(theme.palette.success.main, 0.16),
          ...(percent < 0 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
          }),
        }}
      />

      <Typography component="div" variant="subtitle2">
        {percent > 0 && '+'}

        {fPercent(percent)}
      </Typography>
    </Stack>
  );
}
