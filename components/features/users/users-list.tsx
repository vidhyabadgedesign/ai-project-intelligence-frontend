"use client";

import { useState, useMemo } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { Search } from "@/components/ui/search";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "@/components/ui/dropdown";
import { InviteUserModal } from "./invite-user-modal";
import { UserDetailsModal } from "./user-details-modal";
import type { User, UserRole, UserStatus } from "@/lib/types";

const PAGE_SIZE = 10;
const ROLES: Array<UserRole | "All"> = ["All", "Manager", "Employee", "Admin"];
const STATUSES: Array<UserStatus | "All"> = ["All", "Active", "Inactive"];

interface UsersListProps {
  initialUsers: User[];
}

export function UsersList({ initialUsers }: UsersListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "All">("All");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");
  const [page, setPage] = useState(1);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteModalKey, setInviteModalKey] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filtered = useMemo(() => {
    return users.filter((user) => {
      const q = query.trim().toLowerCase();
      if (q) {
        const name = `${user.firstName} ${user.lastName}`.toLowerCase();
        if (!name.includes(q) && !user.email.toLowerCase().includes(q)) return false;
      }
      if (roleFilter !== "All" && user.role !== roleFilter) return false;
      if (statusFilter !== "All" && user.status !== statusFilter) return false;
      return true;
    });
  }, [users, query, roleFilter, statusFilter]);

  const isFiltered = query.trim() !== "" || roleFilter !== "All" || statusFilter !== "All";
  const pageCount = isFiltered ? Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)) : 8;
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleInviteUser(data: Omit<User, "id" | "projectEmails" | "lastActive">) {
    const newUser: User = {
      ...data,
      id: `user-${Date.now()}`,
      projectEmails: [],
      lastActive: "just now",
    };
    setUsers((prev) => [newUser, ...prev]);
  }

  function handleUpdateUser(updated: User) {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  }

  const roleTriggerLabel = roleFilter === "All" ? "All Roles" : roleFilter;
  const statusTriggerLabel = statusFilter === "All" ? "All Statuses" : statusFilter;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="w-[242px] shrink-0">
          <Search
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search users..."
          />
        </div>

        <div className="flex items-center gap-4">
          <Dropdown>
            <DropdownTrigger asChild>
              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-sm border border-border bg-surface px-3 text-sm text-text-primary-alt hover:bg-surface-muted"
              >
                <span>{roleTriggerLabel}</span>
                <ChevronDown className="size-4 text-icon" aria-hidden />
              </button>
            </DropdownTrigger>
            <DropdownContent className="w-32" align="start">
              {ROLES.map((r) => (
                <DropdownItem
                  key={r}
                  selected={roleFilter === r}
                  onClick={() => {
                    setRoleFilter(r);
                    setPage(1);
                  }}
                  className={
                    roleFilter === r
                      ? "bg-primary font-medium text-white hover:bg-primary/90"
                      : undefined
                  }
                >
                  {r === "All" ? "All" : r}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger asChild>
              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-sm border border-border bg-surface px-3 text-sm text-text-primary-alt hover:bg-surface-muted"
              >
                <span>{statusTriggerLabel}</span>
                <ChevronDown className="size-4 text-icon" aria-hidden />
              </button>
            </DropdownTrigger>
            <DropdownContent className="w-36" align="start">
              {STATUSES.map((s) => (
                <DropdownItem
                  key={s}
                  selected={statusFilter === s}
                  onClick={() => {
                    setStatusFilter(s);
                    setPage(1);
                  }}
                  className={
                    statusFilter === s
                      ? "bg-primary font-medium text-white hover:bg-primary/90"
                      : undefined
                  }
                >
                  {s === "All" ? "All" : s}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>

          <Button
            onClick={() => {
              setInviteModalKey((k) => k + 1);
              setInviteOpen(true);
            }}
            className="flex h-9 items-center gap-1.5 px-4 text-sm font-semibold"
          >
            <Plus className="size-4" aria-hidden />
            Invite User
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[163px]">User</TableHead>
            <TableHead className="w-[233px]">Email</TableHead>
            <TableHead className="w-[121px]">Role</TableHead>
            <TableHead className="w-[370px]">Projects and Emails</TableHead>
            <TableHead className="w-[107px]">Status</TableHead>
            <TableHead className="w-[153px]">Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginated.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <EmptyState
                  title="No users match your search"
                  description="Try adjusting your search or filters."
                />
              </td>
            </tr>
          ) : (
            paginated.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="cursor-pointer transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setSelectedUser(user);
                }}
              >
                <TableCell className="font-medium text-text-primary">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell className="text-text-primary">{user.email}</TableCell>
                <TableCell className="text-text-primary">{user.role}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1.5">
                    {user.projectEmails.map((pe, i) => (
                      <span key={i} className="text-sm text-text-primary">
                        <span className="font-medium">{pe.project}</span>
                        {" - "}
                        <span>{pe.email}</span>
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-text-primary">{user.status}</TableCell>
                <TableCell className="whitespace-nowrap text-text-primary">
                  {user.lastActive}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <tfoot>
          <tr>
            <td colSpan={6} className="border-t border-border-table p-4">
              <div className="flex justify-end">
                <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />
              </div>
            </td>
          </tr>
        </tfoot>
      </Table>

      <InviteUserModal
        key={inviteModalKey}
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        onInviteUser={handleInviteUser}
      />

      <UserDetailsModal
        key={selectedUser?.id ?? "none"}
        open={selectedUser !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedUser(null);
        }}
        user={selectedUser}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
}
