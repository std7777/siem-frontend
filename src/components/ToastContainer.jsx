import React from "react";

function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div className="toast" key={t.id}>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;

