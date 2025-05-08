import { Advocate } from "@/db/seed/advocates";
import { Table, TableTbody, TableTd, TableTr } from "@mantine/core";
import { AdvocateTableHead } from "./advocateTableHead";

export interface AdvocateTableColDef {
  key: string;
  label: string;
}

export interface AdvocatesTableProps {
  advocates: Advocate[];
  colDefs: AdvocateTableColDef[];
}

const formatPhoneNumber = (phoneNumber: number) => {
  const phoneNumberString = phoneNumber.toString();
  return `(${phoneNumberString.slice(0, 3)}) ${phoneNumberString.slice(
    3,
    6
  )}-${phoneNumberString.slice(6)}`;
};

export default async function AdvocatesTable(
  props: Readonly<AdvocatesTableProps>
) {
  const { advocates, colDefs } = props;

  return (
    <Table>
      <AdvocateTableHead colDefs={colDefs} />
      <TableTbody>
        {advocates.map((advocate) => (
          <TableTr key={advocate.firstName}>
            <TableTd>{advocate.firstName}</TableTd>
            <TableTd>{advocate.lastName}</TableTd>
            <TableTd>{advocate.city}</TableTd>
            <TableTd>{advocate.degree}</TableTd>
            <TableTd>{advocate.specialties.join(", ")}</TableTd>
            <TableTd>{advocate.yearsOfExperience}</TableTd>
            <TableTd w={150}>{formatPhoneNumber(advocate.phoneNumber)}</TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
}
