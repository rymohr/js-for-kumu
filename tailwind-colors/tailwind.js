let colors = [];

let colorNodes = document.querySelectorAll('.rounded.overflow-hidden');

colorNodes.forEach(node => {
  let obj = {};

  obj.name = node.querySelector('.uppercase.mb-6').textContent.toLowerCase();
  obj.shades = [];

  let shadeNodes = node.querySelectorAll('.px-6.py-3.text-sm.font-semibold.flex.justify-between');

  shadeNodes.forEach(n => {
    let shade = n.querySelector('span').textContent.toLowerCase(),
        hex = n.querySelector('span:last-of-type').textContent;

    obj.shades.push({ 'shade': shade, 'hex': hex });
  });

  colors.push(obj);
});
