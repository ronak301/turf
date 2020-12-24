/**
 * Need to use a class component because of
 * https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes
 */

import React, { ReactNode, ErrorInfo } from 'react';

class ErrorBoundary extends React.Component<
  { fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode }) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { fallback, children } = this.props;

    if (this.state.hasError) {
      return fallback;
    }

    return children;
  }
}

export default ErrorBoundary;
