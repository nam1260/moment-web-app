import { useHistory } from "react-router";

const AdsManager = (function () {


    function _gtag() {
        console.log('_gtag');
        window.dataLayer.push(arguments);
    }

    const _gtag_report_conversion = ({url,trackingId,value})=> {
     // //   const history = useHistory();
     //    let callback = function () {
     //        if (typeof(url) != 'undefined') {
     //            window.location = url;
     //           // history.push(url)
     //        }
     //    };
        //_gtag('event', 'conversion', {'send_to': trackingId, 'value': value, 'currency': 'KRW','event_callback': callback});

        _gtag('event', 'conversion', {'send_to': trackingId, 'value': value, 'currency': 'KRW'});

       // history.push(url);
        return;
    }


    const addAccountGoogleSnipet = (url) => {
        console.log("addaccountgoogle")
        const trackingId = 'AW-10834514022/1W1_CPvYtY4DEOagpq4o';
        const value = 100.0;

            _gtag_report_conversion(
                {
                    url,
                    trackingId,
                    value
                });

            return false;
    };

    const addSendMessageGoogleSnipet = (url) => {
        const trackingId = 'AW-10834514022/4386CN-I-Y4DEOagpq4o';
        const value = 100.0;
        _gtag_report_conversion(
            {
                url,
                trackingId,
                value
            });

        return false;

    };


    const addEnterStarDetailGoogleSnipet = (url) => {
        const trackingId = 'AW-10834514022/Sl5vCNbUro8DEOagpq4o';
        const value = 1.0;
        _gtag_report_conversion(
            {
                url,
                trackingId,
                value
            });

        return false;

    };



    return {
        addAccountGoogleSnipet,
        addEnterStarDetailGoogleSnipet,
        addSendMessageGoogleSnipet

    }



}());
export default AdsManager;
