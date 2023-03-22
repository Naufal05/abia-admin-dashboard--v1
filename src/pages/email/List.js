import React, { useMemo } from "react";
import {
  useSortBy,
  usePagination,
  useTable,
  useGlobalFilter,
} from "react-table";

import MOCK_DATA from "../../data/MOCK_DATA.json";
import { GlobalFilter } from "./GlobalFilter";
import "./table.css";

const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id", //sample accessor
  },
  {
    Header: "Mail Purpose",
    Footer: "First Name",
    accessor: "first_name", //sample accessor
  },
  {
    Header: "Mail Subject",
    Footer: "Last Name",
    accessor: "last_name", //sample accessor
  },
];

const List = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  //table instance defined
  //   const tableInstance = useTable(
  //     {
  //       columns,
  //       data,
  //     },
  //     useGlobalFilter,
  //     useSortBy
  //   );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    prepareRow,
    // footerGroups,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  const { pageIndex } = state;

  return (
    <>
      <nav class="mt-8" aria-label="breadcrumb">
        <ol class="flex leading-none text-indigo-600 divide-x divide-indigo-400">
          <li class="pr-4">
            <a href="/">Default</a>
          </li>
          <li class="px-4">
            <a href="/">Notification</a>
          </li>
          <li class="px-4 text-gray-700" aria-current="page">
            Email Content
          </li>
        </ol>
      </nav>
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {"  "}Email Content
      </h2>
      <div>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to Page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: "70px" }}
            />
          </span>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
          <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Export
          </button>
        </div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                    );
                  })}
                  <td className="text-right">
                    <button className="button accent-button">Edit</button>
                    <button className="button muted-button">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;

/**
 * <table>
        <thead>
          <tr>
            <th>Rec. ID</th>
            <th>Mail Purpose</th>
            <th>MAil Subject</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td className="text-right">
              <button className="button muted-button">Edit</button>
            </td>
            <td className="text-left">
              <button className="button muted-button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
 */

//         {/* <tfoot>
//     {footerGroups.map((footerGroup) => (
//       <tr {...footerGroup.getFooterGroupProps()}>
//         {footerGroup.headers.map((column) => (
//           <td {...column.getFooterProps()}>
//             {column.render("Footer")}
//           </td>
//         ))}
//       </tr>
//     ))}
//   </tfoot> */}
