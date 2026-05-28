const statuses = ['', 'Pending', 'Assigned', 'In Progress', 'Resolved', 'Closed'];
const priorities = ['', 'Low', 'Medium', 'High', 'Urgent'];

const TicketFilters = ({ filters, onChange, lookups, userRole }) => {
  const showAdminFilters = userRole === 'admin';

  const update = (event) => {
    const { name, value } = event.target;
    onChange({ ...filters, [name]: value, page: 1 });
  };

  return (
    <div className="row g-2 align-items-end mb-3">
      <div className="col-md-3">
        <label className="form-label">Search</label>
        <input className="form-control" name="search" value={filters.search || ''} onChange={update} />
      </div>
      <div className="col-md-2">
        <label className="form-label">Status</label>
        <select className="form-select" name="status" value={filters.status || ''} onChange={update}>
          {statuses.map((item) => (
            <option key={item || 'all'} value={item}>{item || 'All'}</option>
          ))}
        </select>
      </div>
      <div className="col-md-2">
        <label className="form-label">Priority</label>
        <select className="form-select" name="priority" value={filters.priority || ''} onChange={update}>
          {priorities.map((item) => (
            <option key={item || 'all'} value={item}>{item || 'All'}</option>
          ))}
        </select>
      </div>
      {showAdminFilters ? (
        <>
          <div className="col-md-2">
            <label className="form-label">Technician</label>
            <select className="form-select" name="technician" value={filters.technician || ''} onChange={update}>
              <option value="">All</option>
              {lookups.technicians.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Department</label>
            <select className="form-select" name="department" value={filters.department || ''} onChange={update}>
              <option value="">All</option>
              {lookups.departments.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        </>
      ) : null}
      <div className="col-md-2">
        <label className="form-label">Category</label>
        <select className="form-select" name="category" value={filters.category || ''} onChange={update}>
          <option value="">All</option>
          {lookups.categories.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="col-md-2">
        <label className="form-label">Date</label>
        <input className="form-control" name="date" type="date" value={filters.date || ''} onChange={update} />
      </div>
    </div>
  );
};

export default TicketFilters;
