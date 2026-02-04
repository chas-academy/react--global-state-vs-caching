import useGetPokemon from "@/hooks/use-get-pokemon";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

interface SpriteProps {
  sprite: string;
  label: string;
}
const Sprite = ({ sprite, label }: SpriteProps) => (
  <div
    className={cn("shadow-sm rounded-md relative p-3", {
      "bg-indigo-100/20": label === "Default",
      "bg-fuchsia-100/20": label === "Shiny",
    })}
  >
    <img src={sprite} alt={label} />
    <Badge variant="outline-indigo" className="absolute bottom-0 left-0 m-1.5">
      {label}
    </Badge>
  </div>
);

interface AttributeProps {
  label: string;
  value: string | number | undefined | React.ReactNode;
}

const Attribute = ({ label, value = "N/A" }: AttributeProps) => (
  <div className="flex justify-between border-b border-gray-200 w-full">
    <p className="opacity-70">{label}</p>
    {typeof value === "string" ? (
      <p>{value}</p>
    ) : (
      <div className="flex gap-2 pb-2">{value}</div>
    )}
  </div>
);

interface Props {
  species: string;
  children: ReactNode;
}

export default function DetailsPage({ species, children }: Props) {
  const { data, error } = useGetPokemon(species);

  if (error) {
    return (
      <Dialog>
        <DialogDescription>Detaljsida för pokémon</DialogDescription>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="capitalize">Kunde inte hittas</DialogTitle>
          </DialogHeader>
          <p>Error: {error.message} :/</p>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog>
      <DialogDescription>Detaljsida för pokémon</DialogDescription>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">{data?.name}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mb-4">
          <Sprite sprite={data?.sprites?.front_default ?? ""} label="Default" />
          <Sprite sprite={data?.sprites?.front_shiny ?? ""} label="Shiny" />
        </div>
        <div className="flex flex-col gap-4">
          <Attribute label="Height" value={data?.height} />
          <Attribute label="Weight" value={data?.weight} />
          <Attribute
            label="Abilities"
            value={data?.abilities.map(({ ability }) => (
              <Badge variant="secondary" key={ability.name}>
                {ability.name}
              </Badge>
            ))}
          />
          <Attribute
            label="Types"
            value={data?.types.map(({ type }) => (
              <Badge variant="secondary" key={type.name}>
                {type.name}
              </Badge>
            ))}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
