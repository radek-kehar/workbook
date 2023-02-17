import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import {Icon, IconLabel} from "@/components/label/IconLabel";

const AboutPage = () => {
    return (
        <AppLayout>
            <div className="flex flex-col justify-center items-center text-center content-center">
                <div className="text-3xl text-primary mt-10">Jendovi, Vendovi a Majdě</div>
                <div className="text-xl text-primary mt-10">... pro usnadnění vstupu do světa matematiky ...</div>
                <div className="text-2xl text-primary mt-10">vytvořil táta</div>
                <IconLabel className="text-8xl text-primary mt-10 animate-pulse" value={Icon.HEART}/>
            </div>
        </AppLayout>
    );
};

export default AboutPage;
