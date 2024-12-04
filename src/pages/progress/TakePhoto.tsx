import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, CameraIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { supabase } from "@/lib/supabase";

type Thumbnail = {
  id: number;
  src: string;
  alt: string;
};

export const TakePhoto = (): JSX.Element => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [mainPhoto, setMainPhoto] = useState<string | null>(null);

  const navigate = useNavigate();

  const userId = "258c3774-017d-4c6e-a558-58a0f963fd19";

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = `${userId}/${Date.now()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("user_photos")
        .upload(fileName, file);

      if (error) {
        console.error("Error uploading file:", error.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("user_photos")
        .getPublicUrl(fileName);

      if (publicUrlData) {
        const publicUrl = publicUrlData.publicUrl;

        setMainPhoto(publicUrl);
        setThumbnails((prev) => [
          ...prev,
          { id: Date.now(), src: publicUrl, alt: "New Photo" },
        ]);

        const { error: dbError } = await supabase
          .from("user_photos")
          .insert([{ user_id: userId, photo_url: publicUrl }]);

        if (dbError) {
          console.error("Error updating database:", dbError.message);
          return;
        }
      } else {
        console.error("Error retrieving public URL for the uploaded file.");
      }
    }
  };

  const fetchUserThumbnails = async () => {
    const { data, error } = await supabase
      .from("user_photos")
      .select("photo_url")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching thumbnails:", error.message);
      return;
    }

    setThumbnails(
      data.map((item, index) => ({
        id: index + 1,
        src: item.photo_url,
        alt: `Photo ${index + 1}`,
      }))
    );
  };

  const handleThumbnailClick = (photoUrl: string) => {
    setMainPhoto(photoUrl);
  };

  React.useEffect(() => {
    fetchUserThumbnails();
  }, []);

  return (
    <div className="bg-white w-full">
      <Button
        className="absolute top-4 left-4 z-50 flex items-center gap-2 [background:linear-gradient(180deg,rgb(197,139,242)_0%,rgb(238,164,206)_100%)] rounded-lg"
        onClick={() => navigate("/progress-photo")}
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </Button>

      <section className="w-full h-[677px] rounded-[40px_40px_0px_0px] [background:linear-gradient(180deg,rgb(146,163,253)_0%,rgb(157,206,255)_100%)]">
        {mainPhoto ? (
          <img
            className="mx-auto mt-[30px] w-[310px] h-[520px] object-cover"
            alt="Captured Photo"
            src={mainPhoto}
          />
        ) : (
          <img
            className="mx-auto mt-[30px] w-[171px] h-[489px]"
            alt="Body frame"
            src="https://c.animaapp.com/QWwLzMKn/img/frame.svg"
          />
        )}

        <Card className="mx-10 mt-10">
          <CardContent className="flex items-center justify-center p-2.5 bg-white/80 rounded-[99px]">
            <label
              htmlFor="photoInput"
              className="w-12 h-12 flex items-center justify-center rounded-3xl cursor-pointer [background:linear-gradient(180deg,rgb(197,139,242)_0%,rgb(238,164,206)_100%)]"
            >
              <CameraIcon className="w-6 h-6 text-white" />
            </label>
            <input
              id="photoInput"
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </CardContent>
        </Card>
      </section>

      <div className="flex gap-4 px-[20px] mt-[20px]">
        {thumbnails.map((thumb) => (
          <Card
            key={thumb.id}
            className="w-[68px] h-[65px] rounded-xl bg-gray-3 border-[0.5px] border-gray-3  cursor-pointer"
            onClick={() => handleThumbnailClick(thumb.src)}
          >
            <CardContent className="p-0 flex items-center justify-center h-full">
              <img src={thumb.src} alt={thumb.alt} className="w-auto h-[46px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
