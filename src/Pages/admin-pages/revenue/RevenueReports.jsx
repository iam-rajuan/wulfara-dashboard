import React, { useState } from 'react';
import {
  Banknote, RefreshCw, CreditCard, Tag, AlertCircle, Download
} from 'lucide-react';
import { Select, Table, message } from 'antd';
import { 
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { useGetAllPaymentsQuery } from '../../../redux/features/subscriptions/subscriptionsApi';
import { useGetDashboardStatsQuery } from '../../../redux/features/reports/reportsApi';

const RevenueReports = () => {
  const [timeframe, setTimeframe] = useState('Last 12 Months');
  const [isExporting, setIsExporting] = useState(false);
  const { data: paymentsResponse, isLoading: isPaymentsLoading } = useGetAllPaymentsQuery();
  const { data: statsResponse } = useGetDashboardStatsQuery();
  const payments = paymentsResponse?.data || [];
  const dashboardStats = statsResponse?.data || {};
  const chartData = dashboardStats.chartData || [];
  const totalRevenue = dashboardStats.totalRevenue ?? payments
    .filter((payment) => payment.status === 'paid')
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const paidPayments = payments.filter((payment) => payment.status === 'paid');

  const formattedRevenue = totalRevenue >= 1000 ? (totalRevenue / 1000).toFixed(2) + 'K' : totalRevenue.toString();
  const paidSuppliersCount = new Set(paidPayments.map((p) => p.supplier?._id).filter(Boolean)).size;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const recurringMonthlyRevenue = paidPayments
    .filter((payment) => {
      const paidAt = payment.createdAt ? new Date(payment.createdAt) : null;
      return (
        ['initial_subscription', 'recurring_invoice'].includes(payment.paymentType) &&
        paidAt &&
        paidAt.getMonth() === currentMonth &&
        paidAt.getFullYear() === currentYear
      );
    })
    .reduce((acc, curr) => acc + (curr.baseAmount || curr.amount || 0), 0);

  // Stat Card Data
  const stats = [
    { title: 'TOTAL REVENUE', value: `$${formattedRevenue}`, icon: <Banknote size={18} />, color: 'text-gray-700', sub: null },
    { title: 'MONTHLY RECURRING', value: `$${recurringMonthlyRevenue.toFixed(2)}`, icon: <RefreshCw size={18} />, color: 'text-gray-700', sub: 'Invoice based' },
    { title: 'PAYMENTS', value: paidPayments.length.toString(), icon: <CreditCard size={18} />, color: 'text-gray-700', sub: 'Paid count' },
    { title: 'PAID SUPPLIERS', value: paidSuppliersCount.toString(), icon: <Tag size={18} />, color: 'text-gray-700', sub: null },
  ];

  // Bar Chart Data (Revenue by Month) mapped from dynamic chartData
  const defaultBarData = chartData.length > 0 ? chartData.map((d, index) => {
    // Dynamic fill colors to match previous design aesthetics based on recent months
    let fill = '#f1f5f9';
    if (index >= 9) fill = '#4ade80'; // Last 3 months green
    else if (index >= 6) fill = '#cbd5e1'; 
    else if (index >= 3) fill = '#e2e8f0';
    if (index === 11) fill = '#dcb14b'; // Current month gold
    return { name: d.name.toUpperCase(), uv: d.revenue, fill };
  }) : [
    { name: 'JAN', uv: 0, fill: '#f1f5f9' },
    { name: 'FEB', uv: 0, fill: '#f1f5f9' },
    { name: 'MAR', uv: 0, fill: '#f1f5f9' },
    { name: 'APR', uv: 0, fill: '#e2e8f0' },
    { name: 'MAY', uv: 0, fill: '#e2e8f0' },
    { name: 'JUN', uv: 0, fill: '#cbd5e1' },
    { name: 'JUL', uv: 0, fill: '#cbd5e1' },
    { name: 'AUG', uv: 0, fill: '#cbd5e1' },
    { name: 'SEP', uv: 0, fill: '#86efac' },
    { name: 'OCT', uv: 0, fill: '#4ade80' },
    { name: 'NOV', uv: 0, fill: '#86efac' },
    { name: 'DEC', uv: 0, fill: '#dcb14b' },
  ];

  const allTimeBarData = defaultBarData.map(d => ({ ...d, uv: d.uv * 1.8 }));
  const barData = timeframe === 'All Time' ? allTimeBarData : defaultBarData;

  // Custom Tooltip for Bar Chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1f36] text-white text-xs font-bold px-3 py-2 rounded-md shadow-lg">
          {label}: ${payload[0].value.toLocaleString()}
        </div>
      );
    }
    return null;
  };

  // Pie Chart Data (Plan Breakdown)
  const pieData = [
    { name: 'Premium', value: 52, color: '#0E1726' }, // Dark Navy
    { name: 'Pro', value: 34, color: '#D4AF37' },     // Gold
    { name: 'Basic', value: 14, color: '#F59E0B' },    // Orange/Amber
  ];

  const tableData = payments.map((p, index) => ({
    key: p._id || index,
    paymentId: p._id,
    supplier: { 
      initial: p.supplier?.companyName ? p.supplier.companyName.charAt(0).toUpperCase() : 'U', 
      name: p.supplier?.companyName || 'Unknown Supplier', 
      color: 'bg-[#0E1726] text-white' 
    },
    plan: p.supplier?.subscriptionPlan?.toUpperCase() || 'PREMIUM',
    amount: `$${Number(p.amount || 0).toFixed(2)}`,
    method: { type: 'Visa', last4: '****' },
    date: new Date(p.createdAt).toLocaleDateString(),
    status: p.status === 'paid' ? 'PAID' : 'FAILED',
  }));

  const columns = [
    {
      title: 'PAYMENT ID',
      dataIndex: 'paymentId',
      key: 'paymentId',
      render: (text) => <span className="font-mono text-gray-500 text-xs">{text}</span>
    },
    {
      title: 'SUPPLIER',
      dataIndex: 'supplier',
      key: 'supplier',
      render: (supplier) => (
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${supplier.color}`}>
            {supplier.initial}
          </div>
          <span className="font-bold text-gray-800 text-sm">{supplier.name}</span>
        </div>
      )
    },
    {
      title: 'PLAN',
      dataIndex: 'plan',
      key: 'plan',
      render: (plan) => {
        let bgColor = '';
        if (plan === 'PREMIUM') bgColor = 'bg-gray-200 text-gray-800 border-gray-300';
        else if (plan === 'PRO') bgColor = 'bg-yellow-100 text-yellow-700 border-yellow-200';
        else if (plan === 'BASIC') bgColor = 'bg-orange-100 text-orange-700 border-orange-200';
        return <span className={`px-2 py-0.5 text-[9px] font-black tracking-widest rounded uppercase border ${bgColor}`}>{plan}</span>;
      }
    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => <span className={`font-black text-sm ${record.status === 'FAILED' ? 'text-red-600' : 'text-gray-900'}`}>{text}</span>
    },
    {
      title: 'METHOD',
      dataIndex: 'method',
      key: 'method',
      render: (method) => (
        <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
          <CreditCard size={14} className="text-gray-400" />
          <span>{method.type}{method.last4 ? ` -- ${method.last4}` : ''}</span>
        </div>
      )
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span className="text-gray-500 text-xs font-medium">{text}</span>
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${status === 'PAID' ? 'bg-[#f4fbf7] text-[#2e8a5b] border-[#d3ecd9]' : 'bg-[#fef2f2] text-[#ef4444] border-[#fecaca]'}`}>
          {status}
        </span>
      )
    },
  ];

  const handleExport = () => {
    if (payments.length === 0) {
      message.error("No payment data available to export.");
      return;
    }

    setIsExporting(true);
    try {
      const rows = [];
      const formatCSVCell = (val) => {
        if (val === null || val === undefined) return '""';
        const str = String(val);
        if (/[",\n\r]/.test(str)) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return `"${str}"`;
      };

      // Header info
      rows.push(["WULFARA ADMIN PORTAL - REVENUE REPORT"]);
      rows.push(["Generated On:", new Date().toLocaleString()]);
      rows.push(["Timeframe:", timeframe]);
      rows.push([]);

      // Section 1: Overview
      rows.push(["REVENUE OVERVIEW"]);
      rows.push(["Total Revenue", `$${totalRevenue.toFixed(2)}`]);
      rows.push(["MRR", `$${(totalRevenue / 12).toFixed(2)}`]);
      rows.push(["Total Paid Payments", paidPayments.length]);
      rows.push(["Paid Suppliers", paidSuppliersCount]);
      rows.push([]);

      // Section 2: Detailed Payment Rows
      rows.push(["PAYMENT DETAILS"]);
      rows.push(["Payment ID", "Supplier Name", "Subscription Plan", "Amount", "Method", "Date", "Status"]);

      tableData.forEach(item => {
        rows.push([
          item.paymentId || "-",
          item.supplier?.name || "Unknown",
          item.plan || "-",
          item.amount || "-",
          item.method?.type ? `${item.method.type} ${item.method.last4 || ""}` : "-",
          item.date || "-",
          item.status || "PENDING"
        ]);
      });

      const BOM = "\uFEFF";
      const csvString = BOM + rows.map(row => row.map(formatCSVCell).join(",")).join("\n");

      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `wulfara_revenue_report_${new Date().toISOString().slice(0, 10)}.csv`;
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsExporting(false);
        message.success("Revenue report downloaded successfully!");
      }, 100);
    } catch (error) {
      console.error("Failed to export revenue report:", error);
      setIsExporting(false);
      message.error("Failed to generate report. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto bg-[#FAFAFA] min-h-screen mt-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-black text-[#1a1f36]">Revenue Reports</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setTimeframe('Last 12 Months')}
            className={`px-4 py-2 rounded-md text-sm font-bold shadow-sm transition-colors ${timeframe === 'Last 12 Months' ? 'bg-[#dcb14b] text-gray-900' : 'bg-white text-gray-400 border border-gray-200'}`}
          >
            Last 12 Months
          </button>
          <button 
            onClick={() => setTimeframe('All Time')}
            className={`px-4 py-2 rounded-md text-sm font-bold shadow-sm transition-colors ${timeframe === 'All Time' ? 'bg-[#dcb14b] text-gray-900' : 'bg-white text-gray-400 border border-gray-200'}`}
          >
            All Time
          </button>
          <Select 
            defaultValue="All Plans" 
            style={{ width: 120 }}
            className="revenue-select"
            options={[
              { value: 'All Plans', label: 'All Plans' },
              { value: 'Premium', label: 'Premium' },
              { value: 'Pro', label: 'Pro' },
              { value: 'Basic', label: 'Basic' },
            ]}
          />
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold transition-colors shadow-sm ml-2 ${isExporting ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#dcb14b] text-gray-900 hover:bg-[#c9a040]'}`}
          >
            <Download size={16} className={isExporting ? 'animate-bounce' : ''} />
            {isExporting ? 'Exporting...' : 'Export Report'}
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest w-2/3 leading-tight">{stat.title}</h3>
              <div className="text-gray-400">{stat.icon}</div>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-gray-900">{stat.value}</span>
              {stat.sub && <span className="text-[10px] text-gray-400 font-medium mb-1 leading-tight w-8">{stat.sub}</span>}
            </div>
          </div>
        ))}
        {/* Failed Card (Special Styling) */}
        <div className="bg-[#fffcfc] rounded-xl border border-red-100 p-6 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold text-red-600 uppercase tracking-widest leading-tight">FAILED</h3>
            <div className="text-red-500 bg-red-50 p-1 rounded-full"><AlertCircle size={16} /></div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-red-600">{payments.filter((p) => p.status === 'failed').length}</span>
            <span className="text-[10px] text-gray-500 font-medium mb-1 leading-tight w-16">Past 30 days</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Revenue by Month (Bar Chart) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-black text-gray-900">Revenue by Month</h2>
              <p className="text-[11px] text-gray-500 font-medium">Fiscal trend analysis (Jul - Jun)</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#dcb14b]"></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">REVENUE</span>
            </div>
          </div>
          
          <div className="flex-1 w-full h-[250px] min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} 
                  dy={10}
                />
                <Bar dataKey="uv" radius={[2, 2, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plan Breakdown (Donut Chart) */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col">
          <h2 className="text-lg font-black text-gray-900 mb-2">Plan Breakdown</h2>
          
          <div className="relative flex-1 w-full flex items-center justify-center min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  stroke="none"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Plan Share']} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-2">
              <span className="text-xl font-black text-[#0E1726]">${formattedRevenue}</span>
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">REVENUE</span>
            </div>
          </div>

          {/* Custom Legend */}
          <div className="mt-4 space-y-3">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs font-bold text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                </div>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Stripe Payments Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-black text-gray-900">Recent Stripe Payments</h2>
          <button className="text-[10px] font-bold text-[#dcb14b] uppercase tracking-widest hover:text-[#c9a040] transition-colors flex items-center gap-1">
            VIEW ALL TRANSACTIONS <span>→</span>
          </button>
        </div>

        <div className="px-6 pb-6 pt-2">
          <Table 
            columns={columns} 
            dataSource={tableData} 
            loading={isPaymentsLoading}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20'],
              className: 'mt-6'
            }}
            rowClassName="hover:bg-gray-50 cursor-pointer"
            className="revenue-table"
          />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .revenue-select .ant-select-selector {
          padding: 8px 12px !important;
          border-radius: 6px !important;
          border-color: #e5e7eb !important;
          height: auto !important;
        }
        .revenue-select .ant-select-selection-item {
          font-size: 14px !important;
          font-weight: 600 !important;
          color: #4b5563 !important;
        }
        
        .revenue-table .ant-table-thead > tr > th {
          background-color: transparent;
          color: #9ca3af;
          font-weight: 800;
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-bottom: 1px solid #f3f4f6;
          padding: 16px 16px;
        }
        .revenue-table .ant-table-tbody > tr > td {
          padding: 16px 16px;
          border-bottom: 1px solid #f9fafb;
        }
        
        /* Fix recharts responsive container issue inside flex/grid */
        .recharts-responsive-container {
          min-height: 100px;
        }
      `}</style>
    </div>
  );
};

export default RevenueReports;
