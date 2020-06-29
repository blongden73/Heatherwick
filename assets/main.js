var homepage = document.querySelectorAll('.eh-image_cover');
var post = document.querySelectorAll('.intro_image');

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

function color(selector, parent){
  const colorThief = new ColorThief();
    const imgs = document.querySelectorAll(selector);
    // Make sure image is finished loading
    //loop over images
    for(i = 0; i < imgs.length; i++){
      //wait for colours to load
      if (imgs[i].complete) {
        //colourTheif objec
        var colours = colorThief.getColor(imgs[i]);
        console.log('home', homepage);
        //check if homepage or post
        if(homepage.length >= 1) {
          console.log('home', homepage);
          //get parent
          var parent = imgs[i].parentNode;
          //colours in string
          var colourSring = colours.toString();
          //set parent background colour
          parent.style.backgroundColor = 'rgba(' + colourSring + ',1)';
        } else {
          console.log('else');
          //checks the brightness of the colour
          colourCheck = colours[0] + colours[1] + colours[2];
          //get parent
          parent = document.querySelector(parent);
          //colours to string
          var colourSring = colours.toString();
          console.log(colourCheck, 'check');
          //sets background colour
          parent.style.backgroundColor = 'rgba(' + colourSring + ',0.8)';
          //sets dark classs if the colour is dark
          if(colourCheck <= 270) {
            parent.classList.add('darkColour');
          }
        }
      } else {
        imgs[i].addEventListener('load', function() {
          colorThief.getColor(imgs[i]);
          console.log('loaded else')
        });
      }
    }
}

function menu(){
  var menuButton = document.querySelector('.js-nav-open');
  var navOptions = document.querySelector('.eh-nav');
  var header = document.querySelector('header');
  header.addEventListener('mouseover', function(){
    this.classList.add('open');
    navOptions.classList.add('open');
  });
  header.addEventListener('mouseleave', function(){
    setTimeout(function(){
      header.classList.remove('open');
      navOptions.classList.remove('open');
    }, 2000);
  });
}

function carousel(){
  var wrapper = document.querySelector('.eh-post__wrapper');
  var carousel = document.querySelectorAll('.eh-carousel');
  var pager = document.querySelectorAll('.eh-image_number');
  pager[0].classList.add('current');
  carousel[0].classList.add('display');
  wrapper.addEventListener('click', function(){
    console.log('click');
    var current = document.querySelector('.eh-carousel.display');
    var next = document.querySelector('.display + .eh-carousel');
    var pageCurrent = document.querySelector('.eh-image_number.current');
    var pageNext = document.querySelector('.current + .eh-image_number');
    current.classList.remove('display');
    pageCurrent.classList.remove('current');
    if(next){
      next.classList.add('display');
      pageNext.classList.add('current');
    } else {
      next = carousel[0];
      pageNext = pager[0];
      next.classList.add('display');
      pageNext.classList.add('current');
    }
    console.log(next);
  });
}


function init(){
  console.log('init', 'v2');
  imagesScroller();
  if(homepage) {
    menu();
  }
  if(post) {
    carousel();
  }
} init();
