import { LoadingButton } from '@mui/lab';
import { Box, Card } from '@mui/material';
import { Stack } from '@mui/system';
import { useLocales } from 'locales';
import React from 'react';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';

type Props = {
  isEdit?: any;
  isSubmitting?: boolean;
  disabled?: boolean;
};

const CreateComponent = ({ isEdit, isSubmitting, disabled = false }: Props) => {
  const { t } = useLocales();
  const navigate = useNavigate();

  return (
    <Card sx={{ px: 3, py: 1, mt: 3 }}>
      <Stack alignItems="flex-end">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LoadingButton
            type="submit"
            variant="outlined"
          >
            {t('back')}
          </LoadingButton>

          <LoadingButton
            disabled={disabled}
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t('saveInfo')}
          </LoadingButton>
        </Box>
      </Stack>
    </Card>
  );
};

export default CreateComponent;
