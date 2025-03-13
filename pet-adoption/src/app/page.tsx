import Link from 'next/link';

export default function Home() {
  return (
      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li><Link href="/about">About</Link></li>
      </ol>
  );
}
