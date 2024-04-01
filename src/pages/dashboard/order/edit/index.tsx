import { Container } from '@mui/material';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import PageWrapper from 'components/page-wrapper';
import { useSettingsContext } from 'components/settings';
import { useLocales } from 'locales';
import { PATH_DASHBOARD } from 'routes/paths';
import { CreateOrderForm } from '../../../../sections/@dashboard/order/create';

// ----------------------------------------------------------------------

export default function EditOrderPage() {
  const { themeStretch } = useSettingsContext();
  const { t } = useLocales();



  return (
    <PageWrapper title={t('editOrder')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('editOrder')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('order'), href: PATH_DASHBOARD.app.order.order },
            { name: t('edit') },
          ]}
        />
        <CreateOrderForm isEdit />
      </Container>
    </PageWrapper>
  );
}
