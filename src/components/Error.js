import React from 'react';

function ErrorMessage({ message }) {
  return (
    <div>
      <div className="alert alert-danger" role="alert">
        {message}
      </div>
    </div>
  );
}

export default ErrorMessage;