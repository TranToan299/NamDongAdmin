import {
  Box,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { RHFSelect, RHFTextField } from 'components/hook-form';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

import { useLocales } from 'locales';
import { Fragment, useEffect, useState } from 'react';
import { dispatch, useSelector } from 'redux/store';
import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';
import { DEFAULT_PAGINATION } from '../../../../constants/app.constants';
import { filterProduct, getListProduct } from '../../../../redux/slices/dashboard/product';
import { IOrderForm } from '../../../../@types/order';

type Props = {
  methods: any;
  fields: FieldArrayWithId<IOrderForm, 'productList', 'id'>[];
  append: UseFieldArrayAppend<IOrderForm, 'productList'>;
  remove: UseFieldArrayRemove;
  onSelectProducts: (value: number) => void;
  setIsDuplicate: (value: boolean) => void;
};
type IOption = {
  pageIndex: number;
  pageSize: number;
};
const OrderFormInfo = ({
  methods,
  fields,
  append,
  remove,
  onSelectProducts,
  setIsDuplicate,
}: Props) => {
  const theme = useTheme();
  const { watch, setValue, setError } = methods;
  const values = watch();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const ERROR_MAIN = theme.palette.error.main;

  const [productOptions, setProductOptions] = useState({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
  });
  const { t } = useLocales();
  const products = useSelector((state) => state.product.listProduct);
  const list = values.productList;

  const handleGetProduct = async (options: IOption) => {
    await dispatch(getListProduct(options));
  };
  const handleAddNewRow = () => {
    append({
      id: 0,
      product_id: '',
      qty: 0,
      submitId: 0,
    });
  };
  const removeProductHandle = (id: number | number[] | undefined, product_id: number) => {
    remove(id);
  };

  useEffect(() => {
    handleGetProduct(productOptions);
  }, [productOptions]);

  return (
    <Box>
      <Card sx={{ px: 3, py: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="fullName" isRequired label={t('fullName')} />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="phoneNumber" isRequired label={t('phoneNumber')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="email" isRequired label={t('email')} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <RHFTextField name="address" isRequired label={t('address')} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <RHFTextField name="note" isRequired label={t('note')} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography variant="body1">{t('listOfProduct')}</Typography>
          </Grid>

          {/* List Product */}
          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} spacing={3}>
            {fields.map((field, index: number) => {
              return (
                <Fragment key={field.id}>
                  <>
                    <Grid item xs={12} sm={12} md={6} lg={5} xl={6}>
                      <RHFSelect
                        inputColor="#000"
                        placeholderColor="#000"
                        isRequired
                        // handleChange={handleChange}
                        name={`productList[${index}].product_id`}
                        label={t('product')}
                        placeholder={t('product')}
                        onScrollEvent={() => {
                          handleGetProduct({
                            ...productOptions,
                            pageSize: (productOptions.pageSize += 10),
                          });
                        }}
                      >
                        {products?.map((item, indexProduct) => (
                          <MenuItem key={indexProduct} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </RHFSelect>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={4} xl={5}>
                      <RHFTextField
                        name={`productList[${index}].qty`}
                        isRequired
                        label={t('qty')}
                      />
                    </Grid>
                  </>

                  <Grid item xs={12} sm={12} md={1} lg={1} xl={1}>
                    {fields.length - 1 !== 0 && (
                      <Tooltip
                        onClick={() => removeProductHandle(index, Number(field.product_id))}
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
              <Tooltip title={t('addProduct')}>
                <IconButton size="large">
                  <AddCircleIcon sx={{ color: PRIMARY_MAIN }} fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default OrderFormInfo;
