"use client";
import { TableThead, TableTr, TableTh, Flex } from "@mantine/core";
import {
  IconArrowsSort,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { AdvocateTableColDef } from "./advocatesTable";

export interface AdvocateTableHeadProps {
  colDefs: AdvocateTableColDef[];
}

export const AdvocateTableHead = (props: Readonly<AdvocateTableHeadProps>) => {
  const { colDefs } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = (colDefKey: string) => {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get("sort");
    const currentSortBy = params.get("sortBy");

    let newSort = "asc";
    if (currentSortBy === colDefKey) {
      if (currentSort === "asc") {
        newSort = "desc";
      } else if (currentSort === "desc") {
        newSort = "";
        params.delete("sort");
        params.delete("sortBy");
        replace(`${pathname}?${params.toString()}`);
        return;
      }
    }

    params.set("sort", newSort);
    params.set("sortBy", colDefKey);
    replace(`${pathname}?${params.toString()}`);
  };

  const displaySortIcon = (colDefKey: string) => {
    const currentSortBy = searchParams.get("sortBy");
    const currentSort = searchParams.get("sort");

    if (currentSortBy === colDefKey) {
      if (currentSort === "asc") {
        return (
          <IconSortAscending
            size={16}
            stroke={1.5}
            style={{ marginLeft: "4px" }}
          />
        );
      } else if (currentSort === "desc") {
        return (
          <IconSortDescending
            size={16}
            stroke={1.5}
            style={{ marginLeft: "4px" }}
          />
        );
      }
    }
    return (
      <IconArrowsSort size={16} stroke={1.5} style={{ marginLeft: "4px" }} />
    );
  };

  return (
    <TableThead>
      <TableTr>
        {colDefs.map((colDef: { key: string; label: string }) => (
          <TableTh
            scope="col"
            key={colDef.key}
            onClick={() => handleSort(colDef.key)}
            style={{
              cursor: "pointer",
            }}
          >
            <Flex align={"center"}>
              {colDef.label}
              {displaySortIcon(colDef.key)}
            </Flex>
          </TableTh>
        ))}
      </TableTr>
    </TableThead>
  );
};
