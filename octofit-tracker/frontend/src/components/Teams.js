import React, { useEffect, useState } from 'react';


function Teams() {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', members: '' });

  useEffect(() => {
    fetch('https://orange-carnival-gg9rggwjr56265g-8000.app.github.dev/api/teams/')
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="text-primary">Teams</h1>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>Add Team</button>
      </div>
      <div className="row">
        {teams.map(team => (
          <div className="col-md-4 mb-4" key={team._id}>
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">Members: {team.members && Array.isArray(team.members) ? team.members.map(m => m.username || m).join(', ') : ''}</p>
                <button className="btn btn-outline-primary btn-sm">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Team</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Team Name</label>
                    <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Members (comma separated)</label>
                    <input type="text" className="form-control" name="members" value={form.members} onChange={handleChange} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                  <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
