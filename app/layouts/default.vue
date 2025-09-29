<template>
  <div>
    <UHeader>
     <template #title>
      <h1><span class="text-primary">Zemiaky</span> Spiš</h1>
     </template>

     <UNavigationMenu :items="items" variant="link" color="neutral"/>

     <template #right>
      <UButton :to="{ path: '/', hash: '#objednavka' }" size="lg" icon="i-lucide-truck">Objednaj</UButton>
     </template>
    </UHeader>

    <UMain>
      <UContainer>
        <slot/>
      </UContainer>
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-muted text-sm">Copyright © 2025 | Vytvoril <ULink to="https://hamracek.dev" class="text-primary">Andrej Hamráček</ULink></p>
      </template>

      <UNavigationMenu :items="items" variant="link" color="neutral"/>

      <template #right>
        <UButton
          icon="i-lucide-phone"
          color="neutral"
          variant="ghost"
          to="tel:+421948121289"
          aria-label="telefón"
        />
        <UButton
          icon="i-lucide-mail"
          color="neutral"
          variant="ghost"
          to="mailto:farmahamorsro@gmail.com"
          aria-label="email"
        />
      </template>
    </UFooter>
  </div>
</template>

<script lang="ts" setup>
  import type { NavigationMenuItem } from "@nuxt/ui";

  const items = ref<NavigationMenuItem[]>([
    {
      label: "Informácie",
      to: { path: "/", hash: "#info" }
    },
    {
      label: "Kontakt",
      to: { path: "/", hash: "#info" }
    },
    {
      label: "Novinky",
      to: { path: "/", hash: "#novinky" }
    }
  ]);
</script>