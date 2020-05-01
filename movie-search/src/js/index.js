import '../css/style.css';
import '../css/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import getMovieData from './API/getMovieData';
import updateSwiper from './swiper/updateSwiper';
import swiper from './swiper/createSwiper';
import search from './search';


updateSwiper('clean');
search();
document.querySelector('.input-area').focus();


document.querySelector('.d1 form').addEventListener('change', () => {
  store.searchText = document.querySelector('form input').value;
});


document.querySelector('.swiper-button-next').addEventListener('click', async () => {
  if (!store.isSearch) {
    if (swiper.activeIndex === (swiper.slides.length-10)) {
      store.dataBase = [];
      store.currentPage += 1;
      await getMovieData(store.searchText, store.currentPage);
      await updateSwiper();
    }
    
  }
  // console.log(swiper.activeIndex);
  // console.log(swiper.slides.length);
})



