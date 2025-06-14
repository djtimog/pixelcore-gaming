"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Define the data type for a team member
export type TeamMember = {
  id: number;
  name: string;
  username: string;
  role: "owner" | "captain" | "assistant" | "player";
  email: string;
  joinedAt: Date;
  isCurrentUser: boolean;
};

export const columns: ColumnDef<TeamMember>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username
        <ArrowUpDown className="ml-1 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <p className="lowercase">@{row.getValue("username")}</p>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role: "owner" | "captain" | "assistant" | "player" =
        row.getValue("role");

      const roleColors: Record<typeof role, string> = {
        owner: "bg-purple-500 text-white",
        captain: "bg-blue-500 text-white",
        assistant: "bg-amber-500 text-white",
        player: "bg-gray-500 text-white",
      };

      return (
        <Badge
          className={`capitalize ${roleColors[role]} cursor-pointer text-center`}
        >
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <Link
        href={`mailto:${row.getValue("email")}`}
        className="text-blue-600 underline"
      >
        {row.getValue("email")}
      </Link>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Open actions</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {member.role !== "owner" && (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    /* leave team handler */
                  }}
                >
                  Leave Team
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            {member.role === "player" && (
              <>
                <DropdownMenuItem
                  onClick={() => {
                    /* promote to assistant */
                  }}
                >
                  Make Assistant
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    /* promote to captain */
                  }}
                >
                  Make Captain
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            {member.role !== "owner" && (
              <DropdownMenuItem
                onClick={() => {
                  /* transfer ownership */
                }}
              >
                Transfer Ownership
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TeamMembersTable({ teamData }: { teamData: TeamMember[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: teamData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      {/* If only creator present */}
      {teamData.length <= 1 && (
        <div className="mb-4 items-center justify-between gap-7 space-y-5 rounded p-4 md:flex md:space-y-0">
          <div>
            <p>No other members yet</p>
            <p className="text-sm text-gray-600">
              Refer members to your team to get started.
            </p>
          </div>
          <Button
            onClick={() => {
              /* refer handler */
            }}
          >
            Refer Members
          </Button>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3 py-4">
        <Input
          placeholder="Filter by username..."
          value={
            (table.getColumn("username")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table.getColumn("username")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                  className="capitalize"
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
