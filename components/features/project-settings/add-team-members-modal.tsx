"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import { Dropdown, DropdownTrigger, DropdownContent, DropdownCheckboxItem } from "@/components/ui/dropdown";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/lib/types";

interface AddTeamMembersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamMembers: TeamMember[];
  teamMemberOptions: string[];
  onUpdateMembers: (members: TeamMember[]) => void;
}

export function AddTeamMembersModal({
  open,
  onOpenChange,
  teamMembers,
  teamMemberOptions,
  onUpdateMembers,
}: AddTeamMembersModalProps) {
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);

  function toggleMember(name: string, checked: boolean) {
    setMembers((prev) =>
      checked ? [...prev, { name, email: "" }] : prev.filter((member) => member.name !== name),
    );
  }

  function setMemberEmail(name: string, email: string) {
    setMembers((prev) => prev.map((member) => (member.name === name ? { ...member, email } : member)));
  }

  const selectedNames = members.map((member) => member.name);

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (next) setMembers(teamMembers);
      }}
    >
      <ModalContent className="w-[calc(100%-2rem)] max-w-[507px]">
        <div className="flex flex-col gap-4 pr-2">
          <ModalTitle className="border-b border-[#e6e6e6] pb-3 text-base">Add Team Members</ModalTitle>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-black">Team Members</p>
            <Dropdown>
              <DropdownTrigger asChild>
                <button
                  type="button"
                  className="flex h-11 items-center justify-between rounded-sm border border-border px-3 text-sm text-text-tertiary transition-colors hover:bg-surface-muted"
                >
                  Select team members
                  <ChevronDown className="size-4 text-icon" aria-hidden />
                </button>
              </DropdownTrigger>
              <DropdownContent align="start" className="w-[459px]">
                {teamMemberOptions.map((name) => (
                  <DropdownCheckboxItem
                    key={name}
                    label={name}
                    checked={selectedNames.includes(name)}
                    onCheckedChange={(checked) => toggleMember(name, checked)}
                  />
                ))}
              </DropdownContent>
            </Dropdown>
          </div>

          {members.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-black">Add project email</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-10 w-[187px]">Member</TableHead>
                    <TableHead className="h-10 w-[272px] text-center">Project Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.name}>
                      <TableCell className="h-[54px] font-medium">{member.name}</TableCell>
                      <TableCell className="h-[54px]">
                        <Input
                          value={member.email}
                          onChange={(event) => setMemberEmail(member.name, event.target.value)}
                          placeholder="Add project email"
                          className="h-9 rounded-sm border-border text-sm"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={() => {
                onUpdateMembers(members);
                onOpenChange(false);
              }}
              className="h-9 px-4 text-sm font-semibold"
            >
              Update Members
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
