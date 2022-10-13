
/** KAKAO REST KEY*/
const SUBWAY_URL = 'http://apis.data.go.kr/1613000/SubwayInfoService/getKwrdFndSubwaySttnList?';
const SUBWAY_REST_KEY = 'FBNGXh7WiDx75giQGr3STbhDglMlW0OCQwfrIFk9H2P4uC/j9oEB8q37tRxpWHaZRbbEXCWO5vehlXTNzzlHCQ==';

const CULTURE_URL = 'http://openapi.seoul.go.kr:8088/';
const CULTURE_REST_KEY = '596d734a65646c7333367749686247';

const KAKAO_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';
const KAKAO_REST_KEY = 'KakaoAK 0ec224f87893bd9a115d82797a7bc8b6';

/** 
 * API KEY를 가져 오는 함수 
 * parameter key 값을 이용하여 각 API의 KEY를 리턴
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

    const API_URL = getApiUrl(api);         // 매개변수를 통해서 함수를 통해서 API URL 정보 획득
    const API_KEY = getApiKey(api);         // 매개변수를 통해서 함수를 통해서 API 접근 KEY 정보 획득

    if(api === "CULTURE"){
        try{
            /** 
             * 문화축제 API GET : url/key(필수)/type(필수)/service(필수)/start_index(필수)/end_index(필수)/codename/title
             * key : 발급 받은 인증키 
             * type : 요청파일 타입 XML or json
             * service : 서비스명(culturalEventinfo)
             * start_index : 요청 시작위치
             * end_index : 요청종료위치
             * codename : 행사 분류
             * title : 공연/행사명
              */
            ApiData = await axios.get( `${API_URL}` + `${API_KEY}`+'/json/culturalEventInfo/'+`${start}`+'/'+ `${end}`+ '/' + data);                
            json = ApiData.data.culturalEventInfo.row;          // 전달받은 정보를 리턴하기 위해 변수에 담음 
        }catch(e){
            console.error(e);
            alert('요청을 처리하는데 실패했습니다.');
            return;
        } 
    } else if(api ==="SUBWAY"){
        try{
            /** 지하철 API GET : url/key(필수)/numOfRows/pageNo/_type/subwayStationName */
            ApiData = await axios.get(`${API_URL}`,{
                params : {
                    serviceKey : `${API_KEY}`,/**인증 키  */
                    subwayStationName : data,/**지하철 역명 검색 */
                    numOfRows : 10,/**한 페이지 결과 수 */
                    pageNo : 1,/**페이지 번호 */
                    _type : 'json',/**지하철 역명 */
                },
            });
            json = ApiData.data.response.body.items.item;
        }
        catch(e){
            console.error(e);
            alert('요청을 처리하는데 실패했습니다.');
            return;
        } 
    } else if (api ==='KAKAO_LOCAL'){
        try{
              /** KAKAO LOCAL API GET : url/query(필수)/category/x/y/radius/rect/page/size/sort */
            ApiData = await axios.get(`${API_URL}`,{
                params : {
                    query : data, /**키워드 검색을 원하는 질의어 */
                },
                headers : {
                    Authorization : `${API_KEY}`, /** 발급 받은 인증키  */
                },
            });        
            json = ApiData.data.documents;
        }
        catch(e){
            console.error(e);
            alert('요청을 처리하는데 실패했습니다.');
            return;
        } 
    }
     return json;
}
export {getApiData};