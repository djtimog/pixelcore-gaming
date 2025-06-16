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
import {
  ArrowUpDown,
  ChevronDown,
  EllipsisVertical,
  MoreHorizontal,
} from "lucide-react";

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
import { UserAvatar } from "../../avatar";

export type TeamMember = {
  id: number;
  handle: string;
  username: string;
  role: "owner" | "captain" | "assistant" | "player";
  email: string;
  joinedAt: Date;
  isCurrentUser: boolean;
  imageUrl: string;
};

export const getColumns = (
  currentUserRole: TeamMember["role"],
): ColumnDef<TeamMember>[] => {
  const columns: ColumnDef<TeamMember>[] = [
    currentUserRole === "owner"
      ? {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
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
        }
      : {
          id: "sn",
          header: () => <span>S/N</span>,
          cell: ({ row }) => <span>{row.index + 1}</span>,
        },
    {
      id: "imageUrl",
      header: "Avatar",
      cell: ({ row }) => (
        <UserAvatar
          url={row.getValue("imageUrl")}
          name={row.getValue("username")}
          alt={row.getValue("username")}
          className="mx-auto"
        />
      ),
      enableSorting: false,
      enableHiding: false,
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
      cell: ({ row }) => (
        <p className="px-2 lowercase">@{row.getValue("username")}</p>
      ),
    },
    {
      accessorKey: "handle",
      header: "Handle",
      cell: ({ row }) => <p className="px-1">{row.getValue("handle")}</p>,
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
        const isSelf = member.isCurrentUser;

        const canPromote = currentUserRole === "owner";
        const canTransferOwnership = currentUserRole === "owner";
        const canDemote = currentUserRole === "owner";
        const canLeave = currentUserRole !== "owner" && isSelf;

        if (currentUserRole) return;

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

              {canLeave && (
                <>
                  <DropdownMenuItem onClick={() => {}}>
                    Leave Team
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}

              {canPromote && member.role === "player" && (
                <>
                  <DropdownMenuItem onClick={() => {}}>
                    Make Assistant
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>
                    Make Captain
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}

              {canDemote && ["assistant", "captain"].includes(member.role) && (
                <>
                  <DropdownMenuItem onClick={() => {}}>
                    Demote to Player
                  </DropdownMenuItem>
                </>
              )}

              {canTransferOwnership && member.role !== "owner" && (
                <>
                  <DropdownMenuItem onClick={() => {}}>
                    Transfer Ownership
                  </DropdownMenuItem>
                </>
              )}
              {!member.isCurrentUser && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {}}>Chat</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};

export function TeamMembersTable({
  teamData,
  currentUserRole,
}: {
  teamData: TeamMember[];
  currentUserRole: "owner" | "captain" | "assistant" | "player";
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: teamData,
    columns: getColumns(currentUserRole),
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

  const selectedMembers = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original);

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
      <div className="flex flex-wrap items-center justify-between gap-3 py-4">
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
        <div className="flex gap-3 self-end">
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

          {currentUserRole === "owner" && selectedMembers.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"icon"}>
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {selectedMembers.length === 1
                    ? "Member Options"
                    : "Bulk Options"}
                </DropdownMenuLabel>

                <DropdownMenuItem
                  onClick={() => {
                    console.log("Remove", selectedMembers);
                  }}
                >
                  {selectedMembers.length === 1
                    ? "Remove Member"
                    : "Remove Members"}
                </DropdownMenuItem>

                {selectedMembers.length === 1 && (
                  <>
                    <DropdownMenuItem
                      onClick={() => {
                        console.log(
                          "Transfer ownership to",
                          selectedMembers[0],
                        );
                      }}
                    >
                      Transfer Ownership
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        console.log("Chat with", selectedMembers[0]);
                      }}
                    >
                      Chat with Member
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
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
                <TableCell colSpan={7} className="h-24 text-center">
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
