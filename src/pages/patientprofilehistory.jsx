import React, { useMemo } from "react";
import { useTable, useSortBy,usePagination } from "react-table";
import {IoIosArrowForward,IoIosArrowBack} from 'react-icons/io'
import { COLUMNS2 } from "../components/patientcolumns";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,SimpleGrid,GridItem,Button,Text
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";



function PatientResults({id,details}) {



  console.log(details)
  const columns = useMemo(() => COLUMNS2, [])
  const row = useMemo(() => details, [details])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage, 
    pageOptions,
    state,
    prepareRow
  } = useTable(
    {
      columns: columns,
      data: row,
      initialState: { pageSize: 5 }
    },
    useSortBy,
    usePagination
  );

  const {pageIndex,pageSize} = state


  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  userSelect="none"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <Flex alignItems="center">
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ChevronDownIcon ml={1} w={4} h={4} />
                      ) : (
                        <ChevronUpIcon ml={1} w={4} h={4} />
                      )
                    ) : (
                      ""
                    )}
                  </Flex>
                </Th>
              ))}
              {/* <Th>Actions</Th> */}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} >
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <SimpleGrid columns={4} my={'4vh'} ml={'10vw'} >
        <Button bgColor={'teal.200'}onClick={()=>previousPage()} isDisabled={!canPreviousPage} as={GridItem} colspan={1} mx={'auto'} colStart={1} ><IoIosArrowBack/></Button>
        <Text as={GridItem} colspan={'1'} colStart={3}>{pageIndex+1} of {pageOptions.length}</Text>
        <Button bgColor={'teal.200'} onClick={()=>nextPage() }isDisabled={!canNextPage} as={GridItem} colspan={1} colStart={4} mx={'auto'} ><IoIosArrowForward/></Button>
      </SimpleGrid>
    </>
  );
}

export default PatientResults;
