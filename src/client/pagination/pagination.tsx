"use client";
import { Pagination as MantinePagination } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
export interface PaginationProps {
  total: number;
}

export const Pagination = (props: Readonly<PaginationProps>) => {
  const { total } = props;
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`?${params.toString()}`);
  };

  return (
    <MantinePagination
      total={total}
      onChange={handlePageChange}
      defaultValue={Number(searchParams.get("page") ?? 1)}
    />
  );
};
