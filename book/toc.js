// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="About.html"><strong aria-hidden="true">1.</strong> 关于</a></li><li class="chapter-item expanded "><a href="Introduction.html"><strong aria-hidden="true">2.</strong> 引言：AI 编程是新的读写能力</a></li><li class="chapter-item expanded "><a href="Chapter1.html"><strong aria-hidden="true">3.</strong> 第1章： 职业发展的三个步骤</a></li><li class="chapter-item expanded "><a href="Chapter2.html"><strong aria-hidden="true">4.</strong> 第2章：学习技术技能，打造有前景的 AI 职业生涯</a></li><li class="chapter-item expanded "><a href="Chapter3.html"><strong aria-hidden="true">5.</strong> 第3章：为了在 AI 领域找工作，你需要学习数学吗？</a></li><li class="chapter-item expanded "><a href="Chapter4.html"><strong aria-hidden="true">6.</strong> 第4章：规划成功的 AI 项目</a></li><li class="chapter-item expanded "><a href="Chapter5.html"><strong aria-hidden="true">7.</strong> 第5章：寻找与你职业目标相辅相成的项目</a></li><li class="chapter-item expanded "><a href="Chapter6.html"><strong aria-hidden="true">8.</strong> 第6章：构建展示技能进阶的项目组合</a></li><li class="chapter-item expanded "><a href="Chapter7.html"><strong aria-hidden="true">9.</strong> 第7章：开启 AI 求职之旅的简单框架</a></li><li class="chapter-item expanded "><a href="Chapter8.html"><strong aria-hidden="true">10.</strong> 第8章：利用信息访谈找到合适的工作</a></li><li class="chapter-item expanded "><a href="Chapter9.html"><strong aria-hidden="true">11.</strong> 第9章：为你找到合适的 AI 工作</a></li><li class="chapter-item expanded "><a href="Chapter10.html"><strong aria-hidden="true">12.</strong> 第10章：在 AI 领域打造职业生涯的关键要素</a></li><li class="chapter-item expanded "><a href="Chapter11.html"><strong aria-hidden="true">13.</strong> 第11章：克服冒名顶替综合征</a></li><li class="chapter-item expanded "><a href="Final_Thoughts.html"><strong aria-hidden="true">14.</strong> 结语：珍惜每一天</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
