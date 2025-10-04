<template>
    <UPageSection
        id="info"
        title="Informácie"
        description="Spišská Nová Ves leží v srdci Spiša, v tradičnej zemiakárskej oblasti známej výnimočnou kvalitou úrody. Vďaka nadmorskej výške, čistému horskému vzduchu, dostatku zrážok a chladnejším nociam majú tunajšie zemiaky pevnú štruktúru, plnú chuť a výbornú skladovateľnosť. Pestujú sa tu ekologickejšie, v súlade s prírodou, a preto sú považované za spoľahlivú slovenskú surovinu."
        icon="i-lucide-box"
        orientation="horizontal"
        :features="features"
        :reverse="true"
        :links="links"
    />
</template>

<script lang="ts" setup>
    const features = ref([
        {
            title: "Cena",
            description: "0,40 € ... 1 kg",
            icon: "i-lucide-star"
        },
        {
            title: "Doprava",
            description: "Dovoz po dohode zabezpečím Spišská Nová Ves a okolie.",
            icon: "i-lucide-truck"
        },
        {
            title: "+421 948 121 289",
            icon: "i-lucide-phone",
            to: "tel:+421948121289"
        },
        {
            title: "farmahamorsro@gmail.com",
            icon: "i-lucide-mail",
            to: "mailto:farmahamorsro@gmail.com",
            description: "V prípade otázok nás neváhajte kontaktovať."
        }
    ]);

    const links = ref([
        {
            label: "Odrody",
            to: { path: "/", hash: "#odrody" },
            trailingIcon: "i-lucide-arrow-right",
            variant: "subtle",
            color: "neutral"
        }
    ]);
</script>