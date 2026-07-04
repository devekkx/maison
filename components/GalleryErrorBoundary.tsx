"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class GalleryErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="gallery" id="gallery">
          <div style={{ padding: "4rem", textAlign: "center", opacity: 0.5 }}>
            <p>Gallery could not be loaded. Please refresh the page.</p>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}
