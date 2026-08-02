import React from 'react';
import { Mail, CheckCircle2, Archive, Clock } from 'lucide-react';
import { useGetSupplierRfqsQuery } from '../../redux/features/rfqs/rfqsApi';

export default function RFQCards() {
  const { data: rfqsData } = useGetSupplierRfqsQuery();
  const rfqs = rfqsData?.data || [];

  const newCount = rfqs.filter(r => r.status === 'pending').length;
  const respondedCount = rfqs.filter(r => r.status === 'responded' || r.status === 'reviewed').length;
  const closedCount = rfqs.filter(r => r.status === 'closed' || r.status === 'rejected').length;

  const cards = [
    {
      title: "New RFQs",
      value: newCount.toString(),
      trend: "Total this period",
      trendColor: "text-gray-500", 
      icon: <Mail size={36} className="text-gray-200" strokeWidth={1.5} />
    },
    {
      title: "Responded",
      value: respondedCount.toString(),
      trend: "Total this period",
      trendColor: "text-gray-500",
      icon: <CheckCircle2 size={36} className="text-[#D4AF37] opacity-20" strokeWidth={1.5} />
    },
    {
      title: "Closed",
      value: closedCount.toString(),
      trend: "Total this period",
      trendColor: "text-gray-500",
      icon: <Archive size={36} className="text-gray-200" strokeWidth={1.5} />
    },
    {
      title: "Avg Response Time",
      value: "N/A", // This could be calculated if we tracked response timestamps
      trend: "Data gathering",
      trendColor: "text-gray-500",
      icon: <Clock size={36} className="text-gray-200" strokeWidth={1.5} />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col relative overflow-hidden">
          <div className="absolute top-4 right-4 z-0 pointer-events-none">
            {card.icon}
          </div>
          <h3 className="text-[13px] font-bold text-gray-500 mb-2 relative z-10">{card.title}</h3>
          <p className="text-[32px] font-bold text-[#0F172A] mb-3 leading-none relative z-10">{card.value}</p>
          <div className="flex items-center gap-1.5 relative z-10">
            {card.trend.includes('+') || card.trend.includes('-') ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={card.trendColor}>
                {card.trend.includes('+') ? (
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                ) : (
                  <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                )}
                {card.trend.includes('+') ? (
                  <polyline points="16 7 22 7 22 13"></polyline>
                ) : (
                  <polyline points="16 17 22 17 22 11"></polyline>
                )}
              </svg>
            ) : null}
            <span className={`text-[11px] font-bold ${card.trendColor}`}>{card.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
