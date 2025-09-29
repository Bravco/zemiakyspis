<template>
    <UPageSection
        id="objednavka"
        title="Vytvoriť objednávku"
        orientation="horizontal"
    >
        <template #body>
            <UForm :schema="schema" :state="state" @submit="onSubmit" class="grid grid-cols-2 gap-4">
                <UFormField label="Meno" name="firstName" required>
                    <UInput v-model="state.firstName" class="w-full"/>
                </UFormField>
                <UFormField label="Priezvisko" name="lastName" required>
                    <UInput v-model="state.lastName" class="w-full"/>
                </UFormField>
                <UFormField label="Telefón" name="phone" required>
                    <UInput v-model="state.phone" type="tel" class="w-full"/>
                </UFormField>
                <UFormField label="Email" name="email" required>
                    <UInput v-model="state.email" type="email" class="w-full"/>
                </UFormField>
                <UButton
                    type="submit"
                    class="w-fit cursor-pointer"
                    label="Odoslať"
                />
            </UForm>
        </template>
    </UPageSection>
</template>

<script lang="ts" setup>
    import * as v from "valibot";
    import type { FormSubmitEvent } from "@nuxt/ui";

    const runtimeConfig = useRuntimeConfig();
    const toast = useToast();

    const schema = v.object({
        firstName: v.pipe(v.string()),
        lastName: v.pipe(v.string()),
        phone: v.pipe(v.string(), v.regex(/^\+?[0-9][0-9\s-]{7,19}$/, "Nesprávne telefónne číslo")),
        email: v.pipe(v.string(), v.email("Nesprávny email"))
    });

    type Schema = v.InferOutput<typeof schema>;

    const state = reactive({
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    });

    async function onSubmit(event: FormSubmitEvent<Schema>) {
        toast.add({ title: "Vaša objednávka bola úspešne odoslaná.", description: "Budeme Vás kontaktovať emailom alebo telefonicky.", color: "success" });
        console.log(event.data);
    }
</script>