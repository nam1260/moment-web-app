import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default class kakaoPaymentService { /* 이영현 개인 kakao developers 사용 중 변경 필요. */
    constructor(props) {
        
        this.prepareApirequiredKey = [
            'partner_order_id',
            'partner_user_id',
            'item_name',
            'item_code',
            'quantity',
            'total_amount',
            'tax_free_amount',
            'approval_url',
            'cancel_url',
            'fail_url',
        ];
        /* TODO: 환경 변수로 관리 */
        this.kakaoAuthorizationKey = process.env.REACT_APP_KAKAO_TSK;
        this.cid = 'TC0ONETIME';
        
        this._prepareApiParameter = {
            partner_order_id: '',
            partner_user_id: '',
            item_name: '',
            item_code: '',
            quantity: 1,
            total_amount: 0,
            tax_free_amount: 0,
            approval_url: 'http://localhost:3000/writesuccess',
            cancel_url: 'http://localhost:3000/write/2',
            fail_url: 'http://localhost:3000/write/2',
        }
        
    }

    set prepareApiParameter(info) {
        this._prepareApiParameter = {
            ...this._prepareApiParameter,
            ...info
        }
    }
  


    checkprepareApiParameter() {
        this.prepareApirequiredKey.forEach((key) => {
            switch(typeof this._prepareApiParameter[key]) {
                case 'string':
                    if(this._prepareApiParameter[key] === '') throw new Error('Please input all required value')
                    break;
                case 'number':
                    if(!Number.isInteger(this._prepareApiParameter[key])) throw new Error('Please input all required value')
                    break;
                default: 
                    break;
            }
        });
    }

    async prepare() {
        const apiUrl = '/v1/payment/ready'
        let data = {};
        try {
            this.checkprepareApiParameter()
            
            const response = axios({
                url: apiUrl,
                method: "POST",
                headers: {
                    'Authorization': `KakaoAK ${this.kakaoAuthorizationKey}`,
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                params: {
                    ...this._prepareApiParameter,
                    cid: this.cid
                }
            })
            data = await response;
        } catch(msg) {
            return false;
        }

        return data;
    }

    async approve({pg_token, partner_order_id, partner_user_id, tid }) {
        const apiUrl = '/v1/payment/approve'
        try {
            const response = axios({
                url: apiUrl,
                method: "POST",
                headers: {
                    'Authorization': `KakaoAK ${this.kakaoAuthorizationKey}`,
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                params: {
                    cid: this.cid,
                    tid: tid,
                    partner_order_id,
                    partner_user_id,
                    pg_token,
                }
            })
            const data = await response;
            return data;
        } catch (msg) {
            return { staus: 500, data: null, message: msg };
        }
    }
}

