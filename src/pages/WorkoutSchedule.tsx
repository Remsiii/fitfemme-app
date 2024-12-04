import { CameraIcon, ZapOffIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export const WorkoutSchedule = (): JSX.Element => {
  const thumbnails = [
    {
      id: 1,
      src: "https://c.animaapp.com/ERq7At1y/img/group@2x.png",
      alt: "Front view",
    },
    {
      id: 2,
      src: "https://c.animaapp.com/ERq7At1y/img/vector.svg",
      alt: "Side view",
    },
    {
      id: 3,
      src: "https://c.animaapp.com/ERq7At1y/img/vector-2.svg",
      alt: "Back view",
    },
    {
      id: 4,
      src: "https://c.animaapp.com/ERq7At1y/img/vector-1.svg",
      alt: "Other side",
    },
  ];

  return (
    <main className="flex justify-center w-full bg-white">
      <div className="w-[375px] h-[812px] relative">
        <section className="w-full h-[677px] rounded-t-[40px] bg-gradient-to-b from-[#92A3FD] to-[#9DCDFF]">
          <img
            className="w-[171px] h-[489px] mx-auto mt-[61px]"
            alt="Body measurement figure"
            src="https://c.animaapp.com/ERq7At1y/img/frame.svg"
          />

          <Card className="w-[295px] h-[68px] mx-auto mt-10">
            <CardContent className="flex items-center justify-between p-2.5">
              <Button variant="ghost" size="icon">
                <ZapOffIcon className="w-6 h-6" />
              </Button>

              <Button className="w-12 h-12 rounded-3xl bg-gradient-to-b from-[#C58BF2] to-[#EEA4CE]">
                <CameraIcon className="w-6 h-6 text-white" />
              </Button>

              <Button variant="ghost" size="icon">
                <CameraIcon className="w-6 h-6" />
              </Button>
            </CardContent>
          </Card>
        </section>

        <div className="flex gap-4 px-8 mt-[30px]">
          {thumbnails.map((thumb) => (
            <Card
              key={thumb.id}
              className="w-[68px] h-[65px] rounded-xl bg-gray-3 bg-opacity-10 border border-gray-3"
            >
              <CardContent className="flex items-center justify-center p-2.5">
                <img
                  src={thumb.src}
                  alt={thumb.alt}
                  className="h-[46px] w-auto"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};
