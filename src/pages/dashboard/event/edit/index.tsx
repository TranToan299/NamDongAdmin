import { Container } from '@mui/material';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import PageWrapper from 'components/page-wrapper';
import { useSettingsContext } from 'components/settings';
import { useLocales } from 'locales';
import { PATH_DASHBOARD } from 'routes/paths';
import { CreateEventForm } from 'sections/@dashboard/event/create';

// ----------------------------------------------------------------------

export default function EditEventPage() {
  const { themeStretch } = useSettingsContext();
  const { t } = useLocales();



  return (
    <PageWrapper title={t('editEvent')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('editEvent')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('event'), href: PATH_DASHBOARD.app.event.event },
            { name: t('edit') },
          ]}
        />
        <CreateEventForm isEdit />
      </Container>
    </PageWrapper>
  );
}
