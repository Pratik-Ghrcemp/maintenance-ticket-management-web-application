import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="container py-5">
      <h1 className="h3">Page not found</h1>
      <p className="text-muted">The requested page does not exist.</p>
      <Link className="btn btn-primary" to="/dashboard">
        Back to dashboard
      </Link>
    </main>
  );
};

export default NotFoundPage;
