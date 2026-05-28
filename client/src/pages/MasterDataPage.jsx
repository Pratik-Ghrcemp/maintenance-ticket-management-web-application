import { useEffect, useState } from 'react';

import { useToast } from '../hooks/useToast.js';
import {
  createMasterData,
  deleteMasterData,
  getMasterData,
  updateMasterData
} from '../services/masterDataService.js';

const resources = [
  { key: 'departments', label: 'Departments' },
  { key: 'facilities', label: 'Facilities' },
  { key: 'areas', label: 'Areas' },
  { key: 'categories', label: 'Categories' }
];

const emptyForm = { name: '', code: '', address: '', facility_id: '', is_active: true };

const MasterDataPage = () => {
  const [resource, setResource] = useState('departments');
  const [records, setRecords] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const { showToast } = useToast();

  const loadRecords = async () => {
    const response = await getMasterData(resource, { search, limit: 50 });
    if (response.success) setRecords(response.data);
  };

  useEffect(() => {
    loadRecords();
  }, [resource, search]);

  useEffect(() => {
    const loadFacilities = async () => {
      const response = await getMasterData('facilities', { limit: 100 });
      if (response.success) setFacilities(response.data);
    };
    loadFacilities();
  }, []);

  const reset = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    const payload = { ...form };
    if (resource !== 'areas') delete payload.facility_id;
    if (resource !== 'facilities') delete payload.address;
    if (!['departments', 'facilities'].includes(resource)) delete payload.code;
    const response = editingId
      ? await updateMasterData(resource, editingId, payload)
      : await createMasterData(resource, payload);
    if (response.success) {
      showToast({ title: 'Master data', message: 'Record saved.', variant: 'success' });
      reset();
      loadRecords();
    } else {
      showToast({ title: 'Master data failed', message: response.message, variant: 'danger' });
    }
  };

  const edit = (record) => {
    setEditingId(record.id);
    setForm({
      name: record.name || '',
      code: record.code || '',
      address: record.address || '',
      facility_id: record.facilityId ? String(record.facilityId) : '',
      is_active: record.isActive
    });
  };

  const remove = async (id) => {
    const response = await deleteMasterData(resource, id);
    if (response.success) {
      showToast({ title: 'Master data', message: 'Record deleted.', variant: 'success' });
      loadRecords();
    } else {
      showToast({ title: 'Delete failed', message: response.message, variant: 'danger' });
    }
  };

  return (
    <section>
      <h1 className="h3 mb-3">Master Data</h1>
      <div className="d-flex gap-2 mb-3 flex-wrap">
        {resources.map((item) => (
          <button key={item.key} className={`btn btn-sm ${resource === item.key ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => { setResource(item.key); reset(); }}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="row g-3">
        <div className="col-lg-4">
          <form className="card" onSubmit={submit}>
            <div className="card-body">
              <h2 className="h5">{editingId ? 'Edit' : 'Create'} {resource}</h2>
              <label className="form-label">Name</label>
              <input className="form-control mb-2" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
              {['departments', 'facilities'].includes(resource) ? (
                <>
                  <label className="form-label">Code</label>
                  <input className="form-control mb-2" value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value })} />
                </>
              ) : null}
              {resource === 'facilities' ? (
                <>
                  <label className="form-label">Address</label>
                  <input className="form-control mb-2" value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} />
                </>
              ) : null}
              {resource === 'areas' ? (
                <>
                  <label className="form-label">Facility</label>
                  <select className="form-select mb-2" value={form.facility_id} onChange={(event) => setForm({ ...form, facility_id: event.target.value })} required>
                    <option value="">Select facility</option>
                    {facilities.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                </>
              ) : null}
              <button className="btn btn-primary me-2" type="submit">Save</button>
              <button className="btn btn-outline-secondary" type="button" onClick={reset}>Clear</button>
            </div>
          </form>
        </div>
        <div className="col-lg-8">
          <input className="form-control mb-3" placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead><tr><th>Name</th><th>Code</th><th>Related</th><th></th></tr></thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.name}</td>
                    <td>{record.code || '-'}</td>
                    <td>{record.facility?.name || record.address || '-'}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => edit(record)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => remove(record.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterDataPage;
