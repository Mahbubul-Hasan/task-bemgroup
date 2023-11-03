import ImageCarousel from "@/components/ImageCarousel";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
    const carouselImages = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"];

    return (
        <div className="home">
            <h1>Homepage</h1>
            <ImageCarousel images={carouselImages} />
        </div>
    );
}
