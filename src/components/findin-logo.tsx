interface FindinLogoProps {
  size?: "large" | "small";
}

export const FindinLogo = ({ size = "large" }: FindinLogoProps) => {
  const textClass =
    size === "large" ? "text-7xl font-normal" : "text-2xl font-normal";

  return (
    <span
      aria-label="Findin"
      className={`${textClass} select-none tracking-tight`}
      role="img"
    >
      <span style={{ color: "#4285F4" }}>F</span>
      <span style={{ color: "#EA4335" }}>i</span>
      <span style={{ color: "#FBBC05" }}>n</span>
      <span style={{ color: "#4285F4" }}>d</span>
      <span style={{ color: "#34A853" }}>i</span>
      <span style={{ color: "#EA4335" }}>n</span>
    </span>
  );
};
