import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth.js';
import { useToast } from '../hooks/useToast.js';
import { getMasterData } from '../services/masterDataService.js';
import { createTicket } from '../services/ticketService.js';

const initialForm = { title: '', description: '', priority: 'Medium', facility_id: '', area_id: '', category_id: '', department_id: '', image: null };

const CreateTicketPage = () => {
  const [form, setForm] = useState(initialForm);
  const [lookups, setLookups] = useState({ departments: [], facilities: [], areas: [], categories: [] });
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const loadLookups = async () => {
      const [departments, facilities, areas, categories] = await Promise.all([
        getMasterData('departments', { limit: 100 }),
        getMasterData('facilities', { limit: 100 }),
        getMasterData('areas', { limit: 100 }),
        getMasterData('categories', { limit: 100 })
      ]);
      setLookups({
        departments: departments.success ? departments.data : [],
        facilities: facilities.success ? facilities.data : [],
        areas: areas.success ? areas.data : [],
        categories: categories.success ? categories.data : []
      });
    };
    loadLookups();
  }, []);

  useEffect(() => {
    if (!isAdmin && user?.department_id && !form.department_id) {
      setForm((current) => ({ ...current, department_id: String(user.department_id) }));
    }
  }, [isAdmin, user, form.department_id]);

  const update = (event) => {
    const { name, value, files } = event.target;
    setForm((current) => ({
      ...current,
      [name]: files ? files[0] : value,
      ...(name === 'facility_id' ? { area_id: '' } : {})
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!event.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }
    setValidated(true);
    setIsSubmitting(true);
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    const response = await createTicket(data);
    setIsSubmitting(false);
    if (response.success) {
      showToast({ title: 'Ticket created', message: 'Ticket has been submitted.', variant: 'success' });
      navigate(`/tickets/${response.data.id}`);
    } else {
      showToast({ title: 'Create ticket failed', message: response.message, variant: 'danger' });
    }
  };

  const filteredAreas = lookups.areas.filter((area) => !form.facility_id || area.facilityId === Number(form.facility_id));

  return (
    <section>
      <h1 className="h3 mb-3">Create Ticket</h1>
      <form className={validated ? 'was-validated' : ''} noValidate onSubmit={submit}>
        <div className="row g-3">
          <div className="col-md-8">
            <label className="form-label">Title</label>
            <input className="form-control" name="title" value={form.title} onChange={update} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Priority</label>
            <select className="form-select" name="priority" value={form.priority} onChange={update}>
              {['Low', 'Medium', 'High', 'Urgent'].map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" rows="4" value={form.description} onChange={update} required />
          </div>
          <SelectField name="facility_id" label="Facility" value={form.facility_id} onChange={update} items={lookups.facilities} />
          <SelectField name="area_id" label="Area" value={form.area_id} onChange={update} items={filteredAreas} />
          <SelectField name="category_id" label="Category" value={form.category_id} onChange={update} items={lookups.categories} />
          {isAdmin ? (
            <SelectField name="department_id" label="Department" value={form.department_id} onChange={update} items={lookups.departments} />
          ) : (
            <div className="col-md-3">
              <label className="form-label">Department</label>
              <input
                className="form-control"
                value={lookups.departments.find((item) => item.id === Number(form.department_id))?.name || 'Your department'}
                disabled
                readOnly
              />
            </div>
          )}
          <div className="col-md-6">
            <label className="form-label">Image</label>
            <input className="form-control" name="image" type="file" accept="image/*" onChange={update} />
          </div>
        </div>
        <div className="mt-4">
          <button className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Ticket'}</button>
        </div>
      </form>
    </section>
  );
};

const SelectField = ({ name, label, value, onChange, items }) => (
  <div className="col-md-3">
    <label className="form-label">{label}</label>
    <select className="form-select" name={name} value={value} onChange={onChange} required>
      <option value="">Select</option>
      {items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
    </select>
  </div>
);

export default CreateTicketPage;
