import { motion } from "framer-motion";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CameraIcon, XIcon, ZoomInIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface ProgressPhoto {
  id: string;
  url: string;
  date: string;
}

export const CameraScreen = (): JSX.Element => {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<ProgressPhoto | null>(null);
  const { toast } = useToast();

  // Load photos from localStorage on component mount
  useEffect(() => {
    try {
      const savedPhotos = localStorage.getItem('progressPhotos');
      if (savedPhotos) {  
        setPhotos(JSON.parse(savedPhotos));
      }
    } catch (error) {
      console.error('Error loading photos:', error);
    }
  }, []);

  // Save photos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('progressPhotos', JSON.stringify(photos));
    } catch (error) {
      console.error('Error saving photos:', error);
    }
  }, [photos]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Convert FileList to Array to handle multiple files
    const filesArray = Array.from(files);

    // Process each file
    for (const file of filesArray) {
      try {
        const base64 = await convertFileToBase64(file);
        const newPhoto: ProgressPhoto = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          url: base64,
          date: new Date().toISOString().split('T')[0]
        };

        // Save to Supabase
        const { error } = await supabase
          .from('progress_photos')
          .insert([
            {
              id: newPhoto.id,
              photo_url: newPhoto.url,
              date: newPhoto.date
            }
          ]);

        if (error) {
          console.error('Error saving to Supabase:', error);
          toast({
            variant: "destructive",
            title: "Fehler beim Speichern",
            description: "Das Foto konnte nicht in der Datenbank gespeichert werden."
          });
          return;
        }

        toast({
          title: "Erfolgreich gespeichert",
          description: "Das Foto wurde in der Datenbank gespeichert.",
        });

        setPhotos(prev => [...prev, newPhoto]);
      } catch (error) {
        console.error('Error processing file:', error);
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Es gab einen Fehler beim Verarbeiten des Fotos."
        });
      }
    }

    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(null);
    }
  };

  return (
    <motion.div 
      className="bg-white min-h-screen p-6 pb-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold">Progress Photos</h1>
      </header>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img 
              src={photo.url} 
              alt={`Progress photo from ${photo.date}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(photo);
                  }}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ZoomInIcon className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePhoto(photo.id);
                  }}
                  className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                >
                  <XIcon className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2">
              {photo.date}
            </div>
          </div>
        ))}
      </div>

      {/* Camera Controls */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-center gap-3 p-4 bg-white border-t border-gray-100 shadow-lg">
        <label>
          <Button 
            className="bg-gradient-to-b from-[#92A3FD] to-[#9DCEFF] text-white"
            onClick={() => document.getElementById('cameraInput')?.click()}
          >
            Take Photo
          </Button>
          <input
            id="cameraInput"
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>

        <label>
          <Button 
            variant="outline"
            className="cursor-pointer"
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            Choose from Gallery
          </Button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            multiple
            onChange={handleFileSelect}
          />
        </label>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-3xl w-full">
            <img 
              src={selectedPhoto.url} 
              alt={`Progress photo from ${selectedPhoto.date}`} 
              className="w-full rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                deletePhoto(selectedPhoto.id);
              }}
              className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            >
              <XIcon className="w-5 h-5 text-red-500" />
            </button>
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white text-sm py-1 px-3 rounded-full">
              {selectedPhoto.date}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
