/**
 * The app icon: three bars over a dashed passing line, echoing the chart on
 * the home screen. Drawn full-bleed; iOS and Android apply their own mask.
 * Rendered by `next/og`, so only inline styles.
 */
export function AppIcon({ size }: { size: number }) {
  const unit = size / 16;
  const bars = [6, 9, 4.5];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: unit,
        paddingBottom: unit * 4,
        background: "linear-gradient(180deg, #2a8cff 0%, #0062e0 100%)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: unit * 3,
          right: unit * 3,
          bottom: unit * 4 + unit * 5.2,
          borderTop: `${Math.max(1, unit * 0.35)}px dashed rgba(255,255,255,0.7)`,
        }}
      />
      {bars.map((height, index) => (
        <div
          key={index}
          style={{
            width: unit * 2.2,
            height: unit * height,
            background: "#ffffff",
            borderRadius: unit * 0.5,
          }}
        />
      ))}
    </div>
  );
}
