import {
  Button,
  Card,
  Container,
  IconButton,
  SelectChangeEvent,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from '@mui/material';
import ConfirmDialog from 'components/confirm-dialog';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import Iconify from 'components/iconify';
import PageWrapper from 'components/page-wrapper';
import Scrollbar from 'components/scrollbar';
import { useSettingsContext } from 'components/settings';
import {
  TableHeadCustom,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'components/table';
import { DEFAULT_PAGINATION, OBJECT_TYPES, S3_PROJECT } from 'constants/app.constants';
import { useLocales } from 'locales';
import i18n from 'locales/i18n';
import LoadingComponent from 'pages/components/Loading';
import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { deleteProduct, getListProduct } from 'redux/slices/dashboard/product';
import { dispatch, useSelector } from 'redux/store';
import { PATH_DASHBOARD } from 'routes/paths';
import { ProductTableRow, ProductTableToolbar } from 'sections/@dashboard//product/list';
import { IProductParams } from '../../../@types/product';
import { getObjectTypeProduct } from '../../../redux/slices/dashboard/objectType';
import { Utils } from '../../../utils/utils';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'productId', label: i18n.t<string>('productId'), align: 'left', minWidth: 150 },
  { id: 'productName', label: i18n.t<string>('productName'), align: 'left', minWidth: 200 },
  { id: 'productType', label: i18n.t<string>('productType'), align: 'left', minWidth: 150 },
  { id: 'isLiquid', label: i18n.t<string>('liquid'), align: 'left', minWidth: 150 },
  { id: 'isSale', label: i18n.t<string>('sale'), align: 'left', minWidth: 150 },
  { id: 'description', label: i18n.t<string>('description'), align: 'left', minWidth: 150 },
  { id: 'productThumbnail', label: i18n.t<string>('thumbnail'), align: 'left', minWidth: 150 },
  {
    id: '',
    style: {
      position: 'sticky',
      right: 0,
    },
  },
];

// ----------------------------------------------------------------------

export default function ProductListPage() {
  const { t } = useLocales();
  const { listProduct, productCount } = useSelector((state) => state.product);
  const [params, setParams] = useState<IProductParams>({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    keyword: '',
    type: '',
  });
  const [typeProduct, setTypeProduct] = useState<string>('');
  const { objectTypeProduct } = useSelector((state) => state.objectType);
  const {
    dense,
    order,
    orderBy,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
  } = useTable();

  const [loading, setLoading] = useState<boolean>(false);

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const handleDeleteRow = async (id: string | number) => {
    const productDeleted = listProduct.find((item) => item.id === id);
    const url = productDeleted?.thumbnail;
    if (url) await Utils.deleteFile(url, 'images', S3_PROJECT);
    const images: string[] = productDeleted?.images.split(',');
    if (images) {
      images.forEach(async (image) => {
        await Utils.deleteFile(image, 'images', S3_PROJECT);
      });
    }
    await dispatch(deleteProduct({ ids: [id.toString()], params }));
  };
  const handleChange = (event: SelectChangeEvent) => {
    setTypeProduct(event.target.value as string);
  };

  const handleDeleteRows = async () => {
    const ids: number[] = [];
    selected.forEach(async (row: string) => {
      const id = Number.parseInt(row, 10);
      ids.push(id);
      const productDeleted = listProduct.find((item) => item.id === id);
      const url = productDeleted?.thumbnail;
      if (url) await Utils.deleteFile(url, 'images', S3_PROJECT);
      const images: string[] = productDeleted?.images.split(',');
      if (images) {
        images.forEach(async (image) => {
          await Utils.deleteFile(image, 'images', S3_PROJECT);
        });
      }
    });

    await dispatch(deleteProduct({ ids: selected, params }));
    await setSelected([]);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.app.product.edit(id));
  };

  const handleClick = async () => {
    await setParams({
      ...params,
      pageIndex: 1,
      keyword: filterName,
      type: typeProduct,
    });
  };
  const onChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setParams({
        ...params,
        pageIndex: newPage + 1,
      });
    },
    [params]
  );

  const onChangeRowsPerPage = useCallback(
    (event: any) => {
      setParams({
        ...params,
        pageSize: event.target.value,
      });
    },
    [params]
  );
  const getProduct = async (options: IProductParams) => {
    setLoading(true);
    try {
      await dispatch(getListProduct(options));
    } finally {
      setLoading(false);
    }
  };
  const getTypeProduct = async () => {
    await dispatch(getObjectTypeProduct(`${OBJECT_TYPES.product.productType}`));
  };
  useEffect(() => {
    getProduct(params);
    getTypeProduct();
  }, [params]);

  return (
    <PageWrapper title={t('product')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('listOfProduct')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('product'), href: PATH_DASHBOARD.app.product.product },
            { name: t('list') },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.app.product.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {t('new')}
            </Button>
          }
        />
        <Card sx={{ mt: 3 }}>
          <ProductTableToolbar
            handleClick={handleClick}
            filterName={filterName}
            onFilterName={handleFilterName}
            options={objectTypeProduct}
            onChange={handleChange}
            typeProduct={typeProduct}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={listProduct.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  listProduct?.map((row: any) => row.id)
                )
              }
              action={
                <Tooltip title={i18n.t<string>('delete')}>
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listProduct.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      listProduct?.map((row: any) => row.id)
                    )
                  }
                />
                {loading ? (
                  <LoadingComponent loading={loading} />
                ) : (
                  <TableBody>
                    {listProduct?.map((row: any) => (
                      <ProductTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}
                  </TableBody>
                )}
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={productCount}
            page={params.pageIndex - 1}
            rowsPerPage={params.pageSize}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title={i18n.t<string>('delete')}
        content={<>{i18n.t<string>('deleteConfirmItems', { count: selected.length })}</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              handleCloseConfirm();
            }}
          >
            {i18n.t<string>('delete')}
          </Button>
        }
      />
    </PageWrapper>
  );
}
