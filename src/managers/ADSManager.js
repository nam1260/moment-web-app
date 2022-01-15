const ADSManager = (function () {


    function _gtag() {
        console.log('_gtag');
        window.dataLayer.push(arguments);
    }

    const _gtag_report_conversion = ({trackingId,value})=> {
        _gtag('event', 'conversion', {'send_to': trackingId, 'value': value, 'currency': 'KRW'});
        return;
    }


    const _gtag_report_conversion2 = ({trackingId}) => {
        _gtag('event', 'conversion',{'send_to': trackingId})
        return;
    }




    const collectClickedAddAcount = () => {
        const trackingId = 'AW-10834514022/1W1_CPvYtY4DEOagpq4o';
        const value = 100.0;

            _gtag_report_conversion(
                {
                    trackingId,
                    value
                });

            return false;
    };

    const collectClikedSendMessage = () => {
        const trackingId = 'AW-10834514022/4386CN-I-Y4DEOagpq4o';
        const value = 100.0;
        _gtag_report_conversion(
            {
                trackingId,
                value
            });

        return false;

    };


    const collectEnteredStarDetail = (url) => {
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


    const collectClickedFormLog = () => {
        const trackingId = 'AW-10834514022/5CdRCM-DypADEOagpq4o';
        _gtag_report_conversion2({trackingId});

        return false;

    }

    return {
        collectClickedAddAcount,
        addEnterStarDetailGoogleSnipet: collectEnteredStarDetail,
        collectClikedSendMessage,
        collectClickedFormLog

    }



}());
export default ADSManager;
