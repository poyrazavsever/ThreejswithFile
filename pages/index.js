import ImageUploader from "@/components/ImageUploader";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div>
      <Toaster />

      <ImageUploader />
  
    </div>
  );
}
