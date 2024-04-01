import { Box, Card, Grid, MenuItem, Typography } from '@mui/material';
import { RHFCheckbox, RHFSelect, RHFTextField, RHFUpload } from 'components/hook-form';

import { useLocales } from 'locales';
import { useCallback, useEffect } from 'react';
import { dispatch, useSelector } from 'redux/store';
import TextEditor from '../../../../components/common/TextEditor';
import { getObjectTypeEvent } from '../../../../redux/slices/dashboard/event';

type Props = {
  methods?: any;
  editValue?: any;
  setEditValue?: any;
};

const EventFormInfo = ({ methods, setEditValue, editValue }: Props) => {
  const { watch, setValue } = methods;
  const values = watch();
  const { t } = useLocales();
  const eventType = useSelector((state) => state.event.eventType);
  const handleDropSingleFile = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      const urlFile = file;
      if (newFile) {
        setValue('thumbnail', urlFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  const handleGetEventType = async () => {
    await dispatch(getObjectTypeEvent('eventType'));
  };
  useEffect(() => {
    handleGetEventType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="name" isRequired label={t('eventName')} />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <RHFSelect
              inputColor="#000"
              placeholderColor="#000"
              // backgroundColor="#F6D2CB"
              isRequired
              name="type"
              label={t('eventType')}
              placeholder={t('eventType')}
            >
              {eventType?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.objectName}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="description" isRequired label={t('description')} />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="body1">{t('thumbnail')}
            <span style={{color: "red"}}> *</span>
            </Typography>
            <RHFUpload
              name="thumbnail"
              maxSize={3145728}
              onDrop={handleDropSingleFile}
              onDelete={() => setValue('thumbnail', null, { shouldValidate: true })}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <TextEditor initValue={editValue} setEditorValue={setEditValue} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={2}>
            <RHFCheckbox name="isPublish" label={t('isPublish')} />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default EventFormInfo;
