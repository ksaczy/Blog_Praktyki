import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './Team.scss';

interface TeamMember {
    name: string;
    surname: string;
    img: string;
    description: string;
}

const Team = () => {
    const members: TeamMember[] = [
        { name: "Emilian", surname: "Hernes", img: "ProfilePicture1.jpg", description: "Lorem ipsum..." },
        { name: "Emilian", surname: "Hernes", img: "ProfilePicture2.jpg", description: "Lorem ipsum..." },
        { name: "Emilian", surname: "Hernes", img: "ProfilePicture3.jpg", description: "Lorem ipsum..." },
        { name: "Emilian", surname: "Hernes", img: "ProfilePicture4.jpg", description: "Lorem ipsum..." },
        { name: "Emilian", surname: "Hernes", img: "ProfilePicture5.jpg", description: "Lorem ipsum..." },
        { name: "Emilian", surname: "Hernes", img: "ProfilePicture6.jpg", description: "Lorem ipsum..." }
    ];

    return (
        <div className="team-container">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: false,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
            >
                {members.map((member, i) => (
                    <SwiperSlide key={i}>
                        <section className="person-card">
                            <img src={`Images/${member.img}`} alt={member.name} />
                            <h2>{member.name} {member.surname}</h2>
                            <p>{member.description}</p>
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Team;