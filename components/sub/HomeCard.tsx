"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface CardProps {
  handleClick: () => void;
  url: string;
  title: string;
  desc: string;
  className?: string; // Making className optional
}

const HomeCard: React.FC<CardProps> = ({
  url,
  title,
  desc,
  className = "",
  handleClick,
}) => {
  return (
    <div
      className={cn(
        `px-4 py-6 flex flex-col justify-between w-full min-h-[260px] rounded-[14px] cursor-pointer hover:bg-neutral-200 transition-all group bg-black`
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          `flex-center glassmorphism size-12 rounded-[10px] `,
          className
        )}
      >
        <Image src={url} alt="meeting" width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold group-hover:text-black">{title}</h1>
        <p className="text-lg font-normal group-hover:text-black">{desc}</p>
      </div>
    </div>
  );
};

export default HomeCard;
