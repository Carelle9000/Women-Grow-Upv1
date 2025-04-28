import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { AnimatedCard } from './AnimatedCard';

export function EventCarousel() {
  return (
    <AnimatedCard>
      <h2 className="text-pink-600 font-semibold text-xl mb-4">Prochains événements</h2>
      <Swiper spaceBetween={20} slidesPerView={1}>
        <SwiperSlide>
          <div className="p-4 bg-pink-100 rounded-xl dark:bg-gray-700">
            Atelier Bien-Être 🌸 - 15 Mai
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-4 bg-pink-100 rounded-xl dark:bg-gray-700">
            Conférence Empowerment 💼 - 20 Juin
          </div>
        </SwiperSlide>
      </Swiper>
    </AnimatedCard>
  );
}
