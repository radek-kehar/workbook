import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import {HeartIcon} from "@heroicons/react/24/outline";

const AboutPage = () => {
    return (
        <AppLayout>
            <div className="flex flex-col justify-center items-center text-center content-center">
                <div className="text-3xl text-primary mt-10">Jendovi, Vendovi a Majdě</div>
                <div className="text-xl text-primary mt-10">... pro usnadnění vstupu do světa matematiky ...</div>
                <div className="text-2xl text-primary mt-10">vytvořil táta.</div>
                <HeartIcon className="h-1/6 w-1/6 text-primary mt-10" aria-hidden="true"/>
                <div className="text-xl text-gray-400 mt-10">Pozor: Jedná se o zkušební verzi aplikace, která může obsahovat chyby. Na ostré verzi aplikace nadále pracuji.</div>
            </div>
        </AppLayout>
    );
};

export default AboutPage;
