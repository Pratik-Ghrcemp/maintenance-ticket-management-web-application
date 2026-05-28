import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AssignmentModal = ({ show, ticket, technicians, onClose, onAssign }) => {
  const [technicianId, setTechnicianId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setIsSubmitting(true);
    await onAssign(technicianId);
    setIsSubmitting(false);
    setTechnicianId('');
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Assign Technician</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted">Ticket #{ticket?.id}: {ticket?.title}</p>
        <label className="form-label" htmlFor="assign-technician">Technician</label>
        <select
          className="form-select"
          id="assign-technician"
          value={technicianId}
          onChange={(event) => setTechnicianId(event.target.value)}
        >
          <option value="">Select technician</option>
          {technicians.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={submit} disabled={!technicianId || isSubmitting}>
          {isSubmitting ? 'Assigning...' : 'Assign'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignmentModal;
