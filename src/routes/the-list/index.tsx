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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { chunk } from "remeda";

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
  const paginatedData = chunk(data ?? [], pageSize);

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
        {paginatedData[currentPage - 1]?.map((uni) => (
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
        {Array.from({
          length: pageSize - (paginatedData[currentPage - 1]?.length ?? 0),
        }).map(() => (
          <TableRow key={crypto.randomUUID()}>
            <TableCell colSpan={5} className="h-9.75" />
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      if (currentPage !== 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => {
                      if (currentPage !== 1) {
                        const decrement = currentPage === pagesTotal ? 2 : 1;
                        setCurrentPage(currentPage - decrement);
                      }
                    }}
                    isActive={currentPage === 1}
                  >
                    {currentPage > 1 && currentPage === pagesTotal
                      ? currentPage - 2 : currentPage > 1 ? currentPage - 1 : 1}
                  </PaginationLink>
                </PaginationItem>
                {pagesTotal > 1 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        isActive={
                          currentPage !== 1 && currentPage !== pagesTotal
                        }
                      >
                        {currentPage == 1
                          ? currentPage + 1
                          : currentPage === pagesTotal
                            ? currentPage - 1
                            : currentPage}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => {
                          if (currentPage !== pagesTotal) {
                            const increment = currentPage === 1 ? 2 : 1;

                            setCurrentPage(currentPage + increment);
                          }
                        }}
                        isActive={currentPage === pagesTotal}
                      >
                        {currentPage === 1
                          ? currentPage + 2
                          : currentPage + 1 <= pagesTotal
                            ? currentPage + 1
                            : pagesTotal}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      if (currentPage !== pagesTotal) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
