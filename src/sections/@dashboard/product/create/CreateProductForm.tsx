import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { OBJECT_TYPES, S3_PROJECT } from 'constants/app.constants';
import { useLocales } from 'locales';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getObjectTypeProduct,
  getObjectTypeProductCategories,
  getObjectTypeProductTag,
} from 'redux/slices/dashboard/objectType';
import { createProduct, getProductDetail } from 'redux/slices/dashboard/product';
import { dispatch, useSelector } from 'redux/store';
import { IProductCreated, IProductDefaultValue } from '../../../../@types/product';
import FormProvider from '../../../../components/hook-form';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { ProductFormAllSchema } from '../../../../utils/schemas';
import { Utils } from '../../../../utils/utils';
import ProductFormInfo from './ProductFormInfo';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
};

export default function CreateProductForm({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const [editValue, setEditValue] = useState<string>('');
  const [arrFiles, setArrFiles] = useState<File[] | []>([]);
  const [isRemoveAll, setIsRemoveAll] = useState<boolean>(false);
  const [isRemove, setIsRemove] = useState<boolean>(false);

  const { productDetail } = useSelector((state) => state.product);

  const params = useParams();
  const { t } = useLocales();
  const defaultValues: IProductDefaultValue = {
    productName: '',
    productImages: [],
    thumbnail: '',
    description: '',
    price: 0,
    productType: '',
    isActive: true,
    productTags: [],
    productCategories: [],
    material: '',
    salePrice: 0,
    isSale: false,
    isLiquid: false,
    typeDetailId: '',
    specifications: '',
    infoList: [
      {
        id: '',
        value: '',
      },
    ],
  };

  const methods = useForm({
    resolver: yupResolver(ProductFormAllSchema),
    defaultValues,
  });

  const {
    control,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'infoList',
  });

  const onSubmit = async (data: IProductDefaultValue) => {
    let info: string | null = '';
    if (data.infoList.length > 0 && data.infoList[0].value) {
      data.infoList.forEach((item, index) => {
        info += `${item.value} ${index === data.infoList.length - 1 ? '' : ','}`;
      });
    } else {
      info = null;
    }

    const submitData: IProductCreated = {
      id: isEdit ? params.id : 0,
      name: data.productName,
      images: isEdit ? productDetail.images : arrFiles?.join(','),
      thumbnail: data.thumbnail,
      description: data.description,
      price: data.price,
      type: data.productType,
      isActive: true,
      isLiquid: data.isLiquid,
      isSale: data.isSale,
      tags: data.productTags?.join(','),
      categories: data.productCategories?.join(','),
      material: data.material,
      salePrice: data.salePrice,
      content: editValue,
      typeDetailId: data.typeDetailId,
      info,
      specifications: data.specifications,
    };

    let urlFile: string | undefined | null;
    let listImage: any;

    if (isEdit) {
      const isChangeThumbnail = data.thumbnail !== productDetail.thumbnail;
      if (productDetail.thumbnail && isChangeThumbnail) {
        await Utils.deleteFile(productDetail.thumbnail, 'images', S3_PROJECT);
        urlFile = await Utils.uploadFile(data.thumbnail, 'images');
      } else {
        urlFile = data.thumbnail;
      }
      if (isChangeThumbnail) {
        urlFile = await Utils.uploadFile(data.thumbnail, 'images');
      }
      // change images
      const arrImage: string[] = productDetail.images?.split(',');
      // remove image
      if (isRemove) {
        // find image remove
        const listImageRemove = arrImage.filter((item) => !data.productImages?.includes(item));
        // remove image in s3
        listImageRemove.forEach(async (item) => {
          await Utils.deleteFile(item, 'images', S3_PROJECT);
        });
        // delete item from arrayImage
        arrImage.forEach((item) => {
          if (!data.productImages?.includes(item)) {
            arrImage.splice(arrImage.indexOf(item), 1);
          }
        });
        submitData.images = data.productImages?.join(',');
      }
      if (arrFiles.length) {
        const promises: any = [];
        arrFiles.forEach(async (item: any) => {
          promises.push(Utils.uploadFile(item, 'images'));
        });
        listImage = await Promise.all(promises);
        const remainImage = arrImage?.filter((item) => !listImage.includes(item));
        if (remainImage[0]) listImage.unshift(remainImage);
      } else {
        listImage = '';
        // remove all image
        if (isRemoveAll) {
          const listImageRemove: string[] = productDetail.images?.split(',');
          listImageRemove.forEach(async (item) => {
            await Utils.deleteFile(item, 'images', S3_PROJECT);
          });
          submitData.images = '';
        }
      }
    }
    if (!isEdit) {
      if (data.thumbnail) {
        urlFile = await Utils.uploadFile(data.thumbnail, 'images');
      }
      if (arrFiles) {
        const promises: any = [];
        arrFiles.forEach(async (item) => {
          promises.push(Utils.uploadFile(item, 'images'));
        });
        listImage = await Promise.all(promises);
      }
    }
    submitData.thumbnail = urlFile;
    if (listImage) submitData.images = listImage.join(',');

    dispatch(
      createProduct({
        data: submitData,
        id: submitData.id,
        navigate: () => {
          navigate(PATH_DASHBOARD.app.product.product);
        },
      })
    );
  };

  const getProductOne = async (id: string | number) => {
    await dispatch(getProductDetail(id));
  };
  const getType = async () => {
    dispatch(getObjectTypeProduct(OBJECT_TYPES.product.productType));
    dispatch(getObjectTypeProductTag(OBJECT_TYPES.product.tags));
    dispatch(getObjectTypeProductCategories(OBJECT_TYPES.product.productCategories));
  };
  useEffect(() => {
    getType();
    if (params.id) {
      getProductOne(params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    if (isEdit && productDetail) {
      let arrInfoList: any = [];
      if (productDetail.info) {
        const arrInfo = productDetail.info.split(',');
        arrInfoList = arrInfo.map((item, index) => {
          return { id: index, value: item };
        });
      }
      reset({
        ...productDetail,
        productType: productDetail.type,
        productName: productDetail.name,
        infoList: arrInfoList,
      });

      if (productDetail.tags) {
        setValue('productTags', productDetail?.tags.split(','));
      } else {
        setValue('productTags', []);
      }
      if (productDetail.categories) {
        setValue('productCategories', productDetail?.categories.split(','));
      } else {
        setValue('productCategories', []);
      }
      if (productDetail.images) {
        setValue('productImages', productDetail?.images.split(','));
      } else {
        setValue('productImages', []);
      }
      if (productDetail.content) setEditValue(productDetail.content);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, productDetail]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <ProductFormInfo
            arrFiles={arrFiles}
            methods={methods}
            editValue={editValue}
            setEditValue={setEditValue}
            setArrFiles={setArrFiles}
            setIsRemoveAll={setIsRemoveAll}
            isRemove={isRemove}
            setIsRemove={setIsRemove}
            fields={fields}
            append={append}
            remove={remove}
          />
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
