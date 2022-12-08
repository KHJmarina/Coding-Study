/* json 데이터 가져오기 */
var requestURL = 'https://api.jsonbin.io/v3/b/616cd47a9548541c29c49b36';
// var request = new XMLHttpRequest();

$.ajax({
  type:"get",
  url: requestURL,
  dataType:"json",
  success: function(data) {
    console.log("ajax 통신 success!");
    bookImg(data); // 화면 구성
    bookLoad(data); // 로컬 북마크 조회
  },
  error:function() {
    console.log("ajax 통신 error!");
  }
})



/* 총 array가 몇개인지 계산. for문으로 북이미지 배치 */
function bookImg(obj) {
  /* 변수 선언 */
  let swiper_wrapper = document.querySelector(".case1 .swiper-wrapper");
  let swiper_wrapper2 = document.querySelector(".case2 .swiper-wrapper");
  var array_cnt = 0;
  
  /* 회전목마 case 1 */
  let arrL = obj.record.length;
  let w_cnt = chartResize(); /* 해상도에 맞춘 로딩 함수 호출 */
  let swiper_cnt = Math.ceil(arrL / w_cnt);
  console.log('json array 갯수 : ' + arrL);
  console.log("한 화면에 몇개씩 나열: " + w_cnt);
  console.log('슬라이드 총 갯수 : ' + swiper_cnt);

  for (let i = 0; i < swiper_cnt; i++) {
    const swiper_slide = document.createElement("ul");
    swiper_slide.className = "swiper-slide";
    swiper_wrapper.append(swiper_slide);
    
    for (var j = 0; j < w_cnt; j++) {
      if (0 < arrL--) {
        swiper_slide.innerHTML += '<li class="book_img"><i class="mdi mdi-bookmark" id = "case1_'
         + obj.record[array_cnt].id + '"></i><div class="book_txt"><h1>'
         + obj.record[array_cnt].title + '</h1><p>'
         + obj.record[array_cnt].description + '</p></div></li>';
        
        // const book_img = document.createElement("li");
        // book_img.className = "book_img";
        // swiper_slide.append(book_img);

        // /* bookmark 아이콘 */
        // const bookmark = document.createElement("i");
        // bookmark.className = "mdi mdi-bookmark";
        // bookmark.id = "case1_" + obj.record[array_cnt].id;
        // book_img.append(bookmark);

        // /* text 구역 */
        // const book_txt = document.createElement("div");
        // book_txt.className = "book_txt";
        // book_img.append(book_txt);

        // /* json 데이터 바인딩 */
        // const myH1 = document.createElement('h1');
        // myH1.textContent = obj.record[array_cnt].title;
        // book_txt.appendChild(myH1);
        
        // const myPara = document.createElement('p');
        // myPara.textContent = obj.record[array_cnt].description;
        // book_txt.appendChild(myPara);

        array_cnt++;
      }
    }
  }
  /* 회전목마 case 2 */
  for (let i = 0; i < 1; i++) {

    const swiper_slide = document.createElement("ul");
    swiper_slide.className = "swiper-slide";
    swiper_wrapper2.append(swiper_slide);

    swiper_slide.innerHTML += '<li class="book_img"><i class="mdi mdi-bookmark" id = "case2_'
    + obj.record[i].id + '"></i><div class="book_txt"><h1>'
    + obj.record[i].title + '</h1><p>'
    + obj.record[i].description + '</p></div></li>';

    // const book_img = document.createElement("li");
    // book_img.className = "book_img";
    // swiper_slide.append(book_img);

    // /* bookmark 아이콘 */
    // const bookmark = document.createElement("i");
    // bookmark.className = "mdi mdi-bookmark";
    // bookmark.id = "case2_" + obj.record[i].id;
    // book_img.append(bookmark);

    // /* text 구역 */
    // const book_txt = document.createElement("div");
    // book_txt.className = "book_txt";
    // book_img.append(book_txt);

    // /* json 데이터 바인딩 */
    // const myH1 = document.createElement('h1');
    // myH1.textContent = obj.record[i].title;
    // book_txt.appendChild(myH1);
    
    // const myPara = document.createElement('p');
    // myPara.textContent = obj.record[i].description;
    // book_txt.appendChild(myPara);
  }
  bookSave(); // 북마크 기능 세팅
}



/* 북마크 localStorage */
function bookSave() {
  var bookmarkSave = document.querySelectorAll(".mdi.mdi-bookmark");
  bookmarkSave.forEach( (mdi) => {
    mdi.addEventListener("click", function(){

      /*  클릭한 ID */
      var contID = this.id;
      /*  키로 부터 데이터 읽기 */
      var readValue = localStorage.getItem("storageKey_"+this.id);
      console.log("스토리지 key: " + "storageKey_"+this.id, "스토리지 value: " + readValue);

      if(readValue == null) {
          /*  키에 값 저장 */
          localStorage.setItem("storageKey_"+this.id, this.id);
          console.log("key 추가: " + localStorage.getItem("storageKey_"+this.id));
          console.log("클릭한 ID: " + contID);
          document.getElementById(contID).style.color = "#FF893C"
      } else {
          /*  키의 값 삭제 */
          localStorage.removeItem("storageKey_"+this.id);
          console.log("key 삭제: " + localStorage.getItem("storageKey_"+this.id));
          console.log("클릭한 ID: " + contID);
          document.getElementById(contID).style.color = "#B2B2B2"
      }
    })
  });
}



/* 윈도우 시작시에 저장되어있는 북마크 로딩 */
function bookLoad(obj) {
  console.log("로컬 저장 갯수: " + localStorage.length);
  /* 스와이프 갯수 계산 */
  let arrL = obj.record.length;
  
  /* case 1 */
  for (let i = 0; i < arrL; i++) {
    /* 키로 부터 데이터 읽기 */
    var readValue1 = localStorage.getItem("storageKey_case1_"+i);

    if(readValue1 != null) {
      document.getElementById("case1_"+i).style.color = "#FF893C"
      console.log("북마크: " + readValue1);
    } else {
      document.getElementById("case1_"+i).style.color = "#B2B2B2"
    }
  }  

  /* case 2 */
  var readValue2 = localStorage.getItem("storageKey_case2_"+0);
  if(readValue2 != null) {
    document.getElementById("case2_"+0).style.color = "#FF893C"
    console.log("북마크: " + readValue2);
  } else {
    document.getElementById("case2_"+0).style.color = "#B2B2B2"
  }
}



/* 해상도 반응형 */
function chartResize() {
  var w = window.innerWidth;
  var w_cnt;
  if(w >= 1024) {
    w_cnt = Math.floor((w - 220) / 246);
    document.querySelector(".container").style.width = w + "px";
    document.querySelector(".case1 .swiper-button-next").style.left = "calc((246px * " + w_cnt + ") + 142px)";
  } else { // 최소 해상도 1024px
    w_cnt = 3;
    document.querySelector(".container").style.width = "1024px";
    document.querySelector(".case1 .swiper-button-next").style.left = "calc((246px * 3) + 142px)";
  }
  return w_cnt;
}