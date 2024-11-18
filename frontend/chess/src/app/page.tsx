"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ChessActivityHeatmap from '@/components/heatmap/page'
import Login from "@/components/login";

export default function DemoPage() {
  return (
    <div className="w-screen h-screen">
    <Login/>
    </div>
  );
}
