import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fetchPokemon } from '@/utils/pokemon';
import { PokemonList } from '@/components/pokemon-list';

export const getServerSideProps = (async (context) => {
  // Get list of pokemon
  const page = Number(context.query.page) || 1;
  const limit = 25;
  const offset = (page - 1) * limit;

  const data = await fetchPokemon(offset, limit);
  const totalPages = Math.ceil(data.count / limit);

  return { props: { data, page, totalPages } }
})

export default function Index({ data, page, totalPages }) {

  return (
    (<main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-4">Pokémon List</h1>
      <PokemonList pokemon={data.results} currentPage={page} totalPages={totalPages} />
    </main>)
  );
}