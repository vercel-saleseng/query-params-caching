import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PokemonDetail({
  pokemon
}) {
  return (
    (<Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold capitalize">{pokemon.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={200}
            height={200} />
        </div>
        <div className="space-y-2">
          <p><strong>Height:</strong> {pokemon.height / 10} m</p>
          <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Types:</strong> {pokemon.types.map((t) => t.type.name).join(', ')}</p>
          <p><strong>Abilities:</strong> {pokemon.abilities.map((a) => a.ability.name).join(', ')}</p>
        </div>
      </CardContent>
    </Card>)
  );
}

