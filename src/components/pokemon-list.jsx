import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function PokemonList({
  pokemon,
  currentPage,
  totalPages
}) {
  return (
    (<div className="space-y-4">
      <ul className="space-y-2">
        {pokemon.map((p) => (
          <li key={p.name}>
            <Link
              href={`/pokemon/${p.name}`}
              className="text-blue-600 hover:underline capitalize">
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <Button
          disabled={currentPage === 1}
          onClick={() => {
            window.location.href = `/?page=${currentPage - 1}`;
          }}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => {
            window.location.href = `/?page=${currentPage + 1}`;
          }}>
          Next
        </Button>
      </div>
    </div>)
  );
}

