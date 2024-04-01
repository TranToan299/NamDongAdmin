import {
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from '@mui/material';

import { paramCase } from 'change-case';
import PageWrapper from 'components/page-wrapper';
import { DEFAULT_PAGINATION } from 'constants/app.constants';
import { useLocales } from 'locales';
import i18n from 'locales/i18n';
import LoadingComponent from 'pages/components/Loading';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { dispatch, useSelector } from 'redux/store';
import { IOrderParams } from '../../../@types/order';
import ConfirmDialog from '../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { useSettingsContext } from '../../../components/settings';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from '../../../components/table';
import { deleteOrder, getListOrder } from '../../../redux/slices/dashboard/order';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { OrderTableRow, OrderTableToolbar } from '../../../sections/@dashboard/order/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'orderId', label: i18n.t<string>('orderId'), align: 'left', minWidth: 150 },
  { id: 'fullname', label: i18n.t<string>('fullName'), align: 'left', minWidth: 200 },
  { id: 'phoneNumber', label: i18n.t<string>('phoneNumber'), align: 'left', minWidth: 150 },
  { id: 'email', label: i18n.t<string>('email'), align: 'left' },
  { id: 'address', label: i18n.t<string>('address'), align: 'left', minWidth: 150 },
  { id: 'note', label: i18n.t<string>('note'), align: 'left', minWidth: 200 },
  // { id: 'createdAt', label: i18n.t<string>('createdAt'), align: 'left' },
  {
    id: '',
    style: {
      position: 'sticky',
      right: 0,
    },
  },
];

// ----------------------------------------------------------------------

export default function OrderListPage() {
  const { t } = useLocales();
  const { orderList, orderCount } = useSelector((state) => state.order);
  // Get list order
  const [params, setParams] = useState<IOrderParams>({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    keyword: '',
  });
  const {
    dense,
    order,
    orderBy,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
  } = useTable();

  const [loading, setLoading] = useState<boolean>(false);

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [filterName, setFilterName] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !orderList.length;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const handleDeleteRow = async (id: number) => {
    await dispatch(
      deleteOrder({
        ids: [id],
        params,
      })
    );
  };

  const handleDeleteRows = async () => {
    await dispatch(deleteOrder({ ids: selected, params }));
    await setSelected([]);
  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.app.order.edit(paramCase(id.toString())));
  };

  const handleClick = async () => {
    await setParams({
      ...params,
      pageIndex: 1,
      keyword: filterName,
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
    (event: ChangeEvent<HTMLInputElement>) => {
      setParams({
        ...params,
        pageSize: parseInt(event.target.value, 10),
      });
    },
    [params]
  );
  const getOrder = async (options: IOrderParams) => {
    setLoading(true);
    try {
      await dispatch(getListOrder(options));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrder(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <PageWrapper title={t('order')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('listOfOrder')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('order'), href: PATH_DASHBOARD.app.order.order },
            { name: t('list') },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.app.order.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {t('new')}
            </Button>
          }
        />
        <Card sx={{ mt: 3 }}>
          <OrderTableToolbar
            handleClick={handleClick}
            filterName={filterName}
            onFilterName={handleFilterName}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={orderList.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  orderList?.map((row) => `${row.id}`)
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
              <Table
                size={dense ? 'small' : 'medium'}
                sx={{ minWidth: 800 }}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={orderList.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      orderList?.map((row) => `${row.id}`)
                    )
                  }
                />
                {loading ? (
                  <LoadingComponent loading={loading} />
                ) : (
                  <TableBody>
                    {orderList?.map((row) => (
                      <OrderTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(`${row.id}`)}
                        onSelectRow={() => onSelectRow(`${row.id}`)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(`${row.id}`)}
                      />
                    ))}
                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                )}
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={orderCount}
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
