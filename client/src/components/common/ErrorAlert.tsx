import React from 'react';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onRetry }) => {
  return (
    <div className="alert alert-danger d-flex align-items-center justify-content-between my-4 modern-card border-danger" role="alert">
      <div className="d-flex align-items-center">
        <i className="bi bi-exclamation-triangle-fill fs-5 me-2 text-danger"></i>
        <span>{message}</span>
      </div>
      {onRetry && (
        <button className="btn btn-sm btn-outline-danger ms-3" onClick={onRetry}>
          <i className="bi bi-arrow-clockwise me-1"></i> Retry
        </button>
      )}
    </div>
  );
};
