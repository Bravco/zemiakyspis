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
                const offset = 50;
                
                if (object) {
                    gsap.set(object.position, { x: offset, z: -offset });

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
                    .to(object.position, { x: -offset, z: offset })
                    .to(object.rotation, {  x:1, z: 2 }, 0)
                    .to(canvas, { y: "80vh" }, 0);
                }
            });
        }
    });
</script>