
/** KAKAO REST KEY*/
const SUBWAY_URL = 'http://apis.data.go.kr/1613000/SubwayInfoService/getKwrdFndSubwaySttnList?';
const SUBWAY_REST_KEY = 'FBNGXh7WiDx75giQGr3STbhDglMlW0OCQwfrIFk9H2P4uC/j9oEB8q37tRxpWHaZRbbEXCWO5vehlXTNzzlHCQ==';

const CULTURE_URL = 'http://openapi.seoul.go.kr:8088/';
const CULTURE_REST_KEY = '596d734a65646c7333367749686247';

const KAKAO_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';
const KAKAO_REST_KEY = 'KakaoAK 0ec224f87893bd9a115d82797a7bc8b6';
/**
 * 사용하고자 하는 API  KEY 가져 오는 함수 
 */
function getApiKey(key) {
    let KeyValue = "";
    if(key === "CULTURE"){
        KeyValue = CULTURE_REST_KEY;
    } else if(key === "SUBWAY"){
        KeyValue = SUBWAY_REST_KEY;
    } else if(key === "KAKAO_LOCAL"){
        KeyValue = KAKAO_REST_KEY;
    }
    return KeyValue;
}
/** 
 * API URL을 가져 오는 함수 
 * parameter key 값을 이용하여 각 API의 URL을 리턴
*/
function getApiUrl(urlName) {
    let url = "";
    if(urlName === "CULTURE"){
        url = CULTURE_URL;
    } else if(urlName === "SUBWAY"){
        url = SUBWAY_URL;
    } else if(urlName === "KAKAO_LOCAL"){
        url = KAKAO_URL;
    }
    return url;
}
/** 
 * API URL을 가져 오는 함수 
 * parameter api 값을 이용하여 각 API의 URL을 리턴
 * parameter start 값을 이용하여 CultureAPI의 request의 Start_INDEX지정
 * parameter end 값을 이용하여 CultureAPI의 request의 END_INDEX지정
 * parameter data 값을 이용하여 검색어 지정(cultural -> codename, subway -> station name, kakao_local -> query)
 * )
*/
async function getApiData(api,start,end,data){  
    let json = null;    // api json을 받음 변수 최종 return 값 
    let ApiData = null; // api json을 받을 변수 

    const ApiUrl = getApiUrl(api);      // 매개변수 api를 이용하여 사용하고자 하는 API URL 받아 오기
    const ApiKey = getApiKey(api);      // 매개변수 api를 이용하여 사용하고자 하는 API KEY 받아오기

    if(api === "CULTURE"){
        try{
            /** 매개변수 data를 이용하여 codename(행사 분류) 검색 */
            ApiData = await axios.get(`${ApiUrl}` + `${ApiKey}`+'/json/culturalEventInfo/'+`${start}`+'/'+ `${end}`+ '/' + data);                
            json = ApiData.data.culturalEventInfo.row;          // 전달받은 json 파일 저장
        }catch(e){
            console.error(e);
            alert('요청을 처리하는데 실패했습니다.');
            return;
        } 
    } else if(api ==="SUBWAY"){
        try{
            ApiData = await axios.get(`${ApiUrl}`,{
                params : {
                    serviceKey : `${ApiKey}`,
                    subwayStationName : data,       /** 검색하고자 하는 지하철 역명 */
                    numOfRows : 10,
                    pageNo : 1,
                    _type : 'json',
                },
                headers : {
                },
            });
            json = ApiData.data.response.body.items.item;
        } catch(e){
            console.error(e);
            alert('요청을 처리하는데 실패했습니다.');
            return;
        } 
        
    } else if (api ==='KAKAO_LOCAL'){
        try{
            ApiData = await axios.get(`${ApiUrl}`,{
                params : {
                    query : data,           /** 키워드 검색의 질의어 */
                },
                headers : {
                    Authorization :  `${ApiKey}`,
                },
            }); 
            json = ApiData.data.documents;
        }catch(e){
            console.error(e);
            alert('요청을 처리하는데 실패했습니다.');
            return;
        } 
    }
        return json;
}

export {getApiData};