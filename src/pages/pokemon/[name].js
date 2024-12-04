import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { fetchPokemonDetails } from '@/utils/pokemon';
import { PokemonDetail } from '@/components/pokemon-detail';
import { useRouter } from 'next/router'
import Link from 'next/link';

export const getServerSideProps = (async (context) => {
    // console.log(context)
    // Check the x-vercel-cache header
    const cacheStatus = context.req.headers['X-Vercel-Cache'] || 'MISS'

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

    // const router = useRouter()
    const pokemon = await fetchPokemonDetails(context.query.name);

    return { props: { pokemon, statusMessage } }
})

export default function PokemonPage({ pokemon, statusMessage }) {

    return (
        (<main className="container mx-auto p-4">
            <Alert>
                <AlertTitle className="font-bold">Cache Status</AlertTitle>
                <AlertDescription>
                    {statusMessage}
                </AlertDescription>
            </Alert>
            <Link href="/" className="text-blue-600 hover:underline my-4 inline-block">
                &larr; Back to list
            </Link>
            <PokemonDetail pokemon={pokemon} />
        </main>)
    );
}