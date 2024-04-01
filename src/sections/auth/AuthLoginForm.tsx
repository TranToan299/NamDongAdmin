import { useState } from 'react';
import * as Yup from 'yup';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';

// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Link, Stack } from '@mui/material';
import { useLocales } from 'locales';

// routes
import { PATH_AUTH } from '../../routes/paths';
// auth
import { useSnackbar } from '../../components/snackbar';

import { useAuthContext } from '../../auth/useAuthContext';
// components
import FormProvider, { RHFTextField } from '../../components/hook-form';
import Iconify from '../../components/iconify';

import SnakeBar from '../../utils/snackbar';

// ----------------------------------------------------------------------

type FormValuesProps = {
  userName: string;
  password: string;
};

export default function AuthLoginForm() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    userName: Yup.string().required(t('validate.auth.usernameRequired')),
    password: Yup.string().required(t('validate.auth.passwordRequired')),
  });

  const defaultValues = {
    userName: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const successNoti = () => {
    enqueueSnackbar('This is an default', {
      variant: 'error',
    });
  };

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await login(data.userName, data.password);
    } catch (error) {
      SnakeBar.error(i18next.t('loginFailed'));
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="userName" label={t('username')} />

        <RHFTextField
          name="password"
          label={t('password')}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        {/* <Link
          component={RouterLink}
          to={PATH_AUTH.resetPassword}
          variant="body2"
          color="inherit"
          underline="always"
        >
          {i18next.t('forgotPassword')}
        </Link> */}
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        {i18next.t('login')}
      </LoadingButton>
    </FormProvider>
  );
}
