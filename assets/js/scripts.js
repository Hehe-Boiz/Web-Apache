// cập nhật vị trí sidebar
const contents = document.querySelectorAll("main h2 , main h3");
const sidebarLinks = document.querySelectorAll(".sidebar .list li a");
const sidebarBeforeLinks = document.querySelectorAll(
    ".sidebar .list li a::before"
);

// khi người dùng cuộn trang hàm này sẽ được dùng
window.addEventListener("scroll", function () {
    let closestHeading = null;
    // Infinity: số vô cực lớn hơn tất cả
    let closestDistance = Infinity;
    contents.forEach((content) => {
        const rect = content.getBoundingClientRect();
        // Math.abs là trị tuyệt đối
        // rect.top: cạnh trên cùng của phần tử đến cạnh trên của cửa sổ trình duyệt
        const distance = Math.abs(rect.top);
        // kiếm tiêu đề có khoảng cách gần đỉnh trình duyệt nhất
        if (distance < closestDistance) {
            closestHeading = content;
            closestDistance = distance;
        }
    });
    if (closestHeading) {
        const currentActiveLink = document.querySelector(
            `.sidebar .list li a[href="#${closestHeading.id}"]`
        );
        sidebarLinks.forEach((link) => {
            if (link === currentActiveLink) {
                link.classList.add("active");
                // Tự động cuộn sidebar đến mục đang active
                const sidebar = document.querySelector(".sidebar");
                const linkRect = link.getBoundingClientRect();
                const sidebarRect = sidebar.getBoundingClientRect();

                if (
                    linkRect.top < sidebarRect.top ||
                    linkRect.bottom > sidebarRect.bottom
                ) {
                    link.scrollIntoView({
                        behavior: "auto",
                        block: "nearest",
                        inline: "start",
                    });
                }
            } else {
                link.classList.remove("active");
            }
        });
    }
});

// // ẩn sidebar
const contentList = document.querySelector(".content-list");
const sidebar = document.querySelector(".sidebar");
const header = document.querySelector("header");
let sidebarShown = false;

// để có thể bắt một lúc 2 sự kiện
function updateSidebar() {
    // getBoundingClientRect().top: khoảng cách từ đỉnh của phần tử đến đỉnh của viewport
    const contentListBottom =
        contentList.getBoundingClientRect().top +
        window.scrollY +
        contentList.offsetHeight;
    // pageYOffset thay bằng scrollY
    console.log(
        `contentList.getBoundingClientRect().top ${
            contentList.getBoundingClientRect().top
        }`
    );
    console.log(`window.scrollY ${window.scrollY}`);
    console.log(`contentList.offsetHeight ${contentList.offsetHeight}`);
    console.log(`contentListBottom ${contentListBottom}`);
    if (
        window.scrollY + header.offsetHeight > contentListBottom &&
        !sidebarShown
    ) {
        // Hiện dần ra
        sidebar.style.transform = "translateX(0)";
        sidebar.style.opacity = "1";
        sidebar.style.transition =
            "transform 0.5s ease-out, opacity 0.5s ease-in";
        sidebarShown = true;
    } else if (
        window.scrollY + header.offsetHeight <= contentListBottom &&
        sidebarShown
    ) {
        // Di chuyển ra khi ẩn
        sidebar.style.transform = "translateX(-100%)";
        sidebar.style.opacity = "0";
        sidebar.style.transition =
            "transform 0.5s ease-in, opacity 0.5s ease-out";
        sidebarShown = false;
    }
}

// Gọi updateSidebar khi cuộn
window.addEventListener("scroll", updateSidebar);

// Gọi updateSidebar khi thay đổi kích thước cửa sổ
window.addEventListener("resize", updateSidebar);

// nút copy
document.addEventListener("DOMContentLoaded", (event) => {
    // Áp dụng Prism highlighting
    Prism.highlightAll();

    // Thêm chức năng copy
    document.querySelectorAll(".copy-button").forEach((button) => {
        button.addEventListener("click", () => {
            const codeBlock = button.closest(".code-block");
            const code = codeBlock.querySelector("code").textContent;

            navigator.clipboard
                .writeText(code)
                .then(() => {
                    button.textContent = "Copied!";
                    setTimeout(() => {
                        button.textContent = "Copy";
                    }, 2000);
                })
                .catch((err) => {
                    console.error("Failed to copy: ", err);
                });
        });
    });
});

//Tránh khi ấn a cho bị nav che
document.querySelectorAll(".list li a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = document.querySelector("nav").offsetHeight;
            const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });

            // Thêm class để áp dụng scroll-margin-top
            targetElement.classList.add("scrolled-to");
        }
    });
});
