/* ============================================================
   冕宁枇杷 · 产地助农宣传站
   轻量交互脚本（展示类）
   - 移动端导航折叠切换
   - 页面滚动渐入动画
   注：留言表单/后端提交逻辑暂未接入（后端服务预留），
       相关处理函数留空占位，待后续对接 PHP + MySQL。
   ============================================================ */

(function () {
  // 移动端导航切换
  const toggle = document.querySelector('.mobile-toggle');
  const navList = document.querySelector('.nav-list');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      navList.classList.toggle('open');
    });
    // 点击链接后收起菜单
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('open');
      });
    });
  }

  // 滚动渐入动画
  function revealOnScroll() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    items.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        el.classList.add('show');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);
  revealOnScroll();
})();

/* ============================================================
   后端预留：留言表单提交处理（占位，暂不实现）
   后续对接方案：PHP 接收 POST → 写入 MySQL 数据库
   ============================================================ */
function submitEnquiry(form) {
  // 后端服务暂未接入，此处仅作占位提示
  // 待后端就绪后在此实现：校验 + AJAX 提交 + 成功后弹窗反馈
  return false; // 阻止默认表单提交（静态展示阶段）
}
