import AdvocatesTable from "@/client/advocatesTable/advocatesTable";
import { Pagination } from "@/client/pagination/pagination";
import Search from "@/client/search/search";
import { Advocate, advocateLimit } from "@/db/seed/advocates";
import { Flex, Title } from "@mantine/core";

export interface HomeProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}
async function fetchFilteredAdvocates(
  query: string,
  currentPage: number
): Promise<{
  data: Advocate[];
  totalCount: number;
}> {
  const response = await fetch(
    `http://localhost:3000/api/advocates?query=${query}&page=${currentPage}`
  );
  if (!response.ok) {
    return {
      data: [],
      totalCount: 0,
    };
  }
  return response.json();
}

export default async function Home(props: Readonly<HomeProps>) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;
  const result = await fetchFilteredAdvocates(query, currentPage);
  const totalPageCount = Math.ceil(result.totalCount / advocateLimit);
  return (
    <main style={{ margin: "24px" }}>
      <Flex direction="column" gap="md">
        <Title order={1}>Solace Advocates</Title>
        <Search />
        <AdvocatesTable advocates={result.data} />
        <Pagination total={totalPageCount} />
      </Flex>
    </main>
  );
}
