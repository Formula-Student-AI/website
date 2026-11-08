/**
 * The background of the site's navy sections: two soft red glows and a faint grid.
 * Put it inside an element with "relative isolate overflow-hidden bg-logo-blue".
 */
export default function BrandGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-university-red/25 blur-3xl" />
      <div className="absolute -bottom-56 -left-48 h-[36rem] w-[36rem] rounded-full bg-university-red/15 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_15%,transparent_70%)]" />
    </div>
  );
}
