import React, { CSSProperties } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import tutorial from "../poze/tutorial.svg";
import profil from "../poze/profil_v1.svg";
import simulare from "../poze/simulare.svg";

export default function CarouselTemplate() {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} emulateTouch={true} swipeable={true} showThumbs={false}>
            <div>
                <img src={simulare} />
                {/* <p className="legend">Legend 1</p> */}
            </div>
            <div>
                <img src={profil} />
                {/* <p className="legend">Legend 2</p> */}
            </div>
            <div>
                <img src={tutorial} />
                {/* <p className="legend">Legend 3</p> */}
            </div>
        </Carousel>
    );
}
