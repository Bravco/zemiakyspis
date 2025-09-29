<template>
    <UPageSection
        id="objednavka"
        title="Vytvoriť objednávku"
        orientation="horizontal"
    >
        <template #body>
            <UForm :schema="schema" :state="state" @submit="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormField label="Meno" name="firstName" required>
                    <UInput v-model="state.firstName" class="w-full" required/>
                </UFormField>
                <UFormField label="Priezvisko" name="lastName" required>
                    <UInput v-model="state.lastName" class="w-full" required/>
                </UFormField>
                <UFormField label="Telefón" name="phone" required>
                    <UInput v-model="state.phone" type="tel" class="w-full" required/>
                </UFormField>
                <UFormField label="Email" name="email" required>
                    <UInput v-model="state.email" type="email" class="w-full" required/>
                </UFormField>
                <UFormField label="Doprava" name="delivery" class="col-span-1 sm:col-span-2">
                    <USelect v-model="state.delivery" :items="deliveryItems" class="w-full"/>
                </UFormField>
                <UForm v-if="state.delivery" :schema="deliverySchema" nested>
                    <UFormField label="Obec" name="city" required>
                        <UInput v-model="state.city" class="w-full" required/>
                    </UFormField>
                    <UFormField label="Adresa" name="address" required>
                        <UInput v-model="state.address" class="w-full" required/>
                    </UFormField>
                </UForm>
                <UFormField label="Preferovaný dátum dodania" name="date" required>
                    <UInput v-model="state.date" type="date" class="w-full" required/>
                </UFormField>
                <UFormField label="Množstvo" name="quantity" required>
                    <UInputNumber v-model="state.quantity" :min="25" :step="25" :format-options="{ style: 'unit', unit: 'kilogram' }" class="w-full" required/>
                </UFormField>
                <div class="flex items-center justify-between col-span-1 sm:col-span-2">
                    <span class="text-primary text-lg font-medium">~ {{ estPrice.toFixed(2) }} €</span>
                    <UButton
                        type="submit"
                        class="cursor-pointer"
                        :label="loading ? '' : 'Odoslať'"
                        :icon="loading ? 'eos-icons:loading' : ''"
                        :disabled="loading"
                    />
                </div>
            </UForm>
        </template>
    </UPageSection>
</template>

<script lang="ts" setup>
    import * as v from "valibot";
    import type { FormSubmitEvent, SelectItem } from "@nuxt/ui";

    const runtimeConfig = useRuntimeConfig();
    const toast = useToast();

    const schema = v.object({
        firstName: v.pipe(v.string()),
        lastName: v.pipe(v.string()),
        phone: v.pipe(v.string(), v.regex(/^\+?[0-9][0-9\s-]{7,19}$/, "Nesprávne telefónne číslo")),
        email: v.pipe(v.string(), v.email("Nesprávny email")),
        delivery: v.pipe(v.boolean()),
        date: v.pipe(v.string(), v.isoDate("Neplatný dátum")),
        quantity: v.pipe(v.number("Neplatný počet"), v.integer("Nie je celé číslo"), v.minValue(25, "Minimum je 25kg"), v.check((value) => value % 25 === 0, "Počet musí byť násobkom 25"))
    });

    type Schema = v.InferOutput<typeof schema>;

    const deliverySchema = v.object({
        city: v.pipe(v.string()),
        address: v.pipe(v.string())
    });

    type DeliverySchema = v.InferOutput<typeof deliverySchema>;

    const state = reactive<Partial<Schema & DeliverySchema>>({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        delivery: false,
        city: "",
        address: "",
        date: "",
        quantity: 25
    });

    const deliveryItems = ref<SelectItem[]>([
        {
            label: "Vlastný odber",
            value: false
        },
        {
            label: "Doručenie na adresu",
            value: true
        }
    ]);
    const loading = ref<boolean>(false);

    const estPrice = computed<number>(() => {
        return state.quantity ? 0.4 * state.quantity : 0;
    });

    async function onSubmit(event: FormSubmitEvent<Schema>) {
        loading.value = true;
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: runtimeConfig.public.WEB3FORMS_ACCESS_KEY,
                from_name: "zemiakyspis.sk",
                subject: "Objednávka zemiakov",
                meno: event.data.firstName + " " + event.data.lastName,
                telefon: event.data.phone,
                email: event.data.email,
                datum: (new Date(event.data.date)).toDateString(),
                mnozstvo: `${event.data.quantity} kg`,
                doprava: event.data.delivery ? "Doručenie na adresu" : "Vlastný odber",
                adresa: event.data.delivery
                    ? `${(event.data as any).city}, ${(event.data as any).address}`
                    : undefined,
            }),
        });

        const result = await response.json();
        if (result.success) {
            toast.add({ title: "Vaša objednávka bola úspešne odoslaná.", description: "Budeme Vás kontaktovať emailom alebo telefonicky.", color: "success" });
            loading.value = false;
        }
    }
</script>