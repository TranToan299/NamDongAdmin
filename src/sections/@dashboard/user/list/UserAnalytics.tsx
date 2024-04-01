import { Box, Card, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AnalyticsCurrentVisits } from 'sections/@dashboard/general/analytics';
import { AppWidgetSummary } from 'sections/@dashboard/general/app';
import { useLocales } from 'locales';
import useResponsive from 'hooks/useResponsive';

const UserAnalytics = () => {
  const theme = useTheme();
  const { t } = useLocales();
  const isDesktop = useResponsive('up', 'lg');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5} lg={5}>
        <AnalyticsCurrentVisits
          title={t('employeeByDepartment')}
          chart={{
            series: [
              { label: t('warehouseDepartment'), value: 4344 },
              { label: t('hrDepartment'), value: 5435 },
              { label: t('itDepartment'), value: 1443 },
              { label: t('financeDepartment'), value: 4443 },
              { label: t('salesDepartment'), value: 1443 },
            ],
            colors: [
              theme.palette.primary.main,
              theme.palette.info.main,
              theme.palette.error.main,
              theme.palette.warning.main,
              theme.palette.secondary.main,
            ],
          }}
        />
      </Grid>
      <Grid item xs={12} md={7} lg={7}>
        <Box sx={{ mt: 2.5 }}>
          <Typography variant="h6">{t('summaryCount')}</Typography>
        </Box>
        <Grid sx={{ mt: isDesktop ? 5 : 0 }} container spacing={3}>
          <Grid item xs={12} md={12} lg={6}>
            <AppWidgetSummary
              title={t('male')}
              percent={2.6}
              total={18765}
              chart={{
                colors: [theme.palette.primary.main],
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <AppWidgetSummary
              title={t('female')}
              percent={2.6}
              total={18765}
              chart={{
                colors: [theme.palette.primary.main],
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <AppWidgetSummary
              title={t('mosSmallerThan6')}
              percent={2.6}
              total={18765}
              chart={{
                colors: [theme.palette.primary.main],
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <AppWidgetSummary
              title={t('mosGreaterThan6')}
              percent={2.6}
              total={18765}
              chart={{
                colors: [theme.palette.primary.main],
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserAnalytics;
