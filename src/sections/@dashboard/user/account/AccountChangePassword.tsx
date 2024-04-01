import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLocales } from 'locales';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @types
import { useAuthContext } from 'auth/useAuthContext';
import { IUserAccountChangePassword } from '../../../../@types/user';
// components
import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------
type FormValuesProps = IUserAccountChangePassword;

export default function AccountChangePassword() {
  const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/;
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const { user, logout } = useAuthContext();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required(t('validate.employee.oldPasswordRequired')),
    newPassword: Yup.string()
      .required(t('validate.employee.password'))
      .matches(passwordReg, t('validate.employee.passwordInvalid'))
      .test(
        'no-match',
        t('validate.employee.newPasswordInvalid'),
        (value, { parent }) => value !== parent.oldPassword
      ),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')],  t('validate.employee.verifyPasswordInvalid')),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // await EmployeeApi.changePassword({
      //   UserName:user?.userName,
      //   OldPassword:data.oldPassword,
      //   NewPassword: data.newPassword
      // })

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Stack spacing={3} alignItems="flex-end" sx={{ p: 3 }}>
          <RHFTextField name="oldPassword" type="password" label={t('oldPassword')} />

          <RHFTextField
            name="newPassword"
            type="password"
            label={t('newPassword')}
          />

          <RHFTextField name="confirmNewPassword" type="password" label={t('confirmNewPassword')}/>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {t('saveChanges')}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
