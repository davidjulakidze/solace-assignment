import { Advocate } from "@/db/seed/advocates";
import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";

export interface AdvocatesTableProps {
  advocates: Advocate[];
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
  const { advocates } = props;

  return (
    <Table>
      <TableThead>
        <TableTr>
          <TableTh scope="col">First Name</TableTh>
          <TableTh scope="col">Last Name</TableTh>
          <TableTh scope="col">City</TableTh>
          <TableTh scope="col">Degree</TableTh>
          <TableTh scope="col">Specialties</TableTh>
          <TableTh scope="col">Years of Experience</TableTh>
          <TableTh scope="col">Phone Number</TableTh>
        </TableTr>
      </TableThead>
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
