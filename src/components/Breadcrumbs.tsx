import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { RoutePath } from '../data/agencyData';

export interface BreadcrumbItem {
  label: string;
  path?: RoutePath | string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: RoutePath) => void;
  subtitle?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
  subtitle,
}) => {
  return (
    <div className="bg-gradient-to-r from-[#F8F7FF] via-[#FAF9FE] to-[#EEF0FF] border-b border-indigo-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-slate-500">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex items-center gap-1 text-slate-500 hover:text-[#6A35FF] font-medium transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Home</span>
          </a>

          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <React.Fragment key={`${item.label}-${idx}`}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" aria-hidden="true" />
                {isLast || !item.path ? (
                  <span className="font-bold text-[#0B0F19] truncate max-w-[280px] sm:max-w-none">
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.path as RoutePath);
                    }}
                    className="hover:text-[#6A35FF] font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {subtitle && (
          <div className="hidden md:block text-xs font-medium text-slate-500 truncate">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
