import type { Pokemon } from "@/types/pokemon";
import { create } from "zustand";
import { getPokemon } from "./query";

interface Boats {
  boats: number;
  setBoats: (boats: number) => void;
}

interface UsePokemon {
  pokemon: Pokemon | undefined;
  isLoadingPokemon: boolean;
  setPokemon: (species: string) => Promise<void>;
}
