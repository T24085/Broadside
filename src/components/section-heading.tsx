type SectionHeadingProps = {
  title: string;
  kicker?: string;
  action?: string;
  href?: string;
};

export function SectionHeading({ title, kicker, action, href }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-heading__text">
        {kicker ? <span className="section-heading__kicker">{kicker}</span> : null}
        <h2>{title}</h2>
      </div>
      {action && href ? (
        <a className="section-heading__action" href={href}>
          {action}
        </a>
      ) : null}
    </div>
  );
}
