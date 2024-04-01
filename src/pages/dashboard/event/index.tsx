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

import { paramCase } from 'change-case';
import PageWrapper from 'components/page-wrapper';
import { DEFAULT_PAGINATION, S3_PROJECT } from 'constants/app.constants';
import { useLocales } from 'locales';
import i18n from 'locales/i18n';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { dispatch, useSelector } from 'redux/store';

import LoadingComponent from 'pages/components/Loading';
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
import {
  deleteEvent,
  getListEvent,
  getObjectTypeEvent,
} from '../../../redux/slices/dashboard/event';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { EventTableRow, EventTableToolbar } from '../../../sections/@dashboard/event/list';
import { Utils } from '../../../utils/utils';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'eventId', label: i18n.t<string>('eventId'), align: 'left', minWidth: 170, },
  { id: 'name', label: i18n.t<string>('eventName'), align: 'left', minWidth: 170, },
  { id: 'type', label: i18n.t<string>('eventType'), align: 'left', minWidth: 170, },
  { id: 'isPublish', label: i18n.t<string>('isPublish'), align: 'left', minWidth: 170, },
  { id: 'description', label: i18n.t<string>('description'), align: 'left', minWidth: 100, },
  { id: 'thumbnail', label: i18n.t<string>('thumbnail'), align: 'left', minWidth: 170, },
  {
    id: '',
    style: {
      position: 'sticky',
      right: 0,
    },
  },
];

// ----------------------------------------------------------------------

export default function EventListPage() {
  const { t } = useLocales();
  const { eventList, eventCount } = useSelector((state) => state.event);
  const eventType = useSelector((state) => state.event.eventType);
  const [typeEvent, setTypeEvent] = useState<string>('');

  const [params, setParams] = useState<IEventParams>({
    pageIndex: DEFAULT_PAGINATION.PAGE_INDEX,
    pageSize: DEFAULT_PAGINATION.PAGE_SIZE,
    keyword: '',
    eventType: '',
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


  const isNotFound = !eventList.length;

  const handleChange = (event: SelectChangeEvent) => {
    setTypeEvent(event.target.value as string);
  };

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
    const eventDeleted = eventList.find((item) => item.id === id);
    const url = eventDeleted?.thumbnail;
    if (url) await Utils.deleteFile(url, 'images', S3_PROJECT);
    await dispatch(
      deleteEvent({
        ids: [id],
        params,
      })
    );
  };

  const handleDeleteRows = async () => {
    const ids: number[] = [];
    selected.forEach(async (row: string) => {
      const id = Number.parseInt(row, 10)
      ids.push(id);
      const eventDeleted = eventList.find((item) => item.id === id);
      const url = eventDeleted?.thumbnail;
      if (url) await Utils.deleteFile(url, 'images',S3_PROJECT);
    });
    await dispatch(deleteEvent({ ids, params }));
    await setSelected([]);

  };

  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.app.event.edit(paramCase(id.toString())));
  };

  const handleClick = async () => {
    await setParams({
      ...params,
      pageIndex: 1,
      keyword: filterName,
      eventType: typeEvent,
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

  const getEvent = async (options: IEventParams) => {
    setLoading(true);
    try {
      await dispatch(getListEvent(options));
    } finally {
      setLoading(false);
    }
  };

  const getEventType = async () => {
    await dispatch(getObjectTypeEvent('eventType'));
  };
  useEffect(() => {
    getEventType();
  }, []);

  useEffect(() => {
    getEvent(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <PageWrapper title={t('event')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={t('listOfEvent')}
          links={[
            { name: t('dashboard'), href: PATH_DASHBOARD.root },
            { name: t('event'), href: PATH_DASHBOARD.app.event.event },
            { name: t('list') },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.app.event.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {t('new')}
            </Button>
          }
        />
        <Card sx={{ mt: 3 }}>
          <EventTableToolbar
            handleClick={handleClick}
            filterName={filterName}
            onFilterName={handleFilterName}
            options={eventType}
            onChange={handleChange}
            typeEvent={typeEvent}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={eventList.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  eventList?.map((row) => `${row.id}`)
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
              stickyHeader aria-label="sticky table"
              size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={eventList.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      eventList?.map((row) => `${row.id}`)
                    )
                  }
                />
                {loading ? (
                  <LoadingComponent loading={loading} />
                ) : (
                  <TableBody>
                    {eventList?.map((row) => (
                      <EventTableRow
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
            count={eventCount}
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
