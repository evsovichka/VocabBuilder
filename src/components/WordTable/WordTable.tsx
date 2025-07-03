import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { capitalize } from "../../utils/capitalize";
import { selectAllWords } from "../../redux/words/selectors";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function WordTable() {
  type Word = {
    id: string;
    en: string;
    ua: string;
    category: string;
    progress: number;
  };

  const columnHelper = createColumnHelper<Word>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("en", {
        header: () => <span>Word</span>,
        cell: (props) => capitalize(props.getValue()),
      }),
      columnHelper.accessor("ua", {
        header: () => <span>Translation</span>,
        cell: (props) => capitalize(props.getValue()),
      }),
      columnHelper.accessor("category", {
        header: () => <span>Category</span>,
        cell: (props) => capitalize(props.getValue()),
      }),
      columnHelper.accessor("progress", {
        header: () => <span>Progress</span>,
        cell: (props) => props.getValue(),
      }),
      columnHelper.display({
        id: "actions",
        header: () => null,
        cell: (props) => {
          return (
            <button onClick={() => console.log(props.row.original)}>...</button>
          );
        },
      }),
    ],
    []
  );
  const data: Word[] = useSelector(selectAllWords);
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.en.localeCompare(b.en));
  }, [data]);
  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
