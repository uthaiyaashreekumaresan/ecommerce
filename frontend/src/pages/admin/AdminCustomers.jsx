import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Typography, CircularProgress, Chip, Box } from '@mui/material';
import { PeopleOutline } from '@mui/icons-material';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const res = await adminService.getAllCustomers();
        if (res.success) {
          setCustomers(res.data);
        }
      } catch (err) {
        console.error('Failed to load customers:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <h3 className="fw-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
          Customer Accounts
        </h3>
        <Typography variant="body2" color="text.secondary">
          Registered perfume lovers and their lifetime shopping engagement
        </Typography>
      </div>

      <div className="bg-white rounded border shadow-sm" style={{ borderColor: '#E2DFEB' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#77708F' }} />
          </Box>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
              <thead className="table-light">
                <tr>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Orders Count</th>
                  <th>Total Spent</th>
                  <th>Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id}>
                    <td className="fw-bold">{c.name}</td>
                    <td>{c.email}</td>
                    <td>
                      <span className={`badge ${c.role === 'admin' ? 'bg-dark text-warning' : 'bg-light text-dark border'}`}>
                        {c.role}
                      </span>
                    </td>
                    <td>{c.phone || '—'}</td>
                    <td>{c.city || '—'}</td>
                    <td>
                      <span className="badge bg-secondary-subtle text-dark border">
                        {c.total_orders || 0} Orders
                      </span>
                    </td>
                    <td className="fw-bold">
                      ₹{Number(c.total_spent || 0).toLocaleString('en-IN')}
                    </td>
                    <td>
                      {new Date(c.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
