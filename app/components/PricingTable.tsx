// src/components/login/PricingTable.tsx
import { PricingMessages } from '../lib/types';

interface PricingTableProps {
  messages: PricingMessages;
}

export default function PricingTable({ messages }: PricingTableProps) {
  const pricingPlans = [
    { duration: '4 Hours', price: '5 TK', speed: '10 Mbps', popular: false },
    { duration: '1 Day', price: '10 TK', speed: '10 Mbps', popular: false },
    { duration: '3 Days', price: '30 TK', speed: '10 Mbps', popular: false },
    { duration: '7 Days', price: '50 TK', speed: '12 Mbps', popular: true },
    { duration: '15 Days', price: '100 TK', speed: '15 Mbps', popular: false },
    { duration: '30 Days', price: '150 TK', speed: '15 Mbps', popular: false }
  ];

  return (
    <div className="card elevation-2 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-warning p-2 sm:p-4 text-center">
        <h3 className="text-xl font-bold text-white text-shadow high-contrast">
          {messages.title}
        </h3>
        <h6 className="text-yellow-100 mt-2 text-sm">
          Affordable and flexible internet plans for everyone
        </h6>
      </div>

      <div className="p-6">
        {/* Pricing Table */}
        <div className="overflow-x-auto rounded-lg elevation-1">
          <table className="table w-full">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th className="p-2 sm:p-4 font-semibold text-text-primary text-left">
                  <span className="flex items-center space-x-2">
                    <span>⏱️</span>
                    <span>{messages.duration}</span>
                  </span>
                </th>
                <th className="p-2 sm:p-4 font-semibold text-text-primary text-left">
                  <span className="flex items-center space-x-2">
                    <span>💰</span>
                    <span>{messages.price}</span>
                  </span>
                </th>
                <th className="p-2 sm:p-4 font-semibold text-text-primary text-left">
                  <span className="flex items-center space-x-2">
                    <span>⚡</span>
                    <span>{messages.speed}</span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingPlans.map((plan, index) => (
                <tr 
                  key={index} 
                  className={`
                    border-b border-border transition-colors duration-200 animate-fade-in
                    ${index % 2 === 0 ? 'bg-surface' : 'bg-background'}
                    hover:bg-surface-dark
                    ${plan.popular ? 'ring-2 ring-warning ring-opacity-50 bg-accent' : ''}
                  `}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="p-2 sm:p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-text-primary font-medium text-xs sm:text-sm">{plan.duration}</span>
                      {plan.popular && (
                        <span className="bg-warning text-xs sm:text-sm p-1 rounded-full font-bold">
                          POPULAR
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-2 sm:p-4">
                    <span className="text-primary font-bold text-sm sm:text-lg high-contrast">
                      {plan.price}
                    </span>
                  </td>
                  <td className="p-2 sm:p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-text-primary text-xs sm:text-sm">{plan.speed}</span>
                      {plan.speed === '15 Mbps' && (
                        <span className="text-success text-xs sm:text-sm font-medium">🔥 Fast</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Locations Section */}
        <div className="m-2">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-success text-xl">📍</span>
            <h4 className="text-lg font-bold text-text-primary high-contrast">
              {messages.locations}
            </h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-success bg-opacity-10 rounded-lg border border-success border-opacity-20">
              <span className="text-success text-lg mt-0.5">🏢</span>
              <div>
                <div className="text-text-primary font-medium">Main Office</div> 
                <div className="text-text-primary text-sm">
                  খান পাড়া রোড, ঠেঙামারা অফিসের পাশে
                </div> 
                <div className="text-text-primary text-xs mt-1">
                  Open: 9:00 AM - 8:00 PM (Everyday)
                </div> 
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-accent bg-opacity-10 rounded-lg border border-accent border-opacity-20">
              <span className="text-accent text-lg mt-0.5">🛒</span>
              <div>
                <div className="text-text-primary font-medium">Branch Location</div> 
                <div className="text-text-primary text-sm">
                  পরমানিক পাড়া, মাজার রোড, ভদ্রঘাট মসজিদের পাশের রাস্তার ভিতরে
                </div> 
                <div className="text-text-primary text-xs mt-1">
                  Open: 10:00 AM - 6:00 PM (Sat-Thu)
                </div> 
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 p-3 bg-surface rounded-lg">
            <div className="flex items-center justify-center space-x-4 text-sm text-text-primary">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                <span>Instant Activation</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                <span>24/7 Support</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                <span>No Hidden Fees</span>
              </span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-6 text-center">
          <div className="text-text-primary text-sm">
            💡 <span className="font-medium">Need help choosing?</span> Call us at{" "}
            <a href="tel:01515213101" className="text-primary font-bold hover:underline">
              01515-213101
            </a>
          </div> 
        </div>
      </div>
    </div>
  );
}