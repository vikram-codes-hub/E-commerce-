import React from "react";
import { assets } from "../assets/assets";

const Ourpolicy = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
            <div>
                <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
                <p className="font-semibold">EASY EXCHANGE</p>
                <p className="text-gray-400">We offer hassle-free exchange</p>
            </div>
            <div>
                <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
                <p className="font-semibold">PREMIUM QUALITY</p>
                <p className="text-gray-400">Best quality products guaranteed</p>
            </div>
            <div>
                <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
                <p className="font-semibold">24/7 SUPPORT</p>
                <p className="text-gray-400">We are here to help you anytime</p>
            </div>
        </div>
    );
};

export default Ourpolicy;
