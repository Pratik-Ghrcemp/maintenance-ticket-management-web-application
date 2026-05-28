import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth.js';
import { useToast } from '../hooks/useToast.js';
import { getRegistrationDepartmentsRequest } from '../services/authService.js';
import { AUTHOR } from '../utils/constants.js';

const initialForm = {
  name: '',
  email: '',
  password: '',
  role: 'department_user',
  department_id: ''
};

const RegisterPage = () => {
  const [form, setForm] = useState(initialForm);
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [departments, setDepartments] = useState([]);
  const { isAuthenticated, register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadDepartments = async () => {
      const response = await getRegistrationDepartmentsRequest();
      if (response.success) {
        setDepartments(response.data);
      }
    };

    loadDepartments();
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const departmentRequired = form.role === 'department_user';

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setServerError('');

    if (!event.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    setValidated(true);
    setIsSubmitting(true);
    const response = await register({
      ...form,
      department_id: form.department_id ? Number(form.department_id) : null
    });
    setIsSubmitting(false);

    if (!response.success) {
      setServerError(response.message);
      showToast({ title: 'Registration failed', message: response.message, variant: 'danger' });
      return;
    }

    showToast({ title: 'Account created', message: 'You are signed in.', variant: 'success' });
    navigate('/dashboard', { replace: true });
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="mb-4">
          <h1 className="h3 mb-1">Create account</h1>
          <p className="text-muted mb-0">Set up access for the maintenance console.</p>
          <p className="creator-credit mb-0 mt-2">Project by {AUTHOR.name}</p>
        </div>

        {serverError ? <div className="alert alert-danger">{serverError}</div> : null}

        <form className={validated ? 'was-validated' : ''} noValidate onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-control"
              id="name"
              name="name"
              type="text"
              minLength={2}
              maxLength={120}
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Name must be at least 2 characters.</div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Enter a valid email address.</div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              id="password"
              name="password"
              type="password"
              minLength={8}
              pattern="(?=.*[A-Za-z])(?=.*\d).{8,}"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Use at least 8 characters with one letter and one number.
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="role">
              Role
            </label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="department_user">Department user</option>
              <option value="technician">Technician</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="department_id">
              Department
            </label>
            <select
              className="form-select"
              id="department_id"
              name="department_id"
              value={form.department_id}
              onChange={handleChange}
              required={departmentRequired}
            >
              <option value="">{departmentRequired ? 'Select department' : 'No department'}</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            <div className="form-text">
              {departmentRequired ? 'Department users must belong to an existing department.' : 'Optional for technician accounts.'}
            </div>
            <div className="invalid-feedback">Please select a department.</div>
          </div>

          <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-muted small mb-0 mt-3">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
        <div className="creator-links mt-3 pt-3 border-top">
          <a href={AUTHOR.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <span>|</span>
          <a href={AUTHOR.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
