import useGetUniversityList from "@/hooks/use-get-university-list";
import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const Route = createFileRoute("/the-list/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { country } = Route.useSearch();
  const { data } = useGetUniversityList(country);
  // const data = [
  //   {
  //     country: "India",
  //     domains: ["atharvacoe.ac.in"],
  //     web_pages: ["https://atharvacoe.ac.in"],
  //     name: "Atharva College of Engineering",
  //     alpha_two_code: "IN",
  //     "state-province": "Mumbai",
  //   },
  // ];
  const universitiesTotal = data?.length ?? 0;
  const pageSize = 20;
  const pagesTotal = Math.ceil(universitiesTotal / pageSize);

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Table>
      <TableCaption>
        {data && universitiesTotal > 0 && country
          ? `A list of ${universitiesTotal} universities in ${country}`
          : "Country not found"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Alpha two code</TableHead>
          <TableHead>State province</TableHead>
          <TableHead>Domains</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((uni) => (
          <TableRow key={crypto.randomUUID()}>
            <TableCell className="font-semibold">{uni.name}</TableCell>
            <TableCell>{uni.country ?? "-"}</TableCell>
            <TableCell>{uni.alpha_two_code ?? "-"}</TableCell>
            <TableCell>{uni["state-province"] ?? "-"}</TableCell>
            <TableCell>
              {uni.web_pages.map((page, index) => (
                <Badge variant="secondary">
                  <a
                    key={crypto.randomUUID()}
                    href={page}
                    about="_blank"
                    rel="noopener noreferrer"
                  >
                    {uni.domains[index]}
                  </a>
                </Badge>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
