<template>
    <UPageCTA
        id="novinky"
        title="Novinky"
        description="Prihlásením na odber našich noviniek získate exkluzívne informácie o zmene cien."
        variant="subtle"
    >
        <template #links>
            <UForm :schema="schema" :state="state" @submit="onSubmit" class="flex flex-wrap gap-4">
                <UFormField name="email" required>
                    <UInput v-model="state.email" type="email" placeholder="Email"/>
                </UFormField>
                <UButton
                    type="submit"
                    class="cursor-pointer"
                    :disabled="loading"
                    :icon="loading ? 'i-eos-icons-loading' : ''"
                    :label="loading ? '' : 'Odoberať'"
                />
            </UForm>
        </template>
    </UPageCTA>
</template>

<script lang="ts" setup>
    import * as v from "valibot";
    import type { FormSubmitEvent } from "@nuxt/ui";

    const runtimeConfig = useRuntimeConfig()
    const toast = useToast();

    const schema = v.object({
        email: v.pipe(v.string(), v.email("Nesprávny email"))
    });

    type Schema = v.InferOutput<typeof schema>;

    const state = reactive({
        email: ""
    });

    const loading = ref<boolean>(false);

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
                subject: "Odber noviniek",
                email: event.data.email,
            }),
        });

        const result = await response.json();
        if (result.success) {
            toast.add({ title: "Úspešne ste sa prihlásili na odber noviniek.", color: "success" });
            loading.value = false;
        }
    }
</script>