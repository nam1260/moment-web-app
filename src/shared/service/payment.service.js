import axios from "axios";

export class kakaoPaymentService { /* 이영현 개인 kakao developers 사용 중 변경 필요. */
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
        this.kakaoAuthorizationKey = 'bfafe6786dba07a5ed10dc469c1d13ab';
        this.cid = 'TC0ONETIME';
        
        this._prepareApiParameter = {
            partner_order_id: 'A',
            partner_user_id: 'A',
            item_name: 'SUZI',
            item_code: '1',
            quantity: 1,
            total_amount: 150000,
            tax_free_amount: 0,
            approval_url: 'http://localhost:3000/writesuccess',
            cancel_url: 'http://localhost:3000/write/2',
            fail_url: 'http://localhost:3000/write/2',
        }
        
    }

    set prepareApiParameter(info) {
        this._prepareApiParameter = {
            ...this.prepareApiParameter,
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
                    throw new Error('Find something wrong')
            }
        });
    }

    requirePrepareApi() {

        const apiUrl = '/v1/payment/ready'
        const formData = new FormData();
        formData.append('cid', this.cid)

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
                
            response.then((responseData) => {
                console.log(responseData);
            })            
        } catch(msg) {
            console.log(msg)
            return false;
        }

        return true;
    }
}

