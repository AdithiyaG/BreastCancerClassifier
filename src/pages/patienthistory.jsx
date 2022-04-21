import { Layout } from '../components/Layout'
import React, { useEffect, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { COLUMNS } from "../components/patientcolumns";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/AuthContext.js'
import axios from 'axios';
import { setPatient } from "../store/actions/patientActions";

function Patient() {

  const details = useSelector((state) => state.allPatients.tabledata)


  const dispatch = useDispatch();
  const { currentUser } = useAuth()
  const fetchProducts = async () => {
    console.log(currentUser)
    const response = await axios
      .get(`http://localhost:8000/service1/patientdetails/?user=${currentUser.uid}`)
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
    rows,
    prepareRow
  } = useTable(
    {
      columns: columns,
      data: row
    },
    useSortBy
  );


  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20);

  return (
    <Layout>
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
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} >
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
                {/* <Td>
                <IconButton
              
              display={{ base: "inline-flex" }}
              icon={<HiExternalLink />}
              size="sm"
            ><Link to></Link></IconButton>I
                </Td> */}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Layout>
  );
}

export default Patient;
