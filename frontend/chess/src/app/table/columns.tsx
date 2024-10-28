"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MoveLog = {
  moveNumber: number;
  player: "white" | "black";
  move: string;
  timeElapsed: string; 
};

export const columns: ColumnDef<MoveLog>[] = [
  {
    accessorKey: "white",
    header: "White",
  },
  {
    accessorKey: "black",
    header: "Black",
  },  
  {
    accessorKey: "timestamp",
    header: "Time Stamp",
  },
]
