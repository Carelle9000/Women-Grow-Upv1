import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-700 bg-red-50 rounded-lg m-4">
          <h2>Une erreur est survenue.</h2>
          <p>Veuillez rafraîchir la page ou contacter le support.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;