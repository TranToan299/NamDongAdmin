import { Box, Card, Grid, IconButton, MenuItem, Tooltip, Typography } from '@mui/material';
import TextEditor from 'components/common/TextEditor';
import {
  RHFCheckbox,
  RHFMultiSelect,
  RHFSelect,
  RHFTextField,
  RHFUpload,
} from 'components/hook-form';
import { useTheme } from '@mui/system';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';

import { useLocales } from 'locales';
import { Dispatch, Fragment, SetStateAction, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { dispatch, useSelector } from 'redux/store';
import {
  PRODUCT_ADVERTISING_FURNITURE,
  PRODUCT_HAS_CHILDREN,
  PRODUCT_INTERIOR_HOME,
} from '../../../../constants/app.constants';
import { getObjectTypeProductDetailsType } from '../../../../redux/slices/dashboard/objectType';
import { CustomFile } from '../../../../components/upload';
import { IProductDefaultValue } from '../../../../@types/product';

type Props = {
  methods?: any;
  setArrFiles: Dispatch<SetStateAction<[] | File[]>>;
  editValue?: string;
  setEditValue: Dispatch<SetStateAction<string>>;
  setIsRemoveAll: Dispatch<SetStateAction<boolean>>;
  arrFiles: File[];
  isRemove: boolean;
  setIsRemove: Dispatch<SetStateAction<boolean>>;
  fields: FieldArrayWithId<IProductDefaultValue, 'infoList', 'id'>[];
  append: UseFieldArrayAppend<IProductDefaultValue, 'infoList'>;
  remove: UseFieldArrayRemove;
};

const ProductFormInfo = ({
  methods,
  setArrFiles,
  setEditValue,
  editValue,
  setIsRemoveAll,
  arrFiles,
  isRemove,
  setIsRemove,
  fields,
  append,
  remove,
}: Props) => {
  const {
    objectTypeProduct,
    objectTypeProductTag,
    objectTypeProductCategories,
    objectTypeProductDetailsType,
  } = useSelector((state) => state.objectType);
  const { watch, setValue } = methods;
  const values = watch();
  const isSaleLiquid =
    values.productType === PRODUCT_ADVERTISING_FURNITURE ||
    values.productType === PRODUCT_INTERIOR_HOME;

  const { t } = useLocales();

  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;
  const ERROR_MAIN = theme.palette.error.main;

  const handleDropSingleFile = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (newFile) {
        setValue('thumbnail', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const removeImageHandle = (image: string | CustomFile) => {
    if (!isRemove) setIsRemove(true);
    if (typeof image !== 'string') {
      const fileRemove = arrFiles.filter((item: File) => item.name !== image.name);
      setArrFiles(fileRemove);
    }
    const newImages = values.productImages.filter((item: string) => item !== image);
    setValue('productImages', newImages, { shouldValidate: true });
  };

  const handleAddNewRow = () => {
    append({
      id: 0,
      value: '',
    });
  };

  const removeProductHandle = (id: number | number[] | undefined) => {
    remove(id);
  };

  const handleDropMultiFile = useCallback(
    async (acceptedFiles: File[]) => {
      const files = values.productImages || [];
      const newFiles = acceptedFiles.map((file) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });

      acceptedFiles.map(async (file) => {
        setArrFiles((prev: File[]) => {
          return [...prev, file];
        });
      });
      setValue('productImages', [...files, ...newFiles], { shouldValidate: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, values.productImages]
  );

  useEffect(() => {
    if (values.productType) {
      dispatch(
        getObjectTypeProductDetailsType({
          objectType: 'productDetailsType',
          parentId: values.productType,
        })
      );
    }
  }, [values.productType]);

  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFSelect
              inputColor="#000"
              placeholderColor="#000"
              backgroundColor="#F6D2CB"
              name="productType"
              label={t('productType')}
              placeholder={t('productType')}
              isRequired
            >
              {objectTypeProduct?.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.objectName}
                  </MenuItem>
                );
              })}
            </RHFSelect>
          </Grid>
          {objectTypeProductDetailsType.length === 0 &&
            values.productType !== PRODUCT_HAS_CHILDREN && (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <br />
              </Grid>
            )}
          {objectTypeProductDetailsType.length > 0 && (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <RHFSelect
                inputColor="#000"
                name="typeDetailId"
                label={t('typeDetailId')}
                placeholder={t('typeDetailId')}
                isRequired
              >
                {objectTypeProductDetailsType?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.objectName}
                    </MenuItem>
                  );
                })}
              </RHFSelect>
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="productName" label={t('productName')} isRequired />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="description" label={t('description')} isRequired />
          </Grid>

          {values.productType === PRODUCT_HAS_CHILDREN && (
            <>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <RHFTextField name="material" label={t('material')} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <RHFTextField name="price" label={t('price')} isRequired />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <RHFTextField name="salePrice" label={t('salePrice')} />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <RHFMultiSelect
                  chip
                  checkbox
                  sx={{ width: '100%', backgroundColor: 'white' }}
                  name="productTags"
                  label={t('tags')}
                  options={objectTypeProductTag?.map((item) => {
                    return {
                      label: item?.objectName,
                      value: item?.id.toString(),
                    };
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <RHFMultiSelect
                  chip
                  checkbox
                  sx={{ width: '100%', backgroundColor: 'white' }}
                  name="productCategories"
                  label={t('category')}
                  options={objectTypeProductCategories?.map((item) => {
                    return {
                      label: item?.objectName,
                      value: item?.id.toString(),
                    };
                  })}
                />
              </Grid>
            </>
          )}
          {!isSaleLiquid && (
            <>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <RHFCheckbox name="isLiquid" label={t('liquid')} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <RHFCheckbox name="isSale" label={t('sale')} />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <RHFTextField name="specifications" label={t('specifications')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="body1">
              {t('thumbnail')}
              <span style={{ color: 'red' }}> *</span>
            </Typography>
            <RHFUpload
              name="thumbnail"
              maxSize={3145728}
              onDrop={handleDropSingleFile}
              onDelete={() => setValue('thumbnail', null, { shouldValidate: true })}
            />
            <br />
            <Typography sx={{ fontSize: 12, fontStyle: 'italic' }} variant="body1">
              {t('sizeBetter')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="body1">{t('images')}</Typography>
            <RHFUpload
              multiple
              thumbnail
              name="productImages"
              onDrop={handleDropMultiFile}
              onRemoveAll={() => {
                setValue('productImages', []);
                setArrFiles([]);
                setIsRemoveAll(true);
              }}
              onRemove={(file) => removeImageHandle(file)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextEditor initValue={editValue} setEditorValue={setEditValue} />
          </Grid>
          {/* List Product */}
          {values.productType === PRODUCT_ADVERTISING_FURNITURE && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography variant="body1">{t('infoList')}</Typography>
              </Grid>
              <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} spacing={3}>
                {fields.map((field, index: number) => {
                  return (
                    <Fragment key={field.id}>
                      <Grid item xs={12} sm={12} md={11} lg={11} xl={11}>
                        <RHFTextField
                          name={`infoList[${index}].value`}
                          isRequired
                          label={t('infoList')}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                        {fields.length - 1 !== 0 && (
                          <Tooltip
                            onClick={() => removeProductHandle(Number(field.id))}
                            title={t('delete')}
                          >
                            <IconButton size="large">
                              <DeleteIcon sx={{ color: ERROR_MAIN }} fontSize="large" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Grid>
                    </Fragment>
                  );
                })}
              </Grid>
              <Grid
                container
                item
                justifyContent="center"
                alignItems="center"
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <Box
                  onClick={handleAddNewRow}
                  component="span"
                  sx={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    border: '1px dashed grey',
                    width: '100%',
                  }}
                >
                  <Tooltip title={t('addInfoProduct')}>
                    <IconButton size="large">
                      <AddCircleIcon sx={{ color: PRIMARY_MAIN }} fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Card>
    </Box>
  );
};

export default ProductFormInfo;
