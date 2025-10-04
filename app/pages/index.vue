<template>
    <div>
        <canvas ref="canvas" class="absolute inset-0 -z-1 pointer-events-none opacity-0 lg:opacity-100"></canvas>
        <Hero/>
        <Info/>
        <Order/>
        <Odrody/>
        <Newsletter/>
    </div>
</template>

<script lang="ts" setup>
    import { Application } from "@splinetool/runtime";
    import gsap from "gsap";
    import ScrollTrigger from "gsap/ScrollTrigger";

    const canvas = ref<HTMLCanvasElement | null>(null);
    
    onMounted(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (canvas.value) {
            const spline = new Application(canvas.value);
            spline.load("https://prod.spline.design/arZD9oYwVIhDCJdl/scene.splinecode").then(() => {
                const object = spline.findObjectByName("low-poly_potato");
                const offset = 60;
                
                if (object) {
                    gsap.set(object.scale, { x: 800, y: 800, z: 800 });
                    gsap.set(object.position, { x: offset, z: -offset });

                    gsap.timeline({
                        scrollTrigger: {
                            start: "top top",
                            endTrigger: "#info",
                            end: "bottom bottom",
                            scrub: true,
                            pin: canvas.value
                        },
                    })
                    .to(object.position, { x: -offset, z: offset })
                    .to(object.rotation, {  x:1, z: 2 }, 0);

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: "#info",
                            start: "bottom bottom",
                            endTrigger: "#objednavka",
                            end: "bottom bottom",
                            scrub: true,
                            pin: canvas.value
                        },
                    })
                    .to(object.position, { x: offset, z: -offset })
                    .to(object.rotation, {  x: -1  }, 0);

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: "#objednavka",
                            start: "bottom bottom",
                            endTrigger: "#odrody",
                            end: "bottom bottom",
                            scrub: true,
                            pin: canvas.value
                        },
                    })
                    .to(object.position, { x: -offset, z: offset })
                    .to(object.rotation, {  x:1, z: 2  }, 0);
                }
            });
        }
    });
</script>