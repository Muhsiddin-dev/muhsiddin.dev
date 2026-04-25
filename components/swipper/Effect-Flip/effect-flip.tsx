import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style-effect-flip.css';

// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { PixelImage } from '@/components/ui/pixel-image';

export default function EffectFlipComponent({ Admin_Name }: { Admin_Name: string }) {
    return (
        <>
            <Swiper
                effect={'flip'}
                grabCursor={true}
                pagination={true}
                navigation={false}
                modules={[EffectFlip, Pagination, Navigation]}
                className="mySwiper w-full h-full rounded-full "
            >
                <SwiperSlide className="w-full h-full relative">
                    <PixelImage
                        src={'/Img1-Admin.png'}
                        // alt={Admin_Name}
                        // fill 
                        grid="8x8"
                        // className="object-cover w-full h-full rounded-full"
                        // priority
                    />
                </SwiperSlide>
                <SwiperSlide className="w-full h-full relative">
                    <Image
                        src={'/Img2-Admin.png'}
                        alt={Admin_Name}
                        fill 
                        className="object-cover w-full h-full rounded-full"
                        priority
                    />
                </SwiperSlide>
                <SwiperSlide className="w-full h-full relative">
                    <Image
                        src={'/Img3-Admin.png'}
                        alt={Admin_Name}
                        fill 
                        className="object-cover w-full h-full rounded-full"
                        priority
                    />
                </SwiperSlide>
                <SwiperSlide className="w-full h-full relative">
                    <img className="w-full h-full object-cover rounded-full" src="https://swiperjs.com/demos/images/abstract-1.jpg" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
