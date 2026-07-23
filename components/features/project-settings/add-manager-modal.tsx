"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddManagerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  managerOptions: string[];
  currentManager: string;
  onAddManager: (manager: string, email: string) => void;
}

export function AddManagerModal({
  open,
  onOpenChange,
  managerOptions,
  currentManager,
  onAddManager,
}: AddManagerModalProps) {
  const [manager, setManager] = useState(currentManager);
  const [email, setEmail] = useState("");

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (next) {
          setManager(currentManager);
          setEmail("");
        }
      }}
    >
      <ModalContent className="w-[calc(100%-2rem)] max-w-[507px]">
        <div className="flex flex-col gap-3 pr-2">
          <ModalTitle className="border-b border-[#e6e6e6] pb-3 text-base">Add Project Manager</ModalTitle>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-black">Project Manager</p>
              <Select value={manager} onValueChange={setManager}>
                <SelectTrigger className="h-11 rounded-sm border-border text-sm font-medium text-black">
                  <SelectValue placeholder="Select a manager" />
                </SelectTrigger>
                <SelectContent>
                  {managerOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-black">Add Project Email</p>
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Project email"
                className="h-11 rounded-sm border-border text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => {
                onAddManager(manager, email);
                onOpenChange(false);
              }}
              className="h-9 px-4 text-sm font-semibold"
            >
              Add Manager
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
