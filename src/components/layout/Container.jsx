import { cn } from "@/lib/utils";

/**
 * Consistent horizontal padding + max content width, used by the
 * navbar and every future section so spacing stays aligned across
 * the page.
 */
export default function Container({ as: Tag = "div", className, children }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[72rem] px-6 md:px-8", className)}>
      {children}
    </Tag>
  );
}
