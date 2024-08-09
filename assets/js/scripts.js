// cập nhật vị trí sidebar
const contents = document.querySelectorAll("main h2 , main h3");
const sidebarLinks = document.querySelectorAll(".sidebar .list li a");
const sidebarBeforeLinks = document.querySelectorAll(".sidebar .list li a::before");

// khi người dùng cuộn trang hàm này sẽ được dùng
window.addEventListener("scroll", function () {
    let closestHeading = null;
    // Infinity: số vô cực lớn hơn tất cả
    let closestDistance = Infinity;
    contents.forEach((content) => {
        const rect = content.getBoundingClientRect();
        // Math.abs là trị tuyệt đối
        // rect.top: cạnh trên cùng của phần tuẻ đến cạnh trên của cửa sổ trình duyệt
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
            } else {
                link.classList.remove("active");
            }
        });
    }
});

// ẩn sidebar
const contentList = document.querySelector(".content-list");
const sidebar = document.querySelector(".sidebar");
let sidebarShown = false;

window.addEventListener("scroll", function () {
    // offsetTop: khoảng cách cạnh trên cùng của một phần tử so với cạnh trên cùng của phần tử chứa nó (body)
    const contentListBottom = contentList.offsetTop + contentList.offsetHeight;
    // pageYOffset thay bằng scrollY
    if (window.scrollY > contentListBottom && !sidebarShown) {
        // Hiện dần ra
        sidebar.style.transform = 'translateX(0)';
        sidebar.style.opacity = '1';
        sidebar.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-in';
        sidebarShown = true;
    } else if (window.scrollY <= contentListBottom && sidebarShown) {
        // Di chuyển ra khi ẩn
        sidebar.style.transform = 'translateX(-100%)';
        sidebar.style.opacity = '0';
        sidebar.style.transition = 'transform 0.5s ease-in, opacity 0.5s ease-out';
        sidebarShown = false;
    }
});

// nút copy
document.addEventListener('DOMContentLoaded', (event) => {
    // Áp dụng Prism highlighting
    Prism.highlightAll();
  
    // Thêm chức năng copy
    document.querySelectorAll('.copy-button').forEach(button => {
      button.addEventListener('click', () => {
        const codeBlock = button.closest('.code-block');
        const code = codeBlock.querySelector('code').textContent;
        
        navigator.clipboard.writeText(code).then(() => {
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      });
    });
  });