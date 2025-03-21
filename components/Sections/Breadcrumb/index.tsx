import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <ul className="flex text-gray-500 text-sm lg:text-sm pb-12 wow animate__animated animate__fadeIn animated">
      {items.map((item, index) => (
        <li key={index} className="inline-flex items-center">
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-500 text-gray-800">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-400">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-5 w-auto text-gray-300">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          )}
        </li>
      ))}
    </ul>
  );
};


