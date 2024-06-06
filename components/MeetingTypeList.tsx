"use client";
import * as React from "react";
import HomeCard from "./sub/HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";

const MeetingTypeList = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [meetingState, setMeetingState] = React.useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = React.useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = React.useState<Call>();
  const [date, setDate] = React.useState<Date>();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!values.dateTime) {
      toast({
        className: "py-4 border-white bg-black text-white",
        title: "Please select a date and time",
      });
      return;
    }
    if (!user || !client) return;
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error(`Failed to create call`);
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 ">
      <HomeCard
        url="/icons/add-meeting.svg"
        title="New Meeting"
        desc="Start an instant Meeting"
        className="group-hover:bg-orange-1"
        handleClick={() => {
          setMeetingState("isInstantMeeting");
        }}
      />
      <HomeCard
        url="/icons/schedule.svg"
        title="Schedule Meeting"
        desc="Plan your meeting"
        className="group-hover:bg-blue-1"
        handleClick={() => {
          setMeetingState("isScheduleMeeting");
        }}
      />
      <HomeCard
        url="/icons/join-meeting.svg"
        title="Join Meeting"
        desc="via invitation link"
        className="group-hover:bg-purple-1"
        handleClick={() => {
          setMeetingState("isJoiningMeeting");
        }}
      />
      <HomeCard
        url="/icons/recordings.svg"
        title="View Recordings"
        desc="Check out your recordings"
        className="group-hover:bg-yellow-1"
        handleClick={() => {
          router.push("/recordings");
        }}
      />
      {!callDetails ? (
        <>
          <MeetingModal
            title="Create Meeting"
            isOpen={meetingState === "isScheduleMeeting"}
            onClose={() => setMeetingState(undefined)}
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting}
          >
            <div className="flex flex-col gap-2.5 ">
              <label
                htmlFor=""
                className="text-base text-normal leading-[22px] text-black"
              >
                Add a description
              </label>
              <Textarea
                className="border-none bg-black rounded-[6px] focus-visible:ring-0  focus-visible:ring-offset-0"
                onChange={(e) =>
                  setValues({
                    ...values,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex w-full flex-col gap-2.5">
              <label
                htmlFor=""
                className="text-base text-normal leading-[22px] text-black"
              >
                Select date and time
              </label>
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded bg-black p-2 focus:outline-none"
              />
            </div>
          </MeetingModal>
        </>
      ) : (
        <MeetingModal
          title="Meeting Created"
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              className: "py-4 text-white",
              title: "Link copied Successfully",
            });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}
      <MeetingModal
        title="Start an Instant Meeting"
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
