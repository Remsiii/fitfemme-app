import { CameraIcon, ZapOffIcon, ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const TakePhoto = (): JSX.Element => {
  // Data for thumbnail previews
  const thumbnails = [
    {
      id: 1,
      src: "https://c.animaapp.com/QWwLzMKn/img/group@2x.png",
      alt: "Front view",
    },
    {
      id: 2,
      src: "https://c.animaapp.com/QWwLzMKn/img/vector.svg",
      alt: "Side view",
    },
    {
      id: 3,
      src: "https://c.animaapp.com/QWwLzMKn/img/vector-2.svg",
      alt: "Back view",
    },
    {
      id: 4,
      src: "https://c.animaapp.com/QWwLzMKn/img/vector-1.svg",
      alt: "Other side",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="bg-white w-full">
      <Button
        className="absolute top-4 left-4 z-50 flex items-center gap-2 [background:linear-gradient(180deg,rgb(197,139,242)_0%,rgb(238,164,206)_100%)]"
        onClick={() => navigate("/progress-photo")}
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Progress Photos
      </Button>

      <section className="w-full h-[677px] rounded-[40px_40px_0px_0px] [background:linear-gradient(180deg,rgb(146,163,253)_0%,rgb(157,206,255)_100%)]">
        <img
          className="mx-auto mt-[30px] w-[171px] h-[489px]"
          alt="Body frame"
          src="https://c.animaapp.com/QWwLzMKn/img/frame.svg"
        />

        <Card className="mx-10 mt-10">
          <CardContent className="flex items-center justify-between p-2.5 bg-white/80 rounded-[99px]">
            <Button variant="ghost" size="icon" className="p-0">
              <ZapOffIcon className="w-6 h-6" />
            </Button>

            <Button className="w-12 h-12 rounded-3xl [background:linear-gradient(180deg,rgb(197,139,242)_0%,rgb(238,164,206)_100%)]">
              <CameraIcon className="w-6 h-6 text-white" />
            </Button>

            <Button variant="ghost" size="icon" className="p-0">
              <CameraIcon className="w-6 h-6" />
            </Button>
          </CardContent>
        </Card>
      </section>

      <div className="flex gap-4 px-[20px] mt-[20px]">
        {thumbnails.map((thumb) => (
          <Card
            key={thumb.id}
            className="w-[68px] h-[65px] rounded-xl bg-gray-3 border-[0.5px] border-gray-3 opacity-10"
          >
            <CardContent className="p-0 flex items-center justify-center h-full">
              <img
                src={thumb.src}
                alt={thumb.alt}
                className="w-auto h-[46px]"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
