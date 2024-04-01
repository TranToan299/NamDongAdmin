import {
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip
} from '@mui/material';

import PageWrapper from 'components/page-wrapper';
import { DEFAULT_PAGINATION } from 'constants/app.constants';
import { useLocales } from 'locales';
import i18n from 'locales/i18n';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { dispatch, useSelector } from 'redux/store';

import LoadingComponent from 'pages/components/Loading';
import { IContactParams } from '../../../@types/contact';
import { IEventParams } from '../../../@types/event';
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
import { getListContact } from '../../../redux/slices/dashboard/contact';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { ContactTableRow, ContactTableToolbar } from '../../../sections/@dashboard/contact/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'contactId', label: i18n.t<string>('contactId'), align: 'left', minWidth: 170 },
  { id: 'fullName', label: i18n.t<string>('fullName'), align: 'left', minWidth: 170 },
  { id: 'phoneNumber', label: i18n.t<string>('phoneNumber'), align: 'left', minWidth: 170 },
  { id: 'email', label: i18n.t<string>('email'), align: 'left', minWidth: 170 },
  { id: 'note', label: i18n.t<string>('note'), align: 'left', minWidth: 100 },
  {
    id: '',
    style: {
      position: 'sticky',
      right: 0,
    },
  },
];

// ----------------------------------------------------------------------

export default function ContactListPage() {
  const { t } = useLocales();
  const { contactList, contactCount } = useSelector((state) => state.contact);

  const [params, setParams] = useState<IEventParams>({
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


  const [filterName, setFilterName] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);

  const isNotFound = !contactList.length;



  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
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

  const getContact = async (options: IContactParams) => {
    setLoading(true);
    try {
      await dispatch(getListContact(options));
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getContact(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <PageWrapper title={t('contact')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('listOfContact')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('contact'), href: PATH_DASHBOARD.app.contact.contact },
            { name: t('list') },
          ]}
         
        />
        <Card sx={{ mt: 3 }}>
          <ContactTableToolbar
            handleClick={handleClick}
            filterName={filterName}
            onFilterName={handleFilterName}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={contactList.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  contactList?.map((row) => `${row.fullName}`)
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
                stickyHeader
                aria-label="sticky table"
                size={dense ? 'small' : 'medium'}
                sx={{ minWidth: 800 }}
              >
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={contactList.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      contactList?.map((row) => `${row.fullName}`)
                    )
                  }
                />
                {loading ? (
                  <LoadingComponent loading={loading} />
                ) : (
                  <TableBody>
                    {contactList?.map((row) => (
                      <ContactTableRow
                        key={row.fullName}
                        row={row}
                        selected={selected.includes(`${row.fullName}`)}
                        onSelectRow={() => onSelectRow(`${row.fullName}`)}
                      />
                    ))}
                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                )}
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={contactCount}
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
              // handleDeleteRows();
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
