import { useQuery } from "@tanstack/react-query";
import type { Pokemon } from "@/types/pokemon";
import { getPokemon } from "@/lib/query";

const useGetPokemon = (species: string) =>
  useQuery<Pokemon>({
    queryKey: ["pokemon"],
    queryFn: () => getPokemon(species),
    // staleTime: 1000 * 60 * 0.5,
  });

export default useGetPokemon;
