import Container from "../common/container";

interface SponsorsContentProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function SponsorsContent({ 
  title = "Our Sponsors", 
  description = "We are grateful to our sponsors for their support.",
  children 
}: SponsorsContentProps) {
  return (
    <Container>
      <div className="mt-8">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          {title}
        </h2>
        <p className="text-lg mt-5 max-w-3xl">
          {description}
        </p>
        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
      </div>
    </Container>
  );
}
