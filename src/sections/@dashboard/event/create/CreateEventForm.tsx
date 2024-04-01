import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useLocales } from 'locales';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '../../../../components/hook-form';
import { useSnackbar } from '../../../../components/snackbar';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { dispatch, useSelector } from '../../../../redux/store';
import { IEventCreated, IEventForm } from '../../../../@types/event';
import EventFormInfo from './EventFormInfo';
import { createEvent, getEventDetail } from '../../../../redux/slices/dashboard/event';
import { EventFormSchema } from '../../../../utils/schemas';
import { Utils } from '../../../../utils/utils';
import { S3_PROJECT } from '../../../../constants/app.constants';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
};

export default function CreateEventForm({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const { eventDetail } = useSelector((state) => state.event);
  const [editValue, setEditValue] = useState('');

  const defaultValues: IEventForm = {
    name: '',
    description: '',
    isPublish: false,
    thumbnail: '',
    type: '',
    // isActive: true,
    // content: '',
  };

  const methods = useForm<IEventForm>({
    resolver: yupResolver(EventFormSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    if (isEdit && eventDetail) {
      const { name, content, description, isPublish, thumbnail, type } = eventDetail;
      reset({
        name,
        content,
        description,
        isPublish,
        thumbnail,
        type,
      });
      if(content) setEditValue(content);
    }else{
      reset(defaultValues);
      setEditValue('');      
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, eventDetail]);

  const getDetailEvent = async (id: number) => {
    await dispatch(getEventDetail(id));
  };

  useEffect(() => {
    if (params.id) {
      getDetailEvent(Number.parseInt(params.id, 10));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const onSubmit = async (data: IEventForm) => {
    let urlFile: string | undefined | null;
    if (isEdit) {
      const isChangeImage = data.thumbnail === eventDetail.thumbnail;
      if (!isChangeImage) {
        if (eventDetail.thumbnail) {
          await Utils.deleteFile(eventDetail.thumbnail, 'images', S3_PROJECT);
          if (data.thumbnail) {
            urlFile = await Utils.uploadFile(data.thumbnail, 'images');
          } else {
            urlFile = '';
          }
        } else {
          urlFile = await Utils.uploadFile(data.thumbnail, 'images');
        }
      } else {
        urlFile = data.thumbnail;
      }
    } else if (data.thumbnail) {
      urlFile = await Utils.uploadFile(data.thumbnail, 'images');
    }
    data.thumbnail = urlFile;

    const dataApi: IEventCreated = {
      id: isEdit ? eventDetail.id : 0,
      ...data,
      content: editValue,
    };

    const action = createEvent({
      data: dataApi,
      navigate: () => {
        navigate(PATH_DASHBOARD.app.event.event);
      },
    });
    dispatch(action);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <EventFormInfo
            methods={methods}
            editValue={editValue}
            setEditValue={setEditValue}
          />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.app.event.event)}
                  type="submit"
                  variant="outlined"
                >
                  {t('back')}
                </LoadingButton>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? t('create') : t('save')}
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
