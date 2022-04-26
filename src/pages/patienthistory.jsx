import { Layout } from '../components/Layout'
import React, { useEffect, useMemo } from "react";
import { useTable, useSortBy,usePagination } from "react-table";
import { COLUMNS } from "../components/patientcolumns";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Button,
  Text,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext.js'
import axios from 'axios';
import { setPatient } from "../store/actions/patientActions";
import {IoIosArrowForward,IoIosArrowBack} from 'react-icons/io'
import {path} from '../components/apilink'

function Patient() {

  const details = useSelector((state) => state.allPatients.tabledata)


  const dispatch = useDispatch();
  const { currentUser } = useAuth()
  const fetchProducts = async () => {
    console.log(currentUser)
    const response = await axios
      .get(path+`service1/patientdetails/?user=${currentUser.uid}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
      console.log(response.data)
    dispatch(setPatient(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const columns = useMemo(() => COLUMNS, [])
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

  const {pageIndex} = state

  
  return (
    <Layout>
      <Table {...getTableProps()} mx={'8vw'} mt={'5vh'} >
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th color={'teal'}
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
    </Layout>
  );
}

export default Patient;
