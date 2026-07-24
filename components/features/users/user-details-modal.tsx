"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { User, UserRole } from "@/lib/types";

interface UserDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onUpdateUser: (updated: User) => void;
}

const ROLES: UserRole[] = ["Manager", "Employee", "Admin"];

// Parent passes key={user.id} so this remounts fresh whenever a different user
// is selected, giving useState initializers the correct user data.
export function UserDetailsModal({
  open,
  onOpenChange,
  user,
  onUpdateUser,
}: UserDetailsModalProps) {
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [role, setRole] = useState<UserRole>(user?.role ?? "Manager");
  const [active, setActive] = useState(user?.status === "Active");

  const canSubmit =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0;

  function handleUpdate() {
    if (!canSubmit || !user) return;
    onUpdateUser({
      ...user,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      role,
      status: active ? "Active" : "Inactive",
    });
    onOpenChange(false);
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-[507px] pt-5">
        <div className="flex flex-col">
          <ModalTitle className="text-base font-semibold text-text-primary">
            User Details
          </ModalTitle>

          <div className="mt-3 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-text-primary">First name</p>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-11 rounded-sm border-border text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-text-primary">Last name</p>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-11 rounded-sm border-border text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-text-primary">Email</p>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="h-11 rounded-sm border-border text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-text-primary">Role</p>
                <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                  <SelectTrigger className="h-11 rounded-sm border-border text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-3">
              <Toggle checked={active} onCheckedChange={setActive} />
              <span className="text-sm font-medium text-text-primary">Active</span>
            </label>
            <Button
              disabled={!canSubmit}
              onClick={handleUpdate}
              className="h-9 px-4 text-sm font-semibold"
            >
              Update Details
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
