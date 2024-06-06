import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: React.ReactNode;
  buttonText?: string;
  handleClick?: () => void;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal: React.FC<MeetingModalProps> = ({
  isOpen,
  onClose,
  title,
  className,
  handleClick,
  buttonText,
  image,
  buttonIcon,
  children,
}) => {
  console.log(isOpen);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-white px-6 py-9 text-white">
        <div className="flex flex-col gap-6 ">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" height={72} width={72} />
            </div>
          )}
          <h1
            className={cn(
              `text-3xl text-black font-cold leading-[42px]`,
              className
            )}
          >
            {title}
          </h1>
          {children}
          <Button
            className="bg-dark-1 group focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-blue-400 rounded-[8px] text-white"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
