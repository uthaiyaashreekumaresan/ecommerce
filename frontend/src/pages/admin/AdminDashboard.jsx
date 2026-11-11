import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import {
  Typography,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';
import {
  CurrencyRupee,
  ShoppingBagOutlined,
  Inventory2Outlined,
  WarningAmberOutlined,
  ArrowForward,
  Add,
  ViewCarouselOutlined,
  PeopleOutline
} from '@mui/icons-material';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await adminService.getDashboardStats();
        if (res.success) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress sx={{ color: '#77708F' }} />
      </Box>
    );
  }

  const {
    totalRevenue = 0,
    totalOrders = 0,
    totalProducts = 0,
    totalCustomers = 0,
    lowStockCount = 0,
    lowStockProducts = [],
    recentOrders = []
  } = stats || {};

  return (
    <div>
      {/* Top Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            Store Performance Overview
          </h3>
          <Typography variant="body2" color="text.secondary">
            Live analytics and operational backoffice status
          </Typography>
        </div>

        <div className="d-flex gap-2 mt-3 mt-md-0">
          <Button
            variant="outlined"
            component={Link}
            to="/admin/homepage"
            startIcon={<ViewCarouselOutlined />}
            sx={{ borderColor: '#77708F', color: '#77708F', fontWeight: 600, '&:hover': { borderColor: '#645D7B' } }}
          >
            Home Page Manager
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/admin/products"
            startIcon={<Add />}
            sx={{ backgroundColor: '#292536', color: '#fff', '&:hover': { backgroundColor: '#000' } }}
          >
            Manage Products
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="row g-3 mb-4">
        {/* Total Revenue */}
        <div className="col-12 col-sm-6 col-xl-3">
          <Card sx={{ borderLeft: '4px solid #77708F' }}>
            <CardContent>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#777', letterSpacing: '0.5px' }}>
                  TOTAL SALES REVENUE
                </span>
                <CurrencyRupee sx={{ color: '#77708F', fontSize: 24 }} />
              </div>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#292536' }}>
                ₹{Number(totalRevenue).toLocaleString('en-IN')}
              </Typography>
              <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 600 }}>
                ↑ High margin artisanal sales
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Total Orders */}
        <div className="col-12 col-sm-6 col-xl-3">
          <Card sx={{ borderLeft: '4px solid #1976d2' }}>
            <CardContent>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#777', letterSpacing: '0.5px' }}>
                  TOTAL ORDERS
                </span>
                <ShoppingBagOutlined sx={{ color: '#1976d2', fontSize: 24 }} />
              </div>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#292536' }}>
                {totalOrders} Orders
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Processed via checkout
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Active Perfumes */}
        <div className="col-12 col-sm-6 col-xl-3">
          <Card sx={{ borderLeft: '4px solid #388e3c' }}>
            <CardContent>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#777', letterSpacing: '0.5px' }}>
                  CATALOG ITEMS
                </span>
                <Inventory2Outlined sx={{ color: '#388e3c', fontSize: 24 }} />
              </div>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#292536' }}>
                {totalProducts} Perfumes
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Eau De Parfum formulations
              </Typography>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alerts */}
        <div className="col-12 col-sm-6 col-xl-3">
          <Card sx={{ borderLeft: `4px solid ${lowStockCount > 0 ? '#d32f2f' : '#757575'}` }}>
            <CardContent>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#777', letterSpacing: '0.5px' }}>
                  LOW STOCK ALERTS
                </span>
                <WarningAmberOutlined sx={{ color: lowStockCount > 0 ? '#d32f2f' : '#757575', fontSize: 24 }} />
              </div>
              <Typography variant="h5" sx={{ fontWeight: 700, color: lowStockCount > 0 ? '#d32f2f' : '#292536' }}>
                {lowStockCount} Items
              </Typography>
              <Typography variant="caption" sx={{ color: lowStockCount > 0 ? '#d32f2f' : 'text.secondary' }}>
                {lowStockCount > 0 ? 'Requires bottle replenishment' : 'All stocks healthy (>10)'}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="row g-4">
        {/* Low Stock Replenishment Warnings (col-lg-5) */}
        <div className="col-12 col-lg-5">
          <div className="bg-white p-3 rounded border shadow-sm h-100" style={{ borderColor: '#E2DFEB' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0 d-flex align-items-center gap-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                <WarningAmberOutlined sx={{ color: '#d32f2f', fontSize: 20 }} />
                Low Stock Warning (Stock &lt; 10)
              </h6>
              <Button size="small" component={Link} to="/admin/products" sx={{ fontSize: '0.75rem' }}>
                View All
              </Button>
            </div>

            {lowStockProducts.length === 0 ? (
              <Alert severity="success" sx={{ py: 1, fontSize: '0.82rem' }}>
                No low stock alerts. All perfumes have sufficient inventory.
              </Alert>
            ) : (
              <div className="d-flex flex-column gap-2">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="d-flex align-items-center justify-content-between p-2 rounded bg-light border">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={p.image_url}
                        alt=""
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div>
                        <div className="fw-bold" style={{ fontSize: '0.85rem' }}>{p.name}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>₹{p.discount_price || p.price}</div>
                      </div>
                    </div>

                    <div className="text-end">
                      <span className="badge bg-danger mb-1 d-block" style={{ fontSize: '0.72rem' }}>
                        Only {p.stock} Left
                      </span>
                      <Button
                        size="small"
                        component={Link}
                        to="/admin/products"
                        sx={{ fontSize: '0.7rem', p: 0, color: '#1976d2' }}
                      >
                        Restock
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders Table (col-lg-7) */}
        <div className="col-12 col-lg-7">
          <div className="bg-white p-3 rounded border shadow-sm h-100" style={{ borderColor: '#E2DFEB' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0" style={{ fontFamily: 'Inter, sans-serif' }}>
                Recent Customer Orders
              </h6>
              <Button size="small" component={Link} to="/admin/orders" endIcon={<ArrowForward />} sx={{ fontSize: '0.75rem' }}>
                View All Orders
              </Button>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.82rem' }}>
                <thead className="table-light">
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">No recent orders yet.</td>
                    </tr>
                  ) : (
                    recentOrders.map((o) => (
                      <tr key={o.id}>
                        <td className="fw-bold">{o.order_number}</td>
                        <td>
                          <div>{o.customer_name}</div>
                          <small className="text-muted">{o.customer_city || o.shipping_city}</small>
                        </td>
                        <td className="fw-bold">₹{Number(o.total_amount).toLocaleString('en-IN')}</td>
                        <td>
                          <span className="badge bg-light text-dark border">{o.payment_method}</span>
                        </td>
                        <td>
                          <span className={`badge ${
                            o.order_status === 'delivered' ? 'bg-success' :
                            o.order_status === 'shipped' ? 'bg-warning text-dark' :
                            o.order_status === 'cancelled' ? 'bg-danger' : 'bg-primary'
                          }`}>
                            {o.order_status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
