"use client";

import { Button } from "@/components/ui/button";

export default function DemoPage() {
  return (
    <div className="w-screen justify-center flex flex-1 flex-col gap-6 p-6">
      {/* Header Section */}
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-gray-100">Welcome to Realtime Chess</h1>
        <p className="text-lg text-gray-400 mt-2">
          Experience real-time multiplayer chess with friends and players worldwide.
        </p>
        <br/>
        <div className="flex justify-center gap-4">
            <Button variant="default" size="icon" className="w-full max-w-xs" asChild>
            <a href="/chess">Start Playing</a>
            </Button>
          <Button variant="secondary" size="icon" className="w-full max-w-xs">
            Learn More
          </Button>
        </div>
      </header>


      {/* Feature Section */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 w-full">
        <div className="aspect-video flex items-center justify-center rounded-xl bg-gray-700">
          <p className="text-center text-gray-300">Play with AI (Not Available)</p>
        </div>
        <div className="aspect-video flex items-center justify-center rounded-xl bg-gray-700">
          <p className="text-center text-gray-300">Real-time Multiplayer</p>
        </div>
        <div className="aspect-video flex items-center justify-center rounded-xl bg-gray-700">
          <p className="text-center text-gray-300">Analyze Your Games (Not Available)</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 rounded-xl bg-gray-800 p-6 w-full">
        <h2 className="text-2xl font-bold text-gray-100">Get Started with Chess</h2>
        <div className="text-center text-gray-400">
          Play chess in real-time with players worldwide, or improve your game by analyzing past matches.
        </div>
      </div>
    </div>
  );
}
