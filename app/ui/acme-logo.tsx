import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <EllipsisHorizontalCircleIcon className="h-15 w-15 rotate-[30deg]" />
      <p className="text-[20px]">Central Nullify Solutions</p>
    </div>
  );
}
