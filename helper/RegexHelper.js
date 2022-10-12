import {BadRequestException} from './ExceptionHelper.js';
/**
 * 정규표현식을 기반으로 입력값에 대한 유효성 검사를 수행하는 클래스 
 * HTML 문서에서 사용하기 위해 input field에 대한 입력값을 검사한다.
 */
class RegexHelper {
    static #current = null;
    
    static getInstance(){
        if(RegexHelper.#current === null){
            RegexHelper.#current = new RegexHelper();
        }
        return RegexHelper.#current;
    }

    /**
     * 값의 존재 여부를 검사한다.
     * @param {HTMLElement} field 검사할 대상에 대한 <input> 요소의 dom객체
     * @param {string} msg  값이 없을 경우 표시할 메시지 내용
     */

    value(field,msg){
        const content = field.value;

        if(content === undefined || content === null || (typeof content === 'string' && content.trim().length === 0)){
            throw new BadRequestException(msg,field);
        }
        return true;
    }
    /**
     * 입력값이 지정된 글자수를 초과했는지 검사한다.
     * @param {HTMLElement} field 검사할 대상에 대한 <INPUT>요소의 DOM 객체
     * @param {int} len 최대 글자수
     * @param {string} msg 값이 없을 경우 표시될 메시지
     */
    maxLength(field,len,msg) {
        this.value(field,msg);

        const content = field.value;

        if(content.trim().length > len){
            throw new BadRequestException(msg, field);
        }
        return true;
    }
    /**
     * 입력값이 지정된 글자수를 미만인지 검사한다.
     * @param {HTMLElement} field 검사할 대상에 대한 <INPUT>요소의 DOM 객체
     * @param {int} len 최대 글자수
     * @param {string} msg 값이 없을 경우 표시될 메시지
     */
    minLength(field,len,msg) {
        this.value(field,msg);

        let content = field.value;

        if(content.trim().length < len){
            throw new BadRequestException(msg,field);
        }
        return true;
    }
    /**
     * 두 값이 동일한지 검사한다.
     * @param {string} origin 원본에 대한 <input> 요소의 DOM 객체 
     * @param {string} compare 검사대상
     * @param {string} msg 검사에 실패할 경우 표시할 메시지
     */
    compareTo(origin,compare,msg) {
        this.value(origin,msg);
        this.value(compare,msg);

        var src = origin.value.trim();    // 원본값을 가져온다. 
        var dsc = compare.value.trim();   //  비교할 값을 가져온다.

        if(src!= dsc){
            throw new BadRequestException(msg);
        }
        return true;        // 성공했음을 리턴
    }
    /**
     * 라디오나 체크박스가 선택된 항목인지 확인한다.
     * @param {string} msg  검사에 실패할 경우 표시할 메시지
     * @param  {HTMLElement}   field   검사할 CheckBox에 대한 컬랙션
     * 
     */
     check(field,msg){
        const checkedItem = Array.from(field).filter( (v,i) => v.checked);

        if(checkedItem.length === 0){
            throw new BadRequestException(msg,field[0]);
        }
    }
    /**
     * 라디오나 체크박스가 선택된 항목인지 확인한다.
     * @param {string} msg  검사에 실패할 경우 표시할 메시지
     * @param  {HTMLElement}   field   검사할 CheckBox에 대한 컬랙션
     * 
     */
    checkMin(field,len,msg){
        const checkedItem = Array.from(field).filter( (v,i) => v.checked);

        if(checkedItem.length < len){
            throw new BadRequestException(msg,field[0]);
        }
    }
    /**
     * 라디오나 체크박스의 최대 선택 갯수를 제한한다. 
     * @param  {NodeList}   field   검사할 CheckBox에 대한 컬랙션    
     * @param {string} msg  검사에 실패할 경우 표시할 메시지
     * 
     */
     checkMax(field,len,msg){
        const checkedItem = Array.from(field).filter( (v,i) => v.checked);
        if(checkedItem.length > len){
            throw new BadRequestException(msg,field[0]);
        }
    }
    /**
     *
     * 입력값이 정규표현식을 충족하는지 검사한다.
     * @param {HTMLElement} field 검사할 대상에 대한 <INPUT>요소의 DOM 객체
     * @param {string} msg 표시할 메시지
     * @param {object} regexExpr 검사할 정규표현식
     */
    field(field, msg, regexExpr) {
        this.value(field, msg);
        //입력값에 대한 정규표현식 검사가 실패라면 ?

        if(!regexExpr.test(field.value.trim())){
            throw new BadRequestException(msg);
        }
        return true;
    }
    /**
     * 숫자로만 이루어 졌는지 검사하기 위해 field()를 간접적으로 호출한다. 
     * @param {HTMLElement} field 검사할 대상에 대한 <INPUT>요소의 DOM 객체
     * @param {string} msg 표시할 메시지
     */
    num(field, msg) {
        return this.field(field, msg, /^[0-9]*$/);
    }
    /**
     * 영문으로만 이루어 졌는지 검사하기 위해 field()를 간접적으로 호출한다. 
     * @param {HTMLElement} field 검사할 대상에 대한 <INPUT>요소의 DOM 객체
     * @param {string} msg 표시할 메시지
     */
     eng(field, msg) {
        return this.field(field, msg, /^[a-zA-Z]*$/);
    }
    /**
     * 한글로만 이루어 졌는지 검사하기 위해 field()를 간접적으로 호출한다. 
     * @param {HTMLElement} field 검사할 대상에 대한 <INPUT>요소의 DOM 객체
     * @param {string} msg 표시할 메시지
     */
    kor(field, msg) {
        return this.field(field, msg, /^[ㄱ-ㅎ가-힣]*$/);
    }
    /**
     * 영문과 숫자로만 이루어 졌는지 검사하기 위해 field()를 간접적으로 호출한다. 
     * @param {HTMLElement} field 검사할 대상에 대한 <INPUT>요소의 DOM 객체
     * @param {string} msg 표시할 메시지
     */
     engNum(field, msg) {
        return this.field(field, msg, /^[a-zA-Z0-9]*$/);
    }
    /**
     * 한글과 숫자로만 이루어 졌는지 검사하기 위해 field()를 간접적으로 호출한다. 
     * @param {HTMLElement} field 검사할 대상에 대한 <INPUT>요소의 DOM 객체
     * @param {string} msg 표시할 메시지
     */
     korNum(field, msg) {
        return this.field(field, msg, /^[ㄱ-ㅎ가-힣0-9]*$/);
    }
    korEng(field, msg) {
        return this.field(field, msg, /^[ㄱ-ㅎ가-힣a-zA-Z]*$/) || this.field(field, msg, /^[a-zA-Z]*$/);
    }
    /**
     * 이메일 이루어 졌는지 검사하기 위해 field()를 간접적으로 호출한다. 
     * @param {HTMLElement} field 검사할 대상에 대한 <INPUT>요소의 DOM 객체
     * @param {string} msg 표시할 메시지
     */
        email(field, msg) {
        return this.field(field, msg, /^([\w-]+(?:\.[\w-]+)*)@((?:[w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
    }
    /**
     * 핸드폰 번호 형식인지 검사하기 위해 field()를 간접적으로 호출한다. 
     * @param {HTMLElement} field 검사할 대상에 대한 <INPUT>요소의 DOM 객체
     * @param {string} msg 표시할 메시지
     */
    cellphone(field, msg) {
        return this.field(field, msg, /^01(?:0|1[6-9])(?:\d{3}|\d{4})\d{4}$/);
    }
    /** 
     * 집 전화 번호 형식인지 검사하기 위해 field()를 간접적으로 호출한다. 
     * @param {HTMLElement} field 검사할 대상에 대한 <INPUT>요소의 DOM 객체
     * @param {string} msg 표시할 메시지
    */
    telphone(field, msg){
        return this.field(field, msg, /^\d{2,3}\d{3,4}\d{4}$/);
    }    
    /**
     * 핸드폰번호 형식과 집 전화 번호 형식인지 검사하기 위해 field()를 간접적으로 호출한다. 
     * @param {HTMLElement} field 검사할 대상에 대한 <INPUT>요소의 DOM 객체
     * @param {string} msg 조건을 충족하지 않을 경우 표시할 메시지
    */
    phone(field, msg) {
        this.value(field,msg);

        const content = field.value.trim();
        var check1 =    /^01(?:0|1[6-9])(?:\d{3}|\d{4})\d{4}$/;  //핸드폰 형식
        var check2 =    /^\d{2,3}\d{3,4}\d{4}$/;            // 집 전화 형식
        
        //입력값이 없거나, 핸드폰 형식도 아니고 집 전화 형식도 아니라면 
        if(!check1.test(content) && !check2.test(content)){
            throw new BadRequestException(msg);
        }
        return true; 
    }  
}

export default RegexHelper;