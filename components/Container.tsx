import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  size?: "default" | "reading";
  className?: string;
}

export function Container({ children, size = "default", className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "reading" ? "max-w-[720px]" : "max-w-[1080px]",
        className
      )}
    >
      {children}
    </div>
  );
}
