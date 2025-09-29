<template>
    <div>
        <canvas id="canvas3d" class="absolute inset-0 -z-1 pointer-events-none opacity-0 lg:opacity-100"></canvas>
        <Hero/>
        <Info/>
        <section id="objednavka"></section>
        <Newsletter/>
    </div>
</template>

<script lang="ts" setup>
    import { Application } from "@splinetool/runtime";
    import gsap from "gsap";
    import ScrollTrigger from "gsap/ScrollTrigger";
    
    onMounted(() => {
        gsap.registerPlugin(ScrollTrigger);

        const canvas: HTMLCanvasElement | null = document.querySelector("#canvas3d");
        if (canvas) {
            const spline = new Application(canvas);
            spline.load("https://prod.spline.design/arZD9oYwVIhDCJdl/scene.splinecode").then(() => {
                const object = spline.findObjectByName("low-poly_potato");
                const xTranslate = "300";
                
                if (object) {
                    gsap.set(canvas, { x: xTranslate });

                    gsap.timeline({
                        scrollTrigger: {
                            start: "top top",
                            endTrigger: "#info",
                            end: "center center",
                            scrub: true,
                            pin: true,
                            pinSpacing: false
                        },
                    })
                    .to(object.rotation, {  x: 1, y: -1 }, 0)
                    .to(canvas, { x: -xTranslate, y: "75vh" }, 0);
                }
            });
        }
    });
</script>