import { fetchPokemonDetails } from '@/utils/pokemon';
import { PokemonDetail } from '@/components/pokemon-detail';
import Link from 'next/link';
import { useRouter } from 'next/router'

export const getServerSideProps = (async (context) => {
    const pokemon = await fetchPokemonDetails(context.query.name);

    return { props: { pokemon } }
})

export default function PokemonPage({ pokemon }) {
    const router = useRouter();

    return (
        (<main className="container mx-auto p-4">
            <button onClick={router.back} className="text-blue-600 hover:underline my-4 inline-block">
                &larr; Back to list
            </button>
            <PokemonDetail pokemon={pokemon} />
        </main>)
    );
}