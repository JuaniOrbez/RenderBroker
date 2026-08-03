console.log("RenderBroker iniciado correctamente.");

document.addEventListener("DOMContentLoaded", () => {
    document.body.style.margin = "0";
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.overflow = "hidden";

    const app = document.createElement("div");
    app.id = "app";

    app.innerHTML = `
        <header style="
            height:70px;
            background:#1f2937;
            color:white;
            display:flex;
            align-items:center;
            justify-content:space-between;
            padding:0 24px;
            box-sizing:border-box;
        ">
            <div style="font-size:24px; font-weight:bold;">
                RenderBroker
            </div>

            <div style="display:flex; gap:8px;">
                <button id="zoomOut">−</button>
                <button id="resetView">Restablecer</button>
                <button id="zoomIn">+</button>
            </div>
        </header>

        <main style="
            display:flex;
            height:calc(100vh - 70px);
        ">
            <section id="leftPanel" style="
                width:50%;
                background:#eeeeee;
                border-right:1px solid #ccc;
                position:relative;
                overflow:hidden;
            ">
                <div id="planViewport" style="
                    width:100%;
                    height:100%;
                    position:relative;
                    overflow:hidden;
                    cursor:grab;
                ">
                    <img
                        id="planImage"
                        src="./assets/images/plano.png"
                        alt="Plano del departamento"
                        draggable="false"
                        style="
                            position:absolute;
                            left:50%;
                            top:50%;
                            max-width:none;
                            user-select:none;
                            transform-origin:center center;
                        "
                    >
                </div>
            </section>

            <section id="rightPanel" style="
                flex:1;
                background:#d6d6d6;
                display:flex;
                justify-content:center;
                align-items:center;
            ">
                Vista 3D
            </section>
        </main>
    `;

    document.body.innerHTML = "";
    document.body.appendChild(app);

    const viewport = document.getElementById("planViewport");
    const image = document.getElementById("planImage");

    let scale = 0.7;
    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;
    let startX = 0;
    let startY = 0;

    function updatePlanView() {
        image.style.transform = `
            translate(-50%, -50%)
            translate(${offsetX}px, ${offsetY}px)
            scale(${scale})
        `;
    }

    document.getElementById("zoomIn").addEventListener("click", () => {
        scale = Math.min(scale + 0.1, 3);
        updatePlanView();
    });

    document.getElementById("zoomOut").addEventListener("click", () => {
        scale = Math.max(scale - 0.1, 0.2);
        updatePlanView();
    });

    document.getElementById("resetView").addEventListener("click", () => {
        scale = 0.7;
        offsetX = 0;
        offsetY = 0;
        updatePlanView();
    });

    viewport.addEventListener("mousedown", (event) => {
        dragging = true;
        viewport.style.cursor = "grabbing";
        startX = event.clientX - offsetX;
        startY = event.clientY - offsetY;
    });

    window.addEventListener("mousemove", (event) => {
        if (!dragging) return;

        offsetX = event.clientX - startX;
        offsetY = event.clientY - startY;
        updatePlanView();
    });

    window.addEventListener("mouseup", () => {
        dragging = false;
        viewport.style.cursor = "grab";
    });

    viewport.addEventListener(
        "wheel",
        (event) => {
            event.preventDefault();

            if (event.deltaY < 0) {
                scale = Math.min(scale + 0.08, 3);
            } else {
                scale = Math.max(scale - 0.08, 0.2);
            }

            updatePlanView();
        },
        { passive: false }
    );

    image.addEventListener("load", updatePlanView);
});