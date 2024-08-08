const contents = document.querySelectorAll("main h2 , main h3");
const sidebarLinks = document.querySelectorAll(".sidebar .list li a");

// khi người dùng cuộn trang hàm này sẽ được dùng
window.addEventListener("scroll", function () {
    // duyệt qua toàn bộ section
    contents.forEach((content) => {
        // vị trí của thẻ h
        const rect = content.getBoundingClientRect();
        if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
        ) {
            // Tìm link sidebar tương ứng với tiêu đề hiện tại
            const currentLink = document.querySelector(
                `.sidebar .list li a[href="#${content.id}"]`
            ); 
            // Loại bỏ lớp "active" từ tất cả các link
            sidebarLinks.forEach((link) => {
                link.classList.remove("active");
            });

            // Thêm lớp "active" vào link hiện tại
            currentLink.classList.add("active");
        }
    });
});
