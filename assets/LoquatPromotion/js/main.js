/* ============================================================
   冕宁枇杷 · 产地助农宣传站
   轻量交互脚本（展示类）
   - 移动端导航折叠切换
   - 页面滚动渐入动画
   - 留言表单前端校验与提交反馈
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
   留言表单提交处理
   本站为信息展示型静态网站，表单做前端非空校验，
   校验通过后给出友好反馈提示，不进行真实提交。
   ============================================================ */
function submitEnquiry(form) {
  // 非空校验（由 form 的 required 完成）
  if (!form) return false;
  if (typeof form.reportValidity === 'function' && form.reportValidity() === false) {
    return false; // 校验未通过，浏览器已提示，阻止提交
  }
  // 校验通过，给出友好反馈
  alert('感谢您的留言，我们会尽快与您联系！');
  form.reset();
  return false; // 阻止默认表单提交
}
