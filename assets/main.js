function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}

function imagesScroller(){
  var images = document.querySelectorAll('.eh-image_cover');
  document.addEventListener('scroll', function(){
    for(i = 0; i < images.length; i++ ){
      if(elementInViewport(images[i])){
        console.log('true');
        images[i].classList.add('inview');
      }else {
        console.log('false');
        images[i].classList.remove('inview');
      }
    }
  })
}

function init(){
  console.log('init', 'v1.1');
  imagesScroller();
} init();
