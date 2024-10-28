"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ChessActivityHeatmap from '@/components/heatmap/page'

export default function DemoPage() {
  return (
    <div className="grid grid-cols-1 p-5">
      <div className="flex space-x-4">
        <Avatar className="w-[200px] h-[200px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      

      
      <Card className="p-4">
        <div className="space-y-1 text-gray-700">
        <div>
          <h2 className="text-2xl font-semibold">Nabin Oli</h2>
          <Badge variant="online" className="mt-2">
            Online
          </Badge>
        </div>
          <p><span className="font-semibold">Rating:</span> 700</p>
          <p><span className="font-semibold">Joined on:</span> 2020</p>
          <p><span className="font-semibold">Wins:</span> 1200</p>
          <p><span className="font-semibold">Losses:</span> 600</p>
        </div>
      </Card>
      </div>

    <div className="max-w-screen-sm w-screen">
    <ChessActivityHeatmap/>
    </div>

    </div>
  );
}
