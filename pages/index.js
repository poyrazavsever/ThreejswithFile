import ImageUploader from "@/components/ImageUploader";
import ModalUploader from "@/components/ModalUploader";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div>
      <Toaster />

      <div className="flex flex-col gap-24 mt-36">
        <ImageUploader />

        <ModalUploader />
      </div>

  
    </div>
  );
}
