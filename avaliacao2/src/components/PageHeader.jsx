function PageHeader({ title, subtitle, children }) {
  return (
    <header className="page__header">
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
      {children}
    </header>
  );
}

export default PageHeader;
