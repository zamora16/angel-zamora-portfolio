import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 19V9" />
      <path d="M9 19V5" />
      <path d="M14 19V12" />
      <path d="M19 19V7" />
      <path d="M3 19h18" />
    </svg>
  );
}
