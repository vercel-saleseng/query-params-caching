import { fetchPokemonDetails } from '@/utils/pokemon';
import { PokemonDetail } from '@/components/pokemon-detail';
import Link from 'next/link';


export const getServerSideProps = (async (context) => {
    const pokemon = await fetchPokemonDetails(context.query.name);

    return { props: { pokemon, statusMessage } }
})

export default function PokemonPage({ pokemon, statusMessage, headers }) {

    return (
        (<main className="container mx-auto p-4">
            <Link href="/" className="text-blue-600 hover:underline my-4 inline-block">
                &larr; Back to list
            </Link>
            <PokemonDetail pokemon={pokemon} />
        </main>)
    );
}