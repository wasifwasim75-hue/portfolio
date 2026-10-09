import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'bi-inbox',
  title,
  description,
}) => {
  return (
    <div className="text-center py-5">
      <div className="display-4 text-muted mb-3">
        <i className={`bi ${icon}`}></i>
      </div>
      <h5 className="fw-semibold text-secondary">{title}</h5>
      {description && <p className="text-muted small max-w-md mx-auto">{description}</p>}
    </div>
  );
};
