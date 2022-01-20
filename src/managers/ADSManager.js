
import ReactPixel from 'react-facebook-pixel';

const advancedMatching = { em: 'mtm.moment@gmail.com' }; // optional, more info: https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching
const options = {
    autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    debug: false, // enable logs
};


const ADSManager = (function () {


    function _fbq(event,data) {
        console.log("fbq");
        ReactPixel.init('874909166531680', advancedMatching, options);
        ReactPixel.pageView(); // For tracking page view
        ReactPixel.track(event, data);
    }




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

        _fbq("Lead");

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

        _fbq("Purchase",{value: 100.0, currency: 'KRW'});

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

        _fbq("ViewContent");

        return false;

    };


    const collectClickedFormLog = () => {
        const trackingId = 'AW-10834514022/5CdRCM-DypADEOagpq4o';
        _gtag_report_conversion2({trackingId});
        _fbq("Search");
        return false;

    }

    return {
        collectClickedAddAcount,
        collectEnteredStarDetail,
        collectClikedSendMessage,
        collectClickedFormLog

    }



}());
export default ADSManager;
