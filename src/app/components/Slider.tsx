import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/swiper-bundle.css";

interface ImageSliderProps {
  images: string[];
  baseUrl?: string;
}

export function ImageSlider({
  images,
  baseUrl = "http://localhost:5000",
}: ImageSliderProps) {
  return (
    <div className="relative w-full group">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        navigation={{
          nextEl: ".button-next-elm",
          prevEl: ".button-prev-elm",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          1024: { slidesPerView: 2 },
        }}
        className="rounded-2xl"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-[4/3] w-full overflow-hidden ">
              <img
                src={`${baseUrl}${image}`}
                className="w-full h-full object-center"
                alt="Listing"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Buttons Styled with Tailwind */}
      <button className="button-prev-elm absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-md transition-all disabled:opacity-0">
        <ChevronLeft size={24} />
      </button>

      <button className="button-next-elm absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-blue-600 p-2 rounded-full shadow-md transition-all disabled:opacity-0">
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
