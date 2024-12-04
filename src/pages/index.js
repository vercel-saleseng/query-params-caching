import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fetchPokemon } from '@/utils/pokemon';
import { PokemonList } from '@/components/pokemon-list';

export const getServerSideProps = (async (context) => {
  // Check the x-vercel-cache header
  const cacheStatus = context.req.headers['x-vercel-cache'] || 'MISS'

  let statusMessage;

  switch (cacheStatus) {
    case 'HIT':
      statusMessage = '😊 Page was served from the cache'
      break
    case 'MISS':
      statusMessage = '😢 Page was not served from the cache'
      break
    case 'STALE':
      statusMessage = '🧓 Page was served from stale cache'
      break
    default:
      statusMessage = 'Unknown cache status'
  }

  // Get list of pokemon
  const page = Number(context.query.page) || 1;
  const limit = 25;
  const offset = (page - 1) * limit;

  const data = await fetchPokemon(offset, limit);
  const totalPages = Math.ceil(data.count / limit);

  // console.log(data)

  return { props: { data, page, totalPages, statusMessage } }
})

export default function Index({ data, page, totalPages, statusMessage }) {

  return (
    (<main className="container mx-auto p-4">
      <Alert>
        <AlertTitle className="font-bold">Cache Status</AlertTitle>
        <AlertDescription>
          {statusMessage}
        </AlertDescription>
      </Alert>
      <h1 className="text-3xl font-bold my-4">Pokémon List</h1>
      <PokemonList pokemon={data.results} currentPage={page} totalPages={totalPages} />
    </main>)
  );
}