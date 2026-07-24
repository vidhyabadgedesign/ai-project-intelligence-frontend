"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { User, UserRole } from "@/lib/types";

interface InviteUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInviteUser: (user: Omit<User, "id" | "projectEmails" | "lastActive">) => void;
}

const ROLES: UserRole[] = ["Manager", "Employee", "Admin"];

// Parent passes a changing key on each open to reset this component's state.
export function InviteUserModal({ open, onOpenChange, onInviteUser }: InviteUserModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole | undefined>(undefined);

  const canSubmit =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    role !== undefined;

  function handleSend() {
    if (!canSubmit || !role) return;
    onInviteUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      role,
      status: "Active",
    });
    onOpenChange(false);
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-[507px] pt-5">
        <div className="flex flex-col">
          <ModalTitle className="text-base font-semibold text-text-primary">
            Invite User
          </ModalTitle>

          <div className="mt-3 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-text-primary">First Name</p>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Maya"
                  className="h-11 rounded-sm border-border text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-text-primary">Last Name</p>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
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
                  placeholder="abc@amazatic.com"
                  type="email"
                  className="h-11 rounded-sm border-border text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium text-text-primary">Role</p>
                <Select value={role ?? ""} onValueChange={(v) => setRole(v as UserRole)}>
                  <SelectTrigger className="h-11 rounded-sm border-border text-sm">
                    <SelectValue placeholder="Select role" />
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

          <div className="mt-5 flex justify-end">
            <Button
              disabled={!canSubmit}
              onClick={handleSend}
              className="h-9 px-4 text-sm font-semibold"
            >
              Send Invite
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
