'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const urlSearchParams = useSearchParams();
  const pathName = usePathname();

  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const newSearchParams = new URLSearchParams(urlSearchParams);
    newSearchParams.set('page', '1');
    if (term) {
      newSearchParams.set('query', term);
    } else {
      newSearchParams.delete('query');
    }
    router.replace(`${pathName}?${newSearchParams.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={(e) => handleSearch(e.target.value)}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={urlSearchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
