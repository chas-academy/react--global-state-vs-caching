const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon";

const APYHUB_URL = "https://api.apyhub.com/stt/file";
const APY_TOKEN =
  "APY0SBhWWI0kixOpkR0bkTaqthd3QpAaIzd4EwBzMO7OFRvAMqYM6cMXQ4e0Q29X";

export const getPokemon = (species: string) =>
  fetch(`${POKEMON_URL}/${species}`).then((res) => res.json());

export interface FileRequestBody {
  file: File | undefined;
  language: string;
}

export const postFile = (value: FileRequestBody) => {
  if (!value.file) {
    throw new Error("File is required");
  }
  const body = new FormData();
  body.append("file", value.file);
  body.append("language", value.language);

  return fetch(APYHUB_URL, {
    method: "POST",
    headers: {
      "apy-token": APY_TOKEN,
    },
    body,
  }).then((res) => res.json());
};
