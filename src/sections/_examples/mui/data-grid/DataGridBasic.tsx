// @mui
import { DataGrid } from '@mui/x-data-grid';
// ----------------------------------------------------------------------

type Props = {
  data: any[];
  columns?: any;
};

export default function DataGridBasic({ data, columns } : Props) {
  return <DataGrid columns={columns} rows={data} checkboxSelection disableSelectionOnClick />;
}
