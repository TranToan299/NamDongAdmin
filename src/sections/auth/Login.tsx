import i18next from 'i18next';
// @mui
import { Stack, Typography } from '@mui/material';
// auth
// routes
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';

// ----------------------------------------------------------------------

export default function Login() {

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">{i18next.t('signInTo')} Nam Dong</Typography>
      </Stack>
      <AuthLoginForm />

    </LoginLayout>
  );
}
