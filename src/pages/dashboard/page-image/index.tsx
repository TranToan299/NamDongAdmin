// import { yupResolver } from '@hookform/resolvers/yup';
// import { LoadingButton } from '@mui/lab';
// import { Box, Card, Container, Grid, Link, Stack, Typography } from '@mui/material';
// import { useCallback, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';

// import { useTheme } from '@mui/system';
// import PageWrapper from 'components/page-wrapper';
// import { useLocales } from 'locales';
// import { useFieldArray, useForm } from 'react-hook-form';

// import { IProjectImage, IRenderProjectImage, TypeDefault } from '../../../@types/projectImage';
// import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs';
// import EmptyContent from '../../../components/empty-content/EmptyContent';
// import { RHFTextField } from '../../../components/hook-form';
// import FormProvider from '../../../components/hook-form/FormProvider';
// import { RHFUploadV2 } from '../../../components/hook-form/RHFUploadV2';
// import { useSettingsContext } from '../../../components/settings';
// import { CustomFile } from '../../../components/upload';
// import { S3_PROJECT } from '../../../constants/app.constants';
// import {
//   deleteProjectImage,
//   getListProjectImage,
//   updateProjectImage,
// } from '../../../redux/slices/dashboard/projectImage';
// import { dispatch, useSelector } from '../../../redux/store';
// import { PATH_DASHBOARD } from '../../../routes/paths';
// import { ProjectImageFormSchema } from '../../../utils/schemas';
// import { Utils } from '../../../utils/utils';

// // ----------------------------------------------------------------------

// // ----------------------------------------------------------------------

// const type: {
//   [key in TypeDefault]: {
//     link: string;
//     size: string;
//     totalImage: number;
//   };
// } = {
//   homeAboutUs: {
//     link: 'http://namdong.techsource.com.vn/',
//     size: '1: 499 × 310 , 2-3: 348 × 232',
//     totalImage: 3,
//   },

//   homePartner: {
//     link: 'http://namdong.techsource.com.vn/about',
//     size: '599 × 320',
//     totalImage: 1,
//   },
//   aboutUsCompany: {
//     link: 'http://namdong.techsource.com.vn/about',
//     size: '599 × 320',
//     totalImage: 1,
//   },
//   aboutUsBackground: {
//     link: 'http://namdong.techsource.com.vn/about',
//     size: '1519 × 444',
//     totalImage: 1,
//   },
//   storeBanner: {
//     link: 'http://namdong.techsource.com.vn/store',
//     size: '380x240',
//     totalImage: 3,
//   },
//   storeBackground: {
//     link: 'http://namdong.techsource.com.vn/store',
//     size: '1519 × 444',
//     totalImage: 1,
//   },
//   storeSale: {
//     link: 'https://namdong.techsource.com.vn/store/general',
//     size: '270 × 390',
//     totalImage: 1,
//   },
//   serviceAdvertiseBg: {
//     link: 'http://namdong.techsource.com.vn/advertise-furniture',
//     size: '1519 × 444',
//     totalImage: 1,
//   },
//   serviceHouseBg: {
//     link: 'http://namdong.techsource.com.vn/house-furniture',
//     size: '1519 × 444',
//     totalImage: 1,
//   },
//   serviceWebsiteBg: {
//     link: 'http://namdong.techsource.com.vn/website-and-system',
//     size: '1519 × 444',
//     totalImage: 1,
//   },
//   serviceOtherBg: {
//     link: 'http://namdong.techsource.com.vn/other-service',
//     size: '1519 × 444',
//     totalImage: 1,
//   },
//   contactBackground: {
//     link: 'http://namdong.techsource.com.vn/contact',
//     size: '1519 × 444',
//     totalImage: 1,
//   },
// };

// export default function PageImagePage() {
//   const { t } = useLocales();
//   const theme = useTheme();
//   const navigate = useNavigate();

//   const ERROR_MAIN = theme.palette.error.main;
//   const { themeStretch } = useSettingsContext();

//   // store
//   const { listProjectImage, listPageImage } = useSelector((state) => state.projectImage);
//   //

//   // State
//   const [confirmDelete, setConfirmDelete] = useState<{
//     isOpen: boolean;
//     projectImageId: number | null;
//     id: number | null;
//   }>({ isOpen: false, projectImageId: null, id: null });
//   const [selectedProjectImage, setSelectedProjectImage] = useState<IProjectImage | null>(null);
//   const [listImageDeleted, setListImageDeleted] = useState<string[]>([]);
//   //

//   const defaultValues: { projectImage: IProjectImage[] | [] } = {
//     // projectImage: [],
//     projectImage: listPageImage,
//   };

//   const methods = useForm({
//     resolver: yupResolver(ProjectImageFormSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     watch,
//     control,
//     setValue,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const { fields, prepend, remove } = useFieldArray({
//     keyName: 'projectImageId',
//     control,
//     name: 'projectImage',
//   });

//   const convertImageHandle = async (data: (string | CustomFile)[]) => {
//     // handle upload file to server
//     const listPromise: Promise<string | null>[] = [];
//     data.forEach(async (image: string | CustomFile) => {
//       if (typeof image !== 'string') {
//         listPromise.push(uploadImage(image));
//       }
//     });
//     const listImage = await Promise.all(listPromise);
//     const imagesArr = [...data.filter((item) => typeof item === 'string'), ...listImage];

//     // change array to string join ','
//     const images = imagesArr.join(',');
//     return images;
//   };

//   const uploadImage = async (file: File) => {
//     const url = await Utils.uploadFile(file, 'images');
//     return url;
//   };

//   const onSubmit = async (data: { projectImage: IProjectImage[] }) => {
//     if (listImageDeleted.length) {
//       listImageDeleted.forEach(async (image) => {
//         await Utils.deleteFile(image, 'images', S3_PROJECT);
//       });
//     }

//     const dataSubmit: IRenderProjectImage[] = [];

//     // eslint-disable-next-line no-restricted-syntax
//     for await (const item of data.projectImage) {
//       const images = await convertImageHandle(item.images);
//       dataSubmit.push({
//         ...item,
//         images,
//       });
//     }

//     if (dataSubmit.length) {
//       await dispatch(updateProjectImage(dataSubmit));
//       await dispatch(getListProjectImage());
//     }
//   };

//   const values = watch();

//   const removeProjectImageHandle = async (index: number) => {
//     if (!index) {
//       remove(confirmDelete.projectImageId ?? 0);
//       return;
//     }
//     await dispatch(deleteProjectImage(index));
//     // Remove on service
//     if (!selectedProjectImage) return;
//     const { images } = selectedProjectImage;

//     images.forEach(async (image) => {
//       if (typeof image === 'string') {
//         await Utils.deleteFile(image, 'images', S3_PROJECT);
//       }
//     });
//     await dispatch(getListProjectImage());
//   };

//   const handleDropMultiFile = useCallback(
//     async (acceptedFiles: File[], index: number) => {
//       const files = values.projectImage[index].images || [];
//       const newFiles = acceptedFiles.map((file) => {
//         return Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         });
//       });
//       setValue(`projectImage.${index}.images`, [...files, ...newFiles], { shouldValidate: true });
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [setValue, values.projectImage]
//   );

//   const removeImageHandle = (file: string | CustomFile, index: number) => {
//     if (typeof file === 'string') {
//       setListImageDeleted([...listImageDeleted, file]);
//     }
//     const newImages: (string | CustomFile)[] = values.projectImage[index].images.filter(
//       (item) => item !== file
//     );
//     setValue(`projectImage.${index}.images`, newImages, { shouldValidate: true });
//   };

//   const getListProjectImageHandle = () => {
//     dispatch(getListProjectImage());
//   };

//   useEffect(() => {
//     if (listPageImage && listPageImage.length) {
//       // handle change images from string to array
//       const listPageImageTemp = listPageImage.map((item: IRenderProjectImage) => {
//         const images = item.images.split(',');
//         return {
//           ...item,
//           images,
//         };
//       });

//       reset({ projectImage: listPageImageTemp });
//     } else {
//       reset(defaultValues);
//     }
//   }, [listPageImage]);

//   // useEffect(() => {
//   //   console.log("listpage: ",listPageImage);

//   // }, []);

//   useEffect(() => {
//     if (!listPageImage.length) {
//       getListProjectImageHandle();
//     }
//   }, []);

//   return (
//     <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//       <PageWrapper title={t('pageImage')}>
//         <Container maxWidth={themeStretch ? false : 'lg'}>
//           <CustomBreadcrumbs
//             heading={t('settingPageImage')}
//             links={[
//               { name: t('dashboard'), href: PATH_DASHBOARD.root },
//               { name: t('pageImage'), href: PATH_DASHBOARD.app.pageImage.pageImage },
//               { name: t('list') },
//             ]}
//           />

//           {fields.length > 0 ? (
//             fields.map((field, index) => {
//               if (!field.type) return <></>;
//               const typeField = type[field.type];
//               let isUpload = true;
//               const { images } = values.projectImage[index];
//               if (typeField?.totalImage && typeField?.totalImage <= images.length) {
//                 isUpload = false;
//               }
//               return (
//                 <Card sx={{ mt: 3, p: 3 }} key={field.projectImageId}>
//                   <Grid container spacing={3}>
//                     {/* Name project */}
//                     <Grid container item xs={12}>
//                       {/* <Grid item xs={12} md={12}>
//                         <Typography variant="h6">{t('linkTo')}:</Typography>
                        
//                       </Grid> */}
//                       <Grid item xs={12} md={12}>
//                         <RHFTextField
//                           name={`projectImage.${index}.name`}
//                           label={t('nameSettingImagePage')}
//                           variant="standard"
//                           disabled
//                           sx={{ height: 0, width: 0, visibility: 'hidden', flex: 0 }}
//                         />
//                       </Grid>
//                       <Grid
//                         item
//                         xs={12}
//                         md={12}
//                         container
//                         alignItems="center"
//                         justifyContent="space-between"
//                       >
//                         <Typography variant="h6">{t('nameSettingImagePage')}</Typography>
//                         <Link href={typeField?.link} target="_blank">
//                           {typeField?.link}
//                         </Link>
//                       </Grid>
//                     </Grid>
//                     <Grid item xs={12} md={12}>
//                       <Typography variant="body1" mt={1}>
//                         {t(`${field.name}`)}
//                       </Typography>
//                     </Grid>

//                     {/* Images */}

//                     <Grid item xs={12}>
//                       <RHFUploadV2
//                         multiple
//                         thumbnail
//                         name={`projectImage.${index}.images`}
//                         onDrop={(acceptedFiles: File[]) =>
//                           handleDropMultiFile(acceptedFiles, index)
//                         }
//                         // onRemoveAll={() => {
//                         //   setValue('productImages', []);
//                         //   setArrFiles([]);
//                         //   setIsRemoveAll(true);
//                         // }}
//                         isUpload={isUpload}
//                         onRemove={(file) => removeImageHandle(file, index)}
//                       />
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                       <Typography variant="body1" mt={1}>
//                         {`${t('maxHave')} ${typeField?.totalImage} ${t('picture')}`}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12} md={6} textAlign="right">
//                       <Typography variant="body1" mt={1} fontStyle="italic">
//                         {`${t('sizeBetterIs')} ${typeField?.size}`}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Card>
//               );
//             })
//           ) : (
//             <Card sx={{ mt: 3, p: 3 }}>
//               <EmptyContent
//                 title={t('emptyProjectImage')}
//                 sx={{
//                   '& span.MuiBox-root': { height: 160 },
//                 }}
//               />
//             </Card>
//           )}
//           <Card sx={{ px: 3, py: 1, mt: 3 }}>
//             <Stack alignItems="flex-end">
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <LoadingButton
//                   onClick={() => navigate(PATH_DASHBOARD.app.product.product)}
//                   type="submit"
//                   variant="outlined"
//                 >
//                   {t('back')}
//                 </LoadingButton>
//                 <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
//                   {t('save')}
//                 </LoadingButton>
//               </Box>
//             </Stack>
//           </Card>
//         </Container>
//       </PageWrapper>
//     </FormProvider>
//   );
// }


import React from 'react'

const PageImagePage = () => {
  return (
    <div>index</div>
  )
}

export default PageImagePage