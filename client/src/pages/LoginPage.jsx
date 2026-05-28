import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth.js';
import { useToast } from '../hooks/useToast.js';
import { AUTHOR } from '../utils/constants.js';

const initialForm = {
  email: '',
  password: ''
};

const LoginPage = () => {
  const [form, setForm] = useState(initialForm);
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const { isAuthenticated, login } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

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
    const response = await login(form);
    setIsSubmitting(false);

    if (!response.success) {
      setServerError(response.message);
      showToast({ title: 'Login failed', message: response.message, variant: 'danger' });
      return;
    }

    showToast({ title: 'Welcome back', message: 'You are signed in.', variant: 'success' });
    navigate(redirectTo, { replace: true });
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="mb-4">
          <h1 className="h3 mb-1">Sign in</h1>
          <p className="text-muted mb-0">Access the maintenance ticket console.</p>
          <p className="creator-credit mb-0 mt-2">Project by {AUTHOR.name}</p>
        </div>

        {serverError ? <div className="alert alert-danger">{serverError}</div> : null}

        <form className={validated ? 'was-validated' : ''} noValidate onSubmit={handleSubmit}>
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
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">Password is required.</div>
          </div>

          <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-muted small mb-0 mt-3">
          Need an account? <Link to="/register">Create one</Link>
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

export default LoginPage;
