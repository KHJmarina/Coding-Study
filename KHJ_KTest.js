/* json 데이터 가져오기 */
var requestURL = 'https://api.jsonbin.io/v3/b/616cd47a9548541c29c49b36';
// var request = new XMLHttpRequest();

$.ajax({
  type:"get",
  url: requestURL,
  dataType:"json",
  success: function(data) {
    console.log("ajax 통신 success!");
    bookImg(data); // 1.화면 구성
    bookLoad(data); // 2.로컬 북마크 조회
    bookSave(); // 3.북마크 기능 세팅
  },
  error:function() {
    console.log("ajax 통신 error!");
  }
})


/* 1. 총 array가 몇개인지 계산. for문으로 북이미지 배치 */
function bookImg(obj) {
  /* json array */
  let arrL = obj.record.length;
  console.log('json array 갯수 : ' + arrL);

  /* 변수 선언 */
  let swiper_wrapper = document.querySelector(".case1 .swiper-wrapper");
  let swiper_wrapper2 = document.querySelector(".case2 .swiper-wrapper");
  let swiper_slide = null;
  let book_img = null;
  let book_txt = null;
  let bookmark = null; //북마크 아이콘
  var array_cnt = 0;

  /* 회전목마 case 1 */
  /* 해상도에 맞춰 로딩 */
  if (matchMedia("screen and (min-width: 1025px)").matches) {
    // 1024px 이상에서 사용할 JavaScript
    let swiper_cnt = Math.ceil(arrL / 6);
    console.log('1920px 슬라이드 갯수 : ' + swiper_cnt);

    for (let i = 0; i < swiper_cnt; i++) {
      swiper_slide = document.createElement("ul");
      swiper_slide.className = "swiper-slide";
      swiper_wrapper.append(swiper_slide);
      
      for (var j = 0; j < 6; j++) {
        if (0 < arrL--) {
          book_img = document.createElement("li");
          book_img.className = "book_img";
          swiper_slide.append(book_img);

          /* bookmark 아이콘 */
          bookmark = document.createElement("i");
          bookmark.className = "mdi mdi-bookmark";
          bookmark.id = "case1_" + obj.record[array_cnt].id;
          book_img.append(bookmark);

          /* text 구역 */
          book_txt = document.createElement("div");
          book_txt.className = "book_txt";
          book_img.append(book_txt);

          /* json 데이터 바인딩 */
          const myH1 = document.createElement('h1');
          myH1.textContent = obj.record[array_cnt].title;
          book_txt.appendChild(myH1);
          
          const myPara = document.createElement('p');
          myPara.textContent = obj.record[array_cnt].description;
          book_txt.appendChild(myPara);

          array_cnt++;
        }
      }
    }

  } else {
    // 1024px 이하에서 사용할 JavaScript
    document.querySelector(".container").style.width = "1024px";
    document.querySelector(".case1 .swiper-button-next").style.left = "calc((246px * 3) + 142px)";

    let swiper_cnt = Math.ceil(arrL / 3);
    console.log('1024px 슬라이드 갯수 : ' + swiper_cnt);

    for (let i = 0; i < swiper_cnt; i++) {
      swiper_slide = document.createElement("ul");
      swiper_slide.className = "swiper-slide";
      swiper_wrapper.append(swiper_slide);
      
      for (var j = 0; j < 3; j++) {
        if (0 < arrL--) {
          book_img = document.createElement("li");
          book_img.className = "book_img";
          swiper_slide.append(book_img);

          /* bookmark 아이콘 */
          bookmark = document.createElement("i");
          bookmark.className = "mdi mdi-bookmark";
          bookmark.id = "case1_" + obj.record[array_cnt].id;
          book_img.append(bookmark);

          /* text 구역 */
          book_txt = document.createElement("div");
          book_txt.className = "book_txt";
          book_img.append(book_txt);

          /* json 데이터 바인딩 */
          const myH1 = document.createElement('h1');
          myH1.textContent = obj.record[array_cnt].title;
          book_txt.appendChild(myH1);
          
          const myPara = document.createElement('p');
          myPara.textContent = obj.record[array_cnt].description;
          book_txt.appendChild(myPara);

          array_cnt++;
        }
      }
    }
  }

  /* 회전목마 case 2 */
  for (let i = 0; i < 1; i++) {

    swiper_slide = document.createElement("ul");
    swiper_slide.className = "swiper-slide";
    swiper_wrapper2.append(swiper_slide);

    book_img = document.createElement("li");
    book_img.className = "book_img";
    swiper_slide.append(book_img);

    /* bookmark 아이콘 */
    bookmark = document.createElement("i");
    bookmark.className = "mdi mdi-bookmark";
    bookmark.id = "case2_" + obj.record[i].id;
    book_img.append(bookmark);

    /* text 구역 */
    book_txt = document.createElement("div");
    book_txt.className = "book_txt";
    book_img.append(book_txt);

    /* json 데이터 바인딩 */
    const myH1 = document.createElement('h1');
    myH1.textContent = obj.record[i].title;
    book_txt.appendChild(myH1);
    
    const myPara = document.createElement('p');
    myPara.textContent = obj.record[i].description;
    book_txt.appendChild(myPara);
  }
}



/* 2. 윈도우 시작시에 저장되어있는 북마크 로딩 */
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



/* 3. 북마크 localStorage */
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
