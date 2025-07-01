import React, { useEffect, useState } from 'react';


function Activities() {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ user: '', activity_type: '', duration: '' });

  useEffect(() => {
    fetch('https://orange-carnival-gg9rggwjr56265g-8000.app.github.dev/api/activities/')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Example POST (not functional without backend support for POST)
    // fetch('https://orange-carnival-gg9rggwjr56265g-8000.app.github.dev/api/activities/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form)
    // })
    //   .then(res => res.json())
    //   .then(data => setActivities([...activities, data]));
    setShowModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="text-primary">Activities</h1>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>Add Activity</button>
      </div>
      <div className="row">
        {activities.map(activity => (
          <div className="col-md-4 mb-4" key={activity._id}>
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">{activity.activity_type}</h5>
                <h6 className="card-subtitle mb-2 text-muted">User: {activity.user}</h6>
                <p className="card-text">Duration: {activity.duration}</p>
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
                <h5 className="modal-title">Add Activity</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">User</label>
                    <input type="text" className="form-control" name="user" value={form.user} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Activity Type</label>
                    <input type="text" className="form-control" name="activity_type" value={form.activity_type} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Duration</label>
                    <input type="text" className="form-control" name="duration" value={form.duration} onChange={handleChange} />
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

export default Activities;
