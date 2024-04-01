import { Container } from '@mui/material';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import PageWrapper from 'components/page-wrapper';
import { useSettingsContext } from 'components/settings';
import { useLocales } from 'locales';
import { PATH_DASHBOARD } from 'routes/paths';
import { CreateProductForm } from 'sections/@dashboard//product/create';

// ----------------------------------------------------------------------

export default function CreateProductPage() {
  const { themeStretch } = useSettingsContext();
  const { t } = useLocales();

  return (
      <PageWrapper title={t('createProduct')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={t('createProduct')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('product'), href: PATH_DASHBOARD.app.product.product},
              { name: t('create') },
            ]}
          />
         <CreateProductForm/>
        </Container>
      </PageWrapper>
  );
}
