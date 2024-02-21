const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get('albumId');

//fetch album data
async function getAlbumData(){
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    const photos = await response.json()
    console.log(photos);
    return photos;
  }

  function lottieAnimation() {
    const animationContainer1 = document.getElementById('lottie-animation1');
    const animationContainer2 = document.getElementById('lottie-animation2');
    const animData1 = {
      container: animationContainer1,
      renderer: 'svg',
      loop: true,
      autoplay: true, 
      path: 'waveAnimation.json', 
    };
    const anim1 = bodymovin.loadAnimation(animData1);
    const animData2 = {
      container: animationContainer2,
      renderer: 'svg',
      loop: true, 
      autoplay: true, 
      path: 'waveAnimation.json',
    };
    const anim2 = bodymovin.loadAnimation(animData2);
  }


  //display album data
  async function displayAlbum(photos){
  const albumGrid= document.getElementById('albumGrid');
  albumGrid.innerHTML='';

  console.log('hi');

  for (const photo of photos) {
    if (parseInt(photo.albumId) == parseInt(albumId)) {
        const div = document.createElement('div');
        div.className = 'w-full';
        div.innerHTML = `
            <div>
                <div><img class="w-48 h-48 my-4 mx-12"src="${photo.url}" alt="Photo"></div>
                <!-- Repeat the above <div> for additional images in the same row -->
            </div>
        `;

        albumGrid.appendChild(div);
    }
}
}

document.addEventListener('DOMContentLoaded', () => {
  getAlbumData().then(displayAlbum);
  lottieAnimation(); 
  })