import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { supportedLanguages } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { postFile } from "@/lib/query";
import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";

export const Route = createFileRoute("/speech-2-text/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      file: undefined as File | undefined,
      language: "sv-SE",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      const res = await postFile(value);
      console.log({ res });

      setIsLoading(false);
      setTranscript(res?.data);
    },
    validators: {
      onSubmit: z.object({
        file: z.file().mime("audio/wav", ".wav är den enda tillåtna filtypen"),
        language: z.string(),
      }),
    },
  });

  return (
    <Card className="w-full">
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldSet>
            <FieldLegend>Ladda upp fil</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="file">Fil</FieldLabel>
                <form.Field
                  name="file"
                  children={(field) => (
                    <>
                      <Input
                        id="file"
                        type="file"
                        name="file"
                        onChange={(e) => {
                          field.handleChange(e.target.files?.[0]);
                        }}
                      />
                      {!field.state.meta.isValid ? (
                        <FieldDescription className="text-destructive">
                          <em>{field.state.meta.errors?.at(0)?.message}</em>
                        </FieldDescription>
                      ) : (
                        <FieldDescription>
                          Ladda upp en ljudfil i wav-format
                        </FieldDescription>
                      )}
                    </>
                  )}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="language">Språk</FieldLabel>
                <form.Field
                  name="language"
                  children={(field) => {
                    const selectedLanguage =
                      supportedLanguages.find(
                        (language) => language.value === field.state.value,
                      ) ?? null;

                    return (
                      <>
                        <Combobox
                          items={supportedLanguages}
                          onValueChange={(selected) => {
                            field.handleChange(selected?.value ?? "");
                          }}
                          value={selectedLanguage}
                        >
                          <ComboboxInput placeholder="Välj språk" />
                          <ComboboxContent>
                            <ComboboxEmpty>Inga språk hittades.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item.value} value={item}>
                                  {item.label}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                        {!field.state.meta.isValid && (
                          <em>{field.state.meta.errors.join(",")}</em>
                        )}
                      </>
                    );
                  }}
                />
              </Field>
            </FieldGroup>
            <Button variant="secondary">Ladda upp</Button>
          </FieldSet>
        </form>
        <p className="flex items-center justify-center w-full min-h-6 mt-7">{isLoading ? <LoaderCircleIcon className="size-4 animate-spin" /> : transcript ? (
          <>
            <strong>Utskrift:</strong> <span>{transcript}</span>
          </>
        ) : "Se ditt resultat här"}</p>
      </CardContent>
    </Card>
  );
}
