interface GoogleLogoProps {
  size?: "large" | "small";
}

export const GoogleLogo = ({ size = "large" }: GoogleLogoProps) => {
  const textClass =
    size === "large" ? "text-7xl font-normal" : "text-2xl font-normal";

  return (
    <span
      aria-label="Google"
      className={`${textClass} select-none tracking-tight`}
      role="img"
    >
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC05" }}>o</span>
      <span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span>
      <span style={{ color: "#EA4335" }}>e</span>
    </span>
  );
};
