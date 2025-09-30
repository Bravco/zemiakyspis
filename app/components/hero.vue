<template>
    <UPageHero
        title="Zemiaky zo Spiša"
        description="Čerstvé domáce zemiaky priamo od farmára – kvalitné, chutné a poctivo vypestované."
        :links="links"
        orientation="horizontal"
    />
</template>

<script setup>
    const links = ref([
        {
            label: "Objednaj",
            to: { path: "/", hash: "#objednavka" },
            icon: "i-lucide-truck"
        },
        {
            label: "Zisti viac",
            to: { path: "/", hash: "#info" },
            color: "neutral",
            variant: "subtle",
            trailingIcon: "i-lucide-arrow-right"
        }
    ]);
</script>