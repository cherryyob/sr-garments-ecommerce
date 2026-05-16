const SpinLoader = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "300px", width: "100%" }}
    >
      {/* Outer Container for the custom overlapping rings */}
      <div
        className="position-relative d-flex justify-content-center align-items-center"
        style={{ width: "90px", height: "90px" }}
      >
        {/* Ring 1: Large primary spinner (Slow clockwise) */}
        <div
          className="spinner-border text-danger position-absolute"
          role="status"
          style={{
            width: "90px",
            height: "90px",
            borderThickness: "5px",
            animationDuration: "2s",
          }}
        />

        {/* Ring 2: Medium warning spinner (Fast counter-clockwise) */}
        <div
          className="spinner-border text-warning position-absolute"
          role="status"
          style={{
            width: "65px",
            height: "65px",
            animationDirection: "reverse",
            animationDuration: "1s",
          }}
        />

        {/* Ring 3: Small dark spinner (Very fast clockwise) */}
        <div
          className="spinner-border text-dark position-absolute"
          role="status"
          style={{ width: "40px", height: "40px", animationDuration: "0.5s" }}
        />

        {/* Core Dot: Growing/pulsing center point */}
        <div
          className="spinner-grow text-danger position-absolute"
          role="status"
          style={{ width: "15px", height: "15px", animationDuration: "1.2s" }}
        />
      </div>

      {/* Pulsing loading text using Bootstrap utility classes */}
      <span className="mt-4 text-muted fw-bold text-uppercase tracking-wider placeholder-glow">
        <span className="placeholder col-12 bg-transparent">
          Loading Details...
        </span>
      </span>
    </div>
  );
};

export default SpinLoader;
