import { Table } from "@gravity-ui/uikit";

const dataFormat = .map((item) => ({
  major: (
    <Link to={'/form/' + String(item.form_id)}>
      {item.major}
    </Link>
  ),
  status: (
    <div className="flex justify-between">
      {item.status.map((status) => (
        <Link
          to={'/form/' + String(item.form_id)}
        >
          <Label
            theme={
              status === 'in_progress'
                ? 'info'
                : status === 'complete'
                  ? 'success'
                  : status ===
                      'submitted_for_review'
                    ? 'warning'
                    : 'danger'
            }
          >
            {status === 'in_progress'
              ? 'In Progress'
              : status === 'complete'
                ? 'Complete'
                : status ===
                    'submitted_for_review'
                  ? 'Submitted For Review'
                  : 'Rejected'}
          </Label>
        </Link>
      ))}
    </div>
  ),
  updated: item.updated,
}));

const col = [
  {id: 'major', name: 'Major', width: 400},
  {id: 'status', name: 'Status', width: 200},
  {id: 'updated', name: 'Updated', width: 500},
];

const ElectiveTable = ({}) => {<Table data={dataFormat} columns={col} />};

export default ElectiveTable;
