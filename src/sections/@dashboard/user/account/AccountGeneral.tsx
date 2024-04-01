import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'redux/store';
import { setSession } from 'auth/utils';

// form
import { useLocales } from 'locales';
import { useForm } from 'react-hook-form';

import { Utils } from 'utils/utils';

// @mui
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Grid, Tab, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
// utils
import { fData } from '../../../../utils/formatNumber';
// assets
// components
import FormProvider, { RHFSwitch, RHFUploadAvatar } from '../../../../components/hook-form';
import { useSnackbar } from '../../../../components/snackbar';

// ----------------------------------------------------------------------

const TAB_VALUES = {
  basic: 'Basic',
  contact: 'contact',
  banking: 'banking',
  insurance: 'insurance',
  incomeTax: 'incomeTax',
  profile: 'profile',
  activityStatus: 'activityStatus',
  laborContract: 'laborContract',
  employeeSignUp: 'employeeSignUp',
};

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const { user, logout } = useAuthContext();
  const [tab, setTab] = useState(TAB_VALUES.basic);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const methods = useForm<any>({
    defaultValues: {},
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const handleDrop = useCallback(
  //   async (acceptedFiles: File[]) => {
  //     const file = acceptedFiles[0];
  //     const url = await Utils.uploadFile(file, 'image');
  //     setValue('avatar_url', url, { shouldValidate: true });
  //     await EmployeeApi.uploadAvatar(user?.userName, { avatar: url });
  //     const { data } = await EmployeeApi.refreshToken({
  //       accessToken: localStorage.getItem('accessToken'),
  //       refreshToken: user?.refreshToken,
  //     });
  //     setSession(data.token);
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [setValue]
  // );

  useEffect(() => {
    if (user) {
      setValue('avatar_url', user?.avatar);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = () => {};

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFUploadAvatar
              name="avatar_url"
              maxSize={3145728}
              // onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

            <RHFSwitch
              name="isPublic"
              labelPlacement="start"
              label={t('publicProfile')}
              sx={{ mt: 5 }}
            />
          </FormProvider>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label={t('basic')} value={TAB_VALUES.basic} />
                <Tab label={t('contactInfo')} value={TAB_VALUES.contact} />
                <Tab label={t('bankingInfo')} value={TAB_VALUES.banking} />
                <Tab label={t('profileInformation')} value={TAB_VALUES.profile} />

                {/* {isEdit && <Tab label={t('employeeSignUp')} value={TAB_VALUES.employeeSignUp} />} */}
              </TabList>
            </Box>

          </TabContext>
        </Card>
      </Grid>
    </Grid>
  );
}
