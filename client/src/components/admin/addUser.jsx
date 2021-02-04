import React, { useCallback, useState } from "react";
import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";
import { Box, Center, Icon, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { FaFileCsv, FaFileImport } from "react-icons/fa";
import AddUserButton from "./addUserButton";

const AddUser = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const onDrop = useCallback((files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }

    const columns = [
      {
        name: "Reg No",
        selector: "reg_no",
        sortable: true,
      },
      {
        name: "Name",
        selector: "name",
        sortable: true,
      },
      {
        name: "Email",
        selector: "email",
        sortable: true,
      },
      {
        cell: (row) => <AddUserButton {...row} />,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ];

    setData(list);
    setColumns(columns);
  };

  return (
    <Center minH="70vh" width="100%" p={5}>
      {data.length === 0 && (
        <Center minH="70vh" width="100%" {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <Box textAlign="center" color="gray">
              <Icon as={FaFileImport} m={2} fontSize="6xl" />
              <Text>Drop the files here...</Text>
            </Box>
          ) : (
            <Box textAlign="center" color="gray">
              <Icon as={FaFileCsv} m={2} fontSize="6xl" />
              <Text>
                Drag 'n' drop some files here, or click to select files
              </Text>
            </Box>
          )}
        </Center>
      )}
      {data.length > 0 && (
        <Box borderRadius="md" shadow="xl" width="90%">
          <DataTable
            pagination
            highlightOnHover
            columns={columns}
            data={data}
          />
        </Box>
      )}
    </Center>
  );
};

export default AddUser;
