import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Container, Tab, Tabs } from '@mui/material';
// routes
import { useLocales } from 'locales';
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import Iconify from '../../components/iconify';
import { useSettingsContext } from '../../components/settings';
// sections
import {
  AccountGeneral,
  AccountNotifications,
} from '../../sections/@dashboard/user/account';

// ----------------------------------------------------------------------

export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();
  const [currentTab, setCurrentTab] = useState('general');
  const { t } = useLocales();

  const TABS = [
    {
      value: 'general',
      label: t('general'),
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral />,
    },
    {
      value: 'notifications',
      label: t('notifications'),
      icon: <Iconify icon="eva:bell-fill" />,
      component: <AccountNotifications />,
    },
    // {
    //   value: 'changePassword',
    //   label: t('changePassword'),
    //   icon: <Iconify icon="ic:round-vpn-key" />,
    //   component: <AccountChangePassword />,
    // },
  ];

  return (
    <>
      <Helmet>
        <title> User: Account Settings | Nam Đông</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('account')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('user'), href: PATH_DASHBOARD.user.root },
            { name: t('accountSettings') },
          ]}
        />

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
