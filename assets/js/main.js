import {getApiData} from './api2.js';
        

// 분류할 데이터 객체
const kindData = {
    'festival' : [],
    'concert' : [],
    'exhibit' : [],
    'edu' : [],
    'el' : [],
};

//데이터 받아오기

const data = await getApiData("CULTURE",1,60,""); // parmeta 1,2(문화축제 더보기에서 시작 점),3(끝점),4(codename별로 새롭게 검색 가능 ex 연극 빈 곳으로 놔두면 전체 순번 )
console.log(data);


//데이터 종류별로 분류하기
data.forEach((v, i) => {
    
    if(v.CODENAME.includes('축제')) {
        kindData['festival'].push(v);
    } else if(v.CODENAME == '기타') {
        kindData['el'].push(v);
    } else if(v.CODENAME == '문화교양/강좌') {
        kindData['exhibit'].push(v);
    } else if(v.CODENAME == '전시/미술') {
        kindData['edu'].push(v);
    } else {
        kindData['concert'].push(v);
    }
})

console.log(kindData);


// nav 버튼에 active 클래스이름 주기

const setActiveGnb = (kind) => {

    if (kind) {
        document.querySelectorAll('.gnb a').forEach((v, i) => {
            if(v.dataset.kind == kind) {
                console.log('v.dataset.kind',v.dataset.kind);
                v.classList.add('active');
            } else {
                v.classList.remove('active');
            }
        })
    } else {
        document.querySelector("[data-kind='festival']").classList.add('active');
    }

}


//쿼리 값 받아오기
const query = new URLSearchParams(location.search);
const kind = query.get('kind');
// console.log('kind', kind);

//현재 쿼리값에 맞는 버튼 활성화
setActiveGnb(kind);

//데이터에서 쿼리스트링에 맞는 데이터 가져오기
const currentList = kindData[`${kind}`];
// console.log('currentList:',currentList);

const container = document.querySelector('.main_container');

if(!currentList) {
    // 축제 데이터로 초기화
    kindData['festival'].some((v, i) => {
        if( i == 3 ) {
            return true;
        }
         // dom 요소 생성
        makeDom(v, container);
    })
} else {
    //선택한 쿼리스트링에 맞는 데이터로 배열 돌리기
    currentList.some((v, i) => {

        //3개만 노출되도록 설정
        if( i == 3 ) {
            return true;
        }
    
        // dom 요소 생성
        makeDom(v, container);
        
    })
}

//더보기 버튼 클릭 이벤트

document.querySelector('.btn_more').addEventListener('click', (e) => {
    console.log('더보기 버튼')
    //원래 노출되던 3개 삭제
    document.querySelector('.main_container').remove();

    //새로운 컨테이너 만들고 그 안에 다시 dom 요소 생성
    const con = document.querySelector('.con');
    const mainCon = document.createElement('div');
    mainCon.classList.add('main_container');
    con.appendChild(mainCon);

    currentList.some((v, i) => {
        makeDom(v, mainCon);   
    })

    e.currentTarget.style.display = 'none';

    document.querySelector('.btn_fold').style.display = 'block';

});

document.querySelector('.btn_fold').addEventListener('click', (e) => {
    console.log("fold")
    //원래 노출되던 3개 삭제
    document.querySelector('.main_container').remove();

    //새로운 컨테이너 만들고 그 안에 다시 dom 요소 생성
    const con = document.querySelector('.con');
    const mainCon = document.createElement('div');
    mainCon.classList.add('main_container');
    con.appendChild(mainCon);

    currentList.some((v, i) => {
         //3개만 노출되도록 설정
         if( i == 3 ) {
            return true;
        }
        
        makeDom(v, mainCon);   
    })

    e.currentTarget.style.display = 'none';

    document.querySelector('.btn_more').style.display = 'block';

})



//html dom 생성하는 함수
function makeDom(v, con) {
    let idx;
    
    const item = document.createElement('div');
    item.classList.add('item');

    const a = document.createElement('a');
    
    //이미지 클릭하면 쿼리스트링으로 인덱스 번호 보내기
    a.addEventListener('click', (e) => {
        const target = e.currentTarget;
        const title = target.querySelector('h2').innerHTML;
        data.forEach((v, i) => {
            if(v.TITLE == title) {
                // console.log(v.TITLE, i)
                idx = i;
            }
        })
        // console.log(idx);
        a.setAttribute('href', `./sub.html?${idx}`);
    })

    const img = document.createElement('img');
    img.setAttribute('src', `${v.MAIN_IMG}`);
    a.appendChild(img);

    const text = document.createElement('div');
    text.classList.add('item_text');
    
    const h2 = document.createElement('h2');
    h2.innerHTML = v.TITLE;
    
    const p1 = document.createElement('p');
    p1.innerHTML = v.DATE;

    const p2 = document.createElement('p');
    p2.innerHTML = v.PLACE;
    
    text.appendChild(h2);
    text.appendChild(p1);
    text.appendChild(p2);

    a.appendChild(text);

    const btnBox = document.createElement('div');
    btnBox.classList.add('btn_box');

    const btn1 = document.createElement('button');
    btn1.setAttribute('type', 'button');
    btn1.innerHTML = '지도';
    btnBox.appendChild(btn1);
    
    const btn2 = document.createElement('button');
    btn2.setAttribute('type', 'button');
    btn2.innerHTML = '길찾기';
    btnBox.appendChild(btn2);
    
    item.appendChild(a);
    item.appendChild(btnBox);

    con.appendChild(item);
}














