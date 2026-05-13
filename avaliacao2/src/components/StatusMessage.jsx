function StatusMessage({ variant = "default", children }) {
  if (!children) {
    return null;
  }

  const className = variant === "error" ? "status status--error" : "status";

  return <p className={className}>{children}</p>;
}

export default StatusMessage;
