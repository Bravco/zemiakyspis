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

     <template #body>
      <UNavigationMenu :items="items" orientation="vertical" variant="link" color="neutral" class="-mx-2.5"/>
     </template>
    </UHeader>

    <UMain>
      <UContainer>
        <slot/>
      </UContainer>
    </UMain>

    <UFooter :ui="{ bottom: 'py-0 lg:py-0' }">
      <template #left>
        <ULink to="https://briketyspis.sk" target="_blank" class="underline">briketyspis.sk</ULink>
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
        <UColorModeButton class="cursor-pointer"/>
      </template>

      <template #bottom>
        <UContainer>
          <USeparator/>
          <p class="py-8 text-center text-muted text-sm">Copyright © 2025 | Vytvoril <ULink to="https://hamracek.dev" class="text-primary">Andrej Hamráček</ULink></p>
        </UContainer>
      </template>
    </UFooter>
  </div>
</template>

<script lang="ts" setup>
  import type { NavigationMenuItem } from "@nuxt/ui";

  const items = ref<NavigationMenuItem[]>([
    {
      label: "Informácie",
      to: { path: "/", hash: "#info" },
      active: false
    },
    {
      label: "Kontakt",
      to: { path: "/", hash: "#info" },
      active: false
    },
    {
      label: "Novinky",
      to: { path: "/", hash: "#novinky" },
      active: false
    }
  ]);
</script>