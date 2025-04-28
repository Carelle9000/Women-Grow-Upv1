// src/components/ui/button.jsx
function Button({ children, className = '', ...props }) {
    return (
      <button
        className={`px-4 py-2 bg-fuchsia-700 text-white rounded-lg hover:bg-fuchsia-800 transition ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
export default Button;  