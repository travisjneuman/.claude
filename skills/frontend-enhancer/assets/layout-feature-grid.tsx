// Modern Feature Grid Layout
// Copy and customize this layout for your Next.js pages

import React from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureGridProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  title,
  subtitle,
  features,
  columns = 3,
}) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl hover:bg-slate-50 transition-all duration-300 hover:shadow-lg animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Example usage with icons:
// import { Zap, Shield, Smartphone, Globe, Clock, Users } from 'lucide-react';
//
// <FeatureGrid
//   title="Why Choose Us"
//   subtitle="Everything you need to build modern web applications"
//   columns={3}
//   features={[
//     {
//       icon: <Zap size={24} />,
//       title: "Lightning Fast",
//       description: "Optimized for speed with cutting-edge performance techniques"
//     },
//     {
//       icon: <Shield size={24} />,
//       title: "Secure by Default",
//       description: "Built with security best practices from the ground up"
//     },
//     {
//       icon: <Smartphone size={24} />,
//       title: "Mobile Responsive",
//       description: "Looks great on any device, from phone to desktop"
//     },
//     {
//       icon: <Globe size={24} />,
//       title: "Global CDN",
//       description: "Delivered fast to users anywhere in the world"
//     },
//     {
//       icon: <Clock size={24} />,
//       title: "24/7 Support",
//       description: "Our team is always here to help you succeed"
//     },
//     {
//       icon: <Users size={24} />,
//       title: "Team Collaboration",
//       description: "Built for teams to work together seamlessly"
//     }
//   ]}
// />
