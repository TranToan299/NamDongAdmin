import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { useLocales } from 'locales';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { IOrderCreated, IOrderForm } from '../../../../@types/order';
import FormProvider from '../../../../components/hook-form';
import { createOrder, getOrderDetail } from '../../../../redux/slices/dashboard/order';
import { dispatch, useSelector } from '../../../../redux/store';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { OrderFormSchema } from '../../../../utils/schemas';
import OrderFormInfo from './OrderFormInfo';

// ----------------------------------------------------------------------

type Props = {
  isEdit?: boolean;
};

export default function CreateOrderForm({ isEdit = false }: Props) {
  const navigate = useNavigate();
  const params = useParams();
  const { t } = useLocales();
  const { orderDetail } = useSelector((state) => state.order);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [products, setProducts] = useState<number[]>([]);
  const defaultValues: IOrderForm = {
    fullName: '',
    phoneNumber: '',
    address: '',
    email: '',
    note: '',
    productList: [
      {
        id: 0,
        product_id: '',
        qty: 0,
        submitId: 0,
      },
    ],
  };
  const onSelectProducts = (value: number) => {
    setProducts((prev) => [...prev, value]);
  };

  const methods = useForm<IOrderForm>({
    resolver: yupResolver(OrderFormSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productList',
  });

  useEffect(() => {
    if (isEdit && orderDetail) {
      const { fullName, phoneNumber, address, email, note } = orderDetail;
      reset({
        fullName,
        phoneNumber,
        address,
        email,
        note,
        productList: orderDetail.productList.map((product) => {
          return {
            ...product,
            submitId: product.id,
          };
        }),
      });
    }
    if (!isEdit) {
      reset(defaultValues);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, orderDetail]);

  const getDetailOrder = async (id: number) => {
     dispatch(getOrderDetail(id));
    // append(res.payload.productList);
  };

  useEffect(() => {
    if (params.id) {
      getDetailOrder(Number.parseInt(params.id, 10));
    }
  }, [params.id]);

  const onSubmit = async (data: IOrderForm) => {
    const status = 0;
    const dataApi: IOrderCreated[] = [
      {
        id: isEdit ? orderDetail.id : 0,
        status,
        ...data,
      },
    ];

    const action = createOrder({
      data: dataApi,
      navigate: () => {
        navigate(PATH_DASHBOARD.app.order.order);
      },
    });
    dispatch(action);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={24}>
          <OrderFormInfo
            onSelectProducts={onSelectProducts}
            fields={fields}
            append={append}
            remove={remove}
            methods = {methods}
            setIsDuplicate={setIsDuplicate}

          />
          <Card sx={{ px: 3, py: 1, mt: 3 }}>
            <Stack alignItems="flex-end">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LoadingButton
                  onClick={() => navigate(PATH_DASHBOARD.app.order.order)}
                  type="submit"
                  variant="outlined"
                >
                  {t('back')}
                </LoadingButton>
                <LoadingButton disabled={isDuplicate} type="submit" variant="contained" loading={isSubmitting}>
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
