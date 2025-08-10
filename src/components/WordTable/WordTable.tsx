import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { capitalize } from "../../utils/capitalize";
// import { selectAllWords } from "../../redux/words/selectors";
// import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import css from "./WordTable.module.css";
import { useResizeWindow } from "../../hooks/resizeWindow";
import ActionsBtn from "../ActionsBtn/ActionsBtn";
import ProgressBar from "../ProgressBar/ProgressBar";
import ActionButton from "../ui/ActionButton/ActionButton";
import { createWord } from "../../redux/words/operations";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export default function WordTable({ wordsList, variant }) {
  type Word = {
    _id: string;
    en: string;
    ua: string;
    category: string;
    progress: number;
  };

  const columnHelper = createColumnHelper<Word>();

  const sizeWindow = useResizeWindow();
  const isMobile = sizeWindow < 768;

  const dispatch = useAppDispatch();

  const [openId, setOpenId] = useState(null);

  const actionCell = (row) => (
    <ActionsBtn
      data={row.original}
      setOpenId={setOpenId}
      isOpen={openId === row.original._id}
    />
  );

  const addActionCell = (row) => (
    <ActionButton
      svgName="icon-arrow-right"
      className="recommendBtn"
      onClick={() => {
        const formattedData = {
          en: row.original.en,
          ua: row.original.ua,
          category: row.original.category,
          isIrregular: row.original.isIrregular,
        };
        dispatch(createWord(formattedData as any));
      }}
    >
      {!isMobile && "Add to dictionary"}
    </ActionButton>
  );
  const columns = useMemo(() => {
    const cols = [
      columnHelper.accessor("en", {
        header: () => (
          <span className={`${css.header} ${css.firstheader}`}>
            Word
            {!isMobile && (
              <svg className={css.icon}>
                <use href="/icons/icons.svg#icon-united-kingdom" />
              </svg>
            )}
          </span>
        ),
        cell: (props) => capitalize(props.getValue()),
      }),
      columnHelper.accessor("ua", {
        header: () => (
          <span className={css.header}>
            Translation
            {!isMobile && (
              <svg className={css.icon}>
                <use href="/icons/icons.svg#icon-ukraine" />
              </svg>
            )}
          </span>
        ),
        cell: (props) => capitalize(props.getValue()),
      }),
      (variant === "recommend" || !isMobile) &&
        columnHelper.accessor("category", {
          header: () => <span className={css.header}>Category</span>,
          cell: (props) => capitalize(props.getValue()),
        }),
      variant === "dictionary" &&
        columnHelper.accessor("progress", {
          header: () => <span className={css.header}>Progress</span>,
          cell: (props) => <ProgressBar value={props.getValue()} />,
        }),
      variant === "dictionary" &&
        columnHelper.display({
          id: "actions",
          header: () => (
            <span className={`${css.header} ${css.lastheader}`}></span>
          ),
          cell: (props) => actionCell(props.row),
        }),
      variant === "recommend" &&
        columnHelper.display({
          id: "add-btn",
          header: () => (
            <span className={`${css.header} ${css.lastheader}`}></span>
          ),
          cell: (props) => addActionCell(props.row),
        }),
    ];
    return cols.filter(Boolean);
  }, [isMobile, openId]);

  // const data: Word[] = useSelector(selectAllWords);
  const data: Word[] = wordsList;

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.en.localeCompare(b.en)).slice(0, 7);
  }, [data]);
  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className={css.tableWrap}>
      <table className={css.table}>
        <thead className={css.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={css.tr}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={css.th}>
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
        <tbody className={css.tbody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={css.tr}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={css.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
