/**
 * useInView options for scroll reveals: content counts as "in view" once its top edge passes 85% of
 * the screen height. Unlike a share-of-element threshold, this works for blocks taller than the
 * screen (e.g. at high browser zoom), which would otherwise never be revealed.
 */
export const REVEAL_IN_VIEW = { threshold: 0, rootMargin: "0px 0px -15% 0px" } as const;

/**
 * Classes for content that fades and rises into place the first time it scrolls into view.
 * People who prefer reduced motion get the content straight away, without the movement.
 */
export function revealClasses(visible: boolean): string {
  return `transition duration-700 ease-out motion-reduce:transition-none ${
    visible
      ? "translate-y-0 opacity-100"
      : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
  }`;
}
