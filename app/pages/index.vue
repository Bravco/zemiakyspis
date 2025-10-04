<template>
    <div>
        <canvas
            v-if="showCanvas"
            ref="canvas"
            class="absolute inset-0 -z-1 pointer-events-none"
        ></canvas>
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
    const splineApp = ref<Application | null>(null);
    const showCanvas = ref<boolean>(false);

    function initSpline() {
        if (!canvas.value) return;

        gsap.registerPlugin(ScrollTrigger);
        
        const spline = new Application(canvas.value);
        splineApp.value = spline;

        spline.load("https://prod.spline.design/arZD9oYwVIhDCJdl/scene.splinecode").then(() => {
            const object = spline.findObjectByName("low-poly_potato");
            const offset = 100;

            if (!object) return;
            
            gsap.set(object.position, { x: offset });

            gsap.timeline({
                scrollTrigger: {
                    start: "top top",
                    endTrigger: "#info",
                    end: "bottom bottom",
                    scrub: true,
                    pin: canvas.value
                },
            })
            .to(object.position, { x: -offset })
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
            .to(object.position, { x: offset })
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
            .to(object.position, { x: -offset })
            .to(object.rotation, {  x:1, z: 2  }, 0);
        });
    }

    function destroySpline() {
        if (splineApp.value) {
            splineApp.value.dispose();
            splineApp.value = null;
        }
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        ScrollTrigger.clearMatchMedia();
        gsap.globalTimeline.clear();
    }

    const handleResize = () => {
        showCanvas.value = window.innerWidth > 1024;
    };

    watch(showCanvas, (newValue, oldValue) => {
        if (newValue === oldValue) return;

        if (newValue) {
            nextTick(() => initSpline());
        } else {
            destroySpline();
        }
    });
    
    onMounted(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
    });

    onBeforeUnmount(() => {
        destroySpline();
        window.removeEventListener("resize", handleResize);
    });
</script>