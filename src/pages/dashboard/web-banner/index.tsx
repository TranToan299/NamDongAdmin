import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Container, Grid, IconButton, Stack, Tooltip } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/system';
import PageWrapper from 'components/page-wrapper';
import { useLocales } from 'locales';
import { useFieldArray, useForm } from 'react-hook-form';

import { IProjectImage, IRenderProjectImage } from '../../../@types/projectImage';
import ConfirmDialog from '../../../components/confirm-dialog/ConfirmDialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import EmptyContent from '../../../components/empty-content/EmptyContent';
import { RHFTextField } from '../../../components/hook-form';
import FormProvider from '../../../components/hook-form/FormProvider';
import { RHFUploadV2 } from '../../../components/hook-form/RHFUploadV2';
import Iconify from '../../../components/iconify/Iconify';
import { useSettingsContext } from '../../../components/settings';
import { CustomFile } from '../../../components/upload';
import { S3_PROJECT } from '../../../constants/app.constants';
import {
  deleteProjectImage,
  getListBannerImage,
  updateProjectImage,
} from '../../../redux/slices/dashboard/projectImage';
import { dispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { ProjectImageFormSchema } from '../../../utils/schemas';
import { Utils } from '../../../utils/utils';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function WebBannerPage() {
  const { t } = useLocales();
  const theme = useTheme();
  const navigate = useNavigate();

  const ERROR_MAIN = theme.palette.error.main;
  const { themeStretch } = useSettingsContext();

  // store
  const { listBannerImage } = useSelector((state) => state.projectImage);
  //

  // State
  const [confirmDelete, setConfirmDelete] = useState<{
    isOpen: boolean;
    projectImageId: number | null;
    id: number | null;
  }>({ isOpen: false, projectImageId: null, id: null });
  const [selectedProjectImage, setSelectedProjectImage] = useState<IProjectImage | null>(null);
  const [listImageDeleted, setListImageDeleted] = useState<string[]>([]);
  //

  const defaultValues: { projectImage: IProjectImage[] | [] } = {
    projectImage: [],
  };

  const methods = useForm({
    resolver: yupResolver(ProjectImageFormSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { fields, prepend, remove } = useFieldArray({
    keyName: 'projectImageId',
    control,
    name: 'projectImage',
  });

  const convertImageHandle = async (data: (string | CustomFile)[]) => {
    // handle upload file to server
    const listPromise: Promise<string | null>[] = [];
    data.forEach(async (image: string | CustomFile) => {
      if (typeof image !== 'string') {
        listPromise.push(uploadImage(image));
      }
    });
    const listImage = await Promise.all(listPromise);
    const imagesArr = [...data.filter((item) => typeof item === 'string'), ...listImage];

    // change array to string join ','
    const images = imagesArr.join(',');
    return images;
  };

  const uploadImage = async (file: File) => {
    const url = await Utils.uploadFile(file, 'images');
    return url;
  };

  const onSubmit = async (data: { projectImage: IProjectImage[] }) => {
    if (listImageDeleted.length) {
      listImageDeleted.forEach(async (image) => {
        await Utils.deleteFile(image, 'images', S3_PROJECT);
      });
    }

    const dataSubmit: any[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const item of data.projectImage) {
      const images = await convertImageHandle(item.images);
      dataSubmit.push({
        ...item,
        images,
        type: 'homeBanners',
      });
    }

    if (dataSubmit.length) {
      await dispatch(updateProjectImage(dataSubmit));
      await dispatch(
        getListBannerImage({
          type: 'homeBanners',
        })
      );
    }
    handleCloseConfirm();
  };

  const values = watch();

  const handleOpenConfirm = (projectImageId: number, id: number, field: any) => {
    setConfirmDelete({
      isOpen: true,
      projectImageId,
      id,
    });
    setSelectedProjectImage(field);
  };

  const handleCloseConfirm = () => {
    setConfirmDelete({
      isOpen: false,
      projectImageId: null,
      id: null,
    });
    setSelectedProjectImage(null);
  };

  const removeProjectImageHandle = async (index: number) => {
    if (!index) {
      remove(confirmDelete.projectImageId ?? 0);
      return;
    }
    await dispatch(deleteProjectImage(index));
    // Remove on service
    if (!selectedProjectImage) return;
    const { images } = selectedProjectImage;

    images.forEach(async (image) => {
      if (typeof image === 'string') {
        await Utils.deleteFile(image, 'images', S3_PROJECT);
      }
    });
    await dispatch(
      getListBannerImage({
        type: 'homeBanners',
      })
    );
  };

  const handleDropMultiFile = useCallback(
    async (acceptedFiles: File[], index: number) => {
      const files = values.projectImage[index].images || [];
      const newFiles = acceptedFiles.map((file) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });
      setValue(`projectImage.${index}.images`, [...files, ...newFiles], { shouldValidate: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, values.projectImage]
  );

  const addProjectImageHandle = () => {
    prepend({
      id: 0,
      name: '',
      description: '',
      images: [],
      type: null,
    });
  };

  const removeImageHandle = (file: string | CustomFile, index: number) => {
    if (typeof file === 'string') {
      setListImageDeleted([...listImageDeleted, file]);
    }
    const newImages: (string | CustomFile)[] = values.projectImage[index].images.filter(
      (item) => item !== file
    );
    setValue(`projectImage.${index}.images`, newImages, { shouldValidate: true });
  };

  const getListProjectImageHandle = () => {
    dispatch(
      getListBannerImage({
        type: 'homeBanners',
      })
    );
  };

  useEffect(() => {
    if (listBannerImage) {
      // handle change images from string to array
      const listProjectImageTemp = listBannerImage.map((item: IRenderProjectImage) => {
        const images = item.images.split(',');
        return {
          ...item,
          images,
        };
      });

      reset({ projectImage: listProjectImageTemp });
    } else {
      reset(defaultValues);
    }
  }, [listBannerImage]);

  useEffect(() => {
    if (!listBannerImage.length) {
      getListProjectImageHandle();
    }
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <PageWrapper title={t('projectImage')}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={t('settingBanner')}
            links={[
              { name: t('dashboard'), href: PATH_DASHBOARD.root },
              { name: t('Banner'), href: PATH_DASHBOARD.app.webBanner.webBanner },
              { name: t('list') },
            ]}
            action={
              <Button
                variant="contained"
                onClick={addProjectImageHandle}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                {t('new')}
              </Button>
            }
          />

          {fields.length > 0 ? (
            fields.map((field, index) => (
              <Card sx={{ mt: 3, p: 3 }} key={field.projectImageId}>
                <Grid container spacing={3}>
                  {/* Name project */}
                  <Grid container item xs={12}>
                    <Grid item xs={6} md={6}>
                      <RHFTextField
                        name={`projectImage.${index}.name`}
                        label={t('nameProject')}
                        variant="standard"
                      />
                    </Grid>
                    <Grid item xs={5} md={5}>
                      <></>
                    </Grid>
                    <Grid item xs={1} md={1} textAlign="right">
                      <Tooltip
                        onClick={() => handleOpenConfirm(index, field.id, field)}
                        title={t('delete')}
                      >
                        <IconButton size="large">
                          <DeleteIcon sx={{ color: ERROR_MAIN }} fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  {/* Decscription */}
                  <Grid item xs={12}>
                    <RHFTextField
                      name={`projectImage.${index}.description`}
                      label={t('descProject')}
                      multiline
                      rows={4}
                    />
                  </Grid>

                  {/* Images */}
                  <Grid item xs={12}>
                    <RHFUploadV2
                      limit={1}
                      multiple
                      thumbnail
                      name={`projectImage.${index}.images`}
                      onDrop={(acceptedFiles: File[]) => handleDropMultiFile(acceptedFiles, index)}
                      // onRemoveAll={() => {
                      //   setValue('productImages', []);
                      //   setArrFiles([]);
                      //   setIsRemoveAll(true);
                      // }}
                      onRemove={(file) => removeImageHandle(file, index)}
                    />
                  </Grid>
                </Grid>
              </Card>
            ))
          ) : (
            <Card sx={{ mt: 3, p: 3 }}>
              <EmptyContent
                title={t('emptyProjectImage')}
                sx={{
                  '& span.MuiBox-root': { height: 160 },
                }}
              />
            </Card>
          )}
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.app.product.product)}
                  type="submit"
                  variant="outlined"
                >
                  {t('back')}
                </LoadingButton>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {t('save')}
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Container>

        <ConfirmDialog
          open={confirmDelete.isOpen}
          onClose={handleCloseConfirm}
          title={t('delete')}
          content={<>{t('deleteConfirm')}</>}
          action={
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                if (confirmDelete.projectImageId === null) return;
                removeProjectImageHandle(confirmDelete.id ?? 0);
                handleCloseConfirm();
              }}
            >
              {t('delete')}
            </Button>
          }
        />
      </PageWrapper>
    </FormProvider>
  );
}
