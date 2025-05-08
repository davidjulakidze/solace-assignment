import AdvocatesTable from "@/ui/advocatesTable/advocatesTable";
import { Pagination } from "@/ui/pagination/pagination";
import Search from "@/ui/search/search";
import { Advocate, advocateLimit } from "@/db/seed/advocates";
import { Flex, Title } from "@mantine/core";

export interface HomeProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sortBy?: string;
    sort?: string;
  }>;
}
async function fetchFilteredAdvocates(
  query?: string,
  currentPage?: string,
  sort?: string,
  sortBy?: string
): Promise<{
  data: Advocate[];
  totalCount: number;
}> {
  const apiParams = new URLSearchParams();
  if (query) {
    apiParams.append("query", query);
  }
  if (currentPage) {
    apiParams.append("page", currentPage);
  }
  if (sort) {
    apiParams.append("sort", sort);
  }
  if (sortBy) {
    apiParams.append("sortBy", sortBy);
  }

  const response = await fetch(
    `http://localhost:3000/api/advocates?${apiParams.toString()}`
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
  const query = searchParams?.query;
  const currentPage = searchParams?.page;
  const sortBy = searchParams?.sortBy;
  const sort = searchParams?.sort;
  const result = await fetchFilteredAdvocates(query, currentPage, sort, sortBy);
  const totalPageCount = Math.ceil(result.totalCount / advocateLimit);
  return (
    <main style={{ margin: "24px" }}>
      <Flex direction="column" gap="md">
        <Title order={1}>Solace Advocates</Title>
        <Search />
        <AdvocatesTable
          colDefs={[
            { key: "firstName", label: "First Name" },
            { key: "lastName", label: "Last Name" },
            { key: "city", label: "City" },
            { key: "degree", label: "Degree" },
            { key: "specialties", label: "Specialties" },
            { key: "yearsOfExperience", label: "Years of Experience" },
            { key: "phoneNumber", label: "Phone Number" },
          ]}
          advocates={result.data}
        />
        <Pagination total={totalPageCount} />
      </Flex>
    </main>
  );
}
